import { STACK } from '../data/content';

function StackIcon({ name, color }) {
  const initial = name.charAt(0);
  return (
    <li className="stack__item" title={name}>
      <span
        className="stack__circle"
        style={{ background: `${color}18`, borderColor: `${color}40` }}
      >
        <span className="stack__letter" style={{ color }}>
          {initial}
        </span>
      </span>
    </li>
  );
}

export default function StackIcons() {
  return (
    <section className="section" aria-labelledby="stack-label">
      <h2 id="stack-label" className="section-label">
        STACK
      </h2>
      <ul className="stack">
        {STACK.map((tool) => (
          <StackIcon key={tool.name} {...tool} />
        ))}
      </ul>
    </section>
  );
}
