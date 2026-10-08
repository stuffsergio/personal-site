/**
 * Content negotiation for Accept: text/markdown vs text/html (acceptmarkdown.com).
 * Exported for unit tests and reused by static server configs.
 */
export function parseAcceptTokens(acceptHeader) {
  if (!acceptHeader || typeof acceptHeader !== 'string') return [];
  return acceptHeader.split(',').map((part) => {
    const [type, ...params] = part.trim().split(';');
    let q = 1;
    for (const p of params) {
      const m = p.trim().match(/^q=([0-9.]+)$/i);
      if (m) q = Number(m[1]);
    }
    return { type: type.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 };
  });
}

export function qualityFor(tokens, mime) {
  const target = mime.toLowerCase();
  let best = 0;
  for (const t of tokens) {
    if (t.type === '*/*' || t.type === target) best = Math.max(best, t.q);
  }
  return best;
}

/** @returns {'markdown' | 'html'} */
export function selectRepresentation(acceptHeader) {
  const tokens = parseAcceptTokens(acceptHeader);
  if (tokens.length === 0) return 'html';
  const md = qualityFor(tokens, 'text/markdown');
  const html = qualityFor(tokens, 'text/html');
  if (md > 0 && md >= html) return 'markdown';
  return 'html';
}

export function is404MarkdownRequest(acceptHeader) {
  return selectRepresentation(acceptHeader) === 'markdown';
}
