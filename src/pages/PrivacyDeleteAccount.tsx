import React, { useState } from 'react';
import { AlertTriangle, Trash2, ShieldOff, Info } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { FormGroup } from '../components/core/FormGroup';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
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
    <PageShell width="content" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Confidentialité · Droit à l'oubli (RGPD)"
        title="Supprimer définitivement mon compte"
        summary="Action irréversible. Toutes tes données seront anonymisées ou supprimées sous 30 jours."
        tone="flat"
      />

      <div className="flex flex-col gap-section">
        <Alert variant="warning" title="⚠️ Action irréversible">
          Cette action est définitive. Tu ne pourras pas récupérer ton compte ni tes données après confirmation. Pense à exporter tes données avant via la demande DSAR.
        </Alert>

        <SectionCard
          title="Ce qui sera supprimé"
          description="Toutes les données te concernant disparaîtront définitivement"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-xs">
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
              <div key={item} className="flex items-center gap-stack-xs p-3 bg-danger-bg/50 rounded-lg">
                <Trash2 className="w-4 h-4 text-danger-fg shrink-0" />
                <span className="text-body-sm">{item}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Ce qui sera conservé (anonymisé)" description="Pour respecter nos obligations comptables et légales">
          <div className="flex flex-col gap-stack-xs">
            <div className="flex items-center gap-stack-xs p-3 bg-info-bg/50 rounded-lg">
              <Info className="w-4 h-4 text-info-fg shrink-0" />
              <span className="text-body-sm">Factures et historique de paiement (anonymisés, conservés 10 ans pour obligations fiscales)</span>
            </div>
          </div>
        </SectionCard>

        {step === 1 && (
          <Card className="p-stack-lg flex flex-col gap-stack">
            <h3 className="text-h4 font-semibold">Étape 1/2 : Raison du départ (optionnel)</h3>
            <FormGroup label="Pour nous aider à nous améliorer, peux-tu nous dire pourquoi tu pars ?">
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Optionnel : ta réponse nous aide à améliorer la plateforme"
                className="w-full h-auto min-h-[100px] p-3 border border-ink-200 rounded-lg focus:border-primary-500 focus:outline-none"
                rows={4}
              />
            </FormGroup>
            <div className="flex gap-stack-xs">
              <Button variant="ghost" fullWidth>Annuler</Button>
              <Button variant="destructive" fullWidth onClick={() => setStep(2)}>
                Continuer →
              </Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-stack-lg flex flex-col gap-stack border-danger-base/30">
            <div className="flex items-start gap-stack-xs">
              <ShieldOff className="w-8 h-8 text-danger-fg" />
              <div>
                <h3 className="text-h4 font-semibold mb-1">Étape 2/2 : Confirmation finale</h3>
                <p className="text-body-sm text-ink-600">Pour confirmer, tape exactement la phrase ci-dessous.</p>
              </div>
            </div>
            <Badge variant="danger" className="text-center py-stack-xs font-mono">SUPPRIMER MON COMPTE</Badge>
            <FormGroup label="Tape la phrase exacte ci-dessus">
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="SUPPRIMER MON COMPTE"
              />
            </FormGroup>
            <div className="flex gap-stack-xs">
              <Button variant="ghost" fullWidth onClick={() => setStep(1)}>Retour</Button>
              <Button variant="destructive" fullWidth disabled={!canConfirm} leadingIcon={<AlertTriangle className="w-4 h-4" />} onClick={handleConfirmDeletion}>
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
