import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { StatCard } from '../components/ui/StatCard';
import { Pagination } from '../components/ui/Pagination';
import { Avatar } from '../components/ui/Avatar';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { MetaPill, type MetaPillTone } from '../components/ui/MetaPill';
import { Flame, Medal, Trophy, Users, Zap, Star } from 'lucide-react';
import { useGamificationStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { buildLeaderboard, type LeaderboardRow } from '../data/apprenants';
import { PageShell } from '../components/layout';

const PERIODS = [
  { id: 'week'  as const, label: 'Cette semaine' },
  { id: 'month' as const, label: 'Ce mois' },
  { id: 'all'   as const, label: 'Tout temps' },
];

const PODIUM_CONFIG = [
  {
    label: '1er',
    pillTone: 'sun' as MetaPillTone,
    rankClasses: 'bg-accent-700 text-white',
    cardClasses: 'bg-gradient-to-br from-accent-100 to-white border border-accent-300',
    avatarClasses: 'bg-accent-100 border-2 border-accent-300 text-accent-800',
    pillClasses: 'bg-accent-100 text-accent-800',
    badgeClasses: 'bg-accent-100 text-accent-800 border border-accent-300 rounded-pill px-3 py-1',
    iconClasses: 'text-accent-600',
  },
  {
    label: '2ème',
    pillTone: 'neutral' as MetaPillTone,
    rankClasses: 'bg-ink-600 text-white',
    cardClasses: 'bg-gradient-to-br from-ink-100 to-white border border-ink-300',
    avatarClasses: 'bg-ink-100 border-2 border-ink-300 text-ink-600',
    pillClasses: 'bg-ink-100 text-ink-600',
    badgeClasses: 'bg-ink-100 text-ink-600 border border-ink-300 rounded-pill px-3 py-1',
    iconClasses: 'text-ink-500',
  },
  {
    label: '3ème',
    pillTone: 'warm' as MetaPillTone,
    rankClasses: 'bg-secondary-700 text-white',
    cardClasses: 'bg-gradient-to-br from-secondary-100 to-white border border-secondary-300',
    avatarClasses: 'bg-secondary-100 border-2 border-secondary-300 text-secondary-700',
    pillClasses: 'bg-secondary-100 text-secondary-700',
    badgeClasses: 'bg-secondary-100 text-secondary-700 border border-secondary-300 rounded-pill px-3 py-1',
    iconClasses: 'text-secondary-600',
  },
];

/* Dix rangs par page : en rangées de ~64 px, la page tient ce que quatre
   cartes de 224 px tenaient à peine. */
const ITEMS_PER_PAGE = 10;

export const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const gamificationStore = useGamificationStore();
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('week');
  const [rankPage, setRankPage] = useState(1);

  // Phase 16.5 #3 : live ranking built from shared APPRENANTS + current user state
  const currentUserXP = gamificationStore.getTotalXP(MOCK_USER_ID);
  const currentUserStreak = gamificationStore.getStreak(MOCK_USER_ID);
  const currentUserBadges = gamificationStore.getBadges(MOCK_USER_ID);

  const fullRanking = useMemo<LeaderboardRow[]>(
    () =>
      buildLeaderboard({
        currentUserName: 'Toi',
        currentUserInitials: 'VT',
        currentUserXP,
        currentUserStreak: currentUserStreak.currentStreak,
        currentUserBadgeCount: currentUserBadges.length,
      }),
    [currentUserXP, currentUserStreak.currentStreak, currentUserBadges.length],
  );

  const podium = fullRanking.slice(0, 3);
  const restRanking = fullRanking.slice(3);
  const currentUserRow = fullRanking.find((r) => r.isCurrentUser);
  const totalRankPages = Math.ceil(restRanking.length / ITEMS_PER_PAGE);
  const paginatedRanking = restRanking.slice(
    (rankPage - 1) * ITEMS_PER_PAGE,
    rankPage * ITEMS_PER_PAGE,
  );

  return (
    /* Haut de page de la coque (il était réécrit à la main). Mots et ordre
       des blocs inchangés (arbitrage n°18 en cours) : typographie et rythme. */
    <PageShell width="wide" className="relative z-base">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <EditorialHero
          tone="flat"
          eyebrow={{ icon: <Trophy size={14} />, label: 'Progression communauté' }}
          title="Leaderboard"
          summary="Classement communautaire : les apprenants les plus engagés mis à l'honneur."
        />

        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-stack">
          <StatCard
            variant="brand"
            size="sm"
            icon={<Users strokeWidth={1.8} />}
            value={fullRanking.length}
            label="Participants"
          />
          <StatCard
            variant="warm"
            size="sm"
            icon={<Trophy strokeWidth={1.8} />}
            value={currentUserRow ? `#${currentUserRow.rank}` : ':'}
            label="Ton classement"
          />
          <StatCard
            variant="sun"
            size="sm"
            icon={<Zap strokeWidth={1.8} />}
            value={currentUserXP.toLocaleString('fr-FR')}
            label="Ton XP total"
          />
          <StatCard
            variant="sun"
            size="sm"
            icon={<Flame strokeWidth={1.8} />}
            value={`${currentUserStreak.longestStreak}j`}
            label="Meilleur streak"
          />
        </div>

        {/* Le classement est UNE section : son titre (h2 28 — il était un h2 à
            20, serré par `tracking-tight`) et son sélecteur de période, puis le
            podium à 16, la suite à 24. Ils se suivaient à 48 chacun, et le
            titre flottait entre les chiffres et le podium (54 / 56). Le
            sélecteur fait main devient `SegmentedControl` (rail 36, rayon 14). */}
        <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Classement"
          action={
            <SegmentedControl
              size="sm"
              aria-label="Période du classement"
              options={PERIODS.map((p) => ({ value: p.id, label: p.label }))}
              value={period}
              onChange={setPeriod}
            />
          }
        />

        {/* Podium Cards */}
        <div className="grid grid-cols-1 gap-stack sm:grid-cols-3">
          {podium.map((entry, index) => {
            const pod = PODIUM_CONFIG[index];
            return (
              <Card
                key={entry.id}
                className={`p-stack-lg flex flex-col gap-stack cursor-default ${pod.cardClasses}`}
              >
                {/* Rank badge + points */}
                <div className="flex items-center justify-between">
                  <span className={['inline-flex items-center justify-center w-10 h-10 rounded-md font-display text-h3 leading-none tabular-nums', pod.rankClasses].join(' ')}>
                    #{index + 1}
                  </span>
                  <span className={`text-caption font-semibold tabular-nums ${pod.badgeClasses}`}>
                    {entry.points} pts
                  </span>
                </div>

                {/* Avatar + name */}
                <div className="flex items-center gap-stack-xs">
                  {/* Initiales en 600, celle de l'`Avatar` (elles étaient en 800,
                      le registre du site). */}
                  <div className={`w-12 h-12 rounded-pill flex items-center justify-center text-body font-semibold shrink-0 ${pod.avatarClasses}`}>
                    {entry.initials}
                  </div>
                  <div className="flex flex-col gap-stack-3xs">
                    <p className="font-body text-body font-semibold text-ink-900">{entry.name}</p>
                    <p className="font-body text-caption text-ink-600">{pod.label} du classement</p>
                  </div>
                </div>

                {/* Stats pills — des données : MetaPill (24 px, la donnée
                    chuchote). Les pastilles faites main faisaient 32 px, en
                    13/600, au poids des actions. */}
                <div className="flex items-center gap-stack-xs flex-wrap">
                  <MetaPill icon={<Flame />} text={`${entry.streak}j streak`} tone={pod.pillTone} />
                  <MetaPill icon={<Star />} text={`Niv.\u00a0${entry.level}`} tone={pod.pillTone} />
                  <MetaPill icon={<Zap />} text={`${entry.xp.toLocaleString('fr-FR')} XP`} tone={pod.pillTone} />
                </div>

                <Button
                  size="sm"
                  emphasis="soft" tone="warm"
                  className="self-start"
                  onClick={() => !entry.isCurrentUser && navigate(`/coach/apprenant/${entry.id}`)}
                  disabled={entry.isCurrentUser}
                >
                  <Medal size={14} /> Voir le profil
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Full ranking list — 24 sous le podium (16 + 8) : deux ensembles de
            la même section. */}
        <div className="flex flex-col gap-stack mt-stack-xs">
          {/* Current user banner : only show if they're not on the podium */}
          {currentUserRow && currentUserRow.rank > 3 && (
            <Card variant="tinted" tone="primary" className="flex items-center gap-stack p-stack-md">
              <div className="w-10 h-10 rounded-pill bg-gradient-to-br from-primary-700 to-secondary-700 flex items-center justify-center text-white font-semibold text-body shrink-0">
                {currentUserRow.initials}
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                <div className="font-body text-body font-semibold text-ink-900">{currentUserRow.name}</div>
                <div className="font-body text-caption text-ink-600 tabular-nums">
                  Niveau {currentUserRow.level} · {currentUserRow.xp.toLocaleString('fr-FR')} XP
                </div>
              </div>
              {/* Le rang à l'encre du cran 800 (la marque ne porte de texte qu'à
                  ce cran ; il était au 600, à 3,66:1). */}
              <div className="text-right flex flex-col gap-stack-3xs">
                <div className="font-display text-h3 text-primary-800 tabular-nums">
                  #{currentUserRow.rank}
                </div>
                <div className="font-body text-caption text-ink-600">classement</div>
              </div>
            </Card>
          )}

          {/* Les rangs 4 et suivants forment une collection qu'on parcourt :
              des rangées dans UNE carte (arbitrage n°5 du 23/09). Le podium,
              lui, reste en cartes — trois objets mis en avant. La carte clippe
              ses coins : le fond de ta rangée épouse son arc intérieur. */}
          {paginatedRanking.length > 0 && (
            <Card className="p-0 overflow-hidden">
              <ol className="flex flex-col divide-y divide-ink-100" aria-label="Suite du classement">
                {paginatedRanking.map((entry) => (
                  <li
                    key={entry.id}
                    aria-current={entry.isCurrentUser ? 'true' : undefined}
                    className={[
                      'flex items-center gap-stack-sm px-stack-md sm:px-stack-lg py-stack-sm',
                      entry.isCurrentUser ? 'bg-primary-50' : '',
                    ].join(' ')}
                  >
                    <span className="w-8 shrink-0 font-display text-body font-bold tabular-nums text-ink-600">
                      #{entry.rank}
                    </span>
                    {/* À 375 px, l'avatar coûtait 44 px au nom : il n'apparaît qu'à partir
                        de sm. Masqué par un enveloppant — `hidden` posé sur l'Avatar perdrait
                        contre son `inline-flex` (même spécificité, piège n°6). */}
                    <span className="hidden sm:block shrink-0">
                      <Avatar initials={entry.initials} size="sm" />
                    </span>
                    {/* Nom en 600 (l'emphase du corps ; 700 est celui des titres),
                        méta en ink-600 sur toutes les rangées. */}
                    <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                      <p className="font-body text-body font-semibold text-ink-900 truncate">{entry.name}</p>
                      <p className="font-body text-caption text-ink-600 truncate tabular-nums">
                        Niveau {entry.level} · {entry.xp.toLocaleString('fr-FR')} XP
                      </p>
                    </div>
                    <span className="shrink-0 font-body text-body font-semibold tabular-nums text-primary-800">
                      {entry.points} pts
                    </span>
                    <Button
                      size="sm"
                      emphasis="outline"
                      className="shrink-0"
                      aria-label={entry.isCurrentUser ? 'Voir ton profil' : `Voir le profil de ${entry.name}`}
                      onClick={() =>
                        entry.isCurrentUser
                          ? navigate('/profile/badges/competences')
                          : navigate(`/coach/apprenant/${entry.id}`)
                      }
                    >
                      Voir
                    </Button>
                  </li>
                ))}
              </ol>
            </Card>
          )}

          {totalRankPages > 1 && (
            <Pagination
              page={rankPage}
              totalPages={totalRankPages}
              onChange={setRankPage}
              info={<span className="text-caption text-ink-600">{restRanking.length} participants</span>}
            />
          )}
        </div>

        </section>

        {/* Weekly goal */}
        {/* Anatomie de carte : pastille (40, carrée) sur la première ligne du
            titre, titre → texte 4, contenu → action 24 ; l'action garde sa
            largeur. Le texte était en ink-500 (4,14:1 sur le fond teinté).
            L'étincelle, réservée aux fonctions d'IA, quitte le titre. */}
        <Card variant="tinted" tone="primary" className="p-stack-lg flex flex-col gap-stack-lg">
          <div className="flex items-start gap-stack-sm">
            <div className="w-10 h-10 rounded-md bg-primary-100 text-primary-800 flex items-center justify-center shrink-0">
              <Zap size={20} strokeWidth={1.8} />
            </div>
            <div className="flex flex-col gap-stack-3xs min-w-0 mt-[7px]">
              <h3 className="font-display text-h3 text-ink-900">
                Objectif de la semaine
              </h3>
              <p className="font-body text-body text-ink-700 max-w-prose">
                Valide 3 activités réflexives et 2 modules pour intégrer le top 3.
              </p>
            </div>
          </div>
          <Button onClick={() => navigate('/learning-paths')} className="self-start">Continuer mon parcours</Button>
        </Card>
    </PageShell>
  );
};
