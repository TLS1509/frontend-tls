<?php
/**
 * Résultats de recherche
 * @package tls
 */
get_header();
?>

<section class="tls-hero tls-hero--primary">
  <div class="tls-container">
    <h1 class="tls-hero__title">
      <?php
      if ( get_search_query() ) {
          printf( esc_html__( 'Résultats pour : "%s"', 'tls' ), '<span style="color:var(--color-primary-600);">' . esc_html( get_search_query() ) . '</span>' );
      } else {
          esc_html_e( 'Recherche', 'tls' );
      }
      ?>
    </h1>
    <form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" class="tls-search" style="max-width:480px; margin-top:1.5rem;">
      <svg class="tls-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <input type="search" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="<?php esc_attr_e( 'Rechercher…', 'tls' ); ?>" aria-label="<?php esc_attr_e( 'Recherche', 'tls' ); ?>">
    </form>
  </div>
</section>

<section class="tls-section">
  <div class="tls-container">
    <?php if ( have_posts() ) : ?>
      <p style="color:var(--color-ink-500); margin-bottom:var(--space-section);">
        <?php printf( esc_html__( '%d résultat(s) trouvé(s)', 'tls' ), $wp_query->found_posts ); ?>
      </p>
      <div class="tls-grid tls-grid--3">
        <?php while ( have_posts() ) : the_post();
            get_template_part( 'template-parts/article/card' );
        endwhile; ?>
      </div>
      <?php the_posts_pagination(); ?>
    <?php else : ?>
      <p><?php esc_html_e( 'Aucun résultat. Essayez avec d'autres mots-clés.', 'tls' ); ?></p>
    <?php endif; ?>
  </div>
</section>

<?php get_footer();
