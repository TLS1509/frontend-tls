<?php
/**
 * Template Name: Formation — Le Formateur Augmenté
 * Transposition WP du site statique validé : public/site/formation.html
 * Registre tutoiement (Persona A), tone warm. 100 % classes `site.css`.
 *
 * @package tls
 */
get_header();
?>

<!-- ══════════ HERO ══════════ -->
<section class="hero hero--page hero--warm">
  <div class="hero__blob hero__blob--warm" aria-hidden="true"></div>
  <div class="hero__blob hero__blob--sun" aria-hidden="true"></div>

  <div class="container">
    <div class="hero__inner" data-stagger="90">
      <span class="hero__kicker reveal">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        <?php esc_html_e( "Le Formateur Augmenté par l'IA · avec C-Campus", 'tls' ); ?>
      </span>

      <h1 class="display-xl reveal">
        <?php esc_html_e( '7 h pour intégrer', 'tls' ); ?> <span class="accent-word--warm"><?php esc_html_e( "l'IA", 'tls' ); ?></span><br>
        <?php esc_html_e( 'dans ton vrai travail de formateur.', 'tls' ); ?>
      </h1>

      <p class="lede reveal">
        <?php esc_html_e( "Pas un catalogue de vidéos. Un parcours en 7 modules qui part de ta pratique, validé par un Open Badge délivré par C-Campus.", 'tls' ); ?>
      </p>

      <div class="hero__actions reveal">
        <a href="#formules" class="btn btn--warm btn--lg" data-magnetic="10">
          <?php esc_html_e( 'Voir les formules', 'tls' ); ?>
          <span class="btn__arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </a>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn--ghost btn--lg"><?php esc_html_e( 'Nous contacter', 'tls' ); ?></a>
      </div>
    </div>
  </div>
</section>

<!-- ══════════ OUTCOMES ══════════ -->
<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow"><?php esc_html_e( 'Concret', 'tls' ); ?></span>
      <h2 class="display-lg"><?php esc_html_e( 'Ce que tu sais faire à la sortie.', 'tls' ); ?></h2>
      <p class="section-head__intro"><?php esc_html_e( "Le parcours part de ton quotidien de formateur. À la fin, tu appliques l'IA sur tes propres séquences, pas sur des cas théoriques.", 'tls' ); ?></p>
    </div>

    <ul class="ticks ticks--2 ticks--warm reveal" data-stagger="60">
      <li><span class="ticks__icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><span><?php esc_html_e( "Générer un scénario pédagogique avec l'IA en 20 minutes au lieu de 3 heures.", 'tls' ); ?></span></li>
      <li><span class="ticks__icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><span><?php esc_html_e( "Évaluer et choisir les outils IA pertinents pour ton contexte de formation.", 'tls' ); ?></span></li>
      <li><span class="ticks__icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><span><?php esc_html_e( "Créer des questionnaires et évaluations de satisfaction en un temps record.", 'tls' ); ?></span></li>
      <li><span class="ticks__icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><span><?php esc_html_e( "Transformer tes supports d'animation existants en microlearning.", 'tls' ); ?></span></li>
      <li><span class="ticks__icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><span><?php esc_html_e( "Intégrer l'IA dans ton animation sans déshumaniser ta relation aux apprenants.", 'tls' ); ?></span></li>
    </ul>
  </div>
</section>

