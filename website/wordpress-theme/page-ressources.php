<?php
/**
 * Template Name: Ressources — Articles, méthode & à propos
 * Transposition WP du site statique validé : public/site/ressources.html
 * Tone sun. Liste d'articles branchée sur les vrais posts (fallback statique).
 *
 * @package tls
 */
get_header();
?>

<!-- ══════════ HERO ══════════ -->
<section class="hero hero--page hero--sun">
  <div class="hero__blob hero__blob--sun" aria-hidden="true"></div>

  <div class="container">
    <div class="hero__inner" data-stagger="90">
      <h1 class="display-xl reveal"><?php esc_html_e( 'Ressources.', 'tls' ); ?></h1>
      <p class="lede reveal">
        <?php esc_html_e( "Articles, méthode et présentation de The Learning Society. De quoi nourrir votre réflexion sur l'IA et la pédagogie.", 'tls' ); ?>
      </p>
    </div>
  </div>
</section>

<!-- ══════════ MAGAZINE ══════════ -->
<section class="section">
  <div class="container">
    <div style="display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem;">
      <div class="section-head reveal" style="margin-bottom: 0;">
        <span class="eyebrow"><?php esc_html_e( "Le Mag'", 'tls' ); ?></span>
        <h2 class="display-lg"><?php esc_html_e( 'Nos publications.', 'tls' ); ?></h2>
      </div>
      <a href="<?php echo esc_url( home_url( '/magazine/' ) ); ?>" class="link-row reveal">
        <?php esc_html_e( 'Tout le magazine', 'tls' ); ?>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>

    <div class="mag-list" data-stagger="50">
      <?php tls_render_mag_list( 10 ); ?>
    </div>
  </div>
</section>

<!-- ══════════ MÉTHODE STRIDE ══════════ -->
<section class="section section--pastel">
  <div class="container container--content">
    <div class="section-head reveal">
      <span class="eyebrow"><?php esc_html_e( 'La méthode', 'tls' ); ?></span>
      <h2 class="display-lg"><?php esc_html_e( 'STRIDE, notre cadre de transformation.', 'tls' ); ?></h2>
    </div>
    <div class="prose reveal">
      <p>
        <?php
        printf(
            /* translators: %s = liste des 6 étapes STRIDE en gras */
            esc_html__( "STRIDE n'est pas un acronyme d'agence. C'est une séquence de transformation qui part de l'audit de maturité et se termine par l'évolution continue des compétences : %s", 'tls' ),
            '<strong>' . esc_html__( "S'orienter, Tester, Réaliser, Intégrer, Déployer, Évoluer.", 'tls' ) . '</strong>'
        );
        ?>
      </p>
      <p>
        <?php esc_html_e( "Chaque étape produit un livrable concret, ancré sur vos projets réels et centralisé sur la Learning App.", 'tls' ); ?>
      </p>
    </div>
    <a href="<?php echo esc_url( home_url( '/accompagnement/' ) ); ?>" class="link-row reveal" style="margin-top: 1.5rem;">
      <?php esc_html_e( "Voir l'accompagnement STRIDE", 'tls' ); ?>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </a>
  </div>
</section>

<!-- ══════════ À PROPOS ══════════ -->
<section class="section">
  <div class="container container--content">
    <div class="section-head reveal">
      <span class="eyebrow"><?php esc_html_e( 'À propos', 'tls' ); ?></span>
      <h2 class="display-lg"><?php esc_html_e( 'The Learning Society.', 'tls' ); ?></h2>
    </div>
    <div class="prose reveal">
      <p>
        <?php
        printf(
            /* translators: %1$s, %2$s = noms des fondateurs en gras */
            esc_html__( 'The Learning Society est fondée par %1$s et %2$s.', 'tls' ),
            '<strong>' . esc_html__( 'Chloé Mimault', 'tls' ) . '</strong>',
            '<strong>' . esc_html__( 'Pierre-Armand Dennery', 'tls' ) . '</strong>'
        );
        ?>
      </p>
      <p>
        <?php esc_html_e( "Notre conviction : la gestion par les compétences est l'enjeu structurant de la formation professionnelle pour les dix prochaines années. Les organisations qui le comprennent maintenant prennent une longueur d'avance.", 'tls' ); ?>
      </p>
      <p>
        <?php esc_html_e( "Nous construisons les outils pour y arriver : formation certifiante, plateforme adaptative, accompagnement sur mesure.", 'tls' ); ?>
      </p>
    </div>
    <div class="hero__actions reveal" style="margin-top: 1.75rem;">
      <a href="<?php echo esc_url( home_url( '/formation/' ) ); ?>" class="btn btn--ghost btn--lg"><?php esc_html_e( 'Voir la formation', 'tls' ); ?></a>
      <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn--primary btn--lg"><?php esc_html_e( 'Nous contacter', 'tls' ); ?></a>
    </div>
  </div>
</section>

<?php get_footer();
