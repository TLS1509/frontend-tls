/**
 * Settings Page - User preferences and settings
 */

import React, { useState } from 'react';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Select } from '../components/core/Select';
import type { SelectOption } from '../components/core/Select';
import { Switch } from '../components/core/Input';
import { Alert } from '../components/ui/Alert';
import { SectionCard } from '../components/patterns/SectionCard';
import { useToastContext } from '../contexts/ToastContext';
import { AccountFamilyNav } from '../components/patterns/AccountFamilyNav';
import { useTheme } from '../hooks/useTheme';
import { PageShell } from '../components/layout';
import {
  BellRing,
  LockKeyhole,
  SlidersHorizontal,
  Palette,
  Moon,
  Sun,
} from 'lucide-react';

const ICON_BUBBLE = 'flex items-center justify-center w-10 h-10 rounded-lg shrink-0';

const ToggleRow: React.FC<{
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}> = ({ checked, onChange, label }) => (
  <Switch
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
    label={<span className="text-body-sm text-ink-900">{label}</span>}
  />
);

export const Settings: React.FC = () => {
  const { theme, toggle: toggleTheme } = useTheme();

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);

  const [shareStats, setShareStats] = useState(false);
  const [sysNotifs, setSysNotifs] = useState(true);
  const [loginHistory, setLoginHistory] = useState(true);

  const [smoothAnimations, setSmoothAnimations] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [compactNav, setCompactNav] = useState(true);

  const [language, setLanguage] = useState('fr');
  const [securityLevel, setSecurityLevel] = useState('standard');

  const languageOptions: SelectOption[] = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'de', label: 'Deutsch' },
  ];

  const securityOptions: SelectOption[] = [
    { value: 'basic', label: 'Basic' },
    { value: 'standard', label: 'Standard' },
    { value: 'enhanced', label: 'Enhanced (2FA)' },
    { value: 'maximum', label: 'Maximum (Hardware Key)' },
  ];

  const toast = useToastContext();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAll = async () => {
    setIsSaving(true);
    // eslint-disable-next-line no-console
    console.log('Settings saved:', {
      notifications: { emailNotifs, pushNotifs, dailyDigest },
      privacy: { shareStats, sysNotifs, loginHistory },
      interface: { smoothAnimations, highContrast, compactNav },
      account: { language, securityLevel },
    });
    // Simulate API call
    await new Promise((res) => setTimeout(res, 700));
    setIsSaving(false);
    toast.success('Vos préférences ont été enregistrées', 'Paramètres mis à jour');
  };

  return (
    <div className="min-h-[100dvh] bg-surface">
      <PageShell width="medium">
        <AccountFamilyNav active="settings" />

        {/* ── Page header ──────────────────────────────────────── */}
        <header className="flex flex-col gap-tight">
          <h1 className="m-0 font-display text-h2 font-bold text-ink-900 leading-tight tracking-tight">
            Paramètres
          </h1>
          <p className="m-0 font-body text-body-sm text-ink-500 max-w-prose">
            Notifications, confidentialité, interface et préférences de compte.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg">
          <SectionCard
            title="Notifications"
            titleIcon={<BellRing size={18} className="text-primary-600" />}
            description="Choisissez les canaux et la fréquence des alertes."
          >
            <div className="flex flex-col gap-stack">
              <ToggleRow checked={emailNotifs} onChange={setEmailNotifs} label="Notifications par email" />
              <ToggleRow checked={pushNotifs} onChange={setPushNotifs} label="Notifications push navigateur" />
              <ToggleRow checked={dailyDigest} onChange={setDailyDigest} label="Résumé quotidien" />
            </div>
          </SectionCard>

          <SectionCard
            title="Confidentialité"
            titleIcon={<LockKeyhole size={18} className="text-secondary-600" />}
            description="Gérez vos données et l'historique de connexion."
            actions={
              <Button variant="primary" size="sm" onClick={handleSaveAll} loading={isSaving}>
                Enregistrer les préférences
              </Button>
            }
          >
            <div className="flex flex-col gap-stack">
              <ToggleRow checked={shareStats} onChange={setShareStats} label="Partager mes statistiques anonymisées" />
              <ToggleRow checked={sysNotifs} onChange={setSysNotifs} label="Autoriser les notifications système" />
              <ToggleRow checked={loginHistory} onChange={setLoginHistory} label="Historique de connexions actif" />
            </div>
          </SectionCard>

          <SectionCard
            title="Interface"
            titleIcon={<Palette size={18} className="text-primary-600" />}
            description="Apparence et confort visuel."
          >
            <div className="flex flex-col gap-stack">
              <ToggleRow checked={smoothAnimations} onChange={setSmoothAnimations} label="Activer les animations fluides" />
              <ToggleRow checked={highContrast} onChange={setHighContrast} label="Mode contraste renforcé" />
              <ToggleRow checked={compactNav} onChange={setCompactNav} label="Navigation compacte" />

              <div className="flex items-center justify-between gap-3 p-stack rounded-xl bg-ink-50 border border-ink-100">
                <div className="flex items-center gap-3">
                  <span className={`${ICON_BUBBLE} ${theme === 'dark' ? 'bg-accent-100 text-accent-700' : 'bg-primary-100 text-primary-700'}`}>
                    {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
                  </span>
                  <div>
                    <p className="m-0 text-body-sm font-semibold text-ink-900">Mode sombre</p>
                    <p className="m-0 mt-0.5 text-caption text-ink-500">
                      {theme === 'dark' ? 'Thème sombre activé' : 'Thème clair activé'}
                    </p>
                  </div>
                </div>
                <Switch checked={theme === 'dark'} onChange={toggleTheme} />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Compte"
            titleIcon={<SlidersHorizontal size={18} className="text-accent-700" />}
            description="Langue, sécurité et export de vos données."
            actions={
              <>
                <Button variant="secondary" size="sm">Exporter mes données</Button>
                <Button variant="ghost" size="sm">Gérer mon compte</Button>
              </>
            }
          >
            <div className="flex flex-col gap-stack">
              <FormGroup label="Langue" id="language">
                <Select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  options={languageOptions}
                  placeholder="Sélectionner une langue"
                />
              </FormGroup>

              <FormGroup label="Niveau de sécurité" id="security">
                <Select
                  id="security"
                  value={securityLevel}
                  onChange={(e) => setSecurityLevel(e.target.value)}
                  options={securityOptions}
                  placeholder="Sélectionner un niveau"
                />
              </FormGroup>
            </div>
          </SectionCard>
        </section>

        <Alert variant="info" title="Bonne pratique">
          Conservez les alertes critiques actives et limitez les résumés pour réduire la
          surcharge d'informations.
        </Alert>
      </PageShell>
    </div>
  );
};

export default Settings;
