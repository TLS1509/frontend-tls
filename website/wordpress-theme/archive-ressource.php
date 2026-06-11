<?php
/**
 * Archive — Ressources (CPT: ressource)
 * @package tls
 */
get_header();

$resource_types = get_terms( [
    'taxonomy'   => 'ressource_type',
    'hide_empty' => true,
] );
?>

<!-- Hero archive ressources -->
<section class="tls-hero tls-hero--sun">
  <div class="tls-container">
    <div class="tls-hero__label">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      <?php esc_html_e( 'Ressources pédagogiques', 'tls' ); ?>
    </div>
    <h1 class="tls-hero__title"><?php esc_html_e( 'Ressources', 'tls' ); ?></h1>
    <p class="tls-hero__summary">
      <?php esc_html_e( "Guides, fiches pratiques, templates et outils pour intégrer l'IA dans vos pratiques pédagogiques.", 'tls' ); ?>
    </p>
  </div>
</section>

<!-- Filtres par type de ressource -->
<?php if ( ! is_wp_error( $resource_types ) && count( $resource_types ) > 0 ) : ?>
  <div class="tls-section tls-section--tight tls-section--bg-alt">
    <div class="tls-container">
      <ul class="tls-filters" role="list" aria-label="<?php esc_attr_e( 'Filtrer par type', 'tls' ); ?>">
        <li>
          <a href="<?php echo esc_url( get_post_type_archive_link( 'ressource' ) ); ?>"
             class="tls-filter-btn <?php echo ! is_tax() ? 'tls-filter-btn--active' : ''; ?>"
             data-filter="all">
            <?php esc_html_e( 'Tous', 'tls' ); ?>
          </a>
        </li>
        <?php foreach ( $resource_types as $type ) : ?>
          <li>
            <a href="<?php echo esc_url( get_term_link( $type ) ); ?>"
               class="tls-filter-btn <?php echo is_tax( 'ressource_type', $type->term_id ) ? 'tls-filter-btn--active' : ''; ?>"
               data-filter="<?php echo esc_attr( $type->slug ); ?>">
              <?php echo esc_html( $type->name ); ?>
            </a>
          </li>
        <?php endforeach; ?>
      </ul>
    </div>
  </div>
<?php endif; ?>

<!-- Grille de ressources -->
<section class="tls-section">
  <div class="tls-container">
    <?php if ( have_posts() ) : ?>
      <div class="tls-grid tls-grid--3">
        <?php while ( have_posts() ) : the_post();
          $ressource_type = get_post_meta( get_the_ID(), '_ressource_type', true );
          $ressource_file = get_post_meta( get_the_ID(), '_ressource_file', true );
        ?>
          <article id="post-<?php the_ID(); ?>" <?php post_class( 'tls-ressource-card' ); ?>>
            <div class="tls-ressource-card__inner">

              <?php if ( has_post_thumbnail() ) : ?>
                <div class="tls-ressource-card__image">
                  <?php the_post_thumbnail( 'tls-card', [
                      'alt'     => esc_attr( get_the_title() ),
                      'loading' => 'lazy',
                  ] ); ?>
                </div>
              <?php endif; ?>

              <div class="tls-ressource-card__body">
                <div class="tls-article-card__meta">
                  <?php if ( $ressource_type ) : ?>
                    <span class="tls-badge tls-badge--sun"><?php echo esc_html( $ressource_type ); ?></span>
                  <?php endif; ?>
                </div>

                <h2 class="tls-article-card__title">
                  <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </h2>

                <?php if ( has_excerpt() ) : ?>
                  <p class="tls-article-card__excerpt"><?php the_excerpt(); ?></p>
                <?php endif; ?>

                <div class="tls-ressource-card__actions">
                  <a href="<?php the_permalink(); ?>" class="tls-btn tls-btn--ghost tls-btn--sm">
                    <?php esc_html_e( 'Voir la ressource', 'tls' ); ?>
                  </a>
                  <?php if ( $ressource_file ) : ?>
                    <a href="<?php echo esc_url( $ressource_file ); ?>"
                       class="tls-btn tls-btn--sun tls-btn--sm"
                       download
                       aria-label="<?php echo esc_attr( sprintf( __( 'Télécharger : %s', 'tls' ), get_the_title() ) ); ?>">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      <?php esc_html_e( 'Télécharger', 'tls' ); ?>
                    </a>
                  <?php endif; ?>
                </div>
              </div>

            </div>
          </article>
        <?php endwhile; ?>
      </div>

      <?php the_posts_pagination( [
          'prev_text'          => '&larr;',
          'next_text'          => '&rarr;',
          'before_page_number' => '<span class="sr-only">' . esc_html__( 'Page', 'tls' ) . ' </span>',
          'class'              => 'tls-pagination',
      ] ); ?>

    <?php else : ?>
      <p class="tls-empty"><?php esc_html_e( 'Aucune ressource disponible pour l'instant.', 'tls' ); ?></p>
    <?php endif; ?>
  </div>
</section>

<?php get_footer();
