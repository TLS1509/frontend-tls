<?php
/**
 * Template Name: Contact
 * Transposition WP du site statique validé : public/site/contact.html
 * Visuel validé (.form/.field/.input) + backend WP fonctionnel
 * (nonce + admin-post tls_contact_form, états success/error).
 *
 * @package tls
 */
get_header();

$linkedin_url   = tls_get_option( 'linkedin_url', 'https://www.linkedin.com/company/thelearningsociety/' );
$contact_status = isset( $_GET['contact'] ) ? sanitize_key( $_GET['contact'] ) : '';
$source         = isset( $_GET['source'] ) ? sanitize_key( $_GET['source'] ) : '';
?>

<!-- ══════════ HERO ══════════ -->
<section class="hero hero--page hero--home">
  <div class="hero__blob hero__blob--teal" aria-hidden="true"></div>

  <div class="container">
    <div class="hero__inner" data-stagger="90">
      <h1 class="display-xl reveal"><?php esc_html_e( 'Nous contacter.', 'tls' ); ?></h1>
      <p class="lede reveal">
        <?php esc_html_e( "Une question sur nos offres, un projet à explorer, une demande spécifique. Dites-nous tout, on vous répond directement.", 'tls' ); ?>
      </p>
    </div>
  </div>
</section>

<!-- ══════════ FORMULAIRE ══════════ -->
<section class="section" style="padding-top: 0;">
  <div class="container container--content">

    <?php if ( 'success' === $contact_status ) : ?>
      <div class="note-card reveal" style="margin-bottom: 2rem; border-color: var(--color-primary-300);">
        <div class="note-card__label"><?php esc_html_e( 'Message envoyé', 'tls' ); ?></div>
        <p><?php esc_html_e( 'Merci, on revient vers vous rapidement (sous 48 h ouvrées).', 'tls' ); ?></p>
      </div>
    <?php elseif ( 'error' === $contact_status ) : ?>
      <div class="note-card reveal" style="margin-bottom: 2rem; border-color: var(--color-secondary-400);">
        <div class="note-card__label"><?php esc_html_e( 'Une erreur est survenue', 'tls' ); ?></div>
        <p><?php esc_html_e( 'Vérifiez votre email et votre message, puis réessayez.', 'tls' ); ?></p>
      </div>
    <?php endif; ?>

    <form class="form reveal" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post" novalidate>
      <?php wp_nonce_field( 'tls_contact', 'tls_nonce' ); ?>
      <input type="hidden" name="action" value="tls_contact_form">

      <div class="form__row form__row--2">
        <div class="field">
          <label class="field__label" for="prenom"><?php esc_html_e( 'Prénom', 'tls' ); ?></label>
          <input class="input" type="text" id="prenom" name="prenom" autocomplete="given-name">
        </div>
        <div class="field">
          <label class="field__label" for="nom"><?php esc_html_e( 'Nom', 'tls' ); ?></label>
          <input class="input" type="text" id="nom" name="nom" autocomplete="family-name">
        </div>
      </div>

      <div class="field">
        <label class="field__label" for="email"><?php esc_html_e( 'Email', 'tls' ); ?> <span style="color: var(--color-secondary-600);">*</span></label>
        <input class="input" type="email" id="email" name="email" autocomplete="email" required>
      </div>

      <div class="field">
        <label class="field__label" for="organisation"><?php esc_html_e( 'Organisation', 'tls' ); ?></label>
        <input class="input" type="text" id="organisation" name="company" autocomplete="organization">
      </div>

      <div class="field">
        <label class="field__label" for="objet"><?php esc_html_e( 'Objet', 'tls' ); ?></label>
        <select class="select" id="objet" name="subject">
          <option value="formation"<?php selected( $source, 'formation' ); ?>><?php esc_html_e( 'Formation — Formateur Augmenté', 'tls' ); ?></option>
          <option value="accompagnement"><?php esc_html_e( 'Accompagnement SBO', 'tls' ); ?></option>
          <option value="learning-app"<?php selected( $source, 'app' ); ?>><?php esc_html_e( 'Learning App (bêta)', 'tls' ); ?></option>
          <option value="autre"><?php esc_html_e( 'Autre', 'tls' ); ?></option>
        </select>
      </div>

      <div class="field">
        <label class="field__label" for="message"><?php esc_html_e( 'Votre message', 'tls' ); ?> <span style="color: var(--color-secondary-600);">*</span></label>
        <textarea class="textarea" id="message" name="message" rows="5" required placeholder="<?php esc_attr_e( 'Parlez-nous de votre contexte et de ce que vous cherchez.', 'tls' ); ?>"></textarea>
      </div>

      <button type="submit" class="btn btn--primary btn--lg" data-magnetic="10" style="align-self: flex-start;">
        <?php esc_html_e( 'Envoyer votre message', 'tls' ); ?>
        <span class="btn__arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </button>
    </form>

    <!-- Alternative LinkedIn -->
    <div class="note-card reveal" style="margin-top: 2.5rem;">
      <div class="note-card__label"><?php esc_html_e( 'Autrement', 'tls' ); ?></div>
      <p style="margin-bottom: 1rem;"><?php esc_html_e( 'Vous préférez nous suivre ou échanger sur LinkedIn ? C\'est aussi par là que ça se passe.', 'tls' ); ?></p>
      <a href="<?php echo esc_url( $linkedin_url ); ?>" class="link-row" target="_blank" rel="noopener noreferrer">
        <?php esc_html_e( 'The Learning Society sur LinkedIn', 'tls' ); ?>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  </div>
</section>

<?php get_footer();
