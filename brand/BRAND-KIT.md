# Brand Kit — The Learning Society

> **Fiche unique de marque.** Une page, tout ce qui sert à produire un support TLS
> hors du code : couleurs, typo, logo, ce qui est interdit.
>
> **Dernière vérification de première main : 2026-09-09** (valeurs relues dans
> `src/index.css`, `TlsLogo.tsx`, `public/favicon.svg`, le Brand Kit Canva,
> le Brand Hub Notion et le Drive `TLS — Brand`).

---

## 0. Où est la vérité

Une seule règle, et elle tranche tous les conflits de valeurs :

> **`src/index.css`, bloc `@theme`, fait foi.** Tout le reste — Canva, Notion,
> Figma, Drive, ce document — en est une copie. Une copie qui diverge est
> fausse, pas « une autre version ».

| Surface | Rôle | Statut |
|---|---|---|
| `src/index.css` (`@theme`) | **Source de vérité** des valeurs | 🟢 vivant |
| `brand/BRAND-KIT.md` (ce fichier) | Copie de référence lisible hors code | 🟢 vivant |
| Figma `LccBZ1GKWQVwVzPtsSzk5Y` | Bibliothèque DS | 🟠 à vérifier (§7) |
| Canva Brand Kit `kAGD5yGggy0` | Production de supports | 🟠 incomplet (§7) |
| Notion *Brand Hub* | Vitrine / onboarding équipe | 🔴 périmé (§7) |
| Drive `TLS — Brand` | Dépôt de fichiers livrables | 🟠 partiel (§7) |

---

## 1. Couleurs

### Les trois lumières

La marque tient sur **trois** couleurs saturées. Pas quatre. Tout le reste est
neutre ou tinté clair.

| | Rôle narratif | Base | Texte sur blanc |
|---|---|---|---|
| **Teal côtier** | Progression, concentration, autorité | `#55A1B4` (primary-500) | `#3D7786` (700) |
| **Ambre chaud** | Contact humain, action, encouragement | `#ED843A` (secondary-500) | `#8F5017` (700) |
| **Soleil doré** | Pratique validée, réussite, rareté | `#F8B044` (accent-400) | `#A85F0A` (700) |

