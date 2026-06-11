import React, { useState } from 'react';
import { Bell, Mail, Clock, Save, MessageCircle, Eye, EyeOff } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Switch } from '../components/core/Input';
import Select from '../components/core/Select';
import Button from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { useNotificationPrefsStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import type { UserNotificationPrefs, NotificationChannelPrefs } from '../types/learning';
import { useToastContext } from '../contexts/ToastContext';
import { Container } from '../components/layout';

const FREQUENCY_OPTIONS = [
  { value: 'immediate', label: 'Immédiat' },
  { value: 'daily', label: 'Quotidien' },
  { value: 'weekly', label: 'Hebdomadaire' },
];

function SwitchRow({
  label,
  description,
  checked,
  onChange,
  id,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <div className="flex items-start justify-between gap-stack py-3 first:pt-0 last:pb-0">
      <div className="flex flex-col gap-tight flex-1 min-w-0">
        <span className="text-body-sm font-semibold text-ink-900">{label}</span>
        <span className="text-caption text-ink-500">{description}</span>
      </div>
      <Switch
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="shrink-0 mt-0.5"
      />
    </div>
  );
}

export default function NotificationPreferences() {
  const prefsStore = useNotificationPrefsStore();
  const toast = useToastContext();
  const stored = prefsStore.getPrefs(MOCK_USER_ID);

  const [prefs, setPrefs] = useState<UserNotificationPrefs>(stored);

  const set = (updates: Partial<UserNotificationPrefs>) =>
    setPrefs((p) => ({ ...p, ...updates }));

  const setChannel = (
    key: keyof Pick<UserNotificationPrefs, 'lessons' | 'coaching' | 'achievements' | 'managerAlerts'>,
    channel: keyof NotificationChannelPrefs,
    value: boolean
  ) => {
    setPrefs((p) => ({ ...p, [key]: { ...p[key], [channel]: value } }));
  };

  const handleSave = () => {
    prefsStore.updatePrefs(MOCK_USER_ID, prefs);
    toast.success('Préférences de notifications mises à jour.', 'Enregistré');
  };

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Profil · Notifications"
        title="Préférences de notifications"
        summary="Choisis comment et quand tu veux être notifié. Tu peux modifier ces réglages à tout moment."
        tone="default"
      />

      <Container width="content" padding={false} className="px-4 flex flex-col gap-section">

        {/* In-App */}
        <SectionCard
          title="Notifications in-app"
          titleIcon={<Bell size={18} />}
          description="Affichées dans la cloche de la barre de navigation"
        >
          <div className="flex flex-col divide-y divide-ink-100">
            <SwitchRow id="inapp-lessons" label="Nouvelles leçons" description="Notifié quand une nouvelle leçon est disponible dans tes parcours" checked={prefs.lessons.inApp} onChange={(v) => setChannel('lessons', 'inApp', v)} />
            <SwitchRow id="inapp-coaching" label="Rappels coaching" description="Rappel 30 min avant chaque session de coaching planifiée" checked={prefs.coaching.inApp} onChange={(v) => setChannel('coaching', 'inApp', v)} />
            <SwitchRow id="inapp-achievements" label="Badges & XP" description="Quand tu débloque un badge ou franchis un cap de progression" checked={prefs.achievements.inApp} onChange={(v) => setChannel('achievements', 'inApp', v)} />
            <SwitchRow id="inapp-manager" label="Alertes manager" description="Notifications importantes envoyées par ton manager ou coach" checked={prefs.managerAlerts.inApp} onChange={(v) => setChannel('managerAlerts', 'inApp', v)} />
          </div>
        </SectionCard>

        {/* Push */}
        <SectionCard
          title="Notifications push"
          titleIcon={<Bell size={18} className="text-primary-600" />}
          description="Reçues sur ton appareil mobile ou ton navigateur"
        >
          <div className="flex flex-col divide-y divide-ink-100">
            <SwitchRow id="push-lessons" label="Nouvelles leçons" description="Notifié quand une nouvelle leçon est disponible dans tes parcours" checked={prefs.lessons.push} onChange={(v) => setChannel('lessons', 'push', v)} />
            <SwitchRow id="push-coaching" label="Rappels coaching" description="Rappel 30 min avant chaque session de coaching planifiée" checked={prefs.coaching.push} onChange={(v) => setChannel('coaching', 'push', v)} />
            <SwitchRow id="push-achievements" label="Badges & XP" description="Quand tu débloque un badge ou franchis un cap de progression" checked={prefs.achievements.push} onChange={(v) => setChannel('achievements', 'push', v)} />
            <SwitchRow id="push-manager" label="Alertes manager" description="Notifications importantes envoyées par ton manager ou coach" checked={prefs.managerAlerts.push} onChange={(v) => setChannel('managerAlerts', 'push', v)} />
          </div>
        </SectionCard>

        {/* Email */}
        <SectionCard
          title="Emails"
          titleIcon={<Mail size={18} />}
          description="Envoyés à l'adresse associée à ton compte"
        >
          <div className="flex flex-col divide-y divide-ink-100">
            <SwitchRow id="email-lessons" label="Nouvelles leçons" description="Email quand un nouveau contenu est publié dans tes parcours" checked={prefs.lessons.email} onChange={(v) => setChannel('lessons', 'email', v)} />
            <SwitchRow id="email-coaching" label="Coaching & sessions" description="Confirmations, rappels et compte-rendus de sessions" checked={prefs.coaching.email} onChange={(v) => setChannel('coaching', 'email', v)} />
            <SwitchRow id="email-manager" label="Alertes manager" description="Informations importantes envoyées par ton manager ou coach" checked={prefs.managerAlerts.email} onChange={(v) => setChannel('managerAlerts', 'email', v)} />
            <SwitchRow id="email-newsletter" label="Newsletter hebdomadaire" description="Récap des contenus et tendances de la semaine" checked={prefs.newsletter.email} onChange={(v) => set({ newsletter: { email: v } })} />

            {/* Email tracking toggle (Cahier #09 § Journey #5 — privacy) */}
            <div className="flex items-start justify-between gap-stack py-3">
              <div className="flex flex-col gap-tight flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-body-sm font-semibold text-ink-900">Suivi des emails</span>
                  <Badge variant="neutral" size="sm">Confidentialité</Badge>
                </div>
                <span className="text-caption text-ink-500">
                  {prefs.emailTrackingDisabled
                    ? 'Les pixels et liens de tracking sont désactivés pour tes emails.'
                    : 'Nous mesurons les ouvertures et clics pour personnaliser tes emails.'}
                </span>
              </div>
              <Switch
                id="email-tracking"
                checked={!prefs.emailTrackingDisabled}
                onChange={(e) => set({ emailTrackingDisabled: !e.target.checked })}
                className="shrink-0 mt-0.5"
              />
            </div>
          </div>
        </SectionCard>

        {/* WhatsApp (V1) */}
        <SectionCard
          title="WhatsApp"
          titleIcon={<MessageCircle size={18} />}
          description="Messages via WhatsApp Business (V1 — disponible bientôt)"
          headerAction={<Badge variant="warm" size="sm">Bientôt disponible</Badge>}
        >
          <div className="flex flex-col divide-y divide-ink-100 opacity-60 pointer-events-none select-none">
            <SwitchRow id="wa-coaching" label="Rappels coaching" description="Rappel 2h avant ta session de coaching" checked={prefs.coaching.whatsapp} onChange={(v) => setChannel('coaching', 'whatsapp', v)} />
            <SwitchRow id="wa-manager" label="Alertes importantes" description="Notifications urgentes de ton manager ou coach" checked={prefs.managerAlerts.whatsapp} onChange={(v) => setChannel('managerAlerts', 'whatsapp', v)} />
          </div>
        </SectionCard>

        {/* Fréquence */}
        <SectionCard
          title="Fréquence"
          titleIcon={<Clock size={18} />}
          description="Choisis la fréquence à laquelle tu reçois le résumé de tes activités"
        >
          <Select
            label="Résumé d'activité"
            options={FREQUENCY_OPTIONS}
            value={prefs.summaryFrequency}
            onChange={(e) => set({ summaryFrequency: e.target.value as UserNotificationPrefs['summaryFrequency'] })}
          />
        </SectionCard>

        {/* Save CTA */}
        <div className="flex justify-end">
          <Button variant="primary" leadingIcon={<Save size={16} />} size="lg" onClick={handleSave}>
            Enregistrer les préférences
          </Button>
        </div>
      </Container>
    </div>
  );
}
