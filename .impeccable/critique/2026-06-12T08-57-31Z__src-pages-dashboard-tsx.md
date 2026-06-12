---
target: Dashboard
total_score: 21
p0_count: 0
p1_count: 3
timestamp: 2026-06-12T08-57-31Z
slug: src-pages-dashboard-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Progression de la leçon visible, mais aucun état global |
| 2 | Match System / Real World | 3 | Langage naturel en fr-FR, "À découvrir" trompeur pour ActivityFeed |
| 3 | User Control and Freedom | 2 | Feed non-dismissable, quote non-skippable, aucune personnalisation |
| 4 | Consistency and Standards | 3 | SectionHeader cohérent sauf WritingPromptsAside |
| 5 | Error Prevention | 2 | Données mock, zéro error states, aucun feedback de chargement |
| 6 | Recognition Rather Than Recall | 2 | 4 sections sans hiérarchie = utilisateur doit décider lui-même |
| 7 | Flexibility and Efficiency | 2 | Zéro raccourci, CTA va vers path-overview pas la leçon |
| 8 | Aesthetic and Minimalist Design | 2 | Hero décoratif, feed domine le scroll, hiérarchie plate |
| 9 | Error Recovery | 2 | EmptyDashboardState bon, rien d'autre |
| 10 | Help and Documentation | 1 | Aucune aide contextuelle |
| **Total** | | **21/40** | **Acceptable** |

## Anti-Patterns Verdict
- formattedDate.toUpperCase() — eyebrow uppercase banni (ligne 72)
- DAILY_QUOTES — citations motivationnelles génériques LinkedIn-wisdom
- 4 × SectionHeader variant="minimal" identiques — hiérarchie plate de sections

## Priority Issues
- [P1] Hero plein viewport pour citation décorative — leçon invisible sous le fold
- [P1] 4 sections poids visuel identique — pas de priorisation
- [P1] formattedDate.toUpperCase() — eyebrow banni
- [P2] DAILY_QUOTES génériques dans l'hero
- [P2] ActivityFeed occupe 60% du scroll mais contenu passif
- [P2] CTA "Reprendre" navigue vers path-overview, pas la leçon directement
