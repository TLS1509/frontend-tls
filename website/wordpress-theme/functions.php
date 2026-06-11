<?php
/**
 * TLS Theme — Functions
 * @package tls
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'TLS_VERSION', '1.0.0' );
define( 'TLS_DIR', get_template_directory() );
define( 'TLS_URI', get_template_directory_uri() );

/* ─── WP Cleanups (sécurité + perf) ────────────────────────────────────── */

add_action( 'init', function () {
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    add_filter( 'emoji_svg_url', '__return_false' );
    remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
    remove_action( 'wp_head', 'wp_oembed_add_host_js' );
    remove_action( 'wp_head', 'rsd_link' );
    remove_action( 'wp_head', 'wlwmanifest_link' );
    remove_action( 'wp_head', 'wp_shortlink_wp_head' );
    remove_action( 'wp_head', 'wp_generator' );
} );

add_action( 'wp_footer', fn() => wp_deregister_script( 'wp-embed' ), 1 );
add_filter( 'the_generator', '__return_empty_string' );
add_action( 'wp_enqueue_scripts', fn() => ! is_user_logged_in() && wp_deregister_style( 'dashicons' ), 100 );

// Désactiver Gutenberg
add_filter( 'use_block_editor_for_post',      '__return_false', 100 );
add_filter( 'use_block_editor_for_post_type', '__return_false', 100 );
add_action( 'after_setup_theme', fn() => remove_theme_support( 'widgets-block-editor' ) );
add_filter( 'use_widgets_block_editor', '__return_false' );
add_action( 'wp_enqueue_scripts', function () {
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'global-styles' );
    wp_dequeue_style( 'classic-theme-styles' );
}, 100 );
remove_action( 'wp_body_open', 'wp_global_styles_render_svg_filters' );

// Masquer /wp/v2/users
add_filter( 'rest_endpoints', function ( $endpoints ) {
    unset( $endpoints['/wp/v2/users'], $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
    return $endpoints;
} );

// Autoriser SVG (plugin Safe SVG recommandé en prod)
add_filter( 'upload_mimes', function ( $mimes ) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
} );

/* ─── Setup ─────────────────────────────────────────────────────────────── */

add_action( 'after_setup_theme', function () {
    load_theme_textdomain( 'tls', TLS_DIR . '/languages' );

    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', [
        'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'script', 'style',
    ] );
    add_theme_support( 'custom-logo', [
        'height'      => 40,
        'width'       => 160,
        'flex-width'  => true,
        'flex-height' => true,
    ] );
    add_theme_support( 'editor-styles' );
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'align-wide' );

    add_image_size( 'tls-hero',     1440, 720,  true );
    add_image_size( 'tls-card',     800,  533,  true );  // 3:2
    add_image_size( 'tls-card-lg',  1200, 800,  true );
    add_image_size( 'tls-avatar',   96,   96,   true );

    register_nav_menus( [
        'primary'   => __( 'Navigation principale', 'tls' ),
        'footer-1'  => __( 'Footer — Nos offres', 'tls' ),
        'footer-2'  => __( 'Footer — Société', 'tls' ),
        'footer-3'  => __( 'Footer — Légal', 'tls' ),
    ] );
} );

/* ─── Enqueue ──────────────────────────────────────────────────────────── */

