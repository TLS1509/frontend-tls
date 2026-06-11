# TLS — User Flows / User Journeys

> **Source de vérité** des parcours utilisateur de la plateforme The Learning Society.
> Le board FigJam **miroir** ce fichier — toute modification de flow se fait ici d'abord, puis est poussée vers FigJam.
>
> 📋 **FigJam board** : https://www.figma.com/board/FVKxVsqxUkHmrUU5g7nFPx
> 🗂️ **Plan key** : `team::1496831231161753934`
> 🔑 **File key** : `FVKxVsqxUkHmrUU5g7nFPx`

---

## Légende globale (couleurs TLS)

Toutes les diagrammes partagent ce code couleur, aligné sur les design tokens TLS (`src/index.css` @theme).

| Couleur | Hex | Token | Signification |
|---------|-----|-------|---------------|
| 🔷 Dark teal | `#3D7786` | `primary-700` | Point d'entrée / sortie (auth, action déclenchante) |
| 🔵 Teal | `#55A1B4` | `primary-500` | Écran clé / hub central |
| 🟦 Bleu clair | `#E8F4F7` (stroke `#55A1B4`) | `primary-50` | Écran / page secondaire |
| 🟡 Amber | `#F8B044` | `accent-400` | Décision / branchement conditionnel |
| 🟠 Orange | `#ED843A` | `secondary-500` | Store persisté / effet de bord (Zustand + localStorage) |
| 🟢 Sage | `#9DBEBA` | `success-base` | Succès / résultat positif |
| 🔴 Coral | `#F28559` | `danger-base` | Erreur / blocage / chemin négatif |

```mermaid
flowchart LR
    A(["Entrée / sortie"]) --> B["Hub / écran clé"]
    B --> C["Écran secondaire"]
    C --> D{"Décision"}
    D -->|"oui"| E[("Store persisté")]
    D -->|"non"| F["Blocage"]
    E --> G["Succès"]
    style A fill:#3D7786,color:#ffffff
    style B fill:#55A1B4,color:#ffffff
    style C fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style D fill:#F8B044,color:#1a1a1a
    style E fill:#ED843A,color:#ffffff
    style F fill:#F28559,color:#ffffff
    style G fill:#9DBEBA,color:#1a1a1a
```

---

## Matrice de couverture — 15 flows

| # | Flow | Cahier CDC | Routes FO clés | Board FigJam | Statut doc |
|---|------|-----------|----------------|:---:|:---:|
| 1 | Onboarding Particulier | 03 | `/onboarding/*` | ✅ | ✅ |
| 2 | Subscription Management | 11bis | `/subscriptions`, `/billing/*` | ✅ | ✅ |
| 3 | Coaching & Booking | 04 | `/coaching/*`, `/coach/*` | ✅ | ✅ |
| 4 | Parcours & Learning Space | 01 | `/learning-paths/*`, `/lesson/*` | ✅ | ✅ |
| 5 | Journal de Bord Réflexif | 07 | `/journal/*` | ✅ | ✅ |
| 6 | Gamification & Badges | 05 | `/dashboard/badges`, `/badge/:id` | ✅ | ✅ |
| 7 | Passeport Compétences | 02 | `/passeport/*`, `/coach/passeport` | ✅ | ✅ |
| 8 | Chatbot IA & QAR | 12 | `/chatbot/*` | ✅ | ✅ |
| 9 | Enterprise FO Space | 06 | `/enterprise/*` | ✅ | ✅ |
| 10 | Notifications Management | 09 | `/notifications/*` | ✅ | ✅ |
| 11 | Projects SBO | 11 | `/projects/*`, `/project/:id/*` | ✅ | ✅ |
| 12 | Helpcenter Wiki Support | 13 | `/help/*` | ✅ | ✅ |
| 13 | GDPR / AI Act / Security | 13bis | `/privacy/*` | ✅ | ✅ |
| 14 | Masterclass & Événements | 08 | `/events`, `/event/:id/*` | ✅ | ✅ |
| 15 | Veille & Newsletter | 01bis | `/veille/*`, newsletter | ✅ | ✅ |

> ✅ **Board complet** — 15 flows + légende poussés sur FigJam le 2026-06-09.

### Cahiers sans flow FO dédié (et pourquoi)

| Cahier | Raison |
|--------|--------|
| 10 — Analytics Tracking | Infrastructure backend / dashboard BO ; pas de parcours apprenant FO. |
| 10bis — Back-Office Org UX | Hors scope FO React (plugin WordPress BO séparé). |
| 12bis — IA Features Framework | Transversal — overlay IA réparti sur les flows 1, 3, 8 (positionnement, matching coach, chatbot RAG), pas un parcours autonome. |

> ✅ **Couverture complète** : 15 flows couvrent l'intégralité des parcours utilisateur FO (apprenant + manager). Les 3 cahiers ci-dessus n'ont volontairement pas de flow FO.

---

## 1 — Onboarding Particulier `CDC/03`

