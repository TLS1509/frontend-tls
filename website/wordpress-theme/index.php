<?php
/**
 * Fallback — liste d'articles (magazine)
 * @package tls
 */
get_header();
?>
<div class="tls-section">
  <div class="tls-container">

    <?php if ( is_home() && ! is_front_page() ) : ?>
      <div class="tls-section-header">
        <h1 class="tls-section-header__title"><?php single_post_title(); ?></h1>
      </div>
    <?php endif; ?>

    <?php if ( have_posts() ) : ?>
      <div class="tls-grid tls-grid--3">
        <?php while ( have_posts() ) : the_post();
            get_template_part( 'template-parts/article/card' );
        endwhile; ?>
      </div>

      <?php the_posts_pagination( [
          'prev_text' => '&larr;',
          'next_text' => '&rarr;',
          'before_page_number' => '<span class="sr-only">' . esc_html__( 'Page', 'tls' ) . ' </span>',
          'class'     => 'tls-pagination',
      ] ); ?>

    <?php else : ?>
      <p><?php esc_html_e( 'Aucun article trouvé.', 'tls' ); ?></p>
    <?php endif; ?>

  </div>
</div>
<?php get_footer();