add_action( 'wp_enqueue_scripts', function () {
    // Google Fonts — aligné sur le site statique validé (public/site)
    wp_enqueue_style(
        'tls-google-fonts',
        'https://fonts.googleapis.com/css2?family=League+Spartan:wght@600;700;800;900&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@500&display=swap',
        [],
        null
    );

    // Tokens — source de vérité : public/site/assets/css/tokens.css
    wp_enqueue_style( 'tls-tokens', TLS_URI . '/assets/css/tokens.css', ['tls-google-fonts'], TLS_VERSION );

    // CSS legacy — encore consommé par les templates blog/utilitaires (archive, single,
    // search, 404) en classes namespacées `tls-*`. Aucune collision avec `site.css`
    // (classes non préfixées). À retirer quand le blog sera migré sur `site.css`.
    wp_enqueue_style( 'tls-base',       TLS_URI . '/assets/css/base.css',       ['tls-tokens'], TLS_VERSION );
    wp_enqueue_style( 'tls-components', TLS_URI . '/assets/css/components.css', ['tls-base'],   TLS_VERSION );

    // Site marketing validé — chargé EN DERNIER pour gagner sur les resets élément.
    wp_enqueue_style( 'tls-site', TLS_URI . '/assets/css/site.css', ['tls-components'], TLS_VERSION );

    // Couche motion & interactions du site validé (reveal, compteurs, nav glass,
    // drawer mobile, boutons magnétiques). Vanilla, zéro dépendance.
    wp_enqueue_script( 'tls-site', TLS_URI . '/assets/js/site.js', [], TLS_VERSION, true );
} );

/* ─── Excerpt ──────────────────────────────────────────────────────────── */

add_filter( 'excerpt_length', fn() => 30 );
add_filter( 'excerpt_more',   fn() => '…' );

/* ─── Magazine list (pattern .mag-list du site validé) ─────────────────────
   Boucle les derniers posts → markup `.mag-item` (titre + meta = 1er terme
   `sujet`/catégorie). Si aucun post (install fraîche), fallback sur les 10
   articles réels du Mag' thelearningsociety.fr/mag/ (parité avec le statique).
─────────────────────────────────────────────────────────────────────────── */

function tls_mag_meta_label( $post_id ) {
    foreach ( [ 'sujet', 'category' ] as $tax ) {
        $terms = get_the_terms( $post_id, $tax );
        if ( $terms && ! is_wp_error( $terms ) ) {
            return $terms[0]->name;
        }
    }
    return __( 'Article', 'tls' );
}

function tls_render_mag_list( $count = 5 ) {
    $q = new WP_Query( [
        'post_type'           => 'post',
        'posts_per_page'      => (int) $count,
        'post_status'         => 'publish',
        'ignore_sticky_posts' => true,
        'no_found_rows'       => true,
    ] );

    if ( $q->have_posts() ) {
        while ( $q->have_posts() ) {
            $q->the_post();
            printf(
                '<a href="%1$s" class="mag-item reveal"><span class="mag-item__title">%2$s</span><span class="mag-item__meta">%3$s</span></a>',
                esc_url( get_permalink() ),
                esc_html( get_the_title() ),
                esc_html( tls_mag_meta_label( get_the_ID() ) )
            );
        }
        wp_reset_postdata();
        return;
    }

    // Fallback statique — les vrais articles du Mag' (parité avec public/site).
    $fallback = [
        [ 'https://thelearningsociety.fr/le-referentiel-des-5-piliers-la-nouvelle-matrice-de-competences-des-professionnels-ld/', 'Le Référentiel des 5 Piliers : la nouvelle matrice de compétences des professionnels L&D', 'Référentiel' ],
        [ 'https://thelearningsociety.fr/la-fin-des-qcm-lia-et-lere-de-levaluation-conversationnelle/', "La fin des QCM : l'IA et l'ère de l'évaluation conversationnelle", 'Article' ],
        [ 'https://thelearningsociety.fr/pourquoi-lere-du-chat-est-terminee-et-pourquoi-vous-devez-passer-aux-assistants/', 'Pourquoi l\'ère du « Chat » est terminée (et pourquoi vous devez passer aux Assistants)', 'Article' ],
        [ 'https://thelearningsociety.fr/lagent-ia-qualiopi-votre-assistant-numerique-anti-charge-mentale/', 'Qualiopi sans la charge mentale : la contrainte administrative en levier de performance', 'Guide' ],
        [ 'https://thelearningsociety.fr/5-leviers-dia-qui-transforment-strategiquement-les-metiers-ld-dici-2026/', "5 leviers d'IA qui transforment stratégiquement les métiers L&D d'ici 2026", 'Analyse' ],
        [ 'https://thelearningsociety.fr/lia-et-le-syndrome-de-la-reponse-facile-et-si-nous-apprenions-enfin-a-douter/', "L'IA et le syndrome de la réponse facile : et si nous apprenions enfin à douter ?", 'Analyse' ],
        [ 'https://thelearningsociety.fr/le-digital-twin-de-lapprenant-et-si-on-arretait-de-piloter-la-formation-dans-le-retroviseur/', 'Le « Digital Twin » de l\'apprenant : et si on arrêtait de piloter la formation dans le rétroviseur ?', 'Article' ],
        [ 'https://thelearningsociety.fr/sous-le-capot-de-la-dream-team-le-guide-pratique-pour-configurer-vos-assistants-ia/', 'Sous le capot de la « Dream Team » : le guide pratique pour configurer vos Assistants IA', 'Guide' ],
        [ 'https://thelearningsociety.fr/ia-et-ingenierie-pedagogique-pourquoi-lacculturation-theorique-ne-suffit-plus-et-comment-passer-a-laction/', "IA et ingénierie pédagogique : pourquoi l'acculturation théorique ne suffit plus", 'Article' ],
        [ 'https://thelearningsociety.fr/workflow-learning-vers-une-redefinition-de-lunite-de-temps-et-de-lieu-en-formation/', 'Workflow Learning : vers une redéfinition de l\'unité de temps et de lieu en formation ?', 'Article' ],
    ];

    foreach ( array_slice( $fallback, 0, (int) $count ) as $item ) {
        printf(
            '<a href="%1$s" class="mag-item reveal"><span class="mag-item__title">%2$s</span><span class="mag-item__meta">%3$s</span></a>',
            esc_url( $item[0] ),
            esc_html( $item[1] ),
            esc_html( $item[2] )
        );
    }
}