Parcours d'inscription : profil → positionnement Dreyfus → abonnement → tutoriel → dashboard.

```mermaid
flowchart TB
    START(["Inscription / Magic Link"]) --> PROFIL["/onboarding — Profil : prenom / role / secteur"]
    PROFIL --> OBJ["Objectifs d apprentissage"]
    OBJ --> RYTHME["Rythme d apprentissage"]
    RYTHME --> CONFIRM["Confirmation + parcours suggere IA"]
    CONFIRM --> S1[("profileStore.set — onboardingStep: questionnaire")]
    S1 --> QUEST["/onboarding/questionnaire — 8 questions Dreyfus"]
    QUEST --> S2[("Seed passeportStore + positioningStore")]
    S2 --> PAY["/onboarding/payment — 4 formules"]
    PAY --> FREE{"Plan gratuit ?"}
    FREE -->|"Oui"| COMMIT[("commitPlan — tier free, step: tutorial")]
    FREE -->|"Payant"| CB["Formulaire CB + ConfirmModal"]
    CB --> COMMIT
    COMMIT --> TUTO["/onboarding/tutorial — visite guidee"]
    TUTO --> SUCCESS["/onboarding/success"]
    SUCCESS --> S3[("isOnboarded: true + badge first-login +150 XP")]
    S3 --> DASH["/dashboard — empty state premiere visite"]

    style START fill:#3D7786,color:#ffffff
    style DASH fill:#55A1B4,color:#ffffff
    style FREE fill:#F8B044,color:#1a1a1a
    style PROFIL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style OBJ fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style RYTHME fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style CONFIRM fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style QUEST fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style PAY fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style CB fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style TUTO fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style SUCCESS fill:#9DBEBA,color:#1a1a1a
    style S1 fill:#ED843A,color:#ffffff
    style S2 fill:#ED843A,color:#ffffff
    style S3 fill:#ED843A,color:#ffffff
    style COMMIT fill:#ED843A,color:#ffffff
```

---

## 2 — Subscription Management `CDC/11bis`

Gestion d'abonnement : upgrade / downgrade / annulation + facturation + relances (dunning).

```mermaid
flowchart TB
    START(["Utilisateur authentifie"]) --> HUB["/subscriptions — formule actuelle"]
    HUB --> ACTION{"Action"}
    ACTION -->|"Upgrade"| UP["Selection formule superieure"]
    ACTION -->|"Downgrade"| DOWN["Selection formule inferieure"]
    ACTION -->|"Annuler"| CANCEL["Parcours de retention"]
    ACTION -->|"Facturation"| BILL["/billing — historique factures"]

    UP --> PRORATA["Calcul prorata"]
    PRORATA --> STRIPE["Paiement Stripe"]
    STRIPE --> S1[("subscriptionStore.patch — nouveau tier immediat")]
    DOWN --> NEXTCYCLE["Effet au prochain cycle"]
    NEXTCYCLE --> S1
    CANCEL --> CONFIRMC{"Confirmer l annulation ?"}
    CONFIRMC -->|"Oui"| S2[("Tier free a la fin de periode")]
    CONFIRMC -->|"Non"| HUB
    S1 --> HUB
    S2 --> HUB

    BILL --> INVOICE["/billing/invoice/:id — detail facture"]

    DUNNING(["Echec de prelevement"]) --> RETRY{"Tentative J+3 / J+5 / J+7"}
    RETRY -->|"Succes"| OK["Abonnement maintenu"]
    RETRY -->|"3 echecs"| SUSPEND["Abonnement suspendu"]

    style START fill:#3D7786,color:#ffffff
    style DUNNING fill:#3D7786,color:#ffffff
    style HUB fill:#55A1B4,color:#ffffff
    style ACTION fill:#F8B044,color:#1a1a1a
    style CONFIRMC fill:#F8B044,color:#1a1a1a
    style RETRY fill:#F8B044,color:#1a1a1a
    style UP fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style DOWN fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style CANCEL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style BILL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style INVOICE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style PRORATA fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style STRIPE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style NEXTCYCLE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style OK fill:#9DBEBA,color:#1a1a1a
    style S1 fill:#ED843A,color:#ffffff
    style S2 fill:#ED843A,color:#ffffff
    style SUSPEND fill:#F28559,color:#ffffff
```

---

## 3 — Coaching & Booking `CDC/04`

Accompagnement 1:1 : assignation coach → réservation (check crédits) → session → corrections.

