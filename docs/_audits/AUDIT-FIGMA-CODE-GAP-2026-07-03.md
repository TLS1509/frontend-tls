# Audit — Gap DS Figma ↔ Code (composants)

**Date** : 2026-07-03
**But** : avant de reproduire les écrans app dans Figma (Phase 20), identifier quels composants du code ont (ou non) un component set Figma instanciable. Prérequis à la repro d'écrans par instances.
**Méthode** : inventaire des exports code (`src/components/**`) croisé avec l'inventaire des `COMPONENT_SET`/`COMPONENT` Figma des pages **🔵 03 · Atoms** (68) + **🟢 04 · Composites** (107) = 175 masters. Cross-référence par nom + inspection ciblée des composants auth (AuthField, Button, Divider, Checkbox) via `use_figma`.

> ⚠️ **Fiabilité** : la couverture ci-dessous est **name-based** (nom code == nom Figma). Un match par nom ne garantit PAS l'absence de drift visuel/props. Seul l'auth a été **inspecté en profondeur** (drift confirmé). Le reste = « présent, drift non vérifié ».

## Résumé

- **~158 composants matchés par nom** — le DS couvre l'essentiel du code (~90%).
- **Gap bloquant = famille auth glass-dark** (bloque le pilote Auth).
- **~5 autres composants réellement manquants**.
- Reste = faux positifs (existent sur une autre page / cassés / structurels).

## ❌ Manquants réels — à CRÉER avant repro d'écran

### Famille Auth glass-dark (priorité 1 — bloque le flow Auth)

Le code (`patterns/AuthShell.tsx`) compose les écrans auth avec ces composants ; aucun n'a de component set Figma glass-dark correct :

| Code | Mapping DS cible | Action |
|---|---|---|
| `AuthField` (`Input surface="glass"` + icône) | AuthField (1112:70) | **FIX** — le set Figma est *light* (« EMAIL PROFESSIONNEL » / stat-card), pas glass, sans icône |
| `AuthPrimaryButton` (blanc sur dark) | Button + variant `inverse` | **EXTEND** Button (aucun variant blanc-sur-dark parmi les 13) |
| `AuthGhostButton` (bordure blanche sur dark) | Button + variant `ghost-dark` | **EXTEND** Button |
| `AuthSocialButton` (Google/LinkedIn) | — | **CREATE** |
| `AuthDivider` (« ou continuer avec » glass-dark) | Divider + tone `glass-dark` | **EXTEND** Divider (orientation×withLabel seulement) |
| `AuthCheckbox` (dark) | Checkbox + surface `dark` | **EXTEND** Checkbox (states seulement) |
| `AuthPasswordField` (eye toggle) | dérivé d'AuthField | **CREATE** (variant/wrapper) |
| `AuthSuccess` (état succès glass) | — | **CREATE** |

### Autres manquants

| Composant | Layer | Note |
|---|---|---|
| `CourseCard` | learning | Card cours — absent des Composites |
| `SegmentedControl` | ui | absent |
| `MessageBubble` | ui | bulle chat — absent |
| `CompletionModal` | modals | absent |
| `SelectCheckboxFloating` | ui | créé en code cette session, pas encore en Figma |

## ⚠️ Faux positifs (NE PAS créer)

- `TlsLogoLockup` — existe (page « 🔷 Logo — modernisation », créé cette session)
- `CheckboxGroup`, `InputGroup`, `FloatLabel` — existent en sets **cassés** hors Atoms/Composites (voir CLAUDE.md § Phase 1 P0 — variant keys incohérentes ; à réparer, pas recréer)
- `Chip` — primitive interne (les wrappers Pill/Tag/MetaPill/FilterChip existent)
- `RadioGroup`, `Stepper` — couverts par Radio / Steps
- `PageShell`, `NavItem`, `Container`, `Grid`, `Stack`, `Cluster` — primitives **layout structurelles**, pas de composant visuel Figma nécessaire
- `Kbd` — touche clavier, cosmétique mineur

## ✅ Extras Figma sans match code direct (renommages, OK)

`Achievement`, `Drawer`, `FloatingNavButton`, `InlineProgress`, `QuizQuestionCard`, `RatingModal`, `ReadingProgress`, `ReadingProgressRing`, `SettingRow`, `SkeletonTemplates`, `Textarea` — quasi tous ont un équivalent code (naming diff : `Textarea`→core/Input, etc.). Pas de vrai gap.

## Drift confirmé / à vérifier

- **CONFIRMÉ** : `AuthField` Figma = light, ≠ code glass. Toute la surface auth (Button/Divider/Checkbox) n'a pas les variants glass-dark.
- **NON VÉRIFIÉ (à checker par écran)** : `Sidebar` (mémoire signale un drift ×2), et tous les ~158 matchés par nom — le drift visuel/props se vérifie composant par composant lors de la repro de chaque flow.

## Recommandation — ordre de travail

1. **Préparer la famille auth glass-dark** (fix AuthField + extend Button/Divider/Checkbox + create AuthSocialButton/PasswordField/Success) → débloque le flow Auth (6 écrans).
2. **Créer les ~5 stragglers** au fil des flows qui les utilisent (CourseCard→learning, MessageBubble→chat, etc.).
3. **Réparer les 3 sets cassés** (CheckboxGroup/InputGroup/FloatLabel — Phase 1 P0).
4. **Puis** reproduire les écrans **flow par flow en instances** (voir CLAUDE.md § Phase 20 + [[feedback_figma_screens_use_instances]]). Le drift des composants matchés se corrige au moment où le flow qui les consomme est reproduit.
