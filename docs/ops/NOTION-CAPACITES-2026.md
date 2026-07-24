# Ce que Notion sait faire depuis six mois — et ce que ça change pour TLS

> **2026-07-23.** Étude des fonctionnalités Notion sorties entre février et juillet 2026,
> rapportées aux problèmes constatés dans [`NOTION-WORKSPACE-AUDIT.md`](NOTION-WORKSPACE-AUDIT.md).
> Objectif : mieux utiliser Notion à deux, avant d'envisager de développer quoi que ce soit.

---

## Ce qui est sorti

Quatre versions en six mois. Trois d'entre elles vous concernent directement.

| Version | Date | Ce qui compte pour vous |
|---|---|---|
| **3.3 — Custom Agents** | 24 fév. | Agents avec déclencheur ou planning, tournant seuls. **Payants en crédits Notion depuis le 4 mai.** |
| **3.4** | 26 mars | Dashboards de bases de données |
| **3.5 — Developer Platform** | 13 mai | **Workers** (runtime hébergé pour votre code), **CLI**, **Agent SDK**, **Database Sync**, **Custom Agent Tools**, **Webhook Triggers** |
| **3.6 — HTML & External Agents** | 1er juil. | **Blocs HTML interactifs**, **Claude et Cursor comme agents externes**, agents lisant/écrivant PPTX-XLSX-DOCX-PDF |

Deux points d'attention sur le coût : les Custom Agents consomment des crédits Notion depuis le
4 mai, et **les Workers basculeront sur les crédits le 11 août** — dans trois semaines.
L'automatisation n'est plus gratuite.

---

## 1. Dashboards et graphiques — disponibles, et vous ne les utilisez pas

Les vues de type **`chart`** et **`dashboard`** sont créables, y compris par API. Le connecteur
expose un langage de configuration complet :

```
CHART column | bar | line | donut | number
  AGGREGATE ... · STACK BY ... · COLOR ... · SORT ... · CAPTION ...
```

Types de vues désormais disponibles : `table`, `board`, `list`, `calendar`, `timeline`,
`gallery`, `form`, **`chart`**, `map`, **`dashboard`**.

**Ce que ça débloque immédiatement, sans rien construire :**

| Besoin constaté | Vue à créer |
|---|---|
| Les ~40 000 € de pipeline dont **toutes les relances sont dépassées** | Table filtrée « relance < aujourd'hui OU vide », triée par montant |
| Pipeline pondéré par étape | `chart column` sur Deals, `AGGREGATE` du montant pondéré, `GROUP BY Status` |
| Chiffre d'affaires réalisé vs en attente | `chart` sur *Suivi des commandes*, `STACK BY Statut` |
| Les 19 parcours en « Planning » aux dates dépassées | Table filtrée « début < aujourd'hui ET statut = Planning » |
| Vue commune Chloé ↔ Pierre-Armand | `dashboard` réunissant les quatre précédentes |

> ⚠️ Une source indique que les Dashboards se déploient d'abord sur les plans **Business et
> Enterprise**. Le connecteur répond que « tous les outils sont disponibles sur le plan de ce
> workspace » — à vérifier d'un clic dans l'interface avant de compter dessus.

---

## 2. Blocs HTML — prometteur, mais mal documenté

Depuis le 1er juillet, un agent peut générer un **bloc HTML interactif** qui vit dans la page :
calculateur, quiz, organigramme, simulateur. Rendu en direct, modifiable par l'équipe, sans
sortir de Notion.

**Ce que personne ne sait encore.** Notion n'a publié aucune spécification technique. Les
sources se contredisent : un article affirme « pas de bases, pas d'API, pas de stockage
persistant », un autre relève que **rien de tout cela n'est confirmé** — pas plus que le
comportement en page publique, la possibilité de coller du HTML écrit à la main, ou l'accès
depuis l'API et les agents externes.

**Conséquence pratique :** utile pour un **auto-diagnostic SBO** — précisément le lead magnet
que votre stratégie réclame — mais à tester avant d'en dépendre. Un outil qui ne peut ni lire
une base ni stocker une réponse ne capte pas d'email, donc ne remplit pas la fonction de lead
magnet. **À vérifier par un essai, pas par lecture.**

---

## 3. Developer Platform — la réponse à « développer nos propres outils »

C'est la sortie la plus importante pour votre question, et elle est passée inaperçue.

| Brique | Ce qu'elle permet |
|---|---|
| **Workers** | Déployer votre code dans un bac à sable hébergé par Notion, sans serveur à gérer |
| **Database Sync** | Brancher n'importe quelle API sur une base Notion — Pennylane, Stripe, votre app |
| **Custom Agent Tools** | Donner à un agent des actions déterministes en code, *« plus fiables que le raisonnement d'un LLM, à une fraction du coût en jetons »* |
| **Webhook Triggers** | Déclencher un flux Notion depuis l'extérieur |
| **Notion CLI** | Authentification, lecture/écriture, déploiement de Workers en ligne de commande |
| **Agent SDK** | Embarquer un agent Notion dans une application tierce |

