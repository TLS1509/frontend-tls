<?php
/**
 * Navigation principale TLS — aligné sur le site statique validé (public/site).
 * Nav fixe (Formation · Learning App · Accompagnement · Ressources · [Contact]),
 * état actif dérivé du template de page courant. Le drawer mobile et la nav glass
 * condensée au scroll sont pilotés par assets/js/site.js.
 *
 * @package tls
 */

// État actif par template de page (robuste quel que soit le slug réel).
$is_formation = is_page_template( 'page-formation.php' );
$is_app       = is_page_template( 'page-learning-app.php' );
$is_accomp    = is_page_template( 'page-accompagnement.php' );
$is_ressources = is_page_template( 'page-ressources.php' )
    || is_home() || is_singular( 'post' ) || is_category() || is_tag()
    || is_post_type_archive( 'ressource' ) || is_singular( 'ressource' )
    || is_post_type_archive( 'cas-client' ) || is_singular( 'cas-client' );
$is_contact   = is_page_template( 'page-contact.php' );

$url_home    = esc_url( home_url( '/' ) );
$url_form    = esc_url( home_url( '/formation/' ) );
$url_app     = esc_url( home_url( '/learning-app/' ) );
$url_accomp  = esc_url( home_url( '/accompagnement/' ) );
$url_ress    = esc_url( home_url( '/ressources/' ) );
$url_contact = esc_url( home_url( '/contact/' ) );
?>
<!-- ══════════ NAV ══════════ -->
<div class="nav-wrap">
  <nav class="nav" aria-label="<?php esc_attr_e( 'Navigation principale', 'tls' ); ?>">
    <a href="<?php echo $url_home; ?>" class="nav__logo">The Learning<span class="nav__logo-dot">&nbsp;Society</span></a>

    <ul class="nav__links">
      <li><a href="<?php echo $url_form; ?>" class="nav__link<?php echo $is_formation ? ' is-active' : ''; ?>"><?php esc_html_e( 'Formation', 'tls' ); ?></a></li>
      <li><a href="<?php echo $url_app; ?>" class="nav__link<?php echo $is_app ? ' is-active' : ''; ?>"><?php esc_html_e( 'Learning App', 'tls' ); ?></a></li>
      <li><a href="<?php echo $url_accomp; ?>" class="nav__link<?php echo $is_accomp ? ' is-active' : ''; ?>"><?php esc_html_e( 'Accompagnement', 'tls' ); ?></a></li>
      <li><a href="<?php echo $url_ress; ?>" class="nav__link<?php echo $is_ressources ? ' is-active' : ''; ?>"><?php esc_html_e( 'Ressources', 'tls' ); ?></a></li>
    </ul>

    <a href="<?php echo $url_contact; ?>" class="btn btn--primary nav__cta<?php echo $is_contact ? ' is-active' : ''; ?>"><?php esc_html_e( 'Contact', 'tls' ); ?></a>

    <button class="nav__burger" aria-label="<?php esc_attr_e( 'Ouvrir le menu', 'tls' ); ?>" aria-expanded="false" aria-controls="drawer">
      <span></span><span></span><span></span>
    </button>
  </nav>
</div>

<!-- Drawer mobile -->
<div class="nav-drawer" id="drawer" aria-hidden="true">
  <ul class="nav-drawer__links">
    <li><a href="<?php echo $url_form; ?>" class="nav-drawer__link"><?php esc_html_e( 'Formation', 'tls' ); ?></a></li>
    <li><a href="<?php echo $url_app; ?>" class="nav-drawer__link"><?php esc_html_e( 'Learning App', 'tls' ); ?></a></li>
    <li><a href="<?php echo $url_accomp; ?>" class="nav-drawer__link"><?php esc_html_e( 'Accompagnement', 'tls' ); ?></a></li>
    <li><a href="<?php echo $url_ress; ?>" class="nav-drawer__link"><?php esc_html_e( 'Ressources', 'tls' ); ?></a></li>
  </ul>
  <div class="nav-drawer__footer">
    <a href="<?php echo $url_contact; ?>" class="btn btn--primary btn--lg"><?php esc_html_e( 'Nous contacter', 'tls' ); ?></a>
  </div>
</div>
