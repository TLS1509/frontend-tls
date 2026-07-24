# Learning Buddy en situation de travail — exploration produit

> **2026-07-23.** Exploration : et si la Learning App cessait d'être une destination pour devenir
> une capacité disponible là où les gens travaillent déjà ?
> Point de départ : l'idée d'un menu de prompts dans la barre de menus macOS.
> **Statut : exploration, pas décision.** Rien ici n'est engagé.

---

## L'intuition, et pourquoi elle est juste

Aujourd'hui la Learning App est un endroit **où l'on va**. L'apprenant quitte son travail, ouvre
un onglet, apprend, revient. Ce détour est le point de fuite de tout dispositif de formation :
c'est là que l'intention se perd.

L'idée du menu de prompts inverse la charge. L'apprenant ne se déplace plus — **la capacité vient
à lui**, à l'endroit et au moment où la question se pose.

Ce n'est pas une intuition isolée : c'est **le mouvement de fond du L&D en 2026**. Les
plateformes concurrentes s'intègrent à Teams, Slack et Google Workspace pour être « là où les
collaborateurs travaillent déjà ». La question n'est donc pas *si* c'est la bonne direction, mais
**par quelle porte y entrer** — et c'est là que tout se joue pour une équipe de deux.

---

## Les cinq surfaces possibles

| Surface | Portée | Coût de construction | Le pour | Le contre |
|---|---|---|---|---|
| **Serveur MCP** | Claude, Cursor, ChatGPT, Copilot… — une implémentation, toutes les surfaces | **faible** | Standard ouvert, écrit une fois | Ne touche que ceux qui utilisent déjà un assistant |
| **Barre de menus** (ton idée) | macOS, puis Windows | **élevé** | Conscient du contexte au niveau système : sait dans quelle app tu es | Une plateforme à la fois, friction d'installation, toute l'interface à bâtir |
| **Extension navigateur** | Chrome, Edge | moyen | Là où se passe le travail de bureau | Périmètre limité au web, revue de store |
| **App Slack / Teams** | Entreprise | moyen | Ce que les acheteurs L&D demandent | Territoire déjà occupé par les concurrents |
| **Add-in Office / IDE** | Métiers précis | moyen | Très contextuel | Audience étroite |

### Ce que les chiffres disent du MCP

- Le répertoire est passé d'**une cinquantaine de serveurs en novembre 2024 à 8 000–12 000 au
  deuxième trimestre 2026**.
- **Forrester prévoit que 30 % des éditeurs SaaS d'entreprise publieront leur propre serveur MCP
  en 2026.**
- Formule qui revient dans la presse spécialisée : les plateformes absentes de l'index MCP
  « risquent de devenir invisibles aux assistants IA ».
- Précédents directs : **Autodesk** a publié un *Product Help MCP Server* qui expose sa
  documentation de 110 produits aux assistants ; **X** a ouvert le sien le 30 juin ;
  **Microsoft** a fait de même pour Dynamics 365 Commerce.

Autrement dit : **la distribution migre du fil vers l'agent.** Et le cas Autodesk est presque
exactement le vôtre — exposer un corpus de référence pour que les assistants répondent juste.

---

## Le vrai actif n'est pas l'agent, c'est le Passeport

C'est le point qui décide de tout, et il mérite d'être posé franchement.

**Un agent qui répond à une question n'a aucune valeur défendable.** N'importe quel modèle le
fait, gratuitement, déjà installé. Si Learning Buddy se contente de répondre, il entre en
concurrence frontale avec ce que le collaborateur a déjà — et il perd.

**Ce que TLS a et que personne d'autre n'a**, c'est le **Passeport de compétences** : le niveau
Dreyfus de la personne, ses parcours, ses preuves, ses objectifs. Ce qui change alors :

| Sans passeport | Avec passeport |
|---|---|
| « Voici comment on fait un plan de formation » | « Tu es en niveau 3 sur l'ingénierie pédagogique — voici l'étape qui te manque » |
| Réponse générique | Réponse calibrée sur le niveau réel |
| L'échange se perd | **L'échange devient une preuve au passeport** |
| Rien à mesurer | Boucle Learn → Do → Match alimentée en continu |

**Chaque interaction en situation de travail devient une trace de compétence.** C'est le seul
angle où l'agent est un produit et non une commodité — et c'est exactement la boucle que votre
positionnement SBO décrit déjà.

Conséquence directe : **le cahier 02 (Passeport) n'est pas un module parmi seize, c'est la
condition d'existence de ce produit.** Il est à 90 %.

---

