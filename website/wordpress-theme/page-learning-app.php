<?php
/**
 * Template Name: Learning App
 * Transposition WP du site statique validé : public/site/learning-app.html
 * Registre vous, tone primary. 100 % classes `site.css`.
 *
 * @package tls
 */
get_header();

$contact_app = esc_url( add_query_arg( 'source', 'app', home_url( '/contact/' ) ) );
?>

<!-- ══════════ HERO ══════════ -->
<section class="hero hero--page hero--home">
  <div class="hero__blob hero__blob--teal" aria-hidden="true"></div>
  <div class="hero__blob hero__blob--sun" aria-hidden="true"></div>

  <div class="container">
    <div class="hero__inner" data-stagger="90">
      <span class="hero__kicker reveal">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        <?php esc_html_e( 'La Learning App · en bêta', 'tls' ); ?>
      </span>

      <h1 class="display-xl reveal">
        <?php esc_html_e( 'La plateforme qui relie vos formations', 'tls' ); ?><br>
        <?php esc_html_e( 'à vos', 'tls' ); ?> <span class="accent-word"><?php esc_html_e( 'projets réels', 'tls' ); ?></span>.
      </h1>

      <p class="lede reveal">
        <?php esc_html_e( "Passeport de Compétences, parcours adaptatifs, coaching 1-1 et matching IA. Rejoignez les premiers à construire la plateforme avec nous.", 'tls' ); ?>
      </p>

      <div class="hero__actions reveal">
        <a href="<?php echo $contact_app; ?>" class="btn btn--primary btn--lg" data-magnetic="10">
          <?php esc_html_e( 'Rejoindre la bêta', 'tls' ); ?>
          <span class="btn__arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </a>
        <a href="<?php echo esc_url( home_url( '/accompagnement/' ) ); ?>" class="btn btn--ghost btn--lg"><?php esc_html_e( "Voir l'accompagnement", 'tls' ); ?></a>
      </div>
    </div>
  </div>
</section>

<!-- ══════════ 5 FONCTIONS ══════════ -->
<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow"><?php esc_html_e( "Ce qu'elle fait", 'tls' ); ?></span>
      <h2 class="display-lg"><?php esc_html_e( 'Cinq fonctions, une seule boucle.', 'tls' ); ?></h2>
      <p class="section-head__intro"><?php esc_html_e( "Chaque interaction enrichit le Passeport de Compétences. Plus la boucle tourne, plus la plateforme devient précieuse.", 'tls' ); ?></p>
    </div>

    <div class="steps reveal" data-stagger="55">
      <div class="step"><span class="step__num">1</span><span class="step__title"><?php esc_html_e( 'Passeport de Compétences', 'tls' ); ?></span><span class="step__desc"><?php esc_html_e( "Un profil qui s'enrichit automatiquement à chaque formation, projet et feedback. Basé sur le modèle de Dreyfus (5 niveaux). Vos données restent les vôtres.", 'tls' ); ?></span></div>
      <div class="step"><span class="step__num">2</span><span class="step__title"><?php esc_html_e( 'Parcours adaptatifs', 'tls' ); ?></span><span class="step__desc"><?php esc_html_e( "L'apprentissage s'ajuste au niveau réel de chaque apprenant, pas à un niveau déclaratif. Contenu pertinent, progression mesurable.", 'tls' ); ?></span></div>
      <div class="step"><span class="step__num">3</span><span class="step__title"><?php esc_html_e( 'Coaching 1-1', 'tls' ); ?></span><span class="step__desc"><?php esc_html_e( "Des séances avec un expert TLS, ancrées dans le parcours et le projet réel de l'apprenant, pas dans une visio générique.", 'tls' ); ?></span></div>
      <div class="step"><span class="step__num">4</span><span class="step__title"><?php esc_html_e( 'Journal réflexif', 'tls' ); ?></span><span class="step__desc"><?php esc_html_e( "Un espace pour noter ce qu'on a appris, comment on l'applique, ce qui reste flou. Le journal alimente le passeport.", 'tls' ); ?></span></div>
      <div class="step"><span class="step__num">5</span><span class="step__title"><?php esc_html_e( 'Matching IA', 'tls' ); ?></span><span class="step__desc"><?php esc_html_e( "Le passeport enrichi permet de recommander les bons talents sur les bons projets. L'allocation par organigramme, c'est fini.", 'tls' ); ?></span></div>
    </div>
  </div>
</section>

