/**
 * ProfilePrivacy : Confidentialité & RGPD (page unifiée).
 *
 * Phase 24 rationalization : fusionne l'ancienne ProfileConsent.tsx dans
 * cette page — deux pages séparées géraient des consentements qui se
 * chevauchaient (ex. "marketing" comptait deux fois, "recommandations IA"
 * aussi). Un seul concept = une seule ligne de toggle désormais.
 *
 * L'export DSAR et la suppression de compte ne sont plus dupliqués en
 * inline ici : ce sont des liens vers les vrais flows dédiés
 * (/profile/privacy/dsar, /profile/privacy/delete-account).
 *
 * Route : /profile/privacy (remplace aussi /profile/consent, supprimée)
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Trash2, Eye, ChevronRight,
  UserRound, BookOpen, Bot, ClipboardList, CreditCard as CreditCardIcon,
} from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { SettingsToggleRow } from '../components/patterns/SettingsRow';
import { AccountFamilyNav } from '../components/patterns/AccountFamilyNav';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { Alert } from '../components/ui/Alert';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { AIOverrideButton } from '../components/ui/AIOverrideButton';
import { ConsentBanner } from '../components/patterns/ConsentBanner';
import { usePrivacyStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { PageShell } from '../components/layout';

// ─── Mock data ────────────────────────────────────────────────────────────────

const CONSENT_HISTORY = [
  { id: 'h1', type: 'Recommandations IA', action: 'Accepté', date: '12 juin 2026', version: 'v2.1' },
  { id: 'h2', type: 'Analytics d\'apprentissage', action: 'Accepté', date: '12 juin 2026', version: 'v2.1' },
  { id: 'h3', type: 'Communications marketing', action: 'Refusé', date: '3 mars 2026', version: 'v2.0' },
  { id: 'h4', type: 'Communications marketing', action: 'Accepté', date: '18 jan. 2026', version: 'v1.5' },
];

const DATA_RETENTION = [
  { type: 'Données de profil', retention: '3 ans après résiliation', Icon: UserRound },
  { type: 'Historique de formation', retention: 'Durée abonnement + 2 ans', Icon: BookOpen },
  { type: 'Décisions IA', retention: '3 ans (audit RGPD)', Icon: Bot },
  { type: 'Journaux d\'audit', retention: '3 ans (obligation légale)', Icon: ClipboardList },
  { type: 'Données de paiement', retention: '5 ans (obligation fiscale)', Icon: CreditCardIcon },
];

// Données partagées avec des tiers internes (coach/manager) — distinct des
// cookies RGPD (ci-dessous) et des consentements IA (plus bas).
const SHARING_ITEMS = [
  {
    id: 'progress-analysis',
    label: 'Analyse de progression',
    description: 'Analyse de ta progression pour personnaliser les recommandations de contenu.',
    required: true,
  },
  {
    id: 'coach-sharing',
    label: 'Partage avec ton coach',
    description: 'Transmission de tes données de progression à ton coach assigné.',
    required: false,
  },
  {
    id: 'manager-reporting',
    label: 'Rapports manager',
    description: 'Inclusion de tes données anonymisées dans les rapports d\'équipe.',
    required: false,
  },
];

const AI_CONSENT_ITEMS = [
  {
    id: 'aiRecommendations' as const,
    label: 'Recommandations personnalisées',
    description: 'L\'IA analyse tes résultats pour te suggérer des parcours et exercices adaptés à ton niveau Dreyfus.',
    required: false,
  },
  {
    id: 'dreyfusAnalysis' as const,
    label: 'Analyse de progression Dreyfus',
    description: 'Utilisé pour évaluer ton niveau de compétence (Novice → Expert). Nécessaire au bon fonctionnement de la plateforme.',
    required: true,
  },
  {
    id: 'aiContentSuggestions' as const,
    label: 'Suggestions de contenu IA',
    description: 'L\'IA sélectionne des articles, vidéos et ressources de veille en fonction de tes préférences déclarées.',
    required: false,
  },
  {
    id: 'aiExerciseFeedback' as const,
    label: 'Feedback automatisé d\'exercices',
    description: 'L\'IA analyse tes réponses aux exercices et génère un feedback instantané pour accélérer ta progression.',
    required: false,
  },
  {
    id: 'modelImprovement' as const,
    label: 'Partage anonymisé pour amélioration du modèle',
    description: 'Tes données d\'apprentissage anonymisées contribuent à améliorer les modèles IA de la plateforme.',
    required: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfilePrivacy() {
  const navigate = useNavigate();
  const privacyStore = usePrivacyStore();
  const gdpr = privacyStore.getGdprConsents(MOCK_USER_ID);
  const ai = privacyStore.getAIConsents(MOCK_USER_ID);

  const [sharing, setSharing] = useState(
    Object.fromEntries(SHARING_ITEMS.map((c) => [c.id, c.required || c.id !== 'manager-reporting']))
  );

  const toggleSharing = (id: string) => {
    const item = SHARING_ITEMS.find((c) => c.id === id);
    if (item?.required) return;
    setSharing((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAI = (id: typeof AI_CONSENT_ITEMS[number]['id']) => {
    const item = AI_CONSENT_ITEMS.find((c) => c.id === id);
    if (item?.required) return;
    privacyStore.updateAIConsents(MOCK_USER_ID, { [id]: !ai[id] });
  };

  return (
    /* Le haut de page est celui de la coque (48), comme sur le profil : la
       navigation du compte collait au bord. */
    <PageShell width="content">
      <AccountFamilyNav active="privacy" />

      <EditorialHero
        eyebrow="Confidentialité · RGPD & IA Act"
        title="Confidentialité & RGPD"
        summary="Gère tes préférences de confidentialité, consulte les données collectées et exerce tes droits RGPD."
        tone="flat"
        trailing={
          <div className="flex items-center gap-stack-xs flex-wrap">
            <Badge variant="success" size="normal">RGPD conforme</Badge>
            <Badge variant="info" size="normal">IA Act conforme</Badge>
          </div>
        }
      />

      {/* Chaque réglage est une section : son titre (h2 28) et sa phrase
          d'explication (16, ink-700) sur la page, ses rangées dans une carte.
          Les titres étaient à 20 px dans les cartes, précédés d'une icône
          décorative, et la page sautait du h1 au h3. 48 entre deux sections,
          16 entre un titre et sa carte. */}
      <div className="flex flex-col gap-page">
        {/* Info alert */}
        <Alert variant="info" icon={<Shield size={18} />}>
          Tes données sont hébergées en Europe et traitées conformément au Règlement Général sur la Protection des Données (RGPD). Tu peux exercer tes droits à tout moment.
        </Alert>

        {/* ConsentBanner GDPR : dismiss persisted (Cahier #13bis) */}
        {!gdpr.bannerDismissed && (
          <ConsentBanner
            onAcceptAll={() => privacyStore.updateGdprConsents(MOCK_USER_ID, { analytics: true, marketing: true, bannerDismissed: true })}
            onRejectAll={() => privacyStore.updateGdprConsents(MOCK_USER_ID, { analytics: false, marketing: false, bannerDismissed: true })}
            onCustomize={() => privacyStore.updateGdprConsents(MOCK_USER_ID, { bannerDismissed: true })}
          />
        )}

        {/* Cookies & Données GDPR (Cahier #13bis § Consent Management) */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Cookies & Données"
            subtitle="Consentements RGPD : essentiel (requis), analytique, marketing."
          />
          <Card>
            <div className="flex flex-col divide-y divide-ink-100">
              <SettingsToggleRow
                id="cookie-essential"
                label="Essentiel"
                description="Nécessaire au fonctionnement de la plateforme (connexion, sécurité). Non désactivable."
                checked={gdpr.essential}
                onChange={() => {}}
                required
              />
              <SettingsToggleRow
                id="cookie-analytics"
                label="Analytique"
                description="Mesure d'audience anonymisée pour améliorer l'expérience (Google Analytics équivalent)."
                checked={gdpr.analytics}
                onChange={(v) => privacyStore.updateGdprConsents(MOCK_USER_ID, { analytics: v })}
              />
              <SettingsToggleRow
                id="cookie-marketing"
                label="Marketing"
                description="Personnalisation des communications commerciales et emails promotionnels."
                checked={gdpr.marketing}
                onChange={(v) => privacyStore.updateGdprConsents(MOCK_USER_ID, { marketing: v })}
              />
            </div>
          </Card>
        </section>

        {/* Partage de données internes (coach/manager) */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Partage de données"
            subtitle="Contrôle comment tes données de progression sont partagées en interne."
          />
          <Card className="flex flex-col gap-0">
            <div className="flex flex-col divide-y divide-ink-100">
              {SHARING_ITEMS.map((item) => (
                <SettingsToggleRow
                  key={item.id}
                  id={`sharing-${item.id}`}
                  label={item.label}
                  description={item.description}
                  checked={sharing[item.id]}
                  onChange={() => toggleSharing(item.id)}
                  required={item.required}
                />
              ))}
            </div>
            {/* Contenu → actions 24 (12 + filet + 12), comme SectionCard. */}
            <div className="mt-stack-sm pt-stack-sm border-t border-ink-100">
              <Button emphasis="soft" size="sm">Enregistrer</Button>
            </div>
          </Card>
        </section>

        {/* AITransparencyLabel : carte explicative. Ses trois garanties sont
            des faits : MetaPill (la donnée chuchote), plus des Badge. */}
        <Card variant="tinted" tone="primary" className="flex flex-col gap-stack">
          <div className="flex items-center gap-stack-xs flex-wrap">
            <AITransparencyLabel variant="assisted" size="md" />
            <span className="text-body font-semibold text-primary-900">Comment l'IA utilise tes données</span>
          </div>
          <p className="text-body text-primary-800 max-w-prose">
            Nos modèles IA traitent tes données d'apprentissage uniquement sur les bases légales que tu as acceptées.
            Chaque traitement est documenté, auditable et conforme à l'IA Act européen (2024/1689).
            Tu peux modifier tes préférences à tout moment : les changements prennent effet immédiatement.
          </p>
          <div className="flex items-center gap-stack-xs flex-wrap">
            <MetaPill text="Hébergement EU" tone="info" />
            <MetaPill text="Chiffrement AES-256" tone="success" />
            <MetaPill text="Rétention 3 ans max" tone="neutral" />
          </div>
        </Card>

        {/* Consentements IA granulaires */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Consentements IA"
            subtitle="Active ou désactive chaque usage de l'IA sur tes données d'apprentissage."
          />
          <Card className="flex flex-col gap-0">
            <div className="flex flex-col divide-y divide-ink-100">
              {AI_CONSENT_ITEMS.map((item) => (
                <SettingsToggleRow
                  key={item.id}
                  id={`ai-${item.id}`}
                  label={item.label}
                  description={item.description}
                  checked={ai[item.id]}
                  onChange={() => toggleAI(item.id)}
                  required={item.required}
                />
              ))}
            </div>
            <div className="mt-stack-sm pt-stack-sm border-t border-ink-100">
              <Button emphasis="soft" size="sm">Enregistrer</Button>
            </div>
          </Card>
        </section>

        {/* Droits IA : Article 22 RGPD */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Décisions IA : Droit à l'explication"
            subtitle="Tu peux contester toute décision automatisée et demander une intervention humaine."
          />
          <Alert variant="info" icon={<Eye size={18} />}>
            Tu peux demander une explication sur toute recommandation IA et la remplacer par ton propre choix.
            Ce droit est garanti par l'article 22 du RGPD et l'article 86 de l'IA Act.
          </Alert>

          <AIOverrideButton
            voix="tu"
            label="Rejeter la dernière recommandation IA"
            onOverride={() => {}}
            requireReason
            size="md"
          />

          {/* Les droits sont un texte qu'on lit : corps 16 ink-700, puces en
              retrait suspendu (les lignes longues ne repassent plus sous la
              puce). Ils étaient en légende 13 à 2 px d'écart. */}
          <div className="flex flex-col gap-stack-xs rounded-xl border border-ink-100 bg-ink-50 p-stack-lg">
            <p className="text-body font-semibold text-ink-900">Tes droits (Article 22 RGPD)</p>
            <ul className="flex flex-col gap-stack-3xs text-body text-ink-700 list-disc pl-5 max-w-prose">
              <li>Droit de ne pas faire l'objet d'une décision fondée exclusivement sur un traitement automatisé</li>
              <li>Droit d'obtenir une intervention humaine</li>
              <li>Droit d'exprimer ton point de vue et de contester la décision</li>
              <li>Droit à une explication claire sur la logique de la recommandation</li>
            </ul>
            <button className="mt-stack-xs self-start text-caption font-semibold text-primary-800 hover:text-primary-900 underline underline-offset-2 transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm">
              Contacter l'équipe conformité →
            </button>
          </div>
        </section>

        {/* DSAR : Data access request — lien vers le vrai flow dédié. Une
            carte, plus une carte dans une carte. */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Mes données personnelles"
            subtitle="Consulte ou exporte toutes les données que nous détenons sur toi."
          />
          <Card className="flex flex-row flex-wrap items-center justify-between gap-stack">
            <div className="flex flex-col gap-stack-3xs min-w-0">
              <span className="text-body font-semibold text-ink-900">Demande d'accès (DSAR)</span>
              <span className="text-caption text-ink-600">Exporte toutes tes données · réponse sous 30 jours (Article 15 RGPD)</span>
            </div>
            {/* L'action de la carte : `soft` (arbitrage n°19). La page n'a pas
                d'aplat : chaque section enregistre ou ouvre la sienne. */}
            <Button emphasis="soft" size="sm" trailingIcon={<ChevronRight size={14} />} onClick={() => navigate('/profile/privacy/dsar')}>
              Faire une demande
            </Button>
          </Card>
        </section>

        {/* Account deletion — lien vers le vrai wizard 2 étapes. Le ton
            « danger » du bouton, plutôt que des classes qui repeignaient un
            bouton de marque. Sur une page, une action destructive n'est pas
            l'action principale : `ghost` + `danger` (arbitrage n°19). Le
            `solid` danger est réservé à la confirmation, à l'étape 2. */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Suppression du compte"
            subtitle="La suppression est définitive et irréversible."
          />
          <div className="flex flex-wrap items-center gap-stack-sm">
            <Button
              emphasis="ghost"
              tone="danger"
              size="md"
              leadingIcon={<Trash2 size={16} />}
              onClick={() => navigate('/profile/privacy/delete-account')}
            >
              Supprimer mon compte
            </Button>
            <span className="text-caption text-ink-600">Toutes tes données seront effacées sous 30 jours.</span>
          </div>
        </section>

        {/* Consent history */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Historique des consentements"
            subtitle="Trace de tes acceptations et refus, avec horodatage et version des CGU."
          />
          <Card>
            <ul className="flex flex-col divide-y divide-ink-100">
              {CONSENT_HISTORY.map((h) => (
                <li key={h.id} className="flex items-center justify-between py-stack-sm first:pt-0 last:pb-0 gap-stack">
                  <div className="flex flex-col gap-stack-3xs flex-1 min-w-0">
                    <span className="text-body font-semibold text-ink-900">{h.type}</span>
                    <span className="text-caption text-ink-600 tabular-nums">{h.date} · {h.version}</span>
                  </div>
                  <Badge
                    variant={h.action === 'Accepté' ? 'success' : 'neutral'}
                    size="compact"
                  >
                    {h.action}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Data retention policy — les durées en rangées dans la carte (elles
            étaient sept boîtes grises dans une carte) ; le libellé en corps,
            la durée à droite en ink-700. */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Conservation des données"
            subtitle="Durées légales de conservation de tes données selon les catégories."
          />
          <Alert variant="info" icon={<Shield size={16} />}>
            Tes données sont conservées au minimum requis par la loi et supprimées automatiquement à l'échéance.
          </Alert>
          <Card>
            <ul className="flex flex-col divide-y divide-ink-100">
              {DATA_RETENTION.map((r) => (
                <li key={r.type} className="flex items-center justify-between gap-stack py-stack-sm first:pt-0 last:pb-0">
                  <span className="flex items-center gap-stack-xs text-body text-ink-900">
                    <r.Icon size={16} className="text-ink-600 shrink-0" aria-hidden="true" />
                    {r.type}
                  </span>
                  <span className="text-body text-ink-700 text-right shrink-0">{r.retention}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Legal links — la coque pose déjà la marge du bas. */}
        <div className="flex flex-wrap gap-x-stack gap-y-stack-xs">
          {['Politique de confidentialité', 'Conditions d\'utilisation', 'Mentions légales', 'Politique cookies'].map((link) => (
            <button key={link} className="text-caption text-primary-800 hover:text-primary-900 underline underline-offset-2 transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm">
              {link}
            </button>
          ))}
        </div>

      </div>
    </PageShell>
  );
}
