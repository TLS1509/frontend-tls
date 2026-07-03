/**
 * Billing : Gestion abonnement, crédits & facturation.
 *
 * Phase 24 rationalization : CreditsPage.tsx a été fusionné ici comme
 * onglet "Crédits" — les crédits sont un sujet de facturation, ils n'ont
 * pas besoin d'une route/page séparée (ex-/profile/credits, retirée).
 *
 * Flow : Account family page (Profil / Mon compte / Confidentialité / Notifications / Facturation).
 *
 * Route : /account/billing
 */

import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  Coins,
  TrendingUp,
  BookOpen,
  Users,
  Zap,
  ShoppingBag,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AccountFamilyNav } from '../components/patterns/AccountFamilyNav';
import { SectionCard } from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { StatCard } from '../components/ui/StatCard';
import { Alert } from '../components/ui/Alert';
import { ConfirmModal } from '../components/modals/ConfirmModal';
import { useToastContext } from '../contexts/ToastContext';
import { useUserProfileStore } from '../stores/persistence';
import type { SubscriptionTier } from '../types/learning';
import { PageShell } from '../components/layout';

type TabId = 'subscription' | 'credits';

/* ─── Mock data ─────────────────────────────────────────────────────────── */

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
  description: string;
}

const INVOICES: Invoice[] = [
  { id: 'INV-2026-005', date: '01 mai 2026',    amount: '29,00 €', status: 'paid',    description: 'Abonnement Premium · Mai 2026' },
  { id: 'INV-2026-004', date: '01 avril 2026',  amount: '29,00 €', status: 'paid',    description: 'Abonnement Premium · Avril 2026' },
  { id: 'INV-2026-003', date: '01 mars 2026',   amount: '29,00 €', status: 'paid',    description: 'Abonnement Premium · Mars 2026' },
  { id: 'INV-2026-002', date: '01 février 2026',amount: '29,00 €', status: 'paid',    description: 'Abonnement Premium · Février 2026' },
  { id: 'INV-2026-001', date: '01 janvier 2026',amount: '29,00 €', status: 'paid',    description: 'Abonnement Premium · Janvier 2026' },
];

const MOCK_TRANSACTIONS = [
  { id: 1, date: '12 mai 2026', description: 'Session coaching : Marie Dupont', amount: -15, type: 'debit' as const },
  { id: 2, date: '10 mai 2026', description: 'Parcours terminé : Leadership Fondamentaux', amount: +20, type: 'credit' as const },
  { id: 3, date: '8 mai 2026',  description: 'Ressource premium : Guide avancé de communication', amount: -5, type: 'debit' as const },
  { id: 4, date: '5 mai 2026',  description: 'Leçon terminée : Écoute active', amount: +5, type: 'credit' as const },
  { id: 5, date: '3 mai 2026',  description: 'Achat de crédits : Pack 50 crédits', amount: +50, type: 'credit' as const },
];

const EARN_WAYS = [
  { icon: <BookOpen size={18} className="text-primary-600" />, iconBg: 'bg-primary-50', label: 'Terminer une leçon', amount: '+5 crédits', amountColor: 'text-success-fg' },
  { icon: <TrendingUp size={18} className="text-secondary-600" />, iconBg: 'bg-secondary-50', label: 'Finir un parcours', amount: '+20 crédits', amountColor: 'text-success-fg' },
  { icon: <Users size={18} className="text-accent-500" />, iconBg: 'bg-accent-50', label: 'Session coaching', amount: '-15 crédits', amountColor: 'text-danger-fg' },
  { icon: <Zap size={18} className="text-primary-500" />, iconBg: 'bg-primary-50', label: 'Ressource premium', amount: '-5 crédits', amountColor: 'text-danger-fg' },
];

/* ─── Plan display config ─────────────────────────────────────────────── */

