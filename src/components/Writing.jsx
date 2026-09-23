import { WRITING } from '../data/content';

export default function Writing() {
  return (
    <section className="section" aria-labelledby="writing-label">
      <h2 id="writing-label" className="section-label">
        WRITING
      </h2>
      <ul className="writing-list">
        {WRITING.map((post) => (
          <li key={post.title} className="writing-list__row">
            <span className="writing-list__date">{post.date}</span>
            <span className="writing-list__title">
              {post.title}
              {post.soon && (
                <span className="writing-list__badge"> pronto</span>
              )}
            </span>
            <span className="writing-list__time">
              <span className="writing-list__clock" aria-hidden>
                ◷
              </span>{' '}
              {post.minutes}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