```mermaid
flowchart TB
    START(["Utilisateur authentifie"]) --> HUB["/coaching — hub"]
    HUB --> ASSIGNED{"Coach assigne ?"}
    ASSIGNED -->|"Non"| REQUEST["Demander un coach"]
    ASSIGNED -->|"Oui"| SESSION{"Session a venir ?"}
    REQUEST --> SESSION

    SESSION -->|"Non"| BOOK["BookingModal — choix creneau"]
    BOOK --> CREDIT{"Credits suffisants ?"}
    CREDIT -->|"Inclus / Pro / Entreprise"| CONFIRM["Confirmer la reservation"]
    CREDIT -->|"Free sans credit"| PAY["Paiement session 75 euros"]
    PAY --> CONFIRM
    CONFIRM --> S1[("coachingStore — session creee (booked)")]
    S1 --> HUB

    SESSION -->|"Oui"| UPCOMING["Carte prochaine session"]
    UPCOMING --> JOIN["Rejoindre la visio"]
    UPCOMING --> RESCHED["Reprogrammer"]
    UPCOMING --> CANCELQ{"Annuler — sous 48h ?"}
    CANCELQ -->|"Plus de 48h"| REFUND["Annulation + remboursement credit"]
    CANCELQ -->|"Moins de 48h"| NOREFUND["Annulation sans remboursement"]
    REFUND --> S2[("Credit re-credite")]
    NOREFUND --> HUB
    S2 --> HUB

    HUB --> TOOLS["Outils : pre-questionnaire / compte-rendu / journal"]
    HUB --> CORR["/coaching/corrections — mes corrections"]
    CORR --> CDETAIL["Correction detail"]
    CDETAIL --> RESUBMIT["Resoumettre une version"]
    RESUBMIT --> S3[("updateCorrection — status: learner-response")]

    style START fill:#3D7786,color:#ffffff
    style HUB fill:#55A1B4,color:#ffffff
    style ASSIGNED fill:#F8B044,color:#1a1a1a
    style SESSION fill:#F8B044,color:#1a1a1a
    style CREDIT fill:#F8B044,color:#1a1a1a
    style CANCELQ fill:#F8B044,color:#1a1a1a
    style REQUEST fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style BOOK fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style PAY fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style CONFIRM fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style UPCOMING fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style JOIN fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style RESCHED fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style TOOLS fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style CORR fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style CDETAIL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style RESUBMIT fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style REFUND fill:#9DBEBA,color:#1a1a1a
    style S1 fill:#ED843A,color:#ffffff
    style S2 fill:#ED843A,color:#ffffff
    style S3 fill:#ED843A,color:#ffffff
    style NOREFUND fill:#F28559,color:#ffffff
```

---

## 4 — Parcours & Learning Space `CDC/01`

Navigation parcours : positionnement → reprise → étapes → leçons (6 types) → progression.

```mermaid
flowchart TB
    START(["Utilisateur authentifie"]) --> LIST["/learning-paths — catalogue"]
    LIST --> DETAIL["/learning-paths/:id — detail parcours"]
    DETAIL --> POSQ{"Positionnement fait ?"}
    POSQ -->|"Non"| POS["/positionnement — Dreyfus auto (skippable)"]
    POSQ -->|"Oui"| RESUME["Reprendre ou j en etais"]
    POS --> RESUME
    RESUME --> ETAPE["Etape du parcours"]
    ETAPE --> TIER{"Plan suffisant ?"}
    TIER -->|"Verrouille"| UPSELL["Contenu premium — upgrade"]
    TIER -->|"Accessible"| LESSON["/lesson/:id"]
    LESSON --> TYPE{"Type de lecon"}
    TYPE -->|"Video"| V["Lecteur video"]
    TYPE -->|"Article"| A["Article EDRAC"]
    TYPE -->|"Flashcards"| F["Flashcards"]
    TYPE -->|"Astuces"| AS["Astuces"]
    TYPE -->|"Mission"| M["Mission pratique"]
    TYPE -->|"Replay"| R["Replay session"]
    V --> COMPLETE
    A --> COMPLETE
    F --> COMPLETE
    AS --> COMPLETE
    M --> COMPLETE
    R --> COMPLETE
    COMPLETE["Lecon terminee"] --> S1[("lessonProgressStore + XP +50")]
    S1 --> ORDER{"Mode progression"}
    ORDER -->|"Strict — lecon suivante"| ETAPE
    ORDER -->|"Parcours termine"| DONE["Parcours complete + badge"]

    style START fill:#3D7786,color:#ffffff
    style DETAIL fill:#55A1B4,color:#ffffff
    style POSQ fill:#F8B044,color:#1a1a1a
    style TIER fill:#F8B044,color:#1a1a1a
    style TYPE fill:#F8B044,color:#1a1a1a
    style ORDER fill:#F8B044,color:#1a1a1a
    style LIST fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style POS fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style RESUME fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style ETAPE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style LESSON fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style V fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style A fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style F fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style AS fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style M fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style R fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style COMPLETE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style DONE fill:#9DBEBA,color:#1a1a1a
    style S1 fill:#ED843A,color:#ffffff
    style UPSELL fill:#F28559,color:#ffffff
```

---

## 5 — Journal de Bord Réflexif `CDC/07`

Écriture réflexive : type → mood → EDRA-R → auto-save → publication. Pré-remplissage contextuel.

