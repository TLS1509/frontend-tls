/**
 * Learning Path Detail Page
 *
 * Vue détaillée d'un parcours :
 *  - Hero avec back, titre, description, chips meta + progression globale
 *  - Tabs "Étapes du parcours" / "Projet final"
 *  - Liste d'étapes (avec déverrouillage séquentiel, leçons cochables)
 *  - Grille de ressources complémentaires (3 colonnes responsive)
 *  - Carte de projet final
 *
 * Toutes les icônes sont en lucide-react, aucune chaîne emoji statique.
 * Statique uniquement (les données seront branchées sur l'API plus tard).
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Layers,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Lock,
  Play,
  CheckCircle2,
  Target,
  Library,
  FileText,
  Video,
  Mic,
  ClipboardList,
  MessagesSquare,
  Sparkles,
} from 'lucide-react';
import '../styles/learning-paths.css';

type Tone = 'primary' | 'warm' | 'sun';
type ResourceKind = 'guide' | 'video' | 'template' | 'podcast' | 'exercise';

interface Lecon {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
}

interface Etape {
  id: string;
  number: number;
  title: string;
  duration: string;
  lecons: Lecon[];
  completed: boolean;
  unlocked: boolean;
  progress: { completed: number; total: number; percentage: number };
}

interface ComplementaryItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  kind: ResourceKind;
  tone: Tone;
}

interface FinalProject {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  locked: boolean;
}

interface Parcours {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: 'débutant' | 'intermédiaire' | 'avancé';
  duration: string;
  category: string;
  etapes: Etape[];
  complementaryContent?: ComplementaryItem[];
  finalProject?: FinalProject;
  progress: { completed: number; total: number; percentage: number };
  backUrl: string;
}

const RESOURCE_ICON: Record<ResourceKind, React.ComponentType<{ size?: number }>> = {
  guide: FileText,
  video: Video,
  template: ClipboardList,
  podcast: Mic,
  exercise: MessagesSquare,
};

const RESOURCE_LABEL: Record<ResourceKind, string> = {
  guide: 'Guide',
  video: 'Vidéo',
  template: 'Template',
  podcast: 'Podcast',
  exercise: 'Exercice',
};

const MOCK_PARCOURS_DATA: Record<string, Parcours> = {
  '1': {
    id: '1',
    title: 'Fondamentaux du Leadership',
    description:
      'Apprenez les principes essentiels du leadership moderne et développez vos compétences de management.',
    instructor: 'Marie Dubois',
    level: 'débutant',
    duration: '6 semaines',
    category: 'Leadership',
    backUrl: '/learning-paths',
    etapes: [
      {
        id: 'etape-1-1',
        number: 1,
        title: 'Introduction au Leadership',
        duration: '2 semaines',
        unlocked: true,
        completed: true,
        lecons: [
          { id: 'lecon-1-1-1', number: 1, title: 'Introduction au Leadership', description: 'Découvrez les fondamentaux et les différents styles de leadership', duration: '45 min', completed: true },
          { id: 'lecon-1-1-2', number: 2, title: 'Présence et Authenticité', description: 'Développez votre présence authentique en tant que leader', duration: '1h', completed: true },
          { id: 'lecon-1-1-3', number: 3, title: 'Vision et Stratégie', description: 'Articulez votre vision et créez une stratégie inspirante', duration: '1h 15min', completed: true },
        ],
        progress: { completed: 3, total: 3, percentage: 100 },
      },
      {
        id: 'etape-1-2',
        number: 2,
        title: 'Communication et Motivation',
        duration: '2 semaines',
        unlocked: true,
        completed: false,
        lecons: [
          { id: 'lecon-1-2-1', number: 1, title: 'Motivation et Engagement', description: 'Comprenez les mécanismes de motivation et d\'engagement', duration: '50 min', completed: true },
          { id: 'lecon-1-2-2', number: 2, title: 'Communication Efficace', description: 'Maîtrisez les techniques de communication de leader', duration: '1h', completed: false },
          { id: 'lecon-1-2-3', number: 3, title: 'Gestion des Conflits', description: 'Résolvez les conflits de manière constructive', duration: '55 min', completed: false },
        ],
        progress: { completed: 1, total: 3, percentage: 33 },
      },
      {
        id: 'etape-1-3',
        number: 3,
        title: 'Développement et Culture',
        duration: '2 semaines',
        unlocked: false,
        completed: false,
        lecons: [
          { id: 'lecon-1-3-1', number: 1, title: 'Délégation et Autonomisation', description: 'Apprenez à déléguer efficacement et développer vos collaborateurs', duration: '50 min', completed: false },
          { id: 'lecon-1-3-2', number: 2, title: 'Feedback et Développement', description: 'Donnez un feedback constructif et facilitez la croissance', duration: '1h 10min', completed: false },
          { id: 'lecon-1-3-3', number: 3, title: 'Culture et Valeurs', description: 'Créez une culture organisationnelle forte', duration: '1h 15min', completed: false },
        ],
        progress: { completed: 0, total: 3, percentage: 0 },
      },
    ],
    finalProject: {
      id: 'project-1',
      title: 'Projet Final : Plan de Leadership',
      description:
        'Développez un plan d\'action concret pour appliquer vos apprentissages dans votre contexte professionnel.',
      ctaText: 'Commencer le projet',
      locked: false,
    },
    complementaryContent: [
      { id: 'comp-1-1', title: 'Guide : Les 5 Styles de Leadership', description: 'Un guide complet explorant les différents styles de leadership et comment les appliquer.', duration: '15 min', kind: 'guide', tone: 'primary' },
      { id: 'comp-1-2', title: 'Vidéo : Présence Leadership', description: 'Une interview d\'experts sur la présence et l\'impact du leader.', duration: '12 min', kind: 'video', tone: 'warm' },
      { id: 'comp-1-3', title: 'Template : Plan de Vision', description: 'Un modèle pour créer votre déclaration de vision personnelle.', duration: '8 min', kind: 'template', tone: 'sun' },
      { id: 'comp-1-4', title: 'Podcast : Leaders Inspirants', description: 'Écoutez des histoires de leaders qui ont transformé leurs organisations.', duration: '25 min', kind: 'podcast', tone: 'primary' },
      { id: 'comp-1-5', title: 'Exercice : Feedback 360', description: 'Un outil interactif pour recevoir du feedback de vos pairs.', duration: '20 min', kind: 'exercise', tone: 'warm' },
    ],
    progress: { completed: 4, total: 9, percentage: 44 },
  },
  '2': {
    id: '2',
    title: 'Communication Efficace',
    description:
      'Maîtrisez les techniques de communication interpersonnelle pour améliorer vos relations professionnelles.',
    instructor: 'Jean Martin',
    level: 'intermédiaire',
    duration: '4 semaines',
    category: 'Soft Skills',
    backUrl: '/learning-paths',
    etapes: [
      {
        id: 'etape-2-1',
        number: 1,
        title: 'Fondamentaux de la Communication',
        duration: '1 semaine',
        unlocked: true,
        completed: true,
        lecons: [
          { id: 'lecon-2-1-1', number: 1, title: 'Les Fondamentaux de la Communication', description: 'Comprendre le modèle de communication', duration: '45 min', completed: true },
          { id: 'lecon-2-1-2', number: 2, title: 'Écoute Active', description: 'Développez l\'écoute active et empathique', duration: '1h', completed: true },
        ],
        progress: { completed: 2, total: 2, percentage: 100 },
      },
      {
        id: 'etape-2-2',
        number: 2,
        title: 'Expression et Assertion',
        duration: '1 semaine',
        unlocked: true,
        completed: true,
        lecons: [
          { id: 'lecon-2-2-1', number: 1, title: 'Expression Claire', description: 'Exprimez-vous avec clarté et impact', duration: '1h', completed: true },
          { id: 'lecon-2-2-2', number: 2, title: 'Langage Non-Verbal', description: 'Maîtrisez votre langage corporel', duration: '50 min', completed: true },
          { id: 'lecon-2-2-3', number: 3, title: 'Communication Assertive', description: 'Affirmez-vous sans agressivité', duration: '55 min', completed: true },
        ],
        progress: { completed: 3, total: 3, percentage: 100 },
      },
      {
        id: 'etape-2-3',
        number: 3,
        title: 'Feedback et Résolution',
        duration: '1 semaine',
        unlocked: true,
        completed: true,
        lecons: [
          { id: 'lecon-2-3-1', number: 1, title: 'Gestion des Objections', description: 'Répondez aux préoccupations de manière constructive', duration: '1h', completed: true },
          { id: 'lecon-2-3-2', number: 2, title: 'Feedback Constructif', description: 'Donnez et recevez du feedback efficacement', duration: '55 min', completed: true },
          { id: 'lecon-2-3-3', number: 3, title: 'Synthèse et Pratique', description: 'Appliquez vos apprentissages dans des situations réelles', duration: '1h 15min', completed: true },
        ],
        progress: { completed: 3, total: 3, percentage: 100 },
      },
    ],
    finalProject: {
      id: 'project-2',
      title: 'Projet Final : Communication Appliquée',
      description: 'Créez un plan d\'amélioration de communication pour une situation réelle.',
      ctaText: 'Commencer le projet',
      locked: false,
    },
    complementaryContent: [
      { id: 'comp-2-1', title: 'Guide : Langage Corporel', description: 'Un guide détaillé sur l\'importance du langage corporel en communication.', duration: '18 min', kind: 'guide', tone: 'warm' },
      { id: 'comp-2-2', title: 'Vidéo : Écoute Active', description: 'Démonstration pratique des techniques d\'écoute active.', duration: '14 min', kind: 'video', tone: 'primary' },
      { id: 'comp-2-3', title: 'Quiz : Styles de Communication', description: 'Testez vos connaissances sur les différents styles de communication.', duration: '10 min', kind: 'exercise', tone: 'sun' },
      { id: 'comp-2-4', title: 'Podcast : Conversations Difficiles', description: 'Comment gérer les conversations délicates avec confiance.', duration: '22 min', kind: 'podcast', tone: 'warm' },
    ],
    progress: { completed: 8, total: 8, percentage: 100 },
  },
};

const getToneFromLevel = (level: Parcours['level']): Tone => {
  if (level === 'intermédiaire') return 'warm';
  if (level === 'avancé') return 'sun';
  return 'primary';
};

const calculateStepUnlocked = (stepIndex: number, etapes: Etape[]): boolean => {
  if (stepIndex === 0) return true;
  const previousStep = etapes[stepIndex - 1];
  return previousStep.completed;
};

const calculateStepCompleted = (step: Etape): boolean =>
  step.lecons.every((lecon) => lecon.completed);

const calculateStepProgress = (step: Etape): Etape['progress'] => {
  const completed = step.lecons.filter((lecon) => lecon.completed).length;
  const total = step.lecons.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percentage };
};

const calculateParcoursProgress = (etapes: Etape[]): Parcours['progress'] => {
  const totalLessons = etapes.reduce((sum, etape) => sum + etape.lecons.length, 0);
  const completedLessons = etapes.reduce(
    (sum, etape) => sum + etape.lecons.filter((lecon) => lecon.completed).length,
    0
  );
  const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  return { completed: completedLessons, total: totalLessons, percentage };
};

export const LearningPathDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'steps' | 'project'>('steps');
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
  const [parcoursData, setParcoursData] = useState<Parcours | null>(null);

  useEffect(() => {
    if (id && MOCK_PARCOURS_DATA[id]) {
      setParcoursData(MOCK_PARCOURS_DATA[id]);
      // Ouvre l'étape en cours par défaut pour aider l'utilisateur
      const initial = MOCK_PARCOURS_DATA[id].etapes.find((e) => !e.completed && e.unlocked);
      if (initial) setExpandedSteps(new Set([initial.id]));
    }
  }, [id]);

  const parcours = useMemo(() => {
    if (!parcoursData) return null;
    const etapesWithUnlock = parcoursData.etapes.map((etape, index) => ({
      ...etape,
      unlocked: calculateStepUnlocked(index, parcoursData.etapes),
      completed: calculateStepCompleted(etape),
      progress: calculateStepProgress(etape),
    }));
    const progress = calculateParcoursProgress(etapesWithUnlock);
    const allStepsComplete = etapesWithUnlock.every((e) => e.completed);
    return {
      ...parcoursData,
      etapes: etapesWithUnlock,
      progress,
      finalProject: parcoursData.finalProject
        ? { ...parcoursData.finalProject, locked: !allStepsComplete }
        : undefined,
    };
  }, [parcoursData]);

  if (!parcours) {
    return (
      <div className="learning-path-detail-container" style={{ textAlign: 'center' }}>
        <h1>Parcours non trouvé</h1>
        <Button onClick={() => navigate('/learning-paths')}>Retour aux parcours</Button>
      </div>
    );
  }

  const toggleStepExpanded = (etapeId: string) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(etapeId)) next.delete(etapeId);
      else next.add(etapeId);
      return next;
    });
  };

  const toggleLessonCompletion = (etapeId: string, leconId: string) => {
    if (!parcoursData) return;
    const updatedEtapes = parcoursData.etapes.map((etape) => {
      if (etape.id !== etapeId) return etape;
      const updatedLecons = etape.lecons.map((lecon) =>
        lecon.id === leconId ? { ...lecon, completed: !lecon.completed } : lecon
      );
      return { ...etape, lecons: updatedLecons };
    });
    setParcoursData({ ...parcoursData, etapes: updatedEtapes });
  };

  const tone = getToneFromLevel(parcours.level);
  const headerToneClass =
    tone === 'warm' ? 'warm-color' : tone === 'sun' ? 'sun-color' : 'primary-color';
  const totalLessons = parcours.etapes.reduce((sum, e) => sum + e.lecons.length, 0);
  const allStepsComplete = parcours.etapes.every((e) => e.completed);
  const carouselItems = parcours.complementaryContent || [];

  return (
    <div className="learning-path-detail-container">
      {/* HERO */}
      <section className={`learning-path-detail-header ${headerToneClass}`}>
        <div className="learning-path-detail-header-content">
          <button
            className="learning-path-detail-back-btn"
            onClick={() => navigate(parcours.backUrl)}
            aria-label="Retour aux parcours"
          >
            <ArrowLeft size={14} />
            Retour aux parcours
          </button>

          <div>
            <h1 className="learning-path-detail-title">{parcours.title}</h1>
            <p className="learning-path-detail-description">{parcours.description}</p>
          </div>

          <div className="learning-path-detail-meta">
            <div className="learning-path-detail-meta-item">
              <span className="learning-path-detail-meta-label">
                <Clock3 size={12} /> Durée
              </span>
              <span className="learning-path-detail-meta-value">{parcours.duration}</span>
            </div>
            <div className="learning-path-detail-meta-item">
              <span className="learning-path-detail-meta-label">
                <Layers size={12} /> Étapes
              </span>
              <span className="learning-path-detail-meta-value">{parcours.etapes.length}</span>
            </div>
            <div className="learning-path-detail-meta-item">
              <span className="learning-path-detail-meta-label">
                <BookOpen size={12} /> Leçons
              </span>
              <span className="learning-path-detail-meta-value">{totalLessons}</span>
            </div>
            <div className="learning-path-detail-meta-item">
              <span className="learning-path-detail-meta-label">
                <Sparkles size={12} /> Niveau
              </span>
              <span className="learning-path-detail-meta-value">{parcours.level}</span>
            </div>
          </div>

          <div
            className="learning-path-detail-progress-section"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={parcours.progress.percentage}
            aria-label="Progression globale du parcours"
          >
            <div className="learning-path-detail-progress-header">
              <h3>Progression globale</h3>
              <span className="learning-path-detail-progress-count">
                {parcours.progress.completed}/{parcours.progress.total} leçons complétées
              </span>
            </div>
            <div className="learning-path-detail-progress-bar">
              <div
                className="learning-path-detail-progress-fill"
                style={{ width: `${parcours.progress.percentage}%` }}
              />
            </div>
            <span className="learning-path-detail-progress-label">
              {parcours.progress.percentage}% complété
            </span>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="learning-path-detail-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'steps'}
          className={`learning-path-detail-tab ${activeTab === 'steps' ? 'active' : ''}`}
          onClick={() => setActiveTab('steps')}
        >
          <Layers size={14} />
          Étapes du parcours
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'project'}
          className={`learning-path-detail-tab ${activeTab === 'project' ? 'active' : ''}`}
          onClick={() => setActiveTab('project')}
        >
          <Target size={14} />
          Projet final
          {!allStepsComplete && (
            <span className="learning-path-detail-badge-locked">
              <Lock size={10} /> Verrouillé
            </span>
          )}
        </button>
      </div>

      {/* CONTENT */}
      <div className="learning-path-detail-content">
        {activeTab === 'steps' && (
          <div className="learning-path-detail-main">
            <div className="learning-path-steps-list">
              {parcours.etapes.map((etape) => {
                const isExpanded = expandedSteps.has(etape.id);
                const stepToneClass =
                  tone === 'warm'
                    ? 'warm-color'
                    : tone === 'sun'
                    ? 'sun-color'
                    : 'primary-color';
                return (
                  <article
                    key={etape.id}
                    className={`learning-path-step-card ${stepToneClass} ${
                      etape.unlocked ? '' : 'locked'
                    }`}
                  >
                    <div className="learning-path-step-header">
                      <div className="learning-path-step-number" aria-hidden="true">
                        {etape.completed ? <CheckCircle2 size={22} /> : etape.number}
                      </div>
                      <div>
                        <h3 className="learning-path-step-title">{etape.title}</h3>
                        <div className="learning-path-step-meta">
                          <span>
                            <BookOpen size={12} />
                            {etape.lecons.length} leçons
                          </span>
                          <span>
                            <Clock3 size={12} />
                            {etape.duration}
                          </span>
                          <span>
                            <CheckCircle2 size={12} />
                            {etape.progress.completed}/{etape.progress.total} complétées
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="learning-path-step-progress">
                      <div className="learning-path-step-progress-bar">
                        <div
                          className={`learning-path-step-progress-fill ${tone}`}
                          style={{ width: `${etape.progress.percentage}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="learning-path-step-toggle"
                      onClick={() => toggleStepExpanded(etape.id)}
                      disabled={!etape.unlocked}
                      aria-expanded={isExpanded}
                    >
                      <span className="learning-path-step-toggle-icon">
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </span>
                      {isExpanded ? 'Masquer les leçons' : 'Afficher les leçons'}
                    </button>

                    {isExpanded && etape.unlocked && (
                      <div className="learning-path-step-lessons">
                        {etape.lecons.map((lecon) => (
                          <div
                            key={lecon.id}
                            className={`learning-path-lesson-item ${lecon.completed ? 'completed' : ''}`}
                          >
                            <span className="learning-path-lesson-icon" aria-hidden="true">
                              {lecon.completed ? (
                                <CheckCircle2 size={16} />
                              ) : (
                                <Play size={14} />
                              )}
                            </span>
                            <div className="learning-path-lesson-info">
                              <h4 className="learning-path-lesson-title">
                                {lecon.number}. {lecon.title}
                              </h4>
                              <span className="learning-path-lesson-duration">
                                <Clock3 size={12} />
                                {lecon.duration}
                              </span>
                            </div>
                            <label className="learning-path-lesson-status">
                              <input
                                type="checkbox"
                                checked={lecon.completed}
                                onChange={() => toggleLessonCompletion(etape.id, lecon.id)}
                                disabled={!etape.unlocked}
                                aria-label={`Marquer "${lecon.title}" comme complétée`}
                              />
                              {lecon.completed && (
                                <span className="learning-path-lesson-checkmark" aria-hidden="true">
                                  <CheckCircle2 size={16} />
                                </span>
                              )}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {!etape.unlocked && (
                      <div className="learning-path-step-locked-message">
                        <Lock size={14} />
                        Complétez l'étape précédente pour déverrouiller
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {carouselItems.length > 0 && (
              <section className="learning-path-complementary-section" aria-label="Ressources complémentaires">
                <h2 className="learning-path-complementary-title">
                  <Library size={18} />
                  Ressources complémentaires
                </h2>
                <p className="learning-path-complementary-subtitle">
                  Approfondissez votre apprentissage avec ces ressources additionnelles.
                </p>
                <div className="learning-path-complementary-grid">
                  {carouselItems.map((item) => {
                    const Icon = RESOURCE_ICON[item.kind];
                    return (
                      <article
                        key={item.id}
                        className={`learning-path-complementary-card ${item.tone}`}
                      >
                        <div className="learning-path-complementary-icon" aria-hidden="true">
                          <Icon size={18} />
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--t-micro)',
                            color: 'var(--text-soft)',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {RESOURCE_LABEL[item.kind]}
                        </span>
                        <h3 className="learning-path-complementary-item-title">{item.title}</h3>
                        <p className="learning-path-complementary-item-description">
                          {item.description}
                        </p>
                        <span className="learning-path-complementary-duration">
                          <Clock3 size={12} />
                          {item.duration}
                        </span>
                        <button type="button" className="learning-path-complementary-cta">
                          Découvrir
                          <ArrowRight size={14} />
                        </button>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'project' && parcours.finalProject && (
          <div className="learning-path-detail-main">
            <div className="learning-path-project-card">
              <div className="learning-path-project-icon" aria-hidden="true">
                <Target size={32} />
              </div>
              <h2 className="learning-path-project-title">{parcours.finalProject.title}</h2>
              <p className="learning-path-project-description">
                {parcours.finalProject.description}
              </p>
              <Button
                variant={tone === 'warm' ? 'warm' : tone === 'sun' ? 'secondary' : 'primary'}
                size="lg"
                disabled={parcours.finalProject.locked}
              >
                {parcours.finalProject.locked ? (
                  <>
                    <Lock size={16} style={{ marginRight: 6 }} />
                    Complétez toutes les étapes pour démarrer
                  </>
                ) : (
                  parcours.finalProject.ctaText
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
