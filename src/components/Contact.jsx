import { useState } from 'react';
import { SITE } from '../data/content';

export default function Contact({ onCopy, onToast }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleCopy = async () => {
    await onCopy();
    onToast('Email copiado al portapapeles');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hola Sergio — ${form.name || 'Contacto web'}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    onToast('Abriendo tu cliente de correo…');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="section section--contact" aria-labelledby="contact-label">
      <h2 id="contact-label" className="visually-hidden">
        Contact
      </h2>
      <div className="chat">
        <div className="chat__bubble chat__bubble--me">
          <p>estás muy crack o algo</p>
        </div>
        <div className="chat__bubble chat__bubble--me">
          <p>¿cómo te contacto de verdad?</p>
        </div>
        <div className="chat__bubble chat__bubble--them">
          <p>Lo más rápido: email. Corto y al grano, sin novelas.</p>
        </div>
        <div className="chat__bubble chat__bubble--them chat__bubble--card">
          <div className="email-card">
            <p className="email-card__addr">
              {SITE.email}
              <span className="email-card__hint"> (menos de 300 caracteres, pls)</span>
            </p>
            <button type="button" className="email-card__copy" onClick={handleCopy}>
              <span aria-hidden>⧉</span> Copy
            </button>
          </div>
        </div>
        <div className="chat__bubble chat__bubble--me">
          <p>uff, pereza escribir un mail tho</p>
        </div>
        <div className="chat__bubble chat__bubble--them">
          <p>Vale, rellena esto y te abro el correo con el mensaje listo:</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              autoComplete="name"
            />
            <input
              type="email"
              name="email"
              placeholder="john@doe.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              autoComplete="email"
              required
            />
            <textarea
              name="message"
              placeholder="Enter your message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              required
              maxLength={300}
            />
            <button type="submit" className="contact-form__submit">
              Submit
            </button>
          </form>
        </div>
        <div className="chat__bubble chat__bubble--me">
          <p>genial, gracias</p>
        </div>
        <div className="chat__bubble chat__bubble--them">
          <p>O si prefieres, por aquí también:</p>
          <div className="contact-actions">
            <a
              href={SITE.freelancer}
              target="_blank"
              rel="noreferrer"
              className="contact-actions__btn"
            >
              <span aria-hidden>📋</span> Proyecto en Freelancer
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="contact-actions__btn"
            >
              <span aria-hidden>⌘</span> GitHub
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="contact-actions__btn"
            >
              <span aria-hidden>✉</span> Email directo
            </a>
          </div>
        </div>
        <div className="chat__bubble chat__bubble--me">
          <p>perfecto, te escribo</p>
        </div>
        <div className="chat__bubble chat__bubble--them">
          <p>
            Genial. No lo pienses demasiado — di hola. Siempre abierto a hablar de
            React, producto o lo que estés construyendo.
          </p>
        </div>
        <div className="chat__bubble chat__bubble--them">
          <p>suerte ;)</p>
        </div>
      </div>
    </section>
  );
}