```mermaid
flowchart TB
    START(["Utilisateur authentifie"]) --> DB["Dashboard"]
    DB --> CONTEXT{"Contexte entrant ?"}
    CONTEXT -->|"Apres session coaching"| PRECOACH["Type pre-selectionne : session-coaching"]
    CONTEXT -->|"Apres une lecon ?itemId"| PRELESSON["linkedItemId pre-rempli"]
    CONTEXT -->|"Acces direct"| HUB
    PRECOACH --> NEW
    PRELESSON --> NEW

    HUB["Journal Hub — liste des entrees"] --> FIRST{"Premiere visite ?"}
    FIRST -->|"Oui"| EMPTY["Empty State — Commencer ma premiere reflexion"]
    FIRST -->|"Non"| LISTE["Entrees filtrees par type / mood / date"]
    EMPTY --> NEW["Nouvelle entree — /journal/new"]
    LISTE --> NEW
    LISTE --> DETAIL["Journal Detail — lecture + partage"]

    NEW --> TYPE["Choisir le type — Libre / Apprentissage / Pratique / Coaching / Eureka"]
    TYPE --> MOOD["MoodSelector — Motive / Serein / Challenge / Incertain / Decourage"]
    MOOD --> EDRAR{"Type EDRA-R ?"}
    EDRAR -->|"Apprentissage ou Pratique Pro"| ACCORDION["Template EDRA-R — questions structurees"]
    EDRAR -->|"Autres types"| WRITE
    ACCORDION --> WRITE["Zone d ecriture — Titre + Corps"]
    WRITE --> AUTOSAVE[("Auto-save 3s — journalStore.addEntry / updateEntry")]
    AUTOSAVE --> WRITE
    WRITE --> PUBLISH["Publier l entree"]
    PUBLISH --> XP[("XP +20 — gamifStore.addXPEvent")]
    XP --> SUCCESS["Toast : Entree enregistree"]
    SUCCESS --> HUB

    style START fill:#3D7786,color:#ffffff
    style DB fill:#55A1B4,color:#ffffff
    style HUB fill:#55A1B4,color:#ffffff
    style CONTEXT fill:#F8B044,color:#1a1a1a
    style FIRST fill:#F8B044,color:#1a1a1a
    style EDRAR fill:#F8B044,color:#1a1a1a
    style EMPTY fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style LISTE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style DETAIL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style NEW fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style TYPE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style MOOD fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style ACCORDION fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style WRITE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style PUBLISH fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style PRECOACH fill:#9DBEBA,color:#1a1a1a
    style PRELESSON fill:#9DBEBA,color:#1a1a1a
    style SUCCESS fill:#9DBEBA,color:#1a1a1a
    style AUTOSAVE fill:#ED843A,color:#ffffff
    style XP fill:#ED843A,color:#ffffff
```

---

## 6 — Gamification & Badges `CDC/05`

Ledger XP append-only → badges auto-attribués → streaks → leaderboard → export Open Badges.

```mermaid
flowchart TB
    START(["Action utilisateur"]) --> ACTION{"Type d action"}
    ACTION -->|"Lecon terminee"| XP1[("XP +50 — addXPEvent")]
    ACTION -->|"Journal publie"| XP2[("XP +20 — addXPEvent")]
    ACTION -->|"Session coaching"| XP3[("XP +100 — addXPEvent")]
    ACTION -->|"Badge debloque"| XP4[("XP +150 — addXPEvent")]

    XP1 --> CHECK{"Seuil badge atteint ?"}
    XP2 --> CHECK
    XP3 --> CHECK
    XP4 --> DASHBOARD

    CHECK -->|"Oui"| AWARD["Badge auto-awarded — awardBadge"]
    CHECK -->|"Non"| STREAK{"Activite dans les 24h ?"}
    AWARD --> TOAST["Celebration toast — badge debloque"]
    TOAST --> STREAK

    STREAK -->|"Oui"| INC[("Streak +1")]
    STREAK -->|"Non — inactivite"| RESET["Streak remis a zero"]
    INC --> DASHBOARD["Dashboard — XP bar + streak + badges"]
    RESET --> DASHBOARD

    DASHBOARD --> BADGES["Page Badges — collection"]
    DASHBOARD --> LEADERBOARD["Leaderboard — hebdo / global"]
    BADGES --> BADGE_DETAIL["Badge Detail — criteres + XP"]
    BADGE_DETAIL --> SHARE["Partager — lien public"]
    BADGE_DETAIL --> EXPORT["Export Open Badges 2.0 — .json"]

    style START fill:#3D7786,color:#ffffff
    style ACTION fill:#F8B044,color:#1a1a1a
    style CHECK fill:#F8B044,color:#1a1a1a
    style STREAK fill:#F8B044,color:#1a1a1a
    style XP1 fill:#ED843A,color:#ffffff
    style XP2 fill:#ED843A,color:#ffffff
    style XP3 fill:#ED843A,color:#ffffff
    style XP4 fill:#ED843A,color:#ffffff
    style INC fill:#ED843A,color:#ffffff
    style DASHBOARD fill:#55A1B4,color:#ffffff
    style AWARD fill:#9DBEBA,color:#1a1a1a
    style TOAST fill:#9DBEBA,color:#1a1a1a
    style BADGES fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style LEADERBOARD fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style BADGE_DETAIL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style SHARE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style EXPORT fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style RESET fill:#F28559,color:#ffffff
```

