<?php
/**
 * Template Name: Méthode STRIDE (redirection)
 *
 * La méthode STRIDE est désormais présentée sur la page Accompagnement
 * (bloc sombre « La méthode STRIDE », acronyme réel S/T/R/I/D/E) et résumée
 * sur Ressources. L'ancien template portait une définition ILLUSTRATIVE de
 * l'acronyme : retiré pour respecter « STRIDE décrit = STRIDE réel ».
 * Ce stub redirige proprement (301) toute ancienne URL /methode/.
 *
 * @package tls
 */
wp_safe_redirect( home_url( '/accompagnement/#stride' ), 301 );
exit;
