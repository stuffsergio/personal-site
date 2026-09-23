import { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import StuffIDo from './components/StuffIDo';
import StackIcons from './components/StackIcons';
import Ventures from './components/Ventures';
import Writing from './components/Writing';
import Personal from './components/Personal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { useScrollRouting } from './hooks/useScrollRouting';
import { useCopyEmail } from './hooks/useCopyEmail';

export default function App() {
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

  useScrollRouting();

  return (
    <div className="page">
      <Header />
      <main className="page__main">
        <div id="about" className="anchor" />
        <Hero />
        <Experience />
        <div id="work" className="anchor" />
        <StuffIDo />
        <StackIcons />
        <Ventures />
        <div id="thoughts" className="anchor" />
        <Writing />
        <Personal />
        <div id="contact" className="anchor" />
        <Contact onCopy={copyEmail} onToast={showToast} />
      </main>
      <Footer />
      <Toast message={toast} visible={toastVisible} />
    </div>
  );
}