const TIER_CONFIG: Record<SubscriptionTier, { name: string; tagline: string; price: string }> = {
  free:               { name: 'Gratuit',              tagline: '10% du contenu, sans IA',         price: '0 €/mois' },
  plan_1:             { name: 'Plan 1',                tagline: 'Accès complet au contenu',         price: '19 €/mois' },
  plan_2:             { name: 'Plan 2',                tagline: 'Contenu + IA (chatbot, matching)', price: '29 €/mois' },
  plan_3:             { name: 'Plan 3',                tagline: 'Contenu + IA + 1 crédit/mois',    price: '39 €/mois' },
  enterprise_standard: { name: 'Enterprise Standard',  tagline: 'Multi-tenant, équipe',            price: 'Sur devis' },
  enterprise_premium:  { name: 'Enterprise Premium',   tagline: 'Multi-tenant + support dédié',    price: 'Sur devis' },
  enterprise_custom:   { name: 'Enterprise Custom',    tagline: 'Configuration personnalisée',     price: 'Sur devis' },
};

const TAB_ITEMS = [
  { id: 'subscription', label: <><Sparkles size={14} /> Abonnement</> },
  { id: 'credits',      label: <><Coins size={14} /> Crédits</> },
];

/* ─── Tab panels ──────────────────────────────────────────────────────────── */

