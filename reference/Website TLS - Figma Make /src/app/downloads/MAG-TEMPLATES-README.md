# 📚 Templates "Le Mag'" - The Learning Society

## 📦 Vue d'Ensemble

Ce package contient **7 templates HTML standalone** pour créer différents types de contenus pour votre blog/magazine "Le Mag'".

Tous les templates :
- ✅ Utilisent le **design system TLS** (couleurs, typographie, espacements)
- ✅ Sont **100% responsives** (mobile-first)
- ✅ Contiennent **CSS et JavaScript intégrés** (standalone, pas de dépendances externes)
- ✅ Utilisent **League Spartan** (titres) + **Nunito** (texte body)
- ✅ Sont **prêts à l'emploi** (dupliquez et personnalisez)

---

## 📑 Liste des Templates

### 1. **`mag-article-template.html`** - Article Standard (Version 1)
**Utilisation :** Articles longs, tutoriels, analyses approfondies

**Sections :**
- Header avec breadcrumb
- Hero avec meta (auteur, date, lecture)
- Image featured
- Contenu rich text (h2, h3, p, ul, blockquote, images)
- Key Takeaways Box (points clés)
- Social Share
- Related Articles
- Newsletter CTA

**Idéal pour :**
- Articles de fond (> 1000 mots)
- Tutoriels détaillés
- Analyses et réflexions

---

### 2. **`mag-article-v2-template.html`** - Article avec Sidebar (Version 2)
**Utilisation :** Articles avec table des matières et navigation

**Sections :**
- Header sticky
- Sidebar avec sommaire cliquable + social share
- Contenu principal (layout 2 colonnes)
- Callout boxes
- Related Articles

**Idéal pour :**
- Guides longs avec plusieurs sections
- Articles techniques
- Content avec navigation rapide nécessaire

---

### 3. **`mag-video-template.html`** - Article Vidéo
**Utilisation :** Tutoriels vidéo, webinaires, démonstrations

**Sections :**
- Hero avec meta vidéo
- Video player intégrable (YouTube, Vimeo)
- Chapitres/timestamps cliquables
- Sidebar avec ressources téléchargeables
- Author card
- Statistiques (vues, likes, etc.)
- Related Videos

**Idéal pour :**
- Tutoriels vidéo
- Replays de webinaires
- Démonstrations de produits/outils

---

### 4. **`mag-pdf-template.html`** - Rapport/Étude de Cas PDF
**Utilisation :** Livres blancs, rapports, études, policy papers

**Sections :**
- Hero avec badges
- PDF thumbnail avec aperçu
- Stats grid (organisations, pages, téléchargements)
- Table des matières dans sidebar
- Résumé exécutif
- Key Findings
- Bouton de téléchargement CTA
- Related Resources

**Idéal pour :**
- Livres blancs
- Études de cas
- Rapports de recherche
- Policy papers
- Guides PDF téléchargeables

---

### 5. **`mag-newsletter-template.html`** - Newsletter Archive
**Utilisation :** Archiver vos newsletters envoyées par email

**Sections :**
- Hero avec badge édition + meta
- Intro éditoriale
- Highlight box (chiffre/stat de la semaine)
- Sections thématiques (tendances, ressources, etc.)
- Resources list avec icônes
- CTA d'abonnement
- Archive des éditions précédentes

**Idéal pour :**
- Newsletters hebdomadaires/mensuelles
- Veilles thématiques
- Compilations de ressources
- Éditions spéciales

---

### 6. **`mag-interview-template.html`** - Interview Expert
**Utilisation :** Interviews Q&A avec experts, leaders, praticiens

**Sections :**
- Hero avec titre accrocheur
- Guest card (photo, bio, social links)
- Intro de l'éditeur
- Format Q&A avec design différencié (Q et A)
- Highlight quotes
- CTA vers formations/ressources

**Idéal pour :**
- Interviews d'experts
- Q&A avec clients/partenaires
- Témoignages détaillés
- Sessions "Ask Me Anything"

---

### 7. **`mag-checklist-template.html`** - Checklist/Guide Pratique
**Utilisation :** Checklists actionnables, guides étape par étape

