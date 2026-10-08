import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ALL_INDEXABLE_PATHS,
  CANONICAL_ORIGIN,
  STANDALONE_ROUTES,
} from '../src/data/siteMeta.js';
import {
  markdownForPage,
  markdownFilePathForRoute,
  markdown404,
} from '../src/markdown/pages.js';
import { SITE } from '../src/data/content.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');
const publicDir = join(root, 'public');

const LASTMOD = new Date().toISOString().slice(0, 10);

function ensureDist() {
  mkdirSync(dist, { recursive: true });
}

function writeMarkdownFiles() {
  writeFileSync(join(dist, 'index.md'), markdownForPage('home'), 'utf8');
  for (const route of STANDALONE_ROUTES) {
    const file = markdownFilePathForRoute(route.path);
    writeFileSync(join(dist, file), markdownForPage(route.page), 'utf8');
  }
  writeFileSync(join(dist, '404.md'), markdown404(), 'utf8');
}

function writeLlmsTxt() {
  const mdLinks = [
    `- [Inicio (${SITE.name})](${CANONICAL_ORIGIN}/index.md): portfolio y resumen profesional`,
    ...STANDALONE_ROUTES.map(
      (r) =>
        `- [${r.title}](${CANONICAL_ORIGIN}${r.path}.md): contenido en Markdown de ${r.path}`,
    ),
    `- [Privacidad](${CANONICAL_ORIGIN}/privacy.md): tratamiento de datos y RGPD`,
  ].join('\n');

  const body = `# ${SITE.fullName}

> ${SITE.name} — Frontend Developer (React) en Málaga, España. Portfolio oficial en ${CANONICAL_ORIGIN}.

Este sitio describe a Sergio Pérez Montalvo: experiencia, proyectos (Missions, Notte Club, Aletheia, ShopList), stack y formas de contacto. Usa las versiones Markdown para lectura sin JavaScript.

## Cuándo usar / When to use

- Contratar a Sergio para **React / frontend**: landing pages, portfolios, sitios para pequeños negocios, dashboards ligeros, pulido de UI.
- Apps móviles con **Expo / React Native** (p. ej. Missions).
- Colaboraciones de producto web en España (remoto OK); idiomas español e inglés (B2).
- **Contacto preferido:** email [${SITE.email}](mailto:${SITE.email}) (mensajes cortos). Alternativa: [Freelancer](${SITE.freelancer}).

## Páginas (Markdown)

${mdLinks}

## Recursos

- [Sitemap](${CANONICAL_ORIGIN}/sitemap.xml)
- [robots.txt](${CANONICAL_ORIGIN}/robots.txt)
- [GitHub](${SITE.github})
- [Notte Club](${SITE.notteClub})

## Optional

- [llms-full.txt](${CANONICAL_ORIGIN}/llms-full.txt): mismo índice ampliado con URLs HTML.
`;

  writeFileSync(join(dist, 'llms.txt'), body, 'utf8');

  const full = `${body}
## HTML routes

${ALL_INDEXABLE_PATHS.map((p) => `- ${CANONICAL_ORIGIN}${p === '/' ? '/' : p}`).join('\n')}
`;
  writeFileSync(join(dist, 'llms-full.txt'), full, 'utf8');
}

function writeRobots() {
  const robots = `# https://sergio-dev.com
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
`;
  writeFileSync(join(dist, 'robots.txt'), robots, 'utf8');
}

function writeSitemap() {
  const urls = ALL_INDEXABLE_PATHS.map((path) => {
    const loc = path === '/' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
  </url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
  writeFileSync(join(dist, 'sitemap.xml'), xml, 'utf8');
}

async function ensureOgImage() {
  const svgPath = join(publicDir, 'og-image.svg');
  const pngDist = join(dist, 'og-image.png');
  const pngPublic = join(publicDir, 'og-image.png');
  if (existsSync(pngPublic)) {
    writeFileSync(pngDist, readFileSync(pngPublic));
    return;
  }
  try {
    const sharp = (await import('sharp')).default;
    if (existsSync(svgPath)) {
      try {
        await sharp(svgPath).resize(1200, 630).png().toFile(pngDist);
        console.log('generated og-image.png from svg');
        return;
      } catch {
        /* fall through to synthetic canvas */
      }
    }
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
    })
      .png()
      .toFile(pngDist);
    console.log('generated og-image.png (synthetic)');
  } catch (e) {
    console.warn('og-image.png generation failed', e.message);
  }
}

function main() {
  ensureDist();
  writeMarkdownFiles();
  writeLlmsTxt();
  writeRobots();
  writeSitemap();
  return ensureOgImage();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
