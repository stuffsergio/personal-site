/** @see src/server/acceptNegotiation.js (duplicated for Netlify Edge bundling) */
function selectRepresentation(acceptHeader) {
  if (!acceptHeader) return 'html';
  const tokens = acceptHeader.split(',').map((part) => {
    const [type, ...params] = part.trim().split(';');
    let q = 1;
    for (const p of params) {
      const m = p.trim().match(/^q=([0-9.]+)$/i);
      if (m) q = Number(m[1]);
    }
    return { type: type.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 };
  });
  const quality = (mime) => {
    let best = 0;
    for (const t of tokens) {
      if (t.type === '*/*' || t.type === mime) best = Math.max(best, t.q);
    }
    return best;
  };
  const md = quality('text/markdown');
  const html = quality('text/html');
  if (md > 0 && md >= html) return 'markdown';
  return 'html';
}

const MD_ROUTES = {
  '/': '/index.md',
  '/about': '/about.md',
  '/work': '/work.md',
  '/thoughts': '/thoughts.md',
  '/contact': '/contact.md',
  '/privacy': '/privacy.md',
};

export default async (request, context) => {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/$/, '') || '/';
  const rep = selectRepresentation(request.headers.get('accept') || '');

  if (rep === 'markdown') {
    const dest = MD_ROUTES[pathname];
    const target = dest || '/404.md';
    const res = await context.rewrite(target);
    const headers = new Headers(res.headers);
    headers.set('Content-Type', 'text/markdown; charset=utf-8');
    headers.set('Vary', 'Accept');
    return new Response(res.body, { status: dest ? res.status : 404, headers });
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set('Vary', 'Accept');
  return new Response(response.body, { status: response.status, headers });
};

export const config = { path: '/*' };
