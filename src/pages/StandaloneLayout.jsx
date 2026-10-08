import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCopyEmail } from '../hooks/useCopyEmail';

export default function StandaloneLayout({ children, className = '' }) {
  useCopyEmail();

  return (
    <div className={`page page--doc ${className}`.trim()}>
      <Header variant="standalone" />
      <main className="page__main doc-main">{children}</main>
      <Footer />
    </div>
  );
}
