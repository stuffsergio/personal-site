import HomeShell from './pages/HomeShell.jsx';
import AboutPage from './pages/AboutPage.jsx';
import WorkPage from './pages/WorkPage.jsx';
import ThoughtsPage from './pages/ThoughtsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { pageMetaForPath } from './data/siteMeta.js';

const PAGE_COMPONENTS = {
  home: HomeShell,
  about: AboutPage,
  work: WorkPage,
  thoughts: ThoughtsPage,
  contact: ContactPage,
  privacy: PrivacyPage,
  'not-found': NotFoundPage,
};

/** Render the correct page for SSR or for client when in standalone mode. */
export function renderPageByKey(pageKey) {
  const Component = PAGE_COMPONENTS[pageKey] || NotFoundPage;
  return <Component />;
}

export function resolvePageKey(pathname, shellMode) {
  if (shellMode === 'home') return 'home';
  const meta = pageMetaForPath(pathname);
  return meta.page;
}

export function getInitialShellMode() {
  if (typeof document === 'undefined') return 'standalone';
  const page = document.documentElement.getAttribute('data-page') || 'home';
  if (page === 'home') return 'home';
  return 'standalone';
}
