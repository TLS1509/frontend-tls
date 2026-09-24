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
import { Card } from '../components/core/Card';
import { MetaPill } from '../components/ui/MetaPill';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { useNavigate } from 'react-router-dom';
import { AccountFamilyNav } from '../components/patterns/AccountFamilyNav';
import { PageHero } from '../components/patterns/EditorialHero';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { IconChip } from '../components/ui/IconChip';
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
  { id: 'INV-2026-005', date: '1er mai 2026',    amount: '29,00 €', status: 'paid',    description: 'Abonnement Premium · Mai 2026' },
  { id: 'INV-2026-004', date: '1er avril 2026',  amount: '29,00 €', status: 'paid',    description: 'Abonnement Premium · Avril 2026' },
  { id: 'INV-2026-003', date: '1er mars 2026',   amount: '29,00 €', status: 'paid',    description: 'Abonnement Premium · Mars 2026' },
  { id: 'INV-2026-002', date: '1er février 2026', amount: '29,00 €', status: 'paid',    description: 'Abonnement Premium · Février 2026' },
  { id: 'INV-2026-001', date: '1er janvier 2026', amount: '29,00 €', status: 'paid',    description: 'Abonnement Premium · Janvier 2026' },
];

const MOCK_TRANSACTIONS = [
  { id: 1, date: '12 mai 2026', description: 'Session coaching : Marie Dupont', amount: -15, type: 'debit' as const },
  { id: 2, date: '10 mai 2026', description: 'Parcours terminé : Leadership Fondamentaux', amount: +20, type: 'credit' as const },
  { id: 3, date: '8 mai 2026',  description: 'Ressource premium : Guide avancé de communication', amount: -5, type: 'debit' as const },
  { id: 4, date: '5 mai 2026',  description: 'Leçon terminée : Écoute active', amount: +5, type: 'credit' as const },
  { id: 5, date: '3 mai 2026',  description: 'Achat de crédits : Pack 50 crédits', amount: +50, type: 'credit' as const },
];

/* Les montants portent leur signe (+ / −, le vrai signe moins) ; la couleur
   ne fait que le redoubler. Une seule teinte de pastille : quatre tons
   (teal, orange, or, teal) ne disaient rien de plus. */
const EARN_WAYS = [
  { icon: <BookOpen />, label: 'Valider une leçon', amount: 5 },
  { icon: <TrendingUp />, label: 'Finir un parcours', amount: 20 },
  { icon: <Users />, label: 'Session coaching', amount: -15 },
  { icon: <Zap />, label: 'Ressource premium', amount: -5 },
];

const signed = (n: number) => `${n > 0 ? '+' : '\u2212'}${Math.abs(n)}`;

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
  { id: 'subscription', label: 'Abonnement' },
  { id: 'credits',      label: 'Crédits' },
];

/* En-tête de colonne : légende 13 / 600 ink-600, en casse normale (il était
   en 11 px capitales espacées ink-500 — le registre du Badge, au cran des
   placeholders). */
const COL_HEAD = 'font-body text-caption font-semibold text-ink-600';

/* ─── Tab panels ──────────────────────────────────────────────────────────── */

