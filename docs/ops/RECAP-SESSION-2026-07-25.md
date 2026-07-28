# Récap de session — 25 juillet 2026

> **Point de départ :** « une étude de marché pour la Learning App ».
> **Point d'arrivée :** un réalignement stratégique + une réorganisation opérationnelle en cours d'exécution.
> **Usage :** interne · **À lire en début de prochaine session.**

---

## ⚠️ À savoir avant de reprendre

**Les livrables stratégiques (§1) sont en cours de relecture par Chloé** — elle a signalé des informations inexactes et doit repasser dessus. **Ne pas les considérer comme validés.** Les corrections déjà identifiées sont listées en §4.

---

## 1. Livrables produits (repo)

| Doc | Contenu | Statut |
|---|---|---|
| [`product/ETUDE-VIABILITE-LEARNING-APP.md`](../product/ETUDE-VIABILITE-LEARNING-APP.md) (+ `.docx`) | Étude de viabilité complète : marché France/Europe sourcé, SWOT, 3 scénarios, annexes SBO & IA + fiabilité des sources | 🟡 **à relire** (contient des erreurs signalées) |
| [`product/STRATEGIE-REALIGNEMENT-H2-2026.md`](../product/STRATEGIE-REALIGNEMENT-H2-2026.md) | Challenge des 3 docs stratégie de PAD + positionnement réaligné + roadmap H2 en 3 blocs + 6 décisions | 🟡 **à relire** |
| [`ops/REORG-OPS-DONNEES-STACK-H2-2026.md`](REORG-OPS-DONNEES-STACK-H2-2026.md) | Carte de localisation, verdict stack, sync Pennylane, état des 11 bases, séquence | ✅ corrigé le 25/07 |
| [`ops/GABARIT-PORTAILS-AREA-NOTION.md`](GABARIT-PORTAILS-AREA-NOTION.md) | Gabarit des 7 portails Area + les 5 tests du KPI + plan par Area | ✅ corrigé le 25/07 |
| [`ops/CARTE-SYSTEME-TLS.md`](CARTE-SYSTEME-TLS.md) | 4 schémas Mermaid (outils, arborescence, flux, cible) | 🟡 incomplet (voir §4) |

## 2. Actions appliquées dans Notion (toutes réversibles)

