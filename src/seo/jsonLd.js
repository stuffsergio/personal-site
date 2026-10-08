import { SITE } from '../data/content.js';
import { CANONICAL_ORIGIN, SEO } from '../data/siteMeta.js';

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.fullName,
    alternateName: SITE.name,
    description: SEO.description,
    url: CANONICAL_ORIGIN,
    image: SITE.avatar,
    jobTitle: 'Frontend Developer',
    email: `mailto:${SITE.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Málaga',
      addressRegion: 'Andalucía',
      addressCountry: 'ES',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidad de Málaga',
    },
    knowsAbout: [
      'React',
      'JavaScript',
      'Expo',
      'React Native',
      'Vite',
      'Frontend development',
      'UI design',
      'Landing pages',
    ],
    sameAs: [SITE.github, SITE.notteClub, SITE.freelancer, SITE.oldPortfolio],
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO.defaultTitle,
    alternateName: SITE.name,
    url: CANONICAL_ORIGIN,
    description: SEO.description,
    inLanguage: 'es-ES',
    author: {
      '@type': 'Person',
      name: SITE.fullName,
      url: CANONICAL_ORIGIN,
    },
  };
}

export function buildProfessionalServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    description:
      'Desarrollo frontend freelance: React, landing pages, portfolios y apps Expo desde Málaga, España.',
    url: CANONICAL_ORIGIN,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Málaga',
      addressCountry: 'ES',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SITE.email,
      availableLanguage: ['Spanish', 'English'],
    },
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
    founder: {
      '@type': 'Person',
      name: SITE.fullName,
    },
  };
}

export function jsonLdScriptTag(...graphs) {
  const payload = graphs.length === 1 ? graphs[0] : graphs;
  return JSON.stringify(payload);
}
