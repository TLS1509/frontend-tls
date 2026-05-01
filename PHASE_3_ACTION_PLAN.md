# PHASE 3: Systematic Refactoring & CSS Consolidation

## Target: 100% Token Compliance Across All Pages

### Pages by Priority (25 pages total)

#### 🔴 CRITICAL (High impact, many hardcoded values)
1. **LearningPaths.tsx** - 24KB CSS with padding variants
2. **LearningPathDetail.tsx** - Complex grid patterns  
3. **Journal.tsx** - Layout patterns
4. **Veille.tsx** - Content layout

#### 🟠 HIGH (Important pages)
5. **Coaching.tsx** - Mostly complete, final polish
6. **Magazine.tsx** - Grid layouts
7. **VideoTutorial.tsx** - Content display
8. **ArticleDetail.tsx** - Long-form content
9. **MagazineArticle.tsx** - Article layout

#### 🟡 MEDIUM (Functional pages)
10-20: AstucesViewer, FlashcardsViewer, ComplementaryContentViewer, LessonPlayer, etc.
21-25: Smaller pages, index pages, utility pages

### CSS Files to Consolidate
1. **learning-paths.css** (24 KB) - Needs padding token system
2. **static-pages.css** (10 KB) - Standardize spacing
3. **veille.css** (12 KB) - Consolidate patterns
4. **app-layout.css** (4 KB) - Convert to tokens
5. **floating-nav.css** (6 KB) - Color/padding cleanup

### Strategy
- Use automated replacements for common patterns
- Manual refactoring for complex layouts
- Test after each page group
- Commit after every 3-4 pages

### Expected Results
- 100% container token usage
- 95%+ spacing token usage
- All colors use design system tokens
- CSS file size reduced by ~30%
- Build remains passing throughout
