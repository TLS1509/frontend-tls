# Réalignement stratégique & Roadmap H2 2026 — The Learning Society

> **Nature :** note de cadrage stratégique (registre conseiller). Confronte les 3 docs de stratégie de PAD aux **faits vérifiés** (carnet Pennylane/Notion + marché sourcé + audit produit/code) et pose la stratégie + roadmap opérationnelle du semestre H2 2026 (juil.→déc.).
> **Date :** 25 juillet 2026 · **Statut :** v1, à valider en duo · **Usage :** interne.
> **Principe :** on distingue toujours **ce qu'on vend aujourd'hui** de **ce qu'on construit**. Aucun chiffre inventé ; les projections IA sont retirées.
> **Docs liés :** [`ETUDE-VIABILITE-LEARNING-APP.md`](ETUDE-VIABILITE-LEARNING-APP.md) · [`../ops/REORG-OPS-DONNEES-STACK-H2-2026.md`](../ops/REORG-OPS-DONNEES-STACK-H2-2026.md)

---

## 1. Verdict sur la stratégie de Pierre (les 3 docs de référence)

La charpente commune des 3 docs — **3 piliers (Conseil / Formation-Agence / Plateforme) unifiés par le récit SBO** — est **directionnellement juste**. Le problème n'est pas la vision : c'est que les docs **vendent la vision au présent** et confondent la roadmap avec l'actif. Quatre erreurs à corriger avant tout.

**a) Le hockey stick est un récit, pas un moteur de demande.**
Le « 260 700 € » et le « 5-6 M€ ARR / 1,45 M€ » sont des **projections générées par IA** (annotées « Gemini Deepsearch ») — à **retirer** de tout doc piloté. Le réel : CA validé 2026 **~117 K€**, book **~170 K€**. Le SBO est une catégorie **réelle mais naissante** en France (« le discours devance la pratique ») → *north star* oui, base de la proposition de valeur solvable *aujourd'hui* non. Correction de fait : EdTech FR = **1,8 Md€** (66 % corporate), **pas 7,88 Md€** ; formation pro FR = 56,6 Md€ (dont ~29 Md€ entreprise/OPCO). Ne jamais propager le 7,88.

**b) Le « SaaS » supposé n'existe pas — l'erreur la plus coûteuse.**
Les docs mettent la Learning App en **Pilier 1 « revenus récurrents »**, l'un chiffrant **88 200 € d'abonnements**. Réalité : **0 abonné payant** ; l'app est un **véhicule de delivery bundlé dans les missions**. Ces 88 K€ sont **fictifs**. Le doc n°3 se contredit lui-même : sa table donne services **66 %** / app **34 %** — le mix réel. **TLS n'est pas un SaaS : c'est une boutique de services rentable qui construit un produit.**

**c) Le moat annoncé est vide.**
Matching IA talents↔projets, org intelligence, intégrations SIRH/CRM, « barrière de sortie par la data » : **non construits** (aucune implémentation de matching dans `src/`, analytics sans instrumentation — les dashboards tournent sur des mocks, backend de prod hors GitHub). ✅ **Nuance ajoutée le 28/07 :** le Passeport **« auto-enrichi par la preuve » est, lui, construit** — `EvidenceRef` ([`src/types/learning.ts:199`](../../src/types/learning.ts)) avec 3 régimes, validation humaine signée, `currentLevel` optionnel. **C'est le socle du Match : Learn ✅ · Do ✅ · Preuve ✅ · Match ❌.** Le superlatif « la seule solution combinant… » est **indéfendable** : 360Learning (~243 M$), Didask (10 M€), Degreed, Neobrain, 365Talents combinent déjà LMS + skills + analytics, financés. À supprimer.

