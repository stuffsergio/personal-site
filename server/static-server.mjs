#!/usr/bin/env node
/**
 * Optional local static server with Accept negotiation (Markdown vs HTML) and Markdown 404s.
 * Usage: node server/static-server.mjs [port] [distDir]
 */
import http from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { selectRepresentation } from '../src/server/acceptNegotiation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = process.argv[3] || join(__dirname, '..', 'dist');
const port = Number(process.argv[2] || 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
};

function resolvePath(urlPath) {
  if (urlPath === '/') return { kind: 'home', fileBase: join(dist, 'index') };
  const clean = urlPath.replace(/\/$/, '') || '/';
  const slug = clean.replace(/^\//, '');
  const asDir = join(dist, slug, 'index.html');
  if (existsSync(asDir)) return { kind: 'page', fileBase: join(dist, slug, 'index'), pathname: clean };
  const asFile = join(dist, slug);
  if (existsSync(asFile) && statSync(asFile).isFile()) {
    return { kind: 'asset', filePath: asFile };
  }
  const md = join(dist, `${slug}.md`);
  if (existsSync(md)) return { kind: 'md-only', mdPath: md, pathname: clean };
  return { kind: 'missing', pathname: clean };
}

function read(filePath) {
  return readFileSync(filePath);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const accept = req.headers.accept || '';
  const rep = selectRepresentation(accept);
  const vary = 'Accept';

  try {
    const resolved = resolvePath(url.pathname);

    if (resolved.kind === 'asset') {
      const ext = extname(resolved.filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(read(resolved.filePath));
      return;
    }

    if (resolved.kind === 'missing') {
      if (rep === 'markdown') {
        const body = read(join(dist, '404.md'));
        res.writeHead(404, {
          'Content-Type': 'text/markdown; charset=utf-8',
          Vary: vary,
        });
        res.end(body);
        return;
      }
      const html = read(join(dist, '404.html'));
      res.writeHead(404, { 'Content-Type': MIME['.html'], Vary: vary });
      res.end(html);
      return;
    }

    const pathname = resolved.kind === 'home' ? '/' : resolved.pathname;
    const mdPath =
      pathname === '/'
        ? join(dist, 'index.md')
        : join(dist, `${pathname.replace(/^\//, '')}.md`);

    if (rep === 'markdown' && existsSync(mdPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/markdown; charset=utf-8',
        Vary: vary,
      });
      res.end(read(mdPath));
      return;
    }

    const htmlPath =
      resolved.kind === 'home' ? join(dist, 'index.html') : `${resolved.fileBase}.html`;
    res.writeHead(200, { 'Content-Type': MIME['.html'], Vary: vary });
    res.end(read(htmlPath));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(String(err));
  }
});

server.listen(port, () => {
  console.log(`static-server listening on http://127.0.0.1:${port} (${dist})`);
});
