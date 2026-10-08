# personal-site

Portfolio personal de **Sergio Pérez Montalvo** — React + Vite (JSX, sin TypeScript). Inspirado en la estructura y el estilo de [tanvir.io](https://tanvir.io), con contenido propio.

## Requisitos

- Node.js 18+ (recomendado 20+)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (por defecto `http://localhost:5173`).

### Rutas

- **`/`** — una sola página con scroll a secciones (`/about`, `/work`, `/thoughts`, `/contact` en la barra de direcciones al navegar en cliente).
- **`/about`**, **`/work`**, **`/thoughts`**, **`/contact`**, **`/privacy`** — páginas estáticas prerenderizadas (≥500 caracteres de texto) para SEO y agentes.
- **`/llms.txt`**, **`/sitemap.xml`**, **`/robots.txt`**, **`/*.md`** — generados en build.

## Build y tests

```bash
npm install
npm run build
npm test
```

El build:

1. Compila la SPA (Vite).
2. Prerenderiza HTML por ruta (`renderToString` + hidratación).
3. Genera Markdown, sitemap, robots, llms.txt y `og-image.png`.

Previsualiza el build:

```bash
npm run preview
```

Servidor local **con negociación `Accept: text/markdown`** (útil para probar agentes):

```bash
npm run build
npm run serve:agentic
# http://127.0.0.1:4173
```

## Despliegue estático y negociación de contenido

El hosting actual de [sergio-dev.com](https://sergio-dev.com) parece **OpenResty/nginx** sirviendo `dist/` como archivos estáticos. Los `.md` y el HTML prerenderizado ya están en `dist/`; para que los agentes reciban Markdown y 404 útiles **hay que configurar el servidor**:

| Plataforma | Qué aplicar |
|------------|-------------|
| **OpenResty / nginx** (probable prod) | Incluir `deploy/nginx-sergio-dev.conf` en el `server {}` y apuntar `root` a `dist/`. |
| **Netlify** | `netlify.toml` + edge function `netlify/edge-functions/negotiate.js` (build → `dist`). |
| **Vercel** | `vercel.json` (rewrites condicionados por header `Accept`). |
| **Solo estático sin config** | Sigue funcionando el HTML prerenderizado y los `.md` en URLs directas (`/index.md`, `/about.md`). Sin negociación en `/` ni 404 Markdown. |
| **Node (opcional)** | `node server/static-server.mjs [puerto] dist` — referencia completa de negociación. |

Sergio debe **subir el artefacto de `npm run build`** y **aplicar el snippet nginx** (o migrar a Netlify/Vercel con los ficheros del repo) para cumplir [acceptmarkdown.com](https://acceptmarkdown.com) en producción.

### Comprobaciones rápidas (producción)

```bash
curl -sS -I -H 'Accept: text/markdown' https://sergio-dev.com/
curl -sS -I -H 'Accept: text/html' https://sergio-dev.com/
curl -sS -I -H 'Accept: text/markdown' https://sergio-dev.com/ruta-inexistente
curl -sS https://sergio-dev.com/llms.txt
```

Esperado tras configurar nginx/edge: `Content-Type: text/markdown` cuando corresponda, `Vary: Accept`, 404 con cuerpo Markdown si `Accept: text/markdown`.

## Atajos

- Pulsa **`C`** (fuera de inputs) para copiar el email al portapapeles.

## Stack

- React 19 + Vite 8
- CSS plano (sin Tailwind)
- Solo archivos `.jsx` / `.js`
- Vitest (HTML prerenderizado, JSON-LD, sitemap, llms.txt, negociación)

## Licencia

Proyecto privado — uso personal.