---

## 7 — Passeport Compétences `CDC/02`

Modèle Dreyfus (1-5) → preuves → objectifs → JAC (validation coach) → montée de niveau.

```mermaid
flowchart TB
    START(["Utilisateur authentifie"]) --> SEED{"Passeport initie ?"}
    SEED -->|"Non — premiere fois"| ONBOARDING["Questionnaire onboarding — 8 competences"]
    SEED -->|"Oui"| HUB
    ONBOARDING --> SEEDSTORE[("Seed passeportStore — 8 competences niveaux 1 a 5")]
    SEEDSTORE --> HUB["Passeport Hub — radar + liste competences"]

    HUB --> COMPETENCE["Competence Detail — niveau + historique"]
    HUB --> OBJECTIFS["Objectifs — goals actifs + deadlines"]
    HUB --> ROADMAP["Roadmap — parcours recommandes"]
    HUB --> JAC["JAC — points de validation coach"]
    HUB --> HISTORIQUE["Historique — evolution niveaux"]

    COMPETENCE --> EVIDENCE["Ajouter preuve — lecon / projet / journal"]
    EVIDENCE --> EVT[("updateCompetency — preuve persistee")]
    EVT --> COMPETENCE
    COMPETENCE --> GOAL["Definir objectif — niveau cible + date"]
    GOAL --> GOALSTORE[("addGoal — objectif persiste")]

    JAC --> VALID{"Validation coach ?"}
    VALID -->|"Approuve"| LEVELUP["Niveau Dreyfus +1"]
    VALID -->|"Refuse"| FEEDBACK["Feedback coach — axes d amelioration"]
    LEVELUP --> XP[("XP +100 — addXPEvent")]
    XP --> HUB
    FEEDBACK --> COMPETENCE

    COACH["Vue Coach — heatmap competences apprenant"] --> JAC

    style START fill:#3D7786,color:#ffffff
    style HUB fill:#55A1B4,color:#ffffff
    style SEED fill:#F8B044,color:#1a1a1a
    style VALID fill:#F8B044,color:#1a1a1a
    style ONBOARDING fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style COMPETENCE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style OBJECTIFS fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style ROADMAP fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style JAC fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style HISTORIQUE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style EVIDENCE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style GOAL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style COACH fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style LEVELUP fill:#9DBEBA,color:#1a1a1a
    style SEEDSTORE fill:#ED843A,color:#ffffff
    style EVT fill:#ED843A,color:#ffffff
    style GOALSTORE fill:#ED843A,color:#ffffff
    style XP fill:#ED843A,color:#ffffff
    style FEEDBACK fill:#F28559,color:#ffffff
```

---

## 8 — Chatbot IA & QAR `CDC/12`

Points d'entrée → filtrage PII → injection contexte → QAR / Mistral RAG → persistance thread.

```mermaid
flowchart TB
    START(["Utilisateur authentifie"]) --> TRIGGER{"Point d entree"}
    TRIGGER -->|"Bouton flottant"| PANEL["Chat panel overlay"]
    TRIGGER -->|"Route /chatbot"| FULL["Chatbot pleine page — threads"]
    TRIGGER -->|"Page lecon"| CTX["Contexte lecon injecte"]

    PANEL --> THREAD
    FULL --> THREADS["Historique conversations"]
    THREADS --> THREAD["Thread actif — fil de messages"]
    THREADS --> NEWT["Nouvelle conversation"]
    NEWT --> THREAD
    CTX --> THREAD

    THREAD --> INPUT["Saisie utilisateur"]
    INPUT --> PII{"Filtrage PII ?"}
    PII -->|"PII detecte"| MASK["Masquage avant envoi API"]
    PII -->|"Clean"| INJECT
    MASK --> INJECT["Injection contexte — parcours + passeport + lecon"]
    INJECT --> QAR{"Reponse dans la base de connaissance ?"}
    QAR -->|"Oui — QAR match"| QUICK["Reponse rapide — snippet KB"]
    QAR -->|"Non — complexe"| MISTRAL["API Mistral RAG"]
    QUICK --> STORE[("ChatThread persiste — addMessage")]
    MISTRAL --> RESPONSE["Reponse avec citations sources"]
    RESPONSE --> STORE
    STORE --> THREAD
    MISTRAL -->|"Erreur API"| ERROR["Message d erreur — reessayer"]
    ERROR --> INPUT

    style START fill:#3D7786,color:#ffffff
    style THREAD fill:#55A1B4,color:#ffffff
    style TRIGGER fill:#F8B044,color:#1a1a1a
    style PII fill:#F8B044,color:#1a1a1a
    style QAR fill:#F8B044,color:#1a1a1a
    style PANEL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style FULL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style CTX fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style THREADS fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style NEWT fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style INPUT fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style INJECT fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style MISTRAL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style RESPONSE fill:#9DBEBA,color:#1a1a1a
    style QUICK fill:#9DBEBA,color:#1a1a1a
    style MASK fill:#9DBEBA,color:#1a1a1a
    style STORE fill:#ED843A,color:#ffffff
    style ERROR fill:#F28559,color:#ffffff
```

