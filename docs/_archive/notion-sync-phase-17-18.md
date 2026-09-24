# Notion Sync — Phase 17-18 Updates

**Date :** 2026-05-15
**Status :** Ready for upload

## Design System DB
**URL :** https://www.notion.so/thelearningsociety/fc727adea430439bb45590fd908ba134

### Components to update (if not already present)

| Component | Type | Layer | Has variants | Tone-aware | Migration status | Phase | usedBy Pages |
|-----------|------|-------|--------------|-----------|-----------------|-------|-------------|
| StatusBadge | Component | UI | Yes | No | Tailwind ✅ | Phase 14.5 | CorrectionDetailLearner, CoachEnterpriseDashboard |
| MetaPill | Component | UI | No | Yes | Tailwind ✅ | Phase 14.5 | CoachEnterpriseDashboard, CorrectionDetailLearner |
| Badge | Component | Core | Yes | Yes | Tailwind ✅ | Phase 14.5 | Multiple |
| EditorialHero | Component | Pattern | No | Yes | Tailwind ✅ | Phase 14 | All pages |
| Card | Component | Core | Yes | No | Tailwind ✅ | Phase 14 | Multiple |
| Avatar | Component | UI | No | No | Tailwind ✅ | Phase 14 | CorrectionDetailLearner, MessagingThread, CoachEnterpriseDashboard |
| Alert | Component | UI | No | Yes | Tailwind ✅ | Phase 14 | PurchaseCredits, PrivacyDeleteAccount, PrivacyDsar |
| Button | Component | Core | Yes | No | Tailwind ✅ | Phase 1-14 | All pages |
| StatCard | Component | UI | No | No | Tailwind ✅ | Phase 14 | CoachEnterpriseDashboard |

**Action :** For each component above:
1. Check if entry exists in Design System DB
2. If exists : update `Phase` field to "Phase 17" and `usedBy` array with the pages listed above
3. If missing : create new entry with fields as shown in table above

---

## Écrans DB
**URL :** https://www.notion.so/thelearningsociety/c60f30c775c8473fa15a8446f96142d4

### Pages to update

| Page | Route | Flow | Niveau | Statut design | Disponible sur l'app | Composants clés | Phase wired |
|------|-------|------|--------|--------------|-------------------|-----------------|-----------|
| CorrectionDetailLearner | `/coaching/corrections/:id` | Coaching 1-1 | N2 | Wired & Live | YES | Card, Badge, StatusBadge, MetaPill, Button, Alert | 17.2 ✅ |
| CoachEnterpriseDashboard | `/enterprise/coach` | Enterprise FO | N1 | Wired & Live | YES | StatCard, Badge, Tabs, Avatar, Card, Button, MetaPill | 17.3 ✅ |
| PurchaseCredits | `/account/purchase-credits` | Account | N2 | Wired & Live | YES | EditorialHero, Card, Button, Alert, Badge | 17.4 ✅ |
| MessagingThread | `/coaching/messages/:coachId` | Coaching 1-1 | N2 | Wired & Live | YES | EditorialHero, Card, Avatar, Badge, Button, TextArea | 17.5 ✅ |
| PrivacyDeleteAccount | `/account/privacy/delete` | GDPR | N2 | Wired & Live | YES | EditorialHero, SectionCard, Card, Button, Input, Alert, Badge | 17.6 ✅ |
| PrivacyDsar | `/account/privacy/dsar` | GDPR | N2 | Wired & Live | YES | EditorialHero, SectionCard, Card, Button, Input, Alert | Phase 17 🟢 |

**Action for each page :**
1. Find the page entry in Écrans DB
2. Update fields:
   - `Statut design` → "Wired & Live"
   - `Disponible sur l'app` → YES
   - `Phase` or similar tracking field → Phase 17 or Phase 17.X per table
   - `Composants clés` → list from table above
3. Add internal link to `Components` used (if DB supports linking)

---

## Summary of Changes

### Total pages wired Phase 17
- **6 pages** fully connected to Zustand stores with localStorage persistence
- All pages now read live data and persist writes
- No static mock data hardcoded in pages

### Components activated (removed showcaseOnly flag)
- StatusBadge
- MetaPill  
- Avatar
- StatCard
- Alert
- (Others remain in showcase if not fully integrated)

### New patterns documented
- Seed-on-first-access pattern (store auto-populates from MOCK_* on first getX())
- Live data binding (direct store.getX() in render body)
- Route param matching (coachId → find session in store)
- Write persistence (store.updateX triggers localStorage)
- Local state for UI-only (useState for modals, tab selection, drafts)

### New error handling
- ComponentPreviewErrorBoundary added to Components.tsx (prevents demo crashes)

---

## Manual verification

After updating Notion:

1. **Design System DB** : Verify that each component entry has:
   - Correct `Migration status` (all Phase 17 components = "Tailwind ✅")
   - Updated `usedBy` arrays listing 6 Phase 17 pages
   - Correct `Phase` field

2. **Écrans DB** : Verify that each page has:
   - `Statut design` = "Wired & Live" ✅
   - `Disponible sur l'app` = YES ✅
   - Correct list of components in `Composants clés` field
   - Phase tracking updated

3. **Cross-check** : One component should appear in multiple pages' `Composants clés`
   - Example: Card appears in all 6 pages
   - Example: Button appears in all 6 pages
   - Example: Badge appears in 5/6 pages

---

**Notes for Manual Entry :**
- Notion doesn't have an API tool for bulk updating database records in this context
- Use Notion UI directly to update database entries
- Or copy the tables above and paste into Notion as references while updating
