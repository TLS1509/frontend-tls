# ⚡ QUICK START - Blog TLS (1 minute)

## 🎯 OBJECTIF
Ouvrir `blog.html` sur votre Mac et voir votre blog en action.

---

## ⏱️ MÉTHODE EXPRESS (30 secondes)

### 1. Localisez le fichier
```
📁 Votre projet
  └── 📁 standalone
      └── 📄 blog.html  ← ICI
```

### 2. Double-cliquez dessus
✅ **TERMINÉ !** Votre navigateur ouvre la page automatiquement.

---

## 🔥 MÉTHODE ALTERNATIVE (1 minute)

### Terminal

```bash
# 1. Ouvrir Terminal (Cmd + Espace → "Terminal")

# 2. Copier-coller cette commande (adapter le chemin) :
cd ~/Chemin/Vers/Votre/Projet/standalone

# 3. Lancer un serveur local :
python3 -m http.server 8000

# 4. Ouvrir votre navigateur sur :
# http://localhost:8000/blog.html
```

✅ **TERMINÉ !** Votre blog s'affiche en local.

---

## 🌐 MÉTHODE PARTAGE (2 minutes)

### Déployer en ligne GRATUITEMENT

1. Aller sur **https://app.netlify.com/drop**
2. **Glisser-déposer** le fichier `blog.html`
3. Votre site est en ligne ! URL automatique fournie.

✅ **TERMINÉ !** Vous avez une URL publique à partager.

---

## 📝 CE QUE CONTIENT blog.html

- ✅ **Page complète** avec Header, Hero, Articles, Newsletter, Footer
- ✅ **Responsive** : fonctionne sur mobile, tablette, desktop
- ✅ **Design TLS** : Glassmorphism, couleurs de marque
- ✅ **Interactif** : Recherche, filtres par catégorie, animations
- ✅ **Autonome** : CSS + JS intégrés, pas de dépendances externes
- ✅ **6 articles** de démonstration avec images

---

## 🎨 PERSONNALISATION EXPRESS

### Changer une couleur

1. Ouvrir `blog.html` dans un éditeur de texte
2. Chercher `:root {` (ligne ~46)
3. Modifier les variables :

```css
--primary-500: #55A1B4;  /* Bleu principal */
--secondary-500: #ED843A; /* Orange */
--accent-400: #F8B044;    /* Jaune */
```

### Ajouter votre logo

Chercher ligne ~188 :
```html
<a href="#" class="logo">THE LEARNING SOCIETY</a>
```

Remplacer par :
```html
<a href="#" class="logo">
    <img src="votre-logo.png" alt="Logo" height="40">
</a>
```

### Modifier un article

Chercher `<!-- Article 1 -->` (ligne ~435) et modifier :

```html
<h3 class="article-title">Votre titre ici</h3>
<p class="article-excerpt">Votre description ici</p>
```

---

## 🔧 PROBLÈMES COURANTS

| Problème | Solution |
|----------|----------|
| Le fichier ne s'ouvre pas | Clic droit → Ouvrir avec → Safari/Chrome |
| Les images ne s'affichent pas | Vérifier la connexion internet |
| Le design est cassé | Actualiser avec Cmd + Shift + R |

---

## 📱 TESTER SUR MOBILE

### Option 1 : Avec serveur local

```bash
# 1. Trouver votre IP locale
ifconfig | grep "inet " | grep -v 127.0.0.1
# Exemple : 192.168.1.42

# 2. Lancer le serveur
python3 -m http.server 8000

# 3. Sur votre iPhone/iPad :
# Ouvrir Safari → http://192.168.1.42:8000/blog.html
```

### Option 2 : Avec Netlify

1. Déployer sur Netlify (voir ci-dessus)
2. Scanner le QR code généré avec votre téléphone

---

## ✅ CHECKLIST DE VÉRIFICATION

- [ ] Le fichier s'ouvre dans le navigateur
- [ ] Le header avec logo est visible
- [ ] Les 6 articles s'affichent
- [ ] Les images sont chargées
- [ ] Le formulaire newsletter fonctionne
- [ ] La recherche filtre les articles
- [ ] Les catégories filtrent correctement
- [ ] Le design est responsive (tester en réduisant la fenêtre)

---

## 🚀 NEXT STEPS

1. **Personnaliser** : Modifier les textes, couleurs, images
2. **Ajouter du contenu** : Créer vos propres articles
3. **Déployer** : Mettre en ligne avec Netlify/Vercel
4. **Intégrer** : Ajouter à votre site WordPress, Wix, etc.

---

## 📚 DOCUMENTATION COMPLÈTE

Pour plus de détails, voir :
- `README_IMPORT_MAC.md` : Guide complet d'import sur Mac
- `blog.html` : Code source commenté

---

## 💡 COMMANDES UTILES

```bash
# Ouvrir le fichier directement
open /chemin/vers/blog.html

# Ouvrir le dossier dans Finder
open /chemin/vers/standalone

# Éditer avec VS Code
code /chemin/vers/blog.html

# Copier sur le Bureau
cp blog.html ~/Desktop/
```

---

## 🎉 FÉLICITATIONS !

**Vous avez maintenant un blog TLS 100% fonctionnel !**

Si vous avez des questions, consultez `README_IMPORT_MAC.md` pour plus de détails.

---

**⚡ TL;DR : Double-cliquez sur `blog.html` → Profitez ! ✨**

---

**The Learning Society** © 2024 - Formation augmentée par l'IA
