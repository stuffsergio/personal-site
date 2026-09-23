import { SITE } from '../data/content';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-name">
      <div className="hero__avatar-wrap">
        <img
          src={SITE.avatar}
          alt=""
          className="hero__avatar"
          width={72}
          height={72}
        />
      </div>
      <div className="hero__intro">
        <h1 id="hero-name" className="hero__name">
          {SITE.name}
          <span className="hero__verified" title="Perfil verificado" aria-hidden>
            ✓
          </span>
        </h1>
        <p className="hero__role">{SITE.role}</p>
      </div>
      <p className="hero__bio">
        Desarrollador frontend autodidacta en{' '}
        <span className="hero__loc">{SITE.location}</span>. Construyo con React,
        Expo y mucho café — de{' '}
        <a href={SITE.notteClub} target="_blank" rel="noreferrer">
          Notte Club
        </a>{' '}
        (moda urbana en España) a apps como Missions. He fallado mil veces;{' '}
        <a href={SITE.github} target="_blank" rel="noreferrer">
          aquí vamos otra vez
        </a>
        .
      </p>
      <p className="hero__hint">
        Pulsa <kbd>C</kbd> para copiar mi email
      </p>
    </section>
  );
}
