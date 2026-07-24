# Défaut 5 — Chiffres incohérents et sur-ingénierie : options de conception

> **2026-07-24.** Étude de solutions pour le cinquième défaut transversal de la Learning App
> (voir [`REVUE-TRANSVERSALE-CDC`](REVUE-TRANSVERSALE-CDC.md), défaut 5).
> Trois postures stratégiques, chacune évaluée sous six lentilles : **faisabilité pour une équipe
> de deux · dette de maintenance · vitesse de mise sur le marché · charge cognitive (équipe &
> produit) · risque (technique, économique, régulatoire) · fidélité à la North Star SBO**.
> ⚠️ Propositions à trancher en métier. Rien n'est engagé.
> Échantillon lu en propre pour ce document : cahiers **09, 03, 06** ; le reste des faits vient de
> la revue transversale, non re-vérifié ici cahier par cahier.
> Un document par défaut de la série « solutions ».

---

## Rappel du problème, reformulé en question de conception

Le défaut *ressemble* à une liste de bugs de spec — mauvaise API Stripe, mauvaise file d'attente,
quatre estimations d'effort par cahier. Ce n'en est pas une. Trois symptômes, un seul mal.

- **L'incohérence chiffrée.** Le cahier 09, lu en propre, porte **quatre totaux d'effort dans le
  même fichier** — 170-200h en en-tête (l. 5), 355-370h (l. 1988), 405h (l. 2035), 361h (l. 2036).
  Aucun n'est budgétable. Le cahier 06 annonce 90-120h en tête mais son propre découpage par
  composant somme ~136-175h : les parties dépassent le tout.
- **L'économie qui ne boucle pas.** Cahier 03 : le Plan 3 « offre 1 crédit/mois » (l. 91), mais les
  crédits s'achètent par paquets de 50/200/500 (l. 160) et une session se paie des dizaines de
  crédits. Un abonnement rembourse une session en **dizaines de mois**. Et deux rails de paiement
  coexistent — Stripe en direct *et* webhook WooCommerce (l. 110).
- **La sur-ingénierie.** Six canaux de notification et une infra de file (RabbitMQ *ou* Redis *ou*
  cron worker — les trois sont écrits, l. 114 / 209 / 213) pour deux personnes. RBAC custom donné
  à la fois « V4+ » (l. 31, 97) et « P0/MVP » (l. 150, 236) dans le cahier 06. Ailleurs (via la
  revue) : Open Badge auto-signé cryptographiquement, wiki public en 4 langues.

La vraie question n'est donc pas « quel champ corriger », mais une question de **gouvernance de
périmètre sous contrainte** :

> **Comment une équipe de deux traite-t-elle un corpus de 16 cahiers sur-spécifiés et incohérents
> pour livrer un produit *maintenable* qui sert l'apprenance — sans passer six mois à réécrire des
> specs ?**

Un mot d'honnêteté sur les lentilles. Ici l'*apprenance* et les *biais cognitifs* ne sont pas au
centre comme ils l'étaient pour le défaut 1 — le sujet est d'ingénierie et de stratégie. Mais deux
ponts tiennent, et je ne les force pas : **(1)** la charge cognitive de Sweller s'applique aux
**mainteneurs** — chaque sous-système inutile et chaque spec incohérente est de la *charge
extranéenne* volée au travail qui compte ; une équipe de deux qui ne tient pas son propre modèle
mental *ship* une UX qu'elle ne tient pas non plus. **(2)** La dette (Cunningham) finit toujours en
bugs, les bugs en friction, et la friction dégrade l'apprentissage. Un produit non maintenable
*est*, à terme, un produit qui apprend mal.

**Un invariant, commun aux trois postures et non négociable :** *on ne met en base de code que ce
qu'un utilisateur réel réclame ; tout le reste vit en **backlog**, jamais en dette.* C'est YAGNI
érigé en règle. Le vrai coût n'est pas le build (les 405h du cahier 09) — c'est la **maintenance à
vie** de 16 tables, d'un cluster de file et de six workers de canal, par 1,5 développeur.

---

## OPTION A — Réconcilier vers le bas, cahier par cahier *(le code fait foi)*

