import { SEO, canonicalUrl } from '../data/siteMeta.js';
import {
  buildPersonJsonLd,
  buildWebSiteJsonLd,
  buildProfessionalServiceJsonLd,
  jsonLdScriptTag,
} from './jsonLd.js';

export default function HeadTags({ title, description, pathname = '/', includeGraph = false }) {
  const canonical = canonicalUrl(pathname);
  const ogTitle = title || SEO.defaultTitle;
  const ogDesc = description || SEO.description;

  return (
    <>
      <title>{ogTitle}</title>
      <meta name="description" content={ogDesc} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={SEO.ogImage} />
      <meta property="og:locale" content={SEO.locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDesc} />
      <meta name="twitter:image" content={SEO.ogImage} />
      {includeGraph ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScriptTag(
              buildPersonJsonLd(),
              buildWebSiteJsonLd(),
              buildProfessionalServiceJsonLd(),
            ),
          }}
        />
      ) : null}
    </>
  );
}

/** Serialize head tags to HTML string for prerender injection (no React on server bundle needed for head). */
export function renderHeadHtml({ title, description, pathname, includeGraph }) {
  const canonical = canonicalUrl(pathname);
  const ogTitle = title || SEO.defaultTitle;
  const ogDesc = description || SEO.description;
  const graph = includeGraph
    ? `<script type="application/ld+json">${jsonLdScriptTag(
        buildPersonJsonLd(),
        buildWebSiteJsonLd(),
        buildProfessionalServiceJsonLd(),
      ).replace(/</g, '\\u003c')}</script>`
    : '';

  return `<title>${escapeHtml(ogTitle)}</title>
<meta name="description" content="${escapeAttr(ogDesc)}" />
<link rel="canonical" href="${escapeAttr(canonical)}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${escapeAttr(ogTitle)}" />
<meta property="og:description" content="${escapeAttr(ogDesc)}" />
<meta property="og:url" content="${escapeAttr(canonical)}" />
<meta property="og:image" content="${escapeAttr(SEO.ogImage)}" />
<meta property="og:locale" content="${escapeAttr(SEO.locale)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeAttr(ogTitle)}" />
<meta name="twitter:description" content="${escapeAttr(ogDesc)}" />
<meta name="twitter:image" content="${escapeAttr(SEO.ogImage)}" />
${graph}`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
