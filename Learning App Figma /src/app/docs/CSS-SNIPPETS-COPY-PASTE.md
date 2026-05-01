# 📋 CSS Snippets - Copy-Paste Ready

Tous les snippets CSS prêts à copier-coller dans votre fichier WordPress.

---

## 🎨 1. Glass Card Base

```css
/* Glass Card - Style de base */
.glass-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-3xl); /* 32px */
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
}

.glass-card:hover {
  transform: translateY(-8px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 20px 60px 0 rgba(0, 0, 0, 0.08), 0 12px 32px 0 rgba(0, 0, 0, 0.04), 0 1px 0 0 rgba(255, 255, 255, 1) inset;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-color: rgba(255, 255, 255, 1);
}
```

---

## 🎴 2. Action Card (Quick Actions)

```css
/* Action Card */
.action-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl); /* 24px */
  padding: var(--space-5); /* 20px */
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: var(--space-3); /* 12px */
  align-items: center;
  text-align: center;
  min-height: 160px;
  cursor: pointer;
  transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
}

.action-card:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 8px 24px 0 rgba(var(--icon-color-rgb), 0.12);
}

/* Icon Circle */
.action-card-icon-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(var(--icon-color-rgb), 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Title */
.action-card-title {
  font-family: var(--font-display);
  font-size: var(--text-base); /* 16px */
  font-weight: var(--font-weight-bold); /* 700 */
  color: var(--foreground);
  line-height: var(--leading-tight);
}

/* Description */
.action-card-description {
  font-family: var(--font-body);
  font-size: var(--text-xs); /* 12px */
  color: var(--muted-foreground);
}
```

---

## 📚 3. Continue Learning Card

```css
/* Continue Learning Card */
.continue-learning-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-3xl); /* 32px */
  padding: var(--space-8); /* 32px */
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
  animation: breathe 4s ease-in-out infinite;
}

.continue-learning-card:hover {
  transform: translateY(-8px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 20px 60px 0 rgba(237, 132, 58, 0.08), 0 12px 32px 0 rgba(237, 132, 58, 0.04), 0 1px 0 0 rgba(255, 255, 255, 1) inset;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-color: rgba(255, 255, 255, 1);
  animation: none; /* Stop breathe on hover */
}

/* Background Glow */
.continue-learning-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(237, 132, 58, 0.06) 0%, transparent 70%);
  pointer-events: none;
  animation: pulseGlow 3s ease-in-out infinite;
}

/* Title */
.continue-learning-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl); /* 24px */
  font-weight: var(--font-weight-bold); /* 700 */
  color: var(--secondary); /* Orange */
  line-height: var(--leading-tight);
  position: relative;
  z-index: 10;
}

/* Step Text */
.continue-learning-step {
  font-family: var(--font-body);
  font-size: var(--text-base); /* 16px */
  color: var(--muted-foreground);
  line-height: var(--leading-normal);
  position: relative;
  z-index: 10;
}

/* Continue Button */
.continue-button {
  display: flex;
  align-items: center;
  gap: var(--space-3); /* 12px */
  padding: var(--space-3) var(--space-6); /* 12px 24px */
  background: var(--secondary);
  color: white;
  border: none;
  border-radius: var(--radius-xl); /* 16px */
  cursor: pointer;
  transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
  position: relative;
  z-index: 10;
}

.continue-button:hover {
  transform: scale(1.05);
}

/* Progress Bar */
.progress-bar-container {
  background: rgba(0, 0, 0, 0.05);
  border-radius: var(--radius-full);
  height: 8px;
  overflow: hidden;
  margin-top: var(--space-6); /* 24px */
  position: relative;
  z-index: 10;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
  background-size: 200% 100%;
  border-radius: var(--radius-full);
  animation: gradientFlow 3s ease-in-out infinite;
  transition: width 300ms cubic-bezier(0, 0, 0.2, 1);
}

/* Animations */
@keyframes breathe {
  0%, 100% {
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
  }
  50% {
    box-shadow: 0 8px 24px 0 rgba(237, 132, 58, 0.08), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
  }
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.06; }
  50% { opacity: 0.12; }
}

@keyframes gradientFlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

## 📝 4. Journal Prompt Card

```css
/* Journal Prompt Card */
.journal-prompt-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl); /* 24px */
  padding: var(--space-5); /* 20px */
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: var(--space-4); /* 16px */
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
}

