# 📦 Fichiers HTML - The Learning Society

## 🎯 Contenu du Package

Ce dossier contient **6 fichiers HTML standalone** prêts à l'emploi pour le site The Learning Society :

### Pages Disponibles
1. ✅ **home.html** - Page d'accueil
2. ✅ **academie.html** - Pôle Académie (formation IA)
3. ✅ **agence.html** - Pôle Agence (production pédagogique)
4. ✅ **conseil.html** - Pôle Conseil (stratégie IA)
5. ✅ **tech.html** - Pôle Tech (solutions techniques)
6. ✅ **mag.html** - Magazine (veille & articles)

---

## 🚀 Utilisation Immédiate

### Méthode 1 : Ouvrir directement
```bash
# Double-cliquez sur n'importe quel fichier .html
# ou
open agence.html  # macOS
start agence.html # Windows
xdg-open agence.html # Linux
```

### Méthode 2 : Serveur local
```bash
# Python 3
python3 -m http.server 8000

# Node.js (avec http-server)
npx http-server

# Puis ouvrir : http://localhost:8000/agence.html
```

---

## 📋 Structure des Fichiers

Chaque fichier HTML contient :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- Meta tags SEO -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title - The Learning Society</title>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500;600;700;800;900&family=Nunito:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  
  <!-- Styles CSS complets -->
  <style>
    /* Design System TLS */
    /* Tous les styles sont inclus */
  </style>
</head>
<body>
  <!-- Contenu de la page -->
  
  <!-- Init Lucide Icons -->
  <script>
    lucide.createIcons();
  </script>
</body>
</html>
```

---

## 🎨 Design System Intégré

### Couleurs Principales
- **Bleu Primary** : `#55A1B4` (Académie/Formation)
- **Orange Secondary** : `#ED843A` (Agence/Conception)
- **Jaune Accent** : `#F8B044` (Conseil/Stratégie)
- **Neutral Dark** : `#252B37` (Texte principal)

### Polices
- **League Spartan** : Titres et display
- **Nunito** : Corps de texte

### Responsive Breakpoints
- Mobile : `< 768px`
- Tablet : `768px - 1023px`
- Desktop : `≥ 1024px`

---

## 🔧 Personnalisation

### Modifier les Couleurs
Recherchez et remplacez dans le fichier HTML :
```css
/* Dans la section <style> */
--primary-500: #55A1B4;     /* Votre couleur principale */
--secondary-500: #ED843A;   /* Votre couleur secondaire */
--accent-400: #F8B044;      /* Votre couleur d'accent */
```

### Modifier les Textes
Les textes sont en HTML pur, faciles à modifier :
```html
<h1>Votre nouveau titre</h1>
<p>Votre nouveau paragraphe</p>
```

### Ajouter des Icônes
Utilisez Lucide Icons :
```html
<!-- Liste complète : https://lucide.dev/icons -->
<i data-lucide="icon-name"></i>

<!-- Exemples -->
<i data-lucide="check-circle"></i>
<i data-lucide="arrow-right"></i>
<i data-lucide="sparkles"></i>
```

---

## 📱 Compatibilité

### Navigateurs Supportés
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### Appareils Testés
- ✅ iPhone (Safari)
- ✅ iPad (Safari)
- ✅ Android (Chrome)
- ✅ Desktop (tous navigateurs modernes)

---

## 🎯 Pour Figma

Le fichier **`figma-design-tokens.json`** contient tous les tokens de design :

### Import dans Figma
1. Installez le plugin **"Tokens Studio for Figma"**
2. Ouvrez votre fichier Figma
3. Lancez le plugin
4. Cliquez sur "Load from file"
5. Sélectionnez `figma-design-tokens.json`
6. Tous les tokens sont synchronisés !

### Tokens Inclus
- 🎨 Couleurs (primary, secondary, accent, neutral - échelle complète)
- 📝 Typographie (tailles, poids, line-heights)
- 📏 Espacements (scale 4pt)
- 🔲 Border Radius
- 🌑 Shadows

---

## 🔄 Conversion React → HTML

Si vous souhaitez reconvertir en React :

```jsx
// HTML
<div class="card">
  <p style="color: var(--primary-500);">Text</p>
</div>

// React
<div className="card">
  <p style={{ color: 'var(--primary-500)' }}>Text</p>
</div>
```

---

## 📞 Support

### Questions ?
- 📧 Email : contact@thelearningsociety.fr
- 🌐 Site : https://thelearningsociety.fr

### Bugs ou Suggestions
Signalez tout problème ou suggestion d'amélioration !

---

## 📄 Licence

© 2024 The Learning Society. Tous droits réservés.

Ces fichiers sont fournis pour usage personnel et professionnel.
Modification et personnalisation autorisées.

---

**Version** : 1.0.0  
**Dernière mise à jour** : Décembre 2024
