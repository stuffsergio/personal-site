import { VENTURES } from '../data/content';

export default function Ventures() {
  return (
    <section className="section" aria-labelledby="ventures-label">
      <h2 id="ventures-label" className="section-label">
        VENTURES
      </h2>
      <ul className="ventures">
        {VENTURES.map((v) => (
          <li key={v.title}>
            <a
              href={v.href}
              className="ventures__row"
              target="_blank"
              rel="noreferrer"
            >
              <span
                className="ventures__mark"
                style={{ background: v.markBg }}
                aria-hidden
              >
                {v.mark}
              </span>
              <span className="ventures__text">
                <span className="ventures__title">{v.title}</span>
                <span className="ventures__desc">{v.description}</span>
              </span>
              <span className="ventures__arrow" aria-hidden>
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
