<?php
/**
 * Front page — Accueil TLS.
 * Transposition WP du site statique validé : public/site/index.html
 * Registre vous (B2B). 100 % classes `site.css` (non préfixées).
 *
 * @package tls
 */
get_header();
?>

<!-- ══════════ HERO ══════════ -->
<section class="hero hero--home">
  <div class="hero__blob hero__blob--teal" aria-hidden="true"></div>
  <div class="hero__blob hero__blob--sun" aria-hidden="true"></div>

  <div class="container">
    <div class="hero__inner" data-stagger="90">
      <span class="hero__kicker reveal">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <?php esc_html_e( 'Formation, plateforme & accompagnement en pédagogie IA', 'tls' ); ?>
      </span>

      <h1 class="display-xl reveal">
        <?php esc_html_e( 'Maîtrisez', 'tls' ); ?> <span class="accent-word"><?php esc_html_e( "l'IA", 'tls' ); ?></span><br>
        <?php esc_html_e( 'dans vos formations.', 'tls' ); ?>
      </h1>

      <p class="lede reveal">
        <?php esc_html_e( "Formation certifiante, plateforme adaptative, accompagnement sur mesure. Nous aidons les professionnels de la formation à intégrer l'IA dans leur métier, avec méthode et sans perdre l'humain.", 'tls' ); ?>
      </p>

      <div class="hero__actions reveal">
        <a href="<?php echo esc_url( home_url( '/formation/' ) ); ?>" class="btn btn--primary btn--lg" data-magnetic="10">
          <?php esc_html_e( 'Découvrir la formation', 'tls' ); ?>
          <span class="btn__arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </a>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn--ghost btn--lg"><?php esc_html_e( 'Nous contacter', 'tls' ); ?></a>
      </div>
    </div>
  </div>
</section>

<!-- ══════════ LES 3 OFFRES ══════════ -->
<section class="section">
  <div class="container">
    <h2 class="display-lg reveal" style="margin-bottom: clamp(2rem, 5vw, 3.5rem); max-width: 16ch;">
      <?php esc_html_e( 'Trois façons de travailler', 'tls' ); ?> <span class="accent-word"><?php esc_html_e( 'avec nous', 'tls' ); ?></span>.
    </h2>

    <div class="poles">

      <!-- Formation -->
      <article class="pole pole--formation reveal">
        <div>
          <p class="pole__index"><?php esc_html_e( 'Apprendre · Formation', 'tls' ); ?></p>
          <h3 class="pole__title"><?php esc_html_e( 'Le parcours Formateur Augmenté', 'tls' ); ?></h3>
          <p class="pole__desc">
            <?php esc_html_e( "Un parcours certifiant de 7 modules pour intégrer l'IA générative dans vos pratiques pédagogiques. Conçu avec C-Campus (Qualiopi), validé par un Open Badge.", 'tls' ); ?>
          </p>
          <ul class="pole__points">
            <li><?php esc_html_e( '7 modules d\'environ 1 h, 100 % à distance', 'tls' ); ?></li>
            <li><?php esc_html_e( 'Open Badge « L\'IA en formation » délivré par C-Campus', 'tls' ); ?></li>
            <li><?php esc_html_e( 'Trois formules, à partir de 249 € HT', 'tls' ); ?></li>
          </ul>
          <a href="<?php echo esc_url( home_url( '/formation/' ) ); ?>" class="pole__link">
            <?php esc_html_e( 'Découvrir la formation', 'tls' ); ?>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
        <div class="pole__visual" aria-hidden="true">
          <span class="pole__glyph"><?php esc_html_e( 'Apprendre.', 'tls' ); ?></span>
        </div>
      </article>

      <!-- Accompagnement -->
      <article class="pole pole--accompagnement reveal">
        <div>
          <p class="pole__index"><?php esc_html_e( 'Concevoir · Accompagnement', 'tls' ); ?></p>
          <h3 class="pole__title"><?php esc_html_e( 'Le studio & le conseil sur mesure', 'tls' ); ?></h3>
          <p class="pole__desc">
            <?php esc_html_e( "Des experts en pédagogie et en IA. On audit, on conçoit, on déploie, on mesure. Pour les organismes de formation et les équipes L&D qui veulent structurer leur transition.", 'tls' ); ?>
          </p>
          <ul class="pole__points">
            <li><?php esc_html_e( 'Audit de maturité IA & pédagogie', 'tls' ); ?></li>
            <li><?php esc_html_e( 'Conception et production de contenus augmentés', 'tls' ); ?></li>
            <li><?php esc_html_e( 'Déploiement Qualiopi-compatible, cadré par la méthode STRIDE', 'tls' ); ?></li>
          </ul>
          <a href="<?php echo esc_url( home_url( '/accompagnement/' ) ); ?>" class="pole__link">
            <?php esc_html_e( "Découvrir l'accompagnement", 'tls' ); ?>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
        <div class="pole__visual" aria-hidden="true">
          <span class="pole__glyph"><?php esc_html_e( 'Concevoir.', 'tls' ); ?></span>
        </div>
      </article>

      <!-- Learning App -->
      <article class="pole pole--app reveal">
        <div>
          <p class="pole__index"><?php esc_html_e( 'Déployer · Learning App', 'tls' ); ?></p>
          <h3 class="pole__title"><?php esc_html_e( 'La plateforme adaptative', 'tls' ); ?></h3>
          <p class="pole__desc">
            <?php esc_html_e( "Une plateforme conçue pour que la formation colle à votre réalité. Parcours adaptatifs, journal réflexif, coaching augmenté et passeport de compétences.", 'tls' ); ?>
          </p>
          <ul class="pole__points">
            <li><?php esc_html_e( 'Parcours adaptatifs basés sur le modèle de Dreyfus', 'tls' ); ?></li>
            <li><?php esc_html_e( 'Journal réflexif et coaching humain augmenté', 'tls' ); ?></li>
            <li><?php esc_html_e( 'Passeport de compétences et Open Badges', 'tls' ); ?></li>
          </ul>
          <a href="<?php echo esc_url( home_url( '/learning-app/' ) ); ?>" class="pole__link">
            <?php esc_html_e( 'Demander un accès anticipé', 'tls' ); ?>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
        <div class="pole__visual" aria-hidden="true">
          <span class="pole__glyph"><?php esc_html_e( 'Déployer.', 'tls' ); ?></span>
        </div>
      </article>

    </div>
  </div>