/* ─── Custom post types ───────────────────────────────────────────────────
   Les CPT sont enregistrés ici pour pouvoir être désactivés / réactivés
   selon les besoins sans toucher à un plugin.
─────────────────────────────────────────────────────────────────────────── */

add_action( 'init', function () {

    // Ressources (guides, white papers, templates)
    register_post_type( 'ressource', [
        'labels' => [
            'name'          => __( 'Ressources', 'tls' ),
            'singular_name' => __( 'Ressource', 'tls' ),
            'add_new_item'  => __( 'Ajouter une ressource', 'tls' ),
        ],
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,
        'rewrite'      => [ 'slug' => 'ressources' ],
        'supports'     => [ 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ],
        'menu_icon'    => 'dashicons-media-document',
    ] );

    // Cas clients
    register_post_type( 'cas-client', [
        'labels' => [
            'name'          => __( 'Cas clients', 'tls' ),
            'singular_name' => __( 'Cas client', 'tls' ),
        ],
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,
        'rewrite'      => [ 'slug' => 'cas-clients' ],
        'supports'     => [ 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ],
        'menu_icon'    => 'dashicons-groups',
    ] );

} );

/* ─── Custom taxonomies ────────────────────────────────────────────────── */

add_action( 'init', function () {

    // Catégories magazine (partagées entre posts et ressources)
    register_taxonomy( 'sujet', [ 'post', 'ressource' ], [
        'labels' => [
            'name'          => __( 'Sujets', 'tls' ),
            'singular_name' => __( 'Sujet', 'tls' ),
        ],
        'public'            => true,
        'show_in_rest'      => true,
        'hierarchical'      => true,
        'rewrite'           => [ 'slug' => 'sujets' ],
        'show_admin_column' => true,
    ] );

} );

/* ─── Body classes ─────────────────────────────────────────────────────── */

add_filter( 'body_class', function ( $classes ) {
    if ( is_single() ) $classes[] = 'tls-is-article';
    if ( is_archive() || is_home() ) $classes[] = 'tls-is-archive';
    if ( is_front_page() ) $classes[] = 'tls-is-front';
    return $classes;
} );

/* ─── Title separator ───────────────────────────────────────────────────── */

add_filter( 'document_title_separator', fn() => '—' );

/* ─── Nav walker ────────────────────────────────────────────────────────── */

