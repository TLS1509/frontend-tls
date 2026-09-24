import React from 'react';
import { Card } from '../core/Card';

/**
 * ChartContainer — la carte qui porte un graphique posé seul dans une section.
 *
 * Passe par `Card` depuis le 2026-09-24. C'était une carte faite main — rayon
 * 14 (`rounded-lg`, l'étage interactif), padding 16, filet ink-100 — donc un
 * troisième gabarit de carte à côté des 20 / 24 de `Card` : sur
 * /coach/dashboard, la matrice de performance était la seule carte de la page
 * à 14 px de rayon. Elle prend l'anatomie de carte : rayon 20, padding 24,
 * filet ink-200.
 *
 * Coins imbriqués : le padding (24) dépasse le rayon (20), donc tout ce que la
 * carte contient est en régime « forme fixe » — une info-bulle de graphique
 * garde ses 14 px, rien n'est à rogner.
 *
 * ⚠️ Pas de ChartContainer DANS une carte : ce serait une carte dans une
 * carte (Passeport, Analytics et le panneau radar du tableau de bord coach ont
 * été corrigés pour cela). Dans une carte, poser le graphique directement.
 */
export const ChartContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <Card className={`flex justify-center w-full ${className}`}>{children}</Card>
);
