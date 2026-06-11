<?php
/**
 * Template Name: Accompagnement — SBO & méthode STRIDE
 * Transposition WP du site statique validé : public/site/accompagnement.html
 * Registre vous, tone primary + bloc STRIDE dark. 100 % classes `site.css`.
 *
 * @package tls
 */
get_header();
?>

<!-- ══════════ HERO ══════════ -->
<section class="hero hero--page hero--home">
  <div class="hero__blob hero__blob--teal" aria-hidden="true"></div>
  <div class="hero__blob hero__blob--sun" aria-hidden="true"></div>

  <div class="container">
    <div class="hero__inner" data-stagger="90">
      <span class="hero__kicker reveal">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        <?php esc_html_e( 'Accompagnement & conseil SBO', 'tls' ); ?>
      </span>

      <h1 class="display-xl reveal">
        <?php esc_html_e( 'Vous ne cherchez pas un rapport de plus.', 'tls' ); ?><br>
        <?php esc_html_e( 'Vous cherchez à', 'tls' ); ?> <span class="accent-word"><?php esc_html_e( 'bouger', 'tls' ); ?></span>.
      </h1>

      <p class="lede reveal">
        <?php esc_html_e( "Audit de maturité, méthode STRIDE, outils IA opérationnels. Trois missions pour piloter la transformation compétences de votre organisation.", 'tls' ); ?>
      </p>

      <div class="hero__actions reveal">
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn--primary btn--lg" data-magnetic="10">
          <?php esc_html_e( 'Discuter de votre projet', 'tls' ); ?>
          <span class="btn__arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </a>
        <a href="#stride" class="btn btn--ghost btn--lg"><?php esc_html_e( 'Voir la méthode STRIDE', 'tls' ); ?></a>
      </div>
    </div>
  </div>
</section>

<!-- ══════════ CONTEXTE ══════════ -->
<section class="section">
  <div class="container container--content">
    <div class="prose reveal">
      <p style="font-size: var(--text-body-lg); color: var(--color-text-default);">
        <?php esc_html_e( "Les ETI de 200 à 2 000 salariés sont dans un vide. Les grands acteurs LMS sont trop chers et trop complexes. Les petits outils sont trop limités. Les cabinets de conseil livrent des rapports que personne ne met en œuvre.", 'tls' ); ?>
      </p>
      <p style="font-size: var(--text-body-lg); color: var(--color-text-strong); font-weight: 700;">
        <?php esc_html_e( 'Nous livrons des résultats sur vos projets réels.', 'tls' ); ?>
      </p>
    </div>
  </div>
</section>

<!-- ══════════ MISSION 1 — STRIDE ══════════ -->
<section class="section section--deep" id="stride">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow"><?php esc_html_e( 'Mission 1 · 10 000 € HT', 'tls' ); ?></span>
      <h2 class="display-lg"><?php esc_html_e( 'La méthode STRIDE.', 'tls' ); ?></h2>
      <p class="section-head__intro"><?php esc_html_e( "Une mission de conseil en 6 étapes pour devenir une organisation Skills-Based. Tout est centralisé sur la Learning App.", 'tls' ); ?></p>
    </div>

    <div class="stride-strip reveal" data-stagger="60">
      <div class="stride-step reveal"><span class="stride-step__letter">S</span><span class="stride-step__word"><?php esc_html_e( "S'orienter", 'tls' ); ?></span><span class="stride-step__hint"><?php esc_html_e( 'Audit de maturité SBO, sensibilisation des équipes dirigeantes.', 'tls' ); ?></span></div>
      <div class="stride-step reveal"><span class="stride-step__letter">T</span><span class="stride-step__word"><?php esc_html_e( 'Tester', 'tls' ); ?></span><span class="stride-step__hint"><?php esc_html_e( 'POC sur un parcours de formation sur-mesure. Preuve avant déploiement.', 'tls' ); ?></span></div>
      <div class="stride-step reveal"><span class="stride-step__letter">R</span><span class="stride-step__word"><?php esc_html_e( 'Réaliser', 'tls' ); ?></span><span class="stride-step__hint"><?php esc_html_e( 'Construction des référentiels de compétences et des agents IA.', 'tls' ); ?></span></div>
      <div class="stride-step reveal"><span class="stride-step__letter">I</span><span class="stride-step__word"><?php esc_html_e( 'Intégrer', 'tls' ); ?></span><span class="stride-step__hint"><?php esc_html_e( 'Branchement sur votre stack technique : LMS, CRM, RH.', 'tls' ); ?></span></div>
      <div class="stride-step reveal"><span class="stride-step__letter">D</span><span class="stride-step__word"><?php esc_html_e( 'Déployer', 'tls' ); ?></span><span class="stride-step__hint"><?php esc_html_e( 'Lancement auprès des collaborateurs, accompagnement au changement.', 'tls' ); ?></span></div>
      <div class="stride-step reveal"><span class="stride-step__letter">E</span><span class="stride-step__word"><?php esc_html_e( 'Évoluer', 'tls' ); ?></span><span class="stride-step__hint"><?php esc_html_e( 'Analyse des données, mise à jour des compétences et des outils.', 'tls' ); ?></span></div>
    </div>

    <div class="note-card reveal" style="margin-top: 2rem; background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15);">
      <p style="color: rgba(255,255,255,0.85);">
        <strong style="color:#fff;"><?php esc_html_e( 'Bonus :', 'tls' ); ?></strong> <?php esc_html_e( "pour tout contrat STRIDE, l'abonnement Learning App est offert la première année.", 'tls' ); ?>
      </p>
    </div>
  </div>
