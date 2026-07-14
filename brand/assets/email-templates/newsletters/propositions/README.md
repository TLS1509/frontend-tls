# Propositions — newsletter & actus (2026-07-10)

3 directions de design distinctes ont été proposées, chacune déclinée en 2 fichiers (newsletter mensuelle + actus/veille) pour comparer à contenu égal. Toutes les 6 déclinaisons étaient 100% tokens TLS (`src/index.css`), 100% email-safe (tables, pas de flex/grid), CTA en `rounded-pill`.

## ✅ Triage fait (2026-07-10) — par suppression manuelle

| Fichier | Sort |
|---|---|
| `1-signal-newsletter.html` | **Gardé** |
| `1-signal-actus.html` | Supprimé |
| `2-studio-newsletter.html` | Supprimé |
| `2-studio-actus.html` | Supprimé |
| `3-digest-newsletter.html` | Supprimé |
| `3-digest-actus.html` | **Gardé** |

Le fichier de prod `newsletters/gazette-veille.html` a aussi été supprimé dans la foulée. Lecture provisoire : **Signal pour la newsletter, Digest pour les actus** — deux directions différentes selon le contenu, pas une direction unique pour tout. Direction **Studio rejetée entièrement** (les 2 fichiers supprimés).

Le tableau comparatif ci-dessous reste comme référence de ce qui a été proposé/pourquoi, même si 4 des 6 fichiers n'existent plus.

## Les 3 directions

| | 1 — Signal | 2 — Studio | 3 — Digest |
|---|---|---|---|
| **Fichiers** | `1-signal-newsletter.html` · `1-signal-actus.html` | `2-studio-newsletter.html` · `2-studio-actus.html` | `3-digest-newsletter.html` · `3-digest-actus.html` |
| **Philosophie** | La sobriété comme signal d'autorité. Zéro carte, zéro ombre — juste de la typo, des filets 1px, un seul accent utilisé avec parcimonie. | L'app dans la boîte mail. Reprend le vocabulaire visuel réel de TLS : header gradient, `shadow-card`, pills tone-aware, `border-radius` cohérents avec le DS. | Grille bento dense et scannable. Chaque section devient une tuile teintée (primary/warm/sun en rotation), une tuile "featured" en pleine largeur, le reste en 2 colonnes. |
| **Inspiré de** | Stratechery, Dense Discovery, a16z newsletter — le texte fait le travail, pas la décoration. | Le Dashboard / LearningSpace de l'app elle-même — cohérence directe avec ce que l'apprenant voit déjà en se connectant. | Tendance bento (Apple, pages produit SaaS 2023-2026) — optimisé pour scanner "tout, d'un coup d'œil". |
| **Densité visuelle** | Très faible — beaucoup de blanc, peu de couleur | Moyenne — cards blanches sur fond gris clair | Élevée — mosaïque colorée, peu de blanc |
| **CTA** | Lien texte souligné, pas de bouton (sauf 1 pill en toute fin) | Pill gradient orange, cohérent avec les CTA app | Pill orange dans les tuiles, plusieurs CTA actifs |
| **Meilleur fit** | Positionnement "expert/sérieux" — la veille stratégique en particulier | Cohérence maximale avec l'app, sensation "produit" forte | Beaucoup de contenu à faire tenir dans un seul envoi, lecture rapide |
| **Risque** | Peut sembler austère/moins "TLS" (peu de couleur de marque visible) | Le plus proche de l'existant `newsletter-mensuelle.html` — évolution, pas rupture | Peut devenir chargé si on ajoute plus de 4-5 tuiles ; le moins testé en rendu Outlook (grilles imbriquées) |

## Ce qui est intentionnellement simplifié dans ces propositions

Pour comparer à contenu égal, chaque variante ne couvre que : header, hero/KPIs ou headline, 2 items (parcours ou articles), 1 insight/coaching, 1 CTA, footer. La version `newsletter-mensuelle.html` actuelle a en plus une section "conseils" et un footer plus riche — la direction choisie sera complétée avec ces sections manquantes avant passage en prod.

## Recommandation

Pas de tranchage fait ici — les 3 sont volontairement construites pour être de vraies alternatives, pas une "bonne" et deux pailles. **Studio** est le choix le plus sûr (continuité avec l'existant + avec l'app), **Signal** le plus différenciant si TLS veut se positionner "voix d'expert" plutôt que "produit qui notifie", **Digest** le plus adapté si le volume de contenu par envoi doit grandir.

## Prochaine étape

1. ~~Choisir une direction~~ ✅ fait par triage 2026-07-10 — Signal (newsletter) / Digest (actus), à confirmer explicitement
2. Compléter `1-signal-newsletter.html` et `3-digest-actus.html` avec les sections manquantes (conseils, footer riche) pour matcher le niveau de complétude de l'ancien `newsletter-mensuelle.html`
3. Remplacer `newsletters/newsletter-mensuelle.html` par la version Signal complétée ; créer un nouveau `newsletters/gazette-veille.html` à partir de la version Digest complétée (l'ancien fichier a été supprimé)
4. Archiver ou supprimer ce dossier `propositions/` une fois le remplacement fait
