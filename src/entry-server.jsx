import { renderToString } from 'react-dom/server';
import { renderPageByKey } from './renderApp.jsx';
import { pageMetaForPath } from './data/siteMeta.js';
import { renderHeadHtml } from './seo/HeadTags.jsx';
import { SEO } from './data/siteMeta.js';

export function renderRoute(pathname) {
  const meta = pageMetaForPath(pathname);
  const html = renderToString(renderPageByKey(meta.page));

  const head = renderHeadHtml({
    title: meta.page === 'home' ? SEO.defaultTitle : meta.title,
    description: meta.description,
    pathname: meta.pathname,
    includeGraph: meta.page === 'home',
  });

  return {
    html,
    head,
    dataPage: meta.page === 'home' ? 'home' : meta.page,
    pathname: meta.pathname,
  };
}

/** Default export for vite SSR bundle */
export function render(pathname = '/') {
  return renderRoute(pathname);
}
