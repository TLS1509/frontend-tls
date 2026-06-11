<?php
/**
 * Archive — Magazine, catégories, taxonomies
 * @package tls
 */
get_header();

$term = get_queried_object();
?>

<!-- Hero archive -->
<section class="tls-hero tls-hero--warm">
  <div class="tls-container">
    <div class="tls-hero__label">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      <?php esc_html_e( 'Magazine', 'tls' ); ?>
    </div>

    <?php if ( is_category() || is_tax() ) : ?>
      <h1 class="tls-hero__title"><?php single_term_title(); ?></h1>
      <?php if ( $term && $term->description ) : ?>
        <p class="tls-hero__summary"><?php echo esc_html( $term->description ); ?></p>
      <?php endif; ?>
    <?php elseif ( is_tag() ) : ?>
      <h1 class="tls-hero__title"><?php printf( esc_html__( 'Articles sur "%s"', 'tls' ), single_tag_title( '', false ) ); ?></h1>
    <?php elseif ( is_author() ) : ?>
      <h1 class="tls-hero__title"><?php the_author(); ?></h1>
    <?php elseif ( is_date() ) : ?>
      <h1 class="tls-hero__title"><?php the_archive_title(); ?></h1>
    <?php else : ?>
      <h1 class="tls-hero__title"><?php esc_html_e( 'Magazine', 'tls' ); ?></h1>
      <p class="tls-hero__summary"><?php esc_html_e( "Réflexions sur l'IA, la pédagogie, et le futur de la formation professionnelle.", 'tls' ); ?></p>
    <?php endif; ?>
  </div>
</section>

<!-- Filters -->
<div class="tls-section tls-section--tight tls-section--bg-alt">
  <div class="tls-container">

    <?php
    $categories = get_terms( [ 'taxonomy' => 'category', 'hide_empty' => true ] );
    if ( ! is_wp_error( $categories ) && count( $categories ) > 1 ) : ?>
      <ul class="tls-filters" role="list" aria-label="<?php esc_attr_e( 'Filtrer par catégorie', 'tls' ); ?>">
        <li>
          <a href="<?php echo esc_url( get_post_type_archive_link( 'post' ) ?: home_url( '/magazine/' ) ); ?>"
             class="tls-filter-btn <?php echo ! is_category() ? 'tls-filter-btn--active' : ''; ?>"
             data-filter="all">
            <?php esc_html_e( 'Tous', 'tls' ); ?>
          </a>
        </li>
        <?php foreach ( $categories as $cat ) : ?>
          <li>
            <a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>"
               class="tls-filter-btn <?php echo ( is_category( $cat->term_id ) ) ? 'tls-filter-btn--active' : ''; ?>"
               data-filter="<?php echo esc_attr( $cat->slug ); ?>">
              <?php echo esc_html( $cat->name ); ?>
            </a>
          </li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>

  </div>
</div>

<!-- Articles grid -->
<section class="tls-section">
  <div class="tls-container">
    <?php if ( have_posts() ) : ?>
      <div class="tls-grid tls-grid--3">
        <?php while ( have_posts() ) : the_post();
            get_template_part( 'template-parts/article/card' );
        endwhile; ?>
      </div>

      <?php the_posts_pagination( [
          'prev_text'          => '&larr;',
          'next_text'          => '&rarr;',
          'before_page_number' => '<span class="sr-only">' . esc_html__( 'Page', 'tls' ) . ' </span>',
          'class'              => 'tls-pagination',
      ] ); ?>

    <?php else : ?>
      <p><?php esc_html_e( 'Aucun article dans cette catégorie.', 'tls' ); ?></p>
    <?php endif; ?>
  </div>
</section>

<?php get_footer();