.journal-prompt-card:hover {
  transform: translateY(-4px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 12px 32px 0 rgba(0, 0, 0, 0.08);
}

/* Badge */
.journal-prompt-badge {
  padding: var(--space-2-5) var(--space-5); /* 10px 20px */
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-xs); /* 12px */
  font-weight: var(--font-weight-semibold); /* 600 */
}

/* Badge variants */
.journal-prompt-badge-blue {
  background: linear-gradient(135deg, rgba(85, 161, 180, 0.15) 0%, rgba(85, 161, 180, 0.08) 100%);
  border: 1px solid rgba(85, 161, 180, 0.25);
  color: var(--primary);
}

.journal-prompt-badge-orange {
  background: linear-gradient(135deg, rgba(237, 132, 58, 0.15) 0%, rgba(237, 132, 58, 0.08) 100%);
  border: 1px solid rgba(237, 132, 58, 0.25);
  color: var(--secondary);
}

.journal-prompt-badge-yellow {
  background: linear-gradient(135deg, rgba(248, 176, 68, 0.15) 0%, rgba(248, 176, 68, 0.08) 100%);
  border: 1px solid rgba(248, 176, 68, 0.25);
  color: var(--accent);
}

/* Question */
.journal-prompt-question {
  font-family: var(--font-body);
  font-size: var(--text-base); /* 16px */
  font-weight: var(--font-weight-medium); /* 500 */
  color: var(--foreground);
  line-height: var(--leading-normal); /* 1.5 */
}
```

---

## 📰 5. Activity Card

```css
/* Activity Card */
.activity-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl); /* 24px */
  padding: var(--space-4); /* 16px - Compact */
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  gap: var(--space-4); /* 16px */
  align-items: flex-start;
  cursor: pointer;
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
}

.activity-card:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.08);
}

/* Meta Row */
.activity-card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-2); /* 8px */
  margin-bottom: var(--space-1);
}

/* Badge */
.activity-card-badge {
  padding: var(--space-1) var(--space-2-5); /* 4px 10px */
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-xs); /* 12px */
  font-weight: var(--font-weight-medium); /* 500 */
  border: 1px solid;
}

/* Title */
.activity-card-title {
  font-family: var(--font-display);
  font-size: var(--text-lg); /* 18px */
  font-weight: var(--font-weight-semibold); /* 600 */
  color: var(--foreground);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-1);
}

/* Timestamp */
.activity-card-timestamp {
  font-family: var(--font-body);
  font-size: var(--text-xs); /* 12px */
  color: var(--muted-foreground);
}

/* Description */
.activity-card-description {
  font-family: var(--font-body);
  font-size: var(--text-base); /* 16px */
  color: var(--foreground);
  line-height: var(--leading-normal);
  margin-top: var(--space-2);
}
```

---

## 🏷️ 6. Stat Pills

```css
/* Stat Pill Base */
.stat-pill {
  display: flex;
  align-items: center;
  gap: var(--space-2); /* 8px */
  padding: var(--space-2) var(--space-3); /* 8px 12px */
  border-radius: var(--radius-full);
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1);
  cursor: pointer;
}

.stat-pill:hover {
  transform: scale(1.05);
}

/* Stat Pill - Streak (Yellow) */
.stat-pill-streak {
  background: linear-gradient(135deg, rgba(248, 176, 68, 0.15) 0%, rgba(248, 176, 68, 0.08) 100%);
  border: 1px solid rgba(248, 176, 68, 0.25);
}

