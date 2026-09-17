---
target: dashboard homepage
total_score: 23
p0_count: 1
p1_count: 2
timestamp: 2026-09-17T12-08-51Z
slug: src-pages-dashboard-tsx
---
# Critique — /dashboard (page d'accueil de l'app)

Synthèse de deux évaluations indépendantes (revue de direction design · détecteur + preuves navigateur, menées en isolation) + les mesures de la session (datum sidebar↔page, anatomie des cartes). Contrastes au canvas sur fonds composés, DOM et clavier vérifiés, desktop + mobile + premier paint.

## Score de santé — 23/40 (« acceptable » : base solide, exécution du chemin critique à reprendre)

| # | Heuristique | Note | Constat clé |
|---|---|---|---|
| 1 | Visibilité de l'état | 3 | « Étape 2 sur 5 » + 40 % + EN COURS pulsant : excellent. −1 : le stagger d'entrée retient le bas de page ~0,7 s, à CHAQUE visite |
| 2 | Monde réel | 3 | Tutoiement, « Reprendre », date FR. Mais « Tu as complété 40 % » (verbe banni) et le même rendez-vous dit « Cette semaine · 14:30 » ici, « MARDI 14H30 » là |
| 3 | Contrôle & liberté | 2 | La carte session « Leadership & IA » : ZÉRO élément interactif (DOM vérifié) — un cul-de-sac au 2e moment à enjeu |
| 4 | Cohérence | 2 | Trois habillages pour « aller vers » (ghost / bouton texte nu / lien 13 px) ; « Tableau de bord » vs « Accueil » ; et le rail a DEUX gouttières internes (logo à 24, nav+carte user à 12) sans datum partagé avec la page (centre logo vs centre eyebrow : −7 px) |
| 5 | Prévention d'erreurs | 2 | ResumeLessonCard garde `cursor-pointer` sur toute sa surface alors qu'elle n'est plus cliquable : clics morts garantis |
| 6 | Reconnaissance | 3 | La bulle réinjecte le contexte avant de questionner ✅ ; « 3 sessions » oblige à deviner |
| 7 | Efficacité | 1 | Aucun raccourci, pas de skip-link (9 tabulations jusqu'à « Reprendre »), entrée rejouée à chaque retour |
| 8 | Minimalisme | 3 | Une action dominante, hiérarchie de carte disciplinée. −1 : « Répondre… » + flèche = deux contrôles, un seul geste |
| 9 | Récupération | 2 | Empty state du feed VOUVOIE sur un écran tutoyé ; pas d'état d'échec page |
| 10 | Aide | 2 | Auto-explicatif, mais « Étape 2/5 » vs « 40 % » = deux mesures côte à côte sans lien dit |

## Verdict anti-patterns : NON, pas « fait par l'IA » — avec trois réserves

Absents (vérifié DOM + détecteur) : barres d'accent 0 · eyebrow-partout 0 · KPI SaaS 0 · violet-cyan 0 · texte dégradé 0 · **ombres/soulèvement de cartes 0 au repos ET au survol** (la règle du 16/09 tient ici). Le détecteur CLI rend **0 trouvaille** sur les 6 fichiers sources.
En creux, trois tics génératifs : le **fade-up en cascade rejoué à chaque visite** ; le **primary-500 posé en texte** (le demi-ton que la doctrine interdit) ; un **début de card-soup** dans le feed (4 gabarits identiques, sauvés par les disques tonals).
Overlay live (18 hits) : les vrais = 1 low-contrast (Reprendre), 4 line-length (86–94 ch, ActivityFeed — attrapé par le détecteur, manqué par la revue), 1 nested-cards (la bulle-dans-carte : construction VOULUE de la famille bulle, à assumer). Faux positifs écartés : 7 « cyan gradient » (teal de marque + FAB dev), transitions de layout (rail animé = décision du 16/09, barre de progression = son rôle).

## Ce qui marche (et pourquoi)

1. **La grammaire interne de la carte de reprise** : état (chip) / faits (pills 9,93:1) / contexte (eyebrow) / titre / UNE action — premier tabbable du main, 44 px, au-dessus du pli en 375×812. La north star « action en <3 s » est tenue structurellement.
2. **Le nudge journal contextuel** : « Quelle question aimerais-tu poser à Sophie mardi ? » transforme la corvée en service — la meilleure réassurance de la page, au bon endroit.
3. **La discipline des surfaces** : rayons 20/padding 24 au canon, zéro ombre, survol filet+teinte, Lucide partout, tons intentionnels. Pas un template.

## Problèmes prioritaires

**[P0] Le chemin critique échoue le contraste — 5 mesures sous seuil, les deux évaluations concordent au centième.** « Reprendre » blanc/secondary-500 = **2,64** (et le survol ÉCLAIRCIT, 400) · meta bulle primary-500 = **2,68** · icône d'envoi blanc/primary-500 = **2,94** (< 3:1 composant) · eyebrow date primary-600 = **3,53** · liens feed primary-600 13 px = **3,66** ×4. → C'est le périmètre exact de la **décision 1 du banc** (l'option D de Chloé le règle en bloc) ; patch conservateur possible en attendant : remplissages 700, meta/liens en 700.
**[P1] La session planifiée est inerte.** `SessionCard` a déjà `onOpen` et son CTA — `Dashboard.tsx` ne les passe pas. Brancher `onOpen`, renommer « 3 sessions » → « Toutes mes sessions ».
**[P1] Cinq cibles à 20 px** (« 3 sessions », Lire ×2, Explorer, Continuer) < 24 px SC 2.5.8 → étendre la zone (`py-1 -my-1`), rendu identique.
**[P2] La grammaire de la pratique fuit** : « complété », « débloquer », registre jeu vidéo sur la carte badge ; empty state en « vous ». Réécriture : « Tu as pratiqué 40 % — reprends pour valider le badge ».
**[P2] « Activité & veille » mélange 4 natures** (feedback humain, promo, veille, badge) : le feedback de Sophie pèse comme une pub. Scinder « Pour toi » / « À explorer », ou traiter le feedback à part.
**[P2] Le datum de tête d'écran n'existe pas** : gouttière rail 24 vs 12, logo↔eyebrow −7 px — une règle à poser dans Sidebar/PageShell, 177 pages servies.

## Personas — drapeaux nommés

**Alex (pressé)** : 0 raccourci, 9 tabs avant le CTA, entrée rejouée à chaque retour, « Répondre… »+flèche = 2 tabs pour 1 geste, SA session = 3 clics pour revenir à une info déjà affichée.
**Sam (clavier/lecteur d'écran)** : parcours clavier ✅, focus ✅, progressbar exemplaire — MAIS bloc session non labellisé, titres plats (items du feed en h3 = sœurs des titres de section), et **la suggestion IA de la bulle n'est pas étiquetée** (Sparkles aria-hidden, zéro texte « IA ») : la règle produit d'étiquetage n'existe pas pour un lecteur d'écran.
**Apprenante entreprise (anti-infantilisation)** : « Badge à portée » + « débloquer » + « continue sur ta lancée » = triple signal Duolingo sur une même carte ; « Cette semaine · 14:30 » sans le JOUR sur l'objet session (il faut ouvrir le coaching pour caler 40 min) ; la main qui salue, dispensable. À son crédit : « 3h restantes », « 45 min · Visio », la question précise.

## Mineures

Vestiges sur ResumeLessonCard (`cursor-pointer`, transition transform/shadow sans objet ; survol = filet SANS la teinte de fond — CARD_HOVER à moitié consommé) · SessionCard : DEUX `hover:border-*` concurrents (piège n°6 — l'ordre d'émission tranche, pas une décision) · `background-color` absent de la transition de survol (la teinte saute, le filet glisse) · timestamp du feed instable au wrap · EmptyDashboardState à `rounded-lg` (14) là où sa jumelle est à 20, eyebrow hors tokens · hamburger mobile sans fond de barre · FAB dev sur le coin de la SessionCard en mobile · items du feed h3→h4 · lignes du feed à 86–94 ch (> 75).

## Questions provocantes

1. Pourquoi « Tableau de bord » ? Tout ce que la page fait dit « Aujourd'hui » — seul son nom dit reporting (la BottomNav a déjà choisi « Accueil »).
2. La bulle promet une conversation qu'elle ne tient pas (costume de chat, navigation vers un formulaire) — assumer le chat inline, ou tomber le costume ; et l'étiqueter « IA » dans les deux cas.
3. Le chiffre le plus saillant du bas de page est un stock (« 3 sessions ») ; pour une cadence hebdo, le flux (« mardi 14h30 ») vaut plus. Pourquoi le compteur a-t-il gagné ?
