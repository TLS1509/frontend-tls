# 🎯 REFACTORING ROADMAP - Learning App TLS 2026

**Objectif**: Refactoriser 44 pages pour remplacer hardcoding CSS par composants + tokens TLS  
**Référence Design**: Learning App Figma (/Users/chloemimault/Projects/frontend-tls/Learning App Figma/)  
**Date**: 2026-04-30

---

## 📊 INVENTAIRE PAGES

| Catégorie | App | Figma | À Refactoriser |
|-----------|-----|-------|-----------------|
| Auth | 5 | 5 | ✅ 5 |
| Core Learning | 8 | 5 | ✅ 5 (priorité) |
| User Hub | 4 | 4 | ✅ 4 |
| Veille | 7 | 7 | ✅ 7 |
| Journal | 4 | 3 | ✅ 3 |
| Coaching | 4 | 4 | ✅ 4 |
| Entreprise | 1 | 0 | ✅ 1 |
| Help/Error | 3 | 3 | ✅ 3 |
| Autres | 4 | 6 | ⚠️ Évaluer |
| **TOTAL** | **44** | **41** | **~35-38** |

---

## 🎪 MAPPING: DESIGN → APP PAGES

### ✅ PARFAIT MATCH (Copy Design → Update App)
```
DashboardDevSpecsPage.tsx       → Dashboard.tsx (⭐ TOP 1)
ParcoursPageUpgraded.tsx         → LearningPaths.tsx (⭐ TOP 2)
ProfilePage.tsx                  → Profile.tsx (⭐ TOP 7)
VeillePage.tsx                   → Veille.tsx (⭐ TOP 8)
CoachingPageUpgraded.tsx         → Coaching.tsx (⭐ TOP 5)
JournalNewEntryPage.tsx          → JournalNewEntry.tsx
JournalDetailPage.tsx            → JournalDetail.tsx
MessagesPage.tsx                 → Messages.tsx
NotificationsPageUltra.tsx       → Notifications.tsx
MagazinePage.tsx                 → Magazine.tsx
```

### ⚠️ NÉCESSITE MAPPING
```
LoginPage.tsx / SignupPage.tsx   → Login.tsx / Signup.tsx (pas de design spécifique?)
Error404Page.tsx / Error500Page.tsx → Error404.tsx / Error500.tsx
ArticleDetailPage.tsx            → ArticleDetail.tsx
```

### 🆕 APP PAGES SANS ÉQUIVALENT FIGMA (Créés en plus)
```
CourseDetail.tsx              (Course detail view - complexe, peut avoir une meilleure version)
LearningPathDetail.tsx        (Project/Step details)
Enterprise.tsx                (Admin dashboard PRO)
Project.tsx                   (Hands-on project viewer)
Onboarding.tsx               (User onboarding flow)
Collaboration.tsx            (Community hub)
LearningSpace.tsx            (Shared learning space)
Leaderboard.tsx              (User rankings)
```

---

## 🎯 TOP 10 PRIORITY (Impacter 80% des utilisateurs)

| Rang | Page | État | Complexité | Impact | ETA |
|------|------|------|-----------|--------|-----|
| 1️⃣ | Dashboard.tsx | CSS hardcodé | 🟡 Moyen | 100+ utilisateurs/jour | 2-3h |
| 2️⃣ | LearningPaths.tsx | CSS hardcodé | 🟡 Moyen | 100+ utilisateurs/jour | 2-3h |
| 3️⃣ | LessonViewer.tsx | ❌ PAS TROUVÉ | 🔴 Complexe | EDRAC 7-étapes | 4-5h |
| 4️⃣ | CourseDetail.tsx | CSS hardcodé | 🔴 Complexe | 80+ utilisateurs/jour | 4-5h |
| 5️⃣ | Coaching.tsx | CSS hardcodé | 🟡 Moyen | 50+ utilisateurs/jour | 2-3h |
| 6️⃣ | Profile.tsx | CSS hardcodé | 🟡 Moyen | 80+ utilisateurs/jour | 2-3h |
| 7️⃣ | Journal.tsx | CSS hardcodé | 🟡 Moyen | 60+ utilisateurs/jour | 2-3h |
| 8️⃣ | Veille.tsx | CSS hardcodé | 🟡 Moyen | 70+ utilisateurs/jour | 2-3h |
| 9️⃣ | Messages.tsx | CSS hardcodé | 🟠 Léger | 40+ utilisateurs/jour | 1-2h |
| 🔟 | Enterprise.tsx | CSS hardcodé | 🟡 Moyen | 5-10 utilisateurs/jour | 2-3h |

