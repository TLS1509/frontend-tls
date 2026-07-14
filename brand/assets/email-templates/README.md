# Email templates TLS

Consolidation (2026-07-10) de tous les templates HTML emailing dispersés entre le repo (`public/`, `brand/identity/`, `brand/assets/email-signatures/`) et `~/Downloads/tls-email-templates/`. Tout vit maintenant ici, en un seul endroit.

Tous les fichiers sont du HTML **email-safe** (tables + styles inline, pas de flex/grid) sauf mention contraire — donc utilisables tels quels dans Gmail/Outlook/etc., sous réserve du statut on-brand ci-dessous.

## Structure

```
email-templates/
├── newsletters/        — envois récurrents (mensuel, veille, recap perso, ressources, actus)
├── lifecycle/           — emails déclenchés par une action utilisateur (marketing/engagement)
├── compte/               — sécurité & accès (vérification, mot de passe)
├── transactionnel/       — événements produit (paiement, notifications)
├── enterprise/           — reporting B2B/admin (cahier 06_Enterprise_FO_Space)
├── generique/            — template vierge à remplir au cas par cas
└── signatures/           — signatures de mail + explorations
```

## Inventaire & statut on-brand

✅ **2026-07-10 — palette unifiée.** Les 5 fichiers qui utilisaient la palette "Editorial Muted" (héritée de Downloads) ont été convertis vers les vrais tokens TLS (`src/index.css`). Tout le dossier partage maintenant la même palette de source de vérité.

