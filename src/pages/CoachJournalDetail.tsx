import React from 'react';
import { BookOpen, ArrowLeft, Pencil, Calendar, User } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { PageShell } from '../components/layout';

const ENTRY_CONTENT = [
  "Cette semaine, j'ai pu observer une évolution notable dans la posture de Marie lors des exercices de feedback. Alors qu'elle avait tendance à formuler ses retours de manière très indirecte, elle commence à adopter une communication plus directe tout en préservant la bienveillance du message.",
  "Lors de l'atelier de mardi, elle a pris l'initiative de donner un retour à Thomas sur sa présentation. Ce qui est remarquable, c'est qu'elle a utilisé spontanément la structure « Situation – Comportement – Impact » que nous avions abordée deux semaines plus tôt. C'est un signal fort d'appropriation réelle du contenu.",
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
    /* L'entrée est la page : son titre devient le h1 (il était répété en h2
       de 20 px dans la carte, sous un h1 générique « Entrée de Journal »).
       Date, apprenant et catégorie sont des données : la ligne de méta de
       l'en-tête. Les boutons Modifier / Retour n'apparaissent plus qu'une fois. */
    <PageShell width="medium" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow={{ icon: <BookOpen size={14} />, label: 'Coach · Journal' }}
        title="Réflexion sur la progression de Marie"
        meta={[
          { icon: <Calendar size={14} aria-hidden="true" />, label: '12 mai 2026' },
          { icon: <User size={14} aria-hidden="true" />, label: 'Marie Dupont' },
          { label: 'Observation' },
        ]}
        tone="flat"
        trailing={
          <div className="flex flex-wrap gap-stack-xs">
            <Button emphasis="soft" leadingIcon={<Pencil size={16} />}>Modifier</Button>
            <Button emphasis="outline" leadingIcon={<ArrowLeft size={16} />}>Retour au journal</Button>
          </div>
        }
      />

      {/* Le texte de l'entrée : 16 px ink-900, à la largeur de lecture, une
          ligne (16 px) entre deux paragraphes — il courait sur 970 px, à 24 px
          d'écart. */}
      <Card>
        <div className="flex flex-col gap-stack max-w-prose">
          {ENTRY_CONTENT.map((paragraph, i) => (
            <p key={i} className="text-body text-ink-900">{paragraph}</p>
          ))}
        </div>
      </Card>

      {/* Analyse IA : une section (titre h2 hors de la carte), l'étiquette IA à
          sa place d'action — elle s'étirait en barre sur toute la largeur. Les
          observations forment une liste de définitions : le libellé en légende
          600 ink-600, en casse normale (il était en capitales teal, le registre
          d'une étiquette), la valeur en 16 ink-900. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Analyse IA"
          subtitle="Analyse automatique générée par l'assistant pédagogique."
          size="md"
          action={<AITransparencyLabel variant="assisted" size="sm" />}
        />
        <Card className="p-0">
          <dl className="flex flex-col divide-y divide-ink-100">
            {AI_OBSERVATIONS.map((obs) => (
              <div key={obs.label} className="flex flex-col gap-stack-3xs px-stack-md sm:px-stack-lg py-stack">
                <dt className="text-caption font-semibold text-ink-600">{obs.label}</dt>
                <dd className="text-body text-ink-900 max-w-prose">{obs.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </section>

      {/* « Métadonnées » répétait la date et l'apprenant de l'en-tête : il ne
          reste que ce qu'elle ajoute, les compétences — des données, donc des
          MetaPill, plus des pastilles d'état en capitales. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Compétences" meta={`${COMPETENCY_TAGS.length} compétences associées à l'entrée`} size="md" />
        <MetaPillGroup items={COMPETENCY_TAGS.map((tag) => ({ text: tag, tone: 'primary' as const }))} />
      </section>
    </PageShell>
  );
}