- **19 docs archivés** : 15 Design System périmés + 4 stratégie/études 2025. **Les CDC sont intacts** (ils restent à Pierre).
- **Vue « Triage » de la base Docs** : 12 → **0**.
- **Registre des bases** : `Activities` renommé **`Communications`**.
- **[Page Sales](https://app.notion.com/cdb8adcc3e6143438edf46f61164137c) reconstruite au gabarit** — cockpit, hygiène, exécution, ressources, footer.
- **5 meetings renommés** (pilote de backfill).

## 3. Les découvertes qui comptent

1. **TLS n'est pas pré-produit.** Business réel : CA carnet **82,9 K€ (2025) → 117 K€ (juil. 2026)**, book ~170 K€, clients réels (AFDAS, FFB, C-Campus, Orange, Equans, IDEX…). *Mon diagnostic initial « prototype » était faux — il venait de l'analyse du repo `frontend-tls`, qui n'est pas le produit de prod.*
2. **Le goulot est l'encaissement, pas la vente** : ~35 K€ facturé sur ~117 K€ commandé.
3. **C-Campus = partenaire ET canal de facturation** vers les grands comptes (référencé achats). À ne surtout pas lâcher.
4. **Le point de rupture unique = « Deal gagné »** : le bouton ne déclenche rien → 4 symptômes de la même cause (`pennylane_id` vide, Client projects↔Deals 0/23, dossiers Drive manuels, retard de facturation).
5. **Les specs sont excellentes, l'exécution ne suit jamais.** Audit workflows (fév.), spec Pennylane↔n8n (avr.), roadmap Mapping (avr.) : tout est bien conçu, rien n'est activé.
6. **Le sync Pennylane→Notion était le mauvais objectif.** La règle correcte est déjà écrite dans la roadmap de Chloé : *« liens Pennylane, sans montants de référence dans Notion »*.
7. **🔴 P0 sécurité : identifiants en clair** dans la page [Admin & Finance](https://app.notion.com/8ee4756da6bb4139b7feb4a9da5fb78c). Notion n'est pas chiffré de bout en bout et est lisible par toutes les intégrations. **À sortir vers 1Password/Bitwarden.**

## 4. Erreurs commises et corrigées (à ne pas refaire)

| Erreur | Correction |
|---|---|
| « Produit inexistant / prototype » | Faux — produit réel en prod chez un grand compte |
| « Dinootoo = partenaire de dev » | Non — c'est **l'IA interne d'Orange** ; TLS formait leurs équipes à l'utiliser |
| « ~52 K€ à facturer » | **Non fiable** — la facturation passe parfois par C-Campus |
| « Bases enfants sur la page Sales = doublons » | Non — ce sont des **vues liées filtrées** sur Company Area (le bon pattern) |
| **« 358 meetings fantômes à purger »** | 🔴 **Grave** — ce sont de **vraies AI meeting notes** (résumés, action items, transcripts). Une purge aurait détruit l'historique client |
| Carte système incomplète | Manquent : Media Vault, Decision Log, Prompt Book, Perplexity Spaces, bases Learning App, Veille, Product, Assets & livrables |

> **Leçon transverse : ne jamais conclure « vide » depuis les seules propriétés — toujours ouvrir le contenu d'un échantillon avant tout archivage de masse.**

---

## 5. Ce qui reste à faire (prochaine session)

### 🔴 Priorité 1 — Sécurité & cash
- [ ] **Sortir les identifiants** d'Admin & Finance vers un password manager *(Chloé — 30 min)*
- [ ] **Passer Pennylane en Essentiel** (~24 €/mo) → débloque relances auto + prévisionnel + notes de frais
- [ ] **Facturer le livré non facturé** — d'abord **définir qui facture** (TLS direct vs C-Campus) via une propriété « Facturé par » sur le Deal

### 🟠 Priorité 2 — Finir le backfill Meetings
- [ ] **Script de backfill** : 353 pages restantes → extraire le titre du bloc meeting-note → `Name`
- [ ] Repérer les meetings **réellement vides** (~1/5 dans le pilote) → ceux-là seulement peuvent être archivés
- [ ] Étape 2 : `Event time`, `Status`, rattachements Deal/Entreprise (avec validation)

### 🟡 Priorité 3 — Portails & bases
- [ ] **3 gestes UI sur Sales** (~15 min, listés dans les Annexes de la page) : assembler la vue Dashboard · **réparer le filtre mort** de *Premiers contacts en retard* (option « Demande de contact » n'existe plus → vue vide en permanence) · passer header/footer en blocs synchronisés
- [ ] **Admin & Finance** au gabarit (après le P0 sécurité)
- [ ] Puis CX, Operations, Marketing, Product, Learning App
- [ ] **Compléter le Registre des bases** : 11 → ~24 bases
- [ ] Corriger les **espaces finaux** dans les noms de propriétés (⚠️ auditer les références AVANT de renommer)
- [ ] Regrouper les statuts mal rangés (« Paused »/« On hold » dans le groupe *Complete*)

### 🟢 Priorité 4 — Automatisation (après hygiène)
- [ ] **Deal gagné → devis Pennylane + dossier Drive + Client project** *(le câble qui répare 4 symptômes)*
- [ ] Sync retour Pennylane → Notion : **4 champs seulement** (devis signé / facturé / payé / montant)
- [ ] Alertes anti-oubli (livré non facturé, impayé > 30 j, deal sans relance)
- [ ] **Décision outillage : script + cron plutôt que Notion Agents** (agents = coût au crédit, imprévisible → écartés par Chloé)

### 🔵 Stratégie (après relecture de Chloé)
- [ ] Intégrer ses corrections dans les 2 docs stratégiques
- [ ] Trancher les 6 décisions du §6 de [`STRATEGIE-REALIGNEMENT-H2-2026.md`](../product/STRATEGIE-REALIGNEMENT-H2-2026.md) — dont **Qualiopi/OPCO** (bloque le module AI Act) et **venture ou boutique**
- [ ] **Fenêtre AI Act Art. 4** : vendable maintenant, en direct entreprise ou via C-Campus (Qualiopi). ⚠️ Jamais de fear-selling (« 15 M€ ») — il n'y a **aucune amende dédiée à l'Art. 4**
- [ ] **CII** (Crédit Impôt Innovation) : jusqu'à 80 k€/an sur le dev de la Learning App, imputable exercice 2026
- [ ] Compléter la carte système avec les domaines manquants (§4)

---

## 6. Principes à garder (validés cette session)

1. **Aucun chiffre ni process critique ne dépend d'une saisie manuelle.** Notion est alimenté par des flux.
2. **Notion pilote l'ENGAGEMENT · Pennylane pilote l'ARGENT.** Tout € dans Notion est *déclaratif* et étiqueté comme tel.
3. **Une page Area ne se remplit pas, elle se lit.** 3 compteurs cible-0 + 1 forme + 1 liste, max 6 widgets.
4. **On n'affiche pas un KPI dont la source est vide à >30 %** — on affiche le compteur d'hygiène, puis on le supprime.
5. **Nettoyer la donnée s'intercale entre « schéma propre » et « dashboards ».** Purge = automatisable ; backfill = ciblé + stop-the-bleeding, jamais un grand chantier.
6. **Vérifier avant d'archiver.** Toujours ouvrir un échantillon.

---

*Fin — session du 25 juillet 2026.*
