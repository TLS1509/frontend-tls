# Cadre pédagogique — comment ces cours sont construits

**2026-07-24.** Ce document répond à une question directe — *« quel framework
d'instructional design utilises-tu ? »* — et fixe la structure que suit chaque
leçon des trois pistes (UX/UI, vibe coding, Product Management).

> **Deux choses à cadrer d'emblée :**
>
> **1 · Le/la learner, c'est toi.** Ce ne sont pas des parcours pour les apprenants
> TLS. C'est *ta* montée en compétence, en situation de travail, en appliquant ce
> que tu apprends **directement sur le vrai produit**. Donc : on te dit « tu », et
> l'étape *Appliquer* n'est jamais un exercice fictif — c'est un chantier TLS réel.
> C'est de l'andragogie pure (Knowles) et de l'apprendre-en-faisant (Kolb).
>
> **2 · La structure est EDRACT®, la méthode de tes modules IP (issue de C-Campus).**
> Tu voulais tester la découpe d'un parcours en EDRACT « comme sur la plateforme ».
> C'est donc EDRACT qui sert de squelette visible. Chaque cours se lit dans ses six
> phases, comme tes propres modules IP. ⚠️ EDRACT® n'est pas une méthode TLS — voir
> §1 pour l'origine (C-Campus) et l'attribution.

---

## 1 · EDRACT® — la structure, et sa vraie origine

**EDRACT® est un modèle déposé de C-Campus** — cabinet français spécialisé dans la
professionnalisation des formateurs, co-fondé par **Marc Dennery** et **Henri Occre**.
**Ce n'est PAS une méthode inventée par TLS.** Un doc de recherche
interne l'avait qualifiée à tort de « structure maison » : il avait seulement
constaté « aucune base probante propre » et en avait déduit, à tort, une origine
maison — sans jamais chercher la source externe (C-Campus). **Vérifié et corrigé le
2026-07-24** (source : blog C-Campus).

Six phases — **libellés canoniques C-Campus** :

**E**ngagement · **D**écouverte · **R**éflexion · **A**ction · **C**apitalisation · **T**ransfert

*(⚠️ Les modules IP de TLS **paraphrasent** certains libellés — « Appliquer » pour
Action, « Consolider » pour Capitalisation, « Découvrir » pour Découverte. Même
acronyme, même méthode. Les cours de ce dossier ont d'abord repris la paraphrase des
modules IP ; à harmoniser sur les libellés C-Campus pour être fidèle à la source.)*

**Lignée théorique revendiquée par C-Campus** : les **9 événements d'instruction de
Robert Gagné** + le **cycle d'apprentissage expérientiel de David Kolb**, avec trois
principes — centrer sur l'activité de travail réelle, introduire des « difficultés
désirables » (Bjork), et employer des techniques actives *et* interactives. Donc
**EDRACT n'est pas « la version française de Merrill »** : Merrill n'y est pas cité ;
c'est un modèle cousin de lignée Gagné/Kolb.

**Propriétaire comme marque, pas comme théorie** (vérifié le 2026-07-24). Le terme
« EDRACT » n'apparaît **nulle part hors C-Campus** — aucun équivalent sous ce nom
dans une autre langue. Mais la *structure* est un assemblage de modèles **universels
et libres** : Kolb (cycle expérientiel), Gagné (9 events), proche cousin du **5E**
anglophone (Bybee/BSCS) et du cycle expérientiel de Pfeiffer & Jones (formation RH).
→ **Deux options propres** : fonder les cours sur « EDRACT® » en l'**attribuant** à
C-Campus (naturel vu la filiation Dennery), OU directement sur **Kolb + Gagné (+ 5E)**
— libres, internationaux — pour une version anglophone ou pour découpler de la marque.
La mécanique de leçon est identique ; seul le **nom** change de statut (marque C-Campus
vs domaine public).

⚠️ **Honnêteté + attribution.** EDRACT® n'est pas *peer-reviewed* comme modèle (aucune
étude propre ne mesure son efficacité — comme la plupart des séquences pédagogiques),
mais ses composants (Gagné, Kolb, difficultés désirables) sont établis. Et surtout :
**EDRACT® appartient à C-Campus. Il s'attribue, il ne se présente pas comme une
signature TLS.** Voir la note d'attribution en fin de document.

