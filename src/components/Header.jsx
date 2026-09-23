import { NAV, SITE } from '../data/content';
import { navigateTo } from '../hooks/useScrollRouting';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <span className="site-header__est">EST. {SITE.est}</span>
        <nav className="site-header__nav" aria-label="Principal">
          {NAV.map(({ label, path }) => (
            <a
              key={path}
              href={path}
              className="site-header__link"
              onClick={(e) => {
                e.preventDefault();
                navigateTo(path);
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
