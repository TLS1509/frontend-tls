# ✅ Corrections SOURCÉES — Parcours UX/UI Design & PM EdTech

**Créé** : 2026-07-10 · **Méthode** : chaque claim faux du parcours est corrigé et **adossé à une source réelle vérifiée sur le web** (WebSearch/W3C) ou à un **calcul refait à la main** (contrastes WCAG). Les ratios de contraste ont été recalculés algorithmiquement (formule WCAG 2.x, luminance relative).
**Complète** : [`FACTCHECK-CERTIFIED-UXUI.md`](FACTCHECK-CERTIFIED-UXUI.md) (registre verbatim) et [`PARCOURS-CORRECTIONS-DETAIL.md`](PARCOURS-CORRECTIONS-DETAIL.md).

> **RÈGLE ABSOLUE appliquée** : aucune source n'est inventée. Chaque source ci-dessous a été **vérifiée** (auteur, année, éditeur, lien). Un chiffre invérifiable → marqué **« RETIRER »**, jamais remplacé par une autre fabrication. On ne reproduit pas la sur-promesse qu'on corrige.

---

## 1. 🔴 CONTRASTE — l'erreur la plus grave (module qui *enseigne* l'accessibilité)

Le cours affirme `#55A1B4 sur blanc = 4.6:1 (AA ✅)`. **C'est faux et calculable.** Recalcul WCAG (luminance relative, ratio `(L1+0.05)/(L2+0.05)`) sur fond blanc `#FFFFFF` :

### Mini-tableau des vrais ratios WCAG

| Couleur (token TLS) | Ratio **annoncé** (cours) | Ratio **WCAG réel** /blanc | AA normal (≥4.5:1) | AA grand texte (≥3:1) | Verdict |
|---|---|---|---|---|---|
| `#55A1B4` primary-500 | 4.6:1 « ✅ AA » | **2.94:1** | ❌ FAIL | ❌ FAIL | **Faux** — échoue même le grand texte |
| `#ED843A` secondary-500 | 3.2:1 « AA large ok » | **2.64:1** | ❌ FAIL | ❌ FAIL | **Faux** — échoue le grand texte |
| `#F8B044` accent-400 | 2.1:1 « ❌ Fail » | **1.86:1** | ❌ FAIL | ❌ FAIL | Conclusion OK, **chiffre optimiste** |

### Couleurs de remplacement conformes (recalculées, à utiliser pour du **texte**)

| Couleur (token TLS) | Ratio WCAG /blanc | AA normal | AA grand texte | Usage recommandé |
|---|---|---|---|---|
| `#3D7786` primary-700 | **5.02:1** | ✅ PASS | ✅ PASS | ✅ **Le vrai bleu texte AA** sur blanc |
| `#2F5F6A` primary-800 | **7.08:1** | ✅ PASS | ✅ PASS | ✅ Titres/texte haute lisibilité |
| `#4A8FA1` primary-600 | 3.66:1 | ❌ FAIL | ✅ PASS | Grand texte (≥24px, ou ≥18.66px bold) uniquement |
| `#C06920` secondary-600 | 3.98:1 | ❌ FAIL | ✅ PASS | Grand texte orange uniquement |

