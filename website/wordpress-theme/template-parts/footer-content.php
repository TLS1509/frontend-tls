<?php
/**
 * Footer TLS — aligné sur le site statique validé (public/site).
 * Pas de newsletter ni de badges « Open Badge 2.0 / CPF / OPCO / AI Act »
 * (claims non sourcés retirés). Liens légaux pointant vers les pages WP si présentes.
 *
 * @package tls
 */

$linkedin_url = tls_get_option( 'linkedin_url', 'https://www.linkedin.com/company/thelearningsociety/' );
?>
<!-- ══════════ FOOTER ══════════ -->
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="nav__logo">The Learning<span class="nav__logo-dot">&nbsp;Society</span></a>
        <p><?php esc_html_e( "Nous aidons les professionnels de la formation à intégrer l'IA dans leur métier. Paris, France.", 'tls' ); ?></p>
      </div>
      <div>
        <h3 class="footer__col-title"><?php esc_html_e( 'Nos offres', 'tls' ); ?></h3>
        <ul class="footer__links">
          <li><a href="<?php echo esc_url( home_url( '/formation/' ) ); ?>"><?php esc_html_e( 'Formation', 'tls' ); ?></a></li>
          <li><a href="<?php echo esc_url( home_url( '/learning-app/' ) ); ?>"><?php esc_html_e( 'Learning App', 'tls' ); ?></a></li>
          <li><a href="<?php echo esc_url( home_url( '/accompagnement/' ) ); ?>"><?php esc_html_e( 'Accompagnement', 'tls' ); ?></a></li>
        </ul>
      </div>
      <div>
        <h3 class="footer__col-title"><?php esc_html_e( 'Société', 'tls' ); ?></h3>
        <ul class="footer__links">
          <li><a href="<?php echo esc_url( home_url( '/ressources/' ) ); ?>"><?php esc_html_e( 'À propos', 'tls' ); ?></a></li>
          <li><a href="<?php echo esc_url( home_url( '/ressources/' ) ); ?>"><?php esc_html_e( 'Ressources', 'tls' ); ?></a></li>
          <li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Contact', 'tls' ); ?></a></li>
        </ul>
      </div>
      <div>
        <h3 class="footer__col-title"><?php esc_html_e( 'Légal', 'tls' ); ?></h3>
        <ul class="footer__links">
          <li><a href="<?php echo esc_url( home_url( '/mentions-legales/' ) ); ?>"><?php esc_html_e( 'Mentions légales', 'tls' ); ?></a></li>
          <li><a href="<?php echo esc_url( home_url( '/confidentialite/' ) ); ?>"><?php esc_html_e( 'Confidentialité', 'tls' ); ?></a></li>
          <li><a href="<?php echo esc_url( home_url( '/charte-ia/' ) ); ?>"><?php esc_html_e( 'Charte IA', 'tls' ); ?></a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>&copy; <?php echo esc_html( date( 'Y' ) ); ?> The Learning Society</span>
      <span><?php esc_html_e( 'Certifié Qualiopi via C-Campus', 'tls' ); ?></span>
    </div>
  </div>
</footer>
