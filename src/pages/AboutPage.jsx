import { SITE, EXPERIENCE } from '../data/content';
import StandaloneLayout from './StandaloneLayout';

export default function AboutPage() {
  return (
    <StandaloneLayout>
      <article className="doc">
        <h1>Sobre {SITE.fullName}</h1>
        <p className="doc__lead">
          {SITE.name} — Frontend Developer en {SITE.location}. Desarrollo interfaces con
          React, cuido el detalle visual y llevo productos web de punta a punta, desde
          landing pages hasta apps móviles con Expo.
        </p>
        <p>
          Soy autodidacta con base académica sólida: grado en Ingeniería del Software en
          la Universidad de Málaga (2022–2025), con Cambridge English B2 (2023). Me gusta
          iterar en público — por eso comparto código en{' '}
          <a href={SITE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>{' '}
          y sigo construyendo marcas y herramientas propias.
        </p>
        <h2>Notte Club y producto real</h2>
        <p>
          En{' '}
          <a href={SITE.notteClub} target="_blank" rel="noreferrer">
            Notte Club
          </a>{' '}
          trabajo frontend y producto para una marca de moda urbana hecha en España: tienda
          online, identidad visual y experiencia de usuario en React. Ese proyecto me enseña
          a equilibrar diseño, rendimiento y mantenimiento a largo plazo — lecciones que
          aplico también en encargos freelance y proyectos personales.
        </p>
        <h2>Missions y aprendizaje continuo</h2>
        <p>
          Missions es mi app de hábitos y misiones diarias (Expo, Express y MySQL). La uso
          para probar arquitectura móvil, sincronización de datos y hábitos de desarrollo
          sostenibles. Paralelamente participo en retos como el NASA Space Apps con Aletheia
          (narrativa visual con datos) y mantengo utilidades como ShopList.
        </p>
        <h2>Experiencia resumida</h2>
        <ul className="doc-list">
          {EXPERIENCE.map((item) => (
            <li key={item.dates + item.role}>
              <strong>{item.dates}</strong> — {item.role}
              {item.company ? ` · ${item.company}` : ''}. {item.description}
            </li>
          ))}
        </ul>
        <h2>Cómo trabajo contigo</h2>
        <p>
          Prefiero proyectos con objetivo claro: una landing que convierta, un portfolio que
          transmita confianza, un MVP móvil en Expo o una iteración de UI en un producto
          existente. Comunicación directa por email, entregas incrementales y código legible.
          Si encaja,{' '}
          <a href="/contact">escríbeme</a> o abre un proyecto en{' '}
          <a href={SITE.freelancer} target="_blank" rel="noreferrer">
            Freelancer
          </a>
          .
        </p>
        <p>
          <a href="/">← Volver al inicio</a>
        </p>
      </article>
    </StandaloneLayout>
  );
}
