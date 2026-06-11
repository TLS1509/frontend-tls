<?php
/**
 * 404
 * @package tls
 */
get_header();
?>
<section class="tls-section">
  <div class="tls-container tls-container--content" style="text-align:center; padding-top:4rem; padding-bottom:4rem;">
    <p style="font-size:5rem; line-height:1; font-family:var(--font-display); font-weight:800; color:var(--color-ink-200);">404</p>
    <h1 class="tls-hero__title" style="margin-top:1rem;"><?php esc_html_e( 'Page introuvable', 'tls' ); ?></h1>
    <p class="tls-hero__summary" style="margin:1.5rem auto 2.5rem;"><?php esc_html_e( "La page que vous cherchez n'existe pas ou a été déplacée.", 'tls' ); ?></p>
    <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap;">
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="tls-btn tls-btn--primary"><?php esc_html_e( "Retour à l'accueil", 'tls' ); ?></a>
      <a href="<?php echo esc_url( home_url( '/magazine/' ) ); ?>" class="tls-btn tls-btn--ghost"><?php esc_html_e( 'Lire le magazine', 'tls' ); ?></a>
    </div>
  </div>
</section>
<?php get_footer();