**Règle WCAG citée** : SC **1.4.3 Contrast (Minimum)** — texte normal **≥ 4.5:1**, grand texte (≥18pt / ≥14pt gras) **≥ 3:1**. Les seuils sont des valeurs planchers : `4.499:1` **ne passe pas** 4.5:1 (pas d'arrondi).

- **Source (norme)** : W3C WAI — *Understanding SC 1.4.3: Contrast (Minimum)*, WCAG 2.1/2.2 → <https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html>
- **Source (outil de recalcul)** : WebAIM Contrast Checker → <https://webaim.org/resources/contrastchecker/> (reproduit les 4 chiffres ci-dessus à l'identique)
- **Type** : ❌ Erreur factuelle calculable (répétée 5× : slides 10/16/24/35 + quiz)

**Phrase prête à coller (grille de contraste du module)** :
> Sur fond blanc, le bleu de marque `#55A1B4` n'atteint que **2.94:1** — il **échoue** WCAG AA (4.5:1) et même le seuil grand texte (3:1). Pour du texte lisible et conforme AA, utiliser `#3D7786` (**5.02:1**) ou plus foncé. L'orange `#ED843A` (**2.64:1**) et le jaune `#F8B044` (**1.86:1**) ne passent aucun seuil de texte : les réserver aux aplats décoratifs, jamais au texte porteur d'information.

---

## 2. Corrections sourcées — claim par claim

Format : **Claim faux** → **Correction** → **Source vérifiée** → **Type** → **Phrase prête à coller**.

### 2.1 🔴 Mythe « 8 secondes / poisson rouge » (Module 8 LXD — slide 4 + script vidéo)

- **Claim faux** : « Attention span 2000 : 12 s → 2024 : 8 s, moins qu'un poisson rouge (9 s). Votre learner a 8 secondes d'attention. »
- **Correction** : Mythe intégralement débunké. Le « 8 s / goldfish 9 s » vient de la société **Statistic Brain**, repris par un rapport **Microsoft (2015)** ; l'enquête **BBC (2017)** a remonté la source et conclu qu'elle était **entièrement fabriquée** — aucune base scientifique, y compris pour le « fait » du poisson rouge. Les chercheurs de l'attention n'observent aucun effondrement de l'attention humaine ; elle dépend de la tâche et de la charge cognitive. Le chunking et les brain-breaks tiennent **sans** ce chiffre.
- **Source vérifiée** : Simon Maybin, *« Busting the attention span myth »*, **BBC News / More or Less, 10 mars 2017** → <https://www.bbc.com/news/health-38896790> · corroboration : *Fast Company, « The 8-second attention span is BS »* → <https://www.fastcompany.com/91023619/8-second-attention-span-is-bs-this-is-why>
- **Type** : 🔴 Mythe débunké (⚠️ identique au mythe « 8,25 s » du parcours Neuro M3 → purge cohérente obligatoire)
- **Phrase prête à coller** :
  > L'attention n'a pas de « durée de poisson rouge » : le chiffre des « 8 secondes » a été inventé par Statistic Brain, relayé par Microsoft en 2015, puis **démonté par la BBC en 2017** (aucune source scientifique). L'attention soutenue dépend de la tâche et de la charge cognitive — d'où l'intérêt de segmenter le contenu et d'alterner les formats, sans invoquer un seuil universel.

### 2.2 ~10 stats « business » fabriquées (fausses attributions) → RETIRER + substituts réels

Aucune de ces attributions n'est vérifiable (études fantômes). **Toutes à retirer.** Là où une preuve *réelle* de la valeur du design existe, on la substitue.

| Claim faux (verbatim) | Statut vérif. | Action |
|---|---|---|
| Micro-interactions « **+32 % perceived quality (Apple research)** » (M3) | ❌ Aucune « Apple research » publique | **RETIRER** le chiffre + l'attribution |
| Gamification « **+48 % retention EdTech (study 2025)** » (M3) | ❌ Étude fantôme | **RETIRER** |
| Animations mal faites « **-18 % perceived performance** » (M3) | ❌ Inventé | **RETIRER** |
| « Sans design system = **60 % temps redesign** » (M4) | ❌ Non sourçable | **RETIRER** |
| « DS mature = **+300 % design-to-dev (Figma study 2025)** » (M4) | ❌ Aucune « Figma study 2025 » | **RETIRER** |
| « Inconsistency = **€18K/mois** org 50+ » (M4) | ❌ Fabriqué | **RETIRER** |
| « Design inconsistent = **-32 % confiance (Nielsen Norman Group)** » (chapeau) | ❌ Aucune publication NN/g ne donne ce chiffre | **RETIRER** l'attribution |
| Feedback « **Immediate 80 % / Delayed 50 % / No feedback 20 %** retention » (M8) | ❌ Triptyque trop « propre », sans source | **RETIRER les %**, garder le principe qualitatif |
| « Navigation confuse = **40 % abandon** ; IA mauvaise = **+120 % tickets** » (M6) | ❌ Fabriqués | **RETIRER** |

**Substitut réel #1 — valeur business du design (rigoureux, méthodo publique)** :
- **Correction** : Une étude publiée établit un lien fort entre maturité design et performance financière : les entreprises du **quartile supérieur** de l'indice de design ont enregistré **+32 points de pourcentage de croissance du chiffre d'affaires** et **+56 pts de retour total aux actionnaires (TRS)** sur 5 ans vs leurs pairs (300 sociétés cotées, ~100 000 « actions de design », >2 M de points financiers).
- **Source vérifiée** : McKinsey & Company, *« The Business Value of Design »*, **octobre 2018** → <https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-business-value-of-design>
- **Type** : ✅ Substitut réel (remplace « +32 % Apple », « +300 % Figma », « -32 % NN/g », « €18K/mois »)

**Substitut réel #2 — valeur du test utilisateur** :
- **Correction** : ~5 utilisateurs suffisent à révéler ~85 % des problèmes d'utilisabilité (test *qualitatif*, plusieurs itérations > un gros test unique).
- **Source vérifiée** : Jakob Nielsen, *« Why You Only Need to Test with 5 Users »*, **NN/g, 2000** (d'après Nielsen & Landauer, INTERCHI 1993) → <https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/>
- **Type** : ✅ Substitut réel (vraie recherche NN/g, à opposer au « -32 % NN/g » fabriqué)

**Phrase prête à coller (M3/M4)** :
> Plutôt qu'un pourcentage inventé, on s'appuie sur une preuve réelle : McKinsey (2018) montre que les entreprises les plus matures en design surperforment nettement leurs pairs (+32 pts de croissance de CA, +56 pts de TRS sur 5 ans). Le soin porté aux micro-interactions et à la cohérence d'un design system est un investissement, pas un gadget.

### 2.3 🔴 Preuves de résultats inexistantes (aucune cohorte diplômée) → RETIRER

- **Claims faux** : « +€12K/an de salaire (étude post-certification) », « payback 1 mois », « ROI 5 ans €60K », « 40 % changent de rôle », « 68 % appliquent », « 80 % completion vs industrie 15 % ».
- **Correction** : Le parcours **n'a aucune cohorte diplômée** → aucune « étude post-certification » ne peut exister. Ces chiffres sont des projections présentées en preuves. **Retirer** ; si un ordre de grandeur pédagogique est vraiment utile, le libeller explicitement **« projection illustrative — non mesurée »**.
- **Source vérifiée** : *aucune* (invérifiable par construction — c'est précisément la raison du retrait). Règle d'intégrité marketing TLS : une stat = une source réelle citable, sinon elle ne sort pas.
- **Type** : 🔴 Preuve fabriquée / danger honnêteté
- **Phrase prête à coller** :
  > *(Retirer la ligne « résultats ». Si nécessaire : )* « Objectif pédagogique du parcours : maîtriser la boîte à outils UX + Product d'un profil produit EdTech. » — sans promesse chiffrée de salaire ou de reconversion, faute de cohorte mesurée.

### 2.4 🔴 Projet M12 — brief fabriqué → SUPPRIMER, garder le réel

- **Claim faux** : brief « détail » — **15 000 apprenants**, **€1,2M → €3M ARR**, **12 parcours**, **équipe de 12** (2 designers, 4 devs, 2 instructeurs, 1 sales, 1 mkg, CEO…), « 40 % abandon après Module 2 ».
- **Correction** : Contredit la réalité TLS. **Équipe réelle = Chloé Mimault + Pierre-Armand Dennery** (2 fondateurs). Garder le brief « Vue d'ensemble » comme base canonique : **2 parcours live** (Neuro-Éducation, Organisation Apprenante) + app en développement. Supprimer les métriques inventées (ARR, 15 000 users, abandon 40 %).
- **Source vérifiée** : réalité interne TLS (règle projet permanente : équipe = Mimault + Dennery uniquement). Aucune source externe requise — c'est un fait interne, pas une stat de marché.
- **Type** : 🔴 Fiction produit contredisant l'entreprise réelle
- **Phrase prête à coller** :
  > Brief réel : TLS, EdTech fondée par Chloé Mimault et Pierre-Armand Dennery, opère **2 parcours certifiants** (Neuro-Éducation, Organisation Apprenante) et développe sa plateforme d'apprentissage. Ton rôle CPO : prioriser la roadmap produit avec des données réelles — pas des métriques d'ARR simulées.

### 2.5 Mémoire de travail : « Miller 7±2 » → ~4 chunks (Cowan)

- **Claim faux** : « Miller's Law = 7±2 items » présenté comme la capacité de la mémoire de travail (Comfort/chunking, M2).
- **Correction** : Le « 7±2 » de Miller (1956) était une **estimation grossière et un procédé rhétorique**, souvent mal-appliqué à l'UI (« max 7 items par menu »). La capacité réelle de la mémoire de travail est révisée à **~4 chunks** (3 à 5).
- **Source vérifiée** : Nelson Cowan, *« The magical number 4 in short-term memory: A reconsideration of mental storage capacity »*, **Behavioral and Brain Sciences, 24, 87–185 (2001)** → <https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/magical-number-4-in-shortterm-memory-a-reconsideration-of-mental-storage-capacity/44023F1147D4A1D44BDC0AD226838496>
- **Type** : ⚠️ Datation/attribution obsolète (cohérence avec Neuro/IP)
- **Phrase prête à coller** :
  > La mémoire de travail retient **~4 chunks** (Cowan, 2001), pas « 7 ± 2 » : le chiffre de Miller (1956) était une estimation rhétorique, régulièrement mal-appliquée au design de menus. Concevoir pour ~4 éléments simultanés, pas 7.

### 2.6 Marché EdTech : « 404 Md€ (2026) » → ~404 Md$ (USD), horizon 2025

- **Claim faux** : « Marché EdTech 2026 : **€404B** ».
- **Correction** : Double erreur (devise + année). Le chiffre réel est une **projection HolonIQ** : **~404 Md$ US** de dépenses EdTech mondiales **à horizon 2025** (CAGR 16,3 % sur 2019-2025). C'est des **dollars**, et **2025**, pas des euros en 2026.
- **Source vérifiée** : HolonIQ, *« Global EdTech market to reach $404B by 2025 »* → <https://www.holoniq.com/notes/global-education-technology-market-to-reach-404b-by-2025>
- **Type** : ⚠️ Erreur devise + année
- **Phrase prête à coller** :
  > Le marché mondial de l'EdTech est estimé à **~404 milliards de dollars à l'horizon 2025** (HolonIQ, ~16 % de croissance annuelle) — soit à peine ~5 % de la dépense éducative mondiale. *(Dollars, horizon 2025 — ne pas écrire « 404 Md€ en 2026 ».)*

### 2.7 Habitude : « 21 jours » → 66 jours en médiane (Lally)

- **Claim faux** : « Habit formation 21-66 days » (M8 slide 28) — le « 21 jours » implique un seuil rapide.
- **Correction** : Le « 21 jours » est un **mythe** (dérivé d'une observation de Maltz, 1960, en chirurgie esthétique). L'étude de référence mesure une **médiane de 66 jours** pour atteindre l'automaticité, avec une **très forte variabilité (18 à 254 jours)** selon la personne et le comportement.
- **Source vérifiée** : Phillippa Lally et al., *« How are habits formed: Modelling habit formation in the real world »*, **European Journal of Social Psychology, 40(6), 998–1009 (2010)** → <https://onlinelibrary.wiley.com/doi/abs/10.1002/ejsp.674>
- **Type** : ⚠️ Mythe (« 21 j ») à retirer, garder 66 j
- **Phrase prête à coller** :
  > Une habitude ne se forme pas en « 21 jours » (mythe) : il faut **~66 jours en médiane** (Lally et al., 2010), et cela varie énormément d'une personne à l'autre (18 à 254 jours). Concevoir des boucles d'engagement sur la durée, pas sur une échéance magique.

### 2.8 Salaire « CPO EdTech €120-180K » → fourchette FR réaliste

- **Claim faux** : « €120K+ salaire CPO EdTech senior (top 10 %) » présenté comme débouché du parcours (13 h → CPO).
- **Correction** : Optimiste pour le marché français. Fourchette réaliste France : **~65 K€ à 173 K€**, **rémunération totale moyenne ~107 K€** (25ᵉ pct ~82 K€, 75ᵉ pct ~155 K€) ; à Paris moyenne ~117 K€, jusqu'à ~195 K€ dans les grands groupes/scale-ups. Les « 120-180 K€ » = **haut de fourchette senior**, pas un débouché typique — et **un parcours de 13 h ne fait pas un CPO** (poste C-suite, années d'XP).
- **Source vérifiée** : PayScale — *Chief Product Officer (CPO) Salary in France (2025)* → <https://www.payscale.com/research/FR/Job=Chief_Product_Officer_(CPO)/Salary> · corroboration Licorne Society (~75-150 K€ pour la direction produit à Paris) → <https://www.licornesociety.com/metiers-startup/cpo>
- **Type** : ⚠️ Sur-promesse / framing à adoucir
- **Phrase prête à coller** :
  > En France, un poste de direction produit se situe typiquement autour de **100-120 K€** (jusqu'à ~170-195 K€ pour les profils très seniors en grand groupe) — le CPO est un poste de direction qui s'atteint après plusieurs années d'expérience. Objectif réaliste de ce parcours : **acquérir la boîte à outils UX + Product d'un profil EdTech**, pas « devenir CPO en 13 h ».

### 2.9 Bonus — « 94 % des premières impressions = design » (chapeau)

- **Claim faux** : « 94 % premières impressions app = design visuel (Source : UX research 2026) ».
- **Correction** : L'idée (jugement visuel quasi instantané) est réelle mais **mal datée / mal attribuée**. La recherche fondatrice montre qu'un jugement d'attrait visuel se forme en **~50 ms**. Retirer « 2026 » et la fausse attribution.
- **Source vérifiée** : Gitte Lindgaard et al., *« Attention web designers: You have 50 milliseconds to make a good first impression! »*, **Behaviour & Information Technology, 25(2), 115–126 (2006)** → <https://www.tandfonline.com/doi/abs/10.1080/01449290500330448>
- **Type** : ⚠️ Datation/attribution à corriger
- **Phrase prête à coller** :
  > Les internautes jugent l'attrait visuel d'une interface en **~50 millisecondes** (Lindgaard et al., 2006) : la première impression se joue avant toute lecture. *(Ne pas écrire « 94 %… UX research 2026 » — attribution non sourçable.)*

---

## 3. Section « À RETIRER » (invérifiable — aucun substitut réel)

Ces éléments **n'ont aucune source réelle** et **aucun substitut légitime** : les supprimer purement et simplement (ne pas les remplacer par un autre chiffre).

1. **Preuves de résultats du parcours** : « +€12K salaire / étude post-certification », « payback 1 mois », « ROI 5 ans €60K », « 40 % changent de rôle », « 68 % appliquent », « 80 % completion vs 15 % ». → aucune cohorte n'existe.
2. **Brief M12 fabriqué** : 15 000 apprenants, €1,2M-€3M ARR, 12 parcours, équipe de 12, 40 % abandon après Module 2.
3. **Stats business fantômes** : +32 % (Apple), +48 % / +300 % (Figma study 2025), -18 %, 60 %, €18K/mois, -32 % (NN/g), feedback 80/50/20 %, 40 % abandon / +120 % tickets.
4. **Chiffres « propres » non calibrés** : Hick's Law « 2 opt → 1 s, 10 → 3,5 s, 100 → 7 s » (la loi est réelle `RT = b·log₂(n+1)`, mais les secondes sont fabriquées → retirer le tableau de secondes, garder la loi).
5. **« Bleu = 80 % des plateformes finance/EdTech »** (M1) · **« +10 % qualité perçue par 1 px d'espace (Material Design) »** (M1) · **« 87 composants documentés Storybook »** (M2/M4 — le DS TLS n'utilise pas Storybook ; showcase = `src/pages/Components.tsx`, >90 composants).

> ⚠️ Les scénarios avant/après chiffrés (« session +140 % », « completion 12→71 % », « adoption +49 pts ») = **scénarios illustratifs** : les relabelliser explicitement, jamais « preuve ».

---

## 4. Sources clés vérifiées (bibliographie)

Toutes vérifiées sur le web le 2026-07-10 (auteur · année · éditeur · lien).

| # | Sujet | Source (vérifiée) | Lien |
|---|---|---|---|
| 1 | Contraste WCAG (4.5:1 / 3:1) | **W3C WAI** — Understanding SC 1.4.3, WCAG 2.1/2.2 | <https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html> |
| 2 | Recalcul des ratios | **WebAIM** — Contrast Checker | <https://webaim.org/resources/contrastchecker/> |
| 3 | Mythe « 8 s / poisson rouge » | **BBC News / More or Less**, Simon Maybin, 10 mars 2017 | <https://www.bbc.com/news/health-38896790> |
| 4 | Valeur business du design | **McKinsey & Company** — *The Business Value of Design*, oct. 2018 | <https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-business-value-of-design> |
| 5 | Test à 5 utilisateurs / 85 % | **NN/g** — Jakob Nielsen, 2000 (d'après Nielsen & Landauer 1993) | <https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/> |
| 6 | Mémoire de travail ~4 chunks | **Cowan, N. (2001)** — *Behavioral and Brain Sciences*, 24, 87–185 | <https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/magical-number-4-in-shortterm-memory-a-reconsideration-of-mental-storage-capacity/44023F1147D4A1D44BDC0AD226838496> |
| 7 | Habitude ~66 j (mythe 21 j) | **Lally et al. (2010)** — *European Journal of Social Psychology*, 40(6), 998–1009 | <https://onlinelibrary.wiley.com/doi/abs/10.1002/ejsp.674> |
| 8 | Marché EdTech ~404 Md$ (2025) | **HolonIQ** — Global EdTech market to reach $404B by 2025 | <https://www.holoniq.com/notes/global-education-technology-market-to-reach-404b-by-2025> |
| 9 | Salaire CPO France | **PayScale (2025)** · corr. Licorne Society | <https://www.payscale.com/research/FR/Job=Chief_Product_Officer_(CPO)/Salary> |
| 10 | Première impression ~50 ms | **Lindgaard et al. (2006)** — *Behaviour & Information Technology*, 25(2), 115–126 | <https://www.tandfonline.com/doi/abs/10.1080/01449290500330448> |
| 11 | RICE (prio produit) | **Intercom** — Sean McBride | <https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/> |
| 12 | JTBD (« hire a product ») | **Clayton Christensen** — *Competing Against Luck* (2016) ; HBR | <https://hbr.org/podcast/2016/12/the-jobs-to-be-done-theory-of-innovation> |

**À garder tel quel (canon déjà exact dans le parcours, attributions vérifiées)** : Nielsen 5-users/85 % · Sweller (CLT) · Mayer/Paivio (dual coding) · Bjork (desirable difficulties) · Vygotsky (ZPD) · Csikszentmihalyi (Flow) · Deci & Ryan (SDT) · Kirkpatrick · **Christensen JTBD** · Bloom · Wurman (LATCH) · Brad Frost (Atomic Design) · Saffer (Trigger-Rules-Feedback) · **Intercom RICE** · McClure (AARRR) · Krug · Lupton · Reichenstein (« 95 % typographie ») · position éthique anti-dark-patterns.

---

## 5. Note sur une source « populaire » écartée (transparence)

- **« $1 investi en UX → $100 (ROI 9 900 %), Forrester »** : ce chiffre circule partout mais **le rapport précis, sa date et sa méthodologie sont introuvables publiquement** (parfois aussi attribué à Pressman, *Software Engineering*, « $2 à $100 »). → **Ne pas le citer comme preuve.** Pour la valeur du design, préférer **McKinsey 2018** (échantillon, période et méthode publics). Si on veut invoquer Forrester, se référer à la **méthodologie Total Economic Impact (TEI)**, publique, plutôt qu'au chiffre viral « 9 900 % ».

---

*© The Learning Society — Corrections sourcées établies le 2026-07-10. Contrastes recalculés à la main (formule WCAG 2.x, vérifiés WebAIM) ; toutes les sources marché/canon vérifiées par WebSearch (W3C, BBC/Statistic Brain, McKinsey 2018, NN/g, Cowan 2001, Lally 2010, HolonIQ, PayScale, Lindgaard 2006, Intercom, Christensen). Aucune source inventée : les claims invérifiables sont retirés, pas remplacés.*
