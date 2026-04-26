/**
 * Pages Index
 *
 * Central hub for navigating to all pages in the application
 * Lists all available pages with descriptions and direct links
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages-index.css';

interface PageItem {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: 'core' | 'feature' | 'admin';
  design: 'dashboard' | 'list' | 'detail' | 'hub' | 'settings' | 'system';
  itemType: string;
  family:
    | 'core'
    | 'veille'
    | 'learning'
    | 'journal'
    | 'coaching-flow'
    | 'account-auth'
    | 'social'
    | 'system'
    | 'enterprise'
    | 'support';
}

const PAGES_LIST: PageItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Page d\'accueil avec vue d\'ensemble de la progression et parcours en cours',
    path: '/dashboard',
    icon: '📊',
    status: 'completed',
    category: 'core',
    design: 'dashboard',
    itemType: 'Overview',
    family: 'core',
  },
  {
    id: 'learning-paths',
    name: 'Learning Paths',
    description: 'Liste des parcours disponibles avec filtrage et statut',
    path: '/learning-paths',
    icon: '📚',
    status: 'completed',
    category: 'core',
    design: 'list',
    itemType: 'Collection',
    family: 'core',
  },
  {
    id: 'learning-path-detail',
    name: 'Learning Path Detail',
    description: 'Détail d\'un parcours avec étapes, leçons et ressources',
    path: '/learning-paths/1',
    icon: '🎯',
    status: 'completed',
    category: 'core',
    design: 'detail',
    itemType: 'Detail',
    family: 'core',
  },
  {
    id: 'coaching',
    name: 'Coaching',
    description: 'Sessions de coaching et accompagnement',
    path: '/coaching',
    icon: '🎓',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Flow',
    family: 'coaching-flow',
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    description: 'Projets collaboratifs et travail en équipe',
    path: '/collaboration',
    icon: '👥',
    status: 'completed',
    category: 'feature',
    design: 'hub',
    itemType: 'Workspace',
    family: 'social',
  },
  {
    id: 'veille',
    name: 'Veille',
    description: 'Hub éditorial multi-format (actus, tutoriels, dossiers, magazine)',
    path: '/veille',
    icon: '📰',
    status: 'completed',
    category: 'feature',
    design: 'hub',
    itemType: 'Editorial Hub',
    family: 'veille',
  },
  {
    id: 'profile',
    name: 'Profile',
    description: 'Profil utilisateur et informations de compte',
    path: '/profile',
    icon: '👤',
    status: 'completed',
    category: 'feature',
    design: 'dashboard',
    itemType: 'Profile',
    family: 'account-auth',
  },
  {
    id: 'settings',
    name: 'Settings',
    description: 'Préférences et paramètres utilisateur',
    path: '/settings',
    icon: '⚙️',
    status: 'completed',
    category: 'feature',
    design: 'settings',
    itemType: 'Preferences',
    family: 'account-auth',
  },
  {
    id: 'components',
    name: 'Components Showcase',
    description: 'Galerie des composants et design tokens',
    path: '/components',
    icon: '🎨',
    status: 'completed',
    category: 'admin',
    design: 'system',
    itemType: 'Documentation',
    family: 'system',
  },
  {
    id: 'pages-index',
    name: 'Pages Index',
    description: 'Index de navigation centralisée',
    path: '/pages-index',
    icon: '📖',
    status: 'completed',
    category: 'admin',
    design: 'system',
    itemType: 'Navigation',
    family: 'system',
  },
  {
    id: 'learning-space',
    name: 'Learning Space',
    description: 'Hub apprentissage multi-sections (parcours, ressources, actions)',
    path: '/learning-space',
    icon: '🧭',
    status: 'completed',
    category: 'feature',
    design: 'hub',
    itemType: 'Learning Hub',
    family: 'learning',
  },
  {
    id: 'veille-article',
    name: 'Veille Article',
    description: 'Detail article avec structure longue et metadata',
    path: '/veille/article/1',
    icon: '🗞️',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Veille Item',
    family: 'veille',
  },
  {
    id: 'veille-dossier',
    name: 'Veille Dossier',
    description: 'Page dossier thematique (sommaire, enjeux, ressources)',
    path: '/veille/dossier/1',
    icon: '📂',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Veille Item',
    family: 'veille',
  },
  {
    id: 'veille-video-tutorial',
    name: 'Veille Video Tutorial',
    description: 'Tutoriel video avec player, chapitres et notes',
    path: '/veille/video-tutorial/1',
    icon: '🎬',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Veille Item',
    family: 'veille',
  },
  {
    id: 'veille-video-reels',
    name: 'Veille Video Reels',
    description: 'Feed micro-learning de reels',
    path: '/veille/video-reels',
    icon: '🎞️',
    status: 'completed',
    category: 'feature',
    design: 'list',
    itemType: 'Veille Item',
    family: 'veille',
  },
  {
    id: 'veille-magazine',
    name: 'Veille Magazine',
    description: 'Collection des editions magazine',
    path: '/veille/magazine',
    icon: '📚',
    status: 'completed',
    category: 'feature',
    design: 'list',
    itemType: 'Veille Item',
    family: 'veille',
  },
  {
    id: 'veille-magazine-article',
    name: 'Veille Magazine Article',
    description: 'Article detail d une edition magazine',
    path: '/veille/magazine-article/1',
    icon: '📰',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Veille Item',
    family: 'veille',
  },
  {
    id: 'veille-weekly-newsletter',
    name: 'Veille Weekly Newsletter',
    description: 'Recap hebdomadaire editorial',
    path: '/veille/weekly-newsletter',
    icon: '📬',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Veille Item',
    family: 'veille',
  },
  {
    id: 'veille-weekly-news-detail',
    name: 'Veille Weekly News Detail',
    description: 'Detail d un item de la newsletter',
    path: '/veille/weekly-news/1',
    icon: '🧾',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Veille Item',
    family: 'veille',
  },
  {
    id: 'veille-newsletter',
    name: 'Veille Newsletter Preferences',
    description: 'Abonnement, preferences et archives newsletter',
    path: '/veille/newsletter',
    icon: '✉️',
    status: 'completed',
    category: 'feature',
    design: 'settings',
    itemType: 'Veille Item',
    family: 'veille',
  },
  {
    id: 'project',
    name: 'Project',
    description: 'Page dediee au projet final de parcours',
    path: '/project/1',
    icon: '🚀',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Project',
    family: 'learning',
  },
  {
    id: 'onboarding',
    name: 'Onboarding',
    description: 'Parcours de prise en main de la plateforme',
    path: '/onboarding',
    icon: '🧩',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Flow',
    family: 'coaching-flow',
  },
  {
    id: 'coaching-booking',
    name: 'Coaching Booking Flow',
    description: 'Etapes de reservation d une session coaching',
    path: '/coaching/booking',
    icon: '📅',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Flow',
    family: 'coaching-flow',
  },
  {
    id: 'coaching-pre-questionnaire',
    name: 'Pre Coaching Questionnaire',
    description: 'Questionnaire pre-session',
    path: '/coaching/pre-questionnaire',
    icon: '🧠',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Flow',
    family: 'coaching-flow',
  },
  {
    id: 'coaching-pre-questionnaire-response',
    name: 'Pre Questionnaire Response',
    description: 'Vue reponse du questionnaire pre-coaching',
    path: '/coaching/pre-questionnaire/response',
    icon: '✅',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Flow',
    family: 'coaching-flow',
  },
  {
    id: 'account',
    name: 'Account',
    description: 'Parametres compte detailles (securite, notifications, langue)',
    path: '/account',
    icon: '🔐',
    status: 'completed',
    category: 'feature',
    design: 'settings',
    itemType: 'Account',
    family: 'account-auth',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    description: 'Flux notifications avec filtres et actions',
    path: '/notifications',
    icon: '🔔',
    status: 'completed',
    category: 'feature',
    design: 'list',
    itemType: 'Feed',
    family: 'social',
  },
  {
    id: 'journal',
    name: 'Journal',
    description: 'Liste des entrees de journal',
    path: '/journal',
    icon: '📓',
    status: 'completed',
    category: 'feature',
    design: 'list',
    itemType: 'Journal',
    family: 'journal',
  },
  {
    id: 'journal-detail',
    name: 'Journal Detail',
    description: 'Sous-page detail d une entree du journal',
    path: '/journal/detail/1',
    icon: '📝',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Journal',
    family: 'journal',
  },
  {
    id: 'journal-new-entry',
    name: 'Journal New Entry',
    description: 'Creation guidee d une nouvelle entree',
    path: '/journal/new-entry',
    icon: '✍️',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Journal',
    family: 'journal',
  },
  {
    id: 'journal-free-entry',
    name: 'Journal Free Entry',
    description: 'Saisie libre d une entree journal',
    path: '/journal/free-entry',
    icon: '🗒️',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Journal',
    family: 'journal',
  },
  {
    id: 'veille-content',
    name: 'Veille Content',
    description: 'Sous-page detail d un contenu veille',
    path: '/veille/content',
    icon: '📰',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Veille Item',
    family: 'veille',
  },
  {
    id: 'login',
    name: 'Login',
    description: 'Ecran de connexion utilisateur',
    path: '/auth/login',
    icon: '🔑',
    status: 'completed',
    category: 'feature',
    design: 'settings',
    itemType: 'Auth',
    family: 'account-auth',
  },
  {
    id: 'signup',
    name: 'Signup',
    description: 'Ecran de creation de compte',
    path: '/auth/signup',
    icon: '🆕',
    status: 'completed',
    category: 'feature',
    design: 'settings',
    itemType: 'Auth',
    family: 'account-auth',
  },
  {
    id: 'forgot-password',
    name: 'Forgot Password',
    description: 'Recuperation de mot de passe',
    path: '/auth/forgot-password',
    icon: '♻️',
    status: 'completed',
    category: 'feature',
    design: 'settings',
    itemType: 'Auth',
    family: 'account-auth',
  },
  {
    id: 'reset-password',
    name: 'Reset Password',
    description: 'Reinitialisation mot de passe',
    path: '/auth/reset-password',
    icon: '🛡️',
    status: 'completed',
    category: 'feature',
    design: 'settings',
    itemType: 'Auth',
    family: 'account-auth',
  },
  {
    id: 'course-detail',
    name: 'Course Detail',
    description: 'Detail module/cours avec programme et lecons (Figma CourseDetailPageUpdated)',
    path: '/course/1',
    icon: '🎓',
    status: 'completed',
    category: 'feature',
    design: 'detail',
    itemType: 'Learning',
    family: 'learning',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Espace entreprise admin: KPI, equipe, parametres (Figma EntreprisePageComplete)',
    path: '/enterprise',
    icon: '🏢',
    status: 'completed',
    category: 'feature',
    design: 'dashboard',
    itemType: 'Enterprise',
    family: 'enterprise',
  },
  {
    id: 'help-chatbot',
    name: 'Help / Assistant',
    description: 'Assistant conversationnel statique (Figma HelpChatbotPage)',
    path: '/help',
    icon: '💬',
    status: 'completed',
    category: 'feature',
    design: 'hub',
    itemType: 'Support',
    family: 'support',
  },
  {
    id: 'error-404',
    name: 'Error 404',
    description: 'Page introuvable (Figma Error404Page)',
    path: '/error/404',
    icon: '🧭',
    status: 'completed',
    category: 'feature',
    design: 'system',
    itemType: 'Error',
    family: 'support',
  },
  {
    id: 'error-500',
    name: 'Error 500',
    description: 'Erreur serveur (Figma Error500Page)',
    path: '/error/500',
    icon: '⚠️',
    status: 'completed',
    category: 'feature',
    design: 'system',
    itemType: 'Error',
    family: 'support',
  },
];

const getStatusBadge = (status: 'completed' | 'in-progress' | 'planned') => {
  const statusConfig = {
    completed: { label: '✅ Complétée', class: 'status-completed' },
    'in-progress': { label: '🔄 En cours', class: 'status-in-progress' },
    planned: { label: '📋 Planifiée', class: 'status-planned' },
  };
  const config = statusConfig[status];
  return <span className={`status-badge ${config.class}`}>{config.label}</span>;
};

const getCategoryLabel = (category: 'core' | 'feature' | 'admin') => {
  const categoryConfig = {
    core: { label: 'Core', color: 'category-core' },
    feature: { label: 'Feature', color: 'category-feature' },
    admin: { label: 'Admin', color: 'category-admin' },
  };
  const config = categoryConfig[category];
  return <span className={`category-badge ${config.color}`}>{config.label}</span>;
};

const getDesignLabel = (design: PageItem['design']) => {
  const designConfig = {
    dashboard: { label: 'Dashboard', class: 'design-dashboard' },
    list: { label: 'Liste', class: 'design-list' },
    detail: { label: 'Detail', class: 'design-detail' },
    hub: { label: 'Hub', class: 'design-hub' },
    settings: { label: 'Settings', class: 'design-settings' },
    system: { label: 'Systeme', class: 'design-system' },
  };
  const config = designConfig[design];
  return <span className={`design-badge ${config.class}`}>{config.label}</span>;
};

export const PagesIndex: React.FC = () => {
  const navigate = useNavigate();

  const byFamily = (family: PageItem['family']) => PAGES_LIST.filter((p) => p.family === family);

  const PageCard: React.FC<{ page: PageItem }> = ({ page }) => (
    <div className={`page-card page-card--${page.design} page-card--family-${page.family}`}>
      <div className="page-card-header">
        <span className="page-icon">{page.icon}</span>
        <div className="page-header-info">
          <h3 className="page-name">{page.name}</h3>
          <div className="page-badges">
            {getStatusBadge(page.status)}
            {getCategoryLabel(page.category)}
            {getDesignLabel(page.design)}
          </div>
        </div>
      </div>

      <p className="page-description">{page.description}</p>
      <div className="page-item-type">{page.itemType}</div>

      <div className="page-card-footer">
        <code className="page-path">{page.path}</code>
        <button
          className="page-link-button"
          onClick={() => navigate(page.path)}
          title={`Accéder à ${page.name}`}
        >
          Accéder →
        </button>
      </div>
    </div>
  );

  return (
    <div className="pages-index-container">
      <div className="pages-index-header">
        <h1>📖 Pages du Projet</h1>
        <p className="pages-index-subtitle">
          Accès centralisé à toutes les pages de l'application
        </p>
      </div>

      <div className="pages-index-stats">
        <div className="stat-card">
          <span className="stat-number">{PAGES_LIST.length}</span>
          <span className="stat-label">Pages totales</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{PAGES_LIST.filter((p) => p.status === 'completed').length}</span>
          <span className="stat-label">Complétées</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{PAGES_LIST.filter((p) => p.status === 'in-progress').length}</span>
          <span className="stat-label">En cours</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{PAGES_LIST.filter((p) => p.status === 'planned').length}</span>
          <span className="stat-label">Planifiées</span>
        </div>
      </div>

      {/* FAMILY: CORE */}
      <section className="pages-section">
        <h2 className="section-title">🎯 Famille Core</h2>
        <p className="section-description">Navigation principale et pages fondamentales</p>
        <div className="pages-grid">
          {byFamily('core').map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      </section>

      {/* FAMILY: LEARNING */}
      <section className="pages-section">
        <h2 className="section-title">🧭 Famille Learning Space</h2>
        <p className="section-description">Hub learning, parcours et projet</p>
        <div className="pages-grid">
          {byFamily('learning').map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      </section>

      {/* FAMILY: VEILLE */}
      <section className="pages-section">
        <h2 className="section-title">📰 Famille Veille</h2>
        <p className="section-description">Hub éditorial et tous les items de contenus</p>
        <div className="pages-grid">
          {byFamily('veille').map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      </section>

      {/* FAMILY: JOURNAL */}
      <section className="pages-section">
        <h2 className="section-title">📓 Famille Journal</h2>
        <p className="section-description">Liste, détail et création d’entrées</p>
        <div className="pages-grid">
          {byFamily('journal').map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      </section>

      {/* FAMILY: COACHING FLOW */}
      <section className="pages-section">
        <h2 className="section-title">🎓 Famille Coaching Flow</h2>
        <p className="section-description">Réservation et questionnaire de préparation</p>
        <div className="pages-grid">
          {byFamily('coaching-flow').map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      </section>

      {/* FAMILY: ACCOUNT & AUTH */}
      <section className="pages-section">
        <h2 className="section-title">🔐 Famille Account & Auth</h2>
        <p className="section-description">Profil, paramètres compte et parcours d’authentification</p>
        <div className="pages-grid">
          {byFamily('account-auth').map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      </section>

      {/* FAMILY: SOCIAL */}
      <section className="pages-section">
        <h2 className="section-title">👥 Famille Social</h2>
        <p className="section-description">Collaboration et notifications</p>
        <div className="pages-grid">
          {byFamily('social').map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      </section>

      {/* FAMILY: ENTERPRISE */}
      <section className="pages-section">
        <h2 className="section-title">🏢 Famille Entreprise</h2>
        <p className="section-description">Administration multi-utilisateurs (structure statique)</p>
        <div className="pages-grid">
          {byFamily('enterprise').map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      </section>

      {/* FAMILY: SUPPORT */}
      <section className="pages-section">
        <h2 className="section-title">🛟 Famille Support & erreurs</h2>
        <p className="section-description">Aide, 404 et 500</p>
        <div className="pages-grid">
          {byFamily('support').map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      </section>

      {/* FAMILY: SYSTEM */}
      <section className="pages-section">
        <h2 className="section-title">⚙️ Famille Système</h2>
        <p className="section-description">Pages de développement et administration</p>
        <div className="pages-grid">
          {byFamily('system').map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="pages-section feedback-section">
        <h2 className="section-title">💬 Signaler un Problème</h2>
        <p className="section-description">
          Pendant que vous testez, n'hésitez pas à signaler tout problème d'affichage, navigation ou contenu.
        </p>
        <div className="feedback-box">
          <p>
            Utilisez cette page pour:
          </p>
          <ul>
            <li>✅ Vérifier le statut de chaque page</li>
            <li>✅ Accéder rapidement à n'importe quelle page</li>
            <li>✅ Voir le progrès global du projet</li>
            <li>✅ Identifier les pages à corriger ou améliorer</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
