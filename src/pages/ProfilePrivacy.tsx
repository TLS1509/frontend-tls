import React, { useState } from 'react';
import { Shield, Eye, Trash2, Download, Lock, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { FormGroup } from '../components/core/FormGroup';
import { Alert } from '../components/ui/Alert';
import { ConsentBanner } from '../components/patterns/ConsentBanner';
import { Switch } from '../components/core/Input';
import { Container } from '../components/layout';

// ─── Mock data ────────────────────────────────────────────────────────────────

const CONSENT_ITEMS = [
  {
    id: 'analytics',
    label: 'Analytics d\'apprentissage',
    description: 'Analyse de ta progression pour personnaliser les recommandations de contenu.',
    required: true,
    enabled: true,
  },
  {
    id: 'ai-recommendations',
    label: 'Recommandations IA',
    description: 'Utilisation de l\'IA pour suggérer des parcours, exercices et ressources adaptés.',
    required: false,
    enabled: true,
  },
  {
    id: 'coach-sharing',
    label: 'Partage avec ton coach',
    description: 'Transmission de tes données de progression à ton coach assigné.',
    required: false,
    enabled: true,
  },
  {
    id: 'manager-reporting',
    label: 'Rapports manager',
    description: 'Inclusion de tes données anonymisées dans les rapports d\'équipe.',
    required: false,
    enabled: false,
  },
  {
    id: 'marketing',
    label: 'Communications marketing',
    description: 'Envoi de newsletters, webinaires et offres de formation.',
    required: false,
    enabled: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfilePrivacy() {
  const [consents, setConsents] = useState(
    Object.fromEntries(CONSENT_ITEMS.map((c) => [c.id, c.enabled]))
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleConsent = (id: string) => {
    const item = CONSENT_ITEMS.find((c) => c.id === id);
    if (item?.required) return;
    setConsents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Profil · Confidentialité"
        title="Confidentialité & RGPD"
        summary="Gère tes préférences de confidentialité, consulte les données collectées et exerce tes droits RGPD."
        tone="flat"
        trailing={
          <Badge variant="success" size="md">Données protégées · RGPD conforme</Badge>
        }
      />

      <Container width="content" padding={false} className="px-stack md:px-section flex flex-col gap-section">

        {/* Info alert */}
        <Alert variant="info" icon={<Shield size={18} />}>
          Tes données sont hébergées en Europe et traitées conformément au Règlement Général sur la Protection des Données (RGPD). Tu peux exercer tes droits à tout moment.
        </Alert>

        {/* Consent management */}
        <SectionCard
          title="Préférences de consentement"
          titleIcon={<Eye size={18} />}
          description="Contrôle comment tes données sont utilisées sur la plateforme."
        >
          <div className="flex flex-col gap-stack-xs">
            {CONSENT_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-section p-stack rounded-xl border border-ink-100 bg-white"
              >
                <div className="flex flex-col gap-tight flex-1">
                  <div className="flex items-center gap-stack-xs">
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
            <Button variant="primary" size="md">
              Enregistrer mes préférences
            </Button>
          </div>
        </SectionCard>

        {/* DSAR : Data access request */}
        <SectionCard
          title="Mes données personnelles"
          titleIcon={<Download size={18} />}
          description="Consulte ou exporte toutes les données que nous détenons sur toi."
        >
          <div className="flex flex-col gap-stack-xs">
            <Card variant="default" className="flex items-center justify-between px-stack py-3">
              <div className="flex flex-col gap-tight">
                <span className="text-body-sm font-semibold text-ink-900">Exporter mes données</span>
                <span className="text-caption text-ink-500">Télécharge une copie de toutes tes données (JSON/PDF)</span>
              </div>
              <Button variant="ghost" size="sm" leadingIcon={<Download size={14} />}>
                Exporter
              </Button>
            </Card>
            <Card variant="default" className="flex items-center justify-between px-stack py-3">
              <div className="flex flex-col gap-tight">
                <span className="text-body-sm font-semibold text-ink-900">Demande d'accès (DSAR)</span>
                <span className="text-caption text-ink-500">Demande un rapport complet de tes données : réponse sous 30 jours</span>
              </div>
              <Button variant="ghost" size="sm" trailingIcon={<ChevronRight size={14} />}>
                Soumettre
              </Button>
            </Card>
          </div>
        </SectionCard>

        {/* Account deletion */}
        <SectionCard
          title="Suppression du compte"
          titleIcon={<Trash2 size={18} />}
          description="La suppression est définitive et irréversible."
        >
          {!showDeleteConfirm ? (
            <div className="flex items-center gap-stack-xs">
              <Button
                variant="ghost"
                size="md"
                leadingIcon={<Trash2 size={16} />}
                className="text-danger-fg hover:bg-danger-bg"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Supprimer mon compte
              </Button>
              <span className="text-caption text-ink-400">Toutes tes données seront effacées sous 30 jours.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-stack-xs">
              <Alert variant="danger" icon={<Trash2 size={18} />}>
                Cette action est irréversible. Toutes tes données de progression, badges et historique seront supprimés définitivement.
              </Alert>
              <div className="flex items-center gap-stack-xs">
                <Button variant="ghost" size="md" className="text-danger-fg border border-danger-border hover:bg-danger-bg">
                  Confirmer la suppression
                </Button>
                <Button variant="ghost" size="md" onClick={() => setShowDeleteConfirm(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </SectionCard>

        {/* Legal links */}
        <div className="flex flex-wrap gap-stack pb-section">
          {['Politique de confidentialité', 'Conditions d\'utilisation', 'Mentions légales', 'Politique cookies'].map((link) => (
            <button key={link} className="text-caption text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm">
              {link}
            </button>
          ))}
        </div>

      </Container>
    </div>
  );
}
