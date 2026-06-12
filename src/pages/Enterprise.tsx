/**
 * Enterprise : Phase 10 Tier 2 refonte.
 *
 * Tableau de bord entreprise (manager / DRH view).
 *
 * Structure :
 *  1. EditorialHero brand (tone=brand, eyebrow + title + summary + Badge premium)
 *  2. 3 StatCard (collaborateurs / heures / complétion)
 *  3. SectionCard "Équipe" : liste membres avec Avatar + ProgressBar
 *  4. SectionCard "Accès" : Invite form (FormGroup+Input+Select) + user rows
 *  5. SectionCard "Rapports" : 2 cards
 */

import React, { useState } from 'react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import type { SelectOption } from '../components/core/Select';
import { FormGroup } from '../components/core/FormGroup';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Container } from '../components/layout';
import { useEnterpriseStore } from '../stores/persistence';
import { MOCK_COMPANY_ID } from '../data/enterprise';
import type { EnterpriseRole } from '../types/learning';
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

/* ── Component ──────────────────────────────────────────────────────────── */

export const Enterprise: React.FC = () => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const enterpriseStore = useEnterpriseStore();
  const members = enterpriseStore.getMembers(MOCK_COMPANY_ID);
  const stats = enterpriseStore.getStats(MOCK_COMPANY_ID);

  const activeMembers = members.filter((m) => m.status === 'active');

  const formatLastActive = (iso?: string) => {
    if (!iso) return '–';
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return 'Hier';
    return `Il y a ${days} jours`;
  };

  return (
    <div className="min-h-[100dvh] bg-surface">
      <Container width="page" className="py-section flex flex-col gap-section">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <EditorialHero
          tone="brand"
          eyebrow={{ icon: <Building2 size={12} />, label: 'Tableau de bord entreprise' }}
          title="Espace Entreprise"
          summary="Pilotez la formation de votre équipe, gérez les accès et suivez les indicateurs clés en temps réel."
          trailing={<Badge variant="brand" className="bg-white/20 text-white border-white/30">Premium Enterprise</Badge>}
        />

        {/* ── KPIs ──────────────────────────────────────────────── */}
        <section aria-label="Indicateurs clés" className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard
            variant="brand"
            size="md"
            icon={<Users size={20} />}
            label="Collaborateurs"
            value={String(stats.activeMembers)}
            delta="+3 ce mois-ci"
            deltaDirection="up"
          />
          <StatCard
            variant="warm"
            size="md"
            icon={<Clock size={20} />}
            label="Heures de formation"
            value={String(stats.totalHours)}
            sub="h"
            delta="+18 % vs M-1"
            deltaDirection="up"
          />
          <StatCard
            variant="sun"
            size="md"
            icon={<TrendingUp size={20} />}
            label="Taux de complétion"
            value={String(stats.completionRate)}
            sub="%"
            delta="+5 pts"
            deltaDirection="up"
          />
        </section>

        {/* ── Équipe ────────────────────────────────────────────── */}
        <SectionCard
          title="Membres de l'équipe"
          titleIcon={<Users size={18} className="text-primary-600" />}
          description={`${activeMembers.length} collaborateurs actifs`}
          headerAction={
            <Button variant="ghost" size="sm" trailingIcon={<ChevronRight size={13} />}>
              Voir tous
            </Button>
          }
        >
          <div className="flex flex-col -mx-5 sm:-mx-6 -mb-5 sm:-mb-stack-lg">
            {activeMembers.map((m, idx) => {
              const tones = ['brand', 'warm', 'sun', 'brand', 'warm'] as const;
              const tone = tones[idx % tones.length];
              return (
                <div
                  key={m.id}
                  className={[
                    'flex items-center gap-stack px-5 sm:px-stack-lg py-stack',
                    idx < activeMembers.length - 1 ? 'border-b border-ink-100' : '',
                  ].join(' ')}
                >
                  <Avatar name={m.name} tint={tone} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="m-0 font-body text-body-sm font-bold text-ink-900 truncate">
                      {m.name}
                    </p>
                    <p className="m-0 font-body text-caption text-ink-500 mt-0.5">
                      {ROLE_LABEL[m.role]}
                    </p>
                  </div>
                  <div className="hidden sm:flex flex-col gap-1 min-w-[140px] max-w-[200px] flex-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-body text-micro text-ink-500">Progression</span>
                      <span className="font-body text-micro font-bold text-primary-700 tabular-nums">
                        {m.progressPercent} %
                      </span>
                    </div>
                    <ProgressBar value={m.progressPercent} max={100} fill={tone} size="sm" />
                  </div>
                  <span className="font-body text-caption text-ink-500 whitespace-nowrap shrink-0 hidden md:inline">
                    {formatLastActive(m.lastActiveAt)}
                  </span>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* ── Accès & invitations ──────────────────────────────── */}
        <SectionCard
          title="Gestion des accès"
          titleIcon={<Mail size={18} className="text-primary-600" />}
          description="Inviter, gérer ou désactiver les comptes."
          headerAction={
            <Button
              variant="primary"
              size="sm"
              leadingIcon={<UserPlus size={13} />}
              onClick={() => setInviteOpen((v) => !v)}
            >
              {inviteOpen ? 'Annuler' : 'Inviter'}
            </Button>
          }
        >
          {inviteOpen && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Invitation envoyée à ${inviteEmail} (rôle ${inviteRole})`);
                setInviteOpen(false);
                setInviteEmail('');
              }}
              className="rounded-xl bg-primary-50/50 border border-primary-100 p-stack sm:p-5 flex flex-col gap-stack mb-stack-lg"
            >
              <h3 className="m-0 font-display text-body font-bold text-ink-900">
                Inviter un nouveau collaborateur
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_auto] gap-3 sm:items-end">
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
                <Button type="submit" variant="primary" size="md" leadingIcon={<Mail size={14} />} className="self-stretch sm:self-end">
                  Envoyer
                </Button>
              </div>
            </form>
          )}

          <div className="flex flex-col -mx-5 sm:-mx-6 -mb-5 sm:-mb-stack-lg">
            {members.map((u, idx) => (
              <div
                key={u.id}
                className={[
                  'flex flex-wrap items-center gap-stack px-5 sm:px-stack-lg py-stack',
                  idx < members.length - 1 ? 'border-b border-ink-100' : '',
                ].join(' ')}
              >
                <span className="shrink-0">
                  {u.status === 'active' ? (
                    <CheckCircle2 size={18} className="text-success-fg" />
                  ) : (
                    <Circle size={18} className="text-ink-400" />
                  )}
                </span>
                <div className="flex-1 min-w-40">
                  <p className="m-0 font-body text-body-sm font-bold text-ink-900">
                    {u.name}
                  </p>
                  <p className="m-0 font-body text-caption text-ink-500 mt-0.5">
                    {u.email}
                  </p>
                </div>
                <Badge variant={u.role === 'admin' ? 'brand' : u.role === 'viewer' ? 'warm' : 'neutral'}>
                  {ROLE_LABEL[u.role]}
                </Badge>
                <Badge variant={u.status === 'active' ? 'success' : 'warm'}>
                  {u.status === 'active' ? 'Actif' : 'En attente'}
                </Badge>
                <Button variant="ghost" size="sm" leadingIcon={<Mail size={13} />}>
                  {u.status === 'pending' ? 'Renvoyer' : 'Contacter'}
                </Button>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Rapports ──────────────────────────────────────────── */}
        <section className="flex flex-col gap-stack">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight">
              Rapports
            </h2>
            <Button variant="ghost" size="sm" trailingIcon={<ChevronRight size={13} />}>
              Voir tous les rapports
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
            {REPORTS.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="flex flex-col gap-stack p-5 sm:p-stack-lg rounded-2xl border border-ink-100 bg-white hover:border-ink-200 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-base"
                >
                  <div className="flex items-start gap-stack">
                    <span className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-700">
                      <Icon size={22} />
                    </span>
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <h3 className="m-0 font-display text-body-lg font-bold text-ink-900 leading-tight">
                        {r.title}
                      </h3>
                      <Badge variant="neutral">{r.period}</Badge>
                    </div>
                  </div>
                  <p className="m-0 font-body text-body-sm text-ink-600 leading-relaxed flex-1">
                    {r.desc}
                  </p>
                  <div className="flex gap-stack-xs mt-auto">
                    <Button variant="secondary" size="sm" leadingIcon={<Download size={13} />}>
                      Télécharger
                    </Button>
                    <Button variant="ghost" size="sm" trailingIcon={<ChevronRight size={13} />}>
                      Aperçu
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </Container>
    </div>
  );
};

export default Enterprise;
