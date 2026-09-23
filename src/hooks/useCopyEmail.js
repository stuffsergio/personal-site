import { useEffect, useCallback } from 'react';
import { SITE } from '../data/content';

export function useCopyEmail(onCopied) {
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      onCopied?.();
    } catch {
      /* clipboard unavailable */
    }
  }, [onCopied]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'c' && e.key !== 'C') return;
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      copy();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [copy]);

  return copy;
}