<!-- ══════════ LES 7 MODULES ══════════ -->
<section class="section section--pastel-warm">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow"><?php esc_html_e( 'Le parcours', 'tls' ); ?></span>
      <h2 class="display-lg"><?php esc_html_e( '7 modules, environ 1 h chacun.', 'tls' ); ?></h2>
      <p class="section-head__intro"><?php esc_html_e( "100 % à distance, à ton rythme. Tu démarres par un auto-positionnement qui précise tes attentes avant les cours.", 'tls' ); ?></p>
    </div>

    <div class="steps steps--warm reveal" data-stagger="55">
      <div class="step"><span class="step__num">1</span><span class="step__title"><?php esc_html_e( "Le Formateur Augmenté par l'IA : une révolution pédagogique", 'tls' ); ?></span><span class="step__desc"><?php esc_html_e( "Comprendre ce que l'IA change vraiment au métier, et ce qu'elle ne remplace pas.", 'tls' ); ?></span></div>
      <div class="step"><span class="step__num">2</span><span class="step__title"><?php esc_html_e( 'Le Prompt Engineering pour le formateur', 'tls' ); ?></span><span class="step__desc"><?php esc_html_e( "Maîtriser la communication avec l'IA pour obtenir des résultats utilisables.", 'tls' ); ?></span></div>
      <div class="step"><span class="step__num">3</span><span class="step__title"><?php esc_html_e( "Choisir les bons outils d'IA selon ton contexte", 'tls' ); ?></span><span class="step__desc"><?php esc_html_e( "Évaluer et sélectionner les outils adaptés à ta réalité de formation.", 'tls' ); ?></span></div>
      <div class="step"><span class="step__num">4</span><span class="step__title"><?php esc_html_e( "Découvrir l'IA dans la conception de formation", 'tls' ); ?></span><span class="step__desc"><?php esc_html_e( "Accélérer la conception de séquences, supports et parcours.", 'tls' ); ?></span></div>
      <div class="step"><span class="step__num">5</span><span class="step__title"><?php esc_html_e( "Enrichir l'animation et l'accompagnement sans déshumaniser", 'tls' ); ?></span><span class="step__desc"><?php esc_html_e( "Utiliser l'IA pour libérer du temps relationnel, pas pour l'effacer.", 'tls' ); ?></span></div>
      <div class="step"><span class="step__num">6</span><span class="step__title"><?php esc_html_e( "Automatisation augmentée par l'IA", 'tls' ); ?></span><span class="step__desc"><?php esc_html_e( "Automatiser les tâches répétitives de ton ingénierie pédagogique.", 'tls' ); ?></span></div>
      <div class="step"><span class="step__num">7</span><span class="step__title"><?php esc_html_e( 'Éthique, responsabilité et accompagnement critique', 'tls' ); ?></span><span class="step__desc"><?php esc_html_e( "Encadrer l'usage de l'IA avec tes apprenants, en gardant l'esprit critique.", 'tls' ); ?></span></div>
    </div>
  </div>
</section>

<!-- ══════════ FORMULES ══════════ -->
<section class="section" id="formules">
  <div class="container">
    <div class="section-head section-head--center reveal">
      <span class="eyebrow"><?php esc_html_e( 'Tarifs', 'tls' ); ?></span>
      <h2 class="display-lg"><?php esc_html_e( 'Trois formules, à ton rythme.', 'tls' ); ?></h2>
      <p class="section-head__intro"><?php esc_html_e( 'Tous les prix sont HT. Accès sous 72 h après règlement.', 'tls' ); ?></p>
    </div>

    <div class="pricing reveal" data-stagger="70">
      <article class="price-card">
        <span class="price-card__name"><?php esc_html_e( 'Autonome', 'tls' ); ?></span>
        <div class="price-card__price">249&nbsp;€ <span>HT</span></div>
        <ul class="price-card__features">
          <li><?php esc_html_e( 'Les 7 cours digitaux', 'tls' ); ?></li>
          <li><?php esc_html_e( 'Accès sous 72 h après règlement', 'tls' ); ?></li>
          <li><?php esc_html_e( '100 % en ligne, à ton rythme', 'tls' ); ?></li>
        </ul>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn--ghost btn--lg"><?php esc_html_e( 'Choisir Autonome', 'tls' ); ?></a>
      </article>

      <article class="price-card price-card--featured">
        <span class="price-card__badge"><?php esc_html_e( 'Recommandé', 'tls' ); ?></span>
        <span class="price-card__name"><?php esc_html_e( 'Open Badge', 'tls' ); ?></span>
        <div class="price-card__price">369&nbsp;€ <span>HT</span></div>
        <ul class="price-card__features">
          <li><?php esc_html_e( 'Tout ce que contient Autonome', 'tls' ); ?></li>
          <li><?php esc_html_e( 'Open Badge « L\'IA en formation » délivré par C-Campus', 'tls' ); ?></li>
          <li><?php esc_html_e( '2 épreuves : analyse de pratique + micro-projet', 'tls' ); ?></li>
        </ul>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn--warm btn--lg"><?php esc_html_e( 'Choisir Open Badge', 'tls' ); ?></a>
      </article>

      <article class="price-card">
        <span class="price-card__name"><?php esc_html_e( 'Coaching', 'tls' ); ?></span>
        <div class="price-card__price">890&nbsp;€ <span>HT</span></div>
        <ul class="price-card__features">
          <li><?php esc_html_e( 'Tout ce que contient Open Badge', 'tls' ); ?></li>
          <li><?php esc_html_e( '2 séances de coaching 1-1 (2 × 1h30)', 'tls' ); ?></li>
          <li><?php esc_html_e( 'Suivi personnalisé avec un expert TLS', 'tls' ); ?></li>
        </ul>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn--ghost btn--lg"><?php esc_html_e( 'Choisir Coaching', 'tls' ); ?></a>
      </article>
    </div>

    <p class="reveal" style="margin-top: 1.5rem; color: var(--color-text-muted); font-size: var(--text-body-sm); max-width: 60ch;">
      <?php esc_html_e( "Tu formes une équipe ? Une animation intra sur-mesure (journée de 7 h, diagnostic préalable avec un expert TLS) est disponible sur devis.", 'tls' ); ?>
    </p>
  </div>