---

## 2 · Le framework d'ID — ce qui *justifie* chaque phase d'EDRACT

Voici la réponse complète à « quel framework tu utilises » : **EDRACT® (C-Campus,
lignée Gagné + Kolb) en surface, chaque phase adossée à son fondement propre ET à un
principe robuste qui la renforce, et mappée à la surface de l'app qui l'incarne**
(mapping 1:1 déjà établi dans
[`CORPUS-FORMATIONS-FACT-CHECK.md`](../../CORPUS-FORMATIONS-FACT-CHECK.md)).

| Phase EDRACT® | Ce qu'elle fait | Fondement (Gagné/Kolb) + principe qui la renforce | Surface app |
|---|---|---|---|
| **E — Engagement** | Un hook, un scénario réel, la question clé | Gagné 1-3 (capter l'attention, annoncer l'objectif, activer les acquis) + andragogie (Knowles) | Hero `LessonPlayer` |
| **D — Découverte** | Le concept, un bloc à la fois, avec schéma | Gagné 4-5 (présenter, guider) + charge cognitive (Sweller) + double codage (Mayer) | Sections `LessonPlayer` |
| **R — Réflexion** | Quiz **à confiance déclarée** + question de journal | Kolb (observation réfléchie) + récupération active (Roediger & Karpicke) + calibration | Quiz + `JournalNewEntry` |
| **A — Action** | L'exercice = **ton vrai chantier TLS** | Kolb (expérimentation active) + apprendre-en-faisant + difficulté désirable (Bjork) | → livrable TLS réel |
| **C — Capitalisation** | Synthèse, feedback, 3 mantras | Kolb (conceptualisation abstraite) + Gagné 7-8 (feedback) + chunking | Récap + type *astuce* |
| **T — Transfert** | Ce que tu fais cette semaine + rappel espacé | Gagné 9 (favoriser rétention & transfert) + espacement (Cepeda et al.) + SRS | Flashcards / Complémentaire |

**Et au-dessus de tout ça, deux couches transversales :**
- **Objectifs en verbes observables** (Bloom révisé, Anderson & Krathwohl 2001) —
  posés dans l'INTRO, tout le cours s'y aligne (backward design).
- **Motivation par autodétermination** (Deci & Ryan) — autonomie / compétence /
  sens, jamais carotte-bâton. Cohérent avec ton firewall gamification.

> **Le titre court, si tu n'en retiens qu'un :** *EDRACT® (C-Campus, lignée
> Gagné+Kolb) comme squelette, chaque phase adossée à son fondement + un principe
> robuste, et l'étape « Action » branchée sur ton vrai produit.*

---

## 3 · Le squelette de chaque cours (fidèle aux modules IP)

Reproduit la structure réelle de tes modules IP (`## Structure EDRACT`, `📖
INTRODUCTION`, `1️⃣ ENGAGEMENT`…). Les cours de ces trois pistes suivent **le même
gabarit**, pour que la découpe soit testable telle quelle sur la plateforme.

```
## Structure EDRACT — ~XX minutes
## 📖 INTRODUCTION
   Contexte · Ce que tu vas apprendre (objectifs Bloom) · Pourquoi c'est important
## 1️⃣ ENGAGEMENT   — un vrai carrefour de ton travail + la question clé
## 2️⃣ DÉCOUVRIR    — le concept en parties, une idée à la fois
## 3️⃣ RÉFLÉCHIR    — quiz (confiance déclarée avant réponse) + question de journal
## 4️⃣ APPLIQUER    — ta mission sur un chantier TLS RÉEL + correction suggérée
## 5️⃣ CONSOLIDER   — ce que tu as appris · les 3 mantras
## 6️⃣ TRANSFÉRER   — ce que tu fais cette semaine + rappel espacé (J+2/J+7)
## 📦 CONTENUS COMPLÉMENTAIRES — pour aller plus loin
## Sources — réelles, vérifiables
```

---