## Ce que ça pourrait faire, concrètement

Trois familles, par ordre de faisabilité.

### 1. Répondre en contexte *(le socle)*
« Comment structurer une séquence en classe inversée ? » → réponse issue du corpus TLS,
calibrée sur le niveau de la personne, avec le lien vers le module correspondant.

### 2. Capter la preuve *(le différenciateur)*
« Je viens d'animer un atelier de cadrage » → l'agent en fait une entrée de journal réflexif,
la relie à la compétence concernée, propose de la soumettre en preuve au passeport.
**C'est ce qui n'existe nulle part ailleurs.**

### 3. Suggérer au bon moment *(l'ambition)*
La personne travaille sur un cahier des charges → l'agent repère l'écart avec son objectif de
compétence et propose la micro-ressource utile maintenant. C'est le « bon moment pédagogique »,
et c'est aussi le plus difficile — cela suppose de comprendre le contexte de travail.

La barre de menus est **la seule surface qui rend le n°3 possible**, parce qu'elle voit dans
quelle application on se trouve. C'est son avantage propre, et il est réel.

---

## Ce que je recommanderais

**Commencer par le serveur MCP, et garder la barre de menus pour plus tard.**

Non par prudence, mais par arithmétique : le MCP est **la moins chère des cinq surfaces** et la
seule qui s'écrive une fois pour toutes. Ce n'est pas un pari, c'est une option peu coûteuse sur
un marché qui se structure vite.

- Une implémentation → présent dans Claude, Cursor, ChatGPT, Copilot.
- Aucune interface à concevoir : l'assistant hôte s'en charge.
- Aucun store, aucune revue, aucun cycle de publication.
- Vous maîtrisez déjà le protocole — cette session entière passe par des connecteurs MCP.
- Réversible : si personne ne s'en sert, vous avez perdu quelques jours.

La barre de menus reste la bonne réponse **le jour où le n°3 devient l'objectif**. Elle demande
alors un vrai investissement d'interface, justifié par une capacité que rien d'autre ne donne.

---

## Ce qu'il faut regarder en face

Quatre obstacles, dont trois sont des faits.

1. **Le MVP de la Learning App n'est pas livré.** Les cahiers portent l'échéance « MVP Juillet
   2026 » — atteinte. Construire une surface d'accès à un produit inachevé est prématuré.
2. **Le cahier 10 (Analytics) est à 0 %.** Sans lui, aucune de ces interactions n'est mesurable —
   et un produit dont on ne mesure pas l'usage ne se pilote pas.
3. **Le RGPD et l'AI Act.** Un agent qui lit le contexte de travail touche des données
   professionnelles, potentiellement personnelles. Le cahier 13bis est à 75 % ; ce chantier doit
   précéder, pas suivre.
4. **Deux personnes.** C'est la contrainte qui décide vraiment. Elle plaide pour la surface la
   moins coûteuse — donc pour le MCP.

---

## La question à trancher avant d'aller plus loin

Une seule, et elle n'est pas technique :

> **Learning Buddy est-il une fonctionnalité de la Learning App, ou un produit distinct ?**

- **Fonctionnalité** — il sert les abonnés existants, améliore la rétention, ne change pas le
  modèle. Prolongement naturel des cahiers 12 et 12bis.
- **Produit** — il se vend seul, s'installe sans la Learning App, et devient la porte d'entrée du
  flywheel plutôt que sa sortie. Cohérent avec « OS des organisations Skills-Based », mais c'est
  une autre entreprise.

La réponse commande tout le reste : le modèle économique, la roadmap, et jusqu'à la manière de
présenter TLS. **Elle appartient à la conversation vision produit, pas à une session
d'outillage.**

---

## Analyse de viabilité — trois options

*Ajouté le 2026-07-23. La question « fonctionnalité ou produit » posait un choix binaire.
L'analyse en fait apparaître un troisième, et c'est celui qui colle le mieux au positionnement SBO.*

### Le fait économique qui commande tout

**Avec un serveur MCP, l'inférence est payée par l'assistant hôte, pas par vous.**

Quand un collaborateur interroge Learning Buddy depuis Claude ou ChatGPT, c'est son abonnement à
lui qui paie le modèle. TLS ne paie que son hébergement, sa base et ses appels — des coûts fixes,
pas des coûts par interaction.

C'est structurellement différent d'un agent embarqué dans votre application, où **chaque échange
d'apprenant vous coûte**. Sur un abonnement à 29 € par mois, cette différence décide de la marge.