const SubscriptionTab: React.FC<{
  tierConfig: { name: string; tagline: string; price: string };
  onDownloadInvoice: (id: string) => void;
  onCancel: () => void;
}> = ({ tierConfig, onDownloadInvoice, onCancel }) => (
  <div className="flex flex-col gap-page">
    <section className="flex flex-col gap-stack">
      <SectionHeader title="Formule active" subtitle="Votre plan, son prix et la prochaine échéance." />
      {/* Une carte, pas une boîte teintée dans une carte. */}
      <Card className="flex flex-col gap-stack-lg">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-stack">
          <div className="flex items-start gap-stack-sm">
            <IconChip size="lg" tone="brand">
              <Sparkles />
            </IconChip>
            {/* 12 px : la première ligne (26) tombe sur le centre de la pastille (48). */}
            <div className="flex flex-col gap-stack-3xs pt-stack-sm">
              <div className="flex items-center gap-stack-xs flex-wrap">
                <h3 className="font-display text-h3 text-ink-900">
                  {tierConfig.name}
                </h3>
                <Badge variant="brand">Actif</Badge>
              </div>
              <p className="font-body text-body text-ink-700">
                {tierConfig.tagline}
              </p>
              <p className="mt-stack-xs font-body text-caption text-ink-600 inline-flex items-center gap-stack-3xs">
                <Calendar size={14} aria-hidden="true" />
                Prochaine échéance : <strong className="font-semibold text-ink-900">1er juin 2026</strong>
              </p>
            </div>
          </div>
          <p className="sm:pt-stack-sm font-display text-h3 text-ink-900 tabular-nums whitespace-nowrap">
            {tierConfig.price}
          </p>
        </div>

        <div className="flex flex-wrap gap-stack-xs">
          <Button emphasis="soft" size="sm" trailingIcon={<ArrowUpRight size={14} />}>
            Changer de formule
          </Button>
          <Button emphasis="outline" size="sm">
            Voir les avantages
          </Button>
        </div>
      </Card>
    </section>

    <section className="flex flex-col gap-stack">
      <SectionHeader title="Méthode de paiement" subtitle="La carte utilisée pour vos prélèvements mensuels." />
      <Card className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-stack">
        <div className="flex items-center gap-stack-sm">
          <IconChip size="lg" tone="neutral">
            <CreditCard />
          </IconChip>
          <div className="flex flex-col gap-stack-3xs">
            <p className="font-body text-body font-semibold text-ink-900">
              Visa se terminant par •••• 4242
            </p>
            <p className="font-body text-caption text-ink-600">
              Expire 12/2028
            </p>
          </div>
        </div>

        <Button emphasis="soft" tone="warm" size="sm" className="self-start sm:self-auto">
          Modifier
        </Button>
      </Card>
    </section>

    <section className="flex flex-col gap-stack">
      <SectionHeader title="Historique des factures" meta={`${INVOICES.length} factures · toutes payées`} />
      <Card className="p-0 overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.2fr_2fr_0.8fr_auto] gap-stack px-stack-lg py-stack-sm bg-ink-50 border-b border-ink-100">
          <span className={COL_HEAD}>Date</span>
          <span className={COL_HEAD}>Description</span>
          <span className={`${COL_HEAD} text-right`}>Montant</span>
          <span className="sr-only">Action</span>
        </div>

        <ul className="flex flex-col divide-y divide-ink-100" aria-label="Factures">
          {INVOICES.map((inv) => (
            <li
              key={inv.id}
              className="flex flex-col md:grid md:grid-cols-[1.2fr_2fr_0.8fr_auto] md:items-center gap-stack-3xs md:gap-stack px-stack-md sm:px-stack-lg py-stack"
            >
              <span className="font-body text-body font-semibold text-ink-900">
                {inv.date}
              </span>
              <p className="font-body text-body text-ink-700">
                {inv.description}
              </p>
              <p className="font-body text-body font-semibold text-ink-900 tabular-nums md:text-right">
                {inv.amount}
              </p>
              <div className="flex items-center gap-stack-xs md:justify-end">
                <span className="inline-flex items-center gap-stack-3xs text-success-fg text-caption font-semibold">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  Payée
                </span>
                <Button
                  emphasis="outline"
                  size="sm"
                  iconOnly
                  leadingIcon={<Download size={14} />}
                  aria-label={`Télécharger la facture ${inv.id}`}
                  onClick={() => onDownloadInvoice(inv.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </section>

    <section className="flex flex-col gap-stack">
      <SectionHeader
        title="Annuler l'abonnement"
        subtitle={`Vous conserverez l'accès ${tierConfig.name} jusqu'à la fin de la période en cours.`}
      />
      {/* Le filet était `border-danger-border`, un jeton qui n'existe pas :
          peint à la couleur du texte, c'était le trait sombre de la carte. */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-stack p-stack-lg rounded-xl bg-danger-bg/40 border border-danger-base/40">
        <div className="flex items-start gap-stack-sm">
          <IconChip size="md" tone="danger">
            <AlertTriangle />
          </IconChip>
          <div className="flex flex-col gap-stack-3xs pt-stack-2xs">
            <p className="font-body text-body font-semibold text-ink-900">
              Annuler mon abonnement {tierConfig.name}
            </p>
            <p className="font-body text-body text-ink-700 max-w-prose">
              Cette action est réversible jusqu'au 1er juin 2026. Au-delà, vous perdrez l'accès aux parcours, coaching et veille.
            </p>
          </div>
        </div>
        <Button emphasis="soft" tone="warm" size="sm" className="self-start sm:self-auto shrink-0" onClick={onCancel}>
          Annuler l'abonnement
        </Button>
      </div>
    </section>
  </div>
);

const CreditsTab: React.FC<{ credits: { classic: number; special: number } }> = ({ credits }) => {
  const navigate = useNavigate();
  const balances = [
    { key: 'classic', value: credits.classic, unit: 'crédits Classic', desc: 'Sessions coaching standard (1 h)', icon: <Coins />, tone: 'warm' as const },
    { key: 'special', value: credits.special, unit: 'crédits Spécial', desc: 'Sessions expert et masterclasses premium', icon: <Star />, tone: 'sun' as const },
  ];
  return (
    <div className="flex flex-col gap-page">
      {/* Le solde, calé à gauche à toutes les largeurs (il était centré sous
          768 px, sous un titre de page calé à gauche). Les chiffres sont en
          encre : l'orange de marque ne dit pas qu'un solde compte plus. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Solde actuel" />
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-stack-lg p-stack-lg rounded-xl bg-secondary-50/60 border border-secondary-200">
          <ul className="flex flex-col gap-stack" aria-label="Solde de crédits">
            {balances.map((b) => (
              <li key={b.key} className="flex items-start gap-stack-sm">
                <IconChip size="md" tone={b.tone} surface="tinted">
                  {b.icon}
                </IconChip>
                <div className="flex flex-col gap-stack-3xs">
                  <p className="flex items-baseline gap-stack-xs">
                    <span className="font-display text-h2 text-ink-900 tabular-nums">{b.value}</span>
                    <span className="font-body text-body font-semibold text-ink-900">{b.unit}</span>
                  </p>
                  <p className="text-caption text-ink-600">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-stack-xs md:items-end">
            <Button emphasis="soft" tone="warm" leadingIcon={<ShoppingBag size={16} />} onClick={() => navigate('/account/billing/credits/buy')}>
              Acheter des crédits
            </Button>
            <p className="text-caption text-ink-600">Packs à partir de 9,90 €</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
        <StatCard label="Crédits utilisés ce mois" value="35" />
        <StatCard label="Crédits gagnés ce mois" value="25" />
        <StatCard label="Sessions réservées" value="3" />
      </div>

      <section className="flex flex-col gap-stack">
        <SectionHeader title="Historique d'utilisation" meta="Vos 5 dernières transactions" />
        <Card>
          <ul className="flex flex-col divide-y divide-ink-100" aria-label="Transactions">
            {MOCK_TRANSACTIONS.map((tx) => (
              <li key={tx.id} className="flex items-center justify-between gap-stack py-stack first:pt-0 last:pb-0">
                <div className="flex flex-col gap-stack-3xs min-w-0">
                  <p className="text-body text-ink-900 truncate">{tx.description}</p>
                  <p className="text-caption text-ink-600">{tx.date}</p>
                </div>
                <span className={['shrink-0 font-body font-semibold text-body tabular-nums', tx.type === 'credit' ? 'text-success-fg' : 'text-danger-fg'].join(' ')}>
                  {signed(tx.amount)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Comment obtenir des crédits"
          subtitle="Gagnez des crédits en progressant dans votre parcours d'apprentissage."
        />
        {/* Des rangées dans une carte, plus quatre boîtes grises empilées. */}
        <Card>
          <ul className="flex flex-col divide-y divide-ink-100" aria-label="Gains et dépenses de crédits">
            {EARN_WAYS.map((way) => (
              <li key={way.label} className="flex items-center gap-stack-sm py-stack first:pt-0 last:pb-0">
                <IconChip size="sm" tone="neutral">{way.icon}</IconChip>
                <p className="text-body text-ink-900 flex-1 min-w-0">{way.label}</p>
                <span className={`shrink-0 font-body font-semibold text-body tabular-nums ${way.amount > 0 ? 'text-success-fg' : 'text-danger-fg'}`}>
                  {signed(way.amount)} crédits
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

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

  /* Passe typographique du 2026-09-24 : plus d'aplat `bg-surface` (il
     s'arrêtait net à x≈1400) ni de haut de page collé ; le surtitre redisait
     un faux parent (« Profil · Facturation ») ; l'offre est une donnée ; les
     onglets sont les onglets texte de l'app ; chaque bloc a son titre h2 posé
     au-dessus de SA carte — il y avait une boîte dans chaque carte. */
  return (
    <>
      <PageShell width="content">

        <AccountFamilyNav active="billing" />

        <PageHero
          title="Facturation et abonnement"
          summary="Gérez votre formule, vos crédits, vos factures et votre méthode de paiement."
          tone="flat"
          trailing={<MetaPill text={`${tierConfig.name} · actif`} tone="neutral" />}
        />

        <div className="flex flex-col gap-stack-lg">
          <Tabs
            items={TAB_ITEMS}
            value={activeTab}
            onChange={(id) => setActiveTab(id as TabId)}
            variant="underline"
            label="Sections de la facturation"
          />

          {activeTab === 'subscription' && (
            <SubscriptionTab tierConfig={tierConfig} onDownloadInvoice={handleDownloadInvoice} onCancel={() => setShowCancelModal(true)} />
          )}
          {activeTab === 'credits' && <CreditsTab credits={profile.credits} />}
        </div>

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
    </>
  );
};

export default Billing;
