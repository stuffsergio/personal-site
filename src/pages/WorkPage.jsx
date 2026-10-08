import { STUFF_I_DO, VENTURES, STACK } from '../data/content';
import StandaloneLayout from './StandaloneLayout';

export default function WorkPage() {
  return (
    <StandaloneLayout>
      <article className="doc">
        <h1>Trabajo y proyectos</h1>
        <p className="doc__lead">{STUFF_I_DO}.</p>
        <p>
          Selección de proyectos donde combino React, diseño y producto. Cada uno tiene un
          enlace externo o repositorio para que puedas ver el alcance real del trabajo.
        </p>
        <h2>Proyectos destacados</h2>
        <ul className="doc-list doc-list--ventures">
          {VENTURES.map((v) => (
            <li key={v.title}>
              <a href={v.href} target="_blank" rel="noreferrer">
                {v.title}
              </a>
              — {v.description}
            </li>
          ))}
        </ul>
        <h2>Stack habitual</h2>
        <p>
          {STACK.map((s) => s.name).join(', ')}. Elijo herramientas ligeras (Vite, CSS
          modular) cuando el proyecto lo permite, y escalo a Expo o Node cuando hace falta
          backend o app nativa.
        </p>
        <h2>Colaboración</h2>
        <p>
          Busco encargos de frontend, landings para negocios locales, portfolios personales,
          dashboards sencillos y apps Expo.{' '}
          <a href="/contact">Contacto</a> · <a href="/">Inicio</a>
        </p>
      </article>
    </StandaloneLayout>
  );
}
