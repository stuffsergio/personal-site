import { useEffect } from 'react';
import { NAV } from '../data/content';

const PATH_TO_ID = Object.fromEntries(NAV.map(({ path, id }) => [path, id]));

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function navigateTo(path) {
  const id = PATH_TO_ID[path];
  if (id) {
    window.history.pushState({}, '', path);
    scrollToSection(id);
  }
}

export function useScrollRouting() {
  useEffect(() => {
    const handlePath = () => {
      const path = window.location.pathname;
      if (PATH_TO_ID[path]) {
        scrollToSection(PATH_TO_ID[path]);
      }
    };

    handlePath();
    window.addEventListener('popstate', handlePath);
    return () => window.removeEventListener('popstate', handlePath);
  }, []);
}