| Fichier | Usage | Statut palette |
|---|---|---|
| [newsletters/newsletter-mensuelle.html](newsletters/newsletter-mensuelle.html) | Récap mensuel apprenant (KPIs, parcours en cours, coaching, conseils) — exemple rempli "Mai 2026" | ✅ tokens réels (⚠️ candidat au remplacement, voir §Propositions) |
| ~~newsletters/gazette-veille.html~~ | ~~Veille EdTech & L&D~~ | ❌ supprimé par l'utilisateur 2026-07-10 (design pas retenu) — plus de fichier gazette en prod actuellement |
| [lifecycle/bienvenue-onboarding.html](lifecycle/bienvenue-onboarding.html) | Email de bienvenue à l'inscription | ✅ tokens réels (converti 2026-07-10) |
| [lifecycle/invitation-evenement.html](lifecycle/invitation-evenement.html) | Invitation masterclass / webinaire / atelier | ✅ tokens réels (converti 2026-07-10) |
| [lifecycle/relance-apprenant.html](lifecycle/relance-apprenant.html) | Réengagement apprenant inactif | ✅ tokens réels (converti 2026-07-10) |
| [compte/verification-email.html](compte/verification-email.html) | Confirmation d'adresse email à l'inscription (`src/pages/VerifyEmail.tsx`) — CTA + code de secours | ✅ tokens réels (nouveau 2026-07-10) |
| [compte/reinitialisation-mot-de-passe.html](compte/reinitialisation-mot-de-passe.html) | Reset mot de passe — contexte appareil/lieu + expiry + rassurance sécurité | ✅ tokens réels (nouveau 2026-07-10) |
| [transactionnel/confirmation-paiement.html](transactionnel/confirmation-paiement.html) | Reçu de paiement — abonnement/achat crédits (cahier `11bis_Subscription_Management_System`) | ✅ tokens réels (nouveau 2026-07-10) |
| [transactionnel/notification-generique.html](transactionnel/notification-generique.html) | Notification produit adaptable (correction, message coach, badge — cahier `09_Notifications_Management`) | ✅ tokens réels (nouveau 2026-07-10) |
| [newsletters/weekly-recap-apprenant.html](newsletters/weekly-recap-apprenant.html) | Récap hebdo perso apprenant : 3 stats, recommandation IA, notice de série — d'après Figma Template D | ✅ tokens réels (nouveau 2026-07-10, source Figma) |
| [newsletters/ressources-personnalisees.html](newsletters/ressources-personnalisees.html) | Digest de 5 ressources personnalisées, badges Trending/New, compteur favoris — d'après Figma Template F | ✅ tokens réels (nouveau 2026-07-10, source Figma) |
| [newsletters/actualites-hebdo.html](newsletters/actualites-hebdo.html) | Actus hebdo format magazine : à la une + industry insights + nouveautés TLS — d'après Figma Template G | ✅ tokens réels (nouveau 2026-07-10, source Figma) — candidat pour remplacer le gazette manquant |
| [enterprise/rapport-hebdomadaire.html](enterprise/rapport-hebdomadaire.html) | Rapport hebdo manager/admin Enterprise : stats + variation %, insight clé — d'après Figma Template E | ✅ tokens réels (nouveau 2026-07-10, source Figma) |
| [generique/template-vierge.html](generique/template-vierge.html) | Template blanc à remplir (placeholders `[Titre]`, `[Paragraphe 1]`…), structure simple texte + CTA | ✅ tokens réels (nuance : gris Tailwind par défaut `#111827`/`#374151` au lieu de la vraie échelle `ink-*` — reste à corriger, non prioritaire) |
| [signatures/](signatures/) | Signatures email — voir [signatures/README.md](signatures/README.md) | ✅ **refaites 2026-07-10** en texte pur minimaliste (avatar/bordure d'accent rejetés, cf. §Retours design) |

### Mapping de conversion appliqué (2026-07-10)

Substitution mécanique, chaque ancienne teinte "Editorial Muted" tracée vers son token TLS le plus proche par rôle (fond / texte / bordure / accent) :

| Ancienne teinte | Rôle | Token TLS | Hex |
|---|---|---|---|
| `#F6F4F0` | fond wrapper | `bg` (aligné sur newsletter-mensuelle) | `#FAFBFC` |
| `#FAFAF8` | surface carte | surface blanche | `#FFFFFF` |
| `#F0EDE8` / `#EDEBE7` | panneau teinté / divider subtil | `ink-100` | `#F3F4F6` |
| `#E5E2DC` / `#DDD9D2` | divider / bordure | `ink-200` | `#E5E7EB` |
| `#D5D2CC` / `#C5C2BB` / `#C8C6C0` | soulignement discret | `ink-300` | `#D1D5DB` |
| `#1A1916` | texte principal | `ink-900` | `#252B37` |
| `#3A3935` | texte valeur | `ink-700` | `#374151` |
| `#4A4844` / `#5A5855` / `#5C5A55` | texte body / citation | `ink-600` | `#4B5563` |
| `#7A786F` / `#9A9890` | texte muted | `ink-500` | `#6B7280` |
| `#B8B5AE` | texte faint / eyebrow | `ink-400` | `#9CA3AF` |
| `#3D8A9B` | accent teal (liens, logo) | `primary-600` | `#4A8FA1` |
| `#C9703A` | accent warm (labels) | `secondary-600` | `#C06920` |
| `#C49B2E` | accent gold | `accent-600` | `#C68D36` |
| `#E8C9B4` | bordure badge warm | `secondary-200` | `#FCBB93` |

**Exceptions traitées au cas par cas** (rôle différent du texte générique, donc pas la conversion mécanique `ink-900`) :
- **CTA `.cta-btn`** (4 fichiers) : bouton sombre `#1A1916` → **`secondary-500 #ED843A`** (orange, cohérent avec le vrai CTA de `newsletter-mensuelle.html` et `btn-orange` — le bouton "action" TLS est chaud, pas noir)
- **`.welcome-band`** (bienvenue-onboarding) : bandeau héro sombre `#1A1916` → **`primary-900 #1F3E45`** (teal foncé de marque plutôt que gris neutre) ; texte `em` (prénom) → **`accent-400 #F8B044`** (pop doré sur fond sombre) ; eyebrow/body → blanc en alpha (`rgba(255,255,255,.55/.75)`, pattern déjà utilisé sur le footer de `newsletter-mensuelle.html`)
- **`.speaker-avatar-circle`** (invitation-evenement) : placeholder gris → teinté **`primary-50 #E8F4F7` / `primary-700 #3D7786`**
- **`.progress-bar-fill`** (relance-apprenant) : barre noire → **`primary-500 #55A1B4`**
- **`.sig-b .avatar`** (lab-tons-alternatifs) : cercle noir → **`primary-800 #2F5F6A`** (aligné sur l'avatar de `signature-complete.html`)

Ces choix sont des décisions de design prises pendant la conversion (pas de simple find-replace hex) — à valider ou ajuster au prochain passage.

## Gaps comblés (2026-07-10)

4 nouveaux templates, conçus sur les tokens TLS et sur des patterns actuels de webdesign transactionnel (Stripe/Linear/Notion-like) plutôt que redécoration de ce qui existait déjà :

| Gap | Fichier | Choix de design |
|---|---|---|
| Vérification de compte | `compte/verification-email.html` | **CTA + code de secours** (`font-mono`, 6 chiffres) — pattern standard quand un lien peut être bloqué par un scanner antispam ou un client mail cassé. Un seul CTA, pas de contenu marketing mélangé. |
| Reset mot de passe | `compte/reinitialisation-mot-de-passe.html` | Volontairement le **plus sobre des 4** — pas d'icône, pas de couleur vive : un email de sécurité trop "designé" lit comme suspect/phishing. **Bloc contexte** (appareil/lieu/date de la demande) pour que l'utilisateur repère une tentative frauduleuse — standard chez GitHub/Google/Stripe. Rassurance explicite : "si ce n'est pas vous, ignorez, rien ne change". |
| Reçu de paiement | `transactionnel/confirmation-paiement.html` | Structure **facture classique** : montant en gros, ligne d'articles, total, méthode de paiement masquée (`•••• 4242`), 3 métadonnées en ligne (référence, méthode, prochain prélèvement — repris du pattern `.event-meta` d'`invitation-evenement.html`). CTA calme (teal), pas orange — ce n'est pas une relance, c'est une confirmation. |
| Notification produit | `transactionnel/notification-generique.html` | **Un seul fichier adaptable** (commentaire en tête expliquant quoi changer selon le type — correction / message / badge) plutôt que 3 fichiers quasi-identiques. Lien **"Gérer mes notifications"** visible dans le header ET le footer — la granularité de préférence par type de notif est un standard actuel (Linear, Notion), pas juste un unsubscribe global. Bloc citation reprend le pattern "highlight" déjà utilisé dans `generique/template-vierge.html`. |

**Choix transverses appliqués aux 4 nouveaux fichiers :**
- **CTA en `rounded-pill`** (`border-radius:999px`), pas le bouton rectangulaire hérité du kit Editorial Muted — aligne sur la vraie règle DS (« toujours `rounded-pill`, jamais `rounded-full`/sharp ») et sur `newsletter-mensuelle.html`, qui utilisait déjà ce pattern.
- **CTA teal (`primary-600/700`) pour compte/sécurité, orange (`secondary-500`) pour l'engagement produit** — dissocie "action fonctionnelle neutre" de "relance qui donne envie de revenir", plutôt qu'une seule couleur de bouton partout.
- Reste non couvert : **"info client" neutre** générique — `lifecycle/bienvenue-onboarding.html` reste le plus proche, pas de nouveau fichier créé (pas assez de cas d'usage concret identifié pour le justifier).

✅ **CTA `lifecycle/` harmonisés (2026-07-10)** : `bienvenue-onboarding.html`, `invitation-evenement.html`, `relance-apprenant.html`, `gazette-veille.html` sont passés du bouton rectangulaire majuscule (League Spartan, tracked) au `rounded-pill` Nunito — cohérence totale avec `compte/` et `transactionnel/`.

## Propositions newsletter & actus (2026-07-10)

3 directions de design distinctes ont été proposées, chacune déclinée newsletter + actus, dans [newsletters/propositions/](newsletters/propositions/). **Triage fait par suppression manuelle** — seuls 2 fichiers ont survécu :

| Direction | Newsletter | Actus | Verdict |
|---|---|---|---|
| **1 — Signal** (éditorial minimal, typo-first) | ✅ gardé — `1-signal-newsletter.html` | ❌ supprimé | Retenu pour la newsletter |
| **2 — Studio** (product-native, DS de l'app) | ❌ supprimé | ❌ supprimé | Rejeté entièrement |
| **3 — Digest** (grille bento colorée) | ❌ supprimé | ✅ gardé — `3-digest-actus.html` | Retenu pour les actus |

Lecture provisoire (pas confirmée explicitement) : **Signal pour la newsletter mensuelle, Digest pour les actus/veille** — deux directions différentes selon le contenu plutôt qu'une direction unique. Le fichier de prod `gazette-veille.html` a aussi été supprimé (aucun remplaçant en prod pour les actus à ce stade). Voir [newsletters/propositions/README.md](newsletters/propositions/README.md) pour le détail des 3 directions.

## Retours design (2026-07-10) — à ne pas reproduire

Trois itérations sur les signatures le même jour, avec un enseignement commun :

- **Newsletter/actus** : 4 des 6 propositions supprimées + le fichier de prod gazette — sans retour verbal, juste la suppression (triage par élimination).
- **Signatures, 1ère version** : avatar cercle initiales + bordure d'accent colorée → supprimée. Retour explicite : *« le trait d'accent border c'est trop IA arrete d'en mettre partout, couleur TLS mais par petite touche, on vise classe, premium et minimaliste »*.
- **Signatures, 2ème version** : texte pur, zéro élément graphique (en réponse directe au retour ci-dessus) → supprimée aussi. Retour : *« mets juste logo TLS »*.
- **Signatures, 3ème version (actuelle)** : logo TLS réel, trouvé dans **Figma** (page "📧 Templates — Signatures Email", déjà designée dans une session antérieure) — traduction fidèle plutôt que nouvelle invention. Voir `signatures/README.md`.

**Règle qui en découle, applicable à tout nouveau template de ce dossier** : pas de `border-left` d'accent coloré, pas de faux avatar décoratif (cercle d'initiales générique). Le **vrai logo TLS** reste acceptable et même souhaité — la distinction est entre "élément de marque authentique" et "décoration générique de template". Un seul point de couleur TLS sur le texte (ex. le nom de l'entreprise en `primary-600`), tout le reste en encre neutre. **Avant de redessiner à l'aveugle, vérifier si un layout existe déjà dans Figma** (`/figma-use`, fichier `LccBZ1GKWQVwVzPtsSzk5Y`) — c'était le cas ici et ça a évité un 4ᵉ essai à tâtons.

## Templates Mailing — source Figma (2026-07-10)

Découverte d'une page Figma dédiée **"📧 Templates — Mailing"** (node `4136:26`, même fichier `LccBZ1GKWQVwVzPtsSzk5Y`) — 7 templates déjà designés (A→G), jamais traduits en HTML avant cette session.

| # | Nom Figma | Statut |
|---|---|---|
| A | Newsletter Générale | Même design que `newsletter-mensuelle.html` existant — pas retraduit (redondant) |
| B | Transactionnel · Badge · Notification | Proche de `transactionnel/notification-generique.html` existant — pas retraduit |
| C | Veille & Digest Hebdo | Même design que l'ancien `gazette-veille.html` (supprimé) — pas retraduit |
| D | Weekly Learning Recap (Learner) | ✅ Traduit → `newsletters/weekly-recap-apprenant.html` |
| E | Executive Report (Enterprise) | ✅ Traduit → `enterprise/rapport-hebdomadaire.html` |
| F | Curated Resources Weekly+ (Extended) | ✅ Traduit → `newsletters/ressources-personnalisees.html` |
| G | News & Actualités Hebdo | ✅ Traduit → `newsletters/actualites-hebdo.html` |

**2 bugs trouvés dans le fichier Figma source** (confirmés en code sur A/D/E/F/G, corrigés dans les 4 traductions) :
1. **Texte de CTA/badge en gris `#808080`** sur fond orange ou noir (`bg-[#ed843a]`, `bg-[#11121a]`) — contraste illisible, quasi certainement un oubli plutôt qu'un choix. Corrigé en blanc dans les 4 fichiers.
2. **Police `Inter`** utilisée partout au lieu de League Spartan (titres) / Nunito (corps) — ne correspond pas au système typo TLS réel utilisé ailleurs dans l'app et les autres templates email. Corrigé.

**Non modifié** (fidèle à Figma, pas identifié comme bug) : rayons de bouton `6-12px` (pas de `rounded-pill`), fond gradient sur D/F, fond blanc uni sur E/G, couleur de CTA différente par template (teal sur D, orange sur E/G, outline sur F) — pas de règle unique imposée a posteriori.

**G (actualités-hebdo.html)** est le candidat le plus solide pour combler l'absence de fichier gazette en prod (voir §Propositions ci-dessus) — plus riche que les propositions Signal/Digest (à la une + insights + nouveautés produit en un seul envoi), mais parti d'une source Figma différente donc pas directement comparable aux 2 propositions Signal/Digest déjà en lice.

## Prochaine étape (rework)

1. ~~Trancher la direction palette~~ ✅ fait 2026-07-10 — tokens réels partout
2. ~~Réconcilier les signatures de production avec les explorations~~ ✅ fait 2026-07-10 (nom Chloé Mimault-Talagrand), **refait 2 fois de plus** — voir §Retours design pour l'historique complet des 3 versions
3. ~~Combler les gaps identifiés~~ ✅ fait 2026-07-10 — voir tableau ci-dessus
4. ~~Harmoniser les CTA `lifecycle/` vers `rounded-pill`~~ ✅ fait 2026-07-10
5. ~~Construire les templates Figma D/E/F/G~~ ✅ fait 2026-07-10 — voir §Templates Mailing
6. **Trancher le remplaçant du gazette manquant** — désormais 3 candidats en lice pour ce rôle : proposition `1-signal-actus` (supprimée, écartée), proposition `3-digest-actus` (survivante), et `newsletters/actualites-hebdo.html` (Figma G, plus riche/complet). Pas de comparaison faite entre Digest et G — à faire avant de choisir.
7. Confirmer le choix Signal (newsletter mensuelle) et compléter `1-signal-newsletter.html` avec les sections manquantes (conseils, footer riche) avant de remplacer `newsletter-mensuelle.html`
8. Remplacer les hypothèses non confirmées (email/rôle Pierre-Armand, placeholders `[N° transaction]` etc.) par les vraies données une fois connues
