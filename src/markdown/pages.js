import {
  SITE,
  EXPERIENCE,
  STUFF_I_DO,
  VENTURES,
  WRITING,
  STACK,
} from '../data/content.js';
import { CANONICAL_ORIGIN, STANDALONE_ROUTES } from '../data/siteMeta.js';

function lines(...parts) {
  return parts.filter(Boolean).join('\n');
}

export function markdownHome() {
  const exp = EXPERIENCE.map(
    (e) =>
      `- **${e.dates}** — ${e.role}${e.company ? ` (${e.company})` : ''}: ${e.description}`,
  ).join('\n');

  const ventures = VENTURES.map(
    (v) => `- [${v.title}](${v.href}): ${v.description}`,
  ).join('\n');

  return lines(
    `# ${SITE.name} — Frontend Developer (React) en Málaga, España`,
    '',
    `> ${SITE.role}. ${SITE.location}. React, Expo y producto web — de Notte Club a Missions.`,
    '',
    `${SITE.name} (${SITE.fullName}) es desarrollador frontend autodidacta en ${SITE.location}. Construye con React, Expo y producto web. Marca [Notte Club](${SITE.notteClub}) (moda urbana en España), apps como Missions, y proyectos open source en [GitHub](${SITE.github}).`,
    '',
    '## Experiencia',
    '',
    exp,
    '',
    '## Qué hago',
    '',
    STUFF_I_DO + '.',
    '',
    'Stack: ' + STACK.map((s) => s.name).join(', ') + '.',
    '',
    '## Proyectos',
    '',
    ventures,
    '',
    '## Contacto',
    '',
    `- Email: [${SITE.email}](mailto:${SITE.email})`,
    `- Freelancer: ${SITE.freelancer}`,
    '',
    '## Más',
    '',
    `- [Versión HTML](${CANONICAL_ORIGIN}/)`,
    `- [llms.txt](${CANONICAL_ORIGIN}/llms.txt)`,
    `- [Sitemap](${CANONICAL_ORIGIN}/sitemap.xml)`,
    STANDALONE_ROUTES.map(
      (r) => `- [${r.title}](${CANONICAL_ORIGIN}${r.path}.md)`,
    ).join('\n'),
  );
}

export function markdownAbout() {
  return lines(
    `# Sobre ${SITE.fullName}`,
    '',
    `> Frontend Developer en ${SITE.location}. Grado en Ingeniería del Software (Universidad de Málaga, 2022–2025).`,
    '',
    `${SITE.name} es desarrollador frontend enfocado en React, interfaces cuidadas y producto web completo. Trabaja de forma autodidacta y en equipo en proyectos como [Notte Club](${SITE.notteClub}) — moda urbana hecha en España — y Missions, una app de hábitos con Expo, Express y MySQL.`,
    '',
    '## Formación y trayectoria',
    '',
    EXPERIENCE.map(
      (e) =>
        `### ${e.role}\n\n${e.dates}. ${e.description}${e.href ? ` [${e.company}](${e.href})` : e.company ? ` (${e.company})` : ''}.`,
    ).join('\n\n'),
    '',
    '## Idiomas',
    '',
    'Español nativo. Cambridge English B2 (2023).',
    '',
    '## Enlaces',
    '',
    `- [GitHub](${SITE.github})`,
    `- [Notte Club](${SITE.notteClub})`,
    `- [Portfolio anterior](${SITE.oldPortfolio})`,
    `- [Inicio](${CANONICAL_ORIGIN}/)`,
  );
}

export function markdownWork() {
  return lines(
    '# Trabajo y proyectos',
    '',
    `> ${STUFF_I_DO}.`,
    '',
    'Proyectos seleccionados de Sergio Pérez Montalvo:',
    '',
    VENTURES.map(
      (v) => `## ${v.title}\n\n${v.description}\n\nEnlace: ${v.href}`,
    ).join('\n\n'),
    '',
    '## Stack habitual',
    '',
    STACK.map((s) => `- ${s.name}`).join('\n'),
    '',
    `[Contactar](${CANONICAL_ORIGIN}/contact.md) · [Inicio](${CANONICAL_ORIGIN}/)`,
  );
}

