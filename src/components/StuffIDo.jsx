import { STUFF_I_DO, WORK_CARDS } from '../data/content';

export default function StuffIDo() {
  return (
    <section className="section section--work" aria-labelledby="stuff-label">
      <h2 id="stuff-label" className="section-label">
        STUFF I DO
      </h2>
      <p className="stuff-text">{STUFF_I_DO}</p>
      <div className="work-collage" aria-hidden>
        {WORK_CARDS.map((card, i) => (
          <div
            key={i}
            className="work-collage__card"
            style={{
              background: card.gradient,
              transform: `rotate(${card.rotate}deg)`,
              zIndex: card.z,
              left: card.left,
            }}
          />
        ))}
      </div>
    </section>
  );
}