class TLS_Nav_Walker extends Walker_Nav_Menu {

    public function start_lvl( &$output, $depth = 0, $args = null ) {
        $output .= '<ul class="tls-nav__dropdown-panel">';
    }

    public function end_lvl( &$output, $depth = 0, $args = null ) {
        $output .= '</ul>';
    }

    public function start_el( &$output, $data_object, $depth = 0, $args = null, $id = 0 ) {
        $item = $data_object;
        $classes = implode( ' ', $item->classes ?? [] );
        $is_parent = in_array( 'menu-item-has-children', $item->classes ?? [] );

        if ( $depth === 0 ) {
            if ( $is_parent ) {
                $output .= '<li class="tls-nav__dropdown">';
                $output .= '<a href="' . esc_url( $item->url ) . '" class="tls-nav__link tls-nav__dropdown-trigger">';
                $output .= esc_html( $item->title );
                $output .= '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
                $output .= '</a>';
            } else {
                $active = in_array( 'current-menu-item', $item->classes ?? [] ) ? ' tls-nav__link--active' : '';
                $output .= '<li>';
                $output .= '<a href="' . esc_url( $item->url ) . '" class="tls-nav__link' . $active . '">' . esc_html( $item->title ) . '</a>';
            }
        } else {
            $output .= '<li>';
            $output .= '<a href="' . esc_url( $item->url ) . '" class="tls-nav__dropdown-item">' . esc_html( $item->title ) . '</a>';
        }
    }

    public function end_el( &$output, $data_object, $depth = 0, $args = null ) {
        $output .= '</li>';
    }
}

/* ─── Footer nav walker ─────────────────────────────────────────────────── */

