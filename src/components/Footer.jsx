import { useEffect, useState } from 'react';
import { SITE } from '../data/content';

function formatMadridTime(date) {
  return new Intl.DateTimeFormat('es-ES', {
    timeZone: 'Europe/Madrid',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

function madridOffsetLabel(date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Madrid',
    timeZoneName: 'shortOffset',
  }).formatToParts(date);
  const tz = parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT+1';
  return tz.replace('GMT', 'GMT');
}

export default function Footer() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="site-footer">
      <div className="site-footer__sign">
        <svg
          className="site-footer__scribble"
          viewBox="0 0 280 80"
          aria-hidden
          fill="none"
        >
          <path
            d="M12 52 C40 20, 80 70, 110 38 S170 15, 200 45 S250 60, 268 28"
            stroke="#2f2f2f"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <p className="site-footer__note">Una frase con la que intento vivir</p>
        <blockquote className="site-footer__quote">
          &ldquo;He fallado mil veces; aquí vamos otra vez.&rdquo;
        </blockquote>
      </div>
      <div className="site-footer__bar">
        <div className="site-footer__identity">
          <img src={SITE.avatar} alt="" width={24} height={24} />
          <span>{SITE.fullName.toUpperCase()}</span>
        </div>
        <time className="site-footer__clock" dateTime={now.toISOString()}>
          <span aria-hidden>◷</span>{' '}
          {formatMadridTime(now)} {madridOffsetLabel(now)} · Europe/Madrid
        </time>
      </div>
    </footer>
  );
}