| | Agent dans la Learning App | Serveur MCP |
|---|---|---|
| Coût de l'inférence | **TLS** | L'assistant de l'utilisateur |
| Coût qui croît avec l'usage | oui | non |
| Marge à l'échelle | se dégrade | tient |

**Conséquence : toute option construite sur MCP est économiquement plus saine.** Ce n'était pas
évident au départ, et ça réordonne les priorités.

---

### Option A — Fonctionnalité de la Learning App

Learning Buddy est une surface d'accès de plus, réservée aux abonnés.

| Dimension | Évaluation |
|---|---|
| **Technique** | La plus simple. Un serveur MCP qui lit le passeport existant, authentification par le compte Learning App. Dépend du cahier 02 (90 %) et prolonge le cahier 12 (60 %). |
| **Économique** | Aucun revenu nouveau. Agit sur la **rétention** — donc sur le churn des abonnements existants. Coûts fixes seulement. |
| **Commercial** | Aucun nouveau mouvement de vente. Devient un argument de différenciation dans la vente de l'app. |
| **Stratégique** | Cohérent, mais ne change pas la trajectoire. |
| **Risque** | Faible. |

**Le verdict :** peu risqué, peu transformateur. C'est le prolongement naturel des cahiers 12 et
12bis, et ça mérite d'être fait de toute façon.

---

### Option B — Produit autonome

Learning Buddy se vend et s'installe sans la Learning App.

| Dimension | Évaluation |
|---|---|
| **Technique** | Nettement plus lourd. Il faut une authentification propre, un onboarding autonome, et surtout **un passeport qui vit sans les parcours**. Question non résolue : *d'où viennent les preuves si la personne ne suit aucun parcours ?* Sans réponse, le passeport reste vide, et le différenciateur disparaît. |
| **Économique** | Revenu nouveau, mais lequel ? En individuel : panier faible, churn élevé, coût d'acquisition à supporter seul. En entreprise : **concurrence directe avec votre propre Learning App**. |
| **Commercial** | Un mouvement de vente supplémentaire à construire, avec une cannibalisation réelle. |
| **Stratégique** | Dilue. Deux produits pour deux personnes. |
| **Risque** | Élevé. |

**Le verdict :** c'est une autre entreprise. Le point bloquant n'est pas commercial mais
conceptuel — **un passeport sans source de preuves n'a rien à raconter.**

---

### Option C — Le Passeport comme couche, Buddy comme surface

TLS ne vend ni une application ni un assistant : il vend **la couche compétences d'une
organisation**. La Learning App en est une surface, Learning Buddy une autre, le back-office
client une troisième.

| Dimension | Évaluation |
|---|---|
| **Technique** | Exigeant sur l'architecture, pas sur les moyens : le passeport doit devenir une **API propre** avant d'être exposé en MCP. C'est un travail de mise au propre de ce qui existe, pas une construction nouvelle. Le cahier 02 devient la pièce maîtresse — ce qu'il est déjà, puisqu'il verrouille cinq autres cahiers. |
| **Économique** | Facturation **par organisation et par collaborateur**, le standard du marché des plateformes de compétences. Cohérent avec vos ventes actuelles (STRIDE 10 k€, Upskilling 20 k€), qui sont déjà des ventes d'organisation. |
| **Commercial** | **Aucun mouvement de vente nouveau** : c'est exactement celui que vous faites déjà — ETI 200-2 000, DRH et L&D. Et le flywheel se ferme enfin : la mission STRIDE installe la couche, la couche reste. |
| **Stratégique** | C'est votre positionnement affiché, pris au mot. Vous écrivez « OS des organisations Skills-Based » en présentant la Learning App comme cet OS. **En réalité, l'OS c'est le passeport.** L'app n'en est qu'une fenêtre. |
| **Risque** | Moyen — mais c'est un risque de clarté, pas de moyens. |

**Le verdict :** c'est l'option qui demande le moins de choses nouvelles et qui change le plus la
lecture de ce que vous vendez.

---

### Ce que le marché permet de dire

**Sur les prix, l'opacité joue pour vous.** Degreed, Gloat, 365Talents et Eightfold pratiquent
tous le **tarif entreprise sur devis**, sans grille publique. Le modèle dominant est le
*par collaborateur et par mois*. Conséquence : **aucun prix de référence à casser**, et un
positionnement à construire plutôt qu'à défendre.

**Sur la monétisation MCP, les modèles existent déjà** : à l'appel, par abonnement, freemium, ou
à l'usage constaté. La pratique de référence est le *BYOK* — l'utilisateur s'authentifie avec
ses propres identifiants et le serveur ne fait qu'exposer la capacité. C'est précisément ce dont
vous avez besoin : **le collaborateur s'authentifie avec son compte TLS, l'organisation paie la
couche.**

