import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Send, ChevronLeft, BookOpen, Star } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { IconChip } from '../components/ui/IconChip';
import { Avatar } from '../components/ui/Avatar';
import { DreyfusSlider } from '../components/ui/DreyfusSlider';
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

  /* La soumission, en paragraphes : les lignes vides ne sont plus des <br>
     posés sous des marges — un seul écart de 16 px entre deux paragraphes
     (doctrine § 3). */
  const paragraphes = SUBMISSION.content.split('\n').filter((line) => line.trim());

  return (
    /* PageShell enveloppe TOUTE la page : l'en-tête vivait au-dessus, sans
       marge haute (le surtitre touchait le bord), et le contenu commençait
       72 px plus bas (32 + le padding haut de PageShell). La grille à deux
       colonnes ne s'ouvre qu'à partir de lg : `!flex-row` posait la colonne
       des critères À CÔTÉ de la soumission à 375 px (débordement). */
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      {/* Le titre est l'exercice — ce qu'on corrige —, plus le nom de l'écran
          (« Interface de Correction »). L'apprenant, la compétence, le niveau et
          la date sont des données : la ligne de méta de l'en-tête, en légende.
          La carte qui les portait en pastilles d'état disparaît avec eux. */}
      <EditorialHero
        eyebrow="Coach · Correction"
        title={SUBMISSION.exerciceTitle}
        meta={[
          { icon: <Avatar name={SUBMISSION.apprenantName} initials={SUBMISSION.apprenantInitials} size="xs" />, label: SUBMISSION.apprenantName },
          { label: `${SUBMISSION.competence} · D${SUBMISSION.dreyfusLevel} Compétent` },
          { label: `Soumis le ${SUBMISSION.submittedAt}` },
        ]}
        tone="flat"
        /* Arbitrage n°19 : le retour est un `ghost` neutre, calé sur le bord
           du texte (`flush="start"` rattrape son padding) ; le seul `solid`
           de l'écran est l'envoi du feedback (puis « Exercice suivant »). */
        trailing={
          <Button emphasis="ghost" tone="neutral" size="md" leadingIcon={<ChevronLeft size={16} />} flush="start">
            Retour à la file
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-page lg:gap-section items-start">
        <div className="flex flex-col gap-page min-w-0">
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Soumission" size="md" />
            <Card>
              <div className="flex flex-col gap-stack max-w-prose">
                {paragraphes.map((line, i) => (
                  <p key={i} className="text-body text-ink-900">{line}</p>
                ))}
              </div>
            </Card>
          </section>

          {!submitted ? (
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Votre feedback" size="md" />
              <Card className="flex flex-col gap-stack-lg">
                {/* `Input multiline` : le cadre suit sa zone de texte depuis
                    f5c99c2a. La zone faite main qui le contournait (quand le
                    cadre restait à 96 px) n'a plus de raison d'être. */}
                <FormGroup label="Commentaire général" id="feedback">
                  <Input
                    id="feedback"
                    multiline
                    rows={6}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Points forts, axes d'amélioration, conseils pratiques…"
                  />
                </FormGroup>

                {/* Libellé 16/600 ink-900, comme celui d'un champ. */}
                <div className="flex flex-col gap-stack-xs">
                  <span className="text-body font-semibold text-ink-900">Évaluation Dreyfus</span>
                  <DreyfusSlider
                    value={dreyfusAssessed ?? undefined}
                    onChange={setDreyfusAssessed}
                    variant="solid"
                    tone="warm"
                    aria-label="Évaluation Dreyfus"
                  />
                </div>

                <Button
                  emphasis="solid"
                  tone="warm"
                  size="md"
                  leadingIcon={<Send size={16} />}
                  onClick={handleSubmit}
                  disabled={!feedback.trim()}
                  className="self-start"
                >
                  Envoyer le feedback
                </Button>
              </Card>
            </section>
          ) : (
            <Card variant="tinted" tone="warm" className="flex flex-col items-center gap-stack py-section text-center">
              <IconChip size="lg" tone="success">
                <Send />
              </IconChip>
              <div className="flex flex-col gap-stack-3xs">
                <p className="text-body font-semibold text-ink-900">Feedback envoyé</p>
                <p className="text-body text-ink-700">Sophie Martin sera notifiée de votre correction.</p>
              </div>
              <Button emphasis="solid" tone="brand" size="md">
                Exercice suivant
              </Button>
            </Card>
          )}
        </div>

        {/* Les repères du correcteur : deux blocs (h3) à côté du travail. Leur
            texte se lit — 16 px, plus 13 en légende. */}
        <aside className="flex flex-col gap-stack lg:sticky lg:top-8" aria-label="Repères de correction">
          <SectionCard title="Critères d'évaluation" titleIcon={<BookOpen size={18} />}>
            <ul className="flex flex-col gap-stack-xs">
              {['Analyse du contexte', 'Démarche structurée', 'Réflexivité', 'Plan d\'action concret'].map((c) => (
                <li key={c} className="flex items-start gap-stack-xs text-body text-ink-700">
                  <span className="shrink-0 inline-flex items-center h-lh" aria-hidden="true">
                    <span className="w-1.5 h-1.5 rounded-pill bg-secondary-500" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title={`Progression D${SUBMISSION.dreyfusLevel}`} titleIcon={<Star size={18} />}>
            <p className="text-body text-ink-700">
              D{SUBMISSION.dreyfusLevel} Compétent : planifie et adapte selon le contexte. Montre une compréhension des patterns récurrents.
            </p>
          </SectionCard>
        </aside>
      </div>
    </PageShell>
  );
}