**L'idée.** On ne réécrit rien à froid. On prend chaque cahier, une passe à la fois, et **partout où
le frontend existant a déjà tranché plus juste que la spec, on ratifie le code** et on rabote le
cahier à ce qui tourne, plus un mince delta. C'est le constat central de la revue transversale
(« le code a souvent tranché plus juste que la spec → réconcilier vers le bas ») transformé en
méthode. La procédure en 5 étapes de `CLAUDE.md` existe déjà pour ça.

```
Cahier 09 (notifications)
├── spec dit : RabbitMQ | Redis | cron   ← 3 options
├── code fait : (ce qui est câblé)        ← on lit, on ratifie
└── → cahier réécrit sur le code + delta « digest par défaut »
```

| Lentille | Évaluation |
|---|---|
| **Faisabilité (équipe de 2)** | 🟢🟢 La plus faisable tout de suite. On part des ~140 pages routées, on ne jette rien, chaque passe est bornée. Pas de big bang, pas de tunnel. |
| **Dette de maintenance** | 🟢 Baisse la dette *réelle* : on cesse de maintenir mentalement l'écart spec↔code. 🟡 Mais 16 documents restent vivants — la cohérence transverse (crédits, paiement) n'est garantie par aucune structure, seulement par la vigilance à chaque passe. |
| **Vitesse de mise sur le marché** | 🟢 Valeur livrée en continu, cahier après cahier. 🟡 Mais 16 passes séquentielles, c'est long au total, sans moment de bascule net. |
| **Charge cognitive (équipe & produit)** | 🟡 Chaque passe est légère (un cahier à la fois = charge bornée, bon Sweller). 🔴 Mais la source de vérité reste éclatée : répondre « combien coûte un crédit ? » exige encore de croiser plusieurs cahiers. La charge transverse ne baisse pas. |
| **Risque (tech/éco/régl.)** | 🟢 Faible risque technique — on code peu, on ratifie l'existant. 🟡 Risque de rémanence : une incohérence transverse (l'unité de crédit) n'appartient à *aucun* cahier seul et peut survivre à toutes les passes. |
| **Fidélité North Star SBO** | 🟡 Ne repriorise pas vers la preuve *par construction* : le code actuel n'est pas plus aligné North Star que les specs. Réconcilier vers lui fige un existant **tiède**. |

**En un mot.** Le plus sûr, le plus continu, adossé à ce qui tourne — mais il traite la *forme*
(spec↔code) sans garantir le *fond* (cohérence transverse, recentrage North Star). Excellent
**véhicule**, direction à donner par ailleurs.

---

## OPTION B — Le cahier canonique consolidé *(un document qui remplace les 16)*

**L'idée.** On investit d'abord : consolider les 16 cahiers (~25 000 lignes) en **un seul document
réconcilié** — une économie de crédits, un rail de paiement, une file, un référentiel — qui
supersède tout le reste. On tranche chaque incohérence une fois, à la source, puis on construit
contre ce canon. C'est le geste de l'architecte : payer la cohérence d'avance.