class TLS_Footer_Nav_Walker extends Walker_Nav_Menu {
    public function start_lvl( &$output, $depth = 0, $args = null ) {}
    public function end_lvl( &$output, $depth = 0, $args = null ) {}
    public function start_el( &$output, $data_object, $depth = 0, $args = null, $id = 0 ) {
        $item = $data_object;
        $output .= '<li><a href="' . esc_url( $item->url ) . '">' . esc_html( $item->title ) . '</a></li>';
    }
    public function end_el( &$output, $data_object, $depth = 0, $args = null ) {}
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */

/**
 * Renvoie le nom du sujet + sa couleur TLS pour les badges.
 */
function tls_category_tone( string $slug ): string {
    return match ( $slug ) {
        'ia', 'intelligence-artificielle' => 'primary',
        'pedagogie', 'pédagogie'           => 'warm',
        'outils', 'tools'                  => 'sun',
        'innovation'                       => 'info',
        'retours-experience'               => 'neutral',
        default                            => 'neutral',
    };
}

/**
 * Affiche un badge de catégorie.
 */
function tls_category_badge( WP_Term $term ): void {
    $tone = tls_category_tone( $term->slug );
    echo '<span class="tls-badge tls-badge--' . esc_attr( $tone ) . '">' . esc_html( $term->name ) . '</span>';
}

/**
 * Renvoie l'URL de l'image mise en avant ou un placeholder.
 */
function tls_thumbnail_url( int $post_id, string $size = 'tls-card' ): string {
    if ( has_post_thumbnail( $post_id ) ) {
        $url = get_the_post_thumbnail_url( $post_id, $size );
        return $url ?: '';
    }
    return TLS_URI . '/assets/images/placeholder.svg';
}

/**
 * Affiche le temps de lecture estimé d'un article.
 */
function tls_reading_time( int $post_id = 0 ): string {
    $content  = get_post_field( 'post_content', $post_id ?: get_the_ID() );
    $words    = str_word_count( strip_tags( $content ) );
    $minutes  = max( 1, (int) ceil( $words / 200 ) );
    return $minutes . ' min';
}

/**
 * Affiche le logo du site (inline SVG si custom logo SVG, sinon fallback texte TLS).
 * Utilisation : <?php tls_output_logo(); ?> dans nav.php
 */
function tls_output_logo(): void {
    $custom_logo_id = get_theme_mod( 'custom_logo' );
    if ( $custom_logo_id ) {
        $logo_url = wp_get_attachment_image_url( $custom_logo_id, 'full' );
        $mime     = get_post_mime_type( $custom_logo_id );
        if ( $mime === 'image/svg+xml' ) {
            $svg = file_get_contents( get_attached_file( $custom_logo_id ) );
            if ( $svg ) {
                // Nettoyer et injecter les attrs accessibilité
                $svg = preg_replace( '/<\?xml[^>]*>/i', '', $svg );
                $svg = preg_replace( '/<!DOCTYPE[^>]*>/i', '', $svg );
                $svg = preg_replace( '/<svg/', '<svg aria-hidden="true" focusable="false"', $svg, 1 );
                echo $svg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                return;
            }
        }
        // Fallback raster
        echo '<img src="' . esc_url( $logo_url ) . '" alt="' . esc_attr( get_bloginfo( 'name' ) ) . '" height="36" loading="eager">';
        return;
    }
    // Fallback textuel TLS brandmark
    echo '<span class="tls-logo-mark" aria-label="The Learning Society">
        <span class="tls-logo-mark__tls" aria-hidden="true">TLS</span>
        <span class="tls-logo-mark__dot" aria-hidden="true">·</span>
        <span class="tls-logo-mark__tagline" aria-hidden="true">' . esc_html( get_bloginfo( 'name' ) ) . '</span>
    </span>';
}

/* ─── Admin options ─────────────────────────────────────────────────────── */

/**
 * Récupère une option TLS avec valeur par défaut.
 */
function tls_get_option( string $key, string $default = '' ): string {
    $options = get_option( 'tls_theme_options', [] );
    return isset( $options[ $key ] ) ? esc_attr( $options[ $key ] ) : $default;
}

add_action( 'admin_menu', function () {
    add_theme_page(
        __( 'Options TLS', 'tls' ),
        __( 'Options TLS', 'tls' ),
        'manage_options',
        'tls-options',
        'tls_options_page'
    );
} );

add_action( 'admin_init', function () {
    register_setting( 'tls_options_group', 'tls_theme_options', [
        'sanitize_callback' => function ( $input ) {
            $clean = [];
            $fields = [ 'cta_url', 'programme_url', 'contact_email', 'linkedin_url', 'phone', 'address',
                        'legal_cgv_url', 'legal_privacy_url', 'legal_mentions_url', 'gtm_id' ];
            foreach ( $fields as $field ) {
                if ( isset( $input[ $field ] ) ) {
                    $clean[ $field ] = sanitize_text_field( $input[ $field ] );
                }
            }
            return $clean;
        },
    ] );
} );

function tls_options_page(): void { ?>
<div class="wrap">
  <h1><?php esc_html_e( 'Options du thème TLS', 'tls' ); ?></h1>
  <form method="post" action="options.php">
    <?php settings_fields( 'tls_options_group' ); ?>
    <table class="form-table" role="presentation">
      <tr>
        <th><?php esc_html_e( 'URL du CTA principal', 'tls' ); ?></th>
        <td><input type="url" name="tls_theme_options[cta_url]" value="<?php echo tls_get_option( 'cta_url' ); ?>" class="regular-text" placeholder="https://..."></td>
      </tr>
      <tr>
        <th><?php esc_html_e( 'URL programme formation (PDF)', 'tls' ); ?></th>
        <td><input type="url" name="tls_theme_options[programme_url]" value="<?php echo tls_get_option( 'programme_url' ); ?>" class="regular-text" placeholder="https://...programme.pdf"><p class="description"><?php esc_html_e( 'Lien vers le PDF du programme Formateur Augmenté (bouton téléchargement).', 'tls' ); ?></p></td>
      </tr>
      <tr>
        <th><?php esc_html_e( 'Email de contact', 'tls' ); ?></th>
        <td><input type="email" name="tls_theme_options[contact_email]" value="<?php echo tls_get_option( 'contact_email' ); ?>" class="regular-text"></td>
      </tr>
      <tr>
        <th><?php esc_html_e( 'LinkedIn', 'tls' ); ?></th>
        <td><input type="url" name="tls_theme_options[linkedin_url]" value="<?php echo tls_get_option( 'linkedin_url' ); ?>" class="regular-text"></td>
      </tr>
      <tr>
        <th><?php esc_html_e( 'Téléphone', 'tls' ); ?></th>
        <td><input type="text" name="tls_theme_options[phone]" value="<?php echo tls_get_option( 'phone' ); ?>" class="regular-text"></td>
      </tr>
      <tr>
        <th><?php esc_html_e( 'URL CGV', 'tls' ); ?></th>
        <td><input type="url" name="tls_theme_options[legal_cgv_url]" value="<?php echo tls_get_option( 'legal_cgv_url' ); ?>" class="regular-text"></td>
      </tr>
      <tr>
        <th><?php esc_html_e( 'URL Politique de confidentialité', 'tls' ); ?></th>
        <td><input type="url" name="tls_theme_options[legal_privacy_url]" value="<?php echo tls_get_option( 'legal_privacy_url' ); ?>" class="regular-text"></td>
      </tr>
      <tr>
        <th><?php esc_html_e( 'URL Mentions légales', 'tls' ); ?></th>
        <td><input type="url" name="tls_theme_options[legal_mentions_url]" value="<?php echo tls_get_option( 'legal_mentions_url' ); ?>" class="regular-text"></td>
      </tr>
      <tr>
        <th><?php esc_html_e( 'ID Google Tag Manager', 'tls' ); ?></th>
        <td><input type="text" name="tls_theme_options[gtm_id]" value="<?php echo tls_get_option( 'gtm_id', 'GTM-P96H4V3K' ); ?>" class="regular-text" placeholder="GTM-XXXXXXX"></td>
      </tr>
    </table>
    <?php submit_button(); ?>
  </form>
</div>
<?php }

/* ─── GTM output ────────────────────────────────────────────────────────── */

add_action( 'wp_head', function () {
    $gtm_id = tls_get_option( 'gtm_id', 'GTM-P96H4V3K' );
    if ( ! $gtm_id ) return;
    $gtm_id = esc_js( $gtm_id );
    ?>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','<?php echo $gtm_id; ?>');</script>
<!-- End Google Tag Manager -->
    <?php
}, 1 );

add_action( 'wp_body_open', function () {
    $gtm_id = tls_get_option( 'gtm_id', 'GTM-P96H4V3K' );
    if ( ! $gtm_id ) return;
    $gtm_id = esc_attr( $gtm_id );
    ?>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo $gtm_id; ?>" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
    <?php
}, 1 );

/* ─── Form handlers ─────────────────────────────────────────────────────── */

// Newsletter signup
add_action( 'admin_post_nopriv_tls_newsletter_signup', 'tls_handle_newsletter' );
add_action( 'admin_post_tls_newsletter_signup', 'tls_handle_newsletter' );
function tls_handle_newsletter(): void {
    if ( ! wp_verify_nonce( $_POST['tls_nonce'] ?? '', 'tls_newsletter' ) ) {
        wp_die( esc_html__( 'Requête invalide.', 'tls' ) );
    }
    $email = sanitize_email( $_POST['email'] ?? '' );
    if ( ! is_email( $email ) ) {
        wp_safe_redirect( add_query_arg( 'newsletter', 'error', wp_get_referer() ) );
        exit;
    }
    // Hook ici pour connecter Brevo/Mailchimp/Kit
    do_action( 'tls_newsletter_subscribed', $email );
    wp_safe_redirect( add_query_arg( 'newsletter', 'success', wp_get_referer() ) );
    exit;
}

// Contact form
add_action( 'admin_post_nopriv_tls_contact_form', 'tls_handle_contact' );
add_action( 'admin_post_tls_contact_form', 'tls_handle_contact' );
function tls_handle_contact(): void {
    if ( ! wp_verify_nonce( $_POST['tls_nonce'] ?? '', 'tls_contact' ) ) {
        wp_die( esc_html__( 'Requête invalide.', 'tls' ) );
    }
    // Le formulaire validé sépare prénom / nom ; on retombe sur `name` si fourni.
    $prenom  = sanitize_text_field( $_POST['prenom'] ?? '' );
    $nom     = sanitize_text_field( $_POST['nom'] ?? '' );
    $name    = trim( $prenom . ' ' . $nom );
    if ( '' === $name ) {
        $name = sanitize_text_field( $_POST['name'] ?? '' );
    }
    $email   = sanitize_email( $_POST['email'] ?? '' );
    $company = sanitize_text_field( $_POST['company'] ?? '' );
    $subject = sanitize_text_field( $_POST['subject'] ?? '' );
    $message = sanitize_textarea_field( $_POST['message'] ?? '' );
    // Email valide + message obligatoires (prénom/nom optionnels côté formulaire validé).
    if ( ! is_email( $email ) || ! $message ) {
        wp_safe_redirect( add_query_arg( 'contact', 'error', wp_get_referer() ) );
        exit;
    }
    $to      = tls_get_option( 'contact_email', 'contact@thelearningsociety.fr' );
    $headers = [ 'Content-Type: text/plain; charset=UTF-8', 'Reply-To: ' . $name . ' <' . $email . '>' ];
    $body    = sprintf( "Nom : %s\nEmail : %s\nEntreprise : %s\nSujet : %s\n\n%s", $name, $email, $company, $subject, $message );
    wp_mail( $to, '[TLS] Nouveau message : ' . $subject, $body, $headers );
    wp_safe_redirect( add_query_arg( 'contact', 'success', wp_get_referer() ) );
    exit;
}

/* ─── Comment template callback ─────────────────────────────────────────── */

if ( ! function_exists( 'tls_comment_template' ) ) {
    function tls_comment_template( WP_Comment $comment, array $args, int $depth ): void {
        $GLOBALS['comment'] = $comment;
        $is_pingback = in_array( $comment->comment_type, [ 'pingback', 'trackback' ], true );
        ?>
        <li id="comment-<?php comment_ID(); ?>" <?php comment_class( [ 'tls-comment', $is_pingback ? 'tls-comment--pingback' : '' ] ); ?>>
          <article class="tls-comment__inner">
            <?php if ( ! $is_pingback ) : ?>
              <header class="tls-comment__meta">
                <div class="tls-comment__avatar">
                  <?php echo get_avatar( $comment, 40, '', esc_attr( get_comment_author() ), [ 'class' => 'tls-comment__avatar-img' ] ); ?>
                </div>
                <div>
                  <span class="tls-comment__author"><?php comment_author(); ?></span>
                  <time class="tls-comment__date" datetime="<?php comment_time( 'c' ); ?>">
                    <?php printf(
                        /* translators: 1: date, 2: time */
                        esc_html__( 'Le %1$s à %2$s', 'tls' ),
                        esc_html( get_comment_date( 'j F Y' ) ),
                        esc_html( get_comment_time() )
                    ); ?>
                  </time>
                </div>
              </header>
            <?php endif; ?>
            <div class="tls-comment__body">
              <?php if ( '0' === $comment->comment_approved ) : ?>
                <p class="tls-comment__pending"><em><?php esc_html_e( 'Votre commentaire est en attente de modération.', 'tls' ); ?></em></p>
              <?php endif; ?>
              <?php comment_text(); ?>
            </div>
            <?php if ( ! $is_pingback ) : ?>
              <footer class="tls-comment__footer">
                <?php comment_reply_link( array_merge( $args, [
                    'add_below' => 'comment',
                    'depth'     => $depth,
                    'max_depth' => $args['max_depth'],
                    'before'    => '<span class="tls-comment__reply">',
                    'after'     => '</span>',
                ] ) ); ?>
                <?php edit_comment_link( esc_html__( 'Modifier', 'tls' ), '<span class="tls-comment__edit">', '</span>' ); ?>
              </footer>
            <?php endif; ?>
          </article>
        <?php // Note: closing </li> est géré par wp_list_comments
    }
}