<!-- ══════════ CREDENTIAL ══════════ -->
<section class="section section--pastel">
  <div class="container container--content">
    <div class="note-card reveal">
      <div class="note-card__label"><?php esc_html_e( 'Déjà en entreprise', 'tls' ); ?></div>
      <p>
        <?php
        printf(
            /* translators: %s = Ingénieur Pédagogique Augmenté en gras */
            esc_html__( 'Notre programme %s est aujourd\'hui opérationnel dans un grand groupe français, déployé sur la Learning App depuis janvier 2026.', 'tls' ),
            '<strong>Ingénieur Pédagogique Augmenté</strong>'
        );
        ?>
      </p>
    </div>
  </div>
</section>

<!-- ══════════ TARIFS BÊTA ══════════ -->
<section class="section">
  <div class="container">
    <div class="section-head section-head--center reveal">
      <span class="eyebrow"><?php esc_html_e( 'Accès bêta', 'tls' ); ?></span>
      <h2 class="display-lg"><?php esc_html_e( 'Rejoignez les premiers.', 'tls' ); ?></h2>
      <p class="section-head__intro"><?php esc_html_e( 'Tarifs bêta. Les prix évolueront à la sortie de bêta ; les early adopters conservent le leur.', 'tls' ); ?></p>
    </div>

    <div class="pricing pricing--2 reveal" data-stagger="70">
      <article class="price-card">
        <span class="price-card__name"><?php esc_html_e( 'Pass Solo', 'tls' ); ?></span>
        <div class="price-card__price">30&nbsp;€ <span>/ mois</span></div>
        <ul class="price-card__features">
          <li><?php esc_html_e( 'Accès individuel complet', 'tls' ); ?></li>
          <li><?php esc_html_e( 'Passeport, parcours, journal réflexif', 'tls' ); ?></li>
          <li><?php esc_html_e( 'Coaching 1-1 à la demande', 'tls' ); ?></li>
        </ul>
        <a href="<?php echo $contact_app; ?>" class="btn btn--ghost btn--lg"><?php esc_html_e( 'Demander un accès', 'tls' ); ?></a>
      </article>

      <article class="price-card price-card--featured">
        <span class="price-card__badge"><?php esc_html_e( 'Annuel', 'tls' ); ?></span>
        <span class="price-card__name"><?php esc_html_e( 'Pass Pro', 'tls' ); ?></span>
        <div class="price-card__price">250&nbsp;€ <span>/ an</span></div>
        <ul class="price-card__features">
          <li><?php esc_html_e( 'Tout ce que contient le Pass Solo', 'tls' ); ?></li>
          <li><?php esc_html_e( 'Nouvelles fonctions en priorité', 'tls' ); ?></li>
          <li><?php esc_html_e( 'Tarif early adopter conservé', 'tls' ); ?></li>
        </ul>
        <a href="<?php echo $contact_app; ?>" class="btn btn--warm btn--lg"><?php esc_html_e( 'Demander un accès', 'tls' ); ?></a>
      </article>
    </div>
  </div>
</section>

<!-- ══════════ ROADMAP ══════════ -->
<section class="section section--mist">
  <div class="container container--content">
    <div class="section-head reveal">
      <span class="eyebrow"><?php esc_html_e( 'En construction', 'tls' ); ?></span>
      <h2 class="display-md"><?php esc_html_e( 'Une plateforme qui se construit avec ses utilisateurs.', 'tls' ); ?></h2>
    </div>
    <div class="prose reveal">
      <p>
        <?php esc_html_e( "Les fonctions déployées aujourd'hui sont celles du programme bêta. La roadmap complète inclut le matching IA avancé, les intégrations RH et LMS, et l'analytics de compétences.", 'tls' ); ?>
      </p>
      <p>
        <?php esc_html_e( "Nous avançons avec nos premiers utilisateurs, leurs cas réels et leurs retours. C'est le meilleur moment pour peser sur ce que devient la plateforme.", 'tls' ); ?>
      </p>
    </div>
  </div>
</section>

<!-- ══════════ CTA FINALE ══════════ -->
<section class="section">
  <div class="container">
    <div class="cta-final reveal">
      <div class="cta-final__inner" data-stagger="90">
        <h2 class="reveal"><?php esc_html_e( 'Envie de tester la plateforme ?', 'tls' ); ?></h2>
        <p class="reveal">
          <?php esc_html_e( "Dites-nous votre contexte, on vous ouvre un accès bêta et on en discute.", 'tls' ); ?>
        </p>
        <div class="hero__actions reveal" style="justify-content: center;">
          <a href="<?php echo $contact_app; ?>" class="btn btn--warm btn--lg" data-magnetic="10">
            <?php esc_html_e( 'Rejoindre la bêta', 'tls' ); ?>
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
