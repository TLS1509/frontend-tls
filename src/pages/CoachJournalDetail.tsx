import React from 'react';
import { BookOpen, ArrowLeft, Pencil, Calendar, User, Brain } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { PageShell } from '../components/layout';

const ENTRY_CONTENT = [
  "Cette semaine, j'ai pu observer une évolution notable dans la posture de Marie lors des exercices de feedback. Alors qu'elle avait tendance à formuler ses retours de manière très indirecte, elle commence à adopter une communication plus directe tout en préservant la bienveillance du message.",
  "Lors de l'atelier de mardi, elle a pris l'initiative de donner un retour à Thomas sur sa présentation. Ce qui est remarquable, c'est qu'elle a utilisé spontanément la structure « Situation – Comportement – Impact » que nous avions abordée deux semaines plus tôt. C'est un signal fort d'appropriation réelle du contenu.",
  "Un point de vigilance : Marie semble encore hésitante dans les situations où le feedback est potentiellement conflictuel. Elle a tendance à minimiser l'impact négatif observé. Un travail spécifique sur la gestion de l'inconfort émotionnel lors des retours difficiles serait pertinent pour la prochaine session.",
  "Pour la prochaine étape, je propose d'introduire un exercice de jeu de rôle sur les feedback difficiles avec un niveau de résistance simulée de l'interlocuteur. Objectif : renforcer la confiance dans les situations à fort enjeu émotionnel.",
];

const AI_OBSERVATIONS = [
  { label: 'Compétences mentionnées', value: 'Communication assertive, Feedback constructif, Intelligence émotionnelle' },
  { label: 'Tonalité détectée', value: 'Professionnelle · Nuancée · Bienveillante' },
  { label: 'Recommandation IA', value: 'Proposer un parcours complémentaire sur la gestion du conflit interpersonnel' },
];

const COMPETENCY_TAGS = ['Communication', 'Leadership', 'Feedback'];

export default function CoachJournalDetail() {
  return (
    <PageShell width="medium" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow={{ icon: <BookOpen size={14} />, label: 'Coach · Journal' }}
        title="Entrée de Journal"
        summary="Réflexion sur la progression de Marie : 12 mai 2026"
        tone="flat"
        trailing={
          <div className="flex gap-stack-xs">
            <Button variant="glass" leadingIcon={<Pencil size={16} />} size="sm">Modifier</Button>
            <Button variant="glass" leadingIcon={<ArrowLeft size={16} />} size="sm">Retour au journal</Button>
          </div>
        }
      />

      <div className="flex flex-col gap-section">
        <Card>
          <div className="flex flex-col gap-stack">
            <h2 className="font-display font-semibold text-h3 text-ink-900 m-0">
              Réflexion sur la progression de Marie
            </h2>
            <div className="flex items-center gap-stack text-caption text-ink-500">
              <span className="flex items-center gap-tight"><Calendar size={12} /> 12 mai 2026</span>
              <span className="flex items-center gap-tight"><User size={12} /> Marie Dupont</span>
              <Badge variant="warm">Observation</Badge>
            </div>
            <div className="flex flex-col gap-stack-lg">
              {ENTRY_CONTENT.map((paragraph, i) => (
                <p key={i} className="text-body text-ink-700 leading-relaxed m-0">{paragraph}</p>
              ))}
            </div>
          </div>
        </Card>

        <SectionCard
          title="Analyse IA"
          titleIcon={<Brain size={18} />}
          description="Analyse automatique générée par l'assistant pédagogique."
        >
          <div className="flex flex-col gap-stack">
            <AITransparencyLabel variant="assisted" />
            <div className="flex flex-col gap-stack-xs">
              {AI_OBSERVATIONS.map((obs) => (
                <div key={obs.label} className="flex flex-col gap-tight p-3 bg-primary-50 rounded-lg">
                  <span className="text-caption font-semibold text-primary-700 uppercase tracking-wide">{obs.label}</span>
                  <span className="text-body-sm text-ink-700">{obs.value}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Métadonnées"
          titleIcon={<Calendar size={18} />}
        >
          <div className="flex flex-col gap-stack-xs">
            <div className="flex items-center gap-stack text-body-sm text-ink-700">
              <span className="text-ink-500 w-28 shrink-0">Date</span>
              <span>12 mai 2026</span>
            </div>
            <div className="flex items-center gap-stack text-body-sm text-ink-700">
              <span className="text-ink-500 w-28 shrink-0">Apprenant</span>
              <span>Marie Dupont</span>
            </div>
            <div className="flex items-start gap-stack text-body-sm text-ink-700">
              <span className="text-ink-500 w-28 shrink-0 pt-0.5">Compétences</span>
              <div className="flex flex-wrap gap-stack-xs">
                {COMPETENCY_TAGS.map((tag) => (
                  <Badge key={tag} variant="brand">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="flex gap-stack-xs">
          <Button variant="ghost" leadingIcon={<Pencil size={16} />}>Modifier</Button>
          <Button variant="ghost" leadingIcon={<ArrowLeft size={16} />}>Retour au journal</Button>
        </div>
      </div>
    </PageShell>
  );
}