---

## 9 — Enterprise FO Space `CDC/06` ⏳

Espace organisation : équipes → membres (RBAC) → pool de crédits → workflow d'approbation → analytics.

```mermaid
flowchart TB
    START(["Manager / Admin authentifie"]) --> DASH["/enterprise/dashboard — vue organisation"]
    DASH --> TEAMS["/enterprise/teams — equipes"]
    DASH --> MEMBERS["/enterprise/members — membres"]
    DASH --> ANALYTICS["/enterprise/analytics — progression equipes"]
    DASH --> SETTINGS["/enterprise/settings — pool de credits + RBAC"]

    TEAMS --> CREATETEAM["Creer / editer une equipe"]
    CREATETEAM --> ASSIGN["Affecter des membres"]
    ASSIGN --> S1[("enterpriseStore — equipe persistee")]

    MEMBERS --> INVITE["Inviter un membre"]
    INVITE --> SEAT{"Siege disponible ?"}
    SEAT -->|"Oui"| ROLE["Attribution role RBAC"]
    SEAT -->|"Non"| FULLSEATS["Quota atteint — acheter des sieges"]
    ROLE --> S2[("EnterpriseUser persiste")]

    MEMBERS --> APPROVAL["Demande de formation membre"]
    APPROVAL --> APPROVEQ{"Approbation manager ?"}
    APPROVEQ -->|"Approuve"| DEBIT[("Debit pool de credits")]
    APPROVEQ -->|"Refuse"| REJECT["Demande refusee + motif"]
    DEBIT --> GRANTED["Acces formation accorde"]

    style START fill:#3D7786,color:#ffffff
    style DASH fill:#55A1B4,color:#ffffff
    style SEAT fill:#F8B044,color:#1a1a1a
    style APPROVEQ fill:#F8B044,color:#1a1a1a
    style TEAMS fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style MEMBERS fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style ANALYTICS fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style SETTINGS fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style CREATETEAM fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style ASSIGN fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style INVITE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style ROLE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style APPROVAL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style GRANTED fill:#9DBEBA,color:#1a1a1a
    style S1 fill:#ED843A,color:#ffffff
    style S2 fill:#ED843A,color:#ffffff
    style DEBIT fill:#ED843A,color:#ffffff
    style FULLSEATS fill:#F28559,color:#ffffff
    style REJECT fill:#F28559,color:#ffffff
```

---

## 10 — Notifications Management `CDC/09` ⏳

Événement → création notification → routage par canal → préférences → centre de notifications.

```mermaid
flowchart TB
    START(["Evenement declencheur"]) --> CREATE[("notificationStore — notification creee")]
    CREATE --> CHANNEL{"Routage par canal"}
    CHANNEL -->|"In-app"| INAPP["Badge + centre de notifications"]
    CHANNEL -->|"Email"| EMAIL["Email transactionnel"]
    CHANNEL -->|"Push / SMS"| PUSH["Push / SMS"]

    INAPP --> PREFCHECK{"Preference utilisateur active ?"}
    EMAIL --> PREFCHECK
    PUSH --> PREFCHECK
    PREFCHECK -->|"Active"| DELIVER["Notification delivree"]
    PREFCHECK -->|"Desactivee"| SUPPRESS["Notification supprimee"]

    DELIVER --> HUB["/notifications — centre"]
    HUB --> READ["Marquer comme lue"]
    HUB --> NAV["Naviguer vers la source"]
    READ --> S1[("status: read persiste")]

    HUB --> PREFS["/notifications/preferences"]
    PREFS --> TOGGLE["Toggle canaux + frequence"]
    TOGGLE --> S2[("NotificationPreference persistee")]

    style START fill:#3D7786,color:#ffffff
    style HUB fill:#55A1B4,color:#ffffff
    style CHANNEL fill:#F8B044,color:#1a1a1a
    style PREFCHECK fill:#F8B044,color:#1a1a1a
    style INAPP fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style EMAIL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style PUSH fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style NAV fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style READ fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style PREFS fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style TOGGLE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style DELIVER fill:#9DBEBA,color:#1a1a1a
    style CREATE fill:#ED843A,color:#ffffff
    style S1 fill:#ED843A,color:#ffffff
    style S2 fill:#ED843A,color:#ffffff
    style SUPPRESS fill:#F28559,color:#ffffff
```

---

## 11 — Projects SBO `CDC/11` ⏳

