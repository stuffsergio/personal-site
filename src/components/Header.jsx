import { NAV, SITE } from '../data/content';
import { navigateTo } from '../hooks/useScrollRouting';

export default function Header({ variant = 'home' }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="/" className="site-header__est">
          EST. {SITE.est}
        </a>
        <nav className="site-header__nav" aria-label="Principal">
          {NAV.map(({ label, path }) => (
            <a
              key={path}
              href={path}
              className="site-header__link"
              onClick={
                variant === 'home'
                  ? (e) => {
                      e.preventDefault();
                      navigateTo(path);
                    }
                  : undefined
              }
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
