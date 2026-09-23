import { EXPERIENCE } from '../data/content';

export default function Experience() {
  return (
    <section className="section" aria-labelledby="experience-label">
      <h2 id="experience-label" className="section-label">
        EXPERIENCE
      </h2>
      <p className="section-lead">
        En estos años he tocado de todo: producto, marca y código. Resumen rápido.
      </p>
      <ul className="timeline">
        {EXPERIENCE.map((item) => (
          <li key={item.dates + item.role} className="timeline__item">
            <span className="timeline__dates">{item.dates}</span>
            <div className="timeline__body">
              <p className="timeline__title">
                {item.role}
                {item.company && (
                  <>
                    {' '}
                    at{' '}
                    <span className="timeline__company">
                      <span className="timeline__icon" aria-hidden>
                        {item.icon}
                      </span>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer">
                          {item.company}
                        </a>
                      ) : (
                        item.company
                      )}
                    </span>
                  </>
                )}
              </p>
              <p className="timeline__desc">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
