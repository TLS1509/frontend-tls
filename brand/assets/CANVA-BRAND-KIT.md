# Brand Kit Canva — TLS (fiche de référence)

Valeurs **exactes** issues des design tokens du code (`src/index.css` = source de vérité). À recopier dans Canva → *Brand Kit « Brand Kit - TLS »* (`kAGD5yGggy0`). L'API Canva ne permet pas d'éditer le kit ni de lire sa palette → **complétion manuelle dans l'UI Canva** (5 min).

## 🎨 Couleurs

### Essentielles (à mettre en premier dans le brand kit)

| Rôle | Hex | Token |
|---|---|---|
| **Primary (teal)** | `#4A8FA1` | primary-600 |
| Primary clair | `#55A1B4` | primary-500 |
| **Teal foncé** (covers, texte) | `#2F5F6A` | primary-800 |
| Teal nuit | `#1F3E45` | primary-900 |
| **Secondary (orange)** | `#ED843A` | secondary-500 |
| Orange foncé | `#C06920` | secondary-600 |
| **Accent (jaune TLS)** | `#F8B044` | accent-400 |
| Encre (texte) | `#252B37` | ink-900 |
| Gris texte secondaire | `#6B7280` | muted |
| Blanc | `#FFFFFF` | white |

### Fonds clairs (gradients pastel des slides)

| Rôle | Hex |
|---|---|
| Teal très clair | `#E8F4F7` (primary-50) |
| Crème warm | `#FFF3EB` (secondary-50) |
| Crème jaune | `#FFF9EE` (accent-50) |

### Échelle primary complète (si tu veux tout)

`#E8F4F7` · `#DCEBEF` · `#B9D7DF` · `#96C3CF` · `#73AFBF` · `#55A1B4` · `#4A8FA1` · `#3D7786` · `#2F5F6A` · `#1F3E45` (50 → 900)

### Sémantiques (états)
Succès `#9DBEBA` · Danger `#F28559` (fort `#C0432A`) · Warning `#F8B044` · Info `#55A1B4`. ⚠️ Pas de vert/rouge Tailwind brut — palette muted/coral alignée TLS.

## 🔤 Typographie

| Usage | Police | Graisses |
|---|---|---|
| **Titres / display** | **League Spartan** | Extra Bold (800), Bold (700) |
| **Corps de texte** | **Nunito** | Regular (400), Semi Bold (600), Bold (700) |

Les deux sont natives dans Canva (sinon : *Brand Kit → Ajouter une police*). Tracking titres légèrement serré (-2 à -3%).

## 🟢 Logo

Mark « molécule/bubble » + wordmark « The Learning Society » (en League Spartan). Variantes (uploader dans le kit) :

| Variante | Quand |
|---|---|
| **Color** (multicolor teal/orange/jaune) | fonds blancs/clairs |
| **Light** (tout blanc) | fonds teal foncés / glass (couvertures, clôtures) |
| **Ink** (monochrome foncé) | impression / haute lisibilité |

Règle : **toujours `light` sur fond sombre**. Ne jamais recolorer le mark à la main hors de ces variantes.

## 🌈 Fonds de marque (gradients utilisés dans les decks)

- **Cover (teal immersif)** : linéaire 135° `#2F5F6A → #28525C → #1F3E45` + halos doux orange/teal.
- **Contenu (pastel)** : linéaire 135° `#E8F4F7 → #FBF7F2 → #FFF3EB`.

(Disponibles en PNG dans `_pipeline/assets/` des decks — réutilisables comme fonds Canva.)

---

## 🛠️ Playbook Canva (ce qui se fait dans l'UI, pas via l'API)

### A. Compléter le brand kit (5 min)
1. Canva → *Brand* → *Brand Kit - TLS*.
2. *Couleurs* → ajoute les hex « essentielles » ci-dessus (groupe « Marque »), puis fonds clairs.
3. *Polices* → définis League Spartan (titres) + Nunito (corps).
4. *Logos* → upload les 3 variantes (color / light / ink).

### B. Créer les brand templates depuis les decks (1 clic / deck)
1. Canva → *Importer* → glisse le `.pptx` (ex. `TLS-deck-conseil-stride.pptx`). Canva conserve la mise en page (fonts embarquées).
2. Ouvre le design importé → menu *…* → **« Enregistrer comme modèle de marque »**.
3. Répète pour les decks à industrialiser (conseil-STRIDE, learning-app, formation ×3, suivi-projet).
4. L'équipe part de *Modèles de marque* → édite sans casser la base.

> Une fois les brand templates créés (ids commençant par `BTM…`), je peux les piloter via l'API (créer un design depuis un template, autofill, export). Donne-moi un id et je prends le relais.

### C. Signatures & assets
- Signatures email : `brand-assets/email-signatures/` (HTML, hors Canva).
- Sourcing d'illustrations/photos : `brand-assets/ASSETS-SOURCING-GUIDE.md` (recolore unDraw/Storyset en `#4A8FA1`).
