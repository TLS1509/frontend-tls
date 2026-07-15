# Brief technique — Couche IA de la veille (collecte, fiabilité, synthèse)

*Rédigé le 2026-07-15 · Destinataire : Pierre-Armand (backend / plugins WP) · Auteur : Chloé*
*Statut : **proposition à discuter** — aucune décision prise, aucun code écrit.*

---

## 0. En une page

**Le problème**, côté opérationnel (pas côté code) : la veille TLS est semi-manuelle. La capture repose sur le fait qu'on pense à alimenter Notion — ce qui n'arrive pas de façon fiable. Les newsletters spécialisées reçues par mail ne sont dans aucun système. Les Tasks Perplexity produisent des résultats qui ne rejoignent rien automatiquement.

**Ce que ce brief demande** : trois capacités, dans cet ordre de valeur.

| # | Capacité | État dans les cahiers | Difficulté |
|---|---|---|---|
| 1 | **Collecte multi-canal** (RSS, newsletters mail, Perplexity) | Perplexity spécifié · RSS/newsletter absents des CDC **mais présents dans le contrat `wp-veille`** | Faible — le contrat existe déjà |
| 2 | **Vérification de fiabilité** (sourcing, cross-check, détection de claim non sourcé) | **Quasi absent de tous les cahiers** | Élevée — c'est le vrai sujet |
| 3 | **Synthèse approfondie** (regrouper N signaux → 1 analyse) | **Absent de tous les cahiers** | Élevée — nouveau au sens strict |

