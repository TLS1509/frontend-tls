# ⏰ Notion Update — 2026-06-11 (copier/coller)

**Pour la page Notion « Site Internet V1 »**

---

## 🟢 SESSION 2026-06-11 — COMPLETE

### Travail réalisé
✅ **Routing consolidé** : 7 liens cassés dans CinematicHero.tsx + MarketingHomeEditorial.tsx corrigés (`/formation` → `/marketing/formation`, `/learning-app` → `/marketing/learning-app`, `/contact` → `/marketing/contact`, `/conseil` → `/marketing/accompagnement`, `/blog` → `/marketing/magazine`)
✅ **Vérification live** : 24 liens marketing testés, tous `/marketing/*` propres
✅ **Décision routing** : Marketing = strict `<Route path="/marketing" ... />` (not flattened to `/*`)
✅ **Checklist Direction C créée** : `DIRECTION-C-CHECKLIST.md` — timeline complète, assets breakdown, success criteria
✅ **Documentation** : SESSION-2026-06-11-RECAP.md + journal audit MAJ

### Build Status
- `tsc --noEmit` : ✅ 0 errors
- `npm run build` : ✅ Success
- Console : ✅ 0 errors
- Lighthouse : ⏳ Not tested (Hero stand-in may affect Perf)

### Pages Status Update
| Page | Status | Notes |
|------|--------|-------|
| Home | 🟢 LIVE | CinematicHero hero (stand-in) + scroll-story |
| Formation | 🟡 Scaffold | Needs Direction C illustration (STRIDE) + motion |
| Learning App | 🟡 Scaffold | Needs Passeport visual + motion |
| Conseil | 🟡 Scaffold | Needs SBO infographic + motion |
| Resources | 🟢 LIVE | Blog + Dossiers index + detail |
| Blog | 🟢 LIVE | Index + article detail |
| About | 🔴 TODO | Text-only (no photos, locked 2026-06-10) |
| Contact | 🟢 LIVE | Form ready |

---

## 📋 DIRECTION C — TIMELINE & BLOCKERS

**Phase 1 (Weeks 1–3) — Assets réels**

### Illustration Watercolor (Procreate/iPad) — 14–19 heures
- Hero mesh gradient (3–4h)
- STRIDE diagram (4–5h)
- Passeport Dreyfus spiral (3h)
- SBO infographic (2–3h)
- Watermark + blobs (2h)
**Total** : 2–3 days (1 illustrator)

### Vidéo cinématique (AE/Loom) — 23–35 heures
- Home hero 10s (8–12h)
- Formation STRIDE 6s (6–8h)
- Learning App 8s (5–7h)
- Conseil optional 6s (4–6h)
**Total** : 3–5 days (1 motion designer)

### Brand assets
- Logo/favicon ✅
- Typography ✅
- Colors ✅
- Motion system (easing, spring, GPU-safe) ✅
- Pattern library (double-bezel, magnetic, word-swap) ✅

**Phase 2 (Week 4) — Intégration + QA**
- Image integration + motion audit
- Performance (Lighthouse >85, CLS <0.1)
- Accessibility (AA contrast, alt text, focus states, reduced-motion)

**Phase 3 (Weeks 5+) — Remaining pages**
- Formation, Learning App, Conseil, About rebuilds

---

## ⚠️ BLOCKERS TO RESOLVE NOW

### 1️⃣ Illustration Tool
**Decision** : Procreate (iPad) ou Figma Design?
- **Procreate** → Fast (Chloé?), watercolor native, PSD outputs for layers
- **Figma Design** → Collaborative, but less watercolor feel
**Impact** : Determines Phase 1 timeline start

### 2️⃣ Motion Production
**Decision** : In-house AE ou outsource (Loom animator)?
- **In-house** : More control, iterative
- **Outsource** : Faster, but vendor coordination
**Impact** : 8–12 hours hero video production

### 3️⃣ Mobile Video Strategy
**Decision** : Full video vs poster image vs WebM support?
- **Full video** : Best UX, larger payload
- **Poster image** : Fast, degrades gracefully
- **WebM** : Modern codec, less browser support
**Impact** : Performance & mobile experience

