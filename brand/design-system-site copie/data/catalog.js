// AUTO-GENERATED from src/pages/Components.tsx — TLS Design System catalog
// Run: node scripts/generate-ds-catalog.js to regenerate
window.DS_COMPONENTS = [
 {
  "name": "Button",
  "codeName": "Button.tsx",
  "category": "Atoms",
  "subCategory": "Form fields",
  "description": "Single action trigger. Pill shape, clear hierarchy. One primary per screen. 14 variants : primary, secondary (orange), accent (yellow), ghost (light teal fill), outline (transparent + teal border), outline-warm (transparent + orange border), destructive, **glass** (DARK bg), **glass-light** + **glass-light-ghost** (LIGHT tinted bg), **glass-brand** + **glass-warm** + **glass-sun** (tone-aware frosted), link.",
  "keywords": [
   "cta",
   "action",
   "primary",
   "secondary",
   "accent",
   "ghost",
   "outline",
   "outline-warm",
   "destructive",
   "link",
   "glass",
   "frosted"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Button } from '@/components';"
 },
 {
  "name": "QuickActionButton",
  "codeName": "ui/QuickActionButton.tsx",
  "category": "Atoms",
  "subCategory": "Form fields",
  "description": "Action button compact card-shaped. Icon bubble tone-aware + label + subtitle optionnel + chevron right (anime au hover). 4 tones (primary/warm/sun/accent). Disabled state. À utiliser pour shortcuts / outils / quick links / tile-style CTA dans une section. Plus compact que IconFeatureCard/ActionCard, plus visuel qu\\'un Button standard.",
  "keywords": [
   "quick",
   "action",
   "button",
   "card",
   "icon",
   "tone",
   "chevron",
   "shortcut",
   "tile"
  ],
  "usedBy": [
   "Coaching"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { QuickActionButton } from '@/components';"
 },
 {
  "name": "Input",
  "codeName": "Input.tsx",
  "category": "Atoms",
  "subCategory": "Form fields",
  "description": "Form field. Label always above. Includes Checkbox, Radio, Switch sub-components.",
  "keywords": [
   "form",
   "text",
   "checkbox",
   "radio",
   "switch",
   "textarea"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Input } from '@/components';"
 },
 {
  "name": "Select",
  "codeName": "Select.tsx",
  "category": "Atoms",
  "subCategory": "Form fields",
  "description": "Native dropdown with chevron icon. Sizes sm/md/lg, status default/success/error.",
  "keywords": [
   "form",
   "dropdown",
   "select",
   "options"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Select } from '@/components';"
 },
 {
  "name": "Combobox",
  "codeName": "ui/Combobox.tsx",
  "category": "Atoms",
  "subCategory": "Form fields",
  "description": "Searchable single-select: <input> that filters a dropdown list. Keyboard nav (↑ ↓ Enter Esc Tab), selected state with Check icon. Sizes sm/md/lg, status default/success/error. Follows Select visual pattern.",
  "keywords": [
   "combobox",
   "autocomplete",
   "searchable",
   "select",
   "dropdown",
   "filter",
   "keyboard",
   "typeahead"
  ],
  "usedBy": [],
  "showcaseOnly": true,
  "layer": "ui",
  "import": "import { Combobox } from '@/components';"
 },
 {
  "name": "QualitativeRating",
  "codeName": "ui/QualitativeRating.tsx",
  "category": "Atoms",
  "subCategory": "Form fields",
  "description": "Labelled pill selector for qualitative feedback. A row of text pills (default: 5-level À améliorer→Excellent). Distinct from numeric star rating. Tone-aware (primary/warm/sun), sizes sm/md, wrap optional.",
  "keywords": [
   "rating",
   "qualitative",
   "feedback",
   "pills",
   "satisfaction",
   "evaluation",
   "survey",
   "scale"
  ],
  "usedBy": [],
  "showcaseOnly": true,
  "layer": "ui",
  "import": "import { QualitativeRating } from '@/components';"
 },
 {
  "name": "FormGroup",
  "codeName": "FormGroup.tsx",
  "category": "Atoms",
  "subCategory": "Form fields",
  "description": "Wrapper combining label + control + hint/error. Layouts: vertical (default) and horizontal.",
  "keywords": [
   "form",
   "label",
   "wrapper",
   "layout",
   "hint",
   "error"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { FormGroup } from '@/components';"
 },
 {
  "name": "Card",
  "codeName": "Card.tsx",
  "category": "Atoms",
  "subCategory": "Surfaces",
  "description": "Main content unit. 13 variants: default, feature, elevated, interactive, glass, glass-brand, glass-warm, glass-dark, minimal, bordered, muted, sunken, tinted. Tone-aware hover sur variant interactive.",
  "keywords": [
   "container",
   "surface",
   "feature",
   "elevated",
   "interactive",
   "glass",
   "minimal",
   "tinted",
   "tone"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Card } from '@/components';"
 },
 {
  "name": "Badge",
  "codeName": "ui/Badge.tsx",
  "category": "Atoms",
  "subCategory": "Status badges",
  "description": "Famille Badge unifiée — 3 exports : Badge (semantic), StatusBadge (état leçon), TrendingBadge (social proof). Tout dans Badge.tsx ; StatusBadge.tsx et TrendingBadge.tsx sont des re-exports.",
  "keywords": [
   "status",
   "label",
   "tag",
   "brand",
   "warm",
   "sun",
   "success",
   "danger",
   "trending",
   "popular",
   "new",
   "locked",
   "completed",
   "state"
  ],
  "usedBy": [
   "LessonCard",
   "ParcoursCard",
   "VeilleCardFeed",
   "Dashboard"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Badge } from '@/components';"
 },
 {
  "name": "Avatar",
  "codeName": "Avatar.tsx",
  "category": "Atoms",
  "subCategory": "Identity",
  "description": "User representation: image or initials. Stable hash-based tint. Status dot + AvatarGroup.",
  "keywords": [
   "user",
   "profile",
   "initials",
   "image",
   "status",
   "online",
   "group"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Avatar } from '@/components';"
 },
 {
  "name": "EmptyState",
  "codeName": "EmptyState.tsx",
  "category": "Feedback",
  "subCategory": "Empty/zero states",
  "description": "First contact / no results / server error. Always actionable — never a dead end.",
  "keywords": [
   "empty",
   "no results",
   "placeholder",
   "illustration"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { EmptyState } from '@/components';"
 },
 {
  "name": "Skeleton",
  "codeName": "Skeleton.tsx",
  "category": "Atoms",
  "subCategory": "Indicators",
  "description": "Placeholder shimmer matching expected content shape. Use for 1–3s loads.",
  "keywords": [
   "loading",
   "placeholder",
   "shimmer"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Skeleton } from '@/components';"
 },
 {
  "name": "SkeletonTemplates",
  "codeName": "patterns/SkeletonTemplates.tsx",
  "category": "Atoms",
  "subCategory": "Indicators",
  "description": "Templates shimmer pré-construits correspondant aux silhouettes des cards principales. Évite la duplication de placeholders. Templates disponibles : `ParcoursCardSkeleton`, `NotificationRowSkeleton`, `EditorialCardSkeleton`, `ResumeLessonSkeleton`, `ActivityItemSkeleton`. `SkeletonGrid` : wrap N templates dans une grille responsive.",
  "keywords": [
   "skeleton",
   "loading",
   "placeholder",
   "shimmer",
   "template",
   "grid",
   "card"
  ],
  "usedBy": [
   "Notifications",
   "LearningPaths",
   "Dashboard",
   "Veille",
   "Journal"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { SkeletonTemplates } from '@/components';"
 },
 {
  "name": "Search",
  "codeName": "Search.tsx",
  "category": "Navigation",
  "subCategory": "Search",
  "description": "Search bar composable. 4 variants (default/filled/ghost/glass) × 3 sizes (sm/default/lg). Props: shortcut, leadingIcon, trailing, filtersSlot, suggestions, isLoading, onSuggestionSelect. Glass variant pour fonds colorés/gradients.",
  "keywords": [
   "find",
   "query",
   "filter",
   "search",
   "input",
   "glass",
   "trailing",
   "suggestions",
   "autocomplete",
   "async"
  ],
  "usedBy": [
   "LearningPaths",
   "Veille",
   "Journal",
   "Help/Support",
   "Messages",
   "Leaderboard",
   "Recherche"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Search } from '@/components';"
 },
 {
  "name": "StatCard",
  "codeName": "ui/StatCard.tsx",
  "category": "Cards",
  "subCategory": "KPI & Stats",
  "description": "Prominent metric card. Display number + micro label + optional delta + icon. 5 variants (default / elevated / brand / warm / sun) · 3 sizes (sm/md/lg) · square mode for grid layouts.",
  "keywords": [
   "metric",
   "kpi",
   "stat",
   "dashboard",
   "square",
   "size"
  ],
  "usedBy": [
   "Dashboard (hero pre-Phase 10)",
   "LearningPaths (Phase 10 KPI row)",
   "Coaching",
   "Journal",
   "Notifications"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { StatCard } from '@/components';"
 },
 {
  "name": "ProgressBar",
  "codeName": "ProgressBar.tsx",
  "category": "Atoms",
  "subCategory": "Indicators",
  "description": "Linear progress tracking. Sizes sm/md/lg. Fills: brand, warm, gradient. **ProgressRing** : anneau SVG circulaire (sizes 48–100px) disponible via import séparé — utilisé dans profil, badges compétences, ReadingProgressRing dans les headers éditoriaux.",
  "keywords": [
   "progress",
   "linear",
   "bar",
   "percentage",
   "ring",
   "circle",
   "circular",
   "svg"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { ProgressBar } from '@/components';"
 },
 {
  "name": "ProgressRing",
  "codeName": "ui/ProgressRing.tsx",
  "category": "Atoms",
  "subCategory": "Indicators",
  "description": "Anneau SVG circulaire de progression (0–100). 5 tones (brand/warm/sun/success/danger). Gradient interne + halo glow optionnel. Animate 0→value au mount. Slots `label` (centré) et `valueLabel`. Sizes arbitraires via prop `size`, `thickness`.",
  "keywords": [
   "progress",
   "ring",
   "circle",
   "circular",
   "svg",
   "donut",
   "percentage",
   "glow",
   "tone"
  ],
  "usedBy": [
   "Profile",
   "CompetencyRadar",
   "ReadingProgressRing"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { ProgressRing } from '@/components';"
 },
 {
  "name": "ActionCard",
  "codeName": "ActionCard.tsx",
  "category": "Cards",
  "subCategory": "Generic",
  "description": "Carte action horizontale: icône colorée + titre + description + CTA. Tones: brand/warm/sun. Hover: translateY(-3px) + shadow-md.",
  "keywords": [
   "action",
   "card",
   "icon",
   "cta",
   "tone",
   "brand",
   "warm",
   "sun",
   "quick-action"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { ActionCard } from '@/components';"
 },
 {
  "name": "ActivityItem",
  "codeName": "ActivityItem.tsx",
  "category": "Cards",
  "subCategory": "Activity",
  "description": "Ligne d\\'activité timeline. Dot coloré par type + connecteur entre items. Types: lesson/achievement/coach/journal. Hover: surface-muted.",
  "keywords": [
   "activity",
   "feed",
   "timeline",
   "history",
   "notification",
   "dot",
   "type"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { ActivityItem } from '@/components';"
 },
 {
  "name": "CardGrid",
  "codeName": "patterns/CardGrid.tsx",
  "category": "Lists & Feeds",
  "subCategory": "Grids",
  "description": "Grid responsive réutilisable. Layouts: compact (2 col), default (3 col), feature (4 col), autoFit. Breakpoints automatiques mobile/tablette/desktop.",
  "keywords": [
   "grid",
   "layout",
   "responsive",
   "columns",
   "cards"
  ],
  "usedBy": [
   "Recherche",
   "Veille",
   "LearningPaths",
   "Coaching"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { CardGrid } from '@/components';"
 },
 {
  "name": "InlineProgress",
  "codeName": "patterns/InlineProgress.tsx",
  "category": "Atoms",
  "subCategory": "Indicators",
  "description": "Barre de progression embarquée dans les cartes et listes. Tones: primary / warm / sun. Sizes: sm / md. Label en % optionnel.",
  "keywords": [
   "progress",
   "inline",
   "bar",
   "percent",
   "completion"
  ],
  "usedBy": [
   "Positionnement",
   "ParcoursCard",
   "LearningPathDetail"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { InlineProgress } from '@/components';"
 },
 {
  "name": "MetaPillGroup",
  "codeName": "ui/MetaPillGroup.tsx",
  "category": "Composites",
  "subCategory": "Group wrappers",
  "description": "Collection de MetaPill avec 7 tones (default/primary/warm/sun/brand/glass/glass-dark). Layouts horizontal/vertical. 3 sizes (sm/md/lg). Variants glass = frosted effect pour overlays sur surfaces tintées ou gradients saturés.",
  "keywords": [
   "pill",
   "chip",
   "tag",
   "meta",
   "group",
   "tone",
   "glass",
   "frosted"
  ],
  "usedBy": [
   "ParcoursCard",
   "LearningPathDetail",
   "Dashboard",
   "Journal"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { MetaPillGroup } from '@/components';"
 },
 {
  "name": "Pill",
  "codeName": "ui/Pill.tsx",
  "category": "Atoms",
  "subCategory": "Chips & Pills",
  "description": "Chip générique icône + texte. 3 variants : **surface** (bg-white border — banners clairs), **glass-light** (translucide blanc + backdrop-blur — héros colorés), **glass-dark** (translucide noir — overlays media/vidéo). 3 sizes : sm/md/lg. Différent de MetaPill (metadata card, tone-tinted) et FilterChip (toggle interactif).",
  "keywords": [
   "pill",
   "chip",
   "glass",
   "surface",
   "tag",
   "icon",
   "overlay",
   "hero",
   "frosted",
   "banner"
  ],
  "usedBy": [
   "AuthShell",
   "HeroSection",
   "EditorialHero",
   "ResumeLessonCard",
   "Marketing"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Pill } from '@/components';"
 },
 {
  "name": "Sidebar",
  "codeName": "layout/Sidebar.tsx",
  "category": "Navigation",
  "subCategory": "Primary nav (app shell)",
  "description": "Primary app navigation — flat list (no group labels), active state via teal gradient pill, collapsible (icons only), responsive mobile drawer with backdrop. Bottom user card with optional dropdown trigger.",
  "keywords": [
   "sidebar",
   "nav",
   "menu",
   "shell",
   "collapsible",
   "drawer"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "layout",
  "import": "import { Sidebar } from '@/components';"
 },
 {
  "name": "PositionnementModal",
  "codeName": "modals/PositionnementModal.tsx",
  "category": "Modals",
  "subCategory": "Booking flow",
  "description": "Auto-évaluation des compétences apprenant avant de démarrer un parcours. 5 niveaux, barre de progression, écran de succès.",
  "keywords": [
   "modal",
   "positioning",
   "competence",
   "assessment",
   "level",
   "self-eval"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "modals",
  "import": "import { PositionnementModal } from '@/components';"
 },
 {
  "name": "BookingModal",
  "codeName": "modals/BookingModal.tsx",
  "category": "Modals",
  "subCategory": "Booking flow",
  "description": "Réservation de session coaching en 2 étapes : sélection date/heure via calendrier + confirmation.",
  "keywords": [
   "modal",
   "booking",
   "calendar",
   "coaching",
   "slot",
   "time",
   "reservation"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "modals",
  "import": "import { BookingModal } from '@/components';"
 },
 {
  "name": "Dialog Modals",
  "codeName": "modals/ConfirmModal.tsx · modals/SuccessModal.tsx · modals/CancelSessionModal.tsx",
  "category": "Modals",
  "subCategory": "Confirm/Status",
  "description": "Famille de dialogs de confirmation et feedback. **ConfirmModal** : 4 variantes info/success/warning/danger. **SuccessModal** : célébration check animé + ring pulsé. **CancelSessionModal** : annulation/reprogrammation session coaching avec sélection motif.",
  "keywords": [
   "modal",
   "confirm",
   "dialog",
   "alert",
   "danger",
   "warning",
   "info",
   "success",
   "cancel",
   "session"
  ],
  "usedBy": [
   "Billing",
   "SubscriptionPayment"
  ],
  "showcaseOnly": false,
  "layer": "modals",
  "import": "import { Dialog } from '@/components';"
 },
 {
  "name": "SessionFeedbackModal",
  "codeName": "modals/SessionFeedbackModal.tsx",
  "category": "Modals",
  "subCategory": "Confirm/Status",
  "description": "Notation étoiles + commentaire. Feedback post-session coaching ou fin de leçon.",
  "keywords": [
   "modal",
   "feedback",
   "rating",
   "stars",
   "review",
   "comment",
   "session"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "modals",
  "import": "import { SessionFeedbackModal } from '@/components';"
 },
 {
  "name": "VideoPlayerModal",
  "codeName": "modals/VideoPlayerModal.tsx",
  "category": "Modals",
  "subCategory": "Media",
  "description": "Lecteur vidéo plein écran pour tutoriels, leçons vidéo et contenu Veille.",
  "keywords": [
   "modal",
   "video",
   "player",
   "media",
   "fullscreen",
   "veille",
   "tutorial"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "modals",
  "import": "import { VideoPlayerModal } from '@/components';"
 },
 {
  "name": "Toast + useToast",
  "codeName": "Toast.tsx / useToast.ts",
  "category": "Feedback",
  "subCategory": "Status messages",
  "description": "Notification toast avec hook useToast(). 4 variantes: success / info / warning / danger. Auto-dismiss configurable, dismissible, slot action.",
  "keywords": [
   "toast",
   "notification",
   "alert",
   "feedback",
   "success",
   "error",
   "warning"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "Toast.tsx ",
  "import": "import { Toast } from '@/components';"
 },
 {
  "name": "Tabs",
  "codeName": "Tabs.tsx",
  "category": "Navigation",
  "subCategory": "Secondary nav",
  "description": "Navigation par onglets. Variante pill (défaut) ou underline. 2–5 onglets, aria-selected + keyboard navigation. Utilisé dans Account, Profile, LearningPathDetail.",
  "keywords": [
   "tab",
   "navigation",
   "pill",
   "underline",
   "switch"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Tabs } from '@/components';"
 },
 {
  "name": "FilterChip",
  "codeName": "FilterChip.tsx",
  "category": "Atoms",
  "subCategory": "Chips & Pills",
  "description": "Chip de filtrage toggle avec état actif. 3 variants: default (fond solid), glass (glassmorphism sur gradient bg), reset (clear action). Count badge optionnel. Accessibilité: aria-pressed + focus ring WCAG AA.",
  "keywords": [
   "filter",
   "chip",
   "tag",
   "select",
   "active",
   "glass",
   "toggle",
   "count"
  ],
  "usedBy": [
   "LearningPaths",
   "Veille",
   "Journal",
   "Notifications"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { FilterChip } from '@/components';"
 },
 {
  "name": "Medal",
  "codeName": "Medal.tsx",
  "category": "Learning",
  "subCategory": "Achievements",
  "description": "Médaille de réussite: cercle avec anneau en pointillés intérieur. Warm gradient = déverrouillé, Brand deep = spécial/rare, Ink gray = verrouillé.",
  "keywords": [
   "medal",
   "badge",
   "achievement",
   "reward",
   "locked",
   "unlocked"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Medal } from '@/components';"
 },
 {
  "name": "CompetenceBadge",
  "codeName": "CompetenceBadge.tsx",
  "category": "Learning",
  "subCategory": "Competence",
  "description": "4 niveaux de compétence avec code couleur progressif. Niveau 1 = débutant (gris), Niveau 4 = expert (primary vibrant). Utilisé dans profil compétences.",
  "keywords": [
   "competence",
   "skill",
   "level",
   "badge",
   "proficiency"
  ],
  "usedBy": [],
  "showcaseOnly": true,
  "layer": "ui",
  "import": "import { CompetenceBadge } from '@/components';"
 },
 {
  "name": "MasteryBadge",
  "codeName": "MasteryBadge.tsx",
  "category": "Learning",
  "subCategory": "Competence",
  "description": "5 niveaux de maîtrise (Novice → Expert) avec représentation de la taxonomie de Bloom. Progression visuelle par couleur du clair au vif.",
  "keywords": [
   "mastery",
   "skill",
   "bloom",
   "taxonomy",
   "level",
   "novice",
   "expert"
  ],
  "usedBy": [],
  "showcaseOnly": true,
  "layer": "ui",
  "import": "import { MasteryBadge } from '@/components';"
 },
 {
  "name": "Achievement",
  "codeName": "Achievement.tsx",
  "category": "Learning",
  "subCategory": "Achievements",
  "description": "Composant de récompense/achievement. 3 variantes: unlocked (déverrouillé), locked (verrouillé avec opacité réduite), in-progress (avec barre de progression).",
  "keywords": [
   "achievement",
   "badge",
   "unlocked",
   "locked",
   "milestone",
   "reward"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Achievement } from '@/components';"
 },
 {
  "name": "AchievementBadge",
  "codeName": "ui/AchievementBadge.tsx",
  "category": "Learning",
  "subCategory": "Achievements",
  "description": "Carte badge d\\'accomplissement standalone. 4 colors (primary/warm/sun/success) × 3 sizes (sm/md/lg). Cercle icône gradient + titre + description + date de déverrouillage + bouton partage. État `isLocked` avec opacité réduite et icône cadenas.",
  "keywords": [
   "achievement",
   "badge",
   "unlock",
   "locked",
   "share",
   "reward",
   "milestone",
   "color",
   "standalone"
  ],
  "usedBy": [
   "Badges",
   "Profile"
  ],
  "showcaseOnly": true,
  "layer": "ui",
  "import": "import { AchievementBadge } from '@/components';"
 },
 {
  "name": "Stepper",
  "codeName": "Stepper.tsx",
  "category": "Composites",
  "subCategory": "Group wrappers",
  "description": "**Stepper** : indicateur d\\'étapes séquentiel horizontal/vertical — états done/current/upcoming. Utilisé dans onboarding, wizards. **Steps** : checklist séquentielle d\\'étapes (done/current/upcoming) — différent du stepper car vertical avec descriptions longues.",
  "keywords": [
   "stepper",
   "steps",
   "progress",
   "wizard",
   "onboarding",
   "sequence",
   "checklist",
   "task",
   "sequential"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Stepper } from '@/components';"
 },
 {
  "name": "TabsWithContent",
  "codeName": "patterns/TabsWithContent.tsx",
  "category": "Navigation",
  "subCategory": "Secondary nav",
  "description": "Tabs avec gestion de contenu intégrée (state actif + rendu du panel). 3 variants : **underline** (ligne sous onglet actif), **boxed** (onglet plein sur fond blanc), **pill** (toggle pill sur ink-100). Badge numérique optionnel, disabled support, onTabChange callback.",
  "keywords": [
   "tabs",
   "tabbed",
   "content",
   "panel",
   "underline",
   "pill",
   "boxed",
   "nav",
   "switch",
   "state"
  ],
  "usedBy": [
   "LearningPathDetail",
   "Profile",
   "Coaching",
   "Account"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { TabsWithContent } from '@/components';"
 },
 {
  "name": "Alert",
  "codeName": "Alert.tsx",
  "category": "Feedback",
  "subCategory": "Status messages",
  "description": "Message contextuel persistant ancré dans la page. 4 variantes sémantiques: info, success, warning, danger. Patterns: banner (défaut) et inline (compact).",
  "keywords": [
   "alert",
   "message",
   "warning",
   "error",
   "success",
   "info",
   "danger",
   "banner",
   "inline"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Alert } from '@/components';"
 },
 {
  "name": "Modal",
  "codeName": "Modal.tsx",
  "category": "Modals",
  "subCategory": "Base",
  "description": "Dialog bloquant pour décisions critiques. Scrim + blur en arrière-plan. Fermeture via Escape, bouton close, ou clic scrim. Slots: title, description, actions, body.",
  "keywords": [
   "modal",
   "dialog",
   "overlay",
   "popup",
   "scrim",
   "interrupt"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Modal } from '@/components';"
 },
 {
  "name": "CelebrationModal",
  "codeName": "modals/CelebrationModal.tsx",
  "category": "Modals",
  "subCategory": "Celebrations",
  "description": "Modal de célébration pour milestones (parcours complété, badge débloqué). **CelebrationModal** : confetti + badge + message court. **StreakCelebrationModal** : variante streak (particules feu, streak count, stats semaines/XP).",
  "keywords": [
   "celebration",
   "modal",
   "milestone",
   "achievement",
   "parcours",
   "badge",
   "reward",
   "streak",
   "flame"
  ],
  "usedBy": [],
  "showcaseOnly": true,
  "layer": "modals",
  "import": "import { CelebrationModal } from '@/components';"
 },
 {
  "name": "InlineWin",
  "codeName": "ui/Celebration.tsx",
  "category": "Feedback",
  "subCategory": "",
  "description": "Bandeau compact in-flow pour célébration discrète (lesson terminée, milestone intermédiaire). Différent de CelebrationModal qui est interruptif.",
  "keywords": [
   "inline-win",
   "win",
   "compact",
   "banner",
   "achievement"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { InlineWin } from '@/components';"
 },
 {
  "name": "Breadcrumb",
  "codeName": "ui/Breadcrumb.tsx (canonical)",
  "category": "Navigation",
  "subCategory": "Secondary nav",
  "description": "Fil d\\'Ariane unifié. variant=\"simple\" (anchors + séparateur texte) ou variant=\"nav\" (boutons + ChevronRight + pill highlight + ellipsis collapse + icônes).",
  "keywords": [
   "breadcrumb",
   "navigation",
   "path",
   "hierarchy",
   "ariane",
   "sticky",
   "nav"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Breadcrumb } from '@/components';"
 },
 {
  "name": "AppBreadcrumb",
  "codeName": "patterns/AppBreadcrumb.tsx",
  "category": "Navigation",
  "subCategory": "Secondary nav",
  "description": "Fil d\\'Ariane auto-généré depuis `useLocation`. Rendu si ≥ 2 segments seulement (évite \"Accueil > Parcours\" sur les hubs top-level). Includes bouton Retour sur mobile. Routes mappées statiquement pour des labels humainement lisibles.",
  "keywords": [
   "breadcrumb",
   "auto",
   "location",
   "path",
   "navigation",
   "back",
   "layout",
   "route"
  ],
  "usedBy": [
   "AppLayout (global)",
   "LearningPathDetail",
   "ArticleDetail",
   "VeilleContent"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { AppBreadcrumb } from '@/components';"
 },
 {
  "name": "AccountFamilyNav",
  "codeName": "patterns/AccountFamilyNav.tsx",
  "category": "Navigation",
  "subCategory": "Secondary nav",
  "description": "Sub-navigation pour les pages \"compte\" (Profil / Mon compte / Facturation / Paramètres). Pills scrollables avec label + description courte du rôle de chaque page. Clarifie la séparation des responsabilités.",
  "keywords": [
   "account",
   "profile",
   "settings",
   "nav",
   "sub-navigation",
   "billing",
   "tabs",
   "secondary"
  ],
  "usedBy": [
   "Profile",
   "Account",
   "Settings",
   "Billing"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { AccountFamilyNav } from '@/components';"
 },
 {
  "name": "Pagination",
  "codeName": "Pagination.tsx",
  "category": "Composites",
  "subCategory": "Group wrappers",
  "description": "Navigation numérotée pour longues listes. Points de troncature automatiques. Boutons prev/next. Info texte optionnel.",
  "keywords": [
   "pagination",
   "pages",
   "nav",
   "numbered",
   "prev",
   "next"
  ],
  "usedBy": [
   "Leaderboard"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Pagination } from '@/components';"
 },
 {
  "name": "DropdownMenu",
  "codeName": "ui/DropdownMenu.tsx",
  "category": "Navigation",
  "subCategory": "Contextual menus",
  "description": "Menu d\\'actions / navigation contextuelle. 2 variants : solid (border + shadow) ou glass (backdrop-blur + ring + soft shadow brand). Sub-composants : DropdownLabel (section header), DropdownItem (avec icon + shortcut kbd + badge demo/pro/new/beta + danger state), DropdownSeparator. Le consommateur gère ouverture/fermeture, positionnement + outside-click + keyboard. Utilisé dans la Sidebar pour le user menu.",
  "keywords": [
   "dropdown",
   "menu",
   "actions",
   "navigation",
   "user-menu",
   "popover",
   "glass",
   "a11y"
  ],
  "usedBy": [
   "App (Sidebar user menu)"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { DropdownMenu } from '@/components';"
 },
 {
  "name": "Tag",
  "codeName": "Tag.tsx",
  "category": "Atoms",
  "subCategory": "Chips & Pills",
  "description": "Étiquette statique ou filtre actif supprimable. 4 tones (neutral/primary/warm/sun) + surface glass pour fonds colorés. Bouton × intégré pour la suppression. Icon optionnel.",
  "keywords": [
   "tag",
   "label",
   "category",
   "filter",
   "removable",
   "chip",
   "glass",
   "tone"
  ],
  "usedBy": [
   "Journal",
   "Passeport",
   "Recherche",
   "Veille"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Tag } from '@/components';"
 },
 {
  "name": "MetaPill",
  "codeName": "MetaPill.tsx",
  "category": "Atoms",
  "subCategory": "Chips & Pills",
  "description": "Pilule de métadonnée unique avec tones et tailles. Contrairement à MetaPillGroup, s\\'utilise seul pour des contextes précis. Clickable optionnel.",
  "keywords": [
   "pill",
   "meta",
   "chip",
   "tag",
   "tone",
   "primary",
   "warm",
   "sun",
   "brand"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { MetaPill } from '@/components';"
 },
 {
  "name": "MetaItem",
  "codeName": "MetaItem.tsx",
  "category": "Atoms",
  "subCategory": "Chips & Pills",
  "description": "Paire label/valeur pour les métadonnées structurées. Sizes: sm/md. Tones: muted (défaut)/brand/warm. Icon optionnel dans le label.",
  "keywords": [
   "meta",
   "item",
   "label",
   "value",
   "pair",
   "data",
   "detail",
   "size",
   "tone"
  ],
  "usedBy": [],
  "showcaseOnly": true,
  "layer": "ui",
  "import": "import { MetaItem } from '@/components';"
 },
 {
  "name": "UserInfo",
  "codeName": "UserInfo.tsx",
  "category": "Atoms",
  "subCategory": "Identity",
  "description": "Bloc identité utilisateur compact: avatar + nom + rôle + status dot optionnel. Tailles: sm/md/lg. Statuts: online/offline/away.",
  "keywords": [
   "user",
   "info",
   "avatar",
   "name",
   "role",
   "identity",
   "author",
   "status",
   "online"
  ],
  "usedBy": [],
  "showcaseOnly": true,
  "layer": "ui",
  "import": "import { UserInfo } from '@/components';"
 },
 {
  "name": "ProfileCard",
  "codeName": "ui/ProfileCard.tsx",
  "category": "Cards",
  "subCategory": "Generic",
  "description": "Carte profil DS pour coach/expert/user. Compose <Avatar size=\"xl\"> + <MetaPillGroup tone> + <Button>. 3 variants (default/compact/featured) × 3 tones (primary/warm/sun) × 2 alignments (center/left). Props : avatar/initials, name, role, avatarBadge (overlay slot), rating (Stars + value + count), specialties (pills), contacts (email/phone/linkedin/twitter/website), bio, cta. Featured variant = bordure 2px tone + gradient bg.",
  "keywords": [
   "profile",
   "card",
   "user",
   "coach",
   "avatar",
   "rating",
   "specialties",
   "tone",
   "featured",
   "a11y"
  ],
  "usedBy": [
   "Coaching"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { ProfileCard } from '@/components';"
 },
 {
  "name": "IconFeatureCard",
  "codeName": "ui/IconFeatureCard.tsx",
  "category": "Cards",
  "subCategory": "Generic",
  "description": "Tile card carré-arrondi (button-shape). Icônes Lucide stroke 1.75. Auto-layout CENTERED (padding visuel égal 4 côtés). Variants : `iconStyle` (plain/filled/bubble) × `iconSize` (xs/sm/md/lg/xl) × `tone` (brand/warm/sun) × `surface` (card/tinted/glass/frosted) × `square` boolean + mode display/button via présence de `onClick`. Description optionnelle. Title et padding scalent automatiquement avec iconSize. ⚠️ Utiliser dans `<CardGrid layout=\"square-tiles\">` pour les cards square (≥4 items).",
  "keywords": [
   "feature",
   "icon",
   "card",
   "tile",
   "button",
   "plain",
   "filled",
   "bubble",
   "tone",
   "quick action",
   "shortcut",
   "glass",
   "frosted",
   "tinted",
   "surface",
   "square",
   "responsive",
   "centered"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { IconFeatureCard } from '@/components';"
 },
 {
  "name": "CourseCard",
  "codeName": "CourseCard.tsx",
  "category": "Cards",
  "subCategory": "Generic",
  "description": "Carte de cours EDTECH avec gradient hero, badge catégorie, progression si inscrit, CTA Enroll/Continue. Tones: brand/warm/sun. Hover: shadow-md + translateY(-2px).",
  "keywords": [
   "course",
   "card",
   "enroll",
   "progress",
   "learning",
   "edtech",
   "category",
   "tone"
  ],
  "usedBy": [],
  "showcaseOnly": true,
  "layer": "ui",
  "import": "import { CourseCard } from '@/components';"
 },
 {
  "name": "ParcoursCard",
  "codeName": "patterns/ParcoursCard.tsx",
  "category": "Cards",
  "subCategory": "Learning content",
  "description": "Carte de parcours pour catalogues / hubs. Surface tinted gradient (via Card variant=\"tinted\"). 3 tones (primary teal / warm orange / sun yellow). Titre h3 sans truncate + tooltip natif. MetaPills (durée + leçons). Description line-clamp-5 + tooltip natif si plus long. InlineProgress + CTA pill tone-aware (label dynamique selon status). Padding p-8 uniform (32px), gap-stack interne (16px), grid gap-section recommandé (32px). Alignement inter-cards via min-h sur description + flex-1 spacer (progress + CTA toujours en bas). Hover: translateY(-4px) + shadow-lg + radial glow tone-aware. Focus-visible outline tone-aware. A11y: role=button, aria-label, tabIndex, native title tooltips.",
  "keywords": [
   "parcours",
   "learning path",
   "progress",
   "tinted",
   "tone",
   "cta",
   "glass",
   "glow",
   "hover",
   "a11y"
  ],
  "usedBy": [
   "LearningPaths",
   "Dashboard"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { ParcoursCard } from '@/components';"
 },
 {
  "name": "SessionCard",
  "codeName": "learning/SessionCard.tsx",
  "category": "Cards",
  "subCategory": "Domain (coaching/project)",
  "description": "Card de session coaching (passée ou planifiée). Pattern : title + status badge + meta (coach · date) DIRECTEMENT sous le titre, description (contexte), footer actions (questionnaire / compte-rendu / note / ouvrir). Aligné sur la convention DS Phase 10 : 4 surfaces (card / tinted / glass / frosted) × 3 tones (primary / warm / sun) × interaction effects (hover lift, focus tone-aware). Footer divider tone-aware (subtle sur glass).",
  "keywords": [
   "session",
   "coaching",
   "meeting",
   "past",
   "planned",
   "surface",
   "tinted",
   "glass",
   "frosted"
  ],
  "usedBy": [
   "Coaching",
   "Dashboard"
  ],
  "showcaseOnly": false,
  "layer": "learning",
  "import": "import { SessionCard } from '@/components';"
 },
 {
  "name": "ResourceCard",
  "codeName": "ResourceCard.tsx",
  "category": "Cards",
  "subCategory": "Generic",
  "description": "Carte de ressource avec icône, type, titre, description, durée, catégorie, CTA. Variantes: default, minimal, with-badge. Tones: primary/warm/sun. **Usage cible Phase 10** : ressources complémentaires de fin d\\'étape sur LearningPathDetail (PDF, vidéos externes, liens utiles après les leçons).",
  "keywords": [
   "resource",
   "card",
   "document",
   "article",
   "tutorial",
   "link",
   "badge",
   "tone",
   "complementary",
   "learning-path"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { ResourceCard } from '@/components';"
 },
 {
  "name": "CompetencyMatrix",
  "codeName": "CompetencyMatrix.tsx",
  "category": "Learning",
  "subCategory": "Competence",
  "description": "Tableau de compétences multi-dimensions. Niveaux 1–5 (Novice → Expert) avec icônes par niveau et code couleur par compétence.",
  "keywords": [
   "competency",
   "matrix",
   "skills",
   "levels",
   "table",
   "assessment"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { CompetencyMatrix } from '@/components';"
 },
 {
  "name": "GoalProgress",
  "codeName": "GoalProgress.tsx",
  "category": "Learning",
  "subCategory": "Goals & progress",
  "description": "Suivi de progression vers un objectif d\\'apprentissage: nom, %, temps restant, indicateur on-track/retard. Tones: primary/warm/success/danger.",
  "keywords": [
   "goal",
   "progress",
   "target",
   "deadline",
   "on-track",
   "learning"
  ],
  "usedBy": [
   "Passeport",
   "PasseportObjectifs"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { GoalProgress } from '@/components';"
 },
 {
  "name": "QuizComponent",
  "codeName": "QuizComponent.tsx",
  "category": "Learning",
  "subCategory": "Quiz & flashcards",
  "description": "Quiz interactif multi-questions avec navigation prev/next, barre de progression, résultats finaux avec score et pourcentage.",
  "keywords": [
   "quiz",
   "question",
   "answer",
   "test",
   "assessment",
   "score",
   "interactive"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { QuizComponent } from '@/components';"
 },
 {
  "name": "HeroSection",
  "codeName": "patterns/HeroSection.tsx",
  "category": "Headers & Sections",
  "subCategory": "Heroes",
  "description": "Hero canonique (absorbe DashboardHero + LearningPathHeader). 4 variants × 5 tones × 3 sizes. Props clés : showBackButton+onBack, progress+progressLabel, metadata (pills), kpis (grid KPI), actions, eyebrow. → Pour hero éditorial text-focused sans stats, utiliser EditorialHero.",
  "keywords": [
   "hero",
   "section",
   "header",
   "gradient",
   "glass",
   "media",
   "minimal",
   "variants",
   "dashboard",
   "learning path",
   "kpi",
   "progress"
  ],
  "usedBy": [
   "LearningPathDetail",
   "Coaching"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { HeroSection } from '@/components';"
 },
 {
  "name": "ActivityFeed",
  "codeName": "patterns/ActivityFeed.tsx",
  "category": "Lists & Feeds",
  "subCategory": "Feeds (chronological)",
  "description": "Feed d\\'activités chronologique. Lucide icons par type, Avatar pour actor, 2 layouts (timeline / cards), groupByDate optionnel. Empty state + load more.",
  "keywords": [
   "activity",
   "feed",
   "timeline",
   "history",
   "events",
   "chronological",
   "notification"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { ActivityFeed } from '@/components';"
 },
 {
  "name": "ActivityTimeline",
  "codeName": "patterns/ActivityTimeline.tsx",
  "category": "Lists & Feeds",
  "subCategory": "Feeds (chronological)",
  "description": "Timeline verticale d\\'activités avec connecteur et dot tonal. 5 tones (primary/warm/sun/success/warning). Statuts : completed / pending / in-progress (pulse animé). Différent d\\'ActivityFeed : plus compact, pensé pour les flux séquentiels (historique linéaire).",
  "keywords": [
   "timeline",
   "activity",
   "events",
   "vertical",
   "connector",
   "tone",
   "status",
   "dot",
   "chronological"
  ],
  "usedBy": [
   "Dashboard",
   "Journal",
   "Passeport",
   "Coaching"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { ActivityTimeline } from '@/components';"
 },
 {
  "name": "AuthorStrip",
  "codeName": "patterns/AuthorStrip.tsx",
  "category": "Atoms",
  "subCategory": "Identity",
  "description": "⭐ Inline author meta strip — avatar + nom + rôle + meta (date, readTime). 2 variants : `compact` (1 ligne) et `expanded` (2 lignes avec rôle visible et meta wrapping). Réutilisable pour toutes les pages éditoriales.",
  "keywords": [
   "author",
   "byline",
   "meta",
   "avatar",
   "editorial",
   "article",
   "strip"
  ],
  "usedBy": [
   "ArticleDetail (Tier 2)",
   "MagazineArticle (Tier 2)",
   "JournalDetail (Tier 2)",
   "EditorialQuoteCallout signature"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { AuthorStrip } from '@/components';"
 },
 {
  "name": "IntroCallout",
  "codeName": "patterns/IntroCallout.tsx",
  "category": "Headers & Sections",
  "subCategory": "Section wrappers",
  "description": "⭐ Lead paragraph card glass tone-aware avec gradient accent bar à gauche. Optionnel : eyebrow + icon Quote. 4 tons (brand/warm/sun/neutral). Utilisé en haut d\\'un article long sous le hero.",
  "keywords": [
   "intro",
   "callout",
   "lead",
   "paragraph",
   "editorial",
   "thesis",
   "glass"
  ],
  "usedBy": [
   "ArticleDetail (Tier 2)",
   "MagazineArticle (Tier 2)",
   "Dossier (Tier 2)"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { IntroCallout } from '@/components';"
 },
 {
  "name": "KeyFindingCard",
  "codeName": "patterns/KeyFindingCard.tsx",
  "category": "Cards",
  "subCategory": "KPI & Stats",
  "description": "⭐ Glass card horizontale pour \"points clés / insights / data findings\". Icon-bubble gradient tone-aware + title + description ou metric (big value + label). Layout `horizontal` (default) ou `stacked`.",
  "keywords": [
   "key",
   "finding",
   "insight",
   "data",
   "metric",
   "glass",
   "icon-bubble"
  ],
  "usedBy": [
   "Dossier (Tier 2)",
   "MagazineArticle (Tier 2)"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { KeyFindingCard } from '@/components';"
 },
 {
  "name": "EditorialQuoteCallout",
  "codeName": "patterns/EditorialQuoteCallout.tsx",
  "category": "Headers & Sections",
  "subCategory": "Section wrappers",
  "description": "⭐ Pattern signature : grand guillemet décoratif 3rem en icon-bubble tinted + texte italique multi-paragraphes + signature optionnelle (via AuthorStrip). Pour intros éditoriales hebdo, foreword magazine, intro dossier.",
  "keywords": [
   "quote",
   "editorial",
   "callout",
   "foreword",
   "intro",
   "italic",
   "signature"
  ],
  "usedBy": [
   "WeeklyNewsletter édito (Tier 2)",
   "Magazine foreword (Tier 2)",
   "Dossier intro thèse (Tier 2)"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { EditorialQuoteCallout } from '@/components';"
 },
 {
  "name": "ReadingProgress",
  "codeName": "patterns/ReadingProgress.tsx",
  "category": "Atoms",
  "subCategory": "Indicators",
  "description": "⭐ 2 sub-composants pilotés par le hook `useReadingProgress(targetRef?)` : (1) `<ReadingProgressBar>` fixed top + gradient tone-aware, (2) `<ReadingProgressRing>` SVG circular 40px avec label %. Passer un ref article pour mesurer le scroll précis ou omettre pour le document entier.",
  "keywords": [
   "reading",
   "progress",
   "scroll",
   "indicator",
   "bar",
   "ring",
   "circular",
   "article"
  ],
  "usedBy": [
   "ArticleDetail (Tier 2)",
   "MagazineArticle (Tier 2)",
   "Dossier (Tier 2)",
   "LessonPlayer (futur)"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { ReadingProgress } from '@/components';"
 },
 {
  "name": "TableOfContents",
  "codeName": "patterns/TableOfContents.tsx",
  "category": "Navigation",
  "subCategory": "Secondary nav",
  "description": "⭐ Sticky aside navigation avec scroll-spy via IntersectionObserver. Numérotation auto (01, 02…), check icon sur items `completed`, active state coloré (tone-aware), hover translate-x, smooth scroll au clic avec offset configurable.",
  "keywords": [
   "toc",
   "table-of-contents",
   "sommaire",
   "navigation",
   "sticky",
   "scroll-spy",
   "sidebar"
  ],
  "usedBy": [
   "Dossier (Tier 2)",
   "LessonPlayer (futur)"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { TableOfContents } from '@/components';"
 },
 {
  "name": "FilterBar",
  "codeName": "forms/FilterBar.tsx",
  "category": "Forms",
  "subCategory": "Composite forms",
  "description": "⭐ Refactored Tailwind — barre de filtre horizontale avec pills clickables. Supporte multi-select / single-select, count badges, clear-all, 4 tons, 2 variantes (solid/glass), 2 surfaces (tinted/plain), 2 sizes (sm/md). Pour toolbar inline (Search filtersSlot) ou standalone entre hero et listing. Glass variant idéal pour héros gradients.",
  "keywords": [
   "filter",
   "pills",
   "chips",
   "toolbar",
   "multi-select",
   "count",
   "clear-all",
   "glass"
  ],
  "usedBy": [
   "LearningPaths (glass variant in hero Search)",
   "Veille (filter type drawer)",
   "Recherche (4 types sticky)",
   "Notifications (à venir)",
   "Listings n-1 (Actus/Tutoriels/Dossiers à venir)"
  ],
  "showcaseOnly": false,
  "layer": "forms",
  "import": "import { FilterBar } from '@/components';"
 },
 {
  "name": "Spinner",
  "codeName": "ui/Spinner.tsx",
  "category": "Atoms",
  "subCategory": "Indicators",
  "description": "Indicateur de chargement animé. Tailles : sm (20px), md (32px), lg (48px). Tones : brand (teal), warm (orange), muted (gris). Utilisé dans Recherche comme trailing slot du SearchInput pendant le debounce.",
  "keywords": [
   "spinner",
   "loading",
   "loader",
   "indicator",
   "async",
   "wait"
  ],
  "usedBy": [
   "Recherche"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Spinner } from '@/components';"
 },
 {
  "name": "NotificationBadge",
  "codeName": "ui/NotificationBadge.tsx",
  "category": "Atoms",
  "subCategory": "Status badges",
  "description": "Badge numérique superposé sur un enfant (icône, avatar). Tones : danger, brand, warm. Max configurable (99 par défaut).",
  "keywords": [
   "notification",
   "badge",
   "count",
   "overlay",
   "indicator",
   "unread"
  ],
  "usedBy": [],
  "showcaseOnly": true,
  "layer": "ui",
  "import": "import { NotificationBadge } from '@/components';"
 },
 {
  "name": "SectionHeader",
  "codeName": "patterns/SectionHeader.tsx",
  "category": "Headers & Sections",
  "subCategory": "Section headers",
  "description": "En-tête de section CANONIQUE. 5 variants (default tinted bubble / solid filled bubble / minimal stroke inline / accent vertical bar / underline) × 4 sizes (xs h5 → lg h2) × 5 tones (primary/warm/sun/accent/neutral). Sub-title, action slot, divider optionnel. ⚠️ Ne pas mettre mb-* sur le wrapper — le parent contrôle le rythme vertical via gap-*.",
  "keywords": [
   "section",
   "header",
   "title",
   "icon",
   "h2",
   "h3",
   "h4",
   "action",
   "divider",
   "variants",
   "sizes",
   "filled",
   "stroke",
   "tinted",
   "solid",
   "minimal",
   "accent",
   "underline",
   "canonical"
  ],
  "usedBy": [
   "LearningPathDetail",
   "Dashboard",
   "Journal"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { SectionHeader } from '@/components';"
 },
 {
  "name": "SkillBar",
  "codeName": "ui/SkillBar.tsx",
  "category": "Learning",
  "subCategory": "Goals & progress",
  "description": "Barre de progression de compétence. Tones : brand (teal), warm (orange), sun (jaune). Affichage du pourcentage optionnel. Transition CSS animée.",
  "keywords": [
   "skill",
   "bar",
   "progress",
   "competency",
   "percentage",
   "profile",
   "level"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { SkillBar } from '@/components';"
 },
 {
  "name": "PageHeader",
  "codeName": "patterns/PageHeader.tsx",
  "category": "Headers & Sections",
  "subCategory": "Page headers",
  "description": "En-tête de page CANONIQUE. Eyebrow chip avec icône, titre h1 responsive (clamp), description, actions. Variants: default | tight. Align: left | center.",
  "keywords": [
   "page",
   "header",
   "eyebrow",
   "title",
   "description",
   "actions",
   "h1",
   "canonical"
  ],
  "usedBy": [],
  "showcaseOnly": true,
  "layer": "patterns",
  "import": "import { PageHeader } from '@/components';"
 },
 {
  "name": "ViewerHeader",
  "codeName": "patterns/ViewerHeader.tsx",
  "category": "Headers & Sections",
  "subCategory": "Page headers",
  "description": "Sticky toolbar pour pages viewer / reader plein écran. Back btn (gauche) + Title eyebrow/subtitle (centré) + counter \"X/Y\" + prev/next chevrons + close X (droite). Glass-light backdrop-blur, responsive (back label hidden mobile, title truncate). Phase 14.2a : tone-aware (primary/warm/sun), progress prop optionnelle (barre 0-100 sous le header), touch targets ≥ 44 px.",
  "keywords": [
   "viewer",
   "reader",
   "toolbar",
   "header",
   "prev-next",
   "navigation",
   "back",
   "close",
   "sticky",
   "glass"
  ],
  "usedBy": [
   "Positionnement",
   "AstucesViewer",
   "FlashcardsViewer",
   "LessonPlayer",
   "(target) VideoViewer, ComplementaryContentViewer, VideoReels, JournalDetail"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { ViewerHeader } from '@/components';"
 },
 {
  "name": "HeaderNav",
  "codeName": "patterns/HeaderNav.tsx",
  "category": "Headers & Sections",
  "subCategory": "Page headers",
  "description": "Header sticky pour flows multi-étapes (onboarding, questionnaire, configurateur). Back button pill (gauche) + barre de progression optionnelle (centre, avec label) + bouton Enregistrer (droite). Glass-light backdrop-blur. Responsive : progress label hidden mobile.",
  "keywords": [
   "header",
   "nav",
   "sticky",
   "back",
   "save",
   "progress",
   "onboarding",
   "wizard",
   "glass",
   "multi-step"
  ],
  "usedBy": [
   "Onboarding (questionnaire)",
   "Positionnement",
   "OnboardingTutorial"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { HeaderNav } from '@/components';"
 },
 {
  "name": "ViewerOverlay",
  "codeName": "patterns/ViewerOverlay.tsx",
  "category": "Headers & Sections",
  "subCategory": "Section wrappers",
  "description": "Wrapper full-screen standardisé pour les pages viewer immersives. Header sticky glass + barre de progression + footer prev/next + slot children. 5 tones (light/brand/warm/sun/dark). Keyboard: Esc → close, ArrowLeft/Right → prev/next. Safe-area mobile.",
  "keywords": [
   "viewer",
   "overlay",
   "fullscreen",
   "immersive",
   "player",
   "reader",
   "tone",
   "progress",
   "prev",
   "next"
  ],
  "usedBy": [
   "LessonPlayer",
   "AstucesViewer",
   "FlashcardsViewer",
   "VideoTutorial",
   "VideoViewer",
   "ComplementaryContentViewer"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { ViewerOverlay } from '@/components';"
 },
 {
  "name": "MultiStepForm",
  "codeName": "patterns/MultiStepForm.tsx",
  "category": "Forms",
  "subCategory": "Composite forms",
  "description": "Wrapper de formulaire séquentiel: stepper visuel (numéros + labels + état done/active/upcoming), slot enfant pour le contenu de l\\'étape, boutons Précédent/Suivant et validation par étape. À utiliser pour onboarding ou wizards de configuration.",
  "keywords": [
   "form",
   "multi-step",
   "progress",
   "navigation",
   "wizard"
  ],
  "usedBy": [],
  "showcaseOnly": true,
  "layer": "patterns",
  "import": "import { MultiStepForm } from '@/components';"
 },
 {
  "name": "FormLayout",
  "codeName": "patterns/FormLayout.tsx",
  "category": "Forms",
  "subCategory": "Composite forms",
  "description": "Wrapper de formulaire structuré avec sections titrées. Titre + description globaux, sections avec champs `label + helpText + error + input slot`. Boutons submit/cancel intégrés. Isomorphe : chaque `input` est un slot React → compatible avec Input, Select, Switch, etc.",
  "keywords": [
   "form",
   "layout",
   "section",
   "field",
   "label",
   "help",
   "error",
   "submit",
   "cancel"
  ],
  "usedBy": [
   "Account",
   "Settings",
   "Profile (edit)"
  ],
  "showcaseOnly": true,
  "layer": "patterns",
  "import": "import { FormLayout } from '@/components';"
 },
 {
  "name": "PageCard",
  "codeName": "patterns/PageCard.tsx",
  "category": "Cards",
  "subCategory": "Generic",
  "description": "Tuile composite (thumbnail ou icône, titre, description, status dot animé, badge, CTA hover) pour annuaires de pages, galeries de fonctionnalités. Grille via PageCardGrid (1-4 colonnes responsives).",
  "keywords": [
   "card",
   "page",
   "featured",
   "image",
   "content",
   "thumbnail",
   "directory"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { PageCard } from '@/components';"
 },
 {
  "name": "VeilleCard",
  "codeName": "patterns/VeilleCardFeed.tsx (exports VeilleCard + VeilleCardListItem + FeaturedSpotlight)",
  "category": "Cards",
  "subCategory": "Editorial content",
  "description": "⭐ Card éditoriale Veille — **3 sub-composants** exposés depuis VeilleCardFeed : (1) `<VeilleCard>` vertical avec top stripe tone-aware + badge + title + summary + footer auteur/durée + bookmark (pour grid). (2) `<VeilleCardListItem>` horizontal avec icon bubble gradient + content + actions side (pour list). (3) `<FeaturedSpotlight>` hero card horizontal (cover gradient + icon 96px + CTA glass). 3 tones (brand/warm/sun) × 3 surfaces (card/tinted/glass).",
  "keywords": [
   "veille",
   "card",
   "editorial",
   "article",
   "tutoriel",
   "dossier",
   "magazine",
   "vertical",
   "horizontal",
   "featured",
   "spotlight"
  ],
  "usedBy": [
   "Veille (via VeilleCardFeed)"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { VeilleCard } from '@/components';"
 },
 {
  "name": "VeilleCard — design proposals",
  "codeName": "(mockups visuels — verticaux grid + horizontaux list)",
  "category": "Cards",
  "subCategory": "Editorial content",
  "description": "7 proposals de design VeilleCard : **4 verticaux** pour vue grid (A cover, C tinted, D overlay, L glass) + **3 horizontaux** pour vue list (HZ-1 split image, HZ-2 tinted row, HZ-3 compact inbox). Badge catégorie overlaid en top glassy sur les images.",
  "keywords": [
   "veille",
   "card",
   "vertical",
   "horizontal",
   "grid",
   "list",
   "cover",
   "tinted",
   "overlay",
   "glass",
   "compact"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { VeilleCard } from '@/components';"
 },
 {
  "name": "VeilleCardFeed",
  "codeName": "patterns/VeilleCardFeed.tsx",
  "category": "Lists & Feeds",
  "subCategory": "Grids",
  "description": "Feed éditorial de cartes Veille — pattern v2 Phase 10. **Featured spotlight** (1 item flag `featured: true` → hero horizontal en haut) + **2 layouts** : `grid` (cards verticales 1/2/3 cols, DEFAULT) ou `list` (cards horizontales denses). 3 surfaces (card/tinted/glass), 3 tones par item (brand/warm/sun). Save button bookmark configurable. Loading + empty states.",
  "keywords": [
   "veille",
   "feed",
   "news",
   "content",
   "editorial",
   "cards",
   "spotlight",
   "featured",
   "article",
   "tutoriel",
   "dossier",
   "magazine",
   "tone",
   "grid",
   "list",
   "horizontal"
  ],
  "usedBy": [
   "Veille"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { VeilleCardFeed } from '@/components';"
 },
 {
  "name": "VeilleFormatShortcutCards",
  "codeName": "patterns/VeilleFormatShortcutCards.tsx",
  "category": "Cards",
  "subCategory": "Editorial content",
  "description": "Grille 2×2 (mobile) → 4-col (sm+) de cartes de navigation vers les formats éditoriaux Veille. Variant dark (glass sur gradient, défaut) ou light (surface claire). Icône + label + description courte + flèche révélée au hover. Répond à `onClick` par card.",
  "keywords": [
   "veille",
   "format",
   "shortcut",
   "navigation",
   "cards",
   "editorial",
   "magazine",
   "newsletter",
   "glass",
   "dark"
  ],
  "usedBy": [
   "Veille"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { VeilleFormatShortcutCards } from '@/components';"
 },
 {
  "name": "VeilleHeroFilterChips",
  "codeName": "patterns/VeilleHeroFilterChips.tsx",
  "category": "Navigation",
  "subCategory": "Secondary nav",
  "description": "Barre de filtres glass pour le hero éditorial Veille. Compose FilterChip(variant=\"glass\") : chips type de contenu + toggle Sauvegardés (Bookmark) + séparateur vertical + lien Réinitialiser + compteur résultats à droite. Conçu pour surfaces sombres/dégradées.",
  "keywords": [
   "veille",
   "filter",
   "chips",
   "hero",
   "glass",
   "bookmark",
   "saved",
   "editorial",
   "reset",
   "count"
  ],
  "usedBy": [
   "Veille"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { VeilleHeroFilterChips } from '@/components';"
 },
 {
  "name": "EditorialCard",
  "codeName": "learning/ArticleCard.tsx · learning/MagazineCard.tsx · learning/VideoCard.tsx",
  "category": "Cards",
  "subCategory": "Editorial content",
  "description": "Card éditoriale multi-format. **ArticleCard** : actu / tutoriel / dossier — icon bubble tone-aware + eyebrow + title + summary + footer. **MagazineCard** : numéros Magazine TLS — gradient cover + n° filigrane + CTA. **VideoCard** : vidéo thumbnail tone-aware + play overlay + duration badge. 3–4 tones (primary/warm/sun/brand). Wrapper sur `<Card variant=\"feature\">`.",
  "keywords": [
   "article",
   "editorial",
   "actu",
   "tutoriel",
   "dossier",
   "magazine",
   "bookmark",
   "tone",
   "video",
   "thumbnail",
   "play"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "learning",
  "import": "import { EditorialCard } from '@/components';"
 },
 {
  "name": "NewsletterSignupCard",
  "codeName": "patterns/NewsletterSignupCard.tsx",
  "category": "Learning",
  "subCategory": "",
  "description": "Bandeau full-bleed newsletter — fond primary-900, headline display + formulaire email inline + lien dernière édition optionnel. Pattern propre à la Veille. Pas de card shell ni de border accent.",
  "keywords": [
   "newsletter",
   "signup",
   "email",
   "subscription",
   "veille",
   "editorial",
   "band",
   "full-bleed"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { NewsletterSignupCard } from '@/components';"
 },
 {
  "name": "PromptCard",
  "codeName": "learning/PromptCard.tsx",
  "category": "Cards",
  "subCategory": "Communication",
  "description": "⭐ Card chat-bubble (Apple Messages style) pour les prompts d\\'invitation à l\\'action sur le Dashboard. Icon + label eyebrow + text body + speech bubble tail + hover tinted bg. 7 variants BadgeVariant (brand/warm/sun/info/neutral/success/danger). 2 sizes : `default` (compact grid) ou `featured` (hero dashboard). ⚠️ **Similaire à `JournalEntryCard`** — chat-bubble sibling (l\\'un pour CTA prompts, l\\'autre pour entries journal). Garder séparés (use cases distincts).",
  "keywords": [
   "prompt",
   "chat-bubble",
   "speech",
   "invitation",
   "cta",
   "dashboard"
  ],
  "usedBy": [
   "Dashboard"
  ],
  "showcaseOnly": false,
  "layer": "learning",
  "import": "import { PromptCard } from '@/components';"
 },
 {
  "name": "MessageBubble",
  "codeName": "ui/MessageBubble.tsx",
  "category": "Cards",
  "subCategory": "Communication",
  "description": "⭐ Bulle de message réutilisable pour chats et messagerie. 2 variants : `user` (aligné droite) et `assistant` (aligné gauche + avatar). 2 contextes : `chatbot` (fond soft primary-100/ink-50, radius 2xl) et `messaging` (filled primary-500/white, radius xl + shadow). Fonctionnalités AI chatbot : score de confiance (< 0.6 → banner warning), privacy block, citations de sources pills, feedback thumbs-up/down. Messagerie : read receipt `showReadReceipt`, nom expéditeur, slot `children` pour pièces jointes. Markdown léger (**bold**, newlines). ⚠️ Similaire à `PromptCard`/`JournalEntryCard` — eux sont standalone cards cliquables, MessageBubble est un élément de thread.",
  "keywords": [
   "message",
   "bubble",
   "chat",
   "chatbot",
   "messaging",
   "assistant",
   "user",
   "conversation",
   "coaching"
  ],
  "usedBy": [
   "ChatInterface",
   "Messages"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { MessageBubble } from '@/components';"
 },
 {
  "name": "ConversationalChat",
  "codeName": "patterns/ConversationalChat.tsx",
  "category": "Lists & Feeds",
  "subCategory": "Feeds (chronological)",
  "description": "⭐ Wrapper de fil de conversation complet — liste scrollable de `MessageBubble` + indicateur de frappe animé (3 dots bounce) + auto-scroll-to-bottom (`useRef + useEffect`). Props : `messages: ChatMessage[]`, `isTyping`, `onFeedback`, `emptyState`, `className` (pour contraindre la hauteur). État vide affiché si 0 messages. Encapsule un `<Card>` avec overflow-y-auto. ⚠️ `animationDelay` via `style={{}}` (exception légitime — pas d\\'utility Tailwind pour animation-delay sur keyframes).",
  "keywords": [
   "chat",
   "conversation",
   "thread",
   "messages",
   "typing",
   "auto-scroll",
   "chatbot",
   "feed"
  ],
  "usedBy": [
   "ChatInterface"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { ConversationalChat } from '@/components';"
 },
 {
  "name": "RankingCard",
  "codeName": "learning/RankingCard.tsx",
  "category": "Cards",
  "subCategory": "Domain (coaching/project)",
  "description": "⭐ Card de classement (podium / leaderboard) — rank number en bubble gradient (or/argent/bronze pour top 3) + nom + points + streak flame badge optionnel. ⚠️ **Pas de similar existing** dans le DS — composant spécifique gamification leaderboard. Could be merged with ProfileCard avec variant=\"rank\" futur, mais APIs très différentes.",
  "keywords": [
   "ranking",
   "leaderboard",
   "podium",
   "rank",
   "gamification",
   "streak"
  ],
  "usedBy": [
   "Leaderboard"
  ],
  "showcaseOnly": false,
  "layer": "learning",
  "import": "import { RankingCard } from '@/components';"
 },
 {
  "name": "TlsLogo",
  "codeName": "ui/TlsLogo.tsx",
  "category": "Atoms",
  "subCategory": "Identity",
  "description": "⭐ Logo officiel The Learning Society — SVG inline avec wordmark + mark. Atom critique réutilisé app-wide (sidebar header + auth pages). ⚠️ **Pas de similar** — composant unique.",
  "keywords": [
   "logo",
   "brand",
   "mark",
   "wordmark",
   "tls"
  ],
  "usedBy": [
   "Sidebar",
   "AuthShell"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { TlsLogo } from '@/components';"
 },
 {
  "name": "Flashcard",
  "codeName": "patterns/Flashcard.tsx",
  "category": "Learning",
  "subCategory": "Quiz & flashcards",
  "description": "⭐ Card flip 3D (front/back) pour apprentissage actif — révision flashcards. Click → animation 3D flip horizontale. ⚠️ Pas de similar dans le DS.",
  "keywords": [
   "flashcard",
   "flip",
   "3d",
   "revision",
   "learning",
   "memorization"
  ],
  "usedBy": [
   "FlashcardsViewer"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { Flashcard } from '@/components';"
 },
 {
  "name": "QuizQuestionCard",
  "codeName": "patterns/QuizQuestionCard.tsx",
  "category": "Learning",
  "subCategory": "Quiz & flashcards",
  "description": "⭐ Card question quiz avec options multiples (A/B/C/D), feedback correct/incorrect, numérotation N/M. State management : selectedId + answered + showCorrectAnswer. ⚠️ Pas de similar — composant spécifique quiz/évaluation.",
  "keywords": [
   "quiz",
   "question",
   "qcm",
   "options",
   "evaluation",
   "assessment"
  ],
  "usedBy": [
   "Positionnement"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { QuizQuestionCard } from '@/components';"
 },
 {
  "name": "DataTable",
  "codeName": "patterns/DataTable.tsx",
  "category": "Lists & Feeds",
  "subCategory": "Tables",
  "description": "⭐ Tableau de données générique — colonnes sortables, alignements, rows custom. Pour vues admin / analytics / liste structurée. ⚠️ Pas de similar — composant unique pour tabular data.",
  "keywords": [
   "table",
   "data",
   "grid",
   "admin",
   "analytics",
   "sort"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { DataTable } from '@/components';"
 },
 {
  "name": "RatingModal",
  "codeName": "patterns/RatingModal.tsx",
  "category": "Modals",
  "subCategory": "Confirm/Status",
  "description": "⭐ Pattern de rating étoiles (1-5) avec feedback textuel. Pour évaluation session / leçon / contenu. ⚠️ Pas de similar — pattern unique. Note : pas vraiment un modal (pas de isOpen overlay), c\\'est un form rating inline à wrapper dans un Modal DS si besoin.",
  "keywords": [
   "rating",
   "stars",
   "feedback",
   "review",
   "evaluation"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { RatingModal } from '@/components';"
 },
 {
  "name": "ProjectCard",
  "codeName": "learning/ProjectCard.tsx",
  "category": "Cards",
  "subCategory": "Domain (coaching/project)",
  "description": "⭐ Card projet collaboratif — title + description + status pill (planning/in-progress/completed) + progress bar + tasks completed/total + deadline + team avatars stack. ⚠️ Pas de similar — composant unique pour projets collaboratifs.",
  "keywords": [
   "project",
   "collaborative",
   "team",
   "tasks",
   "progress",
   "deadline"
  ],
  "usedBy": [
   "Project (page existante)"
  ],
  "showcaseOnly": false,
  "layer": "learning",
  "import": "import { ProjectCard } from '@/components';"
 },
 {
  "name": "FloatingNavButton",
  "codeName": "FloatingNavButton.tsx",
  "category": "Navigation",
  "subCategory": "Floating actions",
  "description": "⭐ Speed-dial FAB flottant fixed bottom-right/left. Configurable : `actions[]` (label/icon/onClick/tone) + `tone` (FAB) + `position` + `icon`/`closeIcon`. Migré Tailwind + DS (Phase 10). **Retiré de App.tsx prod** — réactivable pour futur chatbot, quick contact, help shortcut. Click main FAB → expand actions vertical stack avec animation filterIn. ⚠️ Pas de similar — composant unique floating speed-dial.",
  "keywords": [
   "floating",
   "fab",
   "speed-dial",
   "quick-actions",
   "chatbot",
   "contact",
   "help",
   "fixed"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { FloatingNavButton } from '@/components';"
 },
 {
  "name": "AmbientBlobs",
  "codeName": "patterns/AmbientBlobs.tsx",
  "category": "Foundations",
  "subCategory": "Backgrounds",
  "description": "Fond ambient TLS avec 3 blobs flottants (primary teal / warm orange / sun yellow). Pattern décoratif full-page : 3 cercles très flous (blur 80px) qui dérivent lentement (animation float 20s, staggered delays). Position fixed (default) ou absolute, pointer-events-none. 3 intensities : subtle (0.10) / normal (0.15 default) / vivid (0.25). À combiner avec l\\'utility token DS `bg-gradient-page-ambient` (teal-50 → white → yellow-50) pour fond premium TLS. Variants : `-warm` (orange) et `-sun` (orange→yellow).",
  "keywords": [
   "blob",
   "ambient",
   "background",
   "decorative",
   "gradient",
   "float",
   "fixed",
   "overlay",
   "blur"
  ],
  "usedBy": [
   "Coaching"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { AmbientBlobs } from '@/components';"
 },
 {
  "name": "EditorialHero",
  "codeName": "patterns/EditorialHero.tsx",
  "category": "Headers & Sections",
  "subCategory": "Heroes",
  "description": "Bandeau hero éditorial plein-largeur. Tone-aware (default / brand / warm / sun) : default = teinte primary légère + texte ink ; brand = gradient primary-500→700 saturé + texte blanc (Dashboard/Journal) ; warm = gradient secondary saturé + texte blanc (LearningPaths) ; sun = gradient accent. Trailing slot pour KPIs/CTAs.",
  "keywords": [
   "hero",
   "editorial",
   "banner",
   "page-header",
   "tone-aware",
   "brand",
   "warm",
   "sun",
   "glass"
  ],
  "usedBy": [
   "Dashboard",
   "Journal",
   "LearningPaths",
   "ArticleDetail",
   "MagazineArticle",
   "Newsletter",
   "WeeklyNewsDetail",
   "Project",
   "CoachingBookingFlow",
   "PreCoachingQuestionnaireResponse",
   "Settings"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { EditorialHero } from '@/components';"
 },
 {
  "name": "EditorialLayout",
  "codeName": "patterns/EditorialLayout.tsx",
  "category": "Headers & Sections",
  "subCategory": "Section wrappers",
  "description": "Layout 2 colonnes (main 1.4fr + aside 0.8fr) avec aside sticky sur desktop, stack sur mobile. Slot main + slot aside. Option `asideFirst` pour inverser, `staticAside` pour désactiver le sticky.",
  "keywords": [
   "layout",
   "editorial",
   "sidebar",
   "sticky",
   "aside",
   "2-column",
   "content"
  ],
  "usedBy": [
   "ArticleDetail",
   "MagazineArticle",
   "Newsletter",
   "WeeklyNewsDetail",
   "Project",
   "CoachingBookingFlow",
   "PreCoachingQuestionnaireResponse"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { EditorialLayout } from '@/components';"
 },
 {
  "name": "SectionCard",
  "codeName": "patterns/SectionCard.tsx",
  "category": "Headers & Sections",
  "subCategory": "Section wrappers",
  "description": "Carte de section avec header (titre + icône + description + headerAction), body (children) et footer actions séparé par une bordure. Tone configurable (passé à Card). Utilisé pour structurer les pages éditoriales et content.",
  "keywords": [
   "section",
   "card",
   "titled",
   "content",
   "editorial",
   "layout"
  ],
  "usedBy": [
   "ArticleDetail",
   "MagazineArticle",
   "Newsletter",
   "WeeklyNewsDetail",
   "Project",
   "CoachingBookingFlow",
   "PreCoachingQuestionnaireResponse",
   "ResetPassword",
   "Billing",
   "SubscriptionPayment",
   "Positionnement"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { SectionCard } from '@/components';"
 },
 {
  "name": "RelatedItemList",
  "codeName": "patterns/RelatedItemList.tsx",
  "category": "Lists & Feeds",
  "subCategory": "Lists (vertical)",
  "description": "Liste verticale d\\'items associés (related/recommended). Items avec titre + description + meta optionnel + icon optionnel. Items cliquables (href ou onClick) avec chevron animé au hover. Utilisé dans les asides éditoriaux.",
  "keywords": [
   "related",
   "list",
   "cross-link",
   "recommendations",
   "editorial",
   "aside"
  ],
  "usedBy": [
   "MagazineArticle",
   "Newsletter",
   "WeeklyNewsDetail",
   "CoachingBookingFlow",
   "PreCoachingQuestionnaireResponse"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { RelatedItemList } from '@/components';"
 },
 {
  "name": "AuthShell",
  "codeName": "patterns/AuthShell.tsx",
  "category": "Auth Family",
  "subCategory": "Shell & layout",
  "description": "Layout auth full-bleed branded glass dark (gradient teal + blobs ambient). Famille complète de sub-components: AuthField (input + icon + error), AuthPasswordField (eye toggle intégré), AuthPrimaryButton + AuthGhostButton, AuthCheckbox (peer/sr-only glass), AuthDivider, AuthSocialButton, AuthInlineLink, AuthSuccess.",
  "keywords": [
   "auth",
   "login",
   "signup",
   "shell",
   "glass-dark",
   "AuthField",
   "AuthPasswordField",
   "AuthPrimaryButton",
   "AuthGhostButton",
   "AuthCheckbox",
   "form",
   "aside"
  ],
  "usedBy": [
   "Login",
   "Signup",
   "ForgotPassword",
   "ResetPassword",
   "VerifyEmail",
   "MagicLink"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { AuthShell } from '@/components';"
 },
 {
  "name": "ResumeLessonCard",
  "codeName": "patterns/ResumeLessonCard.tsx",
  "category": "Cards",
  "subCategory": "Learning content",
  "description": "Card hero \"Reprendre ta leçon\" pour le Dashboard learner-centric. Glass tone-aware (warm/primary/sun) avec eyebrow \"Étape X sur Y\", titre h1 du parcours, description contextuelle, meta pills (niveau/durée/leçons), progress bar large + CTA pill arrondi. Hero-sized (p-6/8/10 responsive), radial glow au hover.",
  "keywords": [
   "resume",
   "reprendre",
   "parcours",
   "lesson",
   "leçon",
   "dashboard",
   "continue",
   "hero"
  ],
  "usedBy": [
   "Dashboard"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { ResumeLessonCard } from '@/components';"
 },
 {
  "name": "Divider",
  "codeName": "ui/Divider.tsx",
  "category": "Atoms",
  "subCategory": "Decoration",
  "description": "Séparateur horizontal ou vertical. Label centré avec var(--text-soft). Spacings: sm/md/lg via classes CSS. Ligne: var(--border).",
  "keywords": [
   "divider",
   "separator",
   "hr",
   "section",
   "label",
   "horizontal",
   "vertical",
   "css"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { Divider } from '@/components';"
 },
 {
  "name": "ConsentBanner",
  "codeName": "patterns/ConsentBanner.tsx",
  "category": "Feedback",
  "subCategory": "GDPR & Compliance",
  "description": "Bandeau GDPR cookie consent. Position fixed bottom. 3 catégories (nécessaires/analytiques/marketing). Panneau \"Personnaliser\" expandable. Tous rôles. Module #13bis.",
  "keywords": [
   "consent",
   "gdpr",
   "rgpd",
   "cookies",
   "privacy",
   "banner",
   "compliance",
   "ai act"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { ConsentBanner } from '@/components';"
 },
 {
  "name": "CompetencyRadar",
  "codeName": "ui/CompetencyRadar.tsx",
  "category": "Learning",
  "subCategory": "Compétences",
  "description": "Radar SVG 6 axes Dreyfus (1–5). Polygone niveau actuel (bleu) + objectif cible (orange, dashed). Légende intégrée. Clic sur axe → drill-down. 3 tailles. Modules #2 Passeport · #3 Profil · #6 Enterprise · #10 Analytics · #11 Projects.",
  "keywords": [
   "radar",
   "compétences",
   "dreyfus",
   "skills",
   "passeport",
   "svg",
   "chart",
   "hso"
  ],
  "usedBy": [
   "Passeport",
   "CoachDashboard",
   "ManagerCohort",
   "PasseportHistorique"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { CompetencyRadar } from '@/components';"
 },
 {
  "name": "AITransparencyLabel",
  "codeName": "ui/AITransparencyLabel.tsx",
  "category": "Atoms",
  "subCategory": "Indicators",
  "description": "Label \"IA\" transversal pour marquer tout contenu généré, recommandé ou assisté par l\\'IA. 3 variants × 2 sizes. AI Act / Module #13bis. Usage : items recommandés, suggestions coach, chatbot.",
  "keywords": [
   "ai",
   "ia",
   "transparency",
   "label",
   "badge",
   "generated",
   "recommended",
   "ai act",
   "gdpr"
  ],
  "usedBy": [
   "PerplexityContentDetail",
   "ItemRecommendations"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { AITransparencyLabel } from '@/components';"
 },
 {
  "name": "AIOverrideButton",
  "codeName": "ui/AIOverrideButton.tsx",
  "category": "Atoms",
  "subCategory": "Form fields",
  "description": "Bouton \"Rejeter cette recommandation\" pour Coach/Admin. Peut ouvrir un textarea inline pour collecter la raison du rejet. Module #13bis — transversal IA.",
  "keywords": [
   "ai",
   "ia",
   "override",
   "reject",
   "button",
   "coach",
   "admin",
   "feedback"
  ],
  "usedBy": [],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { AIOverrideButton } from '@/components';"
 },
 {
  "name": "AtrophieIndicator",
  "codeName": "ui/AtrophieIndicator.tsx",
  "category": "Learning",
  "subCategory": "Compétences",
  "description": "Indicateur de dégradation Dreyfus. Rien affiché si inactif ≤ 90j. Warning orange si 91–180j (pulsant). Danger si > 180j. Module #5 Gamification — badges compétences.",
  "keywords": [
   "atrophie",
   "dreyfus",
   "inactif",
   "badge",
   "competence",
   "degradation",
   "warning",
   "gamification"
  ],
  "usedBy": [
   "Gamification",
   "CoachEngagement"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { AtrophieIndicator } from '@/components';"
 },
 {
  "name": "HeatmapGrid",
  "codeName": "ui/HeatmapGrid.tsx",
  "category": "Learning",
  "subCategory": "Compétences",
  "description": "Grille compétences × apprenants avec codes couleur Dreyfus 1–5. Sticky header. Responsive overflow-x. Module #2 Passeport / #10 Analytics.",
  "keywords": [
   "heatmap",
   "competence",
   "dreyfus",
   "grille",
   "coach",
   "apprenant",
   "niveau",
   "radar"
  ],
  "usedBy": [
   "CoachHeatmap",
   "FicheApprenantAnalytics"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { HeatmapGrid } from '@/components';"
 },
 {
  "name": "CorrectionCard",
  "codeName": "ui/CorrectionCard.tsx",
  "category": "Cards",
  "subCategory": "Learning content",
  "description": "Carte de travail soumis à corriger. Statut (pending/in-review/corrected/rejected), excerpt, feedback count, actions. Module #4 Coaching — corrections inbox.",
  "keywords": [
   "correction",
   "coaching",
   "travail",
   "feedback",
   "corrigé",
   "apprenant",
   "inbox"
  ],
  "usedBy": [
   "CoachingCorrections",
   "CoachCorrectionsQueue",
   "CoachCorrectionInterface"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { CorrectionCard } from '@/components';"
 },
 {
  "name": "StepTutorial",
  "codeName": "patterns/StepTutorial.tsx",
  "category": "Modals",
  "subCategory": "Onboarding",
  "description": "Wizard step-by-step pour tutoriaux guidés. Progress dots tone-aware. Prev/Next/Terminer DS. Skip link. Contrôlé (externalStep) ou autonome (state interne). Module #3 Onboarding.",
  "keywords": [
   "tutorial",
   "wizard",
   "onboarding",
   "step",
   "étape",
   "guide",
   "tour",
   "progression"
  ],
  "usedBy": [
   "OnboardingTutorial"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { StepTutorial } from '@/components';"
 },
 {
  "name": "OptionGrid",
  "codeName": "patterns/OptionGrid.tsx",
  "category": "Forms",
  "subCategory": "Composite forms",
  "description": "Grille d\\'options sélectionnables (icon + label) — single ou multi-select. Tone-aware (brand/warm/sun), 3 layouts (icon-top, icon-left, text-only), responsive 2 → N cols. Remplace les grilles ad-hoc role/secteur/rythme dans Onboarding.",
  "keywords": [
   "select",
   "options",
   "cards",
   "pick",
   "choice",
   "role",
   "sector",
   "onboarding",
   "radio",
   "checkbox"
  ],
  "usedBy": [
   "Onboarding"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { OptionGrid } from '@/components';"
 },
 {
  "name": "DreyfusLevelSelector",
  "codeName": "ui/DreyfusLevelSelector.tsx",
  "category": "Learning",
  "subCategory": "Compétences",
  "description": "Sélecteur 5-niveaux Dreyfus (Novice → Expert) pour positionnement compétences. Responsive 1 → 5 cols (fix le pb cramped tablet de la v1). Tone-aware. Levels customisables via prop. Module #4 Phase 14.1.",
  "keywords": [
   "dreyfus",
   "level",
   "positionnement",
   "competence",
   "likert",
   "self-assessment",
   "questionnaire",
   "novice",
   "expert"
  ],
  "usedBy": [
   "OnboardingQuestionnaire"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { DreyfusLevelSelector } from '@/components';"
 },
 {
  "name": "DreyfusSlider",
  "codeName": "ui/DreyfusSlider.tsx",
  "category": "Learning",
  "subCategory": "Compétences",
  "description": "Sélecteur Dreyfus compact en piste horizontale (D1–D5). Distinct de DreyfusLevelSelector (grille de cartes pour questionnaires). Nœuds 44px tactiles + connecteurs remplis à gauche de la sélection + labels sous la piste (centrés). Tone-aware brand/warm/sun. Utilise les DREYFUS_LABELS canoniques (Cahier #02 Passeport).",
  "keywords": [
   "dreyfus",
   "slider",
   "level",
   "positionnement",
   "competence",
   "track",
   "horizontal",
   "compact",
   "touch"
  ],
  "usedBy": [
   "Positionnement"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { DreyfusSlider } from '@/components';"
 },
 {
  "name": "CongratulationsCard",
  "codeName": "patterns/CongratulationsCard.tsx",
  "category": "Feedback",
  "subCategory": "Celebrations",
  "description": "Bloc de célébration de milestone (fin onboarding / parcours / module). Icône large + badge + heading + summary + XP reward optionnel. 4 tones (brand/warm/sun/success).",
  "keywords": [
   "congratulations",
   "success",
   "celebration",
   "milestone",
   "completion",
   "reward",
   "xp",
   "onboarding"
  ],
  "usedBy": [
   "OnboardingSuccess"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { CongratulationsCard } from '@/components';"
 },
 {
  "name": "NextStepsGrid",
  "codeName": "patterns/NextStepsGrid.tsx",
  "category": "Lists & Feeds",
  "subCategory": "Grids",
  "description": "Grille d\\'action cards \"et maintenant ?\" — chaque card a icon tone-tinted + title + desc + CTA flèche. Tone par-item (mix brand/warm/sun pour varier les next paths). Responsive 1 → 3 cols.",
  "keywords": [
   "next steps",
   "actions",
   "cta",
   "cards",
   "onboarding success",
   "guide",
   "next"
  ],
  "usedBy": [
   "OnboardingSuccess",
   "EmptyDashboardState"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { NextStepsGrid } from '@/components';"
 },
 {
  "name": "EmptyDashboardState",
  "codeName": "patterns/EmptyDashboardState.tsx",
  "category": "Feedback",
  "subCategory": "Empty/zero states",
  "description": "Variante \"cold-start\" du Dashboard pour les apprenants qui viennent juste de terminer l\\'onboarding. Remplace le Dashboard avec mock data par un welcome + NextStepsGrid des 3 actions canoniques.",
  "keywords": [
   "empty",
   "cold start",
   "first time",
   "dashboard",
   "welcome",
   "onboarding",
   "new user"
  ],
  "usedBy": [
   "Dashboard"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { EmptyDashboardState } from '@/components';"
 },
 {
  "name": "ProgressDots",
  "codeName": "ui/ProgressDots.tsx",
  "category": "Atoms",
  "subCategory": "Indicators",
  "description": "Atom carousel/wizard progress indicator. Active dot widened (~3× width) pour communiquer la position. 3 tailles (xs/sm/md) · tone-aware (primary/warm/sun) · onSelect optionnel rend les dots cliquables. Remplace 3 implémentations ad-hoc (LessonPlayer tabs, AstucesViewer dots, FlashcardsViewer dots).",
  "keywords": [
   "progress",
   "dots",
   "carousel",
   "wizard",
   "indicator",
   "pagination"
  ],
  "usedBy": [
   "LessonNavigation",
   "AstucesViewer",
   "FlashcardsViewer",
   "LessonPlayer"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { ProgressDots } from '@/components';"
 },
 {
  "name": "FlipCard",
  "codeName": "patterns/FlipCard.tsx",
  "category": "Learning",
  "subCategory": "Quiz & flashcards",
  "description": "Carte 3D à retournement (flip). Front : image de fond + icône emoji + catégorie pill + titre. Verso : gradient tone-aware + contenu + détails optionnels. Mécanique CSS 3D : perspective 1500px, preserve-3d, rotateY(180deg), backfaceVisibility. Tone-aware (border + gradient).",
  "keywords": [
   "flip",
   "card",
   "flashcard",
   "3d",
   "rotate",
   "learning",
   "tone"
  ],
  "usedBy": [
   "FlashcardsViewer"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { FlipCard } from '@/components';"
 },
 {
  "name": "BehavioralTileGrid",
  "codeName": "patterns/BehavioralTileGrid.tsx",
  "category": "Learning",
  "subCategory": "Viewer content",
  "description": "Grille auto-fit responsive de tuiles de piliers comportementaux / compétences. 4 palettes ton cycliques (primary/warm/sun/primary-alt). Chaque tuile : indicateur décoratif accentué + titre + description + pills optionnelles. Utilisé dans LessonPlayer (section Engagement) pour présenter les dimensions comportementales d\\'une compétence.",
  "keywords": [
   "behavioral",
   "tile",
   "grid",
   "pillar",
   "competence",
   "engagement",
   "lesson",
   "viewer",
   "auto-fit"
  ],
  "usedBy": [
   "LessonPlayer"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { BehavioralTileGrid } from '@/components';"
 },
 {
  "name": "LessonNavigation",
  "codeName": "patterns/LessonNavigation.tsx",
  "category": "Composites",
  "subCategory": "Group wrappers",
  "description": "Footer molecule unifié pour LessonPlayer + 4 viewers. Layout : [Précédent] · dots · [Suivant / Terminer]. Tone-aware (primary/warm/sun), responsive (labels masqués mobile, dots gardés), disabled aux bornes. Quand `onFinish` fourni ET current === total → bouton suivant devient \"Terminer\" avec ✓.",
  "keywords": [
   "navigation",
   "lesson",
   "prev",
   "next",
   "finish",
   "footer",
   "viewer"
  ],
  "usedBy": [
   "LessonPlayer",
   "AstucesViewer",
   "FlashcardsViewer"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { LessonNavigation } from '@/components';"
 },
 {
  "name": "AstucesCard",
  "codeName": "learning/AstucesCard.tsx",
  "category": "Learning",
  "subCategory": "Viewer content",
  "description": "Card \"Astuce\" pour le viewer scroll-story. Affiche un numéro, badge catégorie, image pleine largeur, titre, description et liste d\\'exemples. Border colorée tone-aware (primary-400/secondary-400/accent-400). Ombre jaune-ambrée par défaut (sun tone). Tone-aware (primary/warm/sun).",
  "keywords": [
   "astuce",
   "tip",
   "viewer",
   "scroll-story",
   "card",
   "learning",
   "tone-aware",
   "example"
  ],
  "usedBy": [
   "AstucesViewer"
  ],
  "showcaseOnly": false,
  "layer": "learning",
  "import": "import { AstucesCard } from '@/components';"
 },
 {
  "name": "ResourceListItem",
  "codeName": "learning/ResourceListItem.tsx",
  "category": "Lists & Feeds",
  "subCategory": "Lists (vertical)",
  "description": "Ligne de ressource complémentaire : icône + label + badge optionnel + action slot. Se rend en `<button>` si `onClick` fourni, sinon `<div>`. Utilisé dans les sidebars \"Matériaux\" et \"Ressources\" des viewers masterclass et atelier.",
  "keywords": [
   "resource",
   "list",
   "item",
   "download",
   "file",
   "material",
   "sidebar"
  ],
  "usedBy": [
   "MasterclassReplay",
   "AtelierPresentiel"
  ],
  "showcaseOnly": false,
  "layer": "learning",
  "import": "import { ResourceListItem } from '@/components';"
 },
 {
  "name": "EtapeAccordion",
  "codeName": "patterns/EtapeAccordion.tsx",
  "category": "Composites",
  "subCategory": "Group wrappers",
  "description": "Accordéon d\\'étape de parcours. Deux variants : `default` (liste compacte bordée, CourseDetail) et `panel` (grande card padded, LearningPathDetail). Prop `header` pour un slot custom (remplace title/duration). Prop `locked` : désactive le clic et masque le chevron (locked items = non-interactifs). Le `bodyClassName` contrôle le style du wrapper contenu.",
  "keywords": [
   "accordion",
   "step",
   "etape",
   "parcours",
   "programme",
   "expand",
   "collapse",
   "locked",
   "lesson"
  ],
  "usedBy": [
   "CourseDetail",
   "LearningPathDetail"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { EtapeAccordion } from '@/components';"
 },
 {
  "name": "AuthBackLink",
  "codeName": "patterns/AuthShell.tsx",
  "category": "Auth Family",
  "subCategory": "Shell & layout",
  "description": "Lien de retour \"← label\" pour les pages auth sur fond glass-dark. Texte blanc/75 avec flèche ArrowLeft Lucide. Hover → blanc 100%. Part de la famille Auth* (glass-dark only — ne pas utiliser sur fond clair). Exposé comme named export depuis AuthShell.tsx.",
  "keywords": [
   "auth",
   "back",
   "link",
   "retour",
   "connexion",
   "glass-dark",
   "AuthShell",
   "navigation"
  ],
  "usedBy": [
   "MagicLink",
   "VerifyEmail"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { AuthBackLink } from '@/components';"
 },
 {
  "name": "MoodSelector",
  "codeName": "ui/MoodSelector.tsx",
  "category": "Forms",
  "subCategory": "Inputs",
  "description": "Sélecteur de niveau d\\'humeur pour le journal (5 niveaux : very-sad → very-happy). Emoji + label par niveau, highlight actif bg-primary-100/border-primary-500. API : `value: MoodLevel` + `onChange`. Mobile-first flex wrap.",
  "keywords": [
   "mood",
   "journal",
   "humeur",
   "emoji",
   "selector",
   "feeling",
   "MoodLevel"
  ],
  "usedBy": [
   "JournalNewEntry"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { MoodSelector } from '@/components';"
 },
 {
  "name": "JournalTypeTile",
  "codeName": "cards/JournalTypeTile.tsx",
  "category": "Cards",
  "subCategory": "Communication",
  "description": "Tuile de sélection du type d\\'entrée journal (5 types : réflexion libre, apprentissage, pratique pro, coaching, eurêka). Icône Lucide + label + check badge coloré quand sélectionné. `selected` = bordure colorée + bg teinté + rounded-pill check badge. Utiliser avec `JOURNAL_TYPE_ORDER` pour l\\'ordre canonique.",
  "keywords": [
   "journal",
   "entry",
   "type",
   "tile",
   "select",
   "reflexion",
   "apprentissage",
   "coaching",
   "eureka"
  ],
  "usedBy": [
   "JournalNewEntry"
  ],
  "showcaseOnly": false,
  "layer": "cards",
  "import": "import { JournalTypeTile } from '@/components';"
 },
 {
  "name": "JournalBubbleCard",
  "codeName": "cards/JournalBubbleCard.tsx",
  "category": "Cards",
  "subCategory": "Communication",
  "description": "Bulle Apple Messages pour afficher les entrées journal dans la liste. Surface tintée par type, queue speech-bubble bas-droite, badge type pill, actions glass-light. 7 types : guided / free / learning / coaching / insight / questionnaire / compte-rendu. Distinct de JournalEntryCard (layout traditionnel card).",
  "keywords": [
   "journal",
   "bubble",
   "chat",
   "entry",
   "apple-messages",
   "speech-bubble",
   "glass-light",
   "JournalBubbleType"
  ],
  "usedBy": [
   "Journal"
  ],
  "showcaseOnly": false,
  "layer": "cards",
  "import": "import { JournalBubbleCard } from '@/components';"
 },
 {
  "name": "JournalChatCompose",
  "codeName": "ui/JournalChatCompose.tsx",
  "category": "Forms",
  "subCategory": "Inputs",
  "description": "Barre de composition style chat pour démarrer une entrée journal. Bulle Apple Messages (queue bas-gauche), textarea h-auto, emoji ✍️, bouton \"Continuer\", hint ⌘+Entrée. Utilisé en haut de la page Journal pour le quick-compose.",
  "keywords": [
   "journal",
   "compose",
   "chat",
   "textarea",
   "quick-entry",
   "speech-bubble",
   "send"
  ],
  "usedBy": [
   "Journal"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { JournalChatCompose } from '@/components';"
 },
 {
  "name": "StructuredQuestionAccordion",
  "codeName": "ui/StructuredQuestionAccordion.tsx",
  "category": "Forms",
  "subCategory": "Inputs",
  "description": "Accordéon de questions structurantes pour le journal (EDRA-R template ou questions génériques). Gère l\\'état open/closed en interne. `answers` contrôlé (Record<string, string>). Chaque item : titre + description + textarea h-auto min-h-[96px] (contourne piège #10). Préfixe label configurable.",
  "keywords": [
   "accordion",
   "journal",
   "EDRA-R",
   "structured",
   "questions",
   "textarea",
   "collapsible"
  ],
  "usedBy": [
   "JournalNewEntry"
  ],
  "showcaseOnly": false,
  "layer": "ui",
  "import": "import { StructuredQuestionAccordion } from '@/components';"
 },
 {
  "name": "WritingPromptsAside",
  "codeName": "patterns/WritingPromptsAside.tsx",
  "category": "Headers & Sections",
  "subCategory": "Section patterns",
  "description": "Panel de 3 prompts de réflexion journal (Apprentissage / Pratique pro / Coaching). SectionHeader minimal sun + grille 1/2/3 col de PromptCards + lien \"Ouvrir mon journal\". Défauts canoniques TLS inclus. `prompts` override optionnel. `onNavigate` + `onOpenJournal` callbacks.",
  "keywords": [
   "journal",
   "prompts",
   "aside",
   "writing",
   "reflection",
   "PromptCard",
   "SectionHeader",
   "dashboard"
  ],
  "usedBy": [
   "Dashboard"
  ],
  "showcaseOnly": false,
  "layer": "patterns",
  "import": "import { WritingPromptsAside } from '@/components';"
 }
];
