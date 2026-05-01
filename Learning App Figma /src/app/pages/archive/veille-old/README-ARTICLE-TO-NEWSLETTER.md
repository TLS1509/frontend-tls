# Migration: ArticlePage → NewsletterPage (Actus de la semaine)

## Date: 22 février 2026

## Changement
Les articles individuels ont été remplacés par une page d'actualités hebdomadaires au format newsletter.

## Raison
Au lieu d'afficher un article individuel, l'utilisateur voit maintenant toutes les actualités de la semaine présentées dans un format moderne type newsletter.

## Implémentation

### Avant
- Clic sur un article dans VeillePage → ArticlePage (article individuel)
- Navigation: VeillePage → ArticlePage → Retour

### Après
- Clic sur un article dans VeillePage → NewsletterPage (actus de la semaine)
- Navigation: VeillePage → NewsletterPage (actus hebdo) → Retour
- Bouton dans l'en-tête de VeillePage: "Actus de la semaine"

## Fichiers modifiés

1. **VeillePage.tsx**
   - Suppression de l'import ArticlePage
   - handleItemClick: articles redirigent vers 'newsletter'
   - Suppression du state selectedArticleId
   - Bouton "Newsletter hebdo" → "Actus de la semaine"

2. **NewsletterPage.tsx**
   - Titre: "Newsletter Hebdomadaire" → "Actus de la semaine"
   - Édition: "Édition #08" → "Semaine #08"
   - Footer adapté pour les actualités hebdomadaires

3. **App.tsx**
   - Suppression de l'import ArticlePage
   - Suppression du state selectedArticleId
   - Suppression du rendu conditionnel pour 'article'

4. **ArticlePage.tsx**
   - Archivé dans /pages/archive/veille-old/
   - Remplacé par NewsletterPage

## Design System
- ✅ Utilise exclusivement les variables CSS de /styles/globals.css
- ✅ Typographie: League Spartan (headings) + Nunito (body)
- ✅ Glassmorphism et gradients TLS maintenus
- ✅ Desktop-first, responsive

## Navigation
```
VeillePage (Liste des contenus)
  ├─ Clic sur article → NewsletterPage (Actus hebdo)
  ├─ Clic sur vidéo → VideoTutorialPage / VideoReelsPage
  ├─ Clic sur dossier → DossierPage
  └─ Clic sur magazine → MagazinePage
```

## Notes
- Les articles individuels ne sont plus affichés séparément
- Tous les articles font partie de la page "Actus de la semaine"
- Format moderne type newsletter avec vidéo à la une + articles
- Export HTML disponible pour envoi email