Projets (Upskilling / STRIDE / Custom) → gating compétence → tâches → soumission → JAC.

```mermaid
flowchart TB
    START(["Utilisateur authentifie"]) --> HUB["/projects — catalogue projets"]
    HUB --> DETAIL["/project/:id — detail (type: Upskilling / STRIDE / Custom)"]
    DETAIL --> GATE{"Niveau competence requis ?"}
    GATE -->|"Insuffisant"| LOCKED["Projet verrouille — prerequis Passeport"]
    GATE -->|"Suffisant"| TASKS["/project/:id/tasks — liste des taches"]
    TASKS --> TASK["Tache individuelle"]
    TASK --> SUBMIT["/project/:id/task/:id/submit — soumettre"]
    SUBMIT --> S1[("TaskSubmission persistee")]
    S1 --> CORRECTION["Correction coach"]
    CORRECTION --> JAC{"Validation JAC ?"}
    JAC -->|"Approuve"| LEVELUP["Competence +1 + XP"]
    JAC -->|"A resoumettre"| RESUBMIT["Feedback — nouvelle version"]
    LEVELUP --> S2[("passeportStore + gamifStore")]
    RESUBMIT --> SUBMIT

    style START fill:#3D7786,color:#ffffff
    style HUB fill:#55A1B4,color:#ffffff
    style GATE fill:#F8B044,color:#1a1a1a
    style JAC fill:#F8B044,color:#1a1a1a
    style DETAIL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style TASKS fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style TASK fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style SUBMIT fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style CORRECTION fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style RESUBMIT fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style LEVELUP fill:#9DBEBA,color:#1a1a1a
    style S1 fill:#ED843A,color:#ffffff
    style S2 fill:#ED843A,color:#ffffff
    style LOCKED fill:#F28559,color:#ffffff
```

---

## 12 — Helpcenter Wiki Support `CDC/13` ⏳

Centre d'aide : FAQ → recherche fulltext → article → utile ? → ticket support.

```mermaid
flowchart TB
    START(["Utilisateur authentifie"]) --> HUB["/help — centre d aide"]
    HUB --> BROWSE["Parcourir categories FAQ"]
    HUB --> SEARCH["/help/search — recherche fulltext"]
    BROWSE --> ARTICLE["/help/article/:id — article"]
    SEARCH --> ARTICLE
    ARTICLE --> HELPFUL{"Article utile ?"}
    HELPFUL -->|"Oui"| RESOLVED["Probleme resolu"]
    HELPFUL -->|"Non"| CONTACT["/help/contact-support"]
    CONTACT --> FORM["Formulaire ticket — sujet + description"]
    FORM --> SUBMIT[("SupportTicket cree")]
    SUBMIT --> CONFIRM["Confirmation — numero de ticket"]

    style START fill:#3D7786,color:#ffffff
    style HUB fill:#55A1B4,color:#ffffff
    style HELPFUL fill:#F8B044,color:#1a1a1a
    style BROWSE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style SEARCH fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style ARTICLE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style CONTACT fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style FORM fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style CONFIRM fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style RESOLVED fill:#9DBEBA,color:#1a1a1a
    style SUBMIT fill:#ED843A,color:#ffffff
```

---

## 13 — GDPR / AI Act / Security `CDC/13bis` ⏳

Confidentialité : consentements → DSAR (export ZIP, token 7j) → export données → suppression compte.

```mermaid
flowchart TB
    START(["Utilisateur authentifie"]) --> HUB["Confidentialite — parametres privacy"]
    HUB --> CONSENT["/privacy/consent — gestion consentements"]
    HUB --> DSAR["/privacy/dsar — demande d acces"]
    HUB --> EXPORT["/privacy/data-export — export donnees"]
    HUB --> DELETE["/privacy/delete-account — suppression"]

    CONSENT --> TOGGLE["Toggle consentements"]
    TOGGLE --> S1[("ConsentRecord — timestamp explicite")]

    DSAR --> GENERATE["Generer archive ZIP"]
    GENERATE --> TOKEN[("Token de telechargement — 7 jours")]
    TOKEN --> DOWNLOAD["Telecharger l archive"]

    EXPORT --> GENERATE

    DELETE --> EXISTING{"Demande deja en cours ?"}
    EXISTING -->|"Oui"| PENDING["Suppression deja planifiee"]
    EXISTING -->|"Non"| STEP1["Etape 1 — confirmation"]
    STEP1 --> STEP2["Etape 2 — motif"]
    STEP2 --> SUBMITDEL[("Demande de suppression persistee")]
    SUBMITDEL --> SCHEDULED["Compte supprime sous 30 jours"]

    style START fill:#3D7786,color:#ffffff
    style HUB fill:#55A1B4,color:#ffffff
    style EXISTING fill:#F8B044,color:#1a1a1a
    style CONSENT fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style DSAR fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style EXPORT fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style DELETE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style TOGGLE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style GENERATE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style DOWNLOAD fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style STEP1 fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style STEP2 fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style PENDING fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style SCHEDULED fill:#9DBEBA,color:#1a1a1a
    style S1 fill:#ED843A,color:#ffffff
    style TOKEN fill:#ED843A,color:#ffffff
    style SUBMITDEL fill:#ED843A,color:#ffffff
```

