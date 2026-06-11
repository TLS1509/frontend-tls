<?php
/**
 * Formulaire de recherche TLS
 * @package tls
 */
$unique_id = 'tls-search-' . uniqid();
?>
<form role="search"
      method="get"
      class="tls-search"
      action="<?php echo esc_url( home_url( '/' ) ); ?>"
      aria-label="<?php esc_attr_e( 'Rechercher sur le site', 'tls' ); ?>">

  <label for="<?php echo esc_attr( $unique_id ); ?>" class="sr-only">
    <?php esc_html_e( 'Rechercher', 'tls' ); ?>
  </label>

  <div class="tls-search__inner">
    <span class="tls-search__icon" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </span>
    <input type="search"
           id="<?php echo esc_attr( $unique_id ); ?>"
           class="tls-search__input"
           name="s"
           value="<?php echo esc_attr( get_search_query() ); ?>"
           placeholder="<?php esc_attr_e( 'Rechercher…', 'tls' ); ?>"
           autocomplete="off"
           spellcheck="false">
    <button type="submit" class="tls-search__submit tls-btn tls-btn--primary tls-btn--sm">
      <?php esc_html_e( 'Rechercher', 'tls' ); ?>
    </button>
  </div>

</form>