| Lentille | Évaluation |
|---|---|
| **Faisabilité (équipe de 2)** | 🔴 Le plus lourd en amont. Consolider 25 000 lignes en un doc cohérent = plusieurs semaines de rédaction **avant** de livrer quoi que ce soit. Pour une équipe où le temps est *la* ressource rare (contrainte S4), c'est exactement le « six mois à réécrire des specs » qu'on veut fuir. |
| **Dette de maintenance** | 🟢🟢 La plus basse *à terme*. Une seule source de vérité : plus d'écart entre documents, une unité de crédit, un rail. Structurellement le plus propre. |
| **Vitesse de mise sur le marché** | 🔴 La pire. Rien ne sort tant que le canon n'est pas écrit. Coût d'opportunité maximal face à l'échéance « MVP juillet 2026 » (déjà atteinte). |
| **Charge cognitive (équipe & produit)** | 🟢🟢 *à terme* : un seul document à tenir en tête, charge extranéenne minimale. 🔴 *en transition* : la consolidation elle-même est un pic brutal — tout tenir en tête *en même temps* pour réconcilier 16 périmètres. |
| **Risque (tech/éco/régl.)** | 🟡 Risque technique faible (c'est du doc). 🔴 Risque planning/économique élevé : gros pari amont, valeur différée, et un canon écrit **loin du code** re-diverge du code (le *drift* déjà documenté côté Figma dans ce dépôt). |
| **Fidélité North Star SBO** | 🟢🟢 La meilleure occasion de *re-fonder* autour de la preuve : réécrire à froid permet de mettre la North Star au centre et de couper le hors-scope à la racine. **Si** on l'écrit. |

**En un mot.** Le plus cohérent et le plus fidèle à la vision *sur le papier*, le plus dangereux
pour une équipe de deux : il paie tout d'avance et ne livre rien pendant ce temps. Le bon livrable,
au pire moment.

---

## OPTION C — Le walking skeleton + backlog explicite *(un MVP radical de bout en bout)*

**L'idée.** On ne définit qu'**une tranche fine, de bout en bout**, qui exerce toute l'architecture
et *prouve la North Star* : la boucle de preuve — positionnement → item → preuve → passeport →
match. On la *ship*, elle grossit par accrétion selon la demande réelle. Tout le reste des 16
cahiers — les six canaux, le RBAC custom, les webhooks HMAC, le badge crypto, le wiki multilingue —
devient un **backlog explicite et non priorisé**, dans lequel on ne pioche que quand un utilisateur
ou un client le réclame. C'est le *walking skeleton* de Cockburn couplé au MVP de Ries, et YAGNI
promu en doctrine.

```
Squelette (en maintenance)      Backlog (au chaud, hors base de code)
positionnement → item →         6 canaux · RabbitMQ · RBAC custom ·
preuve → passeport → match      webhooks · Open Badge crypto · wiki 4 langues
        ↑ la North Star                  ↑ tiré par la demande, jamais poussé
```

| Lentille | Évaluation |
|---|---|
| **Faisabilité (équipe de 2)** | 🟢 Faisable : on ne construit qu'une colonne vertébrale. Le reste est backlog, pas dette. Cadre le temps rare sur l'essentiel. 🟡 Exige de savoir *dire non* — un travail politique, pas technique. |
| **Dette de maintenance** | 🟢🟢 La plus basse **dès maintenant** : on ne met en maintenance *que* le squelette. Pas de cluster de file, pas de six workers, pas de crypto maison à faire vivre. |
| **Vitesse de mise sur le marché** | 🟢🟢 La meilleure : une boucle démontrable vite, testable de bout en bout, qui s'étend par accrétion. C'est la définition même du walking skeleton. |
| **Charge cognitive (équipe & produit)** | 🟢🟢 La plus basse : l'équipe tient *une* boucle, pas 16 sous-systèmes. Le produit hérite de cette clarté — une app dont les *makers* tiennent le modèle mental *ship* une UX cohérente. 🟡 Coût : tenir le backlog fermé sous le « mais le cahier dit… ». |
| **Risque (tech/éco/régl.)** | 🟢 Risque technique/éco minimal (petite surface = peu de choses qui cassent). 🟡 Risque **commercial** : couper une feature qu'un prospect ETI attend (SSO, export HRIS) peut coûter un deal — d'où un backlog *tiré par la demande*, pas supprimé. |
| **Fidélité North Star SBO** | 🟢🟢 La plus fidèle *par construction* : le squelette **est** la North Star (la preuve, Learn→Do→Match). Tout ce qui ne la sert pas est, par définition, hors squelette. |

**En un mot.** Le plus rapide, le plus maintenable, le plus aligné — au prix de la **discipline du
non**. Le risque n'est pas technique, il est politique : tenir le backlog fermé quand un cahier
crie le contraire.

---

## Matrice de synthèse

| Critère | A — Réconcilier ↓ | B — Cahier canonique | C — Walking skeleton |
|---|---|---|---|
| Faisabilité immédiate (équipe de 2) | 🟢🟢 | 🔴 | 🟢 |
| Dette de maintenance à terme | 🟢 | 🟢🟢 | 🟢🟢 |
| Vitesse de mise sur le marché | 🟢 | 🔴 | 🟢🟢 |
| Charge cognitive des mainteneurs | 🟡 | 🟢🟢 *(terme)* | 🟢🟢 |
| Cohérence transverse garantie | 🔴 | 🟢🟢 | 🟢 |
| Recentrage North Star par construction | 🟡 | 🟢🟢 | 🟢🟢 |
| Risque « 6 mois à re-spécifier » | 🟢 faible | 🔴 fort | 🟢🟢 nul |
| Continuité (ne jette pas l'existant) | 🟢🟢 | 🟡 | 🟡 |

**Ce que la matrice montre** : aucune posture ne gagne partout, et surtout **elles n'opèrent pas au
même niveau**. A est un *mécanisme* (comment réconcilier), C est une *doctrine de périmètre* (quoi
garder), B est un *livrable* (le document). A et C ne sont donc pas rivales : **C dit quoi couper,
A dit comment le graver dans l'existant.** La seule vraiment exclusive est B — et c'est elle qui
porte le piège temporel que la question de départ nous demande d'éviter.

---

## Recommandation — la doctrine de C, le véhicule de A, jamais le tunnel de B

Je tranche. Pour une équipe de deux face à un MVP déjà daté, la seule posture soutenable est
**radicalement C dans la doctrine, exécutée par le mécanisme de A, en refusant explicitement B**.
On ne réécrit pas 16 cahiers à froid (le tunnel). On coupe au squelette (la doctrine), et on grave
la coupe dans le frontend existant, cahier par cahier (le véhicule).

### La porte d'entrée en développement — le *gate* en cinq critères

Le principe de décision réutilisable, à appliquer à *chaque* cahier avant qu'il ne consomme une
heure de dev. Un cahier ne passe le portail que si :

1. **Une seule techno tranchée** par sujet — une file, un rail de paiement, un provider. Les
   alternatives sont **supprimées du document**, pas barrées, pas « à décider ». (Cahier 09 : une
   ligne + un cron, pas RabbitMQ *ou* Redis *ou* cron.)
2. **Un seul chiffre d'effort**, assumé, avec une date. Pas une fourchette parmi quatre. Si on ne
   sait pas chiffrer, on ne sait pas cadrer → le cahier n'entre pas.
3. **Une seule unité** pour toute grandeur transverse — *le crédit* — cohérente avec les plans.
   Tant que « 1 crédit/mois » et « session à 50 crédits » cohabitent, l'économie est fausse : ça
   se règle en Vague 0, avant tout code.
4. **Zéro fonction hors North Star** sans un **utilisateur réel** qui la réclame. Sinon : backlog,
   pas scope. (SSO, webhooks HRIS, custom RBAC → attendent un client nommé.)
5. **Le code fait foi** en cas de conflit spec↔code, sauf raison métier explicite et écrite.

Les critères 1-2 tuent l'incohérence chiffrée ; 3 tue l'économie cassée ; 4 tue la
sur-ingénierie ; 5 encode le « réconcilier vers le bas ».

### La liste de coupe — sur les cahiers lus en propre

> Honnêteté : les trois lignes ci-dessous sont **vérifiées de première main** (09, 03, 06). Les
> lignes *via la revue* (05, 12, 13, 11bis) sont crédibles mais non re-vérifiées ici — à confirmer
> avant d'agir.

| Cahier | Sur-ingénierie constatée | Coupe proposée (→ backlog) |
|---|---|---|
| **09 Notifications** ✅ lu | 6 canaux · RabbitMQ+Redis+cron · 16 tables · 4 chiffres d'effort | **Email + In-App** seulement · **une table + WordPress cron** · *digest par défaut* · un seul chiffre. WhatsApp/Push/Slack → backlog. |
| **03 Onboarding** ✅ lu | Double rail Stripe **+** WooCommerce · crédits qui ne bouclent pas | **Un seul rail** (celui déjà le plus câblé dans le code — à vérifier) · **une unité de crédit** réconciliée avec les plans (Vague 0). |
| **06 Enterprise** ✅ lu | RBAC custom (V4+ *et* P0) · webhooks CRUD+HMAC P0 · effort en-tête < somme des parts | **Rôles *built-in* seulement** (le cahier lui-même dit « V4+ ») · **pas de webhook CRUD** au MVP · re-chiffrer. Custom RBAC + webhooks HRIS → backlog *tiré par la demande*. |
| **05 Gamification** *via revue* | Open Badge auto-signé crypto, 60-80h de crypto maison | Reconnaissance interne d'abord ; **badge crypto → backlog** jusqu'à ce qu'un client l'exige. |
| **13 Helpcenter** *via revue* | Wiki public multilingue 4 langues | **FR-only**, pas de wiki public exposant de la doc sensible. |

### L'ordre — trois vagues (aligné sur la revue transversale)

- **Vague 0 — décider, pas coder.** Trancher les trois architectures ouvertes (rail de paiement =
  PaymentIntents SCA, *pas* Charges ; file = une table + cron ; modèle atelier) et **réconcilier
  l'unité de crédit**. Ce sont des décisions gratuites qui débloquent tout le reste. Coût : quelques
  réunions, zéro ligne.
- **Vague 1 — le squelette.** Construire/consolider la boucle de preuve de bout en bout (c'est le
  chantier `PasseportEnrichment` du défaut 1). C'est le walking skeleton ; il *est* la North Star.
- **Vague 2+ — réconcilier vers le bas, par la demande.** Passer les cahiers périphériques au *gate*
  ci-dessus, dans l'ordre où un utilisateur ou un deal les appelle — pas dans l'ordre du sommaire.

### Pourquoi c'est le bon arbitrage, lentille par lentille

- **Faisabilité / soutenabilité** : on ne construit qu'un squelette et on ratifie l'existant pour le
  reste — la seule charge qu'une équipe de deux tient dans la durée.
- **Dette de maintenance** : on ne met en maintenance *que* ce qui sert la North Star ; le hors-scope
  ne devient jamais de la dette parce qu'il n'est jamais construit (Cunningham : on refuse le prêt
  au lieu de le rembourser).
- **Vitesse** : une boucle démontrable en Vague 1, sans tunnel de re-spécification.
- **Charge cognitive** : une boucle en tête, pas 16 sous-systèmes — pour l'équipe *et*, en reflet,
  pour l'apprenant.
- **Risque** : petite surface = peu de casse ; le risque résiduel est commercial, géré par un backlog
  *tiré par la demande* plutôt que supprimé.
- **North Star** : le squelette est la preuve. Rien de ce qui ne la sert pas n'entre.

### L'invariant, redit

*On ne met en base de code que ce qu'un utilisateur réel réclame.* Le backlog n'est pas une
poubelle — c'est un **actif au chaud** : la spec de la feature existe, prête à être tirée le jour où
un client la justifie. Ce qui coûte, ce n'est pas d'avoir imaginé six canaux ; c'est de les
*maintenir* avant que quiconque en veuille deux.

---

## Ce qu'il reste à décider (et que je ne peux pas trancher seul)

1. **Qui tient le backlog fermé, et sur quel signal ?** « Demande d'un client nommé » ou « ≥ N
   prospects » ? C'est une décision de gouvernance produit (Chloé), la clé de voûte de la posture C.
2. **L'unité de crédit unique et son barème.** Décision business, adhérente au pricing gelé
   (contrainte S2) — elle attend probablement l'analyse business model. Sans elle, le *gate* critère 3
   reste bloqué.
3. **Le rail de paiement unique.** Stripe PaymentIntents *vs* WooCommerce : lequel est déjà le plus
   câblé dans le frontend ? **Je ne l'ai pas vérifié dans le code** — à faire avant de trancher.
4. **Les features « deal-breaker ETI » à garder dans le squelette malgré la coupe** (SSO ? export ?
   webhooks HRIS ?). Décision commerciale (Pierre-Armand) : ce sont les seules exceptions légitimes
   au critère 4 du *gate*.
5. **L'échéance « MVP juillet 2026 » tient-elle toujours ?** Elle règle l'agressivité de la coupe :
   plus l'échéance est ferme, plus la posture C doit être radicale.

---

## Journal

**2026-07-24** — Création. Cinquième document de la série « solutions par défaut ». Trois postures
(réconcilier vers le bas / cahier canonique / walking skeleton) évaluées sous six lentilles adaptées
au défaut — faisabilité équipe de 2, dette de maintenance, vitesse, charge cognitive, risque,
fidélité North Star. Échantillon lu en propre : cahiers 09 (4 totaux d'effort, 3 files, 6 canaux),
03 (double rail Stripe/WooCommerce, crédits non bouclés), 06 (RBAC custom V4+ *et* P0, webhooks P0,
effort en-tête < somme des parts). Recommandation tranchée : **la doctrine de C (squelette + backlog
tiré par la demande), le véhicule de A (réconcilier vers le bas, le code fait foi), en refusant
explicitement B (le tunnel de re-spécification)**. Principe de décision réutilisable posé : un cahier
n'entre en dev qu'avec 1 techno tranchée, 1 chiffre d'effort, 1 unité de crédit, 0 fonction hors
North Star, le code faisant foi. Ancrages : dette technique (Cunningham), YAGNI, coût de maintenance
> coût de build, North Star metric, walking skeleton (Cockburn) / MVP (Ries), charge cognitive des
mainteneurs (Sweller).
