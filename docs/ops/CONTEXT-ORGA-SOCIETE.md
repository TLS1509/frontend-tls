# Contexte — Organisation & ops de la société (projet séparé)

> **Ce qu'est ce projet.** L'organisation interne de TLS : outillage, Notion, finance, process, réorg. **Rien à voir avec le frontend / le produit** — ces sujets n'ont plus leur place dans le `CLAUDE.md` du dépôt (recentré sur Learning App + design system). Ce doc est le point d'entrée du dossier `docs/ops/`. Équipe = **Mimault + Dennery** (2 associés), pas d'autre membre.

## Principe directeur (durable)

Le point faible historique du duo est le **partage d'infos et la mise à jour des Notion par Pierre** (commercial/delivery) — d'où de « gros soucis admin » en 2025. Chloé (tech/produit) veut **tout méga clean, suivable, automatisé au maximum**.

**Règle de conception à appliquer partout** (dashboard, workflows, Notion, tooling) : *aucun chiffre ni process critique ne doit dépendre de la rigueur de mise à jour de quelqu'un.* Le système se tient seul et **signale ce qui manque** (alertes : devis signé non facturé, facture impayée 30 j, livré non facturé, pièce manquante) au lieu de reposer sur la discipline manuelle. Bénéfice double : protège le business ET désamorce la friction Chloé↔Pierre (le système attrape les trous, pas Chloé).

**Traductions concrètes** :
- Source de vérité **argent = Pennylane** (banque synchro, factures, rapprochement auto) — PAS le carnet Notion manuel (troué justement parce que manuel). Dashboard financier = lecture live Pennylane (API / MCP, token read-only), zéro saisie.
- **Une source de vérité par domaine** ; tuer les doublons et pages Notion qui se contredisent.
- Option ouverte : **externaliser l'admin** (assistant·e temps partiel / pilotage comptable) plutôt que compter sur la rigueur de Pierre. ~80 % automatisation, ~20 % jugement humain externe.

## Docs du dossier `docs/ops/`

| Fichier | Contenu |
|---|---|
| [`CARTOGRAPHIE-OUTILLAGE.md`](CARTOGRAPHIE-OUTILLAGE.md) | Cartographie besoins → workflows → outillage (5 fonctions : acquisition, vente, produit, preuve, pilotage) + roadmap skills TLS. Relève des divergences de sources (métriques inventées, 2 modèles de pricing). |
| [`NOTION-CAPACITES-2026.md`](NOTION-CAPACITES-2026.md) | Ce que Notion sait faire depuis 2026 (Workers, Database Sync → Pennylane, Custom Agent Tools, API charts/dashboards). Échéances de coût (Custom Agents, Workers). |
| [`NOTION-WORKSPACE-AUDIT.md`](NOTION-WORKSPACE-AUDIT.md) | Audit du workspace : sous-activé (40 projets, agents/skills jamais testés, CRM avec relances en retard, admin sans routine). Plan d'action. |
| [`GABARIT-PORTAILS-AREA-NOTION.md`](GABARIT-PORTAILS-AREA-NOTION.md) | Gabarit de portails / Company Areas Notion. |
| [`REORG-OPS-DONNEES-STACK-H2-2026.md`](REORG-OPS-DONNEES-STACK-H2-2026.md) | Réorg ops / données / stack, H2 2026. |

> Voir aussi (hors `ops/`) : `docs/product/ETUDE-VIABILITE-LEARNING-APP.md` (verdict business global), `docs/product/STRATEGIE-REALIGNEMENT-H2-2026.md`. Contexte durable en mémoire : `feedback_ops_clean_automated`, `feedback_critical_analysis_sources`.

## Ce qu'on ne fait PAS ici

- ❌ Concevoir un dashboard/process qui dépend d'une MAJ manuelle par un humain.
- ❌ Traiter un carnet Notion manuel comme source de vérité pour l'argent (→ Pennylane).
- ❌ Laisser deux sources se contredire sur un même chiffre (pricing, CA…).
