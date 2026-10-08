/** Canonical production URL — used for sitemap, OG, JSON-LD, and canonical links. */
export const CANONICAL_ORIGIN = 'https://sergio-dev.com';

export const SEO = {
  defaultTitle:
    'Sergio Pérez — Frontend Developer (React) en Málaga, España',
  titleTemplate: (pageTitle) =>
    pageTitle
      ? `${pageTitle} · Sergio Pérez — Frontend Developer (React)`
      : 'Sergio Pérez — Frontend Developer (React) en Málaga, España',
  description:
    'Sergio Pérez Montalvo, desarrollador frontend en Málaga (España). React, Vite, Expo y producto web. Portfolio, proyectos (Missions, Notte Club) y contacto.',
  ogImage: `${CANONICAL_ORIGIN}/og-image.png`,
  locale: 'es_ES',
  lang: 'es',
};

/** Standalone prerender routes (each gets full HTML + .md). Home `/` is separate. */
export const STANDALONE_ROUTES = [
  { path: '/about', page: 'about', title: 'Sobre mí' },
  { path: '/work', page: 'work', title: 'Trabajo y proyectos' },
  { path: '/thoughts', page: 'thoughts', title: 'Escritura y notas' },
  { path: '/contact', page: 'contact', title: 'Contacto' },
  { path: '/privacy', page: 'privacy', title: 'Privacidad' },
];

export const ALL_INDEXABLE_PATHS = [
  '/',
  ...STANDALONE_ROUTES.map((r) => r.path),
];

export function canonicalUrl(pathname = '/') {
  const path = pathname === '/' ? '' : pathname.replace(/\/$/, '');
  return `${CANONICAL_ORIGIN}${path || '/'}`;
}

export function pageMetaForPath(pathname) {
  if (pathname === '/' || pathname === '') {
    return {
      page: 'home',
      title: SEO.defaultTitle,
      description: SEO.description,
      pathname: '/',
    };
  }
  const route = STANDALONE_ROUTES.find((r) => r.path === pathname);
  if (route) {
    return {
      page: route.page,
      title: SEO.titleTemplate(route.title),
      description: SEO.description,
      pathname: route.path,
    };
  }
  return {
    page: 'not-found',
    title: 'Página no encontrada',
    description: SEO.description,
    pathname,
  };
}
