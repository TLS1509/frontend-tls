# Sitemap — Site V1 The Learning Society

> **Source de vérité de l'arborescence.** Établi le 2026-07-28 en croisant le sitemap validé
> (Notion « Vision Stratégique & Messages Clés » §6), les décisions de la réunion du 28/07
> ([RECAP](propositions-PAD/RECAP-REUNION-2026-07-28.md)) et **les routes réellement déclarées
> dans `src/App.tsx`**. En cas d'écart, c'est le code qui fait foi — ce fichier le documente.
>
> ⚠️ La base Notion « Website pages » est **périmée** et ne doit pas servir de source
> (elle liste des fichiers React supprimés). Voir §5.

---

## 1. Arborescence

```
/website                                    Accueil
│
├── /learning-app                           Learning App  ─────┐
│      └── #bibliotheque                    Bibliothèque de compétences (ancre, pas une route)
│
├── Accompagnement (dropdown, pas de page hub)
│   ├── /studio                             Studio IA & Pédagogie
│   ├── /upskilling                         Upskilling sur-mesure
│   └── /accompagnement                     Déploiement IA & SBO (méthode STRIDE)
│          └── /methode                     Méthode TLS  (sous-page, accès depuis STRIDE seul)
│
├── Ressources (dropdown, pas de page hub)
│   ├── /diagnostic                         Autodiagnostics SBO & IA
│   ├── /vigie                              La Vigie IA (newsletter)
│   └── /resources                          Magazine & Ressources (hub)
│       ├── /resources/:slug                Article           (template)
│       ├── /dossiers/:slug                 Dossier           (template)
│       ├── /guides/:slug                   Guide             (template)
│       ├── /videos/:slug                   Vidéo             (template, en veille V1)
│       └── /webinaires/:slug               Webinaire         (template, en veille V1)
│
├── /contact                                Contact  ← point de conversion de tout le site
├── /waitlist                               Accès anticipé
├── /equipe                                 Les Fondateurs  (accès footer, pas nav)
│
└── Légales (footer)
    ├── /mentions-legales
    ├── /politique-confidentialite
    ├── /cgv-cgu
    └── /charte-ia
```

**Redirections actives** (liens historiques préservés) :

| Ancienne route | Redirige vers | Raison |
|---|---|---|
| `/website/formation` | `/website/learning-app` | Page Formation retirée du V1 (03/07 puis confirmé 28/07) |
| `/website/magazine` | `/website/resources` | Hub unique pour tous les formats |
| `/website/dossiers` | `/website/resources` | idem |
| `/website/ressources` | `/website/resources` | doublon de graphie |
| `/website/temoignages` | `/website` | Cas clients retirés du V1 (cas fictifs vs FACTS-CANON) |

---

## 2. Statut par page

| Page | Route | Copy source | Design | Statut V1 |
|---|---|---|---|---|
| Accueil | `/website` | PAD-page-homepage | refondu 28/07 | ✅ |
| Learning App | `/learning-app` | PAD-page-learning-app | refondu 28/07 | ✅ |
| Bibliothèque de compétences | ancre | PAD-page-bibliotheque-competences | refondu 28/07 | ✅ |
| Studio IA & Pédagogie | `/studio` | PAD-page-studio-ia-pedagogie | créé 28/07 | ✅ |
| Upskilling | `/upskilling` | PAD-page-upskilling | refondu 28/07 | ✅ |
| Déploiement IA & SBO (STRIDE) | `/accompagnement` | PAD-page-accompagnement-stride | refondu 28/07 | ✅ ⚠️ libellé nav non tranché |
| Méthode TLS | `/methode` | PAD-page-methode-tls | refondu 28/07 | ✅ |
| Autodiagnostics | `/diagnostic` | PAD-page-autodiagnostic + prototype PAD | refondu 28/07 | ✅ |
| La Vigie IA | `/vigie` | Stratégie Contenu B2B §5 (structure éditoriale réelle) | créé 28/07 | ✅ |
| Les Fondateurs | `/equipe` | PAD-page-fondateurs | refondu 28/07 | ✅ |
| Magazine & Ressources | `/resources` | PAD-blog-magazine-strategie | **antérieur (03/07)** | 🟡 contenu à arbitrer |
| Contact | `/contact` | aucune (réunion : garder l'existante) | **antérieur**, claims purgés 28/07 | 🟡 |
| Accès anticipé | `/waitlist` | aucune | **antérieur** | 🟡 promesse à aligner |
| Légales ×4 | — | — | **antérieur** | 🟡 jamais repassées au pivot |

---

## 3. Templates de contenu — ce que la stratégie exige vs ce qui existe

Le [doc de cadrage Magazine](propositions-PAD/PAD-blog-magazine-strategie.md) §3 définit
**4 formats d'articles**, pas 5 types de contenus. Correspondance :

| Format stratégie | Volume | Template qui le sert | État |
|---|---|---|---|
| Guides piliers (evergreen) | 2 000+ mots, chapitré, sourcé | **Dossier** | ✅ 1 contenu réel |
| Décryptages méthodologiques | 1 200-1 500 mots | **Article** | ✅ 15 contenus |
| Playbooks / grilles pratiques | 800-1 000 mots, checklists, téléchargeables | **Guide** (PDF, gate email) | ⚠️ placeholders |
| Interviews & cas clients | 1 000-1 200 mots | **Article** (variante) | ❌ aucun contenu |

**Vidéos et Webinaires ne figurent pas dans la stratégie éditoriale validée.** Leurs templates
existent et fonctionnent, mais sans contenu réel et sans rôle défini.

→ **Reco V1 : 3 templates actifs** (Article, Dossier, Guide) · **2 en veille** (Vidéo, Webinaire),
masqués tant qu'il n'y a pas de contenu réel.

### ⚠️ Écart bloquant : les 3 points de conversion manquent

La stratégie §4 exige que **chaque article** porte trois points de contact :

1. **CTA milieu d'article** → lancer un Autodiagnostic
2. **Bandeau bas d'article** → s'abonner à La Vigie IA
3. **Sticky sidebar** → demander une démo

Vérifié le 28/07 : `MarketingArticleDetail.tsx` et `MarketingDossierDetail.tsx` en contiennent
**zéro**. Le blog est beau mais ne convertit pas, alors que son objectif déclaré est
« acquisition SEO brute et génération de MQL ».

---

## 4. `public/sitemap.xml`

Le fichier XML servi aux moteurs doit lister les pages **indexables** : ni les légales
(faible valeur SEO, tolérées), ni les routes de redirection, ni les templates `:slug`
sans contenu réel. Régénéré le 28/07 — voir §2 pour le périmètre.

---

## 5. Cohérence Notion ↔ code

La base Notion « Website pages » n'est **pas** synchronisée et ne doit pas servir de source :
elle contient des lignes pointant vers `MarketingConseil.tsx`, `MarketingFormation.tsx` et
`MarketingMagazine.tsx`, **trois fichiers qui n'existent plus**, et des URLs en `/marketing/*`
alors que les routes réelles sont en `/website/*` depuis le 03/07.

Conformément à la règle actée le 28/07
([README propositions-PAD](propositions-PAD/README.md)) : **le repo est la vérité, Notion est
l'atelier.** Ce fichier est le miroir documentaire de `src/App.tsx`.