</section>

<!-- ══════════ DOCTRINE ══════════ -->
<section class="section section--deep">
  <div class="container container--content" style="text-align: center;">
    <div data-stagger="90" style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
      <h2 class="display-lg reveal" style="max-width: 20ch;">
        <?php esc_html_e( "On ne forme pas à l'IA. On vous aide à l'intégrer dans votre métier.", 'tls' ); ?>
      </h2>
      <p class="reveal" style="font-size: var(--text-body-lg); line-height: var(--leading-relaxed); color: rgba(255,255,255,0.78); max-width: 54ch;">
        <?php esc_html_e( "Les outils IA changent chaque mois. Les principes pédagogiques, eux, restent. On vous apprend à choisir et à cadrer ces outils, pas à suivre les tendances. Notre approche part du modèle de Dreyfus : du novice à l'expert, par la pratique.", 'tls' ); ?>
      </p>
      <a href="<?php echo esc_url( home_url( '/accompagnement/' ) ); ?>" class="pole__link reveal" style="color: var(--color-accent-300); margin-top: 0.5rem;">
        <?php esc_html_e( 'Découvrir notre méthode', 'tls' ); ?>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  </div>
</section>

<!-- ══════════ CHIFFRES ══════════ -->
<section class="section">
  <div class="container">
    <div class="stats-row" data-stagger="80">
      <div class="stat reveal">
        <span class="stat__value" data-count-to="7">0</span>
        <span class="stat__label"><?php esc_html_e( 'modules certifiants', 'tls' ); ?></span>
      </div>
      <div class="stat reveal">
        <span class="stat__value" data-count-to="100" data-count-suffix="&nbsp;%">0</span>
        <span class="stat__label"><?php esc_html_e( 'à distance, en partenariat C-Campus', 'tls' ); ?></span>
      </div>
      <div class="stat reveal">
        <span class="stat__value" data-count-to="3">0</span>
        <span class="stat__label"><?php esc_html_e( 'formules au choix', 'tls' ); ?></span>
      </div>
      <div class="stat reveal">
        <span class="stat__value" data-count-to="249" data-count-suffix="&nbsp;€">0</span>
        <span class="stat__label"><?php esc_html_e( 'à partir de, en HT (formule Autonome)', 'tls' ); ?></span>
      </div>
    </div>
  </div>
</section>

<!-- ══════════ RESSOURCES ══════════ -->
<section class="section section--pastel">
  <div class="container">
    <div style="display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 1rem; margin-bottom: 2rem;">
      <h2 class="display-md reveal"><?php esc_html_e( 'Ressources', 'tls' ); ?></h2>
      <a href="<?php echo esc_url( home_url( '/ressources/' ) ); ?>" class="pole__link reveal" style="color: var(--color-primary-700);">
        <?php esc_html_e( 'Toutes les ressources', 'tls' ); ?>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>

    <div class="mag-list" data-stagger="70">
      <?php tls_render_mag_list( 5 ); ?>
    </div>
  </div>
</section>

<!-- ══════════ CTA FINALE ══════════ -->
<section class="section">
  <div class="container">
    <div class="cta-final reveal">
      <div class="cta-final__inner" data-stagger="90">
        <h2 class="reveal"><?php esc_html_e( "Intégrez l'IA dans vos formations.", 'tls' ); ?></h2>
        <p class="reveal">
          <?php esc_html_e( "7 modules, 7 heures, 100 % à distance. Une certification Open Badge à la clé. Nous répondons à toutes vos questions.", 'tls' ); ?>
        </p>
        <div class="hero__actions reveal" style="justify-content: center;">
          <a href="<?php echo esc_url( home_url( '/formation/' ) ); ?>" class="btn btn--warm btn--lg" data-magnetic="10">
            <?php esc_html_e( 'Voir les formules', 'tls' ); ?>
            <span class="btn__arrow" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </span>
          </a>
          <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn--ghost-dark btn--lg"><?php esc_html_e( 'Nous contacter', 'tls' ); ?></a>
        </div>
      </div>
    </div>
  </div>
</section>

<?php get_footer();
