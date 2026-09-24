/**
 * Enterprise : Phase 10 Tier 2 refonte.
 *
 * Tableau de bord entreprise (manager / DRH view).
 *
 * Structure (passe typographique du 2026-09-24) :
 *  1. PageHero flat (surtitre + titre + chapô + offre en MetaPill)
 *  2. 3 StatCard neutres (collaborateurs / heures / complétion)
 *  3. Sections h2 hors des cartes : compétences par équipe (heatmap),
 *     classement (rangées, niveau sur 5), membres (rangées), gestion des accès
 *     (rangées + invitation), rapports (2 cartes)
 */

import React, { useState, useMemo } from 'react';
import { Button } from '../components/core/Button';
import { IconChip } from '../components/ui/IconChip';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { Card } from '../components/core/Card';
import { StatCard } from '../components/ui/StatCard';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import type { SelectOption } from '../components/core/Select';
import { FormGroup } from '../components/core/FormGroup';
import { PageHero } from '../components/patterns/EditorialHero';
import { CARD_HOVER_NEUTRE } from '../lib/tone-classes';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { PageShell } from '../components/layout';
import { HeatmapChart, type HeatmapDataPoint } from '../components/charts/HeatmapChart';
import type { BarChartDataPoint } from '../components/charts/BarChart';
import { useEnterpriseStore } from '../stores/persistence';
import { MOCK_COMPANY_ID, MOCK_COMPANY_COHORTS } from '../data/enterprise';
import type { EnterpriseRole } from '../types/learning';
import { useToastContext } from '../contexts/ToastContext';
import {
  Building2,
  Users,
  TrendingUp,
  Clock,
  BarChart2,
  Download,
  Mail,
  UserPlus,
  CheckCircle2,
  Circle,
  ChevronRight,
} from 'lucide-react';

const ROLE_LABEL: Record<EnterpriseRole, string> = {
  admin: 'Admin',
  manager: 'Manager',
  member: 'Membre',
  viewer: 'Invité',
};

const REPORTS = [
  {
    title: 'Formation mensuelle',
    desc: 'Synthèse des heures de formation, modules suivis et taux de complétion par collaborateur.',
    icon: BarChart2,
    period: 'Avril 2026',
  },
  {
    title: 'Engagement équipe',
    desc: 'Analyse des connexions, interactions coaching et progression des compétences clés.',
    icon: TrendingUp,
    period: 'Q1 2026',
  },
];

const ROLE_OPTIONS: SelectOption[] = [
  { value: 'member', label: 'Membre' },
  { value: 'admin',  label: 'Admin' },
];

/* Maturité de démonstration, fixe (voir `heatmapData`). */
const HEATMAP_SKILLS = ['Communication', 'Technique', 'Leadership', 'Gestion', 'Stratégie', 'Innovation'];
const HEATMAP_TEAMS: ReadonlyArray<readonly [string, readonly number[]]> = [
  //              Comm. Tech. Lead. Gest. Strat. Innov.
  ['Direction',   [4,    2,    5,    4,    5,     3]],
  ['Tech',        [2,    5,    3,    3,    2,     4]],
  ['Commerciale', [4,    2,    3,    2,    3,     2]],
  ['Support',     [4,    3,    2,    3,    1,     2]],
  ['Finance',     [2,    3,    2,    5,    3,     1]],
  ['RH',          [5,    1,    3,    4,    2,     2]],
  ['Marketing',   [4,    2,    2,    3,    3,     4]],
  ['Ops',         [3,    3,    2,    4,    2,     2]],
];

/* ── Component ──────────────────────────────────────────────────────────── */

