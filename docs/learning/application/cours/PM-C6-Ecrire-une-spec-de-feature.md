# PM · Cours 6 — Écrire une spec de feature (la répétition espacée comme cas réel)

**Piste : Product Management appliqué à la learning app · Capstone de la piste PM.**

## Structure EDRACT — ~35 minutes

> Capstone : il **assemble** PM-C1→C5. Le/la learner, c'est **toi**. L'étape *Appliquer*
> produit une **vraie spec** que tu peux me confier pour construire. Contexte TLS réel.
> Sources vérifiables en fin.

---

## 📖 INTRODUCTION

### Contexte et enjeu
Tu as décidé **quoi** construire (job, priorité, métrique). Reste à l'**écrire** pour
que ça se construise **juste**. En vibe coding (VIBE-C1), un besoin sous-spécifié produit
la mauvaise chose avec une efficacité redoutable. La spec est le pont entre ta décision
produit et le code.

### 🎯 Ce que tu vas apprendre
À la fin, tu sauras :
1. **Lister** les sections d'une spec de feature utile.
2. **Écrire** des user stories et des **critères d'acceptation** testables.
3. **Cadrer le scope** : ce qui est dedans / explicitement dehors (la frontière MVP).
4. **Produire** la spec réelle de la répétition espacée.

### 💡 Pourquoi c'est important
Une spec claire, c'est ce qui te permet de **revoir** (VIBE-C1) : sans critères
d'acceptation, tu ne peux pas juger si c'est bon — tu peux seulement « trouver ça bien ».
La spec transforme une intention en quelque chose de **vérifiable**.

---

## 1️⃣ ENGAGEMENT — « Construis la répétition espacée »

### 🎬 Scénario — un vrai
Tu me dis : *« construis un système de répétition espacée. »* Je peux te livrer dix
choses différentes : quels intervalles (J+1/3/7 ? SM-2 ?) ? quel déclencheur de
révision ? quelle interface de notation (« su / à revoir » ?) ? quel modèle de données ?
que se passe-t-il quand une carte est ratée ? Sous-spécifié = je devine, et je devine
probablement faux.

### 🤔 Question clé
Le problème n'est pas la difficulté technique — c'est l'**ambiguïté**. La question du
cours : *qu'est-ce qu'une spec doit contenir pour qu'il n'y ait qu'**une** façon de la
construire correctement ?*

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 PARTIE 1 · Les sections d'une spec utile
Une bonne spec est **courte mais complète**. Huit sections :

| Section | Ce qu'elle répond | Rappel de cours |
|---|---|---|
| **1. Problème / job** | Quel progrès on sert, pour qui | PM-C2 (JTBD) |
| **2. Objectif & métrique** | Quelle métrique d'entrée on bouge + garde-fou | PM-C3, PM-C5 |
| **3. User stories** | Ce que l'utilisateur veut faire | ci-dessous |
| **4. Parcours (avec erreurs)** | Le flux, y compris les chemins d'échec | UX/UI archi info |
| **5. Scope in / out** | La frontière MVP, explicite | PM-C4 (effort) |
| **6. Modèle de données** | Les objets et leurs champs | — |
| **7. Critères d'acceptation** | Comment on saura que c'est fait | VIBE-C1 |
| **8. Risques & lancement** | Ce qui peut casser, comment on sort | — |

### 📚 PARTIE 2 · User stories
Format : **« En tant que [rôle], je veux [action], afin de [bénéfice]. »** (Cohn)
- *En tant qu'apprenant, je veux **revoir une notion au bon moment**, afin de la
  **retenir sans tout relire**.*
- *En tant qu'apprenant, je veux **dire si je l'ai sue ou non**, afin que l'app **ajuste
  la prochaine révision**.*

Une user story n'est **pas** une tâche technique (« créer une table SQL ») — c'est un
besoin du point de vue de l'utilisateur.

### 📚 PARTIE 3 · Critères d'acceptation testables
Chaque story a des critères **vérifiables** (vrai/faux, pas « ça marche bien ») :
- « Après avoir noté une carte **"su"**, sa prochaine révision est planifiée à un
  intervalle **plus long** que la précédente. »
- « Après **"à revoir"**, l'intervalle **retombe** au plus court. »
- « Le tableau de bord montre le **nombre de cartes dues aujourd'hui**. »
- « `npm run build` passe ; la persistance survit à un refresh (localStorage). »

C'est ça qui rend la revue possible : on **coche**, on ne « ressent » pas.

