import React, { useState } from 'react';
import { Bell, Mail, Clock, Save } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Switch } from '../components/core/Input';
import Select from '../components/core/Select';
import Button from '../components/core/Button';

type SwitchSetting = {
  id: string;
  label: string;
  description: string;
  defaultChecked: boolean;
};

const PUSH_SETTINGS: SwitchSetting[] = [
  {
    id: 'push-lessons',
    label: 'Nouvelles leçons',
    description: 'Notifié quand une nouvelle leçon est disponible dans tes parcours',
    defaultChecked: true,
  },
  {
    id: 'push-coaching',
    label: 'Rappels coaching',
    description: 'Rappel 30 min avant chaque session de coaching planifiée',
    defaultChecked: true,
  },
  {
    id: 'push-community',
    label: 'Activité communauté',
    description: 'Réponses à tes commentaires et nouvelles publications dans tes groupes',
    defaultChecked: false,
  },
  {
    id: 'push-manager',
    label: 'Alertes manager',
    description: 'Notifications importantes envoyées par ton manager ou coach',
    defaultChecked: true,
  },
];

const EMAIL_SETTINGS: SwitchSetting[] = [
  {
    id: 'email-newsletter',
    label: 'Newsletter hebdomadaire',
    description: 'Récap des contenus et tendances de la semaine',
    defaultChecked: true,
  },
  {
    id: 'email-recap',
    label: 'Récap mensuel',
    description: 'Bilan de ta progression, XP et badges obtenus ce mois',
    defaultChecked: true,
  },
  {
    id: 'email-alerts',
    label: 'Alertes urgentes',
    description: 'Informations importantes liées à ton abonnement ou ton compte',
    defaultChecked: true,
  },
];

const FREQUENCY_OPTIONS = [
  { value: 'immediate', label: 'Immédiat' },
  { value: 'daily', label: 'Quotidien' },
  { value: 'weekly', label: 'Hebdomadaire' },
];

function SwitchRow({ setting }: { setting: SwitchSetting }) {
  const [checked, setChecked] = useState(setting.defaultChecked);
  return (
    <div className="flex items-start justify-between gap-stack py-3 first:pt-0 last:pb-0">
      <div className="flex flex-col gap-tight flex-1 min-w-0">
        <span className="text-body-sm font-semibold text-ink-900">{setting.label}</span>
        <span className="text-caption text-ink-500">{setting.description}</span>
      </div>
      <Switch
        id={setting.id}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="shrink-0 mt-0.5"
      />
    </div>
  );
}

export default function NotificationPreferences() {
  const [frequency, setFrequency] = useState('daily');

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Profil · Notifications"
        title="Préférences de notifications"
        summary="Choisis comment et quand tu veux être notifié. Tu peux modifier ces réglages à tout moment."
        tone="default"
      />

      <div className="max-w-content mx-auto w-full px-4 flex flex-col gap-section">
        {/* Push notifications */}
        <SectionCard
          title="Notifications push"
          titleIcon={<Bell size={18} />}
          description="Reçues sur ton appareil mobile ou ton navigateur"
        >
          <div className="flex flex-col divide-y divide-ink-100">
            {PUSH_SETTINGS.map((s) => (
              <SwitchRow key={s.id} setting={s} />
            ))}
          </div>
        </SectionCard>

        {/* Email */}
        <SectionCard
          title="Emails"
          titleIcon={<Mail size={18} />}
          description="Envoyés à l'adresse associée à ton compte"
        >
          <div className="flex flex-col divide-y divide-ink-100">
            {EMAIL_SETTINGS.map((s) => (
              <SwitchRow key={s.id} setting={s} />
            ))}
          </div>
        </SectionCard>

        {/* Fréquence */}
        <SectionCard
          title="Fréquence"
          titleIcon={<Clock size={18} />}
          description="Choisis la fréquence à laquelle tu reçois le résumé de tes activités"
        >
          <Select
            label="Résumé d'activité quotidien"
            options={FREQUENCY_OPTIONS}
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
        </SectionCard>

        {/* Save CTA */}
        <div className="flex justify-end">
          <Button variant="primary" leadingIcon={<Save size={16} />} size="lg">
            Enregistrer les préférences
          </Button>
        </div>
      </div>
    </div>
  );
}