---

### Ce que je recommanderais

**A et C ne s'opposent pas — A est la première étape de C.**

Le même serveur MCP sert les deux. Ce qui change, c'est ce qu'on décide d'en dire et à qui on le
facture. Donc :

1. **Construire le serveur MCP** en le traitant comme l'option A — une surface pour les abonnés.
   Peu risqué, utile de toute façon, et il force à mettre le passeport au propre.
2. **Observer** ce que les gens en font réellement. C'est la seule donnée qui manque, et aucune
   analyse ne la remplacera.
3. **Trancher C plus tard**, quand l'usage aura dit si le passeport-couche intéresse les
   organisations autant que la théorie le suggère.

**Écarter B.** Pas par prudence, mais parce que son problème est conceptuel : sans parcours, le
passeport n'a pas de preuves à consigner, et Learning Buddy redevient un assistant générique en
concurrence avec ceux qui sont déjà installés et gratuits.

---

### Les questions qui restent, et qui ne se devinent pas

1. **Quel est votre coût réel par utilisateur** en hébergement et appels API, une fois l'inférence
   sortie de l'équation ? C'est le dénominateur de toute la discussion.
2. **Le passeport peut-il se remplir sans parcours TLS ?** Si oui, l'option B redevient
   discutable. Si non, elle est close.
3. **L'analyse business model gelée** (FACTS-CANON S2) doit trancher le modèle de la Learning App
   avant qu'on puisse tarifer une couche au-dessus.
4. **Le cahier 10 Analytics est à 0 %.** Sans lui, l'étape 2 — observer l'usage — est aveugle.
   C'est la dépendance la plus sous-estimée de tout ce document.

---

## Sources

- [The PM's Guide to Agent Distribution: MCP Servers, CLIs, and AGENTS.md](https://www.news.aakashg.com/p/master-ai-agent-distribution-channel)
- [MCP Server Ecosystem Statistics 2026 — Presenc AI](https://presenc.ai/research/mcp-server-ecosystem-statistics-2026)
- [Everything your team needs to know about MCP in 2026 — WorkOS](https://workos.com/blog/everything-your-team-needs-to-know-about-mcp-in-2026)
- [Autodesk launches Product Help MCP Server](https://adsknews.autodesk.com/en/news/product-help-mcp-server/)
- [X Launches MCP Server: Betting on Agent Distribution](https://fourweekmba.com/ai-x-mcp-server-ai-agent-distribution/)
- [How learning in the flow of work will transform L&D in 2026 — Cornerstone](https://www.cornerstoneondemand.com/resources/article/learning-workflow-transformation/)
- [Learning in the flow of work — WalkMe](https://www.walkme.com/blog/ai-in-workflow-learning/)
- [AI Learning Assistant: Future of Workplace Learning](https://worklearning.ai/p/ai-learning-assistant-workplace-learning-support)
- [How to Charge for an MCP Server in 2026 — UsageBox](https://usagebox.com/articles/how-to-charge-for-mcp-server-2026-per-call-subscription-x402)
- [Building a Monetized API: How to Monetize an MCP Server — Zuplo](https://zuplo.com/blog/monetize-an-mcp-server)
- [MCP Server Economics — TCO, Business Models & ROI — Zeo](https://zeo.org/resources/blog/mcp-server-economics-tco-analysis-business-models-roi)
- [Skills Intelligence Software: The 9 Best Platforms](https://hrtechsaas.com/blog/skills-intelligence-software/)

---

## Journal

**2026-07-23 (2)** — Analyse de viabilité ajoutée. Le choix binaire « fonctionnalité ou produit »
en cache un troisième : **le Passeport comme couche, Buddy comme surface** — le positionnement SBO
pris au mot. Fait économique décisif : en MCP, **l'inférence est payée par l'assistant hôte**,
donc les coûts restent fixes. Recommandation : A est la première étape de C ; B est écartée pour
une raison conceptuelle (pas de parcours = pas de preuves = pas de passeport).

**2026-07-23** — Création, à la suite de l'idée d'un menu de prompts en barre de menus macOS.
Conclusion principale : la surface la plus leveragée pour une équipe de deux est le **serveur
MCP**, pas l'application native — et le différenciateur n'est pas l'agent mais le **Passeport de
compétences**, qui transforme chaque interaction en preuve. Question ouverte : fonctionnalité ou
produit distinct.
