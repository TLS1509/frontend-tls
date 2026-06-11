<?php
/**
 * Page générique
 * @package tls
 */
get_header();

while ( have_posts() ) : the_post(); ?>

  <section class="tls-hero tls-hero--primary">
    <div class="tls-container tls-container--content">
      <h1 class="tls-hero__title"><?php the_title(); ?></h1>
    </div>
  </section>

  <section class="tls-section">
    <div class="tls-container tls-container--content">
      <div class="tls-content">
        <?php the_content(); ?>
      </div>
    </div>
  </section>

<?php endwhile;

get_footer();