> ⚠️ **Piège de contraste.** `primary-600` (#4A8FA1) est à **3,66:1** sur blanc :
> il **échoue** WCAG AA en texte normal. Pour du texte, descendre à `primary-700`
> (5,02:1) ou `primary-800` (7,08:1). Les valeurs 500/600 servent au **remplissage**,
> pas au texte. Idem pour `secondary-600` et `accent-600` : remplissage seulement.

### Échelles complètes

**Teal / primary** — `#E8F4F7` `#DCEBEF` `#B9D7DF` `#96C3CF` `#73AFBF` **`#55A1B4`** `#4A8FA1` `#3D7786` `#2F5F6A` `#1F3E45` (50→900), plus `#164267` (950, navy des héros saturés).

**Ambre / secondary** — `#FFF3EB` `#FDDCC7` `#FCBB93` `#F59A5F` `#F18A4C` **`#ED843A`** `#C06920` `#8F5017` `#5E3710` `#3B2109` (50→900).

**Doré / accent** — `#FFF9EE` `#FFECC8` `#FFD791` `#FFC15A` **`#F8B044`** `#DF9E3D` `#C68D36` `#A85F0A` `#7E4006` `#5F2E05` (50→900).

**Encre / ink** — `#f9fafb` `#f3f4f6` `#e5e7eb` `#d1d5db` `#9ca3af` `#6b7280` `#4b5563` `#374151` `#1f2937` **`#252B37`** `#0f172a` (50→950).
`ink-900` = **`#252B37`**, le gris de texte TLS. ⚠️ Ce n'est **pas** `#1a1a1a` :
cette valeur traîne dans d'anciens SVG de logo et dans de vieux docs, c'est une dérive.

### Couleurs sémantiques

Palette **muted / coral**, jamais les couleurs Tailwind brutes.

| État | Fond | Texte | Base |
|---|---|---|---|
| Succès | `#E8F2F0` | `#335A56` | `#9DBEBA` |
| Danger | `#FEF4F0` | `#8F2A0E` | `#F28559` — bouton : `#C0432A` (repos) / `#9B2F1B` (pressé) |
| Attention | `#FFF9EE` | `#2f1c13` | `#F8B044` |
| Info | `#E8F4F7` | `#1F3E45` | `#55A1B4` |

> ⛔ **Jamais** `#22C55E` (vert Tailwind), **jamais** `#EF4444` (rouge Tailwind),
> **jamais** `#14b8a6` (teal Tailwind). Ces trois valeurs circulent encore dans
> Notion et dans de vieux docs — elles sont hors marque.

### Fonds de marque

- **Couverture immersive** : linéaire 135° `#2F5F6A → #28525C → #1F3E45`.
- **Contenu pastel** : linéaire 135° `#E8F4F7 → #FBF7F2 → #FFF3EB`.

Pour l'application : gradient vertical bleu → jaune → orange sur les teintes 50.
Pour l'email, l'OG et les documents : **fond clair**, teal en accent, CTA orange —
pas de teal foncé dominant, pas de glass tinté (le glass est réservé à l'app).

---

## 2. Typographie

| Usage | Police | Graisses |
|---|---|---|
| Titres, display | **League Spartan** | 800 (Extra Bold), 700 (Bold) |
| Corps | **Nunito** | 400, 600, 700 |

Les deux sont sur Google Fonts et natives dans Canva. Auto-hébergées dans
`public/fonts/` pour l'app, embarquées dans les `.pptx` de `brand/decks/`.

**Tracking gradué** : h1 −0,03em · h2/h3 −0,025em · h4 −0,02em · corps 0.
Ne jamais aplatir le tracking uniformément sur tous les niveaux.

> ⚠️ **League Spartan n'a aucune face italique.** `font-display italic` produit
> un faux italique synthétique. Pour de l'italique éditorial → Nunito.

---

## 3. Logo

Mark « molécule » : trois branches teal, un nœud orange en haut, un nœud doré en bas,
centre teal clair. Wordmark « The Learning Society » en League Spartan.

### Les 6 variantes (`src/components/ui/TlsLogo.tsx`)

| Variante | Surface | Traitement |
|---|---|---|
| `color` *(défaut)* | Blanc / clair | Multicolore de marque |
| `light` | Dark, glass teal, héros saturés | Tout blanc |
| `primary` | Surface teal tintée | Monochrome teal |
| `warm` | Surface ambrée | Monochrome ambre |
| `sun` | Surface dorée | Monochrome doré |
| `ink` | Impression, haut contraste | Monochrome encre |

**Règles.** Toujours `light` sur fond sombre. Ne jamais recolorer le mark à la main :
étendre la map `PALETTES` dans `TlsLogo.tsx`. Zone de protection = 1 × le diamètre
du cercle central. Taille minimale : 24 px en écran, 12 mm en impression.

### Couleurs propres au mark

`#55A1B4` (branches) · `#8DBAC6` (centre) · `#EB7724` (nœud haut) · `#F8B044` (nœud bas).

> ⚠️ `#8DBAC6` et `#EB7724` **ne sont pas des tokens** — ils n'existent que dans le
> logo. C'est acceptable pour une marque figurative, mais il faut le savoir :
> ne pas les réutiliser comme couleurs d'interface, et ne pas les « corriger »
> vers `primary-300` / `secondary-500` sans revue.

---

## 4. Formes et matière

- **Rayons** : `rounded-pill` (999 px) sur les boutons et les cards. Jamais
  `rounded-full` (= 50 %, donc un cercle). Échelle : 6 / 8 / 12 / 16 / 24 px.
- **Ombres** : neutres par défaut ; dès qu'un ton est posé, l'ombre prend le ton
  (`shadow-brand` / `warm` / `sun`). Une ombre ambrée par défaut entrerait en
  collision avec le ton `warm`.
- **Icônes** : **Lucide uniquement**. Aucun SVG inline custom pour une icône
  fonctionnelle. Exception : logos et illustrations one-off.

---

## 5. Ton narratif

Quatre tons, un par nature d'écran, **deux maximum par flux** (un dominant, un accent) :

**primary** focus / leadership · **warm** action / parcours · **sun** réflexion /
réussite · **neutral** réglages / utilitaire.

---

## 6. Le pacte anti-générique

*(extrait de [`identity/tls-design-philosophy.md`](identity/tls-design-philosophy.md) — la doctrine complète)*

La marque se définit autant par ce qu'elle refuse :

- **Pas de violet.** Pas de vert. Aucun cyan qui ne soit le teal côtier.
- **Pas de dégradé arc-en-ciel**, pas de vocabulaire « gradient violet » d'IA générique.
- **Pas d'illustration isométrique**, pas de robot, pas de circuit imprimé,
  pas de cerveau 3D, pas de néon cyber.
- **Pas de barre d'accent `border-left`** en tête de bloc, pas d'eyebrow au-dessus
  de chaque section, pas de soupe de cards. Ce sont des marqueurs de production
  automatique.
- **Pas de glassmorphisme par défaut.** Le glass teinté est validé **dans
  l'application**, pas sur les supports de marque ni sur le site.

Registre visé : classe, premium, minimaliste. Éditorial, pas applicatif.

**Photo & illustration** — humains réels en train d'apprendre, lumière naturelle
chaude, diversité non composée. Jamais la poignée de main corporate, jamais le
stock souriant aseptisé. Détail : [`assets/ASSETS-SOURCING-GUIDE.md`](assets/ASSETS-SOURCING-GUIDE.md).

---

## 7. Ce qui diverge aujourd'hui (au 2026-09-09)

Constaté de première main, à corriger sur les plateformes :

| Où | Ce qui est faux | Ce qui est vrai |
|---|---|---|
| **`public/favicon.svg`** | Favicon violet `#863bff` / `#7e14ff` — gabarit d'outil no-code jamais remplacé | Doit être le mark TLS |
| **Notion — Brand Hub** | « Error `#EF4444` », « Success `#14b8a6` » | Palette muted/coral (§1) |
| **Notion — Brand Hub** | « CTA `#EB7724`, hover `#F49609` » | `#EB7724` est une couleur de **logo**, pas un CTA. CTA = `secondary-500` |
| **Notion — Brand Hub** | Rayons « 6/8/10/16 px » | 6/8/12/16/24 + pill 999 |
| **Notion — Assets & Templates** | « 63 templates à créer », « 18 templates social » | Aucun n'existe. Roadmap de février jamais exécutée |
| **Canva `kAGD5yGggy0`** | Kit non complété (couleurs/polices/logos à charger à la main) | §1–3 de ce fichier |
| **Figma `LccBZ1GKWQVwVzPtsSzk5Y`** | La couverture annonce 7 sections (01 Foundations → 07 Flows) ; l'API ne liste **qu'une** page. Le board Foundations (`1093:2`) répond encore | À ouvrir dans l'UI Figma pour trancher : pages supprimées, ou listing API incomplet |
| **Drive `03_Logos/`** | Fichiers nommés `Frame 30.svg`, `Frame 31.svg`, `Untitled design.png` | Convention `TLS_Logo_<variante>_<fond>.svg` |
| **SVG `logos-modernises/`** | Wordmark en `#1a1a1a` | `ink-900` = `#252B37` |
| **`public/og-image.svg`** | Police `Helvetica Neue, Arial` | League Spartan |

---

## 8. Liens

| Ressource | Lien |
|---|---|
| Tokens (vérité) | [`src/index.css`](../src/index.css) — bloc `@theme` |
| Composant logo | [`src/components/ui/TlsLogo.tsx`](../src/components/ui/TlsLogo.tsx) |
| Doctrine visuelle | [`identity/tls-design-philosophy.md`](identity/tls-design-philosophy.md) |
| Voix de marque | [`../.claude/brand-voice-guidelines.md`](../.claude/brand-voice-guidelines.md) |
| Faits autorisés (interdits marketing) | [`../docs/_canon/FACTS-CANON.md`](../docs/_canon/FACTS-CANON.md) |
| Canva Brand Kit | https://www.canva.com/brand/kAGD5yGggy0 |
| Figma DS | https://www.figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y |
| Drive `TLS — Brand` | https://drive.google.com/drive/folders/18pQPVR2zJLa004pErmtHzuFbOrhJuOZY |
| Notion Brand Hub | https://app.notion.com/p/6500738d039749509296e8bb1010a5cd |