**d) Les vrais déterminants H2 sont absents des 3 docs :**
- **Trésorerie / facturation** (angle mort n°1) : ~35 K€ facturé sur ~117 K€ commandé, ~53 K€ encaissé. Le goulot n'est pas l'offre, c'est **l'encaissement**.
- **C-Campus** : actif GTM n°1 (partenariat ~34 K€ **et** canal de facturation référencé achats vers Bouygues/Orange) — quasi invisible dans les docs.
- **Contrainte à 2** : un menu de ~10 offres + 8 missions + 80 j TJM + 278 abonnés à recruter + 2-3 posts/sem + webinaire mensuel + livre blanc = **ingérable à 2**. Aucun WIP limit.
- **AI Act Art. 4** : absent — c'est pourtant le seul *wedge daté et vendable maintenant*.
- **Drapeaux rouges à retirer** : « Qualiopi assisté par IA » (TLS **non certifié** → intégrité + exposition), « L'Académie » (nom proscrit), collision de nom « Passeport de Compétences » (l'État FR en opère un, ~43 M).

**Ce qui tient et qu'on garde :** les piliers services (66 % du CA, moteur cash) ; le positionnement **expert-métier** (pas juste tech) ; la boucle **Learn→Do réelle chez Orange** (missions, coaching, Open Badges, journal) ; la fusion IA + ingénierie pédagogique **incarnée dans le flagship Ingénieur Pédagogique Augmenté** (vendu Orange **et** Equans) ; l'ancrage B2B ; « augmenter, pas remplacer » (aligné AI Act).

---

## 2. Positionnement réaligné

> **Qui on est.** TLS est un **cabinet-produit** : une boutique de services L&D augmentés par l'IA, rentable, qui capitalise ses missions dans une Learning App propriétaire. On vend de l'**expertise duo (IA + ingénierie pédagogique) livrée sur des projets réels** — pas une plateforme, pas encore.

- **Wedge principal :** **l'Ingénieur Pédagogique Augmenté** — le parcours + méthode qui apprend aux équipes L&D à concevoir 2-3× plus vite avec l'IA, appliqué sur leurs vrais chantiers, avec preuve (Open Badges, coaching, journal). **Seule brique dont la répétabilité est prouvée** (Orange + Equans). Il devient le centre de gravité, à la place du moat data hypothétique.
- **Wedge secondaire, daté :** module court **Littératie IA / conformité AI Act Art. 4** (voir §4). Vendable *maintenant*, dérive naturellement vers le flagship.
- **ICP :** Responsables **L&D / Digital Learning de grands comptes et ETI**, budget entreprise/OPCO, sous pression IA. **Pas de B2C/CPF individuel** (en contraction). **Pas d'OF « Qualiopi »** comme cible.
- **Design-partner produit :** **Orange reste l'unique** — à traiter comme tel, on ne généralise pas un POC en marché.
- **C-Campus = canal primaire, à nommer et formaliser.** (1) partenaire de contenu/lignée pédagogique (Marc Dennery) ; (2) **canal de facturation référencé achats** vers les grands comptes. **Décision actée : on GARDE C-Campus.** Contrepartie : c'est une **dépendance de canal** → poser un plan de dé-risquage léger (viser un 2ᵉ canal grands comptes en 2027, pas H2).
- **Sort du « formateur augmenté » :** **décision actée** — on lâche le *contenu générique* et on écrit **nos propres parcours L&D propriétaires** (le contenu devient un actif TLS).

**La règle d'or de communication — deux colonnes, jamais mélangées :**

| Ce qu'on vend AUJOURD'HUI (présent) | Ce qu'on CONSTRUIT (vision 3-5 ans) |
|---|---|
| Conseil STRIDE · parcours L&D propres · flagship Ingénieur Pédagogique Augmenté · studio contenu · module conformité AI Act | Passeport-preuve · matching IA · analytics org · Workforce Intelligence |
| Delivery via Learning App (bundlé) | Learning App en produit/abonnement |
| Preuve : Open Badges + coaching + journal livrés chez Orange | Moat data / barrière de sortie |

**On ne vend JAMAIS la colonne de droite au présent.**

---

## 3. Modèle éco réaligné — 3 lignes

On abandonne le CA-projection et on **pilote sur l'encaissement**, pas les commandes.

1. **SERVICES (moteur cash, ~66 %)** — Conseil STRIDE + parcours L&D + flagship + studio contenu + TJM (~1 000 €/j). Ce qui paie les salaires et **finance la R&D produit**. Priorité absolue H2.
2. **PRODUIT-AS-DELIVERY (~34 %, non-monétisé en propre)** — la Learning App est incluse dans les missions. **0 € d'abonnement au P&L 2026.** Sa valeur H2 = câbler **une** brique de preuve (voir doc ops) pour préparer le futur, pas générer du revenu.
3. **PRÉVISIONNEL** — piloté dans **Pennylane** (module prévisionnel 36 mois), pas dans un carnet manuel.

