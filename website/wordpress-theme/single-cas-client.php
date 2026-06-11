<?php
/**
 * Single cas client (CPT: cas-client)
 * @package tls
 */
get_header();

while ( have_posts() ) : the_post();

$sector     = get_post_meta( get_the_ID(), '_cas_sector', true );
$challenge  = get_post_meta( get_the_ID(), '_cas_challenge', true );
$solution   = get_post_meta( get_the_ID(), '_cas_solution', true );
$result     = get_post_meta( get_the_ID(), '_cas_result', true );
?>

<!-- Hero cas client -->
<section class="tls-section tls-section--bg-alt tls-section--tight">
  <div class="tls-container tls-container--content">
    <nav class="tls-breadcrumb" aria-label="<?php esc_attr_e( 'Navigation', 'tls' ); ?>">
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Accueil', 'tls' ); ?></a>
      <span aria-hidden="true">/</span>
      <a href="<?php echo esc_url( get_post_type_archive_link( 'cas-client' ) ); ?>"><?php esc_html_e( 'Cas clients', 'tls' ); ?></a>
      <span aria-hidden="true">/</span>
      <span aria-current="page"><?php the_title(); ?></span>
    </nav>

    <?php if ( $sector ) : ?>
      <span class="tls-badge tls-badge--primary"><?php echo esc_html( $sector ); ?></span>
    <?php endif; ?>

    <h1 class="tls-article-header__title"><?php the_title(); ?></h1>

    <?php if ( has_excerpt() ) : ?>
      <p class="tls-article-header__excerpt"><?php the_excerpt(); ?></p>
    <?php endif; ?>
  </div>
</section>

<!-- Image de couverture -->
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

<!-- Sections structurées Challenge / Solution / Résultats -->
<?php if ( $challenge || $solution || $result ) : ?>
  <section class="tls-section tls-section--tight">
    <div class="tls-container tls-container--content">
      <div class="tls-case-study">

        <?php if ( $challenge ) : ?>
          <div class="tls-case-study__section tls-case-study__section--challenge">
            <h2 class="tls-case-study__section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
              <?php esc_html_e( 'Le défi', 'tls' ); ?>
            </h2>
            <div class="tls-case-study__section-body tls-content">
              <?php echo wp_kses_post( wpautop( $challenge ) ); ?>
            </div>
          </div>
        <?php endif; ?>

        <?php if ( $solution ) : ?>
          <div class="tls-case-study__section tls-case-study__section--solution">
            <h2 class="tls-case-study__section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <?php esc_html_e( 'Notre approche', 'tls' ); ?>
            </h2>
            <div class="tls-case-study__section-body tls-content">
              <?php echo wp_kses_post( wpautop( $solution ) ); ?>
            </div>
          </div>
        <?php endif; ?>

        <?php if ( $result ) : ?>
          <div class="tls-case-study__section tls-case-study__section--result">
            <h2 class="tls-case-study__section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              <?php esc_html_e( 'Les résultats', 'tls' ); ?>
            </h2>
            <div class="tls-case-study__section-body tls-content">
              <?php echo wp_kses_post( wpautop( $result ) ); ?>
            </div>
          </div>
        <?php endif; ?>

      </div>
    </div>
  </section>
<?php endif; ?>

<!-- Contenu WordPress principal -->
<?php if ( has_blocks() || trim( get_the_content() ) !== '' ) : ?>
  <section class="tls-section tls-section--tight">
    <div class="tls-container tls-container--content">
      <div class="tls-content">
        <?php the_content(); ?>
      </div>
    </div>
  </section>
<?php endif; ?>

<!-- Retour + CTA -->
<section class="tls-section tls-section--bg-alt tls-section--tight">
  <div class="tls-container tls-container--content">
    <div class="tls-case-study__footer">
      <a href="<?php echo esc_url( get_post_type_archive_link( 'cas-client' ) ); ?>" class="tls-btn tls-btn--ghost">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        <?php esc_html_e( 'Tous les cas clients', 'tls' ); ?>
      </a>
      <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="tls-btn tls-btn--primary">
        <?php esc_html_e( 'Discutons de votre projet', 'tls' ); ?>
      </a>
    </div>
  </div>
</section>

<?php
endwhile;

get_footer();
