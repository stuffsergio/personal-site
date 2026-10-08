import { SITE } from '../data/content';
import { CANONICAL_ORIGIN } from '../data/siteMeta';
import StandaloneLayout from './StandaloneLayout';

export default function PrivacyPage() {
  return (
    <StandaloneLayout>
      <article className="doc">
        <h1>Política de privacidad</h1>
        <p className="doc__lead">
          Transparencia sobre este sitio estático ({CANONICAL_ORIGIN}) operado por{' '}
          {SITE.fullName}.
        </p>
        <h2>Responsable del tratamiento</h2>
        <p>
          {SITE.fullName}, {SITE.location}. Contacto:{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <h2>Datos que recopilo</h2>
        <p>
          No hay cuentas de usuario ni formularios que envíen datos a un backend propio. El
          formulario de contacto genera un enlace <code>mailto:</code> en tu dispositivo; tú
          decides si envías el correo. Lo que me escribas por email lo conservo para responder
          y, si aplica, gestionar un proyecto freelance.
        </p>
        <h2>Cookies y analítica</h2>
        <p>
          No utilizo cookies de seguimiento ni herramientas de analítica de terceros (p. ej.
          Google Analytics) en este sitio. Se cargan fuentes desde Google Fonts; ese servicio
          puede registrar solicitudes técnicas según su política. No vendo ni cedo datos
          personales a terceros con fines comerciales.
        </p>
        <h2>Alojamiento y logs</h2>
        <p>
          El sitio se publica como archivos estáticos. El proveedor de hosting puede registrar
          direcciones IP, agente de usuario y URLs solicitadas en logs de servidor habituales
          por seguridad y diagnóstico.
        </p>
        <h2>Tus derechos (RGPD)</h2>
        <p>
          Si resides en el Espacio Económico Europeo, puedes solicitar acceso, rectificación,
          supresión, limitación u oposición respecto a los datos personales que me hayas
          facilitado por email. Escríbeme a {SITE.email}; atenderé la solicitud en un plazo
          razonable sin coste indebido.
        </p>
        <h2>Cambios en esta política</h2>
        <p>
          Puedo actualizar este texto si cambia el funcionamiento del sitio. La fecha de
          revisión se refleja en el sitemap (<a href="/sitemap.xml">/sitemap.xml</a>).
        </p>
        <p>
          <a href="/">← Inicio</a> · <a href="/contact">Contacto</a>
        </p>
      </article>
    </StandaloneLayout>
  );
}