## 4 · Le plan — trois pistes

Format : **Markdown** ici → conversion Google Doc / `.docx` pour lecture iPad
hors-ligne (`_outils/convertisseur-md2docx.py`). Nommage : `{PISTE}-C{n}-titre`.

### Piste C · Product Management appliqué à la learning app — **SURTOUT**
1. **PM-C1** — Qu'est-ce que le PM (et pourquoi la learning app en a besoin) ✅
2. **PM-C2** — Jobs-to-be-Done : le vrai « travail » que ton apprenant embauche l'app pour faire ✅
3. **PM-C3** — Deux niveaux d'objectifs (apprentissage vs produit) & le piège des vanity metrics ✅
4. **PM-C4** — Priorisation : RICE, et pourquoi le score ordonne mais ne décide pas ✅
5. **PM-C5** — North Star & métriques qui ne peuvent pas monter contre l'apprenant ✅
6. **PM-C6** — Écrire une spec de feature (la répétition espacée comme cas réel) ✅ *(capstone PM)*

### Piste A · UX/UI & Webdesign — les bases (design)
1. **UXUI-C1** — Le socle visuel : typographie, couleur & contraste (mesuré), espacement base-4 ✅
2. **UXUI-C2** — Les 4C (Clarté, Cohérence, Contraste, Confort) comme grille de décision ✅
3. **UXUI-C3** — Design tokens & design system : la source de vérité unique ✅
4. UXUI-C4 — Architecture de l'information & piste informationnelle
5. UXUI-C5 — Interaction, états & micro-interactions (accessibilité du mouvement)

### Piste B · Vibe coding
1. **VIBE-C1** — Qu'est-ce que le vibe coding (intention → prompt → revue → itération) ✅
2. VIBE-C2 — Le document de pilotage (CLAUDE.md) comme system prompt de ton projet
3. VIBE-C3 — Les garde-fous : types, build gate, design system comme contraintes
4. VIBE-C4 — Revoir du code qu'on n'a pas écrit : que vérifier, quand refuser
5. VIBE-C5 — Quand NE PAS vibe-coder (sécurité, archi, décisions irréversibles)

---

## Note d'attribution — EDRACT®

**EDRACT® est une marque et un modèle de C-Campus** (co-fondé par Marc Dennery &
**Henri Occre**), fondé sur les 9 événements d'instruction de **Gagné** et le cycle
expérientiel de **Kolb**. TLS **utilise** cette méthode ; il ne l'a pas créée. Toute
mention publique ou commerciale (parcours IP, site, offres) doit **l'attribuer à
C-Campus** et non la présenter comme une méthode maison TLS.

- **Source vérifiée** : blog de C-Campus, *« Scénariser des formations engageantes et
  efficaces avec le modèle EDRACT® »* et *« Modèle EDRACT® : quelles techniques
  pédagogiques… »* (blog-formation-entreprise.fr), consultés le 2026-07-24.
- **À corriger ailleurs dans le repo** : `docs/learning/modules-corriges-2026-07-23/4-Recherche-et-Strategie/RECHERCHE-frameworks-IP-validite-scientifique.md`
  (dit « structure maison, à assumer comme telle » — faux) et toute occurrence de
  « signature TLS » / « méthode maison » appliquée à EDRACT.
- **Filiation confirmée** : **Marc Dennery (co-fondateur C-Campus) est le père de
  Pierre-Armand Dennery (associé TLS).** L'usage d'EDRACT chez TLS est donc légitime
  de fait ; l'attribution à C-Campus reste une bonne pratique de clarté (marque
  déposée, entité distincte). Pierre-Armand pourra préciser si l'usage est licencié
  formellement ou informel.

---

*Cadre posé le 2026-07-24. EDRACT® = méthode C-Campus (Gagné + Kolb), utilisée et
attribuée, pas revendiquée ; chaque phase adossée à un principe réel ; « Action »
branchée sur le vrai produit. Toute leçon qui s'écarte du gabarit doit dire pourquoi.
Sources réelles et vérifiables en fin de chaque cours — condition de crédibilité d'un
produit qui vend de la « pédagogie sourcée ».*
