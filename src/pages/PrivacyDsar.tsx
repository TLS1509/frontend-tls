import React, { useState } from 'react';
import { Download, Shield, Mail, Clock, FileText, CheckCircle2 } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';

const DATA_TYPES = [
  { id: 'profile', label: 'Profil utilisateur', size: '12 KB', desc: 'Nom, email, rôle, photo, paramètres' },
  { id: 'learning', label: 'Parcours & apprentissage', size: '450 KB', desc: 'Tous tes parcours, leçons complétées, scores quiz' },
  { id: 'passeport', label: 'Passeport compétences', size: '85 KB', desc: 'Niveaux Dreyfus, objectifs, historique JAC' },
  { id: 'journal', label: 'Journal de bord', size: '320 KB', desc: 'Toutes tes entrées et leur historique' },
  { id: 'coaching', label: 'Coaching & messages', size: '180 KB', desc: 'Sessions, corrections, threads messagerie' },
  { id: 'gamification', label: 'Gamification', size: '45 KB', desc: 'Badges, streaks, XP, achievements' },
];

const PAST_REQUESTS = [
  { id: '1', date: '15 mars 2026', status: 'completed', size: '1.2 MB' },
];

const PrivacyDsar: React.FC = () => {
  const [requested, setRequested] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow="Confidentialité · RGPD Article 15"
        title="Télécharger mes données personnelles"
        summary="Demande d'accès à toutes les données te concernant (DSAR). Délai légal : 30 jours."
        tone="default"
      />

      <div className="max-w-content mx-auto px-4 py-section flex flex-col gap-section">
        <Alert variant="info" title="Ce que dit la loi">
          L'article 15 du RGPD te donne le droit d'accéder à toutes les données personnelles te concernant. Nous t'enverrons un fichier ZIP contenant toutes ces données par email.
        </Alert>

        <SectionCard
          title="Données qui seront incluses"
          description="Toutes ces catégories seront exportées dans un fichier ZIP structuré (JSON + CSV)"
        >
          <div className="flex flex-col gap-stack-xs">
            {DATA_TYPES.map((d) => (
              <Card key={d.id} className="p-4 flex items-center gap-3">
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

        {!requested ? (
          <Card className="p-6 flex flex-col gap-stack">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-primary-600 mt-1" />
              <div>
                <h3 className="text-h4 font-semibold mb-1">Lancer ma demande</h3>
                <p className="text-body-sm text-ink-600">
                  En cliquant ci-dessous, tu déclenches le workflow officiel. Un email avec le lien de téléchargement (valide 7 jours) te sera envoyé dans un délai maximum de 30 jours (généralement sous 48h).
                </p>
              </div>
            </div>
            <Button variant="primary" size="lg" leadingIcon={<Download className="w-4 h-4" />} onClick={() => setRequested(true)}>
              Déclencher la demande DSAR
            </Button>
          </Card>
        ) : (
          <Alert variant="success" title="Demande enregistrée">
            Nous traitons ta demande. Tu recevras un email à <strong>chloe@tls.io</strong> sous 48h avec le lien de téléchargement sécurisé.
          </Alert>
        )}

        <SectionCard title="Historique de mes demandes" description="Demandes passées et statut">
          {PAST_REQUESTS.length === 0 ? (
            <p className="text-body-sm text-ink-500">Aucune demande passée.</p>
          ) : (
            <div className="flex flex-col gap-stack-xs">
              {PAST_REQUESTS.map((r) => (
                <Card key={r.id} className="p-4 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-ink-500" />
                  <div className="flex-1">
                    <div className="font-semibold text-body-sm">Demande du {r.date}</div>
                    <div className="text-caption text-ink-500">Archive : {r.size}</div>
                  </div>
                  <Badge variant="success">Terminée</Badge>
                  <Button variant="ghost" size="sm" leadingIcon={<Mail className="w-4 h-4" />}>Renvoyer email</Button>
                </Card>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
};

export default PrivacyDsar;