export function markdownThoughts() {
  const posts = WRITING.map(
    (w) =>
      `- ${w.date} — **${w.title}** (${w.minutes})${w.soon ? ' — próximamente' : ''}`,
  ).join('\n');
  return lines(
    '# Escritura y notas',
    '',
    '> Artículos breves sobre Expo, React y proyectos personales (algunos en camino).',
    '',
    posts,
    '',
    `[Inicio](${CANONICAL_ORIGIN}/) · [Contacto](${CANONICAL_ORIGIN}/contact.md)`,
  );
}

export function markdownContact() {
  return lines(
    '# Contacto',
    '',
    `> La forma más rápida de hablar con ${SITE.name}: email directo.`,
    '',
    `**Email:** [${SITE.email}](mailto:${SITE.email})`,
    '',
    'Prefiero mensajes cortos y concretos (menos de 300 caracteres si es posible). Puedes:',
    '',
    `- Escribir a [${SITE.email}](mailto:${SITE.email})`,
    `- Abrir un proyecto en [Freelancer](${SITE.freelancer})`,
    `- Ver código en [GitHub](${SITE.github})`,
    '',
    'En la web, el formulario de contacto abre tu cliente de correo con el asunto y cuerpo rellenados (no hay backend que almacene mensajes).',
    '',
    '## Cuándo contactar',
    '',
    'Colaboraciones en React/frontend, landing pages, portfolios, sitios para pequeños negocios, apps móviles con Expo, pulido de UI y consultoría de producto web.',
    '',
    `[Privacidad](${CANONICAL_ORIGIN}/privacy.md) · [Inicio](${CANONICAL_ORIGIN}/)`,
  );
}

export function markdownPrivacy() {
  return lines(
    '# Política de privacidad',
    '',
    `> Sitio estático personal de ${SITE.fullName} (${CANONICAL_ORIGIN}).`,
    '',
    '## Responsable',
    '',
    `${SITE.fullName} — ${SITE.email} — ${SITE.location}.`,
    '',
    '## Qué datos se tratan',
    '',
    'Este sitio es principalmente estático. No hay registro de usuarios ni base de datos propia en el servidor. El formulario de contacto no envía datos a un servidor: abre tu aplicación de correo (`mailto:`) con el contenido que escribas.',
    '',
    '## Cookies y analítica',
    '',
    'No uso cookies de seguimiento propias ni Google Analytics en este sitio. Las fuentes (Google Fonts) pueden registrar solicitudes según su política. No vendo datos personales.',
    '',
    '## Alojamiento',
    '',
    'El sitio se sirve como archivos estáticos. El proveedor de hosting puede registrar IP y peticiones HTTP conforme a su propia política.',
    '',
    '## Tus derechos (RGPD)',
    '',
    `Puedes escribir a [${SITE.email}](mailto:${SITE.email}) para solicitar acceso, rectificación o supresión de cualquier dato que me hayas enviado por email. Responderé en un plazo razonable.`,
    '',
    '## Cambios',
    '',
    'Esta página puede actualizarse; la fecha de última modificación aparece en el sitemap.',
    '',
    `[Inicio](${CANONICAL_ORIGIN}/) · [Contacto](${CANONICAL_ORIGIN}/contact.md)`,
  );
}

export function markdown404() {
  return lines(
    '# Página no encontrada',
    '',
    `No existe un recurso en esta URL en ${CANONICAL_ORIGIN}.`,
    '',
    '- [Inicio (Markdown)]({{ORIGIN}}/index.md)',
    '- [llms.txt]({{ORIGIN}}/llms.txt)',
    '- [Sitemap]({{ORIGIN}}/sitemap.xml)',
  ).replace(/\{\{ORIGIN\}\}/g, CANONICAL_ORIGIN);
}

const GENERATORS = {
  home: markdownHome,
  about: markdownAbout,
  work: markdownWork,
  thoughts: markdownThoughts,
  contact: markdownContact,
  privacy: markdownPrivacy,
  'not-found': markdown404,
};

export function markdownForPage(pageKey) {
  const fn = GENERATORS[pageKey];
  if (!fn) return markdown404();
  return fn();
}

export function markdownFilePathForRoute(pathname) {
  if (pathname === '/') return 'index.md';
  const slug = pathname.replace(/^\//, '');
  return `${slug}.md`;
}
