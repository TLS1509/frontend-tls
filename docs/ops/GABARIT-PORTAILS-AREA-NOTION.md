# Gabarit des portails Company Area — dashboards de pilotage par département

> **Objet :** transformer les 7 pages *Company Area* en **cockpits de pilotage** qui se lisent en 1 écran et se mettent à jour **seuls**.
> **Date :** 25 juillet 2026 · **Statut :** v1, à appliquer par lots · **Usage :** interne.
> **Principe :** *une page Area ne se remplit pas, elle se lit.* Tout ce qui exige une saisie manuelle pour rester vrai est **exclu par construction**.
> **Docs liés :** [`REORG-OPS-DONNEES-STACK-H2-2026.md`](REORG-OPS-DONNEES-STACK-H2-2026.md) · Registre des bases (Notion)

---

## 🔴 P0 — À traiter avant tout le reste

**Des identifiants sont en clair dans la page [Admin & Finance](https://app.notion.com/8ee4756da6bb4139b7feb4a9da5fb78c)** (bloc « coffre-fort »). Notion **n'est pas chiffré de bout en bout**, il est indexé par la recherche et lisible par toutes les intégrations connectées (dont les MCP).

→ **Sortir tous les secrets vers un vrai gestionnaire de mots de passe** (1Password / Bitwarden). **Un toggle « Vault » dans Notion n'est pas une protection.** Ne laisser dans Notion que des liens vers les outils.

---

## 1. Le gabarit standard (structure bloc par bloc)

| # | Bloc | Type Notion | Replié ? | Règle |
|---|---|---|---|---|
| 0 | **Titre** `[Area] — Portail` | Titre | — | Emoji de couleur constant par Area |
| 1 | **Nav header** | Callout, **bloc synchronisé** | Non | Home · 1-3 bases pivot · Tasks · Projects · Meetings · Docs · Handbook · outils externes ↗. Zéro texte brut, que des liens résolus |
| 2 | **🎯 Cockpit — 1 écran** | **Dashboard view** multi-widgets (plan Business) | Non | **3 compteurs + 1 forme + 1 liste. Max 6 widgets** (le plafond de 12 n'est pas un objectif) |
| 3 | **💶 Réel comptable** *(Areas financières)* | **Embed iframe Looker Studio ← Pennylane** | Non | Titre explicite « source Pennylane ». **Jamais mélangé** aux widgets Notion |
| 4 | **⚡ Exécution** | 2 colonnes : vue liée Tasks \| Projects | Non | Identique sur les 7 Areas, filtré sur l'Area. Tasks : « En retard » en 1ᵉʳ onglet |
| 5 | **[Objet métier]** | 1 vue liée de **la** base pivot | Non | 5-7 colonnes décisionnelles, **jamais les 32** |
| 6 | **📚 Ressources** | Toggle | **Oui** | Handbook · Docs · Meetings · Tool Stack · Drive ↗ |
| 7 | **🔧 Annexes techniques** | Toggle | **Oui** | IDs de bases, specs n8n, notes de setup |
| 8 | **🔗 Footer inter-Areas** | Callout, **bloc synchronisé** | Non | Les 7 Areas + Home, identique partout |

### Les 8 règles

1. **Zéro tableau écrit à la main.** Un chiffre tapé est faux sous 30 jours (Operations affiche encore « Q1 2026 » fin juillet ; Product affiche quatre `—`). Un widget natif ou rien.
2. **Zéro base *locale* sur une page Area** — uniquement des **vues liées** de bases SSOT, **filtrées sur `Company Area = [Area]`**. ✅ C'est déjà le pattern en place sur Sales (Projects / Docs / Meetings / Company database y sont des vues liées filtrées, **pas** des doublons).
   > ⚠️ **Piège de lecture (vécu) :** l'API Notion présente ces vues liées comme des « bases enfants » avec un ID propre, différent de celui de la base maître. **Ce n'est pas un doublon.** Ne jamais conclure à une duplication sur ce seul signal — vérifier avec l'équipe. Les seules vraies anomalies sont les bases **orphelines sans source** (`Untitled` dans Operations, `Mon travail` dans Product).
3. **Toute vue porte le filtre Area.** Un chart non filtré affiche un chiffre faux sur un écran de département — pire qu'un écran vide.
4. **Un libellé = une réalité.** « Board OKRs », « Timeline Stratégique », « Chart Backlog » qui sont en fait des tables brutes : construire l'objet **ou** renommer.
5. **Aucune consigne de chantier visible** (« 📌 Setup P0 : créer vue… ») → ça devient une **Task**, pas un bloc de page.
6. **Replié par défaut** tout ce qui n'est pas le cockpit. Deux toggles max, en bas.
7. **Aucun secret dans Notion** (cf. P0 ci-dessus).
8. **Header et footer = blocs synchronisés** → une seule édition propage sur les 7 pages. Seule façon qu'un duo tienne une nav cohérente.

> ⚠️ **Leçon du 25/07 — ne jamais conclure « vide » depuis les seules propriétés.** Les 358 Meetings « (no name) » ont d'abord été diagnostiqués comme des lignes fantômes à purger. Vérification faite : ce sont de **vraies AI meeting notes** (résumés, action items, transcripts — dont l'historique du projet Orange) dont seules les propriétés n'ont pas suivi lors de l'import du 10/07. **Une purge aurait détruit de la matière client.** → **Toujours ouvrir le contenu d'un échantillon avant tout archivage de masse.**

### Checklist de recette (avant de déclarer une page livrée)
- [ ] Les liens du header résolvent tous vers la bonne cible
- [ ] Chaque widget du cockpit porte un **filtre Area**
- [ ] Aucun chiffre écrit en dur dans un bloc texte
- [ ] Le cockpit tient dans un écran 1440×900 **sans scroll**
- [ ] Chaque compteur a un **propriétaire** (CMT ou PAD)
- [ ] Aucun secret sur la page ni dans les vues embarquées
- [ ] Le footer liste les 7 Areas

---

## 2. Comment choisir les KPI — les 5 tests

Un candidat doit passer **les 5**, sinon il dégage.

| Test | Question | Ce que ça élimine |
|---|---|---|
| **Action** | « Si ce chiffre double demain, que fais-je différemment cette semaine ? » Pas de réponse en 1 phrase → dehors | nb total de contenus, nb de tâches Done, story points |
| **Zéro** | Le chiffre peut-il valoir **0** quand tout va bien ? | un compteur à 0 se lit en ½ seconde ; un « 42 » demande une interprétation → ne sera pas lu |
| **Source** | Le champ est-il rempli sur **>70 %** des lignes aujourd'hui ? | « projets en retard » quand 17/23 n'ont pas de date de fin |
| **Fraîcheur** | Le champ se met-il à jour **comme sous-produit du travail** ? | tout ce qui exige une saisie dédiée (déplacer une carte = OK ; reporter un % = non) |
| **Propriété** | Qui agit quand ce chiffre bouge — CMT ou PAD ? | un KPI sans propriétaire est une décoration |

**Composition imposée : 3 + 1 + 1**
- **3 compteurs de retard/risque** (les seuls qui déclenchent une action, cible **0**) — ex. relances dues, livré non facturé, projets sans date de fin
- **1 forme** (donut/barre) — répartition du stock de travail
- **1 liste** (5-7 colonnes, triée par urgence) — le « et maintenant je fais quoi »

**Trois familles à ne pas confondre :** *retard/risque* (le cœur, cible 0) · *charge/forme* (1 seul widget) · *hygiène de donnée* (% de remplissage = **échafaudage temporaire**, à supprimer quand la cible est atteinte — l'afficher en permanence = avoir renoncé à corriger).

### ⚖️ La règle de l'argent (non négociable)
> Tout montant € affiché depuis Notion est **déclaratif** et doit porter le mot « déclaratif » ou « engagement » dans son libellé. Il n'est **jamais** posé à côté d'un chiffre Pennylane sans étiquette distincte — sinon on pilote sur deux vérités et on choisit celle qui arrange.

**Frontière : Notion pilote l'ENGAGEMENT (devis, commandes, livraison) · Pennylane pilote l'ARGENT (facturé, encaissé, trésorerie).**

---

## 3. Plan par Area

| Area | État actuel | KPI retenus | À créer | Effort | Prio |
|---|---|---|---|---|---|
| **Sales** | Gabarit présent mais **creux** : le « dashboard » est une table de 32 colonnes. Les vraies vues de pilotage existent déjà dans Deals mais ne remontent pas | 1. Pipeline pondéré ouvert (€ **déclaratif**) · 2. Relances dues *(→0)* · 3. Deals dormants >14j *(→0)* · 4. Funnel (donut) · 5. Liste open deals | Dashboard 5 widgets **réutilisant les vues existantes** · repointer le filtre SLA mort · table à 6 colonnes · réparer le lien Tasks | **S** | **1** |
| **Admin & Finance** | **Aucun pilotage** ; la section « Pilotage » ne contient que le coffre-fort en clair (cf. P0) ; les 2 bases stratégiques sont en bas de page | 1. Carnet non encaissé (€) · 2. **Livré non facturé** *(→0)* · 3. Échéances fiscales ≤30j *(→0)* · 4. Burn mensuel + donut · 5. Tâches admin en retard *(→0)* | Dashboard 5 widgets + **embed Looker/Pennylane** · **créer la base « Échéances fiscales & sociales »** · remonter Trésorerie/Dépenses · ranger n8n en annexe | **L** | **2** |
| **CX** | Annuaire de bases, aucun cockpit, pas de footer. Le rollup `Completion` existe mais est noyé | Projets actifs **sans date de fin** *(hygiène 17/23 → 0)* + charge client + livrables en retard | Cockpit + footer + remonter Completion | **M** | 3 |
| **Operations** | Tableaux **écrits à la main**, périmés (« Q1 2026 » fin juillet) · base `Untitled` orpheline | Tâches en retard *(→0)* · WIP réel · projets sans owner | Supprimer les tableaux manuels + base orpheline · cockpit natif | **M** | 4 |
| **Marketing / Product / Learning App** | Product : quatre `—` et une base `Mon travail` · libellés mensongers (« Chart Backlog » = table) | À définir après assainissement (la donnée ne passe pas encore le test *Source*) | Nettoyer d'abord, cockpit ensuite | **M** | 5 |

---

## 4. Ce qui bloque (KPI trompeurs tant que non corrigé)

| Donnée à assainir | KPI rendu faux aujourd'hui |
|---|---|
| **17/23 projets sans date de fin** | « projets en retard » (CX/Operations) |
| **90 % des Tasks sans échéance** | « tâches en retard », vues Today/Late |
| **8 Deals Won sans montant** | pipeline & CA déclaratif (sous-estimé) |
| **Client projects ↔ Deals lié 0/23** | charge client, rattachement CA ↔ delivery |
| **222/222 features à « Pas commencé »** | « avancement MVP » (Product) |
| **Espaces finaux dans les propriétés** | tout filtre/rollup/automatisation posé dessus |

> **Règle :** on n'affiche pas un KPI dont la source est vide à >30 %. On affiche à la place le **compteur d'hygiène** (« projets sans date de fin : 17 »), qui déclenche la correction — puis on le supprime.

---

## 5. Ordre d'exécution borné

1. **P0 sécurité** — sortir les secrets d'Admin & Finance vers un password manager.
2. **Sales** (effort S, gabarit déjà là) → sert de **page de référence** validée.
3. **Admin & Finance** (le plus critique : cash) — dont l'embed Looker/Pennylane.
4. **CX** puis **Operations**.
5. **Marketing / Product / Learning App** — assainir la donnée d'abord, cockpit ensuite.
6. Header/footer en **blocs synchronisés** dès la page 2 (sinon 7 maintenances).

---

*Fin — v1, 25 juillet 2026. Gabarit issu de l'audit live des 7 Areas.*