**La réponse à ta question est donc : oui, et sans quitter Notion.** Le développement d'outils
propres ne suppose plus de construire à côté — Workers et Database Sync permettent de le faire
dedans. C'est exactement la position que tu voulais tenir.

Deux usages concrets pour TLS :

- **Database Sync ↔ Pennylane** — la trésorerie et les factures remonteraient automatiquement,
  au lieu d'être ressaisies. C'est le socle d'une routine d'échéances fiable.
- **Custom Agent Tool « relance »** — une action déterministe qui lit les deals à relancer et
  prépare les messages, au lieu de demander à un agent de raisonner dessus à chaque fois.

⚠️ **Workers passe sur les crédits Notion le 11 août.** Si vous voulez évaluer, faites-le
pendant la bêta gratuite — il reste trois semaines.

---

## 4. Claude comme agent externe dans Notion

Depuis le 1er juillet, **Claude et Cursor sont les deux premiers agents externes** intégrés à
Notion. Concrètement : leur assigner des tâches depuis un tableau partagé, les mentionner avec
un `@` comme un coéquipier, et suivre leur exécution.

C'est directement pertinent : vous travaillez déjà avec Claude, et le chaînon manquant de votre
workspace est justement **le partage entre vous deux**. Un agent mentionné dans une page est
visible des deux, contrairement à une conversation privée.

---

## 5. Proposition de restructuration — Ops · Stratégie · Sales · Finance

Le principe reste celui du Master Vault : **une base maîtresse unique, consommée par des vues
liées.** Rien à dupliquer. Ce qui change, c'est que chaque domaine reçoit enfin un tableau de
bord au lieu d'une pile de vues.

### Sales — le plus urgent

Un `dashboard` avec quatre blocs :

1. **Relances dues** — deals ouverts dont la relance est passée ou absente, triés par montant.
   *C'est le bloc qui récupère les 40 000 €.*
2. **Pipeline pondéré** — `chart column`, montant pondéré groupé par étape.
3. **Stagnation** — deals dont « Jours dans le stage » dépasse 30.
4. **Sources** — `chart donut` sur les sources d'acquisition, pour savoir ce qui produit vraiment.

### Finance

1. **Encours** — *Suivi des commandes* filtré sur « En attente » et « Facturé ».
2. **CA par trimestre** — `chart column` groupé par trimestre de paiement.
3. **Échéances à 30 jours** — depuis la base Échéances à créer.
4. À terme : **Database Sync vers Pennylane** pour cesser la double saisie.

### Ops

1. **Projets à risque** — actifs, sans prochaine action ou dont la date est dépassée.
2. **Réunions sans suite** — comptes rendus dont la relation Tasks est vide. *Le défaut le plus
   coûteux du workspace.*
3. **Arriéré** — les 147 tâches ouvertes, groupées par domaine.

### Stratégie

1. **Décisions récentes** — Decision Log, aujourd'hui relié partout et jamais rempli.
2. **Objectifs** — la skill *Reporting mensuel OKR* existe déjà, elle attend son tableau.
3. **Échéances produit** — l'échéance « MVP Juillet 2026 » des cahiers, qui est atteinte.

---

## 6. L'ordre que je recommande

| # | Action | Pourquoi d'abord | Coût |
|---|---|---|---|
| 1 | **Vue « relances dues »** sur Deals | ~40 000 € en jeu, les propriétés existent, cinq minutes | nul |
| 2 | **Dashboard Sales** autour de cette vue | Rend la relance visible au lieu de l'exiger | nul |
| 3 | **Activer `Note de réunion TLS`** | Répare le lien réunion → tâche | crédits |
| 4 | **Base Échéances + vue à 30 jours** | L'URSSAF en cours en montre le coût | nul |
| 5 | **Tester un bloc HTML** sur l'auto-diagnostic | Décide si le lead magnet est faisable dans Notion | nul |
| 6 | **Évaluer Workers ↔ Pennylane** | **Avant le 11 août**, pendant la bêta gratuite | nul jusqu'au 11/08 |
| 7 | Dashboards Finance, Ops, Stratégie | Une fois le réflexe Sales pris | nul |

Les quatre premières actions ne coûtent rien et ne demandent aucun développement. **Trois d'entre
elles ne sont que des vues sur des données qui existent déjà.**

---

## 7. Ce que l'API sait faire — et ce qu'elle rate (testé le 23/07)

J'ai créé une vraie vue sur la base Deals pour éprouver le DSL. Deux limites, **toutes deux en
échec silencieux** — c'est le point important : l'API renvoie « succès » et ne filtre rien.

