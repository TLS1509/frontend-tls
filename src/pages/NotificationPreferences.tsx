import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Save } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { SettingsToggleRow as SwitchRow } from '../components/patterns/SettingsRow';
import { Switch } from '../components/core/Input';
import Select from '../components/core/Select';
import Button from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { AccountFamilyNav } from '../components/patterns/AccountFamilyNav';
import { PageShell } from '../components/layout';
import { useNotificationPrefsStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import type { UserNotificationPrefs, NotificationChannelPrefs } from '../types/learning';
import { useToastContext } from '../contexts/ToastContext';

const FREQUENCY_OPTIONS = [
  { value: 'immediate', label: 'Immédiat' },
  { value: 'daily', label: 'Quotidien' },
  { value: 'weekly', label: 'Hebdomadaire' },
];

export default function NotificationPreferences() {
  const navigate = useNavigate();
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
    /* Le haut de page est celui de la coque (48) : la navigation du compte
       collait au bord. Chaque réglage est une section — titre (h2 28) et
       explication (16, ink-700) sur la page, rangées dans une carte ; ils
       étaient des h3 à 20 dans des cartes, précédés d'une icône décorative,
       et la page sautait du h1 au h3. */
    <PageShell width="content">
      <AccountFamilyNav active="notifications" />

      <EditorialHero
        eyebrow="Profil · Notifications"
        title="Préférences de notifications"
        summary="Choisis comment et quand tu veux être notifié. Tu peux modifier ces réglages à tout moment."
        tone="flat"
        /* Un lien vers la page voisine : `ghost`. L'aplat est
           l'enregistrement, en bas du formulaire (arbitrage n°19). */
        trailing={
          <Button emphasis="ghost" size="sm" leadingIcon={<Bell size={14} />} onClick={() => navigate('/notifications')}>
            Voir mes notifications
          </Button>
        }
      />

      <div className="flex flex-col gap-page">
        {/* In-App */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Notifications in-app"
            subtitle="Affichées dans la cloche de la barre de navigation"
          />
          <Card>
          <div className="flex flex-col divide-y divide-ink-100">
            <SwitchRow id="inapp-lessons" label="Nouvelles leçons" description="Notifié quand une nouvelle leçon est disponible dans tes parcours" checked={prefs.lessons.inApp} onChange={(v) => setChannel('lessons', 'inApp', v)} />
            <SwitchRow id="inapp-coaching" label="Rappels coaching" description="Rappel 30 min avant chaque session de coaching planifiée" checked={prefs.coaching.inApp} onChange={(v) => setChannel('coaching', 'inApp', v)} />
            <SwitchRow id="inapp-achievements" label="Reconnaissances" description="Quand un de tes niveaux est validé et que son Open Badge rejoint ton profil" checked={prefs.achievements.inApp} onChange={(v) => setChannel('achievements', 'inApp', v)} />
            <SwitchRow id="inapp-manager" label="Alertes manager" description="Notifications importantes envoyées par ton manager ou coach" checked={prefs.managerAlerts.inApp} onChange={(v) => setChannel('managerAlerts', 'inApp', v)} />
          </div>
          </Card>
        </section>

        {/* Push */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Notifications push"
            subtitle="Reçues sur ton appareil mobile ou ton navigateur"
          />
          <Card>
          <div className="flex flex-col divide-y divide-ink-100">
            <SwitchRow id="push-lessons" label="Nouvelles leçons" description="Notifié quand une nouvelle leçon est disponible dans tes parcours" checked={prefs.lessons.push} onChange={(v) => setChannel('lessons', 'push', v)} />
            <SwitchRow id="push-coaching" label="Rappels coaching" description="Rappel 30 min avant chaque session de coaching planifiée" checked={prefs.coaching.push} onChange={(v) => setChannel('coaching', 'push', v)} />
            <SwitchRow id="push-achievements" label="Reconnaissances" description="Quand un de tes niveaux est validé et que son Open Badge rejoint ton profil" checked={prefs.achievements.push} onChange={(v) => setChannel('achievements', 'push', v)} />
            <SwitchRow id="push-manager" label="Alertes manager" description="Notifications importantes envoyées par ton manager ou coach" checked={prefs.managerAlerts.push} onChange={(v) => setChannel('managerAlerts', 'push', v)} />
          </div>
          </Card>
        </section>

        {/* Email */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Emails"
            subtitle="Envoyés à l'adresse associée à ton compte"
          />
          <Card>
          <div className="flex flex-col divide-y divide-ink-100">
            <SwitchRow id="email-lessons" label="Nouvelles leçons" description="Email quand un nouveau contenu est publié dans tes parcours" checked={prefs.lessons.email} onChange={(v) => setChannel('lessons', 'email', v)} />
            <SwitchRow id="email-coaching" label="Coaching & sessions" description="Confirmations, rappels et compte-rendus de sessions" checked={prefs.coaching.email} onChange={(v) => setChannel('coaching', 'email', v)} />
            <SwitchRow id="email-manager" label="Alertes manager" description="Informations importantes envoyées par ton manager ou coach" checked={prefs.managerAlerts.email} onChange={(v) => setChannel('managerAlerts', 'email', v)} />
            <SwitchRow id="email-newsletter" label="Newsletter hebdomadaire" description="Récap des contenus et tendances de la semaine" checked={prefs.newsletter.email} onChange={(v) => set({ newsletter: { email: v } })} />

            {/* Email tracking toggle (Cahier #09 § Journey #5 : privacy) */}
            {/* Même anatomie que `SettingsToggleRow` : 16 de part et d'autre,
                libellé → description 4, description en corps ink-700 (elle
                était en légende ink-500) ; la catégorie est une donnée
                (MetaPill). */}
            <div className="flex items-start justify-between gap-stack py-stack first:pt-0 last:pb-0">
              <div className="flex flex-col gap-stack-3xs flex-1 min-w-0">
                <div className="flex items-center gap-stack-xs">
                  <span className="text-body font-semibold text-ink-900">Suivi des emails</span>
                  <MetaPill text="Confidentialité" />
                </div>
                <span className="text-body text-ink-700 max-w-prose">
                  {prefs.emailTrackingDisabled
                    ? 'Les pixels et liens de tracking sont désactivés pour tes emails.'
                    : 'Nous mesurons les ouvertures et clics pour personnaliser tes emails.'}
                </span>
              </div>
              <Switch
                id="email-tracking"
                checked={!prefs.emailTrackingDisabled}
                onChange={(e) => set({ emailTrackingDisabled: !e.target.checked })}
                className="shrink-0 mt-tight"
              />
            </div>
          </div>
          </Card>
        </section>

        {/* WhatsApp (V1) */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="WhatsApp"
            subtitle="Messages via WhatsApp Business (V1 : disponible bientôt)"
            action={<Badge variant="warm" size="compact">Bientôt disponible</Badge>}
          />
          <Card>
          <div className="flex flex-col divide-y divide-ink-100 opacity-60 pointer-events-none select-none">
            <SwitchRow id="wa-coaching" label="Rappels coaching" description="Rappel 2h avant ta session de coaching" checked={prefs.coaching.whatsapp} onChange={(v) => setChannel('coaching', 'whatsapp', v)} />
            <SwitchRow id="wa-manager" label="Alertes importantes" description="Notifications urgentes de ton manager ou coach" checked={prefs.managerAlerts.whatsapp} onChange={(v) => setChannel('managerAlerts', 'whatsapp', v)} />
          </div>
          </Card>
        </section>

        {/* Fréquence */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Fréquence"
            subtitle="Choisis la fréquence à laquelle tu reçois le résumé de tes activités"
          />
          <Card>
          <Select
            label="Résumé d'activité"
            options={FREQUENCY_OPTIONS}
            value={prefs.summaryFrequency}
            onChange={(e) => set({ summaryFrequency: e.target.value as UserNotificationPrefs['summaryFrequency'] })}
          />
          </Card>
        </section>

        {/* Save CTA */}
        <div className="flex justify-end">
          <Button emphasis="solid" leadingIcon={<Save size={16} />} size="lg" onClick={handleSave}>
            Enregistrer les préférences
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