**Pricing à trancher (décision, voir §6) :** un seul modèle B2B (jour de conseil, forfait parcours, siège) — sortir le « Pass Solo 30 €/mois » du rôle de moteur (segment CPF en contraction).
**Priorité n°1 immédiate : la trésorerie.** ~80 K€ dorment non facturés/non encaissés. Facturer le livré **débloque plus de cash que n'importe quelle vente** (voir doc ops, workflow facturation).

---

## 4. Intelligence H2 2026 à date (sourcée juillet 2026)

- **AI Act Art. 4 — la fenêtre est ouverte MAINTENANT** (échéance de contrôle **2 août 2026**, CNIL/DGCCRF/Arcom). **Digital Omnibus** a *assoupli* Art. 4 (« ensure » → « support the development of ») sans le reporter. **Deux nuances décisives :**
  - **Aucune amende dédiée à l'Art. 4** — le « 15 M€ / 35 M€ » que brandissent les concurrents = **fear-selling**. Risque réel = supervision + facteur aggravant. **Message honnête = crédibilité B2B.**
  - **Financement OPCO ⇒ Qualiopi**, que TLS **n'a pas**. → vendre le module **en direct entreprise** OU **via C-Campus (Qualiopi)**. **Le wedge Art. 4 rejoint le canal C-Campus.**
  - Repositionner en **programme continu** (registre, versioning, refresh), pas one-shot pré-échéance.
- **Concurrence :** tout le monde sort un « AI Companion » (360Learning oct. 2025, Didask + Knowledge Assistant). Le moat n'est pas « on a de l'IA » → **IP pédagogique + conseil SBO + delivery petit/rapide/incarné**.
- **SBO France :** SD Worx 2026 — **55 % des employeurs FR se disent skills-based, 45 % aveugles sur les compétences futures** → wedge « on *opérationnalise* la SBO, on ne la théorise pas ».
- **Événements H2 :** les gros salons L&D sont H1 (LT France = janv., prochain **jan. 2027**). Pour H2 → circuit **IA-exécutifs** : Produrable (30 sept.–1ᵉʳ oct.), AI Paris Summit (19-20 nov.), + webinaires. Préparer LT France 2027.
- **Financement public, sans dilution :** **Crédit Impôt Innovation (CII)** — 20 %, jusqu'à **80 k€/an**, valable jusqu'à fin 2027 → le **dev de la Learning App est un bon candidat**, imputable exercice 2026. + **Bourse French Tech** (~30 k€, en continu).
- **Mécanique de financement :** CPF reste-à-charge **150 €** (avr. 2026), France Compétences en baisse (~8,2 Md€), OPCO verrouillés à 95 % alternance → **construire sur les budgets entreprise directs**, pas le public/CPF.

---

## 5. Roadmap H2 2026 — bornée, exécutable à 2

Trois blocs parallèles, mais avec **un seul WIP dominant par personne**. Chaque item : porteur (CMT = tech/produit/contenu · PAD = vente/delivery) + **1 KPI**.

### Bloc A — Stratégie & Offre (lead PAD, support CMT)
| Quand | Action | Porteur | KPI |
|---|---|---|---|
| Juil. | **Packager le module AI Literacy Art. 4** (honnête, sans fear-selling) — vente **directe entreprise** + option **via C-Campus** | PAD | 1 offre one-pager prête |
| Juil.–août | **Vendre le module Art. 4** sur la fenêtre chaude (clients existants + C-Campus) | PAD | 2-3 deals signés |
| Août–sept. | **Écrire 1-2 parcours L&D propriétaires** (remplacent le « formateur augmenté » sous-traité) | CMT | 1 parcours prêt à vendre |
| Sept.–déc. | **Industrialiser le flagship « Ingénieur Pédagogique Augmenté »** (kit de vente + delivery répétable) | PAD+CMT | 1 nouveau client hors Orange/Equans |
| Continu | **Distribution par le discours** : 1 baromètre SBO/an, présence circuit IA H2, LinkedIn founders | PAD | 3-5 leads entrants qualifiés |