const SubscriptionTab: React.FC<{
  tierConfig: { name: string; tagline: string; price: string };
  onDownloadInvoice: (id: string) => void;
  onCancel: () => void;
}> = ({ tierConfig, onDownloadInvoice, onCancel }) => (
  <div className="flex flex-col gap-stack-lg">
    <SectionCard
      title="Formule active"
      description="Votre plan, son prix et la prochaine échéance."
      tone="primary"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-stack p-stack rounded-2xl bg-primary-50/60 border border-primary-200">
        <div className="flex items-start gap-stack-xs">
          <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-700">
            <Sparkles size={20} />
          </div>
          <div className="flex flex-col gap-tight">
            <div className="flex items-center gap-stack-xs flex-wrap">
              <h3 className="m-0 font-display text-h4 font-bold text-ink-900 leading-tight">
                {tierConfig.name}
              </h3>
              <Badge variant="brand">Actif</Badge>
            </div>
            <p className="m-0 font-body text-body-sm text-ink-600">
              {tierConfig.tagline}
            </p>
            <p className="m-0 font-body text-caption text-ink-500 mt-1 inline-flex items-center gap-tight">
              <Calendar size={12} />
              Prochaine échéance : <strong className="text-ink-800">1er juin 2026</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-tight">
          <p className="m-0 font-display text-h3 font-bold text-ink-900 tabular-nums">
            {tierConfig.price}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-stack-xs mt-stack">
        <Button variant="primary" size="sm" trailingIcon={<ArrowUpRight size={14} />}>
          Changer de formule
        </Button>
        <Button variant="ghost" size="sm">
          Voir les avantages
        </Button>
      </div>
    </SectionCard>

    <SectionCard
      title="Méthode de paiement"
      description="La carte utilisée pour vos prélèvements mensuels."
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-stack p-stack rounded-2xl bg-ink-50 border border-ink-100">
        <div className="flex items-center gap-stack-xs">
          <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-ink-900 text-white">
            <CreditCard size={20} />
          </div>
          <div className="flex flex-col gap-tight">
            <p className="m-0 font-body text-body-sm font-semibold text-ink-900">
              Visa se terminant par •••• 4242
            </p>
            <p className="m-0 font-body text-caption text-ink-500">
              Expire 12/2028
            </p>
          </div>
        </div>

        <Button variant="secondary" size="sm">
          Modifier
        </Button>
      </div>
    </SectionCard>

    <SectionCard
      title="Historique des factures"
      description={`${INVOICES.length} factures · toutes payées.`}
    >
      <div className="flex flex-col rounded-2xl border border-ink-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.2fr_2fr_0.8fr_auto] gap-stack px-stack py-2.5 bg-ink-50 border-b border-ink-100">
          <span className="font-body text-micro font-semibold uppercase tracking-wider text-ink-500">Date</span>
          <span className="font-body text-micro font-semibold uppercase tracking-wider text-ink-500">Description</span>
          <span className="font-body text-micro font-semibold uppercase tracking-wider text-ink-500 text-right">Montant</span>
          <span className="font-body text-micro font-semibold uppercase tracking-wider text-ink-500 sr-only">Action</span>
        </div>

        {INVOICES.map((inv, i) => (
          <div
            key={inv.id}
            className={`flex flex-col md:grid md:grid-cols-[1.2fr_2fr_0.8fr_auto] md:items-center gap-stack-xs md:gap-stack px-stack py-3 ${i < INVOICES.length - 1 ? 'border-b border-ink-100' : ''}`}
          >
            <div className="flex items-center gap-stack-xs">
              <span className="md:hidden inline-flex items-center gap-tight text-success-fg">
                <CheckCircle2 size={12} />
              </span>
              <span className="font-body text-body-sm font-semibold text-ink-800">
                {inv.date}
              </span>
            </div>
            <p className="m-0 font-body text-body-sm text-ink-600">
              {inv.description}
            </p>
            <p className="m-0 font-body text-body-sm font-semibold text-ink-900 tabular-nums md:text-right">
              {inv.amount}
            </p>
            <div className="flex items-center gap-stack-xs md:justify-end">
              <span className="hidden md:inline-flex items-center gap-tight text-success-fg text-caption font-semibold">
                <CheckCircle2 size={14} />
                Payée
              </span>
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                leadingIcon={<Download size={14} />}
                aria-label={`Télécharger la facture ${inv.id}`}
                onClick={() => onDownloadInvoice(inv.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>

    <SectionCard
      title="Annuler l'abonnement"
      description={`Vous conserverez l'accès ${tierConfig.name} jusqu'à la fin de la période en cours.`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-stack p-stack rounded-2xl bg-danger-bg/30 border border-danger-border">
        <div className="flex items-start gap-stack-xs">
          <div className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-danger-bg text-danger-fg">
            <AlertTriangle size={18} />
          </div>
          <div className="flex flex-col gap-tight">
            <p className="m-0 font-body text-body-sm font-semibold text-ink-900">
              Annuler mon abonnement {tierConfig.name}
            </p>
            <p className="m-0 font-body text-caption text-ink-600 leading-relaxed">
              Cette action est réversible jusqu'au 1er juin 2026. Au-delà, vous perdrez l'accès aux parcours, coaching et veille.
            </p>
          </div>
        </div>
        <Button variant="secondary" size="sm" onClick={onCancel}>
          Annuler l'abonnement
        </Button>
      </div>
    </SectionCard>
  </div>
);

const CreditsTab: React.FC<{ credits: { classic: number; special: number } }> = ({ credits }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-stack-lg">
      <div className="p-section flex flex-col md:flex-row items-center md:items-start justify-between gap-section rounded-2xl bg-secondary-50/60 border border-secondary-200">
        <div className="flex flex-col gap-stack text-center md:text-left">
          <p className="m-0 text-caption font-medium text-secondary-600">Solde actuel</p>
          <div className="flex items-center gap-stack-xs justify-center md:justify-start">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-secondary-100 text-secondary-600 shrink-0">
              <Coins size={18} />
            </div>
            <div className="flex flex-col gap-tight">
              <div className="flex items-end gap-tight">
                <span className="font-display text-h2 font-extrabold leading-none text-secondary-600">{credits.classic}</span>
                <span className="mb-0.5 font-body text-body-sm font-semibold text-secondary-500">crédits Classic</span>
              </div>
              <p className="m-0 text-caption text-ink-400">Sessions coaching standard (1h)</p>
            </div>
          </div>
          <div className="flex items-center gap-stack-xs justify-center md:justify-start">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-accent-50 text-accent-500 shrink-0">
              <Star size={18} />
            </div>
            <div className="flex flex-col gap-tight">
              <div className="flex items-end gap-tight">
                <span className="font-display text-h2 font-extrabold leading-none text-accent-500">{credits.special}</span>
                <span className="mb-0.5 font-body text-body-sm font-semibold text-accent-500">crédits Spécial</span>
              </div>
              <p className="m-0 text-caption text-ink-400">Sessions expert / masterclasses premium</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-stack-xs items-center md:items-end">
          <Button variant="warm" leadingIcon={<ShoppingBag size={16} />} onClick={() => navigate('/account/billing/credits/buy')}>
            Acheter des crédits
          </Button>
          <p className="m-0 text-caption text-ink-400">Packs à partir de 9,90 €</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
        <StatCard label="Crédits utilisés ce mois" value="35" variant="warm" />
        <StatCard label="Crédits gagnés ce mois" value="25" variant="brand" />
        <StatCard label="Sessions bookées" value="3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack">
        <SectionCard
          title="Historique d'utilisation"
          titleIcon={<TrendingUp size={18} className="text-primary-500" />}
          description="Vos 5 dernières transactions"
        >
          <div className="flex flex-col gap-stack-xs">
            {MOCK_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between gap-stack-xs py-3 border-b border-ink-100 last:border-b-0">
                <div className="flex flex-col gap-tight min-w-0">
                  <p className="m-0 text-body-sm font-medium text-ink-900 truncate">{tx.description}</p>
                  <p className="m-0 text-caption text-ink-400">{tx.date}</p>
                </div>
                <span className={['shrink-0 font-mono font-bold text-body-sm', tx.type === 'credit' ? 'text-success-fg' : 'text-danger-fg'].join(' ')}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Comment obtenir des crédits"
          titleIcon={<Coins size={18} className="text-secondary-500" />}
          description="Gagnez des crédits en progressant dans votre parcours d'apprentissage"
        >
          <div className="flex flex-col gap-stack-xs">
            {EARN_WAYS.map((way, i) => (
              <div key={i} className="flex items-center gap-stack-xs p-3 rounded-lg bg-ink-50 border border-ink-100">
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

      <Alert variant="info" title="Comment fonctionnent les crédits ?">
        Les crédits sont valables 12 mois à partir de la date d'achat ou d'attribution. Ils ne sont pas remboursables mais peuvent être transférés à un autre membre de votre organisation. Les crédits offerts (gagnés par vos accomplissements) expirent à la fin de l'année civile en cours.
      </Alert>
    </div>
  );
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Billing: React.FC = () => {
  const toast = useToastContext();
  const profileStore = useUserProfileStore();
  const profile = profileStore.get();
  const tierConfig = TIER_CONFIG[profile.subscriptionTier];
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('subscription');

  const handleDownloadInvoice = (id: string) => {
    toast.success(`Téléchargement de ${id}`, 'La facture sera disponible dans quelques secondes.');
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    toast.info('Demande envoyée', 'Notre équipe vous contactera sous 24h pour finaliser l\'annulation.');
  };

  return (
    <div className="min-h-[100dvh] bg-surface">
      <PageShell width="content" paddingX="comfortable">

        <AccountFamilyNav active="billing" />

        <header className="flex flex-col gap-tight">
          <h1 className="m-0 font-display text-h2 font-bold text-ink-900 leading-tight tracking-tight">
            Facturation & abonnement
          </h1>
          <p className="m-0 font-body text-body-sm text-ink-500 max-w-prose">
            Gérez votre formule, vos crédits, vos factures et votre méthode de paiement.
          </p>
        </header>

        <Tabs
          items={TAB_ITEMS}
          value={activeTab}
          onChange={(id) => setActiveTab(id as TabId)}
          variant="underline"
          fullWidth
        />

        {activeTab === 'subscription' && (
          <SubscriptionTab tierConfig={tierConfig} onDownloadInvoice={handleDownloadInvoice} onCancel={() => setShowCancelModal(true)} />
        )}
        {activeTab === 'credits' && <CreditsTab credits={profile.credits} />}

      </PageShell>

      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        variant="danger"
        title="Confirmer l'annulation"
        message="Vous êtes sur le point d'annuler votre abonnement Premium. Vous conserverez l'accès jusqu'au 1er juin 2026. Voulez-vous continuer ?"
        confirmText="Oui, annuler"
        cancelText="Revenir"
      />
    </div>
  );
};

export default Billing;