</section>

<!-- ══════════ C-CAMPUS ══════════ -->
<section class="section section--mist">
  <div class="container container--content">
    <div class="note-card reveal">
      <div class="note-card__label"><?php esc_html_e( 'Partenaire certifiant', 'tls' ); ?></div>
      <p>
        <?php
        printf(
            /* translators: %s = C-Campus en gras */
            esc_html__( 'Le programme est diffusé en partenariat avec %s, organisme de formation certifié Qualiopi. C-Campus forme plus de 578 formateurs par an sur les pratiques pédagogiques, avec un taux de satisfaction de 93 %% sur ses formations de formateurs.', 'tls' ),
            '<strong>C-Campus</strong>'
        );
        ?>
      </p>
    </div>
  </div>
</section>

<!-- ══════════ FAQ ══════════ -->
<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow"><?php esc_html_e( 'Questions fréquentes', 'tls' ); ?></span>
      <h2 class="display-lg"><?php esc_html_e( 'Tout ce que tu te demandes.', 'tls' ); ?></h2>
    </div>

    <div class="faq reveal">
      <details class="faq-item">
        <summary><?php esc_html_e( 'Est-ce que je dois avoir des bases en IA ?', 'tls' ); ?>
          <svg class="faq-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        </summary>
        <div class="faq-item__a"><?php esc_html_e( "Non, aucun prérequis. Le parcours est pensé pour partir de ton métier de formateur, quel que soit ton niveau de départ avec l'IA.", 'tls' ); ?></div>
      </details>
      <details class="faq-item">
        <summary><?php esc_html_e( 'Le badge est-il reconnu par mes clients ?', 'tls' ); ?>
          <svg class="faq-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        </summary>
        <div class="faq-item__a"><?php esc_html_e( "L'Open Badge « L'IA en formation » est délivré par C-Campus, reconnu dans l'écosystème de la formation professionnelle. Il atteste de ta capacité à utiliser l'IA en conception, pilotage et animation.", 'tls' ); ?></div>
      </details>
      <details class="faq-item">
        <summary><?php esc_html_e( 'Je peux commencer quand ?', 'tls' ); ?>
          <svg class="faq-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        </summary>
        <div class="faq-item__a"><?php esc_html_e( "L'accès est ouvert sous 72 h après ton règlement. Tu avances ensuite à ton rythme, 100 % en ligne.", 'tls' ); ?></div>
      </details>
      <details class="faq-item">
        <summary><?php esc_html_e( "Comment se passe l'Open Badge ?", 'tls' ); ?>
          <svg class="faq-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        </summary>
        <div class="faq-item__a"><?php esc_html_e( "Deux épreuves : une analyse de pratique (2 pages A4 max) et un micro-projet d'application de l'IA en contexte pédagogique. Comptez 1h30 à 2 h, à réaliser dans les 2 mois suivant la fin du parcours.", 'tls' ); ?></div>
      </details>
    </div>
  </div>
</section>

<!-- ══════════ CTA FINALE ══════════ -->
<section class="section">
  <div class="container">
    <div class="cta-final reveal">
      <div class="cta-final__inner" data-stagger="90">
        <h2 class="reveal"><?php esc_html_e( "Prêt à passer à l'IA augmentée ?", 'tls' ); ?></h2>
        <p class="reveal">
          <?php esc_html_e( "7 modules, 7 heures, 100 % à distance. Tu avances à ton rythme, avec un Open Badge reconnu à la clé.", 'tls' ); ?>
        </p>
        <div class="hero__actions reveal" style="justify-content: center;">
          <a href="#formules" class="btn btn--warm btn--lg" data-magnetic="10">
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
