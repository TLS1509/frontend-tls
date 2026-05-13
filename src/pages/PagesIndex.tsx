/**
 * Pages Index — Phase 10 Tier 2 refonte.
 *
 * Hub interne de navigation centralisée vers toutes les pages de l'app.
 *
 * Structure :
 *  1. EditorialHero default (header + stats)
 *  2. StatCard row (total / completed / planned)
 *  3. Grilles de cards par famille — Card interactive + Badge status/category
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { BookOpen, ArrowRight, LayoutGrid } from 'lucide-react';

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
  { id: 'dashboard', name: 'Dashboard', description: "Page d'accueil avec vue d'ensemble de la progression et parcours en cours", path: '/dashboard', icon: '📊', status: 'completed', category: 'core', design: 'dashboard', itemType: 'Overview', family: 'core' },
  { id: 'learning-paths', name: 'Learning Paths', description: 'Liste des parcours disponibles avec filtrage et statut', path: '/learning-paths', icon: '📚', status: 'completed', category: 'core', design: 'list', itemType: 'Collection', family: 'core' },
  { id: 'learning-path-detail', name: 'Learning Path Detail', description: "Détail d'un parcours avec étapes, leçons et ressources", path: '/learning-paths/1', icon: '🎯', status: 'completed', category: 'core', design: 'detail', itemType: 'Detail', family: 'core' },
  { id: 'coaching', name: 'Coaching', description: 'Sessions de coaching et accompagnement', path: '/coaching', icon: '🎓', status: 'completed', category: 'feature', design: 'detail', itemType: 'Flow', family: 'coaching-flow' },
  { id: 'collaboration', name: 'Collaboration', description: 'Projets collaboratifs et travail en équipe', path: '/collaboration', icon: '👥', status: 'completed', category: 'feature', design: 'hub', itemType: 'Workspace', family: 'social' },
  { id: 'veille', name: 'Veille', description: 'Hub éditorial multi-format (actus, tutoriels, dossiers, magazine)', path: '/veille', icon: '📰', status: 'completed', category: 'feature', design: 'hub', itemType: 'Editorial Hub', family: 'veille' },
  { id: 'profile', name: 'Profile', description: 'Profil utilisateur et informations de compte', path: '/profile', icon: '👤', status: 'completed', category: 'feature', design: 'dashboard', itemType: 'Profile', family: 'account-auth' },
  { id: 'settings', name: 'Settings', description: 'Préférences et paramètres utilisateur', path: '/settings', icon: '⚙️', status: 'completed', category: 'feature', design: 'settings', itemType: 'Preferences', family: 'account-auth' },
  { id: 'components', name: 'Components Showcase', description: 'Galerie des composants et design tokens', path: '/components', icon: '🎨', status: 'completed', category: 'admin', design: 'system', itemType: 'Documentation', family: 'system' },
  { id: 'pages-index', name: 'Pages Index', description: 'Index de navigation centralisée', path: '/pages-index', icon: '📖', status: 'completed', category: 'admin', design: 'system', itemType: 'Navigation', family: 'system' },
  { id: 'learning-space', name: 'Learning Space', description: 'Hub apprentissage multi-sections (parcours, ressources, actions)', path: '/learning-space', icon: '🧭', status: 'completed', category: 'feature', design: 'hub', itemType: 'Learning Hub', family: 'learning' },
  { id: 'veille-article', name: 'Veille Article', description: 'Detail article avec structure longue et metadata', path: '/veille/article/1', icon: '🗞️', status: 'completed', category: 'feature', design: 'detail', itemType: 'Veille Item', family: 'veille' },
  { id: 'veille-dossier', name: 'Veille Dossier', description: 'Page dossier thematique (sommaire, enjeux, ressources)', path: '/veille/dossier/1', icon: '📂', status: 'completed', category: 'feature', design: 'detail', itemType: 'Veille Item', family: 'veille' },
  { id: 'veille-video-tutorial', name: 'Veille Video Tutorial', description: 'Tutoriel video avec player, chapitres et notes', path: '/veille/video-tutorial/1', icon: '🎬', status: 'completed', category: 'feature', design: 'detail', itemType: 'Veille Item', family: 'veille' },
  { id: 'veille-video-reels', name: 'Veille Video Reels', description: 'Feed micro-learning de reels', path: '/veille/video-reels', icon: '🎞️', status: 'completed', category: 'feature', design: 'list', itemType: 'Veille Item', family: 'veille' },
  { id: 'veille-magazine', name: 'Veille Magazine', description: 'Collection des editions magazine', path: '/veille/magazine', icon: '📚', status: 'completed', category: 'feature', design: 'list', itemType: 'Veille Item', family: 'veille' },
  { id: 'veille-magazine-article', name: 'Veille Magazine Article', description: "Article detail d'une edition magazine", path: '/veille/magazine-article/1', icon: '📰', status: 'completed', category: 'feature', design: 'detail', itemType: 'Veille Item', family: 'veille' },
  { id: 'veille-weekly-newsletter', name: 'Veille Weekly Newsletter', description: 'Recap hebdomadaire editorial', path: '/veille/weekly-newsletter', icon: '📬', status: 'completed', category: 'feature', design: 'detail', itemType: 'Veille Item', family: 'veille' },
  { id: 'veille-weekly-news-detail', name: 'Veille Weekly News Detail', description: "Detail d'un item de la newsletter", path: '/veille/weekly-news/1', icon: '🧾', status: 'completed', category: 'feature', design: 'detail', itemType: 'Veille Item', family: 'veille' },
  { id: 'veille-newsletter', name: 'Veille Newsletter Preferences', description: 'Abonnement, preferences et archives newsletter', path: '/veille/newsletter', icon: '✉️', status: 'completed', category: 'feature', design: 'settings', itemType: 'Veille Item', family: 'veille' },
  { id: 'project', name: 'Project', description: 'Page dediee au projet final de parcours', path: '/project/1', icon: '🚀', status: 'completed', category: 'feature', design: 'detail', itemType: 'Project', family: 'learning' },
  { id: 'onboarding', name: 'Onboarding', description: 'Parcours de prise en main de la plateforme', path: '/onboarding', icon: '🧩', status: 'completed', category: 'feature', design: 'detail', itemType: 'Flow', family: 'coaching-flow' },
  { id: 'coaching-booking', name: 'Coaching Booking Flow', description: "Etapes de reservation d'une session coaching", path: '/coaching/booking', icon: '📅', status: 'completed', category: 'feature', design: 'detail', itemType: 'Flow', family: 'coaching-flow' },
  { id: 'coaching-pre-questionnaire', name: 'Pre Coaching Questionnaire', description: 'Questionnaire pre-session', path: '/coaching/pre-questionnaire', icon: '🧠', status: 'completed', category: 'feature', design: 'detail', itemType: 'Flow', family: 'coaching-flow' },
  { id: 'coaching-pre-questionnaire-response', name: 'Pre Questionnaire Response', description: 'Vue reponse du questionnaire pre-coaching', path: '/coaching/pre-questionnaire/response', icon: '✅', status: 'completed', category: 'feature', design: 'detail', itemType: 'Flow', family: 'coaching-flow' },
  { id: 'account', name: 'Account', description: 'Parametres compte detailles (securite, notifications, langue)', path: '/account', icon: '🔐', status: 'completed', category: 'feature', design: 'settings', itemType: 'Account', family: 'account-auth' },
  { id: 'notifications', name: 'Notifications', description: 'Flux notifications avec filtres et actions', path: '/notifications', icon: '🔔', status: 'completed', category: 'feature', design: 'list', itemType: 'Feed', family: 'social' },
  { id: 'journal', name: 'Journal', description: 'Liste des entrees de journal', path: '/journal', icon: '📓', status: 'completed', category: 'feature', design: 'list', itemType: 'Journal', family: 'journal' },
  { id: 'journal-detail', name: 'Journal Detail', description: "Sous-page detail d'une entree du journal", path: '/journal/detail/1', icon: '📝', status: 'completed', category: 'feature', design: 'detail', itemType: 'Journal', family: 'journal' },
  { id: 'journal-new-entry', name: 'Journal New Entry', description: "Creation guidee d'une nouvelle entree", path: '/journal/new-entry', icon: '✍️', status: 'completed', category: 'feature', design: 'detail', itemType: 'Journal', family: 'journal' },
  { id: 'journal-free-entry', name: 'Journal Free Entry', description: "Saisie libre d'une entree journal", path: '/journal/free-entry', icon: '🗒️', status: 'completed', category: 'feature', design: 'detail', itemType: 'Journal', family: 'journal' },
  { id: 'veille-content', name: 'Veille Content', description: "Sous-page detail d'un contenu veille", path: '/veille/content', icon: '📰', status: 'completed', category: 'feature', design: 'detail', itemType: 'Veille Item', family: 'veille' },
  { id: 'login', name: 'Login', description: 'Ecran de connexion utilisateur', path: '/auth/login', icon: '🔑', status: 'completed', category: 'feature', design: 'settings', itemType: 'Auth', family: 'account-auth' },
  { id: 'signup', name: 'Signup', description: 'Ecran de creation de compte', path: '/auth/signup', icon: '🆕', status: 'completed', category: 'feature', design: 'settings', itemType: 'Auth', family: 'account-auth' },
  { id: 'forgot-password', name: 'Forgot Password', description: 'Recuperation de mot de passe', path: '/auth/forgot-password', icon: '♻️', status: 'completed', category: 'feature', design: 'settings', itemType: 'Auth', family: 'account-auth' },
  { id: 'reset-password', name: 'Reset Password', description: 'Reinitialisation mot de passe', path: '/auth/reset-password', icon: '🛡️', status: 'completed', category: 'feature', design: 'settings', itemType: 'Auth', family: 'account-auth' },
  { id: 'course-detail', name: 'Course Detail', description: 'Detail module/cours avec programme et lecons', path: '/course/1', icon: '🎓', status: 'completed', category: 'feature', design: 'detail', itemType: 'Learning', family: 'learning' },
  { id: 'enterprise', name: 'Enterprise', description: 'Espace entreprise admin: KPI, equipe, parametres', path: '/enterprise', icon: '🏢', status: 'completed', category: 'feature', design: 'dashboard', itemType: 'Enterprise', family: 'enterprise' },
  { id: 'help-chatbot', name: 'Help / Assistant', description: 'Assistant conversationnel statique', path: '/help', icon: '💬', status: 'completed', category: 'feature', design: 'hub', itemType: 'Support', family: 'support' },
  { id: 'error-404', name: 'Error 404', description: 'Page introuvable', path: '/error/404', icon: '🧭', status: 'completed', category: 'feature', design: 'system', itemType: 'Error', family: 'support' },
  { id: 'error-500', name: 'Error 500', description: 'Erreur serveur', path: '/error/500', icon: '⚠️', status: 'completed', category: 'feature', design: 'system', itemType: 'Error', family: 'support' },
];

const STATUS_BADGE: Record<PageItem['status'], { variant: 'success' | 'warm' | 'neutral'; label: string }> = {
  completed:   { variant: 'success', label: 'Complétée' },
  'in-progress': { variant: 'warm',    label: 'En cours' },
  planned:     { variant: 'neutral',  label: 'Planifiée' },
};

const CATEGORY_BADGE: Record<PageItem['category'], { variant: 'brand' | 'neutral' | 'sun'; label: string }> = {
  core:    { variant: 'brand',   label: 'Core' },
  feature: { variant: 'neutral', label: 'Feature' },
  admin:   { variant: 'sun',     label: 'Admin' },
};

const FAMILY_SECTIONS: { family: PageItem['family']; label: string; emoji: string; desc: string }[] = [
  { family: 'core',          label: 'Famille Core',          emoji: '🎯', desc: 'Navigation principale et pages fondamentales' },
  { family: 'learning',      label: 'Famille Learning Space', emoji: '🧭', desc: 'Hub learning, parcours et projet' },
  { family: 'veille',        label: 'Famille Veille',         emoji: '📰', desc: 'Hub éditorial et tous les items de contenus' },
  { family: 'journal',       label: 'Famille Journal',        emoji: '📓', desc: "Liste, détail et création d'entrées" },
  { family: 'coaching-flow', label: 'Famille Coaching Flow',  emoji: '🎓', desc: 'Réservation et questionnaire de préparation' },
  { family: 'account-auth',  label: 'Famille Account & Auth', emoji: '🔐', desc: "Profil, paramètres compte et parcours d'authentification" },
  { family: 'social',        label: 'Famille Social',         emoji: '👥', desc: 'Collaboration et notifications' },
  { family: 'enterprise',    label: 'Famille Entreprise',     emoji: '🏢', desc: 'Administration multi-utilisateurs' },
  { family: 'support',       label: 'Famille Support & erreurs', emoji: '🛟', desc: 'Aide, 404 et 500' },
  { family: 'system',        label: 'Famille Système',        emoji: '⚙️', desc: 'Pages de développement et administration' },
];

const PageCard: React.FC<{ page: PageItem; onNavigate: (path: string) => void }> = ({ page, onNavigate }) => {
  const statusCfg = STATUS_BADGE[page.status];
  const categoryCfg = CATEGORY_BADGE[page.category];
  return (
    <div className="flex flex-col gap-stack p-5 rounded-2xl border border-ink-100 bg-white hover:border-ink-200 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-base">
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0 mt-0.5" aria-hidden>{page.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="m-0 font-body text-body-sm font-bold text-ink-900 leading-snug mb-1.5">{page.name}</h3>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
            <Badge variant={categoryCfg.variant}>{categoryCfg.label}</Badge>
            <Badge variant="neutral">{page.itemType}</Badge>
          </div>
        </div>
      </div>
      <p className="m-0 font-body text-caption text-ink-600 leading-relaxed flex-1">{page.description}</p>
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-ink-50">
        <code className="font-mono text-micro text-ink-400 truncate">{page.path}</code>
        <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={12} />} onClick={() => onNavigate(page.path)}>
          Accéder
        </Button>
      </div>
    </div>
  );
};

export const PagesIndex: React.FC = () => {
  const navigate = useNavigate();
  const total = PAGES_LIST.length;
  const completed = PAGES_LIST.filter((p) => p.status === 'completed').length;
  const inProgress = PAGES_LIST.filter((p) => p.status === 'in-progress').length;

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">

        <EditorialHero
          tone="default"
          eyebrow={{ icon: <BookOpen size={12} />, label: 'Navigation développeur' }}
          title="Pages du Projet"
          summary="Accès centralisé à toutes les pages de l'application — statuts, familles et routes."
        />

        <section aria-label="Statistiques" className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard tone="brand" surface="tinted" size="sm" icon={<LayoutGrid size={18} />} label="Pages totales" value={String(total)} />
          <StatCard tone="sun"   surface="tinted" size="sm" icon={<LayoutGrid size={18} />} label="Complétées" value={String(completed)} />
          <StatCard tone="warm"  surface="tinted" size="sm" icon={<LayoutGrid size={18} />} label="En cours" value={String(inProgress)} />
        </section>

        {FAMILY_SECTIONS.map(({ family, label, emoji, desc }) => {
          const pages = PAGES_LIST.filter((p) => p.family === family);
          if (!pages.length) return null;
          return (
            <section key={family} className="flex flex-col gap-stack">
              <div>
                <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight">
                  {emoji} {label}
                </h2>
                <p className="m-0 font-body text-body-sm text-ink-500 mt-1">{desc}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack">
                {pages.map((page) => (
                  <PageCard key={page.id} page={page} onNavigate={navigate} />
                ))}
              </div>
            </section>
          );
        })}

      </div>
    </div>
  );
};
