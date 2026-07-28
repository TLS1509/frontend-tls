# Reprendre le chantier de correction des parcours TLS

**Dernière mise à jour : 24 juillet 2026.**

> **Réorganisé le 24/07/2026.** Les modules sont désormais rangés par parcours :
> `1-Ingenierie-Pedagogique/`, `2-Neuro-Education/`, `3-UX-UI-Product-Management/`,
> `4-Recherche-et-Strategie/`. Index complet : `INDEX.md` à la racine. Ce fichier et
> le convertisseur sont dans `_outils/`. Ce fichier est le point d'entrée pour
continuer. Le prompt de reprise est en bas.

---

## Ce qui a été fait

| Parcours | État | Où |
|---|---|---|
| **Ingénierie Pédagogique** | ✅ 10/10 modules corrigés | `MODULE-1..10-corrige.docx` (+ `.md`) |
| **UX/UI Design & PM EdTech** | ✅ **12/12** — M1-4/M8 corrigés · M5-7 rédigés · M9-11 rédigés (24/07) | `UXUI-MODULE-*.docx` |
| **Neuro-Éducation** | ✅ **10/10 livrés** (issus de la réécriture existante, découpée) | `NEURO-M01..M10.docx` |
| **Recherche documentaire** | ✅ validité des 6 frameworks IP + biblio vérifiée | `RECHERCHE-frameworks-IP.docx` |

**Reste à faire** : plus rien sur les 3 parcours existants.

Chantier restant : **plus rien sur les 3 parcours existants.** Les 12 modules
UX/UI, les 10 IP et les 10 Neuro sont livrés.

Reste éventuel, hors périmètre « modules » : le **module 12 UX/UI** (projet final)
avait deux briefs contradictoires — garder le brief « Vue d'ensemble » (2 parcours
réels), supprimer le brief « détail » (15 000 apprenants, équipe de 12…). Et tout
le **volet marketing** UX/UI (landing pages, emails, sales deck, études de cas)
reste non écrit — mais ce n'est pas de la formation.

⚠️ **UX/UI M5, M6, M7, M9, M10, M11** ne sont **pas** à corriger : ce sont des
plans à puces / listes « Key Topics » dans le Drive. Ils sont à **écrire**, ce qui
est un autre chantier.

---

## Méthode établie (à reproduire)

1. **Lire le module source** sur Drive (connecteur en lecture seule pour
   l'existant ; il peut créer de nouveaux fichiers mais pas modifier).
2. **Croiser avec le fact-check** correspondant (voir ci-dessous) — ils sont
   claim-par-claim et donnent les vraies sources.
3. **Produire un module complet en markdown**, version modifiée, corrections
   intégrées (pas un document « avant/après »).
4. **Terminer par un « Journal des corrections »** en tableau : problème d'origine
   → correction.
5. **Convertir en `.docx`** :
   `python3 _outils/convertisseur-md2docx.py MON-MODULE.md` (depuis la racine du dossier)
6. **Copier `.md` + `.docx`** dans ce dossier.

**Format** : structure EDRACT quand le module s'y prête · français intégral ·
aucun anglicisme · sources réelles avec DOI · jamais de marqueur de citation
orphelin.

---

## Les règles de purge (cohérentes entre les 3 parcours)

- 🔴 **Mythe du poisson rouge / « 8 secondes d'attention »** — purger partout
  (il réapparaissait dans Neuro M3 *et* UX/UI M8)
- 🔴 **Styles d'apprentissage / VARK** — réfutés (Pashler 2008 ; Howard-Jones
  2014). Ne jamais les utiliser comme principe de conception ; la multimodalité
  (mots + images pour tous) est autre chose et, elle, fonctionne
- ❌ **Statistiques fabriquées** — ROI en multiples, « études » fantômes,
  pourcentages ronds sans source
- ❌ **Cas « réels » fictifs** — requalifier en « scénario illustratif », retirer
  les chiffres de résultat
- ❌ **Marqueurs de citation orphelins** `[464]`, `[537]`… — supprimer
- ❌ **« Certification »** — TLS n'est pas accrédité : « attestation de parcours
  interne ». Jamais Qualiopi, jamais de CEU
- ⚠️ **Contraste WCAG** : `#55A1B4` sur blanc = **2,94:1 (échec)**, pas 4,6:1.
  Pour du texte AA, `#3D7786` = **5,02:1**

---

## Documents de référence (dans `docs/learning/`)

| Fichier | Contenu |
|---|---|
| `CORRECTIONS-SOURCEES-NEURO.md` | ⭐ **17 sources académiques vérifiées, claim par claim, avec DOI** — c'est le socle de la réécriture Neuro |
| `FACTCHECK-CERTIFIED-NEURO.md` | Audit ~95 claims : 34 fiables, 31 imprécis, 7 faux, 23 fabriqués |
| `FACTCHECK-CERTIFIED-UXUI.md` | Fact-check UX/UI claim par claim |
| `CORRECTIONS-SOURCEES-IP.md` | 12 claims IP avec sources vérifiées |
| `CORPUS-FORMATIONS-FACT-CHECK.md` | Vue d'ensemble des 3 parcours |

