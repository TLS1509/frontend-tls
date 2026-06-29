import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Send, ChevronLeft, BookOpen, MessageSquare, Star } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { PageShell } from '../components/layout';

// ─── Mock data ────────────────────────────────────────────────────────────────

const SUBMISSION = {
  id: '1',
  apprenantName: 'Sophie Martin',
  apprenantInitials: 'SM',
  exerciceTitle: 'Analyse d\'une situation de management complexe',
  competence: 'Leadership',
  dreyfusLevel: 3,
  submittedAt: '19 mai 2026 à 10h34',
  content: `Dans cette situation, j'ai dû gérer un conflit entre deux membres de mon équipe qui avaient des visions différentes sur la direction du projet.

Contexte : Thomas (développeur senior) et Marie (designer UX) s'opposaient sur l'approche technique vs l'expérience utilisateur. Les réunions devenaient tendues et la productivité de l'équipe en souffrait.

Ma démarche :
1. J'ai organisé des entretiens individuels avec chacun pour comprendre leurs points de vue sans jugement.
2. J'ai facilité une réunion de médiation en posant des questions ouvertes sur les critères de réussite du projet.
3. Nous avons co-construit un document de "principes de collaboration" que l'équipe a validé collectivement.

Résultat : La tension s'est dissipée après 2 semaines. Les deux collaborateurs ont trouvé un terrain d'entente et la qualité du projet s'en est améliorée.

Ce que j'aurais pu faire différemment : intervenir plus tôt au lieu d'attendre que le conflit escalade.`,
  previousFeedback: [],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachCorrectionInterface() {
  const { id } = useParams<{ id: string }>();
  const _ = id;
  const [feedback, setFeedback] = useState('');
  const [dreyfusAssessed, setDreyfusAssessed] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={`Coach · Correction #${SUBMISSION.id}`}
        title="Interface de Correction"
        summary={`${SUBMISSION.exerciceTitle} : ${SUBMISSION.apprenantName}`}
        tone="flat"
        trailing={
          <Button variant="ghost" size="md" leadingIcon={<ChevronLeft size={16} />}>
            Retour à la file
          </Button>
        }
      />

      <PageShell width="wide" noPadTop className="!flex-row md:grid md:grid-cols-[1fr_360px]">

        {/* Main : submitted work */}
        <div className="flex flex-col gap-section">

          {/* Apprenant header */}
          <Card variant="default" className="flex items-center gap-stack p-5">
            <Avatar name={SUBMISSION.apprenantName} initials={SUBMISSION.apprenantInitials} size="lg" />
            <div className="flex flex-col gap-tight flex-1">
              <span className="text-body font-semibold text-ink-900">{SUBMISSION.apprenantName}</span>
              <div className="flex items-center gap-stack-xs">
                <Badge variant="info" size="sm">{SUBMISSION.competence}</Badge>
                <Badge variant="neutral" size="sm">D{SUBMISSION.dreyfusLevel} Compétent</Badge>
                <span className="text-caption text-ink-400">Soumis le {SUBMISSION.submittedAt}</span>
              </div>
            </div>
          </Card>

          {/* Submitted content */}
          <SectionCard title={SUBMISSION.exerciceTitle} titleIcon={<BookOpen size={18} />}>
            <div className="prose prose-sm max-w-none">
              {SUBMISSION.content.split('\n').map((line, i) => (
                line.trim() ? (
                  <p key={i} className="text-body-sm text-ink-700 mb-stack-xs leading-relaxed">{line}</p>
                ) : <br key={i} />
              ))}
            </div>
          </SectionCard>

          {/* Feedback form */}
          {!submitted ? (
            <SectionCard title="Ton feedback" titleIcon={<MessageSquare size={18} />}>
              <div className="flex flex-col gap-stack">
                <FormGroup label="Commentaire général" id="feedback">
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={6}
                    placeholder="Points forts, axes d'amélioration, conseils pratiques..."
                    className="w-full rounded-xl border border-ink-200 px-stack py-3 text-body-sm text-ink-900 focus:outline-none focus:border-primary-400 transition-colors duration-fast resize-none"
                  />
                </FormGroup>

                {/* Dreyfus assessment */}
                <div className="flex flex-col gap-stack-xs">
                  <span className="text-body-sm font-semibold text-ink-700">Évaluation Dreyfus</span>
                  <div className="flex gap-stack-xs">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setDreyfusAssessed(level)}
                        className={[
                          'flex flex-col items-center gap-0.5 px-3 py-stack-xs rounded-xl border transition-all duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                          dreyfusAssessed === level
                            ? 'bg-secondary-500 border-secondary-500 text-white'
                            : 'bg-white border-ink-200 text-ink-600 hover:border-secondary-300',
                        ].join(' ')}
                      >
                        <span className="text-caption font-bold">D{level}</span>
                        <Star size={10} fill={dreyfusAssessed === level ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  variant="warm"
                  size="md"
                  leadingIcon={<Send size={16} />}
                  onClick={handleSubmit}
                  disabled={!feedback.trim()}
                >
                  Envoyer le feedback
                </Button>
              </div>
            </SectionCard>
          ) : (
            <Card variant="tinted" tone="warm" className="flex flex-col items-center gap-stack py-section text-center">
              <div className="w-12 h-12 rounded-full bg-success-bg border border-success-border flex items-center justify-center">
                <Send size={20} className="text-success-fg" />
              </div>
              <div className="flex flex-col gap-tight">
                <p className="text-body font-semibold text-ink-900">Feedback envoyé</p>
                <p className="text-body-sm text-ink-500">Sophie Martin sera notifiée de ta correction.</p>
              </div>
              <Button variant="primary" size="md">
                Exercice suivant
              </Button>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-section sticky top-8">
          <SectionCard title="Critères d'évaluation" titleIcon={<BookOpen size={18} />}>
            <div className="flex flex-col gap-stack-xs">
              {['Analyse du contexte', 'Démarche structurée', 'Réflexivité', 'Plan d\'action concret'].map((c) => (
                <div key={c} className="flex items-center gap-stack-xs text-caption text-ink-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 shrink-0" />
                  {c}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Progression D{SUBMISSION.dreyfusLevel}" titleIcon={<Star size={18} />}>
            <p className="text-caption text-ink-500">
              D{SUBMISSION.dreyfusLevel} Compétent : planifie et adapte selon le contexte. Montre une compréhension des patterns récurrents.
            </p>
          </SectionCard>
        </div>

      </PageShell>
    </div>
  );
}
