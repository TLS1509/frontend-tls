import React, { useState } from 'react';
import { Download, Shield, Mail, Clock, FileText, CheckCircle2 } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import { usePrivacyStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { useToastContext } from '../contexts/ToastContext';
import { Container } from '../components/layout';

const DATA_TYPES = [
  { id: 'profile', label: 'Profil utilisateur', size: '12 KB', desc: 'Nom, email, rôle, photo, paramètres' },
  { id: 'learning', label: 'Parcours & apprentissage', size: '450 KB', desc: 'Tous tes parcours, leçons complétées, scores quiz' },
  { id: 'passeport', label: 'Passeport compétences', size: '85 KB', desc: 'Niveaux Dreyfus, objectifs, historique JAC' },
  { id: 'journal', label: 'Journal de bord', size: '320 KB', desc: 'Toutes tes entrées et leur historique' },
  { id: 'coaching', label: 'Coaching & messages', size: '180 KB', desc: 'Sessions, corrections, threads messagerie' },
  { id: 'gamification', label: 'Gamification', size: '45 KB', desc: 'Badges, streaks, XP, achievements' },
];

const STATUS_LABEL: Record<string, { label: string; variant: 'success' | 'warm' | 'neutral' }> = {
  submitted: { label: 'Soumise', variant: 'neutral' },
  processing: { label: 'En cours', variant: 'warm' },
  completed: { label: 'Terminée', variant: 'success' },
  rejected: { label: 'Rejetée', variant: 'neutral' },
};

const PrivacyDsar: React.FC = () => {
  const privacyStore = usePrivacyStore();
  const toast = useToastContext();
  const [submitting, setSubmitting] = useState(false);

  const pastRequests = privacyStore.getDsarRequests(MOCK_USER_ID);
  const hasPendingRequest = pastRequests.some((r) => r.status === 'submitted' || r.status === 'processing');

  const handleRequest = async () => {
    setSubmitting(true);
    await new Promise((res) => setTimeout(res, 600));
    const now = new Date();
    const deadline = new Date(now);
    deadline.setDate(deadline.getDate() + 30);
    privacyStore.addDsarRequest({
      id: `dsar-${Date.now()}`,
      userId: MOCK_USER_ID,
      status: 'submitted',
      submittedAt: now.toISOString(),
      legalDeadlineAt: deadline.toISOString(),
    });
    setSubmitting(false);
    toast.success('Ta demande DSAR a été enregistrée. Tu recevras un email sous 48h.', 'Demande envoyée');
  };

  return (
    <div className="min-h-[100dvh] bg-surface">
      <EditorialHero
        eyebrow="Confidentialité · RGPD Article 15"
        title="Télécharger mes données personnelles"
        summary="Demande d'accès à toutes les données te concernant (DSAR). Délai légal : 30 jours."
        tone="flat"
      />

      <Container width="content" padding={false} className="px-stack py-section flex flex-col gap-section">
        <Alert variant="info" title="Ce que dit la loi">
          L'article 15 du RGPD te donne le droit d'accéder à toutes les données personnelles te concernant. Nous t'enverrons un fichier ZIP contenant toutes ces données par email.
        </Alert>

        <SectionCard
          title="Données qui seront incluses"
          description="Toutes ces catégories seront exportées dans un fichier ZIP structuré (JSON + CSV)"
        >
          <div className="flex flex-col gap-stack-xs">
            {DATA_TYPES.map((d) => (
              <Card key={d.id} className="p-stack flex items-center gap-stack-xs">
                <CheckCircle2 className="w-5 h-5 text-success-fg shrink-0" />
                <FileText className="w-5 h-5 text-primary-600 shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-body-sm">{d.label}</div>
                  <div className="text-caption text-ink-500">{d.desc}</div>
                </div>
                <Badge variant="neutral">{d.size}</Badge>
              </Card>
            ))}
          </div>
          <div className="mt-stack flex items-center justify-between p-3 bg-primary-50 rounded-lg">
            <span className="text-body-sm font-semibold">Total estimé</span>
            <Badge variant="brand">~1.1 MB</Badge>
          </div>
        </SectionCard>

        {hasPendingRequest ? (
          <Alert variant="success" title="Demande en cours">
            Nous traitons ta demande. Tu recevras un email sous 48h avec le lien de téléchargement sécurisé (valide 7 jours).
          </Alert>
        ) : (
          <Card className="p-stack-lg flex flex-col gap-stack">
            <div className="flex items-start gap-stack-xs">
              <Shield className="w-6 h-6 text-primary-600 mt-1" />
              <div>
                <h3 className="text-h4 font-semibold mb-1">Lancer ma demande</h3>
                <p className="text-body-sm text-ink-600">
                  En cliquant ci-dessous, tu déclenches le workflow officiel. Un email avec le lien de téléchargement (valide 7 jours) te sera envoyé dans un délai maximum de 30 jours (généralement sous 48h).
                </p>
              </div>
            </div>
            <Button variant="primary" size="lg" leadingIcon={<Download className="w-4 h-4" />} onClick={handleRequest} loading={submitting}>
              Déclencher la demande DSAR
            </Button>
          </Card>
        )}

        <SectionCard title="Historique de mes demandes" description="Demandes passées et statut">
          {pastRequests.length === 0 ? (
            <p className="text-body-sm text-ink-500">Aucune demande passée.</p>
          ) : (
            <div className="flex flex-col gap-stack-xs">
              {pastRequests.map((r) => {
                const s = STATUS_LABEL[r.status] ?? STATUS_LABEL.submitted;
                const dateLabel = new Date(r.submittedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
                return (
                  <Card key={r.id} className="p-stack flex items-center gap-stack-xs">
                    <Clock className="w-5 h-5 text-ink-500" />
                    <div className="flex-1">
                      <div className="font-semibold text-body-sm">Demande du {dateLabel}</div>
                      {r.archiveSize && <div className="text-caption text-ink-500">Archive : {r.archiveSize}</div>}
                    </div>
                    <Badge variant={s.variant}>{s.label}</Badge>
                    {r.status === 'completed' && (
                      <Button variant="ghost" size="sm" leadingIcon={<Mail className="w-4 h-4" />}>Renvoyer email</Button>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </SectionCard>
      </Container>
    </div>
  );
};

export default PrivacyDsar;