| Ce que j'ai testé | Résultat |
|---|---|
| `SORT BY "Montant possible" DESC` | ✅ |
| `SHOW "col1", "col2", …` | ✅ |
| `FILTER "Montant possible" > 0` | ✅ → `number_greater_than` |
| `FILTER "Date prochaine relance" < "today"` | ⚠️ **accepté mais inopérant** — émet `{"type":"exact","value":"today"}`, soit une comparaison à la chaîne « today ». La vue renvoie 0 ligne. |
| `FILTER "Status" = "Diagnostic"` | ❌ **avalé sans erreur** — groupe de filtre vide. Le type `status` n'est pas géré. |
| `FILTER "Status" != "Closed Won"` | ❌ idem |
| `FILTER "…" BEFORE "today"` | ❌ erreur explicite : opérateur inconnu |

**Conséquence pratique.** L'API sert à poser la structure — colonnes, tri, filtres numériques —
mais **les filtres de statut et les dates relatives doivent être ajoutés à la main dans
l'interface**, où ils fonctionnent parfaitement. Deux clics.

C'est une bonne nouvelle déguisée : cela veut dire qu'un agent ne peut pas maintenir seul ces
vues aujourd'hui. Les tableaux de bord se construisent à la main une fois, puis ils vivent.

### La vue créée

**`🔔 Relances — pipeline par montant`** sur la base Deals — colonnes utiles, tri par montant
décroissant, deals sans montant écartés.

**Les deux filtres à ajouter à la main**, dans cet ordre :

1. `Status` → **n'est pas** → `Closed Won`, puis **n'est pas** → `Closed Lost`
2. `Date prochaine relance` → **est antérieure à** → `Aujourd'hui`

Une fois posés, cette vue est le tableau des relances dues, trié par ce qui rapporte le plus.

---

## 8. Pennylane — pas de connecteur, mais toutes les pièces

*Vérifié le 23/07.*

**Il n'existe aucun connecteur Pennylane natif pour Database Sync.** Les exemples cités par
Notion sont Zendesk, Salesforce, Strava, Spotify. Database Sync se branche sur « n'importe quelle
source ayant une API » — mais **via un Worker que vous écrivez**. Ce n'est pas un clic.

**En face, l'API Pennylane est solide.** REST, bien documentée, avec trois modes
d'authentification : jeton entreprise, jeton cabinet comptable, ou OAuth 2.0. Elle couvre la
facturation, les factures fournisseurs, les écritures comptables, le rapprochement bancaire
**et les déclarations de TVA** — soit exactement le périmètre de la routine d'échéances.

### Trois chemins, par effort croissant

| Chemin | Effort | Coût | Quand le choisir |
|---|---|---|---|
| **Make / Zapier / n8n** | faible — Pennylane y est déjà intégré | abonnement de l'outil | Pour valider l'usage avant d'investir |
| **Worker Notion + API Pennylane** | moyen — du code à écrire | gratuit jusqu'au **11/08**, puis crédits | Si l'usage est confirmé et qu'on veut tout garder dans Notion |
| **Intégration sur mesure** | élevé | — | Pas justifié aujourd'hui |

⚠️ **Database Sync est unidirectionnel.** Ce qui change dans Notion ne remonte pas vers Pennylane,
sauf à coder explicitement le retour. Pour une routine d'échéances c'est sans importance — on lit,
on ne réécrit pas dans la compta.

**Ma recommandation : commencer par n8n ou Make.** Le vrai risque n'est pas technique, il est
d'automatiser un flux dont personne ne se sert. Valider l'usage d'abord, écrire le Worker
ensuite — et si l'usage est confirmé avant le 11 août, la bêta gratuite est un bon moment pour
basculer.

---

## 9. L'idée à creuser — Learning Buddy et l'Agent SDK

*Question posée le 23/07 : la Learning App, ou Learning Buddy, pourrait-elle être un Agent SDK ?*

Il y a deux lectures, et elles ne mènent pas au même endroit.

### Lecture 1 — embarquer un agent Notion dans la Learning App

C'est l'usage prévu par Notion : mettre son agent dans une application tierce.

**Ce que ça résoudrait.** Les cahiers 12 (Chatbot & QAR) et 12bis (IA Features) sont à 60 % et
30 %, et ce qui manque est le **RAG** — la capacité du chatbot à répondre depuis le corpus
pédagogique. Or ce corpus vit déjà dans Notion (*Modules et Contenus Pédagogiques*, base
*Parcours*). Un agent Notion y accède nativement : le problème du corpus disparaît.

**Ce qui coince, et qu'il faut regarder avant de s'engager :**

- **Le coût à l'usage.** Chaque échange d'apprenant consomme des crédits Notion, facturés
  10 $ / 1 000. Sur un abonnement à 29 € par mois, la marge se joue là. **À chiffrer avant tout
  engagement** — je n'ai pas trouvé de grille du coût par interaction.
