import React from 'react';
import { Brain, Shield, Eye, Settings, Cookie } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { ConsentBanner } from '../components/patterns/ConsentBanner';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Switch } from '../components/core/Input';
import { Badge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { AIOverrideButton } from '../components/ui/AIOverrideButton';
import { usePrivacyStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { useToastContext } from '../contexts/ToastContext';
import { Container } from '../components/layout';

// ─── AI consent item definitions ─────────────────────────────────────────────

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

export default function ProfileConsent() {
  const privacyStore = usePrivacyStore();
  const toast = useToastContext();
  const gdpr = privacyStore.getGdprConsents(MOCK_USER_ID);
  const ai = privacyStore.getAIConsents(MOCK_USER_ID);

  const toggleAI = (id: typeof AI_CONSENT_ITEMS[number]['id']) => {
    const item = AI_CONSENT_ITEMS.find((c) => c.id === id);
    if (item?.required) return;
    privacyStore.updateAIConsents(MOCK_USER_ID, { [id]: !ai[id] });
  };

  const saveAI = () => toast.success('Préférences IA mises à jour.', 'Enregistré');

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Profil · Consentements IA"
        title="Préférences IA & Données"
        summary="Contrôle comment l'IA utilise tes données pour personnaliser ton expérience d'apprentissage."
        tone="flat"
        trailing={
          <Badge variant="info" size="md">IA Act conforme</Badge>
        }
      />

      <Container width="content" padding={false} className="px-stack md:px-section flex flex-col gap-section">

        {/* ConsentBanner GDPR : dismiss persisted (Cahier #13bis) */}
        {!gdpr.bannerDismissed && (
          <ConsentBanner
            onAcceptAll={() => privacyStore.updateGdprConsents(MOCK_USER_ID, { analytics: true, marketing: true, bannerDismissed: true })}
            onRejectAll={() => privacyStore.updateGdprConsents(MOCK_USER_ID, { analytics: false, marketing: false, bannerDismissed: true })}
            onCustomize={() => privacyStore.updateGdprConsents(MOCK_USER_ID, { bannerDismissed: true })}
          />
        )}

        {/* Consentements GDPR : 3 types spec (Cahier #13bis § Consent Management) */}
        <SectionCard
          title="Cookies & Données"
          titleIcon={<Cookie size={18} />}
          description="Consentements RGPD : essential (requis), analytique, marketing."
        >
          <div className="flex flex-col gap-stack">
            {[
              { key: 'essential' as const, label: 'Essentiel', desc: 'Nécessaire au fonctionnement de la plateforme (connexion, sécurité). Non désactivable.', required: true },
              { key: 'analytics' as const, label: 'Analytique', desc: 'Mesure d\'audience anonymisée pour améliorer l\'expérience (Google Analytics équivalent).', required: false },
              { key: 'marketing' as const, label: 'Marketing', desc: 'Personnalisation des communications commerciales et emails promotionnels.', required: false },
            ].map(({ key, label, desc, required }) => (
              <div key={key} className="flex items-start justify-between gap-section p-stack rounded-xl border border-ink-100 bg-white">
                <div className="flex flex-col gap-tight flex-1">
                  <div className="flex items-center gap-stack-xs">
                    <span className="text-body-sm font-semibold text-ink-900">{label}</span>
                    {required && <Badge variant="info" size="sm">Requis</Badge>}
                  </div>
                  <p className="text-caption text-ink-700">{desc}</p>
                </div>
                <Switch
                  checked={gdpr[key]}
                  onChange={(e) => !required && privacyStore.updateGdprConsents(MOCK_USER_ID, { [key]: e.target.checked })}
                  disabled={required}
                  label=""
                  aria-label={label}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* AITransparencyLabel : carte explicative */}
        <Card variant="tinted" tone="primary" className="flex flex-col gap-stack">
          <div className="flex items-center gap-stack-xs">
            <AITransparencyLabel variant="assisted" size="md" />
            <span className="text-body-sm font-semibold text-primary-900">Comment l'IA utilise tes données</span>
          </div>
          <p className="text-body-sm text-primary-800 leading-relaxed">
            Nos modèles IA traitent tes données d'apprentissage uniquement sur les bases légales que tu as acceptées.
            Chaque traitement est documenté, auditable et conforme à l'IA Act européen (2024/1689).
            Tu peux modifier tes préférences à tout moment : les changements prennent effet immédiatement.
          </p>
          <div className="flex items-center gap-stack-xs flex-wrap">
            <Badge variant="info" size="sm">Hébergement EU</Badge>
            <Badge variant="success" size="sm">Chiffrement AES-256</Badge>
            <Badge variant="neutral" size="sm">Rétention 3 ans max</Badge>
          </div>
        </Card>

        {/* Consentements IA granulaires */}
        <SectionCard
          title="Consentements IA"
          titleIcon={<Brain size={18} />}
          description="Active ou désactive chaque usage de l'IA sur tes données d'apprentissage."
        >
          <div className="flex flex-col gap-stack">
            {AI_CONSENT_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-section p-stack rounded-xl border border-ink-100 bg-white"
              >
                <div className="flex flex-col gap-tight flex-1">
                  <div className="flex items-center gap-stack-xs">
                    <span className="text-body-sm font-semibold text-ink-900">{item.label}</span>
                    {item.required && <Badge variant="info" size="sm">Requis</Badge>}
                  </div>
                  <p className="text-caption text-ink-700">{item.description}</p>
                </div>
                <Switch
                  checked={ai[item.id]}
                  onChange={() => toggleAI(item.id)}
                  disabled={item.required}
                  label=""
                  aria-label={item.label}
                />
              </div>
            ))}
          </div>
          <div className="mt-stack">
            <Button variant="primary" size="md" leadingIcon={<Settings size={16} />} onClick={saveAI}>
              Enregistrer
            </Button>
          </div>
        </SectionCard>

        {/* Droits IA : Article 22 RGPD */}
        <SectionCard
          title="Décisions IA : Droit à l'explication"
          titleIcon={<Shield size={18} />}
          description="Tu peux contester toute décision automatisée et demander une intervention humaine."
        >
          <Alert variant="info" icon={<Eye size={18} />}>
            Tu peux demander une explication sur toute recommandation IA et la remplacer par ton propre choix.
            Ce droit est garanti par l'article 22 du RGPD et l'article 86 de l'IA Act.
          </Alert>

          <div className="flex flex-col gap-stack mt-stack">
            <AIOverrideButton
              label="Rejeter la dernière recommandation IA"
              onOverride={() => {}}
              requireReason
              size="md"
            />

            <div className="p-stack rounded-xl border border-ink-100 bg-ink-50 flex flex-col gap-tight">
              <p className="text-body-sm font-semibold text-ink-900">Tes droits (Article 22 RGPD)</p>
              <ul className="flex flex-col gap-tight text-caption text-ink-600 list-disc list-inside">
                <li>Droit de ne pas faire l'objet d'une décision fondée exclusivement sur un traitement automatisé</li>
                <li>Droit d'obtenir une intervention humaine</li>
                <li>Droit d'exprimer ton point de vue et de contester la décision</li>
                <li>Droit à une explication claire sur la logique de la recommandation</li>
              </ul>
              <button className="self-start text-caption text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors duration-fast mt-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm">
                Contacter l'équipe conformité →
              </button>
            </div>
          </div>
        </SectionCard>

      </Container>
    </div>
  );
}
