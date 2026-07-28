> ⚠️ **FIABILITÉ NON VÉRIFIÉE (flag 2026-06-30).** Rapport produit sans trace d'inspection node-par-node du fichier Figma. Une vérif manuelle (2026-06-30) a montré que des audits Figma de cette période contenaient des affirmations fabriquées (cf. Phase 1 P0). À re-vérifier via `use_figma` contre `LccBZ1GKWQVwVzPtsSzk5Y` avant de s'y fier.

# Audit — Drift Figma ↔ Code (2026-06-18)

> Cadre la décision « reprendre tous les wireframes et screens ». Code = source de vérité (convention CLAUDE.md triple-sync). Audit **structurel** : couverture + cas de drift confirmés. La vérif visuelle pixel-par-pixel de chaque composant/écran = étape d'exécution, pas faite ici.

Fichier Figma : `LccBZ1GKWQVwVzPtsSzk5Y` (Design System TLS).

## TL;DR

- **Composants** : bonne couverture (~185 composants Figma : Atoms ~85 + Composites ~100, vs ~213 fichiers code), mais **contenu drifté** sur plusieurs composants clés.
- **Écrans** : couverture faible — **~33 écrans desktop** (pages flow 05-14) + 61 frames mobile vs **171 routes / 149 pages** en code → **~20-25 %** des écrans app existent en Figma, et les existants s'appuient sur des composants périmés.
- **Conclusion** : le réalignement est justifié. Corriger les **atomes foundational d'abord** (la sidebar se propage à tous les écrans), puis composites, puis (re)faire les écrans flow par flow.

## 1. Composants — drift

| Composant Figma | État | Drift vs code |
|---|---|---|
| `Sidebar` (1348:6) + `AppSidebar` (2317:48) | 🔴 | **2 composants redondants**, tous deux périmés. `Sidebar` = fond **teal** ; les deux ont nav **« Mes parcours / Gamification / Entreprise »** + **emojis**. Code = **blanc**, nav **« Parcours / Espace Apprentissage »** (pas de Gamification/Entreprise), **icônes Lucide**, user card. → Fusionner en 1 composant à jour. |
| `HeroSection` | 🔴 | **Sunset en code** (Phase 19.B2, fichier supprimé). Canonical = `PageHero` (alias `EditorialHero`). → déprécier/supprimer en Figma. |
| `SessionCard`, `ActivityFeed`, `ResumeLessonCard`, `EmptyDashboardState`, `NextStepsGrid` | 🟠 | **Retravaillés en code 2026-06-18** (premium éditorial : glass→solid `shadow-card`, status eyebrow + avatar coach + meta inline, cold-start hiérarchisé, etc.). Figma = ancienne version. |
| Icônes (transverse) | 🔴 | **Emojis** dans les composants Figma vs **Lucide SVG** en code — viole la règle figma « Lucide strict ». Systémique (sidebar, nav, cards…). |
| ~175 autres composites/atoms | 🟡 | À **spot-check** — drift partiel probable suite aux Phases 14→19 (warm shadows, Chip primitive, PageHero rename, tracking gradué, semantic colors muted, etc.). |

## 2. Écrans — gap de couverture

**Figma (desktop, pages flow)** :
| Page Figma | Écrans |
|---|---|
| 05 Onboarding | 2 |
| 06 Auth & Security | 1 |
| 07 Learning Paths | 4 |
| 08 Coaching | 12 |
| 09 Journal | 2 |
| 10 Dashboard | **5** (DB-01 returning, DB-02 first-time, DB-03 achievements, DB-04 XP, DB-05 streak) |
| 11 Gamification | 1 |
| 12 Passeport | 1 |
| 13 Profile & Account | 1 |
| 14 Veille & Magazine | 4 |
| **Total desktop flow** | **~33** |
| 📱 Mobile — Breakpoints | 61 frames |
| 🖥️ Desktop Screens 1440 | **vide** |
| 🗺 Wireframes — Tier 1 Lo-fi | **vide** |

**Code** : 149 pages / **171 routes** (app authentifiée) + 24 pages marketing.

→ **~20-25 %** des écrans app sont représentés en Figma, concentrés sur quelques flows. ~115 pages code **n'ont aucun écran Figma**. Les écrans Figma existants utilisent la sidebar + composants périmés.

## 3. Plan de réalignement priorisé

**Phase 0 — Foundations atomes (bloquant, fort levier)**
- **Sidebar** : fusionner `Sidebar` + `AppSidebar` → **1 composant à jour** (blanc, nav code, Lucide, états actif/hover, collapsed variant, user card). Se propage à TOUTES les instances (explorations + DB-01→05).
- `NavItem`, `SidebarUserCard`, `BottomNav` (retirer Recherche, matcher code).
- Librairie d'icônes **Lucide** (remplacer les emojis).

**Phase 1 — Composants driftés confirmés**
- Dashboard family : `SessionCard`, `ActivityFeed`, `ResumeLessonCard`, `EmptyDashboardState`, `NextStepsGrid` → maj premium éditorial.
- `HeroSection` sunset ; vérifier `PageHero`/`EditorialHero`.

**Phase 2 — Spot-check + maj du reste**
- Vérifier les atomes/composites clés vs Phases 19 (Button, Card warm shadows, Badge, Chip/Pill family, SectionHeader tracking, semantic colors muted, tokens).

**Phase 3 — Écrans flow par flow (code = source)**
- (Re)générer/mettre à jour par flow, en réutilisant les composants à jour. **Dashboard d'abord** (on vient de le retravailler). Combler le gap en priorisant Tier 1 daily-use (LearningPaths, Coaching, Journal, Passeport, Veille).
- Page « 🖥️ Desktop Screens 1440 » (vide) = home naturel des écrans desktop finaux.

**Phase 4 — Wireframes lo-fi**
- Page « 🗺 Wireframes » vide. À (re)faire seulement si utile au process ; sinon skip (les hi-fi suffisent).

## 4. Process

- **Code = source de vérité.** Corriger le composant Figma → les instances se propagent (fixer la sidebar met à jour tous les écrans d'un coup).
- Sync **Notion DS DB** en parallèle (convention triple-sync).
- Les 3 frames d'exploration layout (section 3940:457) héritent de la mauvaise sidebar → seront corrigées dès la Phase 0.

## Limites de cet audit

Structurel (couverture + cas confirmés : sidebar, HeroSection, dashboard family, emojis). La vérif visuelle composant-par-composant et écran-par-écran reste à faire à l'exécution de chaque phase.
