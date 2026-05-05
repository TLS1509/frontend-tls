# CLAUDE.md — The Learning Society : Règles du projet

## Projet

**The Learning Society** — Plateforme EdTech.
Stack : React 19 · TypeScript 6 · Vite 8 · **Tailwind CSS 4** · React Router 7 · Zustand 5 · Lucide React

---

## Architecture

```
src/
├── components/
│   ├── core/        Button, Card, Input, Select, FormGroup
│   ├── ui/          Badge, Alert, Avatar, Modal, Toast, StatCard… (48 composants)
│   ├── patterns/    DashboardHero, ParcoursCard, CardGrid, HeroSection…
│   ├── learning/    LessonCard, ArticleCard, SessionCard…
│   ├── modals/      BookingModal, SuccessModal, VideoPlayerModal…
│   └── layout/      Sidebar, NavItem
├── pages/           57 pages (route-level)
├── styles/          design-tokens.css (source vérité), tls-components.css (CSS BEM actuel)
└── design-system/   spec.json (spécification officielle)
```

---

## Stratégie de styling — Migration Tailwind (en cours)

### Objectif final
Remplacer 100% des classes CSS BEM (`.btn`, `.card`, etc.) et des inline styles `style={{}}` par des **classes Tailwind mappées** depuis `tailwind.config.js`.

### Règles absolues

**1. Jamais de valeurs arbitraires avec `var()`**
```tsx
// INTERDIT — fragile, JIT ne valide pas
className="bg-[var(--tls-primary-50)]"
className="text-[length:var(--t-caption)]"
className="font-[family-name:var(--font-display)]"

// OBLIGATOIRE — tokens mappés dans tailwind.config.js
className="bg-primary-50"
className="text-caption"
className="font-display"
```

**2. Jamais d'inline styles `style={{}}` pour layout/couleur/spacing**
```tsx
// INTERDIT
style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--tls-primary-600)' }}

// OBLIGATOIRE
className="flex flex-col gap-4 text-primary-600"
```

**3. Styles dynamiques → className conditionnels (jamais style={{}})**
```tsx
// INTERDIT
style={{ background: tone === 'primary' ? '#55A1B4' : '#ED843A' }}

// OBLIGATOIRE
className={tone === 'primary' ? 'bg-primary-500' : 'bg-secondary-500'}
```

**4. `style={{}}` autorisé UNIQUEMENT pour**
- Valeurs calculées au runtime impossible à prédire (`width: ${percent}%`)
- Gradients complexes sans équivalent Tailwind documenté
- Transformations dynamiques (`transform: translateY(${offset}px)`)

**5. Fichiers CSS autorisés UNIQUEMENT pour**
- `@keyframes` et animations complexes
- Pseudo-éléments `::before`, `::after`, `::placeholder`
- Sélecteurs complexes non disponibles en Tailwind

---

## Référence Tailwind → Design Tokens

| CSS Variable | Classe Tailwind |
|---|---|
| `--tls-primary-500` | `bg-primary-500` / `text-primary-500` |
| `--tls-secondary-500` | `bg-secondary-500` / `text-secondary-500` |
| `--tls-accent-500` | `bg-accent-500` / `text-accent-500` |
| `--tls-ink-900` | `bg-ink-900` / `text-ink-900` |
| `--shadow-sm` | `shadow-sm` |
| `--shadow-md` | `shadow-md` |
| `--t-h1` | `text-h1` |
| `--t-body` | `text-body` |
| `--t-caption` | `text-caption` |
| `--t-micro` | `text-micro` |
| `--font-display` | `font-display` |
| `--font-body` | `font-body` |
| `--font-mono` | `font-mono` |
| `--r-lg` | `rounded-lg` |
| `--r-xl` | `rounded-xl` |
| `--r-2xl` | `rounded-2xl` |

Fichier de référence complet : `tailwind.config.js`

---

## Workflow de migration — obligatoire

Pour chaque composant ou page :

```
1. Lire le fichier
2. Identifier tous les inline styles style={{}} et classes CSS BEM
3. Remplacer par les classes Tailwind équivalentes (voir référence ci-dessus)
4. npm run dev → vérifier visuellement dans le navigateur
5. npx tsc --noEmit → 0 erreurs TypeScript
6. DEMANDER VALIDATION à l'utilisateur avec screenshot
7. Une fois validé : committer + mettre à jour MIGRATION-PLAN.md (cocher la case)
8. Ne jamais passer au composant suivant sans validation
```

---

## Règles de commit

- Format : `refactor: migrate [ComponentName] to Tailwind`
- Un commit par composant/page
- Jamais de commit sans validation visuelle

---

## Ce qu'il NE FAUT PAS faire

- Ne PAS supprimer `tls-components.css` avant que tous ses composants soient migrés et validés
- Ne PAS utiliser `bg-[var(...)]` ou `text-[length:var(...)]`
- Ne PAS créer de nouveaux fichiers CSS pour des composants
- Ne PAS utiliser `!important`
- Ne PAS hardcoder des couleurs hex (#55A1B4) — toujours utiliser les tokens
- Ne PAS travailler sur plusieurs composants en même temps
- Ne PAS passer au composant suivant sans avoir reçu la validation de l'utilisateur
