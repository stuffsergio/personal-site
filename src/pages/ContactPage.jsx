import { useState, useCallback } from 'react';
import { SITE } from '../data/content';
import Contact from '../components/Contact';
import Toast from '../components/Toast';
import StandaloneLayout from './StandaloneLayout';
import { useCopyEmail } from '../hooks/useCopyEmail';

export default function ContactPage() {
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setToastVisible(true);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToastVisible(false), 2800);
  }, []);

  const copyEmail = useCopyEmail(() =>
    showToast('Email copiado — sergioperezmontalvo@gmail.com'),
  );

  return (
    <StandaloneLayout>
      <article className="doc doc--contact-intro">
        <h1>Contacto con {SITE.name}</h1>
        <p className="doc__lead">
          Email:{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Respuesta lo antes posible en
          días laborables (hora de Madrid).
        </p>
        <p>
          Uso este sitio como portfolio y punto de entrada para encargos freelance: React,
          landings, portfolios, pequeños negocios, Expo y pulido de UI. El formulario inferior
          abre tu cliente de correo; no guardo mensajes en servidor.
        </p>
        <p>
          También puedes encontrarme en{' '}
          <a href={SITE.freelancer} target="_blank" rel="noreferrer">
            Freelancer
          </a>{' '}
          o{' '}
          <a href={SITE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          . Pulsa <kbd>C</kbd> en cualquier página para copiar el email.
        </p>
      </article>
      <Contact onCopy={copyEmail} onToast={showToast} />
      <Toast message={toast} visible={toastVisible} />
    </StandaloneLayout>
  );
}