.stat-pill-streak .stat-pill-value {
  font-family: var(--font-display);
  font-size: var(--text-sm); /* 14px */
  font-weight: var(--font-weight-bold); /* 700 */
  color: var(--accent);
}

.stat-pill-streak .stat-pill-label {
  font-family: var(--font-body);
  font-size: var(--text-sm); /* 14px */
  color: var(--accent);
}

/* Stat Pill - Badges (Orange) */
.stat-pill-badges {
  background: linear-gradient(135deg, rgba(237, 132, 58, 0.15) 0%, rgba(237, 132, 58, 0.08) 100%);
  border: 1px solid rgba(237, 132, 58, 0.25);
}

.stat-pill-badges .stat-pill-value {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-bold);
  color: var(--secondary);
}

.stat-pill-badges .stat-pill-label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--secondary);
}

/* Stat Pill - Completion (Blue) */
.stat-pill-completion {
  background: linear-gradient(135deg, rgba(85, 161, 180, 0.15) 0%, rgba(85, 161, 180, 0.08) 100%);
  border: 1px solid rgba(85, 161, 180, 0.25);
}

.stat-pill-completion .stat-pill-value {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-bold);
  color: var(--primary);
}

.stat-pill-completion .stat-pill-label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--primary);
}
```

---

## 📱 7. Responsive Grids

```css
/* Quick Actions Grid */
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3); /* 12px */
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .quick-actions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4); /* 16px */
  }
}

@media (max-width: 640px) {
  .quick-actions-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
}

/* Journal Prompts Grid */
.journal-prompts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3); /* 12px */
}

@media (max-width: 1024px) {
  .journal-prompts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .journal-prompts-grid {
    grid-template-columns: 1fr;
  }
}

/* Activity Feed */
.activity-feed {
  display: flex;
  flex-direction: column;
  gap: var(--space-3); /* 12px */
}
```

---

## ♿ 8. Accessibility

```css
/* Focus States */
.card:focus-visible,
.button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.card:focus:not(:focus-visible),
.button:focus:not(:focus-visible) {
  outline: none;
}

/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 🎭 9. Hero Section

```css
/* Hero Section */
.hero-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6); /* 32px 24px */
}

/* Hero Card */
.hero-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--radius-2xl); /* 24px */
  padding: var(--space-8); /* 32px */
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.06);
}

/* Hero Title avec gradient text */
.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-5xl); /* 48px */
  font-weight: var(--font-weight-bold); /* 700 */
  line-height: var(--leading-tight); /* 1.25 */
  background: var(--gradient-tls-text-cool);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-4);
}

/* Hero Quote */
.hero-quote {
  font-family: var(--font-body);
  font-size: var(--text-base); /* 16px */
  color: var(--muted-foreground);
  font-style: italic;
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

/* Stats Pills Container */
.hero-stats {
  display: flex;
  gap: var(--space-3); /* 12px */
  flex-wrap: wrap;
}
```

---

## 📐 10. Container & Layout

```css
/* Page Container */
.dashboard-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--space-6); /* 24px */
}

/* Section Spacing */
.section-spacing {
  margin-bottom: var(--space-8); /* 32px */
}

/* Page Background */
.page-background {
  background: linear-gradient(to bottom right, var(--primary-50), white, var(--accent-50));
  padding-bottom: var(--space-12); /* 48px */
  min-height: 100vh;
}
```

---

## 💡 Usage Tips

1. **Copier tout un snippet** : Sélectionner le bloc CSS entier et copier dans votre fichier
2. **Variables required** : Assurez-vous d'avoir chargé toutes les variables CSS avant
3. **Browser prefix** : `-webkit-backdrop-filter` est nécessaire pour Safari
4. **Custom properties** : Remplacer `var(--icon-color-rgb)` par les valeurs RGB de votre icône

---

**Pro Tip**: Ces snippets sont "pixel-perfect" et correspondent exactement au design React. Ne modifiez pas les valeurs sauf si absolument nécessaire.