---

## Identifiants Drive — parcours Neuro

**Dossier** : `1wmshR1BU6T-F89zDWuFemjpoiMquZQ6o`

| Module | ID Drive |
|---|---|
| 00 Résumé exécutif | `1Wset0Kvc3Z45dTEGtPqDCsGrtO-jJyX3zoPRgP11RIU` |
| 01 Fondements | `1RXEH0QwxZE4sIC5WpELiz4AGTUTJK0OVNXQSZ5niS6E` |
| **02 Mémoire** | `1pr0Qo37X7I-NBn5StypPNUtZtIlbZR6Oes5kUWa3AVg` |
| **03 Attention** ⚠️ mythe 8 s | `1B2ShGrHnq7rA5h4nvzRb4-FxsiBaNwi5q80H5zn52DM` |
| **04 Feedback** | `1kWyMAGIcpmJQpDlZAbhXIfpB7ly9VQLpEBWSfM66EFM` |
| **05 Émotions** ⚠️ stress −35 % | `1d9fonneTY6hMbU-R_p7xHgK1NdE35MqMQvpix5ZEW_A` |
| **06 Neurodiversité** ⚠️ OpenDyslexic, Einstein | `1GzBZ8M_Y8Epv8PITSUGVUdiT2mXRUNMYpZgB5DA-d28` |
| **07 à 10** (un seul doc) | `1fPaf06wkyIu7QGr-YmCgsGvwtDVBlvwAGHjkTcp1X3w` |
| 08 Quiz diagnostique | `1t_JAame_bTYBM7RgW2jilQJrOp1ugeof1bwwp-sTOOc` |

⚠️ **Attention** : les docs 05/06 sont volumineux (56-65 Ko) → la lecture Drive
dépassera la limite et sauvegardera dans un fichier ; l'extraire ensuite par
tranches avec python.

**Dossier Drive de sortie créé** :
`https://drive.google.com/drive/folders/1kO3GabWkYzbSMnFp_RGwLOVG7NUGPEUz`
*(contient un fichier `_test-conversion (à supprimer)` à jeter à la main)*

---

## ✅ Doublon : vérifié et tranché (24/07/2026)

**La réécriture Neuro existait bien, complète et bien sourcée.** Vérification faite
sur le document Drive `1U0iQkEc9WUoWR-c7efyZcs0_Ifj2QyR2lCMsWfVUcLA` (64 000
caractères) :

- les **10 modules** sont rédigés, structure EDRACT complète
- **tous les mythes de la liste de purge sont traités** (poisson rouge, styles
  d'apprentissage, OpenDyslexic, growth mindset, redondance, courbe de l'oubli)
- **38 sources**, incluant les 17 de `CORRECTIONS-SOURCEES-NEURO.md` **plus**
  Hebb 1949, Baddeley 2000, Posner & Petersen 1990, Deci & Ryan, Black & Wiliam
  1998, Bjork 1994, Edmondson 2018, Vygotsky 1978

**Décision : ne pas réécrire.** Le contenu était fait ; il manquait le *format*.
Le document monolithique a été **découpé en 10 modules `.docx` autonomes**
(`NEURO-M01..M10.docx`), chacun avec la bibliographie jointe.

⚠️ Ma réécriture partielle du module 1 (session du 23/07) a été déplacée dans
`_archive/` : elle faisait doublon avec la version canonique `NEURO-M01`.

---

## Le prompt de reprise

Les 3 parcours existants sont traités. Le prochain chantier est de la **rédaction**,
pas de la correction :

> Reprends le chantier des parcours TLS.
>
> Lis `~/Documents/Claude/Projects/frontend-tls/docs/learning/modules-corriges-2026-07-23/_REPRENDRE-ICI.md`.
>
> Les 3 parcours de formation sont **complets** : Ingénierie Pédagogique (10),
> Neuro-Éducation (10), UX/UI (12) — tous en `.docx` dans ce dossier.
>
> S'il reste quelque chose à faire, ce n'est plus de la formation : (a) corriger
> le brief du **projet final UX/UI (M12)** — garder « 2 parcours réels », retirer
> le brief fabriqué « 15 000 apprenants / équipe de 12 » ; (b) écrire le volet
> marketing UX/UI (landing, emails, sales deck) — mais avec la règle d'honnêteté
> TLS : jamais de faux témoignages ni de résultats fabriqués.
>
> Mêmes règles partout : français, sources réelles vérifiées, aucun chiffre inventé.