export const Enterprise: React.FC = () => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const toast = useToastContext();
  const enterpriseStore = useEnterpriseStore();
  const members = enterpriseStore.getMembers(MOCK_COMPANY_ID);
  const stats = enterpriseStore.getStats(MOCK_COMPANY_ID);

  const activeMembers = members.filter((m) => m.status === 'active');

  // Maturité par équipe × compétence (échelle Dreyfus 1-5), 8 équipes × 6
  // compétences. Données FIXES : la matrice était tirée par `Math.random()` à
  // chaque rendu, donc un rechargement changeait le diagnostic (« Commerciale »
  // passait de D4 D1 D1 D4 D3 D1 à D4 D4 D4 D2…) — impossible à montrer à un
  // CLO. Retiré le 2026-09-24. Ordre des colonnes = `HEATMAP_SKILLS`.
  const heatmapData: HeatmapDataPoint[] = useMemo(
    () =>
      HEATMAP_TEAMS.flatMap(([team, levels]) =>
        HEATMAP_SKILLS.map((skill, i) => ({ x: skill, y: team, value: levels[i] })),
      ),
    [],
  );

  // Classement des équipes sur leur niveau Dreyfus moyen, lu sur SON échelle
  // (1 à 5). Il était multiplié par 20 pour tenir sur un axe 0–100 sans unité :
  // l'échelle réelle était masquée (audit du 23/09).
  const teamRankingsData: BarChartDataPoint[] = useMemo(() => {
    return MOCK_COMPANY_COHORTS
      .map((cohort) => ({
        label: cohort.name,
        score: cohort.avgDreyfusLevel,
      }))
      .sort((a, b) => b.score - a.score);
  }, []);

  const formatLastActive = (iso?: string) => {
    if (!iso) return '–';
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return 'Hier';
    return `Il y a ${days} jours`;
  };

  const handleHeatmapCellClick = (data: HeatmapDataPoint) => {
    // Navigate to team/member details based on clicked cell
    toast.info(`Clic : ${data.y} — ${data.x} (niveau ${data.value})`, 'Détails compétence');
  };

  /* Passe typographique du 2026-09-24 :
     - le haut de page reprend le padding de `PageShell` ;
     - une section, un titre : « Analyse des compétences » puis, dans la carte,
       « Matrice de compétences par équipe » en h3 à 16 disaient deux fois la
       même chose. Le titre de section nomme le graphique, la méta dit l'échelle ;
     - les titres de section sont des h2 à 28 hors des cartes, « Rapports » compris
       (un h2 fait main à 20) ;
     - trois tons de chiffres côte à côte (teal, orange, or) : l'effet sapin de
       Noël de DESIGN.md § 11 — les chiffres se distinguent par leur libellé ;
     - le rôle et l'offre sont des données : `MetaPill`, plus `Badge` ;
     - un nom de rangée en 600, sa méta à 13 ink-600 (ink-500 = placeholders),
       une seule valeur par barre. */
  return (
    <PageShell width="page">
      <PageHero
        tone="flat"
        eyebrow={{ icon: <Building2 size={14} />, label: 'Tableau de bord entreprise' }}
        title="Espace entreprise"
        summary="Pilotez la formation de votre équipe, gérez les accès et suivez les indicateurs clés."
        trailing={<MetaPill text="Offre Premium Enterprise" tone="neutral" />}
      />

      {/* ── KPIs ──────────────────────────────────────────────── */}
      <section aria-label="Indicateurs clés" className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
        <StatCard
          size="md"
          icon={<Users size={20} />}
          label="Collaborateurs"
          value={String(stats.activeMembers)}
          delta="+3 ce mois-ci"
          deltaDirection="up"
        />
        <StatCard
          size="md"
          icon={<Clock size={20} />}
          label="Heures de formation"
          value={String(stats.totalHours)}
          sub="h"
          delta="+18 % vs M-1"
          deltaDirection="up"
        />
        <StatCard
          size="md"
          icon={<TrendingUp size={20} />}
          label="Taux de complétion"
          value={String(stats.completionRate)}
          sub="%"
          delta="+5 pts"
          deltaDirection="up"
        />
      </section>

      {/* ── Matrice de compétences ───────────────────────────── */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Compétences par équipe" meta="Niveau Dreyfus moyen, de 1 (novice) à 5 (expert)" />
        <Card>
          <div className="overflow-x-auto">
            <HeatmapChart
              data={heatmapData}
              minValue={1}
              maxValue={5}
              cellSize={48}
              showValues={true}
              onCellClick={handleHeatmapCellClick}
            />
          </div>
        </Card>
      </section>

      {/* ── Classement ────────────────────────────────────────── */}
      {/* Quatre équipes rangées : des rangées, chaque niveau écrit au bout de sa
          barre sur l'échelle 1–5. En graphique, l'axe graduait 0 · 0.95 · 1.9 ·
          2.85 · 3.8 — et avant, un « score » ×20 masquait l'échelle réelle. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Classement des équipes" meta="Niveau Dreyfus moyen sur les compétences clés" />
        <Card>
          <ol className="flex flex-col gap-stack" aria-label="Classement des équipes">
            {teamRankingsData.map((team, idx) => (
              <li key={String(team.label)} className="flex flex-col gap-stack-3xs sm:flex-row sm:items-center sm:gap-stack">
                <span className="sm:w-56 sm:shrink-0 flex items-baseline gap-stack-xs">
                  <span className="w-5 shrink-0 text-caption font-semibold text-ink-600 tabular-nums">{idx + 1}</span>
                  <span className="text-body font-semibold text-ink-900">{team.label}</span>
                </span>
                <ProgressBar
                  value={Number(team.score)}
                  max={5}
                  fill="brand"
                  size="md"
                  layout="inline"
                  valueLabel={`${String(team.score).replace('.', ',')} / 5`}
                  aria-label={`${team.label} : niveau moyen`}
                  className="flex-1"
                />
              </li>
            ))}
          </ol>
        </Card>
      </section>

      {/* ── Équipe ────────────────────────────────────────────── */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Membres de l'équipe"
          meta={`${activeMembers.length} collaborateurs actifs`}
          action={
            <Button emphasis="ghost" tone="brand" size="sm" trailingIcon={<ChevronRight size={14} />}>
              Voir tous
            </Button>
          }
        />
        <Card className="p-0">
          <ul className="flex flex-col divide-y divide-ink-100" aria-label="Membres de l'équipe">
            {activeMembers.map((m, idx) => {
              const tints = ['brand', 'warm', 'sun', 'brand', 'warm'] as const;
              return (
                <li key={m.id} className="flex items-center gap-stack px-stack-md sm:px-stack-lg py-stack">
                  <Avatar name={m.name} tint={tints[idx % tints.length]} size="md" />
                  <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                    <p className="font-body text-body font-semibold text-ink-900 truncate">{m.name}</p>
                    <p className="font-body text-caption text-ink-600">{ROLE_LABEL[m.role]}</p>
                  </div>
                  {/* Une valeur par barre, et une seule couleur : la teinte de
                      l'avatar ne dit rien de la progression. */}
                  <ProgressBar
                    value={m.progressPercent}
                    fill="brand"
                    size="sm"
                    layout="inline"
                    aria-label={`Progression de ${m.name}`}
                    className="max-sm:hidden sm:w-48 sm:shrink-0"
                  />
                  <span className="font-body text-caption text-ink-600 whitespace-nowrap shrink-0 hidden md:inline">
                    {formatLastActive(m.lastActiveAt)}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      </section>

      {/* ── Accès & invitations ──────────────────────────────── */}
      {/* Arbitrage n°19 : la page est un tableau de bord de consultation, sans
          `solid` au repos. Le formulaire d'invitation déplié devient l'écran :
          « Envoyer » y est l'aplat, et le bouton d'en-tête, qui dit alors
          « Annuler », forme avec lui la paire (outline neutre). */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Gestion des accès"
          subtitle="Inviter, gérer ou désactiver les comptes."
          action={
            <Button
              emphasis={inviteOpen ? 'outline' : 'soft'}
              tone={inviteOpen ? 'neutral' : 'brand'}
              size="sm"
              leadingIcon={<UserPlus size={14} />}
              onClick={() => setInviteOpen((v) => !v)}
            >
              {inviteOpen ? 'Annuler' : 'Inviter'}
            </Button>
          }
        />
        <Card className="p-0">
          {inviteOpen && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                enterpriseStore.addMember({
                  id: `member-${Date.now()}`,
                  companyId: MOCK_COMPANY_ID,
                  userId: `user-invite-${Date.now()}`,
                  name: inviteEmail.split('@')[0],
                  email: inviteEmail,
                  role: inviteRole as EnterpriseRole,
                  status: 'pending',
                  progressPercent: 0,
                  joinedAt: new Date().toISOString(),
                });
                toast.success(`Invitation envoyée à ${inviteEmail}`, 'Membre invité');
                setInviteOpen(false);
                setInviteEmail('');
              }}
              className="flex flex-col gap-stack px-stack-md sm:px-stack-lg py-stack-lg bg-primary-50/50 border-b border-primary-100"
            >
              <h3 className="font-display text-h3 text-ink-900">
                Inviter un nouveau collaborateur
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_auto] gap-stack-xs sm:items-end">
                <FormGroup label="Adresse email" id="invite-email">
                  <Input
                    id="invite-email"
                    type="email"
                    placeholder="prenom.nom@entreprise.fr"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup label="Rôle" id="invite-role">
                  <Select
                    id="invite-role"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    options={ROLE_OPTIONS}
                  />
                </FormGroup>
                <Button type="submit" emphasis="solid" tone="brand" size="md" leadingIcon={<Mail size={14} />} className="self-stretch sm:self-end">
                  Envoyer
                </Button>
              </div>
            </form>
          )}

          <ul className="flex flex-col divide-y divide-ink-100" aria-label="Comptes">
            {members.map((u) => (
              <li
                key={u.id}
                className="flex flex-wrap items-center gap-x-stack gap-y-stack-xs px-stack-md sm:px-stack-lg py-stack"
              >
                <span className="shrink-0 inline-flex">
                  {u.status === 'active' ? (
                    <CheckCircle2 size={18} className="text-success-fg" aria-hidden="true" />
                  ) : (
                    <Circle size={18} className="text-ink-600" aria-hidden="true" />
                  )}
                </span>
                <div className="flex-1 min-w-40 flex flex-col gap-stack-3xs">
                  <p className="font-body text-body font-semibold text-ink-900">{u.name}</p>
                  <p className="font-body text-caption text-ink-600">{u.email}</p>
                </div>
                <MetaPill text={ROLE_LABEL[u.role]} tone="neutral" />
                <Badge variant={u.status === 'active' ? 'success' : 'warm'}>
                  {u.status === 'active' ? 'Actif' : 'En attente'}
                </Badge>
                {/* L'invitation en attente attend une action : « Renvoyer » est
                    l'action de la rangée (soft). « Contacter » est un outil,
                    présent sur chaque compte actif (ghost). */}
                <Button
                  emphasis={u.status === 'pending' ? 'soft' : 'ghost'}
                  tone="brand"
                  size="sm"
                  leadingIcon={<Mail size={14} />}
                >
                  {u.status === 'pending' ? 'Renvoyer' : 'Contacter'}
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* ── Rapports ──────────────────────────────────────────── */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Rapports"
          action={
            <Button emphasis="ghost" tone="brand" size="sm" trailingIcon={<ChevronRight size={14} />}>
              Voir tous les rapports
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
          {REPORTS.map((r) => {
            const Icon = r.icon;
            return (
              /* Anatomie de carte : titre 20 et sa méta à 4, texte à 12,
                 actions à 24 du contenu. */
              <div
                key={r.title}
                className={`flex flex-col gap-stack-lg p-stack-lg rounded-xl border border-ink-100 bg-white ${CARD_HOVER_NEUTRE} transition-colors duration-base`}
              >
                <div className="flex flex-col gap-stack-sm">
                  <div className="flex items-start gap-stack">
                    <IconChip size="lg" tone="brand">
                      <Icon />
                    </IconChip>
                    <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                      <h3 className="font-display text-h3 text-ink-900">
                        {r.title}
                      </h3>
                      <p className="font-body text-caption text-ink-600">{r.period}</p>
                    </div>
                  </div>
                  <p className="font-body text-body text-ink-700 max-w-prose">
                    {r.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-stack-xs mt-auto">
                  <Button emphasis="soft" tone="warm" size="sm" leadingIcon={<Download size={14} />}>
                    Télécharger
                  </Button>
                  <Button emphasis="ghost" tone="brand" size="sm" trailingIcon={<ChevronRight size={14} />}>
                    Aperçu
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
};

export default Enterprise;
