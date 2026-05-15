import React, { useState } from 'react';
import { Brain, Shield, Eye, Settings } from 'lucide-react';
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

// ─── Mock data ────────────────────────────────────────────────────────────────

const AI_CONSENT_ITEMS = [
  {
    id: 'ai-recommendations',
    label: 'Recommandations personnalisées',
    description: 'L\'IA analyse tes résultats pour te suggérer des parcours et exercices adaptés à ton niveau Dreyfus.',
    required: false,
    enabled: true,
  },
  {
    id: 'dreyfus-analysis',
    label: 'Analyse de progression Dreyfus',
    description: 'Utilisé pour évaluer ton niveau de compétence (Novice → Expert). Nécessaire au bon fonctionnement de la plateforme.',
    required: true,
    enabled: true,
  },
  {
    id: 'ai-content-suggestions',
    label: 'Suggestions de contenu IA',
    description: 'L\'IA sélectionne des articles, vidéos et ressources de veille en fonction de tes préférences déclarées.',
    required: false,
    enabled: true,
  },
  {
    id: 'ai-exercise-feedback',
    label: 'Feedback automatisé d\'exercices',
    description: 'L\'IA analyse tes réponses aux exercices et génère un feedback instantané pour accélérer ta progression.',
    required: false,
    enabled: false,
  },
  {
    id: 'model-improvement',
    label: 'Partage anonymisé pour amélioration du modèle',
    description: 'Tes données d\'apprentissage anonymisées contribuent à améliorer les modèles IA de la plateforme.',
    required: false,
    enabled: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfileConsent() {
  const [consents, setConsents] = useState(
    Object.fromEntries(AI_CONSENT_ITEMS.map((c) => [c.id, c.enabled]))
  );
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const toggleConsent = (id: string) => {
    const item = AI_CONSENT_ITEMS.find((c) => c.id === id);
    if (item?.required) return;
    setConsents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Profil · Consentements IA"
        title="Préférences IA & Données"
        summary="Contrôle comment l'IA utilise tes données pour personnaliser ton expérience d'apprentissage."
        tone="default"
        trailing={
          <Badge variant="info" size="md">IA Act conforme</Badge>
        }
      />

      <div className="max-w-content mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* ConsentBanner en contexte page */}
        {!bannerDismissed && (
          <ConsentBanner
            onAcceptAll={() => setBannerDismissed(true)}
            onRejectAll={() => setBannerDismissed(true)}
            onCustomize={() => setBannerDismissed(true)}
          />
        )}

        {/* AITransparencyLabel — carte explicative */}
        <Card variant="tinted" tone="primary" className="flex flex-col gap-stack">
          <div className="flex items-center gap-2">
            <AITransparencyLabel variant="assisted" size="md" />
            <span className="text-body-sm font-semibold text-primary-900">Comment l'IA utilise tes données</span>
          </div>
          <p className="text-body-sm text-primary-800 leading-relaxed">
            Nos modèles IA traitent tes données d'apprentissage uniquement sur les bases légales que tu as acceptées.
            Chaque traitement est documenté, auditable et conforme à l'IA Act européen (2024/1689).
            Tu peux modifier tes préférences à tout moment — les changements prennent effet immédiatement.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
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
          <div className="flex flex-col gap-3">
            {AI_CONSENT_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-section p-4 rounded-xl border border-ink-100 bg-white"
              >
                <div className="flex flex-col gap-tight flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-body-sm font-semibold text-ink-900">{item.label}</span>
                    {item.required && <Badge variant="info" size="sm">Requis</Badge>}
                  </div>
                  <p className="text-caption text-ink-500">{item.description}</p>
                </div>
                <Switch
                  checked={consents[item.id]}
                  onChange={() => toggleConsent(item.id)}
                  disabled={item.required}
                  label=""
                  aria-label={item.label}
                />
              </div>
            ))}
          </div>
          <div className="mt-stack">
            <Button variant="primary" size="md" leadingIcon={<Settings size={16} />}>
              Enregistrer
            </Button>
          </div>
        </SectionCard>

        {/* Droits IA — Article 22 RGPD */}
        <SectionCard
          title="Décisions IA — Droit à l'explication"
          titleIcon={<Shield size={18} />}
          description="Tu peux contester toute décision automatisée et demander une intervention humaine."
        >
          <Alert variant="info" icon={<Eye size={18} />}>
            Tu peux demander une explication sur toute recommandation IA et la remplacer par ton propre choix.
            Ce droit est garanti par l'article 22 du RGPD et l'article 86 de l'IA Act.
          </Alert>

          <div className="flex flex-col gap-3 mt-stack">
            <AIOverrideButton
              label="Rejeter la dernière recommandation IA"
              onOverride={() => {}}
              requireReason
              size="md"
            />

            <div className="p-4 rounded-xl border border-ink-100 bg-ink-50 flex flex-col gap-tight">
              <p className="text-body-sm font-semibold text-ink-900">Tes droits (Article 22 RGPD)</p>
              <ul className="flex flex-col gap-tight text-caption text-ink-600 list-disc list-inside">
                <li>Droit de ne pas faire l'objet d'une décision fondée exclusivement sur un traitement automatisé</li>
                <li>Droit d'obtenir une intervention humaine</li>
                <li>Droit d'exprimer ton point de vue et de contester la décision</li>
                <li>Droit à une explication claire sur la logique de la recommandation</li>
              </ul>
              <button className="self-start text-caption text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors duration-fast mt-1">
                Contacter l'équipe conformité →
              </button>
            </div>
          </div>
        </SectionCard>

      </div>
    </div>
  );
}