### 📚 PARTIE 4 · Scope, données, risques
- **Scope in/out** : *In* — notation su/à revoir, intervalles expansifs (J+1/3/7/14/30),
  compteur de cartes dues. *Out (V1)* — génération IA des cartes, algo SM-2 complet,
  synchro multi-appareils. **Dire ce qui est dehors est aussi important que ce qui est
  dedans** (ça borne l'Effort de PM-C4).
- **Modèle de données** (haut niveau) : `Card { id, notionId, front, back }` ·
  `Review { cardId, lastReviewedAt, intervalDays, ease, dueAt }`. Une carte due =
  `dueAt <= aujourd'hui`.
- **Risques** : intervalles trop agressifs (surcharge) → commencer conservateur ;
  cartes orphelines si une leçon change → clé stable. **Lancement** : derrière un flag,
  sur un seul parcours, mesurer l'activation avant de généraliser.

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

### Quiz (5 min)
De mémoire, **confiance déclarée avant de vérifier** (🟢/🟡/🔴).

1. Pourquoi les **critères d'acceptation** sont-ils indispensables à la revue ?
2. Écris une user story au bon format pour « voir mes cartes à réviser aujourd'hui ».
3. Pourquoi préciser le **scope OUT** autant que le scope IN ?

<details>
<summary>Vérifier</summary>

1. Sans eux, on ne peut pas **juger** si c'est fait — seulement « trouver ça bien ». Ils
   rendent la revue **binaire** (vrai/faux).
2. *En tant qu'apprenant, je veux voir le nombre de cartes dues aujourd'hui, afin de
   savoir quoi réviser sans chercher.*
3. Parce que **borner ce qui est dehors** fixe l'Effort (PM-C4) et évite le
   sur-engineering ; ça protège le MVP.
</details>

### 💭 Journal personnel
À écrire : *la dernière fois que je t'ai confié un besoin flou et que tu as construit à
côté — quelle **section de spec** manquait ?*

---

## 4️⃣ APPLIQUER — Ton chantier réel (le capstone)

### 🛠️ Cas : la spec du SRS, pour de vrai
Tu vas écrire la spec de la répétition espacée — celle-là même que l'audit a identifiée
et que le site **promet déjà**. Squelette à remplir :

```
SPEC — Répétition espacée (SRS) v1

1. PROBLÈME / JOB   → (PM-C2) « Quand je finis une leçon, je veux… afin de retenir… »
2. MÉTRIQUE         → entrée North Star visée : rétention J+30 ↑ · garde-fou : … (PM-C3/C5)
3. USER STORIES     → 2-3 stories « En tant que… je veux… afin de… »
4. PARCOURS         → réviser une carte → noter su/à revoir → replanifier
                       chemins d'erreur : aucune carte due ? carte orpheline ?
5. SCOPE IN         → notation su/à revoir · intervalles J+1/3/7/14/30 · compteur dû
   SCOPE OUT (v1)   → génération IA · SM-2 complet · multi-appareils
6. DONNÉES          → Card{…} · Review{ cardId, intervalDays, dueAt, … }
7. ACCEPTATION      → 4-5 critères testables (dont « build passe » + « persiste au refresh »)
8. RISQUES/LANCEMENT→ flag · un parcours pilote · mesurer l'activation
```

### Ta mission (cette semaine)
Remplis ce squelette **en entier** pour le SRS. Puis relis-le avec **une** question :
*« un développeur (ou moi) pourrait-il construire ça de travers en le lisant ? »* Chaque
ambiguïté trouvée = une ligne à préciser. Quand c'est net, **tu peux me la confier pour
build** — c'est le but : ta décision produit devient du code juste.

### Correction suggérée
Piège n°1 : sauter les **critères d'acceptation** (« on verra bien ») — c'est là que la
revue meurt. Piège n°2 : oublier le **scope OUT**, et te retrouver à construire SM-2 +
IA + synchro pour une v1. Une bonne spec dit **non** autant que oui (PM-C1).

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que tu as appris
- Une spec utile = **8 sections** : problème, métrique, stories, parcours, scope,
  données, **acceptation**, risques.
- User story = besoin utilisateur (« En tant que… ») ; critère d'acceptation = **testable**.
- **Scope OUT** borne l'Effort autant que scope IN.
- Une spec claire rend la **revue** possible — le pont vers le vibe coding.

### 🎯 Les 3 mantras
| Mantra | Sens |
|---|---|
| **« Pas de critère, pas de revue »** | Sans acceptation testable, on ne juge pas, on ressent |
| **« Dire non aussi »** | Le scope OUT protège le MVP |
| **« Une seule façon de la construire »** | La spec tue l'ambiguïté avant le code |

### 💡 Citation
> *« Une bonne spec ne décrit pas seulement ce qu'on construit, mais comment on saura
> que c'est réussi. »* — principe produit (Cagan, *Inspired*).

---

## 6️⃣ TRANSFÉRER — Ce que tu fais cette semaine

1. **Le livrable** : la spec complète du SRS. Concrètement : **tu me la donnes, je la
   construis** — la boucle Learn→Do se referme sur ton vrai produit.
2. **Rappel espacé** — **à J+2 puis J+7**, sans rouvrir ce doc : redonne les **8
   sections** d'une spec et **pourquoi les critères d'acceptation comptent**. Blocage →
   revue J+14.

### 🎓 Fin de la piste PM
Tu as parcouru : ce qu'est le PM (C1) → le job (C2) → les objectifs & vanity metrics
(C3) → la priorisation RICE (C4) → la North Star (C5) → la spec (C6). Tu as maintenant la
**boîte à outils produit** pour décider quoi construire, pourquoi, dans quel ordre, et
comment le spécifier. Prochaine étape naturelle : **appliquer les 6 sur le SRS de bout en
bout** — c'est ton capstone réel.

---

## Sources
- **Cagan, M. (2018).** *Inspired.* Wiley. → specs, prototypes, définition du succès.
- **Cohn, M. (2004).** *User Stories Applied.* Addison-Wesley. → format des user stories.
- **Wiegers, K., & Beatty, J. (2013).** *Software Requirements* (3ᵉ éd.). Microsoft
  Press. → critères d'acceptation, scope.

---

*PM-C6 rédigé le 2026-07-24, structure EDRACT (paraphrase des modules IP). Capstone de la
piste PM — les 6 cours PM sont complets.*