### Bloc B — Produit (lead CMT)
| Quand | Action | Porteur | KPI |
|---|---|---|---|
| Juil.–août | **Clarifier où vit la plateforme de prod** + statut de la refonte `frontend-tls` (roadmap produit claire) | CMT | 1 doc roadmap produit |
| Sept.–oct. | ~~Câbler la brique de preuve~~ ✅ **FAIT** (`EvidenceRef`). **Nouvelle cible : l'ALIMENTER** — chaque validation coach / badge / livrable de mission **émet** un `EvidenceRef` | CMT | nb de compétences avec preuve validante |
| Nov.–déc. | **Provisionner l'AI Act haut-risque** (audit de classification Annexe III sur scoring/matching) | CMT | 1 note conformité |
| — | **Ne PAS construire** : matching IA, org intelligence, marketplace, intégrations SIRH (gelés jusqu'à preuves + clients) | — | le NON tenu |

### Bloc C — Ops & Finance (lead CMT, cf. doc ops)
| Quand | Action | Porteur | KPI |
|---|---|---|---|
| Juil. | **Facturer le livré non facturé** (quick win cash) + Pennylane Essentiel (relances auto) | PAD | cash encaissé ↑ |
| Juil.–août | **Réconcilier le vrai CA** (book/facturé/encaissé) + reconstruire le modèle bottom-up (sans hockey stick) | CMT | 3 chiffres de pilotage figés |
| Août–sept. | **Nettoyage bases + carte de localisation + dashboards** (cf. doc ops) | CMT | dashboards fiables |
| Oct. | **Déposer le CII 2026** + candidater Bourse French Tech | PAD | dossiers déposés |

---

## 6. Décisions à trancher ensemble (~30 min)

1. **Qualiopi / OPCO** — viser sa propre Qualiopi, ou vendre en **direct entreprise + via C-Campus** ? *(Reco : direct + C-Campus ce semestre ; Qualiopi = décision 2027.)*
2. **Pricing** — un seul modèle B2B (jour / forfait parcours / siège). Sortir le Pass Solo du rôle de moteur. *(Reco : forfait parcours + TJM.)*
3. **Scope produit H2** — se limiter à « la brique de preuve » ; geler matching/org intelligence. *(Reco : oui.)*
4. **Où vit la plateforme de prod** + avenir de la refonte `frontend-tls`. *(À clarifier CMT.)*
5. **Venture ou boutique ?** — choix de fondateurs qui conditionne l'ambition produit et le besoin de financement. *(À trancher.)*
6. **Message AI Act** — obligation honnête, jamais « 15 M€ d'amende ». *(Reco : oui, non négociable.)*

---

## 7. Ce qu'on ARRÊTE (le NON explicite)

- Le **hockey stick IA** et les tailles de marché fausses dans tout doc externe.
- Vendre la Learning App comme **SaaS/abonnement** au présent (elle est bundlée).
- Construire **matching IA / org intelligence / marketplace / intégrations SIRH** avant preuves + clients.
- Viser le **B2C/CPF individuel** comme moteur.
- Le **fear-selling AI Act** (« 15 M€ »), « Qualiopi assisté par IA », « L'Académie ».
- Le **menu à 10 offres** : on tient 1 flagship + 1 wedge daté + le conseil, point.

---

## 8. Risques & incertitudes (honnêtes)

- **Trésorerie** = le risque court terme n°1 (cf. facturation en retard). À traiter en juillet.
- **Sur-extension à 2** : la roadmap ci-dessus est déjà ambitieuse — protéger le WIP, externaliser le contenu marketing si besoin.
- **Dépendance C-Campus** (canal + facturation grands comptes) : réelle, à dé-risquer à moyen terme.
- **Fenêtre AI Act** : se referme après août — repositionner en programme continu.
- **À vérifier :** statut Qualiopi exact de TLS ; texte final du Digital Omnibus (Art. 4) ; périmètre réel de PandaDoc.

---

*Fin — v1, 25 juillet 2026. À valider et itérer en duo. Les décisions du §6 conditionnent le reste.*
