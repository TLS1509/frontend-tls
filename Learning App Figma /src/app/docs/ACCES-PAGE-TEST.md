# 🎨 Comment Accéder à la Page de Test Color Tokens V2

## ✅ MÉTHODE 1 : Bouton Flottant (Recommandé)

### Sur le Dashboard

1. **Ouvrir l'application** (normalement ouverte sur `/dashboard`)
2. **Chercher le bouton flottant** en bas à droite :
   - Bouton rond bleu avec icône 🎨
   - Texte "Color Tokens V2"
   - Position : bas-droit de l'écran

3. **Cliquer sur le bouton**
   - La page de test s'ouvre immédiatement

---

## ✅ MÉTHODE 2 : Via le Code (Navigation Directe)

### Modifier le State Initial

Dans `/App.tsx`, ligne 101 :

**AVANT:**
```tsx
const [currentPage, setCurrentPage] = useState<Page>('dashboard');
```

**APRÈS:**
```tsx
const [currentPage, setCurrentPage] = useState<Page>('color-tokens-test');
```

**Résultat:** L'app ouvre directement sur la page de test au lancement.

---

## ✅ MÉTHODE 3 : Console DevTools (Pour Développeurs)

### Accès via React DevTools

1. Ouvrir **DevTools** (F12)
2. Onglet **Console**
3. Taper :
   ```js
   // Trouver le composant App et changer la page
   // (nécessite React DevTools installé)
   ```

**Note:** Cette méthode nécessite React DevTools extension.

---

## 📋 Que Valider sur la Page de Test ?

### ✅ Section 1 : Legacy Backgrounds
- [ ] 4 cards avec backgrounds colorés (primary/accent/secondary/neutral-50)
- [ ] Couleurs claires et pastels visibles
- [ ] Texte lisible sur fond clair

### ✅ Section 2 : Semantic Tokens
- [ ] Card avec background blanc et ombre
- [ ] Muted background gris clair
- [ ] Gradient primary avec dégradé bleu

### ✅ Section 3 : États UI
- [ ] **Warning** = Jaune #F8B044
- [ ] **Error** = Rouge #EF4444
- [ ] **Destructive** = Rouge foncé #DC2626 (plus foncé que error)
- [ ] **Success** = Teal #2A9D8F

### ✅ Résumé Final
- [ ] Section verte avec ✓ checkmarks
- [ ] Message "Zéro breaking change confirmé"

---

## 🔧 Troubleshooting

### Le bouton flottant n'apparaît pas

**Vérifier:**
1. Vous êtes bien sur la page `/dashboard`
2. Le fichier `/components/dev/ColorTokensTestButton.tsx` existe
3. L'import dans `/pages/DashboardPageUpgraded.tsx` est présent

**Solution rapide:** Utiliser la MÉTHODE 2 (modifier App.tsx)

---

### La page affiche des erreurs

**Vérifier:**
1. `/styles/globals-v2.css` est importé dans votre HTML/App
2. L'import est **APRÈS** `/styles/globals.css`
3. Les deux fichiers CSS existent

**Exemple d'imports corrects:**
```tsx
// main.tsx ou index.html
import './styles/globals.css';   // ← PREMIER
import './styles/globals-v2.css'; // ← SECOND (additionnel)
```

---

### Les couleurs ne s'affichent pas

**DevTools Check:**
1. F12 → Onglet "Elements"
2. Sélectionner un élément avec `background: var(--primary-50)`
3. Onglet "Computed" → Chercher `background-color`
4. Doit afficher `rgb(232, 244, 247)` ou `#E8F4F7`

**Si "undefined" ou vide:**
- Les legacy aliases ne sont pas chargés
- Vérifier que `/styles/globals-v2.css` est bien importé

---

## 🎯 Résultat Attendu

### Page Complète avec :
1. **3 sections** (Legacy, Semantic, États UI)
2. **Couleurs vibrantes** et bien différenciées
3. **Résumé vert** avec checkmarks
4. **Aucun warning** dans la console
5. **Texte lisible** partout

### Si Tout Fonctionne :
✅ Legacy aliases OK  
✅ Nouveaux tokens OK  
✅ Zéro breaking change confirmé  
✅ **Production ready !**

---

## 📖 Documentation Complète

**Guides détaillés :**
- `/docs/COLOR-TOKENS-V2-READY.md` - Checklist validation complète
- `/docs/COLOR-TOKENS-START-HERE-FINAL.md` - Quick start
- `/docs/COLOR-SEMANTIC-MAPPING-FINAL.md` - Détail couleurs

**Fichiers Clés :**
- `/styles/globals-v2.css` - Tokens V2 avec legacy aliases
- `/pages/ColorTokensTestPage.tsx` - Page de test
- `/components/test/ColorTokensValidation.tsx` - Composant validation

---

**Bon test ! 🚀**

_Accès Page Test | Color Tokens V2 | 22/02/2026_
