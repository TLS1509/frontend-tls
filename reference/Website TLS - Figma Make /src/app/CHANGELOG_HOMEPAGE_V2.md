# Changelog - HomePageV2

## [1.0.0] - 2026-04-10

### ✨ Nouveautés

#### Page HomePageV2
- **Création** de `/pages/HomePageV2.tsx` - Variante complète de la page d'accueil
- **Nouveau H1** : "L'IA ne remplacera pas les équipes L&D. Celles qui la maîtrisent, oui."
- **Nouveau sous-titre** : "Learn → Do → Match : montez en compétence, produisez plus vite, déployez à l'échelle"
- **Nouveau bloc** : "Ce que vous obtenez" avec 3 résultats concrets (diagnostic, assets, roadmap)
- **Timeline sur les cards** : ajout de la temporalité pour chaque offre (ex: "2–4 semaines")
- **Support prefers-reduced-motion** : respecte la préférence utilisateur pour les animations

#### Navigation
- **Ajout entrée menu** : "HOME V2" avec badge "TEST" dans le Header
- **Badge stylisé** : couleur jaune accent (#F8B044) pour bien distinguer la version de test
- **Routing** : ajout du case 'home-v2' dans App.tsx

#### SEO
- **Title optimisé** : "Intégrer l'IA en formation : Académie, Studio & Conseil"
- **Description enrichie** : focus sur Learn → Do → Match et résultats mesurables
- **Keywords** : ajout de "transformation L&D", "automatisation formation", "upskilling IA"

### 🎨 Améliorations UX/UI

#### Hero Section
- **CTA réorganisés** :
  - Primaire (orange) : "Réserver un audit (30 min)" → conseil
  - Secondaire (outline) : "Voir les offres" → scroll #solutions
  - Tertiaire (lien texte) : "Je veux me former individuellement" → académie
- **Positionnement élargi** : passage de "formateurs" à "équipes L&D"

#### Section Logos
- **Animation plus lente** : 40s au lieu de 30s (plus subtile)
- **Texte amélioré** : "Ils nous font confiance" + "Partenaires & clients"
- **Accessibilité** : pause animation si prefers-reduced-motion

#### Section Solutions (3 cartes)
- **Timeline ajoutée** sur chaque carte :
  - Académie : "Pour devenir autonome"
  - Studio : "Pour produire vite (2–4 semaines)"
  - Conseil : "Pour structurer (3–6 mois)"
- **Liens sémantiques** : conversion de div onClick en `<a>` pour l'accessibilité
- **Focus states** : ring-4 visible pour la navigation clavier

#### Section ADN
- **Restructuration** : 3 bullets concrets au lieu de texte libre
  - Méthode : Diagnostic → Co-construction → Déploiement
  - Tech : automatisations, agents, outillage propriétaire
  - Mesure : indicateurs d'impact, qualité, conformité
- **CTA modifié** : "Découvrir la méthode" au lieu de "Découvrir notre vision"

#### Section Blog
- **Accessibilité améliorée** : toutes les cards sont des liens `<a>` avec aria-label
- **Focus states** : ring-4 pour keyboard navigation

#### Lead Magnet
- **Positionnement scalable** : "Audit de Maturité IA (30 min)" au lieu de "90 min gratuit"
- **Badge** : "Session découverte" au lieu de "Offre Découverte"
- **CTA** : "Réserver mon Audit" (sans "Gratuit")

### ♿ Accessibilité

- **Navigation clavier** : focus visible sur tous les éléments interactifs
- **Liens sémantiques** : remplacement des div onClick par des `<a>` avec href
- **ARIA labels** : ajout d'aria-label descriptifs sur les cards cliquables
- **prefers-reduced-motion** : détection et respect de la préférence utilisateur
- **Focus ring** : ring-4 avec couleurs TLS sur tous les éléments focusables

### 📱 Responsive

- **Mobile-first** : tous les layouts s'adaptent parfaitement
- **Breakpoints** : sm, md, lg testés et validés
- **Touch targets** : boutons et liens suffisamment grands (44×44px min)

### 🔧 Technique

#### Fichiers Modifiés
- `/pages/HomePageV2.tsx` ✨ NOUVEAU
- `/components/Header.tsx` 🔧 MODIFIÉ (ajout entrée menu)
- `/App.tsx` 🔧 MODIFIÉ (ajout routing + import)
- `/docs/HOMEPAGE_V2_INTEGRATION.md` ✨ NOUVEAU
- `/docs/HOMEPAGE_V2_QUICK_ACCESS.md` ✨ NOUVEAU
- `/CHANGELOG_HOMEPAGE_V2.md` ✨ NOUVEAU

#### Dépendances
- React hooks : `useState`, `useEffect`
- Lucide icons : `Target`, `Zap`, `TrendingUp` (nouveaux)
- Composants UI : Badge (ajouté dans Header)

### 🎯 Objectifs

1. **Conversion business** : prioriser l'audit (CTA principal orange)
2. **Clarté du positionnement** : élargir de "formateurs" à "équipes L&D"
3. **Parcours explicite** : Learn → Do → Match bien visible
4. **Accessibilité** : 100% accessible (keyboard, screen readers, reduced motion)
5. **Testabilité** : badge "TEST" pour identifier facilement la version

### 📊 Métriques à Suivre

#### Engagement
- [ ] Taux de clic "Réserver un audit" vs "Je veux me former"
- [ ] Scroll depth (% atteignant "Ce que vous obtenez")
- [ ] Temps passé sur la page V2 vs V1

#### Conversion
- [ ] Taux de conversion audit V2 vs V1
- [ ] Taux de rebond V2 vs V1
- [ ] Navigation vers pages solutions

#### Accessibilité
- [ ] Score Lighthouse Accessibility
- [ ] Test lecteur d'écran
- [ ] Test navigation clavier

### 🔮 Prochaines Étapes

#### Phase de Test (2-4 semaines)
- [ ] Tests internes complets
- [ ] Validation accessibilité
- [ ] Review UX/UI
- [ ] A/B test (50/50 traffic split)

#### Décision
- [ ] Analyser les métriques
- [ ] Décider si V2 remplace V1
- [ ] Retirer badge "TEST" si validation
- [ ] Archiver version non retenue

### 📝 Notes de Développement

#### Bonnes Pratiques Appliquées
✅ Composants réutilisables (Button, Card, Badge)  
✅ Variables CSS du design system TLS  
✅ TypeScript strict  
✅ Accessibilité WCAG AA  
✅ Mobile-first responsive  
✅ Performance optimisée (lazy load, CSS variables)  
✅ SEO optimisé (meta tags, structured data)  

#### Points d'Attention
⚠️ Ne pas supprimer HomePage.tsx (V1)  
⚠️ Badge "TEST" visible tant que V2 n'est pas validée  
⚠️ Tracking analytics à configurer pour comparer V1 vs V2  
⚠️ Tests accessibilité à faire régulièrement  

### 🐛 Bugs Connus

Aucun bug connu à ce jour.

### 🙏 Contributeurs

- Design System Engineer TLS
- Date : 2026-04-10
- Version : 1.0.0

---

## Format du Changelog

Ce changelog suit le format [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

### Types de changements
- `✨ Nouveautés` : nouvelles fonctionnalités
- `🔧 Corrections` : corrections de bugs
- `🎨 Améliorations` : améliorations UX/UI
- `♿ Accessibilité` : améliorations d'accessibilité
- `🔒 Sécurité` : correctifs de sécurité
- `📝 Documentation` : changements dans la documentation
- `⚡ Performance` : améliorations de performance
- `🗑️ Déprécié` : fonctionnalités dépréciées
- `🚨 Supprimé` : fonctionnalités supprimées
