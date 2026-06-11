# 📁 Archive - Fichiers HTML

**Date d'archivage** : 2025-01-12  
**Raison** : Versions HTML obsolètes remplacées par pages React (.tsx)

## Fichiers archivés

Les fichiers HTML suivants ont été développés avant la migration vers React/TypeScript.  
Ils sont conservés pour référence historique mais ne sont plus utilisés dans l'application.

### Liste des fichiers archivés :
- `coaching.html` - Version HTML de la page coaching
- `dashboard.html` - Version HTML du dashboard
- `entreprise.html` - Version HTML de la page entreprise
- `journal.html` - Version HTML de la page journal
- `journal-detail.html` - Version HTML du détail d'entrée journal
- `journal-nouvelle-entree.html` - Version HTML de création d'entrée journal
- `login.html` - Version HTML de la page login
- `profil.html` - Version HTML de la page profil
- `parametres.html` - Version HTML de la page paramètres
- `sidebar.html` - Version HTML de la sidebar
- `sidebar-optimized.html` - Version HTML optimisée de la sidebar
- `sidebar-perfect.html` - Version HTML perfectionnée de la sidebar

## Versions actuelles (React/TSX)

Les équivalents React/TypeScript se trouvent dans `/pages` :
- `CoachingPageUpgraded.tsx`
- `DashboardPageUpgraded.tsx`
- `EntreprisePageComplete.tsx`
- `JournalPageUpgraded.tsx`, `JournalDetailPage.tsx`, `JournalNewEntryPage.tsx`
- `LoginPage.tsx`
- `ProfilePage.tsx`
- `AccountPage.tsx`
- Sidebar : `/components/ui/optimized-sidebar.tsx`

## Note pour l'intégration PHP/Cursor

Ces fichiers HTML peuvent servir de référence pour la structure de base,  
mais le design system actuel est défini dans `/styles/globals.css` et les composants React.