**Le garde-fou, non négociable** (c'est ta propre décision, cahier 12bis §Scope) :
> ❌ Auto-tagging Veille (supprimée, Pierre garde maîtrise) — ✅ BUT: Recommendation de tags (suggère, n'impose pas)

Rien dans ce brief ne remet ça en cause. **L'IA suggère, un humain valide.** Tout ce qui suit s'insère *avant* la queue de validation admin déjà spécifiée (01bis UJ#17), jamais à sa place.

---

## 1. Ce qui existe déjà — trois couches, pas une

Point important avant toute proposition : **il y a déjà trois représentations de la veille**, et elles ne disent pas la même chose. Le brief ne propose rien tant que ce désalignement n'est pas tranché.

### Couche A — Les cahiers (`docs/CDC/`)

- **`01bis_Items_Apprentissage_Veille.md`** possède la veille. 5 types : Dossier, Mag du mois, Tutoriel vidéo, Actu de la semaine, **Contenu Perplexity**.
  - **Pipeline Perplexity déjà spécifié** (fonctionnalités 6-7) : Admin configure l'API (clé, fréquence sync, catégories, mappings compétences) → fetch auto → store avec attribution de source → **déduplication** → auto-translate → **queue de validation Admin** → accept/reject.
  - **UJ#17 « Admin valide contenu Perplexity »** = le cœur du sujet fiabilité aujourd'hui : examen manuel (~2-5 min/article), critère « contenu approprié, utile, **pas marketing** », compétences pré-suggérées par l'IA que l'admin peut override.
  - Entités : `Veille` (avec `source` String, `source_url`, `status` ENUM Draft/PendingValidation/Published/Rejected/Archived), `VeilleContent` (`source_api`, `external_id`, `raw_content`), `VeilleRecommendation` (**humaine** : coach → apprenant), `VeilleCompletion`.
- **`12bis_IA_Features_Framework.md`** = le cadre IA. Principe : **« transparent + button-triggered ONLY »**. Deux features touchent la veille : #2 Recommandation IA Items (V1, validée, avec score de confiance + rationale affichés) et #5 Newsletter AI (V1, mensuelle, opt-out, mixe items + ressources veille + missions).
  - ⚠️ Ce cahier **n'a ni section « Modèle de Données » ni section « API »**. « Confidence scoring & hallucination detection » et « prompt versioning » sont listés dans le scope IN mais **spécifiés nulle part**.
- **`12_Chatbot_IA_et_QAR.md`** : la veille est une des 6 sources indexées du RAG. **« Pas de web search — réponses basées UNIQUEMENT sur contenu indexé »** → tout le sourcing externe passe par l'ingestion de 01bis. Seul mécanisme de péremption de tous les CDC : *Content Freshness* — flag si source citée > 6 mois.
- **`13bis_GDPR_AI_Act_Security.md`** : les contraintes (voir §4).

### Couche B — Le contrat API `wp-veille` (`src/services/plugins/monitoring.ts`)

**C'est la trouvaille de ce brief.** Le client REST du frontend expose déjà, sur `/tls/v1/monitoring/` :

```ts
interface VeilleSource { id, name, url, rss_feed?, category, active }

getSources():  GET    /tls/v1/monitoring/sources
addSource():   POST   /tls/v1/monitoring/sources   // { name, url, category, rss_feed? }
removeSource(): DELETE /tls/v1/monitoring/sources/:id

interface VeilleItem { id, title, description, source, source_url,
                       published_date, category, relevance_score?, saved, read }
getTrending(): GET /tls/v1/monitoring/trending
```

Autrement dit : **la gestion de sources RSS et un `relevance_score` existent déjà dans le contrat**, alors qu'ils ne sont dans aucun cahier. Ce contrat est *en avance* sur la spec, précisément sur le sujet de ce brief.

**Première question pour toi : ces endpoints sont-ils implémentés côté plugin, ou est-ce un contrat anticipé non câblé ?** Toute la suite en dépend — si `addSource(rss_feed)` fonctionne déjà, une grande partie de la « collecte » est un problème de peuplement, pas de développement.

### Couche C — Notion (l'opérationnel d'aujourd'hui)

La base **`Sources`** ([lien](https://app.notion.com/p/2a7cdd696db680579c5bfaa23c2b0ea7)) — 102 lignes. Schéma riche : `Flux RSS`, `URL / Flux`, `Type de source` (16 options dont Newsletter et RSS), `Statut` (Actif/Pause/Archivé), `Importance`, `Fréquence attendue`, `Type de veille`, `Domaine`, `Thèmes`.

**Le mapping avec `wp-veille` est presque 1:1** :

| Notion `Sources` | `wp-veille` `VeilleSource` |
|---|---|
| `Flux RSS` | `rss_feed` |
| `URL / Flux` | `url` |
| `Statut` = Actif | `active` |
| `Domaine` | `category` |
| `Name` | `name` |
| `Importance`, `Fréquence attendue`, `Type de veille`, `Thèmes` | *(pas d'équivalent)* |

État réel des données (vérifié le 2026-07-15, requête directe) : **`Flux RSS` rempli sur 1/102**, `URL / Flux` sur 97/102, `Statut` **0/102**, `Importance` **0/102**, `Fréquence attendue` **0/102**. Donc : beaucoup de sources listées, presque aucune exploitable en l'état.

> **Deuxième question, structurante : qui est la source de vérité des sources — Notion ou `wp-veille` ?**
> - Notion maître → il faut un sync Notion → WP (et Notion devient une dépendance de prod).
> - WP maître → Notion redevient un simple espace de travail éditorial, et les 102 lignes sont à migrer une fois.
> - Les deux → il faut un sync bidirectionnel, c'est-à-dire des conflits à arbitrer. **À éviter.**
>
> Mon avis : **WP maître**, Notion pour le travail éditorial humain. Mais c'est ton appel, c'est ton runtime.

### Couche D — Le frontend (ce repo, pour info)

`src/data/veilleData.ts` = mock statique, 6 items, 4 types (**pas de type `perplexity`**), `sourceLabel?` déclaré mais **utilisé par 0 item sur 6** — aucun item n'a de source traçable. C'est un mock de design, il ne prétend rien. Il devra s'aligner sur le contrat `wp-veille` le jour où on branche du réel ; ce n'est pas l'objet de ce brief.

---

## 2. Capacité 1 — Collecte multi-canal

### Les 3 canaux et leur nature

| Canal | Volume | Nature | Chemin proposé |
|---|---|---|---|
| **RSS** (blogs, médias, podcasts) | ~97 sources listées, à qualifier | Public, structuré, pull | `VeilleSource.rss_feed` + un poller |
| **Newsletters mail spécialisées** | Poignée, haute valeur | Privé (boîte perso), push, **pas de flux public** | Voir ci-dessous |
| **Perplexity Tasks** | Scheduled, régulier | Déjà synthétisé, sourcé | Pipeline 01bis existant |

### Le cas newsletter — le point non trivial

Ces newsletters arrivent dans une **boîte mail perso**. Elles n'ont pas de flux public. Deux façons de les faire entrer :

- **Option N1 — Bridge email→RSS** (ex. Kill the Newsletter, gratuit) : une adresse dédiée par newsletter, chaque numéro devient une entrée RSS. **Avantage décisif : la newsletter devient un `VeilleSource` avec un `rss_feed` comme les autres.** Un seul mécanisme d'ingestion pour tout, `Type de source = Newsletter` reste juste un tag. Le plugin ne sait même pas que c'est un mail.
- **Option N2 — Lecture IMAP/Gmail directe** (via Make.com ou dans le plugin) : plus direct, mais introduit un second chemin d'ingestion à maintenir, et un accès à une boîte mail perso dans le périmètre de prod — ce qui, avec les règles de 13bis (pas de PII dans les logs, secrets en vault), est une surface de conformité inutile.

**Reco : N1.** Uniformiser sur RSS n'est pas du dogme, c'est ce qui permet à *un seul* poller de couvrir les 3 canaux. Le bridge est un détail d'infra externe, pas une dépendance de prod.

### Le cas Perplexity — ne rien réinventer

Les Tasks livrent **in-app + un aperçu tronqué par mail**. Le mail ne contient pas le contenu complet → **ne pas construire d'extraction automatique sur le teaser**, ce serait fragile pour un résultat partiel. Le pipeline Perplexity API de 01bis (fonctionnalités 6-7) est déjà le bon chemin ; les Tasks du Space restent un outil de travail humain, dont les résultats intéressants sont poussés à la main.

### Où tourne le poller ?

| Option | Avantages | Inconvénients |
|---|---|---|
| **P1 — WP-Cron dans `wp-veille`** | Tout dans l'app · pas de dépendance externe · logs et secrets déjà cadrés par 13bis | WP-Cron est déclenché par le trafic (peu fiable sans `DISABLE_WP_CRON` + vrai cron système) · c'est du dev à écrire |
| **P2 — Make.com → `POST /monitoring/items`** | Rapide à monter · connecteurs RSS/Gmail prêts · zéro dev backend | Dépendance externe dans le chemin critique · un abonnement · la logique de veille vit hors du repo |
| **P3 — Hybride** : Make.com pour la capture/normalisation, `wp-veille` pour scoring + persistance + log | Découplé · le scoring et son log restent dans l'app (**requis par 13bis, cf. §4**) | Deux systèmes à comprendre |

**Reco : P3 pour démarrer, P1 comme cible.** Make.com permet de valider le pipeline en quelques jours sans t'engager sur du dev ; si ça tient, le poller migre dans le plugin. **Ce qui n'est pas négociable, c'est que le scoring et son log vivent dans l'app** — pas pour des raisons d'élégance, mais parce que 13bis l'impose (§4).

---

## 3. Capacité 2 — Fiabilité (le vrai blanc)

### Ce que les cahiers prévoient aujourd'hui, en tout et pour tout

1. Une **relecture humaine** de 2-5 min/article, critère « approprié, utile, pas marketing » (01bis UJ#17).
2. Un **plagiarism check** mentionné en une ligne, **outil non nommé**, pour le copié-collé verbatim.
3. Un **flag de fraîcheur > 6 mois**, **côté chatbot uniquement** (cahier 12).

C'est tout. Il n'y a **rien** sur : vérification factuelle, cross-checking multi-sources, détection de claim non sourcé, réputation de source, distinction fait/opinion, détection de contenu IA-généré, correction post-publication. « Hallucination detection » est dans le scope de 12bis et **n'est spécifié nulle part** — c'est un blocker Phase 14 encore ouvert dans le cahier 12.

Or c'est exactement ce dont la veille a besoin : le bruit du secteur EdTech/L&D, ce sont des **chiffres invérifiables recyclés de source en source** et du contenu d'éditeur déguisé en étude.

### Ce qui est techniquement faisable — et ce qui ne l'est pas

Soyons honnêtes sur les limites : **une IA ne peut pas déclarer qu'un fait est vrai.** Ce qu'elle peut faire, et qui a de la valeur ici :

| Vérification | Faisable ? | Ce que ça donne concrètement |
|---|---|---|
| **Repérer les claims chiffrés non sourcés** | ✅ Oui, fiable | « Cet article affirme "+40% de productivité" sans citer de source » |
| **Détecter la circularité** (tout le monde se cite entre soi) | ✅ Oui, si on garde l'historique | « Ce chiffre vient de 3 articles qui citent tous le même billet de blog » |
| **Repérer le conflit d'intérêt** | ✅ Oui | « L'étude est publiée par l'éditeur qui vend la solution » |
| **Distinguer fait / opinion / marketing** | ✅ Oui, c'est ce que fait déjà l'humain en 2-5 min | Pré-tri avant la queue admin |
| **Cross-check multi-sources d'un chiffre** | 🟡 Partiellement | Demande de retrouver la source primaire — coûteux, faisable sur les claims marqués « à vérifier » seulement |
| **Affirmer qu'un fait est vrai** | ❌ Non | À ne jamais promettre |

**La bonne formulation de l'objectif** : pas « l'IA vérifie », mais **« l'IA prépare la vérification »** — elle produit un pré-tri motivé qui fait passer la relecture humaine de 2-5 min à ~30 s, en pointant *ce qu'il faut aller regarder*. Ça reste 100% compatible avec « l'IA suggère, l'humain valide » : ça rend la validation plus rapide, ça ne la remplace pas.

### Ce que ça implique en données

Un `relevance_score` (déjà dans le contrat) ne suffit pas : un score nu n'est pas actionnable et n'est pas conforme à 13bis, qui **exige un `rationale`**. Il faut, par item :

- `relevance_score` FLOAT — existe déjà dans le contrat ✅
- `reliability_flags` JSON — la liste motivée des signaux (`unsourced_claim`, `vendor_published`, `stale_source`, `circular_citation`…)
- `rationale` TEXT — **obligatoire (13bis)**
- `confidence_score` FLOAT — **obligatoire (13bis)**

> **Troisième question : où s'insère ce scoring ?** Ma proposition : **entre l'ingestion et la queue de validation** (statut `PendingValidation` de 01bis). L'item arrive déjà scoré et annoté dans la queue que tu connais. Aucun écran nouveau, aucun workflow nouveau — la queue existante affiche juste plus d'information.

---

## 4. Contraintes de conformité — non négociables, elles existent déjà

Toutes issues de `13bis` (+ `12` pour le RAG). **Ce ne sont pas des propositions, elles s'appliqueront** :

1. **Label « AI Generated »** sur toute synthèse ou reco produite (AI Act Transparence).
2. **`rationale` + `confidence_score` loggés à chaque décision** (explainability). → c'est ce qui force le scoring à vivre dans l'app.
3. **Human override avec motif obligatoire** + notification de l'apprenant si ça le concerne.
4. **Fairness metrics** périodiques + alerting compliance officer au dépassement de seuil.
5. **Consentement granulaire** (`UserAIConsents.aiRecommendations` / `aiContentSuggestions`) à vérifier **avant** toute newsletter ou reco.
6. `ai_decisions` **inclus dans l'export DSAR** (Art. 15) · `audit_logs` retenus **3 ans**.
7. **Citation de source obligatoire** + fallback sous seuil de confiance.
8. Secrets Perplexity/Mistral **en vault/env, jamais en config** + rotation · **pas de PII dans les logs** · rate limiting.

Entités existantes : `ai_decisions` (user_id, decision_type, recommendation JSONB, rationale, confidence_score, is_overridden) · `ai_overrides` (override_reason **requis**) · `audit_logs`.

> ⚠️ **`ai_decisions.decision_type` ne liste que** `competence_match`, `project_suggestion`, `learning_path_recommendation` — **aucun type veille/curation**. À étendre (ex. `veille_relevance`, `veille_reliability`).

---

## 5. Capacité 3 — Synthèse approfondie

**Aucun cahier ne la couvre.** À vérifier avant tout : le « Dossier » est **100% manuel** aujourd'hui (01bis UJ#13 : l'auteur rédige l'éditorial, sélectionne les articles en drag-drop). 12bis exclut les AI-Generated Items en V1, et la feature V2 #6 se limite à générer Flashcards/Tips/Summaries **depuis une leçon**, pas depuis un corpus de veille. La feature #8 « AI-Generated Items » est explicitement **OUT** (« → fait via tes propres agents + Outil Auteur V4 »).

**Conclusion honnête : c'est du nouveau au sens strict, et c'est le morceau le plus lourd.** Vu que #8 est déjà renvoyé « hors app, via agents externes », il y a une cohérence à traiter la synthèse de la même façon : **hors app, en outil de travail** (ce que je peux faire de mon côté), et n'entrer dans l'app que le livrable validé. Je ne propose pas de la mettre dans le plugin en V1.

**Ce qui a du sens en V1, en revanche** : un **clustering** (« 4 items cette semaine parlent du même sujet ») pour préparer le travail éditorial. C'est peu coûteux si on a des embeddings — mais voir le gap §6.

---

## 6. Gaps de données à trancher

| Entité | État réel | À faire |
|---|---|---|
| **IA Decision log** | Existe (`ai_decisions` + `AIDecisionLog` frontend) | **Étendre `decision_type`** aux types veille |
| **Embedding** | Existe **uniquement** pour le chatbot (`KnowledgeBase.embedding`) — **aucun embedding sur `Veille`** | À créer si on veut dedup sémantique / clustering / reco |
| **Prompt version** | **Cité 2× en passant dans 12bis, zéro entité, zéro champ, zéro workflow** | À créer (sinon aucun moyen de savoir quel prompt a produit quelle décision) |
| **Recommendation** | **Aucune entité.** Les recos IA sont transitoires : générées au clic, affichées, **non persistées** | ⚠️ **Bloquant, voir ci-dessous** |
| **Confidence threshold** | Champ présent, mais **le seuil « X% » n'est chiffré nulle part** dans aucun cahier | À décider (une valeur, même arbitraire, puis calibrer) |
| **Fiabilité de source** | `Veille.source` = **String libre**. Pas d'entité `VeilleSource` dans les CDC (elle n'existe que dans `monitoring.ts`) | Réconcilier CDC ↔ contrat |
| **Déduplication** | Mentionnée en **une ligne dans 01bis, sans algorithme** (exact match ? sémantique ? seuil ?) | À spécifier |

> ⚠️ **Le point bloquant à te signaler** : sans table de recommandations persistée, **les KPI que les cahiers eux-mêmes fixent sont inmesurables** — Feature #2 vise « >90% acceptance rate », Feature #5 vise « >25% CTR, >50% completion ». On ne peut pas mesurer un taux d'acceptation de recommandations qu'on ne stocke pas. Ça se règle en V1 ou ces KPI restent décoratifs.

---

## 7. Contradictions inter-cahiers — à arbitrer

Relevées en lisant, pas inventées. Elles ne bloquent pas le brief mais elles bloqueront l'implémentation :

| Sujet | Position A | Position B |
|---|---|---|
| Auto-tagging veille | **supprimé** (12bis) | **V2** (01bis, 2×) |
| Recommandation IA items | **V1** (12bis) | **V2** (01bis, 2×) |
| 12bis Feature #5 | « AI Coach Matching » (roadmap) | « **Newsletter AI** » (validation 6-point) |
| 12bis Feature #6 | « AI-Generated Items, V2 » | « Churn Alerts, V1 » |
| Events IA | `Event` générique (cahier 10) | `ai_decisions` (13bis) — **lequel porte les events veille ?** |
| Shape veille frontend | `veilleData.ts` (4 types, mock) | `monitoring.ts` (REST, + `VeilleSource.rss_feed` hors CDC) |

À noter aussi : le cahier 10 (Analytics) **ne contient aucun event IA ni aucun event veille** dans son inventaire MVP → le logging des décisions IA vit bien dans `ai_decisions` (13bis), pas dans Analytics. À confirmer.

---

## 8. Ce que je propose concrètement

**Séquencé par valeur/effort, pas comme un tout.** Chaque étape a de la valeur seule.

| Étape | Contenu | Dépend de | Effort estimé* |
|---|---|---|---|
| **0** | **Répondre aux 3 questions** : (a) les endpoints `sources` de `wp-veille` sont-ils implémentés ? (b) Notion ou WP maître ? (c) le scoring s'insère-t-il avant la queue de validation ? | — | discussion |
| **1** | **Qualifier les 102 sources Notion** : résoudre les `Flux RSS`, poser `Statut`/`Importance`. Zéro dev, c'est du travail éditorial — je le prends. | 0(b) | ~1 j (moi) |
| **2** | **Bridge newsletters → RSS** (Kill the Newsletter) : les newsletters deviennent des `VeilleSource` normales | 1 | ~2 h (moi) |
| **3** | **Poller RSS** → items en `PendingValidation` avec `source`/`source_url` remplis. Make.com d'abord (P3) | 0(a), 2 | qq j |
| **4** | **Scoring pertinence + fiabilité** (Mistral) → `relevance_score`, `reliability_flags`, `rationale`, `confidence_score`. Étendre `ai_decisions.decision_type` | 3, §4 | à chiffrer |
| **5** | **Clustering** (nécessite embeddings sur `Veille`) | 4 | à chiffrer |

\* *Les estimations « moi » sont fiables. Celles côté plugin, je ne les chiffre pas — c'est ton terrain, je ne connais pas ce code.*

**L'étape 1 est la plus rentable et ne dépend d'aucun dev** : 97 sources ont déjà une URL mais presque aucune n'a de flux résolu. Tant que ce n'est pas fait, aucun poller n'a rien à lire — quel que soit l'endroit où il tourne.

---

## 9. Hors scope de ce brief

- **La sortie apprenant** (pages `/veille`, `/magazine`, les livrables éditoriaux) — c'est un autre sujet, couvert par [`BRIEF-LEARNING-SPACE-VEILLE.md`](BRIEF-LEARNING-SPACE-VEILLE.md) (UX/DS).
- **Le RAG chatbot** (cahier 12) — la veille l'alimente, mais l'indexation est son sujet à lui.
- **La newsletter sortante TLS** (Brevo & co) — c'est de la diffusion, pas de la captation.
- **Le frontend** (`veilleData.ts`) — restera mock tant que le contrat n'est pas câblé ; s'alignera ensuite sur `wp-veille`, pas l'inverse.

---

## 10. Provenance de ce brief — ce qui est vérifié et ce qui ne l'est pas

Par honnêteté sur le niveau de confiance, vu qu'on a déjà eu des docs qui affirmaient des choses non vérifiées :

**Vérifié de première main** :
- Les 5 cahiers cités ont été **lus** dans `docs/CDC/` (12bis, 12, 01bis, 13bis, 10). Les citations et numéros de ligne en viennent.
- `src/services/plugins/monitoring.ts` et `src/data/veilleData.ts` : **lus intégralement**.
- L'état de la base Notion `Sources` (102 lignes, taux de remplissage) : **requête SQL directe sur la data source**, le 2026-07-15.

**Non vérifié — à confirmer par toi** :
- **Si les endpoints `wp-veille` sont réellement implémentés côté plugin** ou si `monitoring.ts` est un contrat anticipé. Je n'ai pas accès au repo backend. C'est la question la plus structurante du brief.
- Les estimations d'effort côté plugin — non chiffrées volontairement.
- L'état réel de la clé API Mistral (le `CLAUDE.md` dit « P0-1 ✅ », non revérifié).