</section>

<!-- ══════════ MISSIONS 2 & 3 ══════════ -->
<section class="section">
  <div class="container">
    <div class="section-head section-head--center reveal">
      <span class="eyebrow"><?php esc_html_e( "Deux autres façons d'avancer", 'tls' ); ?></span>
      <h2 class="display-lg"><?php esc_html_e( 'Plug & Play, ou upskilling sur-mesure.', 'tls' ); ?></h2>
    </div>

    <div class="pricing pricing--2 reveal" data-stagger="70">
      <article class="price-card">
        <span class="price-card__name"><?php esc_html_e( 'Mission 2', 'tls' ); ?></span>
        <h3 class="price-card__price" style="font-size: 1.5rem;"><?php esc_html_e( 'Solutions IA Plug & Play', 'tls' ); ?></h3>
        <div style="font-family: var(--font-display); font-weight: 800; color: var(--color-primary-700); font-size: 1.5rem;">7 500&nbsp;€ <span style="font-size:1rem;font-weight:600;color:var(--color-text-muted);"><?php esc_html_e( 'HT / projet', 'tls' ); ?></span></div>
        <ul class="price-card__features">
          <li><?php esc_html_e( 'Notion OF OS, agents chatbots IA sur-mesure, outils auteur', 'tls' ); ?></li>
          <li><?php esc_html_e( 'Déploiement directement dans votre organisation', 'tls' ); ?></li>
          <li><?php esc_html_e( 'Livraison opérationnelle, pas une roadmap', 'tls' ); ?></li>
        </ul>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn--ghost btn--lg"><?php esc_html_e( 'Voir si ça correspond', 'tls' ); ?></a>
      </article>

      <article class="price-card price-card--featured">
        <span class="price-card__name"><?php esc_html_e( 'Mission 3', 'tls' ); ?></span>
        <h3 class="price-card__price" style="font-size: 1.5rem;"><?php esc_html_e( 'Upskilling L&D sur-mesure', 'tls' ); ?></h3>
        <div style="font-family: var(--font-display); font-weight: 800; color: var(--color-secondary-600); font-size: 1.5rem;">20 000&nbsp;€ <span style="font-size:1rem;font-weight:600;color:var(--color-text-muted);"><?php esc_html_e( 'HT / projet', 'tls' ); ?></span></div>
        <ul class="price-card__features">
          <li><?php esc_html_e( 'Masterclasses IA générative', 'tls' ); ?></li>
          <li><?php esc_html_e( 'Coaching de groupe sur les skills-data', 'tls' ); ?></li>
          <li><?php esc_html_e( 'Parcours certifiants Open Badges', 'tls' ); ?></li>
        </ul>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn--warm btn--lg"><?php esc_html_e( 'En savoir plus', 'tls' ); ?></a>
      </article>
    </div>
  </div>
</section>

<!-- ══════════ ÉQUIPE ══════════ -->
<section class="section section--mist">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow"><?php esc_html_e( 'Qui vous accompagne', 'tls' ); ?></span>
      <h2 class="display-lg"><?php esc_html_e( 'Deux fondateurs, pas un cabinet anonyme.', 'tls' ); ?></h2>
    </div>

    <div class="team reveal" data-stagger="80">
      <div class="team-member">
        <div class="team-member__avatar" aria-hidden="true">CM</div>
        <div>
          <div class="team-member__name"><?php esc_html_e( 'Chloé Mimault', 'tls' ); ?></div>
          <div class="team-member__role"><?php esc_html_e( "Tech, conception pédagogique et produit. Pilote la Learning App et l'ingénierie des parcours.", 'tls' ); ?></div>
        </div>
      </div>
      <div class="team-member">
        <div class="team-member__avatar" aria-hidden="true">PA</div>
        <div>
          <div class="team-member__name"><?php esc_html_e( 'Pierre-Armand Dennery', 'tls' ); ?></div>
          <div class="team-member__role"><?php esc_html_e( 'Commercial, delivery et animation. Concepteur du programme Formateur Augmenté.', 'tls' ); ?></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════ CTA FINALE ══════════ -->
<section class="section">
  <div class="container">
    <div class="cta-final reveal">
      <div class="cta-final__inner" data-stagger="90">
        <h2 class="reveal"><?php esc_html_e( 'Par où commencer ?', 'tls' ); ?></h2>
        <p class="reveal">
          <?php esc_html_e( "Dites-nous où vous en êtes. On vous propose un point de départ concret, pas un devis de cabinet.", 'tls' ); ?>
        </p>
        <div class="hero__actions reveal" style="justify-content: center;">
          <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn--warm btn--lg" data-magnetic="10">
            <?php esc_html_e( 'Discuter de votre projet', 'tls' ); ?>
            <span class="btn__arrow" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </span>
          </a>
          <a href="<?php echo esc_url( home_url( '/learning-app/' ) ); ?>" class="btn btn--ghost-dark btn--lg"><?php esc_html_e( 'Voir la plateforme', 'tls' ); ?></a>
        </div>
      </div>
    </div>
  </div>
</section>

<?php get_footer();
