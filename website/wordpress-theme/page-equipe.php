<?php
/**
 * Template Name: Équipe (redirection)
 *
 * Le contenu « équipe » est désormais consolidé sur la page Accompagnement
 * (section « Qui vous accompagne » — Chloé Mimault & Pierre-Armand Dennery)
 * et la présentation sur Ressources (« À propos »).
 *
 * L'ancien template contenait une équipe ILLUSTRATIVE (personnes fictives) :
 * retiré pour respecter la contrainte « équipe affichée = personnes réelles ».
 * Ce stub redirige proprement (301) toute ancienne URL /equipe/.
 *
 * @package tls
 */
wp_safe_redirect( home_url( '/accompagnement/#stride' ), 301 );
exit;
