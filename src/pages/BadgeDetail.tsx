import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Award, ArrowLeft, ArrowRight, Share2, Lock } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MetaPill } from '../components/ui/MetaPill';
import { EmptyState } from '../components/ui/EmptyState';
import { AchievementBadge } from '../components/ui/AchievementBadge';
import { useGamificationStore, usePasseportStore } from '../stores/persistence';
import { getBadgeDefById } from '../data/gamification';
import { MOCK_USER_ID } from '../data/passeport';
import { DREYFUS_LABELS, getCompetenceById, getDreyfusLevelDef } from '../data/competencies';
import { reconnaissances } from '../lib/reconnaissances';
import { PageShell } from '../components/layout';

/**
 * Détail d'un Open Badge — arbitrage n°18 (2026-09-24, « Reconnaissances »).
 *
 * Un Open Badge a légitimement une page : ce qu'il atteste, qui l'émet, quand,
 * et sur quelles preuves. Ce qu'elle ne montre plus : les points XP du badge,
 * sa « rareté », la part des apprenants qui l'ont obtenu (une rareté de jeu),
 * la galerie des badges voisins. Elle revient vers « Reconnaissances », la
 * section du profil qui les liste.
 *
 * Seuls les badges de compétence — un couple compétence × niveau Dreyfus —
 * sont des reconnaissances. Les anciens badges « plateforme » (séries, XP,
 * premier parcours) et les certifications de parcours, qu'aucun niveau ne
 * porte, renvoient à la section, comme les six routes de gamification.
 */

const RETOUR = '/profile#reconnaissances';

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

/** Ce qui prouve une pratique (PRODUCT.md, Mechanism) : validation, JAC, mission.
 *  Un parcours terminé n'en fait pas partie — le contenu seul ne prouve rien. */
const TYPE_PREUVE: Record<'dreyfus-up' | 'jac' | 'mission', string> = {
  'dreyfus-up': 'Niveau validé',
  jac: 'JAC',
  mission: 'Mission',
};

interface LignePreuve {
  id: string;
  titre: string;
  detail: string;
  type: string;
  date: string;
}