**Total ETA TOP 10**: ~25-30 heures

---

## 🔧 STRATÉGIE DE REFACTORISATION

### ✨ Ce qu'il faut REMPLACER (Hardcoding)
- ❌ CSS classes imports (`dashboard-modern.css`, `learning-paths.css`, etc.)
- ❌ Inline `style={{}}` avec valeurs hardcodées (px, rgba, gradients)
- ❌ `[data-tone]` attribute selectors et CSS tone logic
- ❌ Manual grid layouts avec `gridTemplateColumns: 'repeat(4, 1fr)'`
- ❌ Hardcoded breakpoints et media queries

### ✅ Ce qu'il faut UTILISER (Components + Tokens)

**Pattern Components**:
- `<HeroSection>` - Page headers avec gradient
- `<CardGrid layout="feature">` - Responsive grids
- `<MetaPillGroup>` - Metadata chips
- `<ToneAwareCard>` - Tone-colored containers
- `<InlineProgress>` - Progress bars
- `<Button>` - Buttons with variants
- `<Card>` - Cards with variants

**Design Tokens**:
- `var(--s-*)` - Spacing (s-1 à s-12)
- `var(--t-*)` - Typography (t-body, t-h1, etc.)
- `var(--r-*)` - Border radius (r-xs, r-lg, etc.)
- `var(--tls-primary-*)` - Color palette
- `var(--surface)`, `var(--surface-muted)` - Surfaces
- `var(--border)`, `var(--shadow-*)` - Decorations

**Example: AVANT vs APRÈS**

**AVANT (Hardcoding)**:
```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '24px',
  padding: '32px',
  background: 'linear-gradient(135deg, #F0E5FF 0%, #FFE5E5 100%)',
  borderRadius: '12px',
}}>
```

**APRÈS (Composants + Tokens)**:
```tsx
<CardGrid layout="feature" gapSize="md">
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</CardGrid>
```

---

## 📋 CHECKLIST REFACTORISATION PAR PAGE

### Template pour chaque page:
```markdown
## ✅ Refactor: [Page Name]

**Current File**: /src/pages/[Page].tsx
**Design Ref**: Learning App Figma/.../[DesignPage].tsx
**Status**: 🔴 Not Started | 🟡 In Progress | 🟢 Complete

### Changes Needed:
- [ ] Remove CSS class imports (e.g., `dashboard-modern.css`)
- [ ] Replace hardcoded grid layouts → use `<CardGrid>`
- [ ] Replace tone logic → use `<ToneAwareCard>`
- [ ] Replace tone-chips → use `<MetaPillGroup>`
- [ ] Replace inline styles → use tokens `var(--s-*, --t-*, --tls-*)`
- [ ] Add/verify `<HeroSection>` for page header
- [ ] Verify navigation props (onNavigate, onLogout)
- [ ] Test responsive (375px, 768px, 1280px)
- [ ] Compare with design reference

### Files to Update:
- `/src/pages/[Page].tsx`
- `/src/styles/[page]-*.css` (delete if unused elsewhere)

### Verification:
- [ ] TypeScript compiles without errors
- [ ] No hardcoded hex colors/sizes
- [ ] All spacing uses `var(--s-*)`
- [ ] All text sizes use `var(--t-*)`
- [ ] Visual matches design reference
```

---

## 📂 PLAN PAR PHASE

### PHASE 1: Core Learning Pages (TOP 3) - HIGH IMPACT
**ETA**: 8-12 heures  
**Target**: Dashboard, LearningPaths, CourseDetail

1. **Dashboard.tsx** (2-3h)
   - Remove: `dashboard-modern.css`
   - Update: Quick actions grid → `<CardGrid layout="feature">`
   - Update: Stat pills → `<MetaPillGroup>`
   - Update: Prompts section → `<CardGrid layout="default">`
   - Verify: HeroSection + navigation

2. **LearningPaths.tsx** (2-3h)
   - Remove: `learning-paths.css`
   - Update: Parcours grid → `<CardGrid layout="default" autoFit>`
   - Update: Tile metadata → `<MetaPillGroup size="sm">`
   - Update: Progress bars → `<InlineProgress>`
   - Verify: Tone variants work with `<ToneAwareCard>`

3. **CourseDetail.tsx** (4-5h)
   - Remove: `course-*.css`
   - Update: Step cards grid → `<CardGrid layout="compact">`
   - Update: Resource grid → `<CardGrid layout="default">`
   - Add: `<InlineProgress>` for lesson progress
   - Verify: Complex state management intact

