# Learning Buddy — brief de décision

**Pour :** Pierre-Armand · **De :** Chloé · **Date :** 24 juillet 2026
**Objet :** Faut-il porter la Learning App là où les gens travaillent — et sous quelle forme ?
**Statut :** exploration à trancher ensemble. Rien n'est engagé.

---

## L'idée

Aujourd'hui, la Learning App est un endroit **où l'on va** : l'apprenant quitte son
travail, ouvre un onglet, apprend, revient. Ce détour est le point où l'intention
se perd.

**Learning Buddy inverse la charge** : la capacité vient à l'apprenant, à l'endroit
et au moment où sa question se pose — au départ, l'idée d'un menu de prompts dans
la barre de menus du Mac. C'est aussi le mouvement de fond du L&D en 2026 (les
plateformes s'intègrent à Teams, Slack, Workspace pour être « là où les gens
travaillent »).

La question n'est donc pas *si* c'est la bonne direction, mais **par quelle porte
y entrer** — et ce que ça change à ce qu'on vend.

---

## Le fait qui réordonne tout

**En serveur MCP, l'inférence est payée par l'assistant hôte, pas par nous.**

Quand un collaborateur interroge Learning Buddy depuis son Claude ou son ChatGPT,
c'est *son* abonnement qui paie le modèle. Nous ne payons que l'hébergement et la
base — des coûts fixes.

C'est l'inverse d'un agent embarqué dans notre app, où **chaque échange nous
coûte**. Sur un abonnement à 29 €/mois, cette seule différence décide de la marge.

| | Agent dans la Learning App | Serveur MCP |
|---|---|---|
| Coût de l'inférence | **Nous** | L'assistant de l'utilisateur |
| Coût qui croît avec l'usage | oui | non |
| Marge à l'échelle | se dégrade | tient |

**Conséquence : toute option bâtie sur MCP est plus saine économiquement.**

---

## Le point qui décide de la valeur

**Un agent qui se contente de répondre n'a aucune valeur défendable** — n'importe
quel modèle le fait, gratuitement, déjà installé. Si Learning Buddy ne fait que
répondre, il perd.

Ce que nous avons et que personne d'autre n'a, c'est le **Passeport de
compétences** : le niveau réel de la personne, ses parcours, ses preuves. C'est lui
qui transforme une réponse générique en réponse calibrée — et **chaque échange en
preuve au passeport**.

> Autrement dit : le vrai actif n'est pas l'agent, c'est le Passeport. L'agent
> n'en est qu'une surface.

---

## Les trois options

### Option A — Fonctionnalité de la Learning App
Learning Buddy comme surface d'accès de plus, réservée aux abonnés.
- **Technique** : la plus simple — un serveur MCP qui lit le passeport existant.
- **Éco** : pas de revenu nouveau ; agit sur la **rétention** (donc le churn). Coûts fixes.
- **Verdict** : peu risqué, peu transformateur. À faire de toute façon.

### Option B — Produit autonome
Learning Buddy se vend et s'installe **sans** la Learning App.
- **Point bloquant, conceptuel** : d'où viennent les preuves si la personne ne suit
  aucun parcours ? Sans réponse, **le passeport reste vide et le différenciateur
  disparaît.**
- **Éco** : en individuel, panier faible et churn élevé ; en entreprise,
  **concurrence directe avec notre propre Learning App.**
- **Verdict** : c'est une autre entreprise. **À écarter.**

### Option C — Le Passeport comme couche, Buddy comme surface
On ne vend ni une app ni un assistant : on vend **la couche compétences d'une
organisation**. La Learning App en est une surface, Learning Buddy une autre.
- **Technique** : exigeant sur l'architecture, pas sur les moyens — le passeport
  doit devenir une **API propre** avant d'être exposé en MCP. C'est de la mise au
  propre, pas de la construction nouvelle.
- **Éco** : facturation **par organisation et par collaborateur** — le standard du
  marché, et cohérent avec nos ventes actuelles (STRIDE 10 k€, Upskilling 20 k€),
  qui sont déjà des ventes d'organisation.
- **Commercial** : **aucun mouvement de vente nouveau** — exactement celui qu'on
  fait déjà (ETI 200-2 000, DRH et L&D). Le flywheel se ferme : la mission installe
  la couche, la couche reste.
- **Verdict** : l'option qui demande le moins de neuf et change le plus la lecture
  de ce qu'on vend.

---

## Ma recommandation

**A et C ne s'opposent pas — A est la première étape de C.** Le même serveur MCP
sert les deux ; ce qui change, c'est ce qu'on en dit et à qui on le facture.

1. **Construire le serveur MCP** en le traitant comme l'option A (une surface pour
   les abonnés). Peu risqué, utile de toute façon, et ça nous force à mettre le
   passeport au propre.
2. **Observer** ce que les gens en font réellement — la seule donnée qui manque,
   qu'aucune analyse ne remplace.
3. **Trancher C plus tard**, quand l'usage aura dit si le passeport-couche
   intéresse les organisations autant que la théorie le suggère.
4. **Écarter B** — non par prudence, mais parce que sans parcours, le passeport n'a
   rien à consigner.

---

## Ce qu'il nous faut trancher (et qui ne se devine pas)

1. **Notre coût réel par utilisateur** (hébergement + appels), une fois l'inférence
   sortie de l'équation. C'est le dénominateur de toute la discussion.
2. **Le passeport peut-il se remplir sans parcours TLS ?** Si oui, B redevient
   discutable ; si non, elle est close.
3. **Le modèle éco de la Learning App** doit être tranché avant qu'on tarife une
   couche au-dessus.
4. **L'analytics est à 0 %.** Sans lui, l'étape « observer l'usage » est aveugle —
   c'est la dépendance la plus sous-estimée.

---

*Source : exploration produit `LEARNING-BUDDY-IN-SITU.md` (23/07/2026). Les
chiffres de marché (croissance de l'index MCP, prévision Forrester, précédents
Autodesk / X / Microsoft) viennent de la veille citée dans ce document — à
reconfirmer avant tout usage externe. Les chiffres internes (STRIDE, Upskilling,
29 €/mois) sont les nôtres.*
