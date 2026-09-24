/**
 * SubscriptionPayment — Choix de formule + paiement.
 *
 * Flow : étape de l'onboarding après Positionnement, avant accès parcours.
 *
 * Structure :
 *  1. PageHeader centré « Choisis ta formule »
 *  2. Plan selector — 4 cartes de formule en 2 × 2 (Gratuit / Plan 1 / 2 / 3)
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
import { PageHeader } from '../components/patterns/PageHeader';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { FormGroup } from '../components/core/FormGroup';
import { MetaPill } from '../components/ui/MetaPill';
import { IconChip } from '../components/ui/IconChip';
import { ConfirmModal } from '../components/modals/ConfirmModal';
import { TlsLogo } from '../components/ui/TlsLogo';
import { useToastContext } from '../contexts/ToastContext';
import { useUserProfileStore, useOnboardingStore } from '../stores/persistence';
import { Stepper } from '../components/ui/Stepper';
import { buildOnboardingStepperItems } from '../lib/onboarding-steps';
import { PageShell } from '../components/layout';
import { CARD_HOVER } from '../lib/tone-classes';
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
  // Par défaut, le forfait Gratuit : présélectionner une formule payante
  // (Plan 2 à 29 €) poussait vers l'achat (audit du 23/09).
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(
    (onboardingStore.selectedPlan as PlanId | null) ?? 'free'
  );
  const [showConfirm, setShowConfirm] = useState(false);

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const currentPlan = PLANS.find((p) => p.id === selectedPlan)!;
  const price = billing === 'monthly' ? currentPlan.monthly : currentPlan.yearly;
  const periodLabel = billing === 'monthly' ? '/mois' : '/an';

  // Le forfait Gratuit n'exige pas de carte : pas de formulaire, pas de
  // prélèvement à confirmer. La carte n'est demandée que pour un forfait payant.
  const isFree = currentPlan.monthly === 0;

  const isFormValid =
    isFree ||
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
    if (isFree) {
      toast.success('Formule Gratuite activée', 'Bienvenue dans The Learning Society.');
    } else {
      toast.success('Paiement confirmé', 'Bienvenue dans The Learning Society.');
    }
    setTimeout(() => navigate('/onboarding/tutorial'), 1200);
  };

  /* ── Layout ──────────────────────────────────────────────────────────── */

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-page-ambient-warm" aria-hidden />

      {/* Gouttière standard : PageShell la délègue au <main> d'AppLayout, et
          cette page est rendue hors de la coque — elle touchait le bord à 375 px. */}
      <div className="px-4 sm:px-6 lg:px-10">
      {/* Passe typographique du 2026-09-24 : le haut de page au padding de la
          coque ; l'en-tête (`PageHeader` centré : surtitre 13 / 600 ink-600 au
          lieu des capitales teal qui doublaient le stepper, h1 à 36 au lieu de
          28, chapô 18 ink-700) forme un bloc avec le choix de formule ; le
          paiement est une section à h2 (la page sautait du h1 aux h3) ; les
          cartes de formule ont l'anatomie d'une carte (rayon 20, padding 24),
          leur action le rayon de son étage (14 : 40 px de haut, au-dessus du
          seuil de la pilule) ; les montants et libellés en encre ; l'offre et
          la remise sont des données (`MetaPill`). */}
      <PageShell width="content" className="relative z-base">

        {/* Brand bar */}
        <div className="flex items-center justify-between">
          <div className="w-20" />
          <a href="/dashboard" aria-label="The Learning Society" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 rounded-sm">
            <TlsLogo size={36} variant="color" withBubble />
          </a>
          <div className="w-20 flex justify-end">
            {/* « Passer » saute CETTE étape, pas l'onboarding : il mène à l'étape suivante du flux.
                Il envoyait au tableau de bord sans marquer l'onboarding fait. */}
            <button
              onClick={() => navigate('/onboarding/tutorial')}
              className="font-body text-caption text-ink-600 hover:text-ink-900 transition-colors duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm min-h-touch flex items-center"
            >
              Passer
            </button>
          </div>
        </div>

        {/* Cross-screen Stepper */}
        <Stepper items={buildOnboardingStepperItems('paiement', onboardingStore.accountType)} orientation="horizontal" />

        {/* En-tête et choix de formule : un bloc (32 sous l'en-tête) */}
        <div className="flex flex-col gap-section">
          <PageHeader
            align="center"
            variant="tight"
            eyebrow={{ text: 'Abonnement' }}
            title="Choisis ta formule"
            description="Démarre en quelques secondes. Annulable à tout moment, sans frais."
          />

          <div className="flex flex-col gap-stack-lg">
            {/* Billing toggle */}
            <div className="flex justify-center">
              <div role="group" aria-label="Période de facturation" className="inline-flex p-1 rounded-pill bg-ink-100 border border-ink-200">
                <button
                  type="button"
                  onClick={() => setBilling('monthly')}
                  aria-pressed={billing === 'monthly'}
                  className={`px-4 py-1.5 rounded-pill font-body text-body font-semibold transition-colors duration-base ${billing === 'monthly' ? 'bg-white text-ink-900 shadow-xs' : 'text-ink-700 hover:text-ink-900'}`}
                >
                  Mensuel
                </button>
                <button
                  type="button"
                  onClick={() => setBilling('yearly')}
                  aria-pressed={billing === 'yearly'}
                  className={`inline-flex items-center gap-stack-2xs px-4 py-1.5 rounded-pill font-body text-body font-semibold transition-colors duration-base ${billing === 'yearly' ? 'bg-white text-ink-900 shadow-xs' : 'text-ink-700 hover:text-ink-900'}`}
                >
                  Annuel
                  <MetaPill text={'\u221220\u00a0%'} tone="sun" />
                </button>
              </div>
            </div>

            {/* Plans grid — la pastille « Recommandé » déborde de 12 px au-dessus
                de sa carte : 12 de plus au-dessus de la grille, et 24 entre deux
                rangs (à 16, elle venait à 4 px de la carte du dessus). */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-stack gap-y-stack-lg mt-stack-sm">
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
                      'group relative text-left flex flex-col gap-stack p-stack-lg rounded-xl border-2 transition-all duration-base cursor-pointer',
                      isSelected
                        ? 'bg-white border-primary-500 ring-2 ring-primary-200'
                        : plan.highlight
                        ? `bg-gradient-to-br from-primary-50 to-white border-primary-300 ${CARD_HOVER['primary']}`
                        : `bg-white border-ink-100 ${CARD_HOVER['primary']}`,
                    ].join(' ')}
                  >
                    {plan.badge && (
                      <span className="absolute -top-3 left-stack-lg inline-flex items-center px-2.5 py-0.5 rounded-pill bg-gradient-to-r from-primary-700 to-primary-800 text-white text-micro font-bold uppercase tracking-label shadow-sm">
                        {plan.badge}
                      </span>
                    )}

                    <div className="flex items-start gap-stack-sm">
                      <IconChip size="md" tone={plan.highlight ? 'brand' : 'neutral'} surface={plan.highlight ? 'tinted' : 'default'}>
                        {plan.icon}
                      </IconChip>
                      {/* Pas de titre dans un bouton (contenu de phrasé seulement) : le
                          nom de formule est un libellé au pas du titre de bloc. */}
                      <span className="flex flex-col gap-stack-3xs">
                        <span className="block font-display text-h3 text-ink-900">
                          {plan.name}
                        </span>
                        <span className="block font-body text-caption text-ink-600">
                          {plan.tagline}
                        </span>
                      </span>
                    </div>

                    <p className="flex items-baseline gap-stack-3xs">
                      <span className="font-display text-h2 text-ink-900 tabular-nums">
                        {planPrice}{'\u00a0'}€
                      </span>
                      <span className="font-body text-body text-ink-600">
                        {periodLabel}
                      </span>
                    </p>

                    <ul className="flex flex-col gap-stack-2xs">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-stack-xs font-body text-body text-ink-700">
                          {/* Une ligne de haut : la coche se centre sur la première ligne. */}
                          <span className="shrink-0 inline-flex items-center h-lh text-primary-700" aria-hidden="true">
                            <Check size={14} />
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Arbitrage n°19 : la pastille « Sélectionnée » dit un état.
                        Elle portait l'aplat au cran 700, le même que l'action
                        principale de l'écran (« Confirmer le paiement ») : elle
                        prend l'apparence du `soft` (fond 50, label 800, filet
                        700 en anneau intérieur, qui ne change pas sa hauteur). */}
                    <div className="mt-auto pt-stack-xs">
                      <span
                        className={[
                          'inline-flex items-center justify-center w-full px-4 py-2 rounded-lg font-body text-body font-semibold transition-colors duration-base',
                          isSelected
                            ? 'bg-primary-50 text-primary-800 ring-1 ring-inset ring-primary-700'
                            : 'bg-ink-100 text-ink-700 group-hover:bg-primary-50 group-hover:text-primary-800',
                        ].join(' ')}
                      >
                        {isSelected ? 'Sélectionnée' : 'Choisir cette formule'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Payment form — forfait payant seulement */}
        {!isFree && (
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Informations de paiement"
            subtitle="Paiement sécurisé par Stripe. Aucune donnée bancaire n'est stockée sur nos serveurs."
          />
          <Card className="flex flex-col gap-stack">
            <FormGroup label="Nom sur la carte" id="card-name" required>
              <Input
                id="card-name"
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Nom tel qu'il figure sur la carte"
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
          </Card>
        </section>
        )}

        {/* Summary + CTA */}
        <div className="flex flex-col gap-stack-lg p-stack-lg rounded-xl bg-primary-50/60 border border-primary-200">
          <div className="flex items-start justify-between gap-stack">
            <dl className="flex flex-col gap-stack-3xs">
              <dt className="font-body text-caption font-semibold text-ink-600">
                Total à payer
              </dt>
              <dd className="font-display text-h3 text-ink-900 tabular-nums">
                {price}{'\u00a0'}€<span className="font-body text-body font-normal text-ink-600">{periodLabel}</span>
              </dd>
            </dl>
            <MetaPill text={currentPlan.name} tone="brand" />
          </div>

          <div className="flex flex-col gap-stack-sm">
            <Button
              emphasis="solid"
              tone="brand"
              size="lg"
              fullWidth
              leadingIcon={<ShieldCheck size={18} />}
              disabled={!isFormValid}
              onClick={() => (isFree ? handleConfirmPayment() : setShowConfirm(true))}
            >
              {isFree ? 'Continuer avec la formule Gratuite' : 'Confirmer le paiement'}
            </Button>

            {/* Liens au cran 800 : le 700 tient 4,48:1 sur ce fond primary-50, sous le seuil. */}
            <p className="font-body text-caption text-ink-600 text-center">
              En confirmant, tu acceptes les <a href="/website/cgv-cgu" target="_blank" rel="noopener noreferrer" className="text-primary-800 underline underline-offset-2 hover:no-underline">conditions d'utilisation</a> et la <a href="/website/cgv-cgu" target="_blank" rel="noopener noreferrer" className="text-primary-800 underline underline-offset-2 hover:no-underline">politique de remboursement</a> (14 jours).
            </p>
          </div>
        </div>

      </PageShell>
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