export default function BadgeDetail() {
  const { id } = useParams<{ id: string }>();
  const gamification = useGamificationStore();
  const passeport = usePasseportStore();

  const badge = id ? getBadgeDefById(id) : undefined;

  if (!badge) {
    return (
      <PageShell width="content">
        <EmptyState
          icon={<Award size={32} />}
          title="Badge introuvable"
          description="Tes Open Badges sont listés dans la section Reconnaissances de ton profil."
          actions={<Button emphasis="soft" to={RETOUR}>Voir mes reconnaissances</Button>}
        />
      </PageShell>
    );
  }

  if (badge.type !== 'competence' || !badge.competenceId || !badge.dreyfusLevel) {
    return <Navigate to={RETOUR} replace />;
  }

  // Lecture dans le rendu (pas d'instantané) : une validation faite par le
  // coach apparaît ici sans rechargement.
  const competences = passeport.getCompetencies(MOCK_USER_ID);
  const preuves = passeport.evidence[MOCK_USER_ID] ?? [];
  const reco = reconnaissances(gamification.getBadges(MOCK_USER_ID), competences, preuves)
    .find((r) => r.badgeId === badge.id);
  const obtenu = !!reco;

  const competence = getCompetenceById(badge.competenceId)?.label ?? badge.competenceId;
  const niveau = badge.dreyfusLevel;
  const definition = getDreyfusLevelDef(niveau);
  const niveauPasseport = competences.find((c) => c.competenceId === badge.competenceId)?.currentLevel;

  // Les preuves de la compétence : validations humaines (dialoguées ou
  // certifiantes) et événements de pratique du Passeport. Les traces légères
  // (révisions, quiz) n'affirment aucun niveau : elles restent au Passeport.
  const lignes: LignePreuve[] = [
    ...passeport
      .getEvidence(MOCK_USER_ID, badge.competenceId)
      .filter((e) => e.regime !== 'light')
      .map((e) => ({
        id: e.id,
        titre: e.sourceLabel,
        detail: e.verifiedByName ? `Validé par ${e.verifiedByName}` : '',
        type: e.assertedLevel != null ? `D${e.assertedLevel} validé` : 'Validation',
        date: e.occurredAt,
      })),
    ...passeport
      .getProgressions(MOCK_USER_ID)
      .filter((p) => p.competenceId === badge.competenceId && p.type !== 'formation')
      .map((p) => ({
        id: p.id,
        titre: p.title,
        detail: p.detail,
        type: TYPE_PREUVE[p.type as keyof typeof TYPE_PREUVE],
        date: p.occurredAt,
      })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${competence} · D${niveau}`, text: badge.description, url });
      } catch {
        /* partage annulé */
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        /* presse-papiers indisponible */
      }
    }
  };

  return (
    /* Une page de lecture : pas d'aplat (arbitrage n°19). Le retour est le
       tertiaire (`ghost` neutre, un lien calé sur le bord du texte par
       `flush`) ; partager, l'action de contexte (`soft`). La colonne
       est celle du profil qu'on quitte (`content`) : étiquette et valeur de
       l'émission restent à portée d'œil, au lieu de 1 000 px d'écart. */
    <PageShell width="content">
      <EditorialHero
        eyebrow={{ label: 'Reconnaissances · Open Badge', icon: <Award size={14} /> }}
        title={competence}
        summary={badge.description}
        tone="flat"
        trailing={
          <div className="flex flex-wrap items-center gap-stack-xs">
            <Button emphasis="ghost" tone="neutral" size="md" flush="start" leadingIcon={<ArrowLeft size={16} />} to={RETOUR}>
              Mes reconnaissances
            </Button>
            {obtenu && (
              <Button emphasis="soft" size="md" leadingIcon={<Share2 size={16} />} onClick={handleShare}>
                Partager
              </Button>
            )}
          </div>
        }
      />

      {/* Le badge, puis ce que son niveau atteste — la définition Dreyfus du
          référentiel, là où la page affichait ses points et sa rareté. */}
      <div className="flex flex-col md:flex-row gap-page md:gap-section items-start">
        <div className="shrink-0 self-center md:self-start">
          <AchievementBadge
            title={`D${niveau} · ${DREYFUS_LABELS[niveau]}`}
            icon={<Award size={48} />}
            color="primary"
            size="lg"
            isLocked={!obtenu}
            unlockedDate={reco?.obtenuLe}
          />
        </div>

        <section className="flex flex-col gap-stack flex-1 min-w-0">
          <SectionHeader title="Ce que ce niveau atteste" />
          <Card className="flex flex-col gap-stack">
            <p className="text-body text-ink-900 max-w-prose">{definition.criteria}</p>
            {definition.indicators && definition.indicators.length > 0 && (
              <ul className="flex flex-col gap-stack-xs list-disc pl-stack-lg marker:text-ink-500">
                {definition.indicators.map((ind) => (
                  <li key={ind} className="text-body text-ink-700 max-w-prose">{ind}</li>
                ))}
              </ul>
            )}
          </Card>
        </section>
      </div>

      {/* L'émission : qui, quand, et le niveau que le Passeport tient. Étiquette
          et valeur sur la même ligne de base. On ne nomme un validateur que si
          le Passeport l'a enregistré. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Émission" />
        <Card className="p-0 gap-0 overflow-hidden">
          <dl className="divide-y divide-ink-100">
            {[
              { label: 'Émetteur', valeur: 'The Learning Society' },
              {
                label: 'Obtenu le',
                valeur: reco ? formatDate(reco.obtenuLe) : 'Pas encore obtenu',
              },
              {
                label: 'Validé par',
                valeur: reco?.validation
                  ? `${reco.validation.par}, le ${formatDate(reco.validation.le)}`
                  : 'Non renseigné dans ton Passeport',
              },
              {
                label: 'Niveau au Passeport',
                valeur: niveauPasseport != null
                  ? `D${niveauPasseport} · ${DREYFUS_LABELS[niveauPasseport]}, validé`
                  : 'Pas encore validé',
              },
            ].map((l) => (
              <div key={l.label} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-stack gap-y-stack-3xs px-stack-lg py-stack">
                <dt className="text-body text-ink-700">{l.label}</dt>
                <dd className="text-body font-semibold text-ink-900 sm:text-right">{l.valeur}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </section>

      {/* Les preuves : des rangées dans une carte (arbitrage n°5). */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Preuves"
          subtitle="Validations et pratiques enregistrées dans ton Passeport pour cette compétence."
          action={
            <Button emphasis="ghost" size="sm" trailingIcon={<ArrowRight size={14} />} to={`/passeport/competence/${badge.competenceId}`}>
              Voir au Passeport
            </Button>
          }
        />
        {lignes.length > 0 ? (
          <Card className="p-0 gap-0 overflow-hidden">
            <ul className="divide-y divide-ink-100">
              {lignes.map((l) => (
                <li key={l.id} className="flex flex-wrap items-center justify-between gap-x-stack gap-y-stack-xs px-stack-lg py-stack">
                  <div className="flex flex-col gap-stack-3xs min-w-0">
                    <span className="text-body font-semibold text-ink-900">{l.titre}</span>
                    <span className="text-caption text-ink-600">
                      {formatDate(l.date)}
                      {l.detail ? ` · ${l.detail}` : ''}
                    </span>
                  </div>
                  <MetaPill text={l.type} tone="brand" className="shrink-0" />
                </li>
              ))}
            </ul>
          </Card>
        ) : (
          <p className="text-body text-ink-700 max-w-prose">
            Aucune preuve n'est encore enregistrée dans ton Passeport pour cette compétence.
          </p>
        )}
      </section>

      {/* Critères — chaque critère est le contenu principal (ink-900). */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Critères d'obtention" />
        <Card>
          <ul className="flex flex-col gap-stack-xs">
            {badge.criteria.map((c, i) => (
              <li key={i} className="flex items-start gap-stack-sm">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-pill text-caption font-bold tabular-nums shrink-0 mt-px ${obtenu ? 'bg-success-bg text-success-fg' : 'bg-ink-100 text-ink-700'}`}>
                  {obtenu ? '✓' : i + 1}
                </span>
                <span className="text-body text-ink-900">{c}</span>
              </li>
            ))}
          </ul>
          {!obtenu && (
            <p className="mt-stack text-caption text-ink-600 inline-flex items-center gap-stack-3xs">
              <Lock size={14} aria-hidden="true" />
              Le badge s'obtient une fois le niveau D{niveau} validé dans ton Passeport.
            </p>
          )}
        </Card>
      </section>
    </PageShell>
  );
}
