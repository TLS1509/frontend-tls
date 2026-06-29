/**
 * SubscriptionPayment — Choix de formule + paiement.
 *
 * Flow : étape de l'onboarding après Positionnement, avant accès parcours.
 *
 * Structure :
 *  1. HeroSection minimal "Choisissez votre formule"
 *  2. Plan selector — 3 SectionCards (Découverte / Premium / Pro)
 *     - Mensuel / Annuel toggle (économie 20%)
 *  3. Formulaire de paiement (carte) — visible une fois plan choisi
 *  4. CTA "Confirmer le paiement" + ConfirmModal récap
 *  5. Mention sécurité (Stripe) + politique de remboursement
 *
 * Route : /onboarding/payment
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  Sparkles,
  Crown,
  Zap,
  Lock,
  CreditCard,
  ShieldCheck,
  Calendar,
  BookOpen,
  Brain,
} from 'lucide-react';
import { SectionCard } from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { FormGroup } from '../components/core/FormGroup';
import { Badge } from '../components/ui/Badge';
import { ConfirmModal } from '../components/modals/ConfirmModal';
import { TlsLogo } from '../components/ui/TlsLogo';
import { useToastContext } from '../contexts/ToastContext';
import { useUserProfileStore, useOnboardingStore } from '../stores/persistence';
import { Stepper } from '../components/ui/Stepper';
import { buildOnboardingStepperItems } from '../lib/onboarding-steps';
import type { SubscriptionTier } from '../types/learning';

/* ─── Types & data ──────────────────────────────────────────────────────── */

type PlanId = Extract<SubscriptionTier, 'free' | 'plan_1' | 'plan_2' | 'plan_3'>;
type Billing = 'monthly' | 'yearly';

interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  features: string[];
  icon: React.ReactNode;
  highlight?: boolean;
  badge?: string;
}

