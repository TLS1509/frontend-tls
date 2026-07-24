# Défaut 2 — Gamification contre attestation : options de conception

> **2026-07-23.** Étude de solutions pour le défaut de positionnement SBO de la Learning App
> (voir [`REVUE-TRANSVERSALE-CDC`](REVUE-TRANSVERSALE-CDC.md), défaut 2).
> Trois options, chacune évaluée sous six lentilles : **apprenance · instructional design ·
> biais cognitifs & neurosciences · UX/UI · conformité (SDT/éthique · RGPD) · faisabilité technique**.
> ⚠️ Propositions à trancher en métier. Rien n'est engagé.
> Deuxième d'une série (un document par défaut). Suppose la colonne de preuve du défaut 1
> ([`SOLUTIONS-01-PREUVE`](SOLUTIONS-01-PREUVE.md)) comme socle.

---

## Rappel du problème, reformulé en question de conception

Le système **récompense l'activité** — XP par entrée de journal, streaks de connexion, claim de badge
payant, dashboards enterprise qui comptent la présence — là où une SBO doit **attester la compétence
démontrée**. La question n'est pas « comment ajouter du fun » mais motivationnelle :

> **Comment entretenir l'engagement d'un adulte au travail sans corrompre la motivation qui l'amène
> déjà là — et sans jamais confondre un compteur de points avec une compétence attestée ?**

Deux distinctions gouvernent toutes les réponses.

**1. Toute récompense n'a pas le même effet.** La théorie de l'autodétermination (Deci & Ryan) et la
méta-analyse de Deci, Koestner & Ryan (1999) tranchent net : une récompense **tangible, attendue et
contingente** à une activité déjà intrinsèquement motivée **corrode** la motivation (effet de
sur-justification — Lepper, Greene & Nisbett, 1973 : l'enfant qu'on paie pour dessiner dessine moins
ensuite). Mais une récompense **informationnelle** — qui *confirme la compétence* sans la contrôler —
la **renforce**. D'où le paradoxe du produit actuel : l'Open Badge (credential qui atteste un fait,
informationnel) est une bonne récompense ; les **+20 XP versés pour une entrée de journal**
(`XP_PER_TRIGGER.journal_entry`) sont exactement la mauvaise — on rémunère l'activité la plus
intrinsèquement motivée du produit. *(La « valorisation » de la réflexion que le code croit apporter
par l'XP se paie donc en motivation ; elle doit passer par une reconnaissance informationnelle ou
relationnelle — un accusé, un commentaire coach/pair, que le Journal supporte déjà — jamais par un
jeton.)*

**2. Un badge n'est pas un jeton, et une compétence n'est pas un badge.** Un badge est l'**attestation
d'un fait daté** (émetteur, titulaire, preuve, date — la définition Open Badges elle-même). Sa valeur
*est* sa permanence et sa vérifiabilité. Un jeton, lui, est une monnaie qui se dépense. Or l'atrophie
du cahier 05 **rétrograde un badge** (D4→D3 après 90 j) : elle détruit précisément la propriété
— la permanence — qui fait qu'un badge est un credential, et contredit le même cahier qui le vend
comme « permanent, partageable sur LinkedIn ». Avoir validé D4 le 15 mars *reste vrai* le 15 juin.
Ce qui peut décliner, c'est la **compétence vivante** — fondement neuro réel : sans pratique, la
trace se déconsolide, l'élagage synaptique fait son œuvre, la courbe d'oubli joue. Mais cela doit
moduler un **signal de fraîcheur** sur la compétence, pas rétrograder l'attestation du fait passé.

Un invariant, commun aux trois options et non négociable :

> **Une mécanique d'engagement ne modifie jamais un niveau de compétence, ne rétrograde jamais un
> credential, et ne rémunère jamais la réflexion.** L'attestation (evidence-based, permanente) et le
> jeu (XP, streaks) sont deux systèmes séparés. Le déclin d'une compétence non pratiquée alimente un
> signal de *fraîcheur* non punitif, jamais un downgrade.

