import { CANONICAL_ORIGIN } from '../data/siteMeta';
import StandaloneLayout from './StandaloneLayout';

export default function NotFoundPage() {
  return (
    <StandaloneLayout>
      <article className="doc">
        <h1>Página no encontrada</h1>
        <p className="doc__lead">
          La URL que has abierto no existe en este sitio. Puede que el enlace esté desactualizado
          o que hayas escrito mal la ruta.
        </p>
        <p>
          <a href="/">Volver al inicio</a> · <a href="/contact">Contacto</a>
        </p>
        <p>
          Para agentes y crawlers: consulta{' '}
          <a href="/llms.txt">/llms.txt</a> y <a href="/sitemap.xml">/sitemap.xml</a> en{' '}
          {CANONICAL_ORIGIN}.
        </p>
      </article>
    </StandaloneLayout>
  );
}
