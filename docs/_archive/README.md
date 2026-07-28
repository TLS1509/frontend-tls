# _archive — ce qui est mort mais qu'on garde exprès

> **Trié le 2026-07-28** : 64 fichiers → 25. Le reste a été supprimé du dossier,
> pas de l'histoire : tout est récupérable avec `git show HEAD~1:<chemin>`.

## La règle

Un document n'atterrit ici que s'il répond **oui** à une de ces deux questions :

1. **Est-ce qu'il empêche une erreur de revenir ?** Un doc archivé avec une note
   qui explique pourquoi il est faux vaut mieux qu'un doc supprimé dont l'idée
   ressurgira dans six semaines sans que personne ne se souvienne du problème.
2. **Est-ce qu'il contient un travail de vérification qu'on ne veut pas refaire ?**
   Un fact-check sourcé, une correction établie.

**Si la réponse est non aux deux, on supprime.** Un brouillon de sprint, une
liste de mots-clés de recherche, une checklist de phase terminée, un journal de
session : git les garde, le dossier n'a pas à les porter.

C'est ce qui a été appliqué : les 39 fichiers retirés étaient des moodboards, des
prompts, des plans de refactor achevés et des récaps de session.

## Ce qui reste

| Dossier | Pourquoi il est là |
|---|---|
| `corpus-site-juin-2026/` | La copy et les blueprints d'un site qui n'existe plus. **Anti-résurrection** : c'est la source des claims interdits qui ont circulé (Qualiopi pour TLS, CPF, « Open Badge 2.0 », « 23 heures »). Le README du dossier explique lesquels et pourquoi |
| `corpus-marketing-IA-juin-2026/` | Le corpus marketing produit **par IA** en juin 2026 et lu sept semaines comme de la doctrine. Même raison |
| `factcheck-corpus/` | Vérifications sourcées sur les contenus pédagogiques. Du travail de fond qu'on ne veut pas refaire |
| `MARKETING-CONTEXT.md` | L'ancien doc « à lire en premier », rétrogradé. Gardé pour que personne ne le repromeuve |

## Où sont les références vivantes

| Besoin | Doc |
|---|---|
| Un fait, un chiffre, un interdit | [`docs/_canon/FACTS-CANON.md`](../_canon/FACTS-CANON.md) |
| L'arborescence du site | [`docs/site/SITEMAP-V1.md`](../site/SITEMAP-V1.md) |
| Le copywriting arbitré | [`docs/site/propositions-PAD/`](../site/propositions-PAD/) |
| Les invariants du site | [`docs/site/CONTEXT-SITE-MARKETING.md`](../site/CONTEXT-SITE-MARKETING.md) |
| La carte de tout | [`docs/INDEX.md`](../INDEX.md) |
