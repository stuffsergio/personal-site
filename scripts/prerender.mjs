import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { STANDALONE_ROUTES } from '../src/data/siteMeta.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');
const serverEntry = join(dist, 'server', 'entry-server.js');

const ROUTES = ['/', ...STANDALONE_ROUTES.map((r) => r.path)];

function injectTemplate(template, { html, head, dataPage }) {
  let out = template.replace('<!--app-html-->', html);
  out = out.replace(/<!--app-head-->[\s\S]*?<!--\/app-head-->/, head);
  out = out.replace(/<html lang="es">/, `<html lang="es" data-page="${dataPage}">`);
  return out;
}

async function loadRenderer() {
  if (!existsSync(serverEntry)) {
    throw new Error(`Missing SSR bundle at ${serverEntry}. Run vite build --ssr first.`);
  }
  const mod = await import(pathToFileURL(serverEntry).href);
  return mod.renderRoute ?? mod.render;
}

function writeHtmlForRoute(pathname, content) {
  if (pathname === '/') {
    writeFileSync(join(dist, 'index.html'), content, 'utf8');
    return;
  }
  const dir = join(dist, pathname.replace(/^\//, ''));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), content, 'utf8');
}

async function main() {
  const templatePath = join(dist, 'index.html');
  if (!existsSync(templatePath)) {
    throw new Error('Run client vite build before prerender.');
  }
  const baseTemplate = readFileSync(templatePath, 'utf8');
  const renderRoute = await loadRenderer();

  for (const pathname of ROUTES) {
    const { html, head, dataPage } = renderRoute(pathname);
    const doc = injectTemplate(baseTemplate, { html, head, dataPage });
    writeHtmlForRoute(pathname, doc);
    console.log('prerender', pathname);
  }

  const nf = renderRoute('/nope-not-found-internal');
  const nfDoc = injectTemplate(baseTemplate, {
    html: nf.html,
    head: nf.head,
    dataPage: 'not-found',
  });
  writeFileSync(join(dist, '404.html'), nfDoc, 'utf8');
  console.log('prerender /404.html');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
