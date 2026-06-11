# HomePageV2 - Documentation d'Intégration

## 📋 Vue d'ensemble

HomePageV2 est une variante de la page d'accueil créée pour tester un nouveau positionnement UX/UI et messaging. Elle est accessible via le menu de navigation avec un badge "TEST" pour la distinguer de la version originale.

## 🎯 Objectifs de la V2

1. **Élargir le positionnement** : passer de "formateurs" à "équipes L&D"
2. **Prioriser la conversion business** : CTA audit en priorité
3. **Améliorer l'accessibilité** : liens sémantiques, navigation clavier
4. **Clarifier le parcours** : Learn → Do → Match

## 🔗 Accès à la Page

### Via le Menu de Navigation

La page HomePageV2 est accessible via une nouvelle entrée dans le header :

- **Desktop** : Menu "HOME V2" avec badge "TEST" (jaune)
- **Mobile** : Même entrée dans le menu burger
- **URL Route** : `home-v2`

### Navigation Programmatique

```typescript
onNavigate('home-v2')
```

## 📂 Fichiers Modifiés

### 1. `/pages/HomePageV2.tsx` ✨ NOUVEAU
Variante complète de la HomePage avec :
- Nouveau H1 : "L'IA ne remplacera pas les équipes L&D..."
- CTA business prioritaire : "Réserver un audit (30 min)"
- Bloc "Ce que vous obtenez" avec 3 résultats concrets
- Section ADN avec 3 bullets structurés
- Support `prefers-reduced-motion` pour les animations
- Accessibilité améliorée (liens sémantiques, focus states)

### 2. `/components/Header.tsx` 🔧 MODIFIÉ
Ajout de l'entrée de navigation :
```typescript
{ id: 'home-v2', label: 'HOME V2', badge: 'TEST' }
```

Avec badge stylisé (jaune accent) pour Desktop et Mobile.

### 3. `/App.tsx` 🔧 MODIFIÉ
Ajout du routing :
```typescript
case 'home-v2':
  return <HomePageV2 onNavigate={setCurrentPage} />;
```

## 🎨 Différences Clés V1 vs V2

| Aspect | HomePage (V1) | HomePageV2 |
|--------|---------------|------------|
| **Public cible** | "Formateurs" | "Équipes L&D" |
| **H1** | "L'IA ne remplacera pas les formateurs..." | "L'IA ne remplacera pas les équipes L&D..." |
| **Sous-titre** | Description générale | "Learn → Do → Match" explicite |
| **CTA principal** | "Je veux me former" (bleu) | "Réserver un audit (30 min)" (orange) |
| **CTA secondaire** | "Je représente une entreprise" | "Voir les offres" |
| **CTA formation** | Principal | Tertiaire (lien texte) |
| **Timeline cards** | ❌ | ✅ "Pour devenir autonome", "2–4 semaines", "3–6 mois" |
| **Bloc résultats** | ❌ | ✅ "Diagnostic", "Assets", "Roadmap" |
| **Section ADN** | Texte libre | 3 bullets structurés (Méthode, Tech, Mesure) |
| **Blog cards** | div onClick | Liens sémantiques `<a>` |
| **Accessibilité** | Standard | Focus states, aria-label, keyboard nav |
| **Animation logos** | Toujours active | Respect prefers-reduced-motion |
| **Lead magnet** | "90 min gratuit" | "30 min" (plus scalable) |

## 🧪 Tests à Réaliser

### Tests Fonctionnels
- [ ] Navigation via menu desktop → home-v2
- [ ] Navigation via menu mobile → home-v2
- [ ] Clic logo → retour home (V1)
- [ ] Tous les CTA internes fonctionnent
- [ ] Scroll smooth vers #solutions
- [ ] Navigation clavier (Tab, Enter)

### Tests Accessibilité
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Liens sémantiques (`<a>`) au lieu de div onClick
- [ ] aria-label sur les cards
- [ ] Support prefers-reduced-motion (désactive animation logos)

### Tests UX/Conversion
- [ ] CTA "Réserver un audit" bien visible et prioritaire
- [ ] Messaging "Learn → Do → Match" clair
- [ ] Timeline des offres compréhensible
- [ ] Bloc "Ce que vous obtenez" convaincant

### Tests Responsive
- [ ] Mobile : hero, CTA stacked
- [ ] Tablet : layout grid 2 colonnes
- [ ] Desktop : layout complet 3 colonnes

## 📊 Métriques à Tracker

### Engagement
- Taux de clic sur "Réserver un audit" vs "Je veux me former"
- Scroll depth (bloc "Ce que vous obtenez")
- Temps passé sur la page

### Conversion
- Taux de conversion audit V2 vs V1
- Taux de rebond
- Navigation vers pages solutions (Académie, Agence, Conseil)

## 🚀 Prochaines Étapes

### Phase 1 : Test Interne
1. ✅ Intégration dans le menu
2. ⏳ Tests fonctionnels complets
3. ⏳ Validation accessibilité
4. ⏳ Review UX/UI

### Phase 2 : Test A/B
1. Définir métriques de succès
2. Configurer split test (50/50)
3. Collecter données (2-4 semaines)
4. Analyser résultats

### Phase 3 : Décision
- **Si V2 meilleure** : remplacer V1, supprimer badge TEST
- **Si V1 meilleure** : garder V1, archiver V2
- **Si équivalent** : affiner V2 et re-tester

## 🎯 Critères de Succès V2

La V2 sera considérée comme un succès si :

1. **Conversion audit** : +15% vs V1
2. **Taux de rebond** : -10% vs V1
3. **Scroll depth** : 60%+ atteignent bloc "Ce que vous obtenez"
4. **Accessibilité** : 100% score Lighthouse
5. **Mobile UX** : Temps de chargement <2s

## 🔧 Maintenance

### Retirer le Badge "TEST"

Si V2 devient la version définitive :

```typescript
// /components/Header.tsx
{ id: 'home-v2', label: 'ACCUEIL' } // Retirer badge
```

### Renommer en HomePage

Si V2 remplace V1 :

1. Renommer `HomePage.tsx` → `HomePageV1_Archive.tsx`
2. Renommer `HomePageV2.tsx` → `HomePage.tsx`
3. Mettre à jour imports dans `App.tsx`
4. Retirer entrée menu "HOME V2"

## 📝 Notes Techniques

### Compatibilité
- React 18+
- Tailwind CSS v4
- TypeScript 5+

### Performance
- Utilise `useEffect` pour prefers-reduced-motion
- Images lazy-load via ImageWithFallback
- Animations CSS optimisées

### SEO
- Title optimisé : "Intégrer l'IA en formation : Académie, Studio & Conseil"
- Description enrichie avec keywords Learn → Do → Match
- Structured data Organization Schema

---

**Date de création** : 2026-04-10  
**Auteur** : Design System Engineer TLS  
**Version** : 1.0
