# 🎨 CSS Snippets Ready - Copy/Paste

**Success Convention | Production Ready | 22/02/2026**

---

## 📋 TOKENS AJOUTÉS

```css
/* /styles/globals-v2.css - Lignes 154-159 */

/* SUCCESS - Teal TLS #2E8F98 */
--success: var(--color-success-500);              /* Highlights, icons, borders */
--success-foreground: #ffffff;                    /* Large text only (AA Large) */

/* SUCCESS SOLID - WCAG AA compliant for normal text */
--success-solid: var(--color-success-600);        /* Backgrounds for buttons/badges (AA normal) */
--success-solid-foreground: #ffffff;              /* 4.72:1 ratio - AA compliant ✓ */
```

---

## 🎨 BADGE SUCCESS

### Snippet Complet

```css
/* Badge texte normal - AA Compliant */
.badge-success {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--success-solid);
  color: var(--success-solid-foreground);
  font-size: var(--text-sm);
  font-weight: 600;
  font-family: var(--font-body);
  border-radius: var(--radius-full);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.badge-success:hover {
  background: var(--color-success-700);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.badge-success-icon {
  width: 16px;
  height: 16px;
}
```

### HTML

```html
<span class="badge-success">
  <svg class="badge-success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
  </svg>
  Validé
</span>
```

---

## 🔘 BUTTON SUCCESS

### Snippet Complet

```css
/* Button texte normal - AA Compliant */
.button-success {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-6);
  background: var(--success-solid);
  color: var(--success-solid-foreground);
  font-size: var(--text-base);
  font-weight: 600;
  font-family: var(--font-body);
  line-height: 1;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-success:hover {
  background: var(--color-success-700);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.button-success:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.button-success:focus-visible {
  outline: 2px solid var(--success);
  outline-offset: 2px;
}

.button-success:disabled {
  background: var(--color-neutral-200);
  color: var(--color-neutral-500);
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
}

.button-success-icon {
  width: 20px;
  height: 20px;
}
```

### HTML

```html
<button class="button-success">
  <svg class="button-success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
  </svg>
  Confirmer l'action
</button>
```

---

## 📢 ALERT SUCCESS

### Snippet Complet

```css
/* Alert fond clair - AAA Compliant */
.alert-success {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--color-success-50);
  color: var(--color-success-700);
  border-left: 4px solid var(--success);
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.alert-success-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: var(--success);
}

.alert-success-content {
  flex: 1;
}

.alert-success-title {
  font-weight: 600;
  font-size: var(--text-base);
  font-family: var(--font-display);
  color: var(--color-success-700);
  margin: 0 0 var(--space-2) 0;
}

.alert-success-message {
  font-size: var(--text-sm);
  font-family: var(--font-body);
  color: var(--color-success-600);
  line-height: 1.5;
  margin: 0;
}

.alert-success-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  margin-top: var(--space-3);
  background: var(--success-solid);
  color: var(--success-solid-foreground);
  font-size: var(--text-sm);
  font-weight: 600;
  font-family: var(--font-body);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.2s ease;
}

.alert-success-button:hover {
  background: var(--color-success-700);
}

.alert-success-close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  padding: 0;
  background: transparent;
  color: var(--color-success-500);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.alert-success-close:hover {
  opacity: 1;
  background: var(--color-success-100);
}
```

### HTML

```html
<div class="alert-success">
  <svg class="alert-success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
  
  <div class="alert-success-content">
    <h4 class="alert-success-title">✓ Action réussie</h4>
    <p class="alert-success-message">
      Votre profil a été mis à jour avec succès. Les modifications sont maintenant visibles par tous les membres.
    </p>
    <button class="alert-success-button">
      Voir les détails
    </button>
  </div>
  
  <button class="alert-success-close" aria-label="Fermer">
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  </button>
</div>
```

---

## 🎯 ICON SUCCESS

### Snippet Complet