- **La dépendance.** Le cœur pédagogique du produit reposerait sur un fournisseur tiers, sa
  tarification et sa disponibilité.
- **Le RGPD.** Faire transiter des données d'apprenants par l'agent d'un tiers engage le cahier
  13bis. Ce n'est pas rédhibitoire, c'est un point de conformité à traiter d'abord, pas après.

### Lecture 2 — Learning Buddy devient lui-même embarquable

L'idée inverse, et la plus intéressante stratégiquement : **TLS expose son propre agent**, que
les clients installent dans leurs outils.

Elle colle au positionnement « OS des organisations Skills-Based » : l'app ne serait plus une
destination où l'apprenant se rend, mais une **capacité disponible là où il travaille déjà**.
Elle prolonge aussi le flywheel — après une mission STRIDE, l'agent reste dans les outils du
client, comme l'app est censée rester aujourd'hui.

**Ce qu'il faut avant d'y penser sérieusement :** la Learning App n'a pas encore atteint son MVP
(échéance « Juillet 2026 » portée par les cahiers, aujourd'hui atteinte), le cahier 10 Analytics
est à 0 %, et le passeport de compétences — qui verrouille cinq autres cahiers — est à 90 %.
Un produit embarquable suppose un produit stable.

### Ce que j'en dis

La lecture 1 est **testable tout de suite** et lèverait un vrai blocage produit (le RAG). Elle
mérite un essai chiffré, pas un engagement.

La lecture 2 est **une vraie idée de positionnement**, cohérente avec la vision SBO — mais c'est
une décision de roadmap, pas une expérimentation. Elle appartient à la conversation « vision
produit », après le MVP.

Dans les deux cas, la question préalable est la même et n'a pas de réponse aujourd'hui :
**combien coûte une interaction ?**

---

## Ce que cette étude n'a pas tranché

- **Le plan Notion exact de TLS** et donc l'accès réel aux Dashboards. À vérifier dans l'interface.
- **Les limites réelles du bloc HTML** — non documentées par Notion, sources contradictoires.
  Seul un essai tranchera.
- ~~Le coût en crédits~~ — **répondu** : **10 $ pour 1 000 crédits**, partagés à l'échelle du
  workspace, remis à zéro chaque mois **sans report**. Vaut pour les Custom Agents, les agents
  externes et Workers après le 11 août.
- ~~Database Sync avec Pennylane~~ — **répondu (§8)** : aucun connecteur natif, mais l'API
  Pennylane est complète. Trois chemins possibles, n8n/Make recommandé pour commencer.
- **Le coût d'une interaction d'agent en crédits** — bloquant pour évaluer l'idée du §9.
  Aucune grille trouvée.

---

## Sources

- [Notion 3.6 — External Agents, HTML blocks (01/07/2026)](https://www.notion.com/releases/2026-07-01)
- [Notion 3.5 — Developer Platform (13/05/2026)](https://www.notion.com/releases/2026-05-13)
- [Notion 3.3 — Custom Agents (24/02/2026)](https://www.notion.com/releases/2026-02-24)
- [Notion 3.4 (26/03/2026)](https://www.notion.com/releases/2026-03-26)
- [What is the Notion HTML block? Uses, limits, sharing — Stacktree](https://stacktr.ee/blog/notion-html-block-explained)
- [Notion Introduces Dashboards for Enhanced Database Visualization](https://www.createwith.com/tool/notion/updates/notion-introduces-dashboards-for-enhanced-database-visualization)
- [You Can Vibe Code in Notion Now (Sort of) — Medium](https://medium.com/@LearnChangeDo/you-can-vibe-code-in-notion-now-sort-of-everything-you-need-to-know-about-notions-new-html-b08b7addf026)

---

## Journal

**2026-07-23 (3)** — Pennylane : aucun connecteur Database Sync natif, API REST solide
(facturation, écritures, rapprochement, **TVA**), trois chemins chiffrés. Ajout du §9 sur
l'hypothèse Learning Buddy ↔ Agent SDK, dans ses deux lectures.

**2026-07-23 (2)** — Tarification confirmée (10 $ / 1 000 crédits). DSL des vues éprouvé sur la
base Deals : tri, colonnes et filtres numériques passent ; **filtres de statut et dates relatives
échouent en silence**. Vue `🔔 Relances — pipeline par montant` créée, deux filtres à finir à la main.

**2026-07-23** — Création. Étude des versions Notion 3.3 à 3.6. Constat principal : le
Developer Platform de mai (Workers, Database Sync, Custom Agent Tools, CLI, Agent SDK) répond à
la question « peut-on développer nos propres outils sans quitter Notion » — oui. Deux échéances
de coût : Custom Agents en crédits depuis le 4 mai, Workers à partir du 11 août.
