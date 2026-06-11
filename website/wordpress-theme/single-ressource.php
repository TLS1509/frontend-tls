<?php
/**
 * Single ressource (CPT: ressource)
 * @package tls
 */
get_header();

while ( have_posts() ) : the_post();

$ressource_type = get_post_meta( get_the_ID(), '_ressource_type', true );
$ressource_file = get_post_meta( get_the_ID(), '_ressource_file', true );

// Related ressources
$related = new WP_Query( [
    'post_type'      => 'ressource',
    'post__not_in'   => [ get_the_ID() ],
    'posts_per_page' => 3,
    'orderby'        => 'rand',
] );
?>

<!-- Header ressource -->
<section class="tls-section tls-section--bg-alt tls-section--tight">
  <div class="tls-container tls-container--content">
    <header>
      <div class="tls-article-card__meta">
        <?php if ( $ressource_type ) : ?>
          <span class="tls-badge tls-badge--sun"><?php echo esc_html( $ressource_type ); ?></span>
        <?php endif; ?>
      </div>

      <h1 class="tls-article-header__title"><?php the_title(); ?></h1>

      <?php if ( has_excerpt() ) : ?>
        <p class="tls-article-header__excerpt"><?php the_excerpt(); ?></p>
      <?php endif; ?>

      <?php if ( $ressource_file ) : ?>
        <div class="tls-ressource-single__cta">
          <a href="<?php echo esc_url( $ressource_file ); ?>"
             class="tls-btn tls-btn--sun tls-btn--lg"
             download
             aria-label="<?php echo esc_attr( sprintf( __( 'Télécharger la ressource : %s', 'tls' ), get_the_title() ) ); ?>">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <?php esc_html_e( 'Télécharger la ressource', 'tls' ); ?>
          </a>
        </div>
      <?php endif; ?>
    </header>
  </div>
</section>

<!-- Image -->
<?php if ( has_post_thumbnail() ) : ?>
  <div class="tls-container" style="margin-bottom: var(--space-section);">
    <div class="tls-article-header__cover">
      <?php the_post_thumbnail( 'tls-card-lg', [
          'alt'     => esc_attr( get_the_title() ),
          'loading' => 'eager',
      ] ); ?>
    </div>
  </div>
<?php endif; ?>

<!-- Contenu -->
<section class="tls-section tls-section--tight">
  <div class="tls-container tls-container--content">
    <div class="tls-content">
      <?php the_content(); ?>
    </div>

    <?php if ( $ressource_file ) : ?>
      <div class="tls-ressource-single__cta tls-ressource-single__cta--bottom">
        <a href="<?php echo esc_url( $ressource_file ); ?>"
           class="tls-btn tls-btn--sun tls-btn--lg"
           download>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <?php esc_html_e( 'Télécharger la ressource', 'tls' ); ?>
        </a>
        <a href="<?php echo esc_url( get_post_type_archive_link( 'ressource' ) ); ?>" class="tls-btn tls-btn--ghost tls-btn--lg">
          <?php esc_html_e( '← Toutes les ressources', 'tls' ); ?>
        </a>
      </div>
    <?php endif; ?>
  </div>
</section>

<!-- Ressources liées -->
<?php if ( $related->have_posts() ) : ?>
  <section class="tls-section tls-section--bg-alt">
    <div class="tls-container">
      <div class="tls-section-header">
        <h2 class="tls-section-header__title"><?php esc_html_e( 'Ressources associées', 'tls' ); ?></h2>
      </div>
      <div class="tls-grid tls-grid--3">
        <?php while ( $related->have_posts() ) : $related->the_post();
          $rel_type = get_post_meta( get_the_ID(), '_ressource_type', true );
          $rel_file = get_post_meta( get_the_ID(), '_ressource_file', true );
        ?>
          <article <?php post_class( 'tls-ressource-card' ); ?>>
            <div class="tls-ressource-card__inner">
              <div class="tls-ressource-card__body">
                <div class="tls-article-card__meta">
                  <?php if ( $rel_type ) : ?>
                    <span class="tls-badge tls-badge--sun"><?php echo esc_html( $rel_type ); ?></span>
                  <?php endif; ?>
                </div>
                <h3 class="tls-article-card__title">
                  <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </h3>
                <div class="tls-ressource-card__actions">
                  <a href="<?php the_permalink(); ?>" class="tls-btn tls-btn--ghost tls-btn--sm">
                    <?php esc_html_e( 'Voir', 'tls' ); ?>
                  </a>
                  <?php if ( $rel_file ) : ?>
                    <a href="<?php echo esc_url( $rel_file ); ?>" class="tls-btn tls-btn--sun tls-btn--sm" download>
                      <?php esc_html_e( 'Télécharger', 'tls' ); ?>
                    </a>
                  <?php endif; ?>
                </div>
              </div>
            </div>
          </article>
        <?php endwhile;
        wp_reset_postdata(); ?>
      </div>
    </div>
  </section>
<?php endif;

endwhile;

get_footer();
