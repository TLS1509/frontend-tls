<?php
/**
 * Single article
 * @package tls
 */
get_header();

while ( have_posts() ) : the_post();

$categories = get_the_category();
$primary_cat = $categories[0] ?? null;
$tone = $primary_cat ? tls_category_tone( $primary_cat->slug ) : 'neutral';
$reading_time = tls_reading_time();

// Build TOC from headings
$content = get_the_content();
preg_match_all( '/<h([23])[^>]*>(.*?)<\/h[23]>/i', $content, $matches );
$headings = [];
foreach ( $matches[2] as $i => $heading_text ) {
    $text = strip_tags( $heading_text );
    $id   = sanitize_title( $text );
    $headings[] = [ 'level' => $matches[1][$i], 'text' => $text, 'id' => $id ];
}
?>

<!-- Reading progress bar -->
<div class="tls-reading-progress" aria-hidden="true">
  <div class="tls-reading-progress__bar"></div>
</div>

<!-- Article hero area -->
<section class="tls-section tls-section--bg-alt tls-section--tight">
  <div class="tls-container tls-container--content">
    <header class="tls-article-header">

      <div class="tls-article-card__meta">
        <?php if ( $primary_cat ) : ?>
          <a href="<?php echo esc_url( get_category_link( $primary_cat->term_id ) ); ?>"
             class="tls-badge tls-badge--<?php echo esc_attr( $tone ); ?>">
            <?php echo esc_html( $primary_cat->name ); ?>
          </a>
        <?php endif; ?>
        <span class="tls-article-card__date"><?php echo esc_html( $reading_time ); ?> <?php esc_html_e( 'de lecture', 'tls' ); ?></span>
      </div>

      <h1 class="tls-article-header__title"><?php the_title(); ?></h1>

      <?php if ( has_excerpt() ) : ?>
        <p class="tls-article-header__excerpt"><?php the_excerpt(); ?></p>
      <?php endif; ?>

      <div class="tls-article-header__meta">
        <div class="tls-article-card__author">
          <?php echo get_avatar( get_the_author_meta( 'ID' ), 40, '', esc_attr( get_the_author() ), [ 'class' => 'tls-article-card__avatar' ] ); ?>
          <div>
            <div class="tls-article-card__author-name"><?php the_author(); ?></div>
            <time class="tls-article-card__date" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
              <?php echo esc_html( get_the_date( 'j F Y' ) ); ?>
            </time>
          </div>
        </div>
        <?php if ( $tags = get_the_tags() ) : ?>
          <div class="tls-filters" style="margin-left:auto;">
            <?php foreach ( array_slice( $tags, 0, 3 ) as $tag ) : ?>
              <a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>" class="tls-filter-btn">
                <?php echo esc_html( $tag->name ); ?>
              </a>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>
      </div>

    </header>
  </div>
</section>

<!-- Cover image (full-width) -->
<?php if ( has_post_thumbnail() ) : ?>
  <div class="tls-container" style="margin-bottom: var(--space-section);">
    <div class="tls-article-header__cover">
      <?php the_post_thumbnail( 'tls-card-lg', [
          'alt'     => esc_attr( get_the_title() ),
          'loading' => 'eager',
      ] ); ?>
    </div>
  </div>
<?php endif; ?>

<!-- Article body + TOC -->
<section class="tls-section tls-section--tight">
  <div class="tls-container">
    <div class="tls-article-layout">

      <!-- Main content -->
      <div class="tls-content">
        <?php the_content(); ?>
      </div>

      <!-- Sidebar TOC -->
      <?php if ( count( $headings ) >= 2 ) : ?>
        <aside aria-label="<?php esc_attr_e( 'Table des matières', 'tls' ); ?>">
          <nav class="tls-toc">
            <p class="tls-toc__title"><?php esc_html_e( 'Sommaire', 'tls' ); ?></p>
            <ul class="tls-toc__list" role="list">
              <?php foreach ( $headings as $heading ) : ?>
                <li class="tls-toc__item">
                  <a href="#<?php echo esc_attr( $heading['id'] ); ?>"
                     style="<?php echo $heading['level'] === '3' ? 'padding-left: 0.75rem; font-size: var(--text-micro);' : ''; ?>">
                    <?php echo esc_html( $heading['text'] ); ?>
                  </a>
                </li>
              <?php endforeach; ?>
            </ul>
          </nav>
        </aside>
      <?php endif; ?>

    </div>
  </div>
</section>

<!-- Related articles -->
<?php
$related = new WP_Query( [
    'post__not_in'   => [ get_the_ID() ],
    'posts_per_page' => 3,
    'orderby'        => 'rand',
    'category__in'   => wp_list_pluck( $categories, 'term_id' ),
] );

if ( $related->have_posts() ) : ?>
  <section class="tls-section tls-section--bg-alt">
    <div class="tls-container">
      <div class="tls-section-header">
        <h2 class="tls-section-header__title"><?php esc_html_e( 'À lire aussi', 'tls' ); ?></h2>
      </div>
      <div class="tls-grid tls-grid--3">
        <?php while ( $related->have_posts() ) : $related->the_post();
            get_template_part( 'template-parts/article/card' );
        endwhile;
        wp_reset_postdata(); ?>
      </div>
    </div>
  </section>
<?php endif;

endwhile;

get_footer();
