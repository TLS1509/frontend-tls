# Flow prompts — sessions code TLS

Prompts auto-suffisants pour construire les user flows du produit, un par session code.
Chaque fichier est complet : copie tout le contenu dans une nouvelle session.

## Ordre conseillé
1. `00-onboarding.md` — new-user journey (le plus structurant)
2. `01-parcours-lesson.md` — cœur daily-use (parcours → leçon → viewers)
3. `02-journal.md` — court, autonome
4. `03-coaching.md` — plus gros, dépend du Passeport

> Le **design system est verrouillé** (141 component sets, tokens, 100% Tailwind, build clean).
> On construit le PRODUIT par-dessus. On n'étend le DS que si un écran révèle un composant manquant.

---

## Quels skills / outils / MCP appeler (dans chaque session)

### 🔧 MCP — obligatoires
| MCP | Quand | Outils clés |
|-----|-------|-------------|
| **Claude_Preview** | À CHAQUE écran modifié — c'est la boucle de vérif imposée par CLAUDE.md | `preview_start`, `preview_eval` (reload), `preview_snapshot` (contenu), `preview_console_logs` / `preview_logs` (erreurs), `preview_click` / `preview_fill` (interactions), `preview_screenshot` (preuve), `preview_resize` (375 + 1280) |
| **Figma** (`use_figma` / `get_screenshot`) | Pour récupérer l'écran cible depuis le DS comme **référence visuelle** | fileKey = `LccBZ1GKWQVwVzPtsSzk5Y`. Les flow pages existent déjà (🚀 05 Onboarding, 📚 07 Learning Paths, 🎯 08 Coaching, 📔 09 Journal). Screenshot la section/écran pour t'en inspirer. |

### 🎯 Skills — à invoquer au bon moment
| Skill | Quand l'appeler |
|-------|-----------------|
| `run` | Démarrer l'app si pas déjà fait |
| `verify` | **À la fin de chaque écran** — lance l'app et observe que le comportement est correct (pas juste "ça compile") |
| `/code-review` | **Avant chaque commit** — review le diff (bugs + simplification) |
| **`impeccable`** | **À invoquer SYSTÉMATIQUEMENT à l'étape high-fi de chaque écran** — design/redesign, hiérarchie visuelle, charge cognitive, polish premium. C'est le skill principal de qualité UI. |
| `design-taste-frontend` · `gpt-taste` · `high-end-visual-design` | Goût visuel / direction esthétique premium quand un écran doit être hissé d'un cran |
| `frontend-design` · `web-design-guidelines` | Aide design frontend + audit selon guidelines |
| `copywriting` / `writing-guidelines` | Si les microcopies (CTA, vides, erreurs) sont à écrire/affiner |

### ❌ Ne PAS appeler
- Pas de skills SEO/blog/ads (hors sujet produit).
- Pas de génération d'images (nano-banana/higgsfield) sauf besoin explicite d'illustration.
- Pas de workflow multi-agent sauf si tu tapes "ultracode" toi-même.

---

## Boucle de travail recommandée (chaque écran)
1. **Read** CLAUDE.md + le cahier du flow + l'écran existant
2. **Figma get_screenshot** de l'écran cible (référence visuelle DS)
3. **Audit & gap-analysis** → tableau `écran → manque → action` (présenter AVANT de coder)
4. **Coder** : assembler les composants DS, câbler les stores
5. **Preview MCP** : `preview_start` → naviguer → `preview_snapshot` + `preview_console_logs` → `preview_click`/`fill` pour tester → `preview_screenshot` (375 + 1280)
6. **`npx tsc --noEmit`** + **`tsc -b`** = 0 erreur
7. **`verify`** skill end-to-end → **`/code-review`** → commit `feat(<flow>): <écran>`

## ⚠️ Sync DS — si tu ajoutes ou étends un composant
Le design system est verrouillé, mais si un écran révèle un **composant manquant** (ou que tu en étends un), la synchro est **obligatoire sur 3 fronts** (règle CLAUDE.md) :
1. **Code** — `src/pages/Components.tsx` (showcase = source de vérité) : entrée avec props, variants, `usedBy`.
2. **Figma** — fichier DS `LccBZ1GKWQVwVzPtsSzk5Y` : ajouter le composant à la bonne page (🔵 03 Atoms ou 🟢 04 Composites), dans une section avec banner + doc card, **bindé aux variables** (pas de hex hardcodé), conventions agency-grade.
3. **Notion** — Design System DB (composant) + Écrans DB (page) à jour.

> Si la session code **n'a pas le MCP Figma**, ne bloque pas : **logge le composant dans `DS-SYNC-TODO.md`** à la racine (nom · fichier · variants · usedBy · page Figma cible) pour une passe de sync Figma+Notion ultérieure. Ne jamais ajouter un composant sans au minimum le tracer.

## Definition of Done (commune)
Le flow s'enchaîne de bout en bout, l'état persiste au reload (localStorage/Zustand), 0 erreur tsc/build, testé en preview mobile 375 + desktop 1280, pas de MOCK importé en page (tout via les stores). **Tout composant DS ajouté/étendu est synchronisé (Components.tsx + Figma + Notion) ou tracé dans `DS-SYNC-TODO.md`.**