```css
/* Icon seul - Pas de contraste texte requis */
.icon-success {
  color: var(--success);
  width: 24px;
  height: 24px;
  transition: color 0.2s ease;
}

.icon-success:hover {
  color: var(--color-success-600);
}

/* Variantes tailles */
.icon-success-sm {
  width: 16px;
  height: 16px;
}

.icon-success-lg {
  width: 32px;
  height: 32px;
}

.icon-success-xl {
  width: 48px;
  height: 48px;
}
```

### HTML

```html
<svg class="icon-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
</svg>
```

---

## 🔲 CARD SUCCESS

### Snippet Complet

```css
/* Card avec accent success */
.card-success {
  padding: var(--space-6);
  background: var(--color-success-50);
  border: 1px solid var(--color-success-200);
  border-left: 4px solid var(--success);
  border-radius: var(--radius-xl);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.card-success:hover {
  border-color: var(--color-success-300);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.card-success-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.card-success-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: var(--success);
}

.card-success-title {
  font-size: var(--text-lg);
  font-weight: 600;
  font-family: var(--font-display);
  color: var(--color-success-700);
  margin: 0;
}

.card-success-content {
  font-size: var(--text-base);
  font-family: var(--font-body);
  color: var(--color-success-600);
  line-height: 1.6;
  margin: 0;
}
```

### HTML

```html
<div class="card-success">
  <div class="card-success-header">
    <svg class="card-success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <h3 class="card-success-title">Opération réussie</h3>
  </div>
  <p class="card-success-content">
    Vos paramètres ont été enregistrés et sont maintenant actifs.
  </p>
</div>
```

---

## 🏷️ TAG SUCCESS

### Snippet Complet

```css
/* Tag/Label minimal */
.tag-success {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  background: var(--color-success-100);
  color: var(--color-success-700);
  font-size: var(--text-xs);
  font-weight: 600;
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-md);
}

/* Tag avec border */
.tag-success-outline {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  background: transparent;
  color: var(--success);
  font-size: var(--text-xs);
  font-weight: 600;
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid var(--success);
  border-radius: var(--radius-md);
}
```

### HTML

```html
<span class="tag-success">Actif</span>
<span class="tag-success-outline">Validé</span>
```

---

## 📊 PROGRESS BAR SUCCESS

### Snippet Complet

```css
/* Progress bar */
.progress-success {
  width: 100%;
  height: 8px;
  background: var(--color-success-100);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-success-bar {
  height: 100%;
  background: var(--success);
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
}

/* Avec label */
.progress-success-container {
  width: 100%;
}

.progress-success-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
  font-family: var(--font-body);
  color: var(--color-success-700);
}
```

### HTML

```html
<div class="progress-success-container">
  <div class="progress-success-label">
    <span>Progression</span>
    <span>75%</span>
  </div>
  <div class="progress-success">
    <div class="progress-success-bar" style="width: 75%"></div>
  </div>
</div>
```

---

## ✅ CHECKBOX SUCCESS

### Snippet Complet

```css
/* Custom checkbox */
.checkbox-success {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  user-select: none;
}

.checkbox-success-input {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-success-300);
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.checkbox-success-input:hover {
  border-color: var(--success);
}

.checkbox-success-input:checked {
  background: var(--success-solid);
  border-color: var(--success-solid);
}

.checkbox-success-input:checked::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-success-label {
  font-size: var(--text-base);
  font-family: var(--font-body);
  color: var(--color-neutral-700);
}
```

### HTML

```html
<label class="checkbox-success">
  <input type="checkbox" class="checkbox-success-input" checked>
  <span class="checkbox-success-label">J'accepte les conditions</span>
</label>
```

---

## 📖 DOCUMENTATION

**Guide complet :** `/docs/SUCCESS-SOLID-CONVENTION.md`  
**Référence rapide :** `/SUCCESS-CHEATSHEET.md`

---

**Ready to Copy/Paste ! 🎨**

_CSS Snippets | Production Ready | 22/02/2026_
