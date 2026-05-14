import React from 'react';
import { Coins, TrendingUp, BookOpen, Users, Zap, ShoppingBag } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Alert } from '../components/ui/Alert';
import { StatCard } from '../components/ui/StatCard';

const MOCK_TRANSACTIONS = [
  {
    id: 1,
    date: '12 mai 2026',
    description: 'Session coaching — Marie Dupont',
    amount: -15,
    type: 'debit' as const,
  },
  {
    id: 2,
    date: '10 mai 2026',
    description: 'Parcours terminé — Leadership Fondamentaux',
    amount: +20,
    type: 'credit' as const,
  },
  {
    id: 3,
    date: '8 mai 2026',
    description: 'Ressource premium — Guide avancé de communication',
    amount: -5,
    type: 'debit' as const,
  },
  {
    id: 4,
    date: '5 mai 2026',
    description: 'Leçon terminée — Écoute active',
    amount: +5,
    type: 'credit' as const,
  },
  {
    id: 5,
    date: '3 mai 2026',
    description: 'Achat de crédits — Pack 50 crédits',
    amount: +50,
    type: 'credit' as const,
  },
];

const EARN_WAYS = [
  {
    icon: <BookOpen size={18} className="text-primary-600" />,
    iconBg: 'bg-primary-50',
    label: 'Terminer une leçon',
    amount: '+5 crédits',
    amountColor: 'text-success-fg',
  },
  {
    icon: <TrendingUp size={18} className="text-secondary-600" />,
    iconBg: 'bg-secondary-50',
    label: 'Finir un parcours',
    amount: '+20 crédits',
    amountColor: 'text-success-fg',
  },
  {
    icon: <Users size={18} className="text-accent-500" />,
    iconBg: 'bg-accent-50',
    label: 'Session coaching',
    amount: '-15 crédits',
    amountColor: 'text-danger-fg',
  },
  {
    icon: <Zap size={18} className="text-primary-500" />,
    iconBg: 'bg-primary-50',
    label: 'Ressource premium',
    amount: '-5 crédits',
    amountColor: 'text-danger-fg',
  },
];

export default function CreditsPage() {
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ label: 'Profil · Crédits', icon: <Coins size={14} /> }}
        title="Mes Crédits"
        summary="Vos crédits d'apprentissage pour réserver des sessions coaching et accéder aux ressources premium."
        tone="warm"
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">
        {/* Hero balance card */}
        <Card
          variant="tinted"
          tone="warm"
          className="p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-section"
        >
          <div className="flex flex-col gap-stack-xs text-center md:text-left">
            <p className="m-0 text-caption font-bold uppercase tracking-wider text-secondary-600">Solde actuel</p>
            <div className="flex items-end gap-stack-xs justify-center md:justify-start">
              <span className="font-display text-[3.5rem] font-extrabold leading-none text-secondary-600">124</span>
              <span className="mb-2 font-body text-body font-semibold text-secondary-500">crédits</span>
            </div>
            <p className="m-0 text-body-sm text-ink-500">crédits disponibles</p>
            <p className="m-0 text-caption text-ink-400 flex items-center gap-1 justify-center md:justify-start">
              <span>Expire le 31 décembre 2026</span>
            </p>
          </div>

          <div className="flex flex-col gap-stack-xs items-center md:items-end">
            <Button variant="warm" leadingIcon={<ShoppingBag size={16} />}>
              Acheter des crédits
            </Button>
            <p className="m-0 text-caption text-ink-400">Packs à partir de 9,90 €</p>
          </div>
        </Card>

        {/* Stats bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard label="Crédits utilisés ce mois" value="35" variant="warm" />
          <StatCard label="Crédits gagnés ce mois" value="25" variant="brand" />
          <StatCard label="Sessions bookées" value="3" />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack">
          {/* Transaction history */}
          <SectionCard
            title="Historique d'utilisation"
            titleIcon={<TrendingUp size={18} className="text-primary-500" />}
            description="Vos 5 dernières transactions"
          >
            <div className="flex flex-col gap-stack-xs">
              {MOCK_TRANSACTIONS.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-3 py-3 border-b border-ink-100 last:border-b-0"
                >
                  <div className="flex flex-col gap-tight min-w-0">
                    <p className="m-0 text-body-sm font-medium text-ink-900 truncate">{tx.description}</p>
                    <p className="m-0 text-caption text-ink-400">{tx.date}</p>
                  </div>
                  <span
                    className={[
                      'shrink-0 font-mono font-bold text-body-sm',
                      tx.type === 'credit' ? 'text-success-fg' : 'text-danger-fg',
                    ].join(' ')}
                  >
                    {tx.amount > 0 ? '+' : ''}{tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* How to earn */}
          <SectionCard
            title="Comment obtenir des crédits"
            titleIcon={<Coins size={18} className="text-secondary-500" />}
            description="Gagnez des crédits en progressant dans votre parcours d'apprentissage"
          >
            <div className="flex flex-col gap-stack-xs">
              {EARN_WAYS.map((way, i) => (
                <div
                  key={i}
                  className="flex items-center gap-stack-xs p-3 rounded-lg bg-ink-50 border border-ink-100"
                >
                  <div className={`w-9 h-9 rounded-md ${way.iconBg} flex items-center justify-center shrink-0`}>
                    {way.icon}
                  </div>
                  <p className="m-0 text-body-sm text-ink-700 flex-1 min-w-0">{way.label}</p>
                  <span className={`shrink-0 font-mono font-bold text-body-sm ${way.amountColor}`}>
                    {way.amount}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Info alert */}
        <Alert variant="info" title="Comment fonctionnent les crédits ?">
          Les crédits sont valables 12 mois à partir de la date d'achat ou d'attribution. Ils ne sont pas remboursables mais peuvent être transférés à un autre membre de votre organisation. Les crédits offerts (gagnés par vos accomplissements) expirent à la fin de l'année civile en cours.
        </Alert>
      </div>
    </div>
  );
}
