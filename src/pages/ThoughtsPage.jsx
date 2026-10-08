import { WRITING } from '../data/content';
import StandaloneLayout from './StandaloneLayout';

export default function ThoughtsPage() {
  return (
    <StandaloneLayout>
      <article className="doc">
        <h1>Escritura y notas</h1>
        <p className="doc__lead">
          Notas breves sobre Expo, React y proyectos personales. Algunos artículos están en
          camino; esta página recoge el índice público.
        </p>
        <ul className="doc-list">
          {WRITING.map((w) => (
            <li key={w.title}>
              <span className="doc-muted">{w.date}</span> — {w.title} ({w.minutes})
              {w.soon ? ' · próximamente' : ''}
            </li>
          ))}
        </ul>
        <p>
          Si quieres avisarme de un tema concreto,{' '}
          <a href="/contact">envíame un email</a>.
        </p>
        <p>
          <a href="/">← Inicio</a>
        </p>
      </article>
    </StandaloneLayout>
  );
}