*Bonne nouvelle de code, à préserver : `UserStreak.totalXP`/`currentLevel` sont **déjà** distincts de
`LearnerCompetency.currentLevel` — le jeu et le niveau ne sont pas soudés dans le frontend. Et
l'atrophie-badge comme le claim payant sont, à ce jour, **spec-only** (cahier 05 + crédits) : ils ne
sont pas encore dans le modèle de types FO (`UserBadge` n'a ni `lost_at` ni `credit_cost`). Une part
du correctif est donc « ne pas implémenter tel qu'écrit », pas « défaire ».*

---

## OPTION A — Le jeu **subordonné et cloisonné**

**L'idée.** Garder XP, streaks et badges, mais les reléguer à une **couche d'engagement strictement
séparée, opt-out**, qui ne touche ni le credential ni la réflexion. On désamorce les trois mines sans
rien réinventer : l'XP quitte la réflexion (`journal_entry` → 0 ou remplacé par un accusé), l'atrophie
ne touche plus les badges (elle devient un chip « dernière pratique il y a 92 jours »), le claim
redevient gratuit. Le streak est conservé mais rendu **non punitif** (gel/réparation, précédent
Duolingo). C'est le « garde-fou commun » de la REVUE transformé en option concrète — la plus proche
des pratiques dominantes du secteur, nettoyée.

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟢 Le credential et la réflexion cessent d'être pollués. 🟡 Mais la périphérie reste orientée points : l'apprenant peut continuer à « jouer les XP » au lieu de viser la maîtrise. Re-motive peu ; *dé-risque*. |
| **Instructional design** | 🟢 Séparation propre → l'attestation reste valide, non gamifiée. Le streak, s'il encourage une pratique *distribuée*, sert la rétention (effet d'espacement). 🟡 Mais l'XP-sur-tout continue de récompenser la quantité d'activité, pas la démonstration. |
| **Biais & neuro** | 🟢 Retirer l'XP de la réflexion supprime la sur-justification là où elle mord le plus. Le streak exploite la boucle d'habitude (indice → routine → récompense) — utile pour les tâches à faible intrinsèque. 🟡 Mais le streak s'appuie sur l'aversion à la perte : pression, anxiété, « streak-and-churn » — d'où la nécessité du gel. |
| **UX/UI** | 🟢🟢 La plus faible friction : patterns familiers, opt-out qui respecte l'autonomie, chip de fraîcheur qui remplace proprement l'atrophie punitive. |
| **Conformité (SDT/éthique · RGPD)** | 🟢 SDT : opt-out + non-punitif + zéro récompense-sur-réflexion protègent l'essentiel. 🟡 Le streak reste une motivation *contrôlée* (régulation externe) ; et si les métriques d'engagement remontent au manager, on frôle la « surveillance des travailleurs » — à cloisonner. |
| **Faisabilité** | 🟢🟢 Essentiellement de la **soustraction** (retirer l'XP-journal, l'atrophie-badge, le claim payant) + un firewall + un relabel. Le moins cher, et indépendant du défaut 1. |

**En un mot.** Le nettoyage pragmatique. Désamorce les trois mines sans rien réinventer — mais laisse
la périphérie orientée points et ne re-motive pas en profondeur. Un plancher, pas une vision.

---

## OPTION B — L'**attestation seule** : preuve, pas points

**L'idée.** L'option de fond. Retirer XP et streaks de la surface (au mieux, télémétrie interne
invisible). La **seule récompense visible est l'attestation evidence-based** : le dossier de preuves
du passeport et l'Open Badge. La motivation est portée par la **compétence rendue lisible**
(métacognition outillée), par le **goal-setting sur objectifs réels** (`CompetencyObjective` existe
déjà — Locke & Latham : un but spécifique, exigeant, *endossé* motive plus qu'un score), et par la
satisfaction intrinsèque de la maîtrise démontrée. Pour un adulte au travail, le credential *est*
l'extrinsèque qui compte — portable, partageable, lié à la carrière — et c'est un extrinsèque
**identifié/intégré** (une valeur que l'apprenant fait sienne), pas introjecté (la culpabilité du
streak rompu).

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟢🟢 **La plus pure.** L'adulte est traité comme intrinsèquement/identifié-régulé ; le credential nourrit directement le besoin de compétence. Autodétermination maximale. |
| **Instructional design** | 🟢🟢 L'évaluation *est* la récompense : aucun proxy à optimiser. *Constructive alignment* parfait — ce qui est reconnu est exactement ce qui est démontré. |
| **Biais & neuro** | 🟢🟢 Surface de sur-justification nulle : plus aucune récompense tangible/contingente pour corroder l'intrinsèque ; le credential agit comme feedback informationnel de compétence (Deci : *renforce*). 🔴 Mais on perd l'échafaudage d'habitude — pour le novice et les prérequis secs (faible intrinsèque de départ), plus aucun nudge externe : risque de décrochage *avant* que la boucle intrinsèque ne s'amorce. |
| **UX/UI** | 🟢 Plus calme, plus premium/éditorial — cohérent avec le registre de marque TLS (classe, éditorial, pas « app à dopamine »). 🟡 Mais risque de paraître « vide » à des utilisateurs conditionnés par le gamifié ; feedback moins immédiat. |
| **Conformité (SDT/éthique · RGPD)** | 🟢🟢 La position SBO la plus défendable (on récompense l'outcome, pas la présence) et la plus propre : zéro boucle manipulatoire, zéro dark pattern, aucune métrique de présence à tendre au manager. 🟢 RGPD-léger : moins de télémétrie comportementale = minimisation des données. |
| **Faisabilité** | 🟢 Surtout de la suppression — **mais suppose la colonne de preuve (défaut 1) réelle**. Sinon on retire la récompense pour la remplacer par… un nombre nu. Dépendance forte. |

**En un mot.** Le pari puriste, le plus aligné SBO et andragogie adulte : le credential *est* la
récompense, et c'est une récompense informationnelle, donc sûre. Le plus propre éthiquement — mais
nu, périlleux tant que la colonne de preuve n'existe pas pour porter la charge motivationnelle, et il
abandonne l'échafaudage d'habitude au moment le plus fragile.

---

## OPTION C — **Deux monnaies séparées**, re-motivées par les besoins SDT

**L'idée.** Ni retirer le jeu, ni seulement le cloisonner : le **ré-ingéniérer** pour servir les trois
besoins de l'autodétermination, avec deux monnaies clairement distinctes reliées par un *contrat de
sens* explicite (l'apprenant sait toujours ce que chaque signal veut dire).

- **Autonomie** — l'apprenant fixe ses buts (`CompetencyObjective`), toute mécanique est opt-in, le
  progrès est *le sien*, pas celui de la plateforme.
- **Compétence** — l'XP-monnaie disparaît au profit d'un **progrès dérivé de la preuve** : la barre
  avance parce qu'une preuve a été validée, pas parce qu'on s'est connecté. Feedback informationnel,
  défi optimal.
- **Relation** — les leaderboards et la honte-du-streak cèdent la place à des signaux relationnels :
  buts partagés en cohorte, reconnaissance du coach, commentaire d'un pair *sur la réflexion* (déjà
  prévu au cahier 07) — jamais de l'XP.

Le streak est recadré en **rythme de pratique** que l'apprenant définit et endosse (contrat
d'habitude, gel/réparation par défaut — précédent Duolingo), cadré par l'espacement (« espace ta
pratique »), pas par le login quotidien. La North Star enterprise bascule de la présence à la
**compétence démontrée** (KPI d'outcome).

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟢🟢 Conçue pour l'autorégulation et les trois besoins ; le plafond motivationnel le plus haut. |
| **Instructional design** | 🟢 Progression *mastery-based* + feedback informationnel = état de l'art. 🟡 Mais lourde à rendre cohérente ; risque de sur-conception. |
| **Biais & neuro** | 🟢🟢 Aligne les récompenses sur du feedback informationnel (protecteur, Deci), cadre l'espacement (levier de rétention réel), et le contrat d'habitude respecte l'autonomie. 🟡 Doit résister à re-introduire des mécaniques contrôlantes sous un nom sympathique. |
| **UX/UI** | 🔴 Le plus à construire. La **double monnaie est un vrai piège de lisibilité** : « points » et « niveau » se confondent en une seconde dans la tête de l'utilisateur — sans une clarté visuelle chirurgicale, on recrée exactement la confusion qu'on prétend guérir. |
| **Conformité (SDT/éthique · RGPD)** | 🟢🟢 L'alignement SDT le plus fort et l'intention éthique la plus explicite ; les KPI d'outcome dé-risquent la dérive de surveillance. 🟡 Plus de modélisation comportementale → surveiller la minimisation des données. |
| **Faisabilité** | 🔴 Le plus gros chantier : nouveau modèle motivationnel, UI double-monnaie, couche relationnelle/cohorte, refonte des dashboards. Le plus lourd pour une équipe de deux. |

**En un mot.** Le pari design : re-motiver par construction sur les trois besoins SDT, deux monnaies
reliées par un contrat de sens. Le plus on-brand et le plafond le plus haut — mais le plus gros build
et le vrai risque UX (la double monnaie se confond vite).

---

## Matrice de synthèse

| Critère | A — Jeu cloisonné | B — Attestation seule | C — Deux monnaies SDT |
|---|---|---|---|
| Protection de la motivation intrinsèque | 🟢 | 🟢🟢 | 🟢🟢 |
| Force de l'attestation (credential permanent) | 🟢 | 🟢🟢 | 🟢 |
| Échafaudage d'habitude (novice, tâches sèches) | 🟢🟢 | 🔴 | 🟢 |
| Alignement SBO (outcome > présence) | 🟡 | 🟢🟢 | 🟢🟢 |
| Éthique / anti-dark-pattern | 🟢 | 🟢🟢 | 🟢🟢 |
| Charge / friction de build | 🟢🟢 faible | 🟢 (soustraction) | 🔴 forte |
| Risque UX (lisibilité) | 🟢 | 🟡 | 🔴 |
| Dépendance à la colonne de preuve (défaut 1) | 🟢 quasi nulle | 🔴 forte | 🟡 moyenne |

**Ce que la matrice montre** : les trois ne sont pas concurrentes, elles opèrent à des **niveaux
différents**. A est une **hygiène** (on retire ce qui corrode), B est une **posture** (le credential
porte la motivation), C est une **construction** (un moteur de motivation SDT). A est indépendant du
défaut 1 et immédiat ; B est la destination mais suppose la preuve ; C est le plafond mais coûte cher
et risque la confusion. Les opposer serait une erreur — la bonne réponse les **compose dans le temps**.

---

## Recommandation — l'attestation est la récompense, le jeu un échafaudage mince

Je ne recommande pas *une* option, mais **leur composition séquencée** : la posture de B comme
destination, le firewall de A comme premier geste, deux emprunts bon marché à C, et le gros build de
C **différé**.

### Le principe directeur (destination = B)

**Le credential evidence-based est la récompense primaire, et c'est une récompense informationnelle —
donc sûre au sens de Deci & Ryan.** La réflexion n'est jamais payée : elle est reconnue
*relationnellement* (accusé, commentaire coach/pair). Le passeport-dossier (défaut 1) porte la charge
motivationnelle. Tout le reste est subordonné à cela.

### Le premier geste (A, immédiat, indépendant du défaut 1)

Trois soustractions qui *arrêtent l'hémorragie* sans attendre la colonne de preuve :

| Mécanique corrosive | Correctif | Ancrage code / spec |
|---|---|---|
| **Réflexion payée** (+20 XP/entrée) | Retirer `journal_entry` de la table XP (→ accusé/relationnel) | `data/gamification.ts` `XP_PER_TRIGGER` · `MOCK_XP_EVENTS` |
| **Atrophie qui rétrograde le badge** | **Ne pas** implémenter le downgrade (cahier 05 : cron 02:00, `atrophie_log`, `user_competence_badges.lost_at`). Garder `daysSinceActivity` comme *chip de fraîcheur* non punitif | `types/learning.ts` `LearnerCompetency.daysSinceActivity` (déjà présent ; aucun `dreyfus-down` modélisé) |
| **Claim payant** (1 crédit) | Rendre le claim gratuit sur la reconnaissance interne | spec-only (cahier 05 §19 + crédits) — donc « ne pas construire » |

### Deux emprunts bon marché à C (haute valeur, faible coût)

1. **Le streak recadré en rythme opt-in, non punitif** (gel/réparation — précédent Duolingo), réservé
   là où l'habitude aide réellement : le novice et les prérequis secs. Pas de streak-shame, pas
   d'alerte d'inactivité.
2. **La North Star enterprise bascule présence → compétence démontrée** : ajouter un **KPI d'outcome**
   à côté de (ou à la place de) `CompanyStats.engagementRate` (cahier 06). Optimiser la présence pousse
   les managers à harceler — ce qui se retourne ; mesurer la compétence oriente le soutien.

### Ce qui est différé (le gros build de C)

La double-monnaie complète (XP-progrès *dérivé de la preuve*, couche relationnelle/cohorte, refonte
UI) est **trop lourde et trop risquée maintenant** (équipe de deux, piège de lisibilité). À rouvrir
une fois la colonne de preuve posée et B stabilisé — c'est une V2, pas un préalable.

### Pourquoi c'est le bon arbitrage

- **On ne retire pas tout (contre B pur)** : B nu est périlleux tant que la preuve n'existe pas, et
  abandonne l'échafaudage d'habitude au moment le plus fragile. On garde donc un streak *forgiving*.
- **On ne se contente pas de cloisonner (contre A seul)** : A laisse la périphérie orientée points et
  les dashboards mesurant la présence. On y ajoute la posture de B et le KPI d'outcome.
- **Faisabilité** : le premier geste est de la soustraction, immédiat, découplé du défaut 1 ; le reste
  monte en puissance quand la preuve est là. Pas de big bang.
- **Positionnement SBO** : la récompense visible devient la **compétence attestée**, pas le compteur —
  exactement ce qui distingue une SBO d'un LMS gamifié, et ce que le marché ETI (où la conformité et
  le sérieux se vendent) valorise.

### L'invariant, redit

Une mécanique d'engagement **ne modifie jamais** un niveau, **ne rétrograde jamais** un credential,
**ne rémunère jamais** la réflexion. Le déclin d'une compétence non pratiquée alimente un signal de
*fraîcheur* — informationnel, réversible, non punitif — jamais un downgrade.

---

## Ce qu'il reste à décider (et que je ne peux pas trancher seul)

1. **Sort des streaks** : les garder en version *forgiving* (rythme opt-in + gel/réparation), ou les
   retirer entièrement ? Je penche pour les garder, non punitifs, ciblés novices — mais c'est une
   décision produit/andragogie.
2. **Sort de l'XP visible** : le supprimer, le rendre purement cosmétique, ou le remplacer par un
   « progrès vers le prochain niveau » *dérivé de la preuve* (le premier pas vers C) ? Décision de
   conception, à prendre avec le défaut 1.
3. **La North Star enterprise, opérationnalisée** : « compétence démontrée » = quoi exactement ?
   Nombre de preuves validées ? Progression Dreyfus nette ? JAC franchis ? Décision métier, dépendante
   de la colonne de preuve.
4. **Séquencement vs défaut 1** : le premier geste (A) est indépendant et peut partir tout de suite ;
   B et C attendent la preuve. À acter dans le plan de vagues.
5. **La divergence chiffrée XP-journal** : le cahier 05 dit **+5**, le code dit **+20**
   (`XP_PER_TRIGGER.journal_entry`). Sans objet si on retire l'XP-sur-réflexion — mais à trancher et
   documenter pour clore l'incohérence.

---

## Ce que cette étude n'a pas fait

- **Aucune vérification juridique de première main.** L'analyse « surveillance des travailleurs » /
  RGPD art. 22 (auto-downgrade, métriques de présence au manager) prépare une conversation avec un
  conseil, elle ne la remplace pas.
- **Le précédent Duolingo (streak-freeze/repair)** est de l'histoire produit publique, largement
  rapportée — pas une étude contrôlée. Il illustre le principe « si tu gardes un streak, rends-le
  clément », il ne le prouve pas.
- **Les effets SDT / sur-justification** sont cités dans leur *direction* établie (récompense
  tangible-contingente → corrosion ; feedback informationnel → renforcement). Je n'avance aucune
  taille d'effet chiffrée.
- **Les constats dashboards enterprise** (présence vs outcome) reprennent des inférences par grep de
  la REVUE, à confirmer page par page.

---

## Journal

**2026-07-23** — Création. Deuxième document de la série « solutions par défaut ». Trois options (jeu
subordonné et cloisonné / attestation seule / deux monnaies re-motivées SDT) évaluées sous six
lentilles. Recommandation tranchée : **le credential evidence-based est la récompense — informationnelle,
donc sûre au sens de Deci & Ryan** ; le jeu devient un échafaudage mince, opt-in, non punitif, qui ne
touche jamais ni le credential ni la réflexion ; la North Star enterprise passe de la présence à la
compétence démontrée. Firewall de A immédiat (soustraction, indépendante du défaut 1 : retirer
l'XP-journal, ne pas construire l'atrophie-badge ni le claim payant), philosophie de B en destination
(suppose la colonne de preuve), deux emprunts bon marché à C (streak *forgiving* à la Duolingo + KPI
d'outcome), build complet de C différé en V2. Invariant gravé : une mécanique d'engagement ne modifie
jamais un niveau, ne rétrograde jamais un credential, ne rémunère jamais la réflexion — le déclin d'une
compétence alimente un signal de fraîcheur, pas un downgrade.
