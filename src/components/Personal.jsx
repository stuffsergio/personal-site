import { SITE } from '../data/content';
import { PHOTOS } from '../data/content';

export default function Personal() {
  return (
    <section className="section" aria-labelledby="personal-label">
      <h2 id="personal-label" className="section-label">
        PERSONAL
      </h2>
      <p className="section-lead section-lead--tight">
        Fuera del código: música, fotos con el móvil y seguir aprendiendo cosas
        nuevas.
      </p>
      <div className="music-card">
        <div className="music-card__art" aria-hidden />
        <div className="music-card__meta">
          <p className="music-card__track">Beats to relax/study to</p>
          <p className="music-card__artist">Lofi Girl</p>
        </div>
        <p className="music-card__footer">
          <span>Lo más repetido este mes</span>
          <span className="music-card__spotify">Listen on Spotify</span>
        </p>
      </div>
      <div className="photo-row" aria-hidden>
        {PHOTOS.map((p, i) => (
          <div
            key={i}
            className="photo-row__card"
            style={{ transform: `rotate(${p.rotate}deg)` }}
          >
            <div className="photo-row__placeholder" />
            <span className="photo-row__cap">{p.caption}</span>
          </div>
        ))}
      </div>
      <div className="photo-row__links">
        <span>Shot with iPhone</span>
        <a href={SITE.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </div>
    </section>
  );
}