### PHASE 2: User Hub Pages (TOP 4-6) - CONSISTENCY
**ETA**: 6-8 heures  
**Target**: Profile, Coaching, Journal, Messages

4. **Profile.tsx** (2-3h)
5. **Coaching.tsx** (2-3h)
6. **Journal.tsx** + JournalDetail.tsx (2h)
7. **Messages.tsx** + Notifications.tsx (2h)

### PHASE 3: Content Pages (TOP 7-8) - DISCOVERY
**ETA**: 4-6 heures  
**Target**: Veille, Magazine, Articles

8. **Veille.tsx** (2h)
9. **Magazine.tsx** + ArticleDetail.tsx (2h)
10. **Newsletter/WeeklyNewsletter.tsx** (2h)

### PHASE 4: Auth + Utility (LOW IMPACT)
**ETA**: 4-5 heures  
**Target**: Login, Signup, Errors, Help

11-16. Auth pages, Error pages, Help (1-2h each)

### PHASE 5: Enterprise + Advanced (SPECIALIZED)
**ETA**: 3-4 heures  
**Target**: Enterprise, Project, LearningSpace, Leaderboard

17-20. Specialized pages (1-2h each)

---

## 🚨 CRITICAL PAGES (BLOCKERS)

### 🔴 LessonViewer.tsx - NOT FOUND
**Status**: ⚠️ MISSING  
**Impact**: 🔴 CRITICAL - Core learning experience  
**Action Required**: 
- [ ] Search for equivalent in app (might be named differently)
- [ ] Check Learning App Figma for design reference
- [ ] If missing: Create from scratch using EDRAC template

**Possible locations**:
- `CourseDetail.tsx` (lessons might be embedded)
- Separate `LessonViewer.tsx` page
- Modal component within CourseDetail

---

## 📈 QUICK WINS (30min - 1h each)

These pages have minimal hardcoding:
- Error404.tsx / Error500.tsx (2 simple pages)
- Help.tsx (mostly text + links)
- Leaderboard.tsx (if uses Card/Badge components)

**ROI**: Quick motivation boost, 1-2 pages/hour

---

## 🎨 COMPONENT DEPENDENCY CHAIN

```
ComponentShowcase.tsx
  ├─ Button, Card, Badge, ProgressBar
  ├─ HeroSection
  ├─ CardGrid
  ├─ MetaPill / MetaPillGroup
  ├─ ToneAwareCard
  └─ InlineProgress

OptimizedSidebar (used in all pages)
  ├─ Navigation links
  ├─ User menu
  └─ Backdrop blobs

BackgroundBlobs (decorative)
  └─ CSS-based animation
```

---

## 📝 SUCCESS CRITERIA

✅ **Refactoring Complete When**:
1. Zero CSS class imports in `/src/pages/*.tsx`
2. All grids use `<CardGrid>` or utility classes
3. All spacing/sizing uses TLS tokens `var(--s-*, --t-*, --r-*)`
4. All colors use design system (no hex colors)
5. All tone logic uses `<ToneAwareCard>` or component props
6. Visual regression tests pass at all breakpoints
7. No TypeScript errors
8. Pages load < 2 seconds (with existing cache)

---

## 🔗 RELATED DOCS

- [`/DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) - Design tokens + component API
- [`/Learning App Figma/.../`](./Learning%20App%20Figma%20/) - Design references
- [`/src/components/patterns/`](./src/components/patterns/) - Pattern components
- [`/src/styles/tls-components.css`](./src/styles/tls-components.css) - Component CSS

---

## 📊 PROGRESS TRACKING

Will be updated as refactoring progresses:

```
PHASE 1: Core Learning [████████░░░░░░░░░░] 0%
PHASE 2: User Hub     [░░░░░░░░░░░░░░░░░░] 0%
PHASE 3: Content      [░░░░░░░░░░░░░░░░░░] 0%
PHASE 4: Auth+Util    [░░░░░░░░░░░░░░░░░░] 0%
PHASE 5: Enterprise   [░░░░░░░░░░░░░░░░░░] 0%

TOTAL PROGRESS: [░░░░░░░░░░░░░░░░░░] 0%
```

---

## 🎯 NEXT IMMEDIATE STEPS

1. ✅ **Clarify LessonViewer**: Find equivalent in app
2. 🟡 **Compare 3 pages**: Dashboard, LearningPaths, Profile (app vs design)
3. 🟡 **Create detailed diffs**: What CSS needs to change?
4. 🟡 **Start PHASE 1**: Refactor Dashboard.tsx as proof-of-concept
5. 📊 **Track progress**: Update this roadmap after each page

**Ready to begin?** Start with Dashboard.tsx PHASE 1.
