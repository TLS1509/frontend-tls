import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  GraduationCap,
  Lock,
  PlayCircle,
  Target,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const STATIC_COURSE = {
  title: 'Enjeux de la maîtrise du prompt',
  description:
    "Apprenez à structurer vos prompts pour gagner en qualité et en reproductibilité — contenu statique aligné sur Figma CourseDetailPageUpdated.",
  level: 'Débutant',
  duration: '3 h',
  instructor: 'Sophie Martin',
  progress: 0,
};

const STEPS = [
  {
    id: 1,
    title: 'Les fondamentaux du prompt',
    duration: '45 min',
    lessons: [
      { id: 1, title: 'Enjeux de la maîtrise du prompt', duration: '15 min', locked: false, current: true, done: false },
      { id: 2, title: "Dialoguer avec l'IA : concepts", duration: '15 min', locked: false, current: false, done: false },
      { id: 3, title: 'Méthode simple pour bien prompter', duration: '15 min', locked: false, current: false, done: false },
    ],
  },
  {
    id: 2,
    title: 'Devenir prompt designer',
    duration: '1 h 30',
    lessons: [
      { id: 4, title: 'Le rôle (persona)', duration: '15 min', locked: true, current: false, done: false },
      { id: 5, title: 'Le contexte', duration: '15 min', locked: true, current: false, done: false },
    ],
  },
];

/**
 * Détail cours / module — static, parity with figmamakedesignreact CourseDetailPageUpdated (simplified)
 */
export const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openStep, setOpenStep] = useState<number | null>(1);

  return (
    <div className="tls-page">
      <div className="tls-row" style={{ marginBottom: 'var(--s-4)' }}>
        <Button variant="ghost" size="sm" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
          Retour
        </Button>
        <span className="tls-micro">Cours #{id ?? '—'}</span>
      </div>

      <section className="tls-editorial-hero">
        <p className="tls-editorial-eyebrow">Learning Space • Détail du cours</p>
        <h1 style={{ margin: 0 }}>{STATIC_COURSE.title}</h1>
        <p className="tls-editorial-summary">{STATIC_COURSE.description}</p>
        <div className="tls-editorial-meta">
          <Badge variant="info">{STATIC_COURSE.level}</Badge>
          <Badge variant="neutral">
            <Clock size={12} style={{ marginRight: 4 }} />
            {STATIC_COURSE.duration}
          </Badge>
          <span className="tls-micro">
            <GraduationCap size={12} style={{ marginRight: 4 }} />
            Formateur : {STATIC_COURSE.instructor}
          </span>
        </div>
        <div className="tls-actions">
          <Button leadingIcon={<PlayCircle size={18} />}>Continuer la leçon</Button>
          <Button variant="secondary">Voir le badge</Button>
        </div>
      </section>

      <section className="tls-kpi-row" style={{ marginTop: 'var(--s-5)', marginBottom: 'var(--s-6)' }}>
        <Card className="tls-kpi-card">
          <div className="tls-kpi-label">Progression</div>
          <div className="tls-kpi-value">{STATIC_COURSE.progress}%</div>
          <div className="tls-kpi-meta">Parcours statique en cours</div>
        </Card>
        <Card className="tls-kpi-card">
          <div className="tls-kpi-label">Étapes</div>
          <div className="tls-kpi-value">{STEPS.length}</div>
          <div className="tls-kpi-meta">Fondamentaux + application</div>
        </Card>
        <Card className="tls-kpi-card">
          <div className="tls-kpi-label">Leçons</div>
          <div className="tls-kpi-value">{STEPS.reduce((acc, step) => acc + step.lessons.length, 0)}</div>
          <div className="tls-kpi-meta">Format micro-learning guidé</div>
        </Card>
      </section>

      <section className="tls-content-layout">
        <div>
          <section className="course-detail-hero" style={{ marginBottom: 'var(--s-6)' }}>
            <Card className="tls-section-card">
              <h3>
                <Target size={16} /> Objectifs
              </h3>
              <ul className="tls-list">
                <li>Structurer un prompt clair et actionnable</li>
                <li>Itérer à partir de retours utilisateurs</li>
                <li>Adapter le ton et le format de sortie</li>
              </ul>
            </Card>
            <div className="course-detail-thumb">Visuel / miniature du cours</div>
          </section>

          <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Programme</h2>
          {STEPS.map((step) => {
            const open = openStep === step.id;
            return (
              <div key={step.id} className="course-step">
                <button
                  type="button"
                  className="course-step__head"
                  onClick={() => setOpenStep(open ? null : step.id)}
                  aria-expanded={open}
                >
                  <span>
                    <strong>{step.title}</strong>
                    <span className="tls-micro" style={{ display: 'block', marginTop: 4 }}>
                      {step.duration}
                    </span>
                  </span>
                  {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {open && (
                  <div className="course-step__lessons">
                    {step.lessons.map((lesson) => (
                      <div key={lesson.id} className="course-lesson-row">
                        <span>
                          {lesson.locked && <Lock size={14} style={{ marginRight: 8, verticalAlign: 'middle' }} />}
                          {lesson.title}{' '}
                          <span className="tls-micro">({lesson.duration})</span>
                        </span>
                        {lesson.current && <Badge variant="brand">En cours</Badge>}
                        {lesson.done && <Badge variant="success">Fait</Badge>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <aside className="tls-editorial-sticky">
          <Card className="tls-section-card">
            <h3>
              <BookOpen size={16} /> Progression
            </h3>
            <p className="tls-muted">Avancement global du module (statique).</p>
            <p style={{ fontSize: 'var(--t-h2)', fontFamily: 'var(--font-display)', margin: 'var(--s-2) 0' }}>
              {STATIC_COURSE.progress}%
            </p>
            <div className="tls-micro">
              <CheckCircle2 size={12} style={{ marginRight: 4 }} /> Prochaine étape : première leçon
            </div>
          </Card>
          <div className="tls-callout" style={{ marginTop: 'var(--s-4)' }}>
            <p style={{ margin: 0, fontWeight: 600 }}>
              <Sparkles size={14} style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />
              Conseil du formateur
            </p>
            <p className="tls-micro" style={{ marginBottom: 0 }}>
              Commencez avec la leçon 1 puis revenez ici pour dérouler les étapes suivantes.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
};
