/**
 * Billing : Gestion abonnement & facturation.
 *
 * Flow : Account family page (Profil / Mon compte / Paramètres).
 *
 * Structure :
 *  1. AccountFamilyNav (active="account")
 *  2. HeroSection minimal "Facturation"
 *  3. SectionCard : Formule active (plan + prochaine échéance + actions)
 *  4. SectionCard : Méthode de paiement (carte + bouton modifier)
 *  5. SectionCard : Historique des factures (table simple + download)
 *  6. SectionCard danger : Annuler l'abonnement (ConfirmModal)
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
} from 'lucide-react';
import { AccountFamilyNav } from '../components/patterns/AccountFamilyNav';
import { SectionCard } from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ConfirmModal } from '../components/modals/ConfirmModal';
import { useToastContext } from '../contexts/ToastContext';
import { useUserProfileStore } from '../stores/persistence';
import type { SubscriptionTier } from '../types/learning';
import { PageShell } from '../components/layout';

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

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Billing: React.FC = () => {
  const toast = useToastContext();
  const profileStore = useUserProfileStore();
  const profile = profileStore.get();
  const tierConfig = TIER_CONFIG[profile.subscriptionTier];
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleDownloadInvoice = (id: string) => {
    toast.success(`Téléchargement de ${id}`, 'La facture sera disponible dans quelques secondes.');
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    toast.info('Demande envoyée', 'Notre équipe vous contactera sous 24h pour finaliser l\'annulation.');
  };

  /* ── Layout ──────────────────────────────────────────────────────────── */

  return (
    <div className="min-h-[100dvh] bg-surface">
      <PageShell width="medium">

        {/* Family nav */}
        <AccountFamilyNav active="billing" />

        {/* Page header */}
        <header className="flex flex-col gap-tight">
          <h1 className="m-0 font-display text-h2 font-bold text-ink-900 leading-tight tracking-tight">
            Facturation & abonnement
          </h1>
          <p className="m-0 font-body text-body-sm text-ink-500 max-w-prose">
            Gérez votre formule, vos factures et votre méthode de paiement.
          </p>
        </header>

        {/* ── Formule active ─────────────────────────────────────────── */}
        <SectionCard
          title="Formule active"
          description="Votre plan, son prix et la prochaine échéance."
          tone="primary"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-stack p-stack rounded-2xl bg-primary-50/60 border border-primary-200">
            <div className="flex items-start gap-3">
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
                <p className="m-0 font-body text-caption text-ink-500 mt-1 inline-flex items-center gap-1">
                  <Calendar size={12} />
                  Prochaine échéance : <strong className="text-ink-800">1er juin 2026</strong>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1">
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

        {/* ── Méthode de paiement ────────────────────────────────────── */}
        <SectionCard
          title="Méthode de paiement"
          description="La carte utilisée pour vos prélèvements mensuels."
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-stack p-stack rounded-2xl bg-ink-50 border border-ink-100">
            <div className="flex items-center gap-3">
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

        {/* ── Historique factures ────────────────────────────────────── */}
        <SectionCard
          title="Historique des factures"
          description={`${INVOICES.length} factures · toutes payées.`}
        >
          <div className="flex flex-col rounded-2xl border border-ink-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-[1.2fr_2fr_0.8fr_auto] gap-stack px-stack py-stack-xs.5 bg-ink-50 border-b border-ink-100">
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
                  <span className="md:hidden inline-flex items-center gap-1 text-success-fg">
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
                  <span className="hidden md:inline-flex items-center gap-1 text-success-fg text-caption font-semibold">
                    <CheckCircle2 size={14} />
                    Payée
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconOnly
                    leadingIcon={<Download size={14} />}
                    aria-label={`Télécharger la facture ${inv.id}`}
                    onClick={() => handleDownloadInvoice(inv.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Annulation (danger zone) ───────────────────────────────── */}
        <SectionCard
          title="Annuler l'abonnement"
          description={`Vous conserverez l'accès ${tierConfig.name} jusqu'à la fin de la période en cours.`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-stack p-stack rounded-2xl bg-danger-bg/30 border border-danger-border">
            <div className="flex items-start gap-3">
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
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowCancelModal(true)}
            >
              Annuler l'abonnement
            </Button>
          </div>
        </SectionCard>

      </PageShell>

      {/* Confirm modal */}
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