**Sections :**
- Hero avec stats (nombre d'étapes, durée)
- Barre de progression interactive
- Phases numérotées
- Checklist items cliquables (cochables)
- Tip boxes
- Download CTA (version PDF)

**Idéal pour :**
- Checklists pratiques
- Guides étape par étape
- Méthodologies
- Tutoriels structurés
- Frameworks

---

## 🎨 Design System

Tous les templates utilisent les **variables CSS du design system TLS** :

### Couleurs
```css
--primary-500: #55A1B4;    /* Bleu principal */
--secondary-500: #ED843A;   /* Orange */
--accent-400: #F8B044;      /* Jaune */
--neutral-900: #252B37;     /* Texte primary */
--neutral-600: #6B7D82;     /* Texte secondary */
```

### Typographie
```css
--font-display: "League Spartan"  /* Titres */
--font-body: "Nunito"             /* Texte */
```

### Espacements
```css
--space-4: 1rem
--space-6: 1.5rem
--space-8: 2rem
--space-12: 3rem
--space-16: 4rem
```

---

## 🔧 Comment Utiliser

### Méthode 1 : Dupliquer et Personnaliser
```bash
1. Copiez le template souhaité
2. Renommez-le (ex: chatgpt-tutorial.html)
3. Ouvrez dans votre éditeur
4. Modifiez le contenu HTML
5. Testez en local (double-clic ou serveur local)
6. Déployez sur votre site
```

### Méthode 2 : Serveur Local
```bash
cd downloads
python3 -m http.server 8000
# Ouvrez : http://localhost:8000/mag-article-template.html
```

---

## 📝 Guide de Personnalisation

### Modifier le Titre et Meta
```html
<!-- Ligne 5-6 -->
<title>Votre Titre - The Learning Society Magazine</title>
<meta name="description" content="Votre description">
```

### Changer les Badges
```html
<!-- Cherchez class="badge" -->
<span class="badge badge-primary">VOTRE CATÉGORIE</span>
```

### Remplacer les Images
```html
<!-- Cherchez les <img src= -->
<img src="VOTRE_URL_IMAGE" alt="Description">
```

### Ajuster les Couleurs par Pôle
- **Académie/Formation** : Bleu (`--primary-500`)
- **Agence/Production** : Orange (`--secondary-500`)
- **Conseil** : Jaune (`--accent-400`)
- **Tech** : Bleu clair

---

## 🚀 Exemples de Pages Créées

Nous avons créé des exemples concrets :

1. **`home.html`** - Homepage complète
2. **`agence-demo.html`** - Page démo pôle Agence
3. **Templates prêts à l'emploi** dans `/downloads/`

---

## 💡 Bonnes Pratiques

### Images
- Utilisez des images **optimisées** (WebP recommandé)
- Aspect ratio recommandé : **16:9** pour featured images
- Taille max : **1200px de large**

### Contenu
- Titres **concis et accrocheurs** (< 60 caractères)
- Paragraphes **courts** (3-4 lignes max)
- Listes à puces pour la **lisibilité**

### SEO
- **Title tag** unique (< 60 caractères)
- **Meta description** accrocheuse (< 160 caractères)
- **Alt text** descriptifs pour les images
- **Headings hierarchy** : H1 → H2 → H3

### Accessibilité
- Contraste texte/fond respecté
- Taille de police minimum : 16px
- Zones cliquables : minimum 44x44px
- Navigation au clavier supportée

---

## 🎯 Cas d'Usage par Template

| Template | Fréquence | Temps de création | Difficulté |
|----------|-----------|-------------------|------------|
| Article Standard | Hebdo | 30-60 min | ⭐⭐ |
| Article Sidebar | Mensuel | 45-90 min | ⭐⭐⭐ |
| Vidéo | Bi-mensuel | 60-120 min | ⭐⭐⭐ |
| PDF/Rapport | Trimestriel | 2-4h | ⭐⭐⭐⭐ |
| Newsletter | Hebdo | 30-45 min | ⭐⭐ |
| Interview | Mensuel | 60-90 min | ⭐⭐⭐ |
| Checklist | Mensuel | 45-90 min | ⭐⭐ |

---

## 🆘 Support et Questions

### Problèmes Courants

**Q: Les icônes Lucide ne s'affichent pas**
```html
<!-- Vérifiez que cette ligne est présente : -->
<script src="https://unpkg.com/lucide@latest"></script>
<!-- Et appelez lucide.createIcons() à la fin -->
```

**Q: Les polices ne chargent pas**
```html
<!-- Vérifiez le lien Google Fonts : -->
<link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500;600;700;800;900&family=Nunito:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

**Q: Le responsive ne fonctionne pas**
```html
<!-- Vérifiez le viewport meta : -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 📦 Fichiers Inclus

```
downloads/
├── home.html                      # Homepage complète
├── agence-demo.html              # Page démo Agence
├── mag-article-template.html     # Template article v1
├── mag-article-v2-template.html  # Template article v2 (sidebar)
├── mag-video-template.html       # Template vidéo
├── mag-pdf-template.html         # Template PDF/rapport
├── mag-newsletter-template.html  # Template newsletter
├── mag-interview-template.html   # Template interview
├── mag-checklist-template.html   # Template checklist
├── figma-design-tokens.json      # Tokens de design
└── MAG-TEMPLATES-README.md       # Ce fichier
```

---

## 🔄 Mises à Jour

**Version actuelle : 1.0.0** (Janvier 2025)

### Changelog
- **v1.0.0** - Création initiale des 7 templates
- Design system TLS intégré
- Responsive mobile-first
- Animations et interactions

---

## 📞 Contact

Pour toute question ou demande de personnalisation :
- **Email** : contact@thelearningsociety.fr
- **Site** : https://thelearningsociety.fr/

---

**Créé avec ❤️ par The Learning Society**
