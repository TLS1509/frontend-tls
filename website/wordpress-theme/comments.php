<?php
/**
 * Template commentaires TLS
 * @package tls
 */

if ( post_password_required() ) {
    return;
}
?>

<section id="comments" class="tls-comments tls-section tls-section--tight">
  <div class="tls-container tls-container--content">

    <?php if ( have_comments() ) : ?>
      <h2 class="tls-comments__title">
        <?php
        $comment_count = get_comments_number();
        if ( '1' === $comment_count ) {
            printf(
                /* translators: %s: post title */
                esc_html__( 'Un commentaire sur « %s »', 'tls' ),
                '<span>' . esc_html( get_the_title() ) . '</span>'
            );
        } else {
            printf(
                /* translators: 1: number of comments, 2: post title */
                esc_html( _nx( '%1$s commentaire sur « %2$s »', '%1$s commentaires sur « %2$s »', $comment_count, 'comments title', 'tls' ) ),
                number_format_i18n( $comment_count ),
                '<span>' . esc_html( get_the_title() ) . '</span>'
            );
        }
        ?>
      </h2>

      <ol class="tls-comment-list" aria-label="<?php esc_attr_e( 'Liste des commentaires', 'tls' ); ?>">
        <?php
        wp_list_comments( [
            'style'      => 'ol',
            'short_ping' => true,
            'avatar_size' => 40,
            'callback'   => 'tls_comment_template',
        ] );
        ?>
      </ol>

      <?php the_comments_navigation( [
          'prev_text' => esc_html__( 'Commentaires plus anciens', 'tls' ),
          'next_text' => esc_html__( 'Commentaires plus récents', 'tls' ),
      ] ); ?>

    <?php endif; ?>

    <?php if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) : ?>
      <p class="tls-comments__closed"><?php esc_html_e( 'Les commentaires sont fermés.', 'tls' ); ?></p>
    <?php endif; ?>

    <?php
    comment_form( [
        'class_container'     => 'tls-comment-form-wrap',
        'class_form'          => 'tls-comment-form',
        'title_reply'         => esc_html__( 'Laisser un commentaire', 'tls' ),
        'title_reply_before'  => '<h3 class="tls-comment-form-wrap__title">',
        'title_reply_after'   => '</h3>',
        'label_submit'        => esc_html__( 'Publier le commentaire', 'tls' ),
        'submit_button'       => '<button type="submit" name="%1$s" id="%2$s" class="tls-btn tls-btn--primary %3$s">%4$s</button>',
        'comment_notes_before' => '',
        'fields'              => [
            'author' => '<div class="tls-comment-form__row tls-comment-form__row--2"><div class="tls-contact-form__field"><label for="author">' . esc_html__( 'Nom', 'tls' ) . ' <span aria-hidden="true">*</span></label><input id="author" name="author" type="text" size="30" maxlength="245" autocomplete="name" required></div>',
            'email'  => '<div class="tls-contact-form__field"><label for="email">' . esc_html__( 'Email', 'tls' ) . ' <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" size="30" maxlength="100" autocomplete="email" required></div></div>',
            'url'    => '',
            'cookies' => '',
        ],
        'comment_field'       => '<div class="tls-contact-form__field"><label for="comment">' . esc_html__( 'Commentaire', 'tls' ) . ' <span aria-hidden="true">*</span></label><textarea id="comment" name="comment" cols="45" rows="6" required></textarea></div>',
    ] );
    ?>

  </div>
</section>


<?php
// tls_comment_template() est définie dans functions.php
