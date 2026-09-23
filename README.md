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

### Rutas de una sola página

La navegación usa rutas limpias (`/about`, `/work`, `/thoughts`, `/contact`) que hacen scroll a cada sección. En desarrollo, Vite ya sirve la SPA correctamente.

En producción, configura tu host para redirigir todas las rutas a `index.html` (por ejemplo en Netlify: archivo `_redirects` con `/* /index.html 200`, o en Vercel el preset de Vite).

## Build

```bash
npm install
npm run build
```

Los archivos estáticos quedan en `dist/`. Previsualiza el build con:

```bash
npm run preview
```

## Atajos

- Pulsa **`C`** (fuera de inputs) para copiar el email al portapapeles.

## Stack

- React 19 + Vite 8
- CSS plano (sin Tailwind)
- Solo archivos `.jsx` / `.js`

## Licencia

Proyecto privado — uso personal.
