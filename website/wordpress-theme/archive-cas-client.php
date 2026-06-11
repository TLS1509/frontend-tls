<?php
/**
 * Archive — Cas clients (CPT: cas-client)
 * @package tls
 */
get_header();
?>

<!-- Hero archive cas clients -->
<section class="tls-hero tls-hero--primary">
  <div class="tls-container">
    <div class="tls-hero__label">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      <?php esc_html_e( 'Cas clients', 'tls' ); ?>
    </div>
    <h1 class="tls-hero__title"><?php esc_html_e( 'Nos missions', 'tls' ); ?></h1>
    <p class="tls-hero__summary">
      <?php esc_html_e( "Découvrez comment organismes de formation, équipes L&D et cabinets de conseil ont transformé leurs pratiques pédagogiques avec The Learning Society.", 'tls' ); ?>
    </p>
  </div>
</section>

<!-- Grille de cas clients -->
<section class="tls-section">
  <div class="tls-container">
    <?php if ( have_posts() ) : ?>
      <div class="tls-grid tls-grid--2">
        <?php while ( have_posts() ) : the_post();
          $sector = get_post_meta( get_the_ID(), '_cas_sector', true );
        ?>
          <article id="post-<?php the_ID(); ?>" <?php post_class( 'tls-cas-card' ); ?>>
            <a href="<?php the_permalink(); ?>" class="tls-cas-card__link" aria-label="<?php echo esc_attr( get_the_title() ); ?>">

              <?php if ( has_post_thumbnail() ) : ?>
                <div class="tls-cas-card__image">
                  <?php the_post_thumbnail( 'tls-card', [
                      'alt'     => esc_attr( get_the_title() ),
                      'loading' => 'lazy',
                  ] ); ?>
                </div>
              <?php endif; ?>

              <div class="tls-cas-card__body">
                <?php if ( $sector ) : ?>
                  <span class="tls-badge tls-badge--primary"><?php echo esc_html( $sector ); ?></span>
                <?php endif; ?>
                <h2 class="tls-cas-card__title"><?php the_title(); ?></h2>
                <?php if ( has_excerpt() ) : ?>
                  <p class="tls-cas-card__excerpt"><?php the_excerpt(); ?></p>
                <?php endif; ?>
                <span class="tls-btn tls-btn--ghost tls-btn--sm tls-cas-card__cta">
                  <?php esc_html_e( 'Lire l'étude de cas', 'tls' ); ?>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </div>

            </a>
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
      <div class="tls-empty-state">
        <p><?php esc_html_e( 'Les cas clients arrivent bientôt.', 'tls' ); ?></p>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="tls-btn tls-btn--primary">
          <?php esc_html_e( 'Discutons de votre projet', 'tls' ); ?>
        </a>
      </div>
    <?php endif; ?>
  </div>
</section>

<!-- CTA band -->
<div class="tls-cta-band">
  <div class="tls-container">
    <div class="tls-cta-band__inner">
      <h2 class="tls-cta-band__title">
        <?php esc_html_e( "Votre projet pourrait être le prochain.", 'tls' ); ?>
      </h2>
      <p class="tls-cta-band__subtitle">
        <?php esc_html_e( "Échangeons sur votre contexte et voyons comment nous pouvons collaborer.", 'tls' ); ?>
      </p>
      <div class="tls-cta-band__actions">
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="tls-btn tls-btn--sun tls-btn--lg">
          <?php esc_html_e( 'Démarrer une conversation', 'tls' ); ?>
        </a>
      </div>
    </div>
  </div>
</div>

<?php get_footer();
