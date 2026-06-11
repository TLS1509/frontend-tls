<?php
/**
 * Article card — utilisée dans les archives et le blog
 * @package tls
 */

$categories = get_the_category();
$primary_cat = $categories[0] ?? null;
$tone = $primary_cat ? tls_category_tone( $primary_cat->slug ) : 'neutral';
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> data-category="<?php echo $primary_cat ? esc_attr( $primary_cat->slug ) : 'all'; ?>">
  <a href="<?php the_permalink(); ?>" class="tls-article-card" aria-label="<?php echo esc_attr( get_the_title() ); ?>">

    <!-- Image -->
    <?php if ( has_post_thumbnail() ) : ?>
      <div class="tls-article-card__image">
        <?php the_post_thumbnail( 'tls-card', [
            'alt'     => esc_attr( get_the_title() ),
            'loading' => 'lazy',
        ] ); ?>
      </div>
    <?php endif; ?>

    <!-- Body -->
    <div class="tls-article-card__body">
      <div class="tls-article-card__meta">
        <?php if ( $primary_cat ) : ?>
          <span class="tls-badge tls-badge--<?php echo esc_attr( $tone ); ?>"><?php echo esc_html( $primary_cat->name ); ?></span>
        <?php endif; ?>
        <span class="tls-article-card__date"><?php echo esc_html( tls_reading_time() ); ?> <?php esc_html_e( 'de lecture', 'tls' ); ?></span>
      </div>

      <h2 class="tls-article-card__title"><?php the_title(); ?></h2>

      <?php if ( has_excerpt() ) : ?>
        <p class="tls-article-card__excerpt"><?php the_excerpt(); ?></p>
      <?php endif; ?>

      <div class="tls-article-card__footer">
        <div class="tls-article-card__author">
          <?php echo get_avatar( get_the_author_meta( 'ID' ), 32, '', esc_attr( get_the_author() ), [ 'class' => 'tls-article-card__avatar' ] ); ?>
          <span class="tls-article-card__author-name"><?php the_author(); ?></span>
        </div>
        <time class="tls-article-card__date" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
          <?php echo esc_html( get_the_date( 'd M Y' ) ); ?>
        </time>
      </div>
    </div>

  </a>
</article>
