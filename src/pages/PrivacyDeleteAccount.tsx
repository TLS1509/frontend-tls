import React, { useState } from 'react';
import { AlertTriangle, Trash2, ShieldOff, Info } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { FormGroup } from '../components/core/FormGroup';
import { Alert } from '../components/ui/Alert';
import { PageShell } from '../components/layout';
import { usePrivacyStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';

const PrivacyDeleteAccount: React.FC = () => {
  const store = usePrivacyStore();
  const existingRequests = store.getDsarRequests(MOCK_USER_ID);
  const existingDeletion = existingRequests.find((r) => r.id.startsWith('del-'));

  const [step, setStep] = useState<1 | 2 | 'done'>(existingDeletion ? 'done' : 1);
  const [confirmText, setConfirmText] = useState('');
  const [reason, setReason] = useState('');

  const canConfirm = confirmText === 'SUPPRIMER MON COMPTE';

  const handleConfirmDeletion = () => {
    const now = new Date().toISOString();
    const deadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    store.addDsarRequest({
      id: `del-${Date.now()}`,
      userId: MOCK_USER_ID,
      status: 'submitted',
      submittedAt: now,
      legalDeadlineAt: deadline,
    });
    setStep('done');
  };

  return (
    <PageShell width="content">
      <EditorialHero
        eyebrow="Confidentialité · Droit à l'oubli (RGPD)"
        title="Supprimer définitivement mon compte"
        summary="Action irréversible. Toutes tes données seront anonymisées ou supprimées sous 30 jours."
        tone="flat"
      />

      {/* 48 entre deux blocs ; titres de section (h2 28) sur la page. */}
      <div className="flex flex-col gap-page">
        <Alert variant="warning" icon={<AlertTriangle size={18} />} title="Action irréversible">
          Cette action est définitive. Tu ne pourras pas récupérer ton compte ni tes données après confirmation. Pense à exporter tes données avant via la demande DSAR.
        </Alert>

        {/* Une liste, pas huit boîtes teintées : l'icône rouge suffit à dire
            « supprimé ». Deux colonnes, 8 entre deux lignes. */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Ce qui sera supprimé"
            subtitle="Toutes les données te concernant disparaîtront définitivement"
          />
          <Card>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-stack-lg gap-y-stack-xs">
              {[
                'Ton profil utilisateur',
                'Tes parcours et leçons complétées',
                'Tes badges et achievements',
                'Ton journal de bord',
                'Tes sessions de coaching',
                'Tes messages avec ton coach',
                'Tes objectifs et passeport',
                'Tes crédits restants (non remboursés)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-stack-xs">
                  <Trash2 className="w-4 h-4 text-danger-fg shrink-0 mt-[5px]" aria-hidden="true" />
                  <span className="text-body text-ink-900">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="flex flex-col gap-stack">
          <SectionHeader title="Ce qui sera conservé (anonymisé)" subtitle="Pour respecter nos obligations comptables et légales" />
          <Card className="flex flex-row items-start gap-stack-xs">
            <Info className="w-4 h-4 text-info-fg shrink-0 mt-[5px]" aria-hidden="true" />
            <span className="text-body text-ink-900 max-w-prose">Factures et historique de paiement (anonymisés, conservés 10 ans pour obligations fiscales)</span>
          </Card>
        </section>

        {step === 1 && (
          <Card className="flex flex-col gap-stack">
            <h3 className="font-display text-h3 text-ink-900">Étape 1/2 : Raison du départ (optionnel)</h3>
            <FormGroup label="Pour nous aider à nous améliorer, peux-tu nous dire pourquoi tu pars ?">
              <Input
                multiline
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Optionnel : ta réponse nous aide à améliorer la plateforme"
              />
            </FormGroup>
            <div className="flex gap-stack-xs mt-stack-xs">
              <Button emphasis="outline" fullWidth>Annuler</Button>
              <Button emphasis="solid" tone="danger" fullWidth onClick={() => setStep(2)}>
                Continuer →
              </Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="flex flex-col gap-stack border-danger-base/30">
            {/* Icône (24) sur la première ligne du titre ; titre → texte 8. */}
            <div className="flex items-start gap-stack-sm">
              <ShieldOff className="w-6 h-6 text-danger-fg shrink-0 mt-px" aria-hidden="true" />
              <div className="flex flex-col gap-stack-xs min-w-0">
                <h3 className="font-display text-h3 text-ink-900">Étape 2/2 : Confirmation finale</h3>
                <p className="text-body text-ink-700">Pour confirmer, tape exactement la phrase ci-dessous.</p>
              </div>
            </div>
            {/* La phrase à recopier est un texte exact, pas un état : un bloc
                de code, plus un Badge. */}
            <code className="self-start rounded-lg bg-danger-bg px-stack-sm py-stack-xs font-mono text-body text-danger-fg">SUPPRIMER MON COMPTE</code>
            <FormGroup label="Tape la phrase exacte ci-dessus">
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="SUPPRIMER MON COMPTE"
              />
            </FormGroup>
            <div className="flex gap-stack-xs mt-stack-xs">
              <Button emphasis="outline" fullWidth onClick={() => setStep(1)}>Retour</Button>
              <Button emphasis="solid" tone="danger" fullWidth disabled={!canConfirm} leadingIcon={<AlertTriangle className="w-4 h-4" />} onClick={handleConfirmDeletion}>
                Supprimer définitivement
              </Button>
            </div>
          </Card>
        )}

        {step === 'done' && (
          <Alert variant="info" title="Demande de suppression enregistrée">
            Ton compte sera supprimé sous 30 jours. Tu recevras un email de confirmation à chaque étape (initiation, anonymisation, suppression finale). Tu peux annuler cette demande pendant les 7 prochains jours en nous écrivant à privacy@tls.io.
          </Alert>
        )}
      </div>
    </PageShell>
  );
};

export default PrivacyDeleteAccount;