---

## 14 — Masterclass & Événements `CDC/08` ⏳

Événements live : catalogue → détail → réservation (gating plan) → participation live/replay → feedback.

```mermaid
flowchart TB
    START(["Utilisateur authentifie"]) --> HUB["/events — catalogue evenements"]
    HUB --> DETAIL["/event/:id — detail (masterclass / atelier / live)"]
    DETAIL --> ACCESS{"Acces inclus dans le plan ?"}
    ACCESS -->|"Premium / credit"| BOOKING["/event/:id/booking — reservation"]
    ACCESS -->|"Non inclus"| UPSELL["Contenu premium — upgrade ou credit"]
    BOOKING --> S1[("Attendance persistee — place reservee")]
    S1 --> CONFIRM["Confirmation + ajout calendrier (.ics)"]
    CONFIRM --> DDAY{"Jour J ?"}
    DDAY -->|"En direct"| ATTEND["/event/:id/attend — live visio"]
    DDAY -->|"Apres l evenement"| REPLAY["Replay disponible"]
    ATTEND --> POST["Post-evenement — feedback + reflexion journal"]
    REPLAY --> POST
    POST --> XP[("XP + badge participation")]

    style START fill:#3D7786,color:#ffffff
    style HUB fill:#55A1B4,color:#ffffff
    style ACCESS fill:#F8B044,color:#1a1a1a
    style DDAY fill:#F8B044,color:#1a1a1a
    style DETAIL fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style BOOKING fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style CONFIRM fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style ATTEND fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style REPLAY fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style POST fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style S1 fill:#ED843A,color:#ffffff
    style XP fill:#ED843A,color:#ffffff
    style UPSELL fill:#F28559,color:#ffffff
```

---

## 15 — Veille & Newsletter `CDC/01bis` ⏳

Veille apprenante : hub → formats (article / vidéo / newsletter / agrégé IA) → gating plan → sauvegarde + abonnement newsletter.

```mermaid
flowchart TB
    START(["Utilisateur authentifie"]) --> HUB["/veille — hub veille"]
    HUB --> FORMAT{"Format de contenu"}
    FORMAT -->|"Article"| ARTICLE["/veille/article/:id"]
    FORMAT -->|"Video / Tutoriel"| VIDEO["/veille/tutoriel/:id"]
    FORMAT -->|"Newsletter"| NEWS["Newsletter hebdo"]
    FORMAT -->|"Perplexity / agrege"| PERPLEX["Contenu agrege IA"]

    HUB --> TIER{"Niveau d abonnement"}
    TIER -->|"Free"| MONTHLY["Resume mensuel uniquement"]
    TIER -->|"Payant"| DAILY["Veille quotidienne + archives"]

    ARTICLE --> SAVE["Sauvegarder / liker"]
    VIDEO --> SAVE
    PERPLEX --> SAVE
    SAVE --> S1[("Contenu sauvegarde persiste")]

    NEWS --> SUB{"Abonne newsletter ?"}
    SUB -->|"Oui"| DIGEST["Digest hebdomadaire par email"]
    SUB -->|"Non"| SUBSCRIBE["S abonner a la newsletter"]
    SUBSCRIBE --> S2[("Preference newsletter persistee")]

    style START fill:#3D7786,color:#ffffff
    style HUB fill:#55A1B4,color:#ffffff
    style FORMAT fill:#F8B044,color:#1a1a1a
    style TIER fill:#F8B044,color:#1a1a1a
    style SUB fill:#F8B044,color:#1a1a1a
    style ARTICLE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style VIDEO fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style NEWS fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style PERPLEX fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style DAILY fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style MONTHLY fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style SAVE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style SUBSCRIBE fill:#E8F4F7,stroke:#55A1B4,color:#1a1a1a
    style DIGEST fill:#9DBEBA,color:#1a1a1a
    style S1 fill:#ED843A,color:#ffffff
    style S2 fill:#ED843A,color:#ffffff
```

---

## Procédure de synchronisation FigJam

Quand le connecteur Figma est actif, pousser les flows `⏳` vers le board :

1. `generate_diagram` avec `fileKey: FVKxVsqxUkHmrUU5g7nFPx`, `planKey: team::1496831231161753934`
2. Coller le `mermaidSyntax` exact depuis ce fichier (parité doc ↔ board garantie)
3. Mettre à jour la colonne **Board FigJam** de la matrice de couverture (⏳ → ✅)
4. Ajouter un nœud légende sur le canvas si absent (cf. section Légende globale)

> **Règle** : ce fichier est la source de vérité. En cas de divergence doc ↔ board, le board est régénéré depuis le Mermaid de ce fichier.