/** 4 plans individuels MVP — Cahier #11bis */
const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Gratuit',
    tagline: '10% du contenu · sans IA',
    monthly: 0,
    yearly: 0,
    icon: <Sparkles size={20} />,
    features: [
      '10% du contenu accessible',
      'Veille mensuelle (résumé)',
      'Communauté lecture seule',
      'Achat de crédits possible',
    ],
  },
  {
    id: 'plan_1',
    name: 'Plan 1',
    tagline: 'Accès complet au contenu',
    monthly: 19,
    yearly: 182,
    icon: <BookOpen size={20} />,
    features: [
      'Accès 100% du contenu',
      'Tous les parcours',
      'Veille quotidienne + archives',
      'Communauté complète',
      'Certificats de fin de parcours',
    ],
  },
  {
    id: 'plan_2',
    name: 'Plan 2',
    tagline: 'Contenu + IA (chatbot, matching)',
    monthly: 29,
    yearly: 278,
    icon: <Brain size={20} />,
    highlight: true,
    badge: 'Recommandé',
    features: [
      'Tout du Plan 1',
      'Chatbot IA (RAG)',
      'Matching coach IA',
      'Recommandations personnalisées',
    ],
  },
  {
    id: 'plan_3',
    name: 'Plan 3',
    tagline: 'Contenu + IA + 1 crédit/mois',
    monthly: 39,
    yearly: 374,
    icon: <Crown size={20} />,
    features: [
      'Tout du Plan 2',
      '1 crédit coaching Classic/mois',
      'Accès masterclasses premium',
      'Support prioritaire',
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const SubscriptionPayment: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToastContext();
  const profileStore = useUserProfileStore();
  const onboardingStore = useOnboardingStore();

  const [billing, setBilling] = useState<Billing>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(
    (onboardingStore.selectedPlan as PlanId | null) ?? 'plan_2'
  );
  const [showConfirm, setShowConfirm] = useState(false);

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const currentPlan = PLANS.find((p) => p.id === selectedPlan)!;
  const price = billing === 'monthly' ? currentPlan.monthly : currentPlan.yearly;
  const periodLabel = billing === 'monthly' ? '/mois' : '/an';

  const isFormValid =
    cardName.trim().length > 2 &&
    cardNumber.replace(/\s/g, '').length >= 12 &&
    cardExpiry.length >= 4 &&
    cardCvc.length >= 3;

  const handleConfirmPayment = () => {
    setShowConfirm(false);
    profileStore.patch({ subscriptionTier: selectedPlan });
    // Persist selected plan + mark payment step done in onboarding store
    if (selectedPlan === 'plan_1' || selectedPlan === 'plan_2' || selectedPlan === 'plan_3') {
      onboardingStore.patch({ selectedPlan });
    }
    onboardingStore.markStepComplete('payment');
    onboardingStore.goToStep('tutorial');
    toast.success('Paiement confirmé', 'Bienvenue dans The Learning Society !');
    setTimeout(() => navigate('/onboarding/tutorial'), 1200);
  };

  /* ── Layout ──────────────────────────────────────────────────────────── */

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-page-ambient-warm" aria-hidden />

      <div className="relative z-base max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-section pb-section flex flex-col gap-section">

        {/* Brand bar */}
        <div className="flex items-center justify-between">
          <div className="w-20" />
          <a href="/dashboard" aria-label="The Learning Society" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 rounded-sm">
            <TlsLogo size={36} variant="color" withBubble />
          </a>
          <div className="w-20 flex justify-end">
            <button
              onClick={() => navigate('/dashboard')}
              className="font-body text-caption text-ink-500 hover:text-ink-900 transition-colors duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm min-h-touch flex items-center"
            >
              Passer
            </button>
          </div>
        </div>

        {/* Cross-screen Stepper */}
        <Stepper items={buildOnboardingStepperItems('paiement', onboardingStore.accountType)} orientation="horizontal" />

        {/* Header */}
        <header className="flex flex-col gap-tight text-center">
          <p className="m-0 font-body text-caption font-semibold uppercase tracking-wider text-primary-600">
            Étape paiement · Abonnement
          </p>
          <h1 className="m-0 font-display text-h2 font-extrabold tracking-display text-ink-900 leading-tight">
            Choisis ta formule
          </h1>
          <p className="m-0 font-body text-body text-ink-500 leading-relaxed max-w-prose mx-auto">
            Démarre en quelques secondes. Annulable à tout moment, sans frais.
          </p>
        </header>

        {/* Billing toggle */}
        <div className="flex justify-center">
          <div role="group" aria-label="Période de facturation" className="inline-flex p-1 rounded-pill bg-ink-100 border border-ink-200">
            <button
              type="button"
              onClick={() => setBilling('monthly')}
              className={`px-4 py-1.5 rounded-pill font-body text-body-sm font-semibold transition-colors duration-base ${billing === 'monthly' ? 'bg-white text-ink-900 shadow-xs' : 'text-ink-500 hover:text-ink-800'}`}
            >
              Mensuel
            </button>
            <button
              type="button"
              onClick={() => setBilling('yearly')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-pill font-body text-body-sm font-semibold transition-colors duration-base ${billing === 'yearly' ? 'bg-white text-ink-900 shadow-xs' : 'text-ink-500 hover:text-ink-800'}`}
            >
              Annuel
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-pill bg-accent-100 text-accent-700 text-micro font-bold">
                −20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack">
          {PLANS.map((plan) => {
            const isSelected = plan.id === selectedPlan;
            const planPrice = billing === 'monthly' ? plan.monthly : plan.yearly;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                aria-pressed={isSelected}
                className={[
                  'group relative text-left flex flex-col gap-stack p-5 rounded-2xl border-2 transition-all duration-base cursor-pointer',
                  isSelected
                    ? 'bg-white border-primary-500 shadow-card-hover ring-2 ring-primary-200 -translate-y-1'
                    : plan.highlight
                    ? 'bg-gradient-to-br from-primary-50 to-white border-primary-300 shadow-card hover:shadow-card-hover hover:-translate-y-0.5'
                    : 'bg-white border-ink-100 hover:border-primary-200 hover:shadow-sm',
                ].join(' ')}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-5 inline-flex items-center px-2.5 py-0.5 rounded-pill bg-gradient-to-r from-primary-500 to-primary-600 text-white text-micro font-bold uppercase tracking-wider shadow-sm">
                    {plan.badge}
                  </span>
                )}

                <div className="flex items-center gap-stack-xs">
                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${plan.highlight ? 'bg-primary-100 text-primary-700' : 'bg-ink-100 text-ink-600'}`}>
                    {plan.icon}
                  </span>
                  <div className="flex flex-col">
                    <h3 className="m-0 font-display text-h4 font-bold text-ink-900 leading-tight">
                      {plan.name}
                    </h3>
                    <p className="m-0 font-body text-caption text-ink-500">
                      {plan.tagline}
                    </p>
                  </div>
                </div>

                <p className="m-0">
                  <span className="font-display text-h2 font-bold text-ink-900 tabular-nums">
                    {planPrice} €
                  </span>
                  <span className="font-body text-body-sm text-ink-500 ml-1">
                    {periodLabel}
                  </span>
                </p>

                <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-stack-xs font-body text-body-sm text-ink-700">
                      <Check size={14} className="shrink-0 mt-0.5 text-primary-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <span
                    className={[
                      'inline-flex items-center justify-center w-full px-4 py-2 rounded-pill font-body text-body-sm font-semibold transition-colors duration-base',
                      isSelected
                        ? 'bg-primary-600 text-white'
                        : 'bg-ink-100 text-ink-700 group-hover:bg-primary-50 group-hover:text-primary-700',
                    ].join(' ')}
                  >
                    {isSelected ? 'Sélectionné' : 'Choisir cette formule'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Payment form */}
        <SectionCard
          title="Informations de paiement"
          description="Paiement sécurisé par Stripe. Aucune donnée bancaire n'est stockée sur nos serveurs."
        >
          <div className="flex flex-col gap-stack">
            <FormGroup label="Nom sur la carte" id="card-name" required>
              <Input
                id="card-name"
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Marie Dupont"
                leadingIcon={<CreditCard size={16} />}
              />
            </FormGroup>

            <FormGroup label="Numéro de carte" id="card-number" required>
              <Input
                id="card-number"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
                inputMode="numeric"
                autoComplete="cc-number"
              />
            </FormGroup>

            <div className="grid grid-cols-2 gap-stack">
              <FormGroup label="Expiration" id="card-expiry" required>
                <Input
                  id="card-expiry"
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM / AA"
                  leadingIcon={<Calendar size={16} />}
                  autoComplete="cc-exp"
                />
              </FormGroup>
              <FormGroup label="CVC" id="card-cvc" required>
                <Input
                  id="card-cvc"
                  type="text"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  placeholder="123"
                  inputMode="numeric"
                  leadingIcon={<Lock size={16} />}
                  autoComplete="cc-csc"
                />
              </FormGroup>
            </div>
          </div>
        </SectionCard>

        {/* Summary + CTA */}
        <div className="flex flex-col gap-stack p-5 rounded-2xl bg-primary-50/60 border border-primary-200">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="m-0 font-body text-caption text-ink-500 uppercase tracking-wider font-semibold">
                Total à payer
              </p>
              <p className="m-0 font-display text-h3 font-bold text-ink-900 tabular-nums">
                {price} €<span className="font-body text-body-sm font-normal text-ink-500">{periodLabel}</span>
              </p>
            </div>
            <Badge variant="brand">{currentPlan.name}</Badge>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            leadingIcon={<ShieldCheck size={18} />}
            disabled={!isFormValid}
            onClick={() => setShowConfirm(true)}
          >
            Confirmer le paiement
          </Button>

          <p className="m-0 font-body text-caption text-ink-500 text-center leading-relaxed">
            En confirmant, tu acceptes les <a href="#" className="text-primary-700 hover:underline">conditions d'utilisation</a> et la <a href="#" className="text-primary-700 hover:underline">politique de remboursement</a> (14 jours).
          </p>
        </div>

      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmPayment}
        variant="info"
        title={`Confirmer l'abonnement ${currentPlan.name}`}
        message={`Tu vas être prélevé de ${price} €${periodLabel}. Le prélèvement sera reconduit automatiquement. Continuer ?`}
        confirmText="Confirmer & payer"
        cancelText="Revenir"
      />
    </div>
  );
};

export default SubscriptionPayment;