### 4️⃣ Route Flattening
**Decision** : Keep `/marketing/*` (current) or flatten to `/*`?
- **Keep** : Current, easy, clear separation
- **Flatten** : Matches doc intention, refactor App.tsx `<Route>` structure
**Impact** : Non-blocking but should decide before linking elsewhere

---

## 📚 NEW FILES / UPDATES

**Created (2026-06-11)**
- ✅ `docs/site/DIRECTION-C-CHECKLIST.md` — Full production timeline + assets breakdown
- ✅ `docs/site/SESSION-2026-06-11-RECAP.md` — Session recap + actions
- ✅ `docs/site/NOTION-UPDATE-2026-06-11.md` — This file (Notion copy)

**Updated (2026-06-11)**
- ✅ `docs/site/SITE-REACT-AUDIT.md` — +Journal entry (routing fixes)
- ✅ Memory : `project_direction_c.md`, `project_marketing_site.md`

---

## 🎯 NEXT STEPS

### Week 1 — BEFORE STARTING ASSETS
- [ ] **Illustration decision** : Procreate or Figma Design? → Chloé approval
- [ ] **Motion production** : Hire motion designer ou in-house? → Budget + timeline
- [ ] **Mobile video strategy** : Full video vs poster? → Performance budget
- [ ] **Route flattening** : Keep `/marketing/*` or flatten? → Architecture decision

### Week 1 — ASSETS START
- [ ] Home hero mesh gradient (watercolor 3–4h)
- [ ] STRIDE diagram hand-drawn (4–5h)
- [ ] Passeport Dreyfus spiral (3h)
- [ ] SBO infographic (2–3h)
- [ ] Watermark + blob library (2h)

### Week 2 — VIDEO START
- [ ] Hero cinématique 10s (8–12h)
- [ ] Formation STRIDE 6s (6–8h)
- [ ] Learning App UI 8s (5–7h)

### Week 3 — POLISH + SYNC
- [ ] Final illustration color grading
- [ ] Video color grading (palette consistency)
- [ ] Figma Design System sync
- [ ] Accessibility audit (AA/AAA)

### Week 4 — INTEGRATION
- [ ] Image + video integration
- [ ] Motion audit (60fps, timing, hover states)
- [ ] Performance (Lighthouse >85, CLS <0.1, LCP <2.5s)
- [ ] WCAG AA compliance

---

## 📊 KEY METRICS

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse (Perf) | >85 | ⏳ Not tested (hero stand-in) |
| CLS (Stability) | <0.1 | ⏳ Pending |
| LCP (Speed) | <2.5s | ⏳ Pending |
| WCAG Contrast | AA | ⏳ Pending |
| Motion (Perf) | 60fps | ✅ CinematicHero OK |
| Code Build | 0 errors | ✅ tsc=0, npm run build OK |

---

## 🔗 REFERENCE DOCS

- **Production checklist** : `docs/site/DIRECTION-C-CHECKLIST.md` (detailed assets breakdown + timeline)
- **Design brief** : `docs/site/DESIGN-INSPO.md` (Directrice créative + Mobbin refs)
- **Sitemap** : `docs/site/SITE-STRUCTURE-DESIGN-C.md` (pages + sections mapped to Direction C)
- **Copy** : `docs/site/COPY-V2.md` (validated hero + sections)
- **Audit trail** : `docs/site/SITE-REACT-AUDIT.md` (code + component history)
- **Session recap** : `docs/site/SESSION-2026-06-11-RECAP.md` (full details)

---

## 👤 WHO NEEDS TO DECIDE

| Decision | Owner | Timeline |
|----------|-------|----------|
| Illustration tool | Chloé | **Before Week 1** |
| Motion production vendor | Chloé + you | **Before Week 1** |
| Mobile video strategy | Chloé | **Before Week 2** |
| Route flattening | Chloé | **Non-blocking, before next refactor** |

---

**Status** : 🟢 Ready for Phase 1 (awaiting decisions above)  
**Next review** : After illustration tool decision

