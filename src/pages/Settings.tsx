/**
 * Settings Page - User preferences and settings
 */

import React, { useState } from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Select } from '../components/core/Select';
import type { SelectOption } from '../components/core/Select';
import { Switch } from '../components/core/Input';
import { useTheme } from '../hooks/useTheme';
import {
  BellRing,
  LockKeyhole,
  SlidersHorizontal,
  Shield,
  Palette,
  Settings2,
  Moon,
  Sun,
} from 'lucide-react';

const KPI_CARD =
  'flex flex-col items-start gap-1 p-4 rounded-lg bg-white border border-ink-200 shadow-sm';

const SETTINGS_CARD =
  'transition-all hover:-translate-y-1 hover:shadow-lg';

const SECTION_HEAD =
  'flex items-center gap-3 mb-4 pb-4 border-b border-ink-200';

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

  const handleSaveAll = () => {
    console.log('Settings saved:', {
      notifications: { emailNotifs, pushNotifs, dailyDigest },
      privacy: { shareStats, sysNotifs, loginHistory },
      interface: { smoothAnimations, highContrast, compactNav },
      account: { language, securityLevel },
    });
  };

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow">
          <Settings2 size={12} /> Compte &amp; Préférences
        </span>
        <h1>Paramètres</h1>
        <p className="tls-editorial-summary">
          Contrôlez vos préférences de notifications, confidentialité et expérience utilisateur.
        </p>
      </section>

      <section className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] mb-10">
        <div className={KPI_CARD}>
          <div className={`${ICON_BUBBLE} bg-primary-50 text-primary-600 mb-2`}>
            <BellRing size={20} />
          </div>
          <strong className="text-primary-700 text-h3 font-bold">2</strong>
          <span className="text-caption text-ink-500">Canaux actifs</span>
        </div>
        <div className={KPI_CARD}>
          <div className={`${ICON_BUBBLE} bg-secondary-50 text-secondary-600 mb-2`}>
            <Shield size={20} />
          </div>
          <strong className="text-secondary-600 text-h3 font-bold">Standard</strong>
          <span className="text-caption text-ink-500">Niveau sécurité</span>
        </div>
        <div className={KPI_CARD}>
          <div className={`${ICON_BUBBLE} bg-accent-50 text-accent-700 mb-2`}>
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </div>
          <strong className="text-accent-700 text-h3 font-bold">
            {theme === 'dark' ? 'Sombre' : 'Clair'}
          </strong>
          <span className="text-caption text-ink-500">Thème actif</span>
        </div>
      </section>

      <section>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
          <Card variant="feature" className={SETTINGS_CARD}>
            <div className={SECTION_HEAD}>
              <div className={`${ICON_BUBBLE} bg-primary-50`}>
                <BellRing size={20} className="text-primary-600" />
              </div>
              <h2 className="m-0 text-h4 font-bold text-ink-900">Notifications</h2>
            </div>

            <div className="flex flex-col gap-4">
              <ToggleRow checked={emailNotifs} onChange={setEmailNotifs} label="Notifications par email" />
              <ToggleRow checked={pushNotifs} onChange={setPushNotifs} label="Notifications push navigateur" />
              <ToggleRow checked={dailyDigest} onChange={setDailyDigest} label="Resume quotidien" />

              <p className="m-0 mt-2 text-caption text-ink-500 leading-relaxed">
                Activez uniquement les canaux utiles pour eviter la surcharge.
              </p>
            </div>
          </Card>

          <Card variant="feature" className={SETTINGS_CARD}>
            <div className={SECTION_HEAD}>
              <div className={`${ICON_BUBBLE} bg-secondary-50`}>
                <LockKeyhole size={20} className="text-secondary-600" />
              </div>
              <h2 className="m-0 text-h4 font-bold text-ink-900">Confidentialite</h2>
            </div>

            <div className="flex flex-col gap-4">
              <ToggleRow checked={shareStats} onChange={setShareStats} label="Partager mes statistiques anonymisees" />
              <ToggleRow checked={sysNotifs} onChange={setSysNotifs} label="Autoriser les notifications systeme" />
              <ToggleRow checked={loginHistory} onChange={setLoginHistory} label="Historique de connexions actif" />

              <Button className="mt-2" onClick={handleSaveAll}>
                Enregistrer preferences
              </Button>
            </div>
          </Card>

          <Card variant="feature" className={SETTINGS_CARD}>
            <div className={SECTION_HEAD}>
              <div className={`${ICON_BUBBLE} bg-primary-50`}>
                <Palette size={20} className="text-primary-600" />
              </div>
              <h2 className="m-0 text-h4 font-bold text-ink-900">Interface</h2>
            </div>

            <div className="flex flex-col gap-4">
              <ToggleRow checked={smoothAnimations} onChange={setSmoothAnimations} label="Activer animations fluides" />
              <ToggleRow checked={highContrast} onChange={setHighContrast} label="Mode contraste renforce" />
              <ToggleRow checked={compactNav} onChange={setCompactNav} label="Navigation compacte" />

              <div
                className={[
                  'flex items-center justify-between p-4 rounded-lg border shadow-xs transition-all',
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-ink-200/30 to-white/10 border-white/15'
                    : 'bg-gradient-to-br from-primary-50 to-primary-50/50 border-primary-200',
                ].join(' ')}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={[
                      'w-8 h-8 rounded-md flex items-center justify-center shrink-0',
                      theme === 'dark'
                        ? 'bg-accent-100 text-accent-500'
                        : 'bg-primary-100 text-primary-600',
                    ].join(' ')}
                  >
                    {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
                  </div>
                  <div>
                    <p className="m-0 text-body-sm font-semibold text-ink-900">Mode sombre</p>
                    <p className="m-0 mt-0.5 text-caption text-ink-500">
                      {theme === 'dark' ? 'Thème sombre activé' : 'Thème clair activé'}
                    </p>
                  </div>
                </div>
                <Switch checked={theme === 'dark'} onChange={toggleTheme} />
              </div>

              <p className="m-0 mt-1 text-caption text-ink-500 leading-relaxed">
                Ces préférences sont synchronisées avec votre profil utilisateur.
              </p>
            </div>
          </Card>

          <Card variant="feature" className={SETTINGS_CARD}>
            <div className={SECTION_HEAD}>
              <div className={`${ICON_BUBBLE} bg-accent-50`}>
                <SlidersHorizontal size={20} className="text-accent-700" />
              </div>
              <h2 className="m-0 text-h4 font-bold text-ink-900">Compte</h2>
            </div>

            <div className="flex flex-col gap-4">
              <FormGroup label="Langue" id="language">
                <Select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  options={languageOptions}
                  placeholder="Selectionner une langue"
                />
              </FormGroup>

              <FormGroup label="Niveau de securite" id="security">
                <Select
                  id="security"
                  value={securityLevel}
                  onChange={(e) => setSecurityLevel(e.target.value)}
                  options={securityOptions}
                  placeholder="Selectionner un niveau"
                />
              </FormGroup>

              <div className="flex gap-3 pt-2">
                <Button variant="secondary">Exporter mes donnees</Button>
                <Button variant="ghost">Gerer mon compte</Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="max-w-[1280px] mx-auto mt-10 p-6 rounded-lg bg-gradient-to-br from-primary-50 to-primary-50/50 border-[1.5px] border-primary-200 shadow-sm">
          <p className="m-0 mb-2 text-body-sm font-bold text-primary-700">💡 Bonne pratique</p>
          <p className="m-0 text-body-sm text-ink-900 leading-relaxed">
            Conserver les alertes critiques actives et limiter les résumés pour réduire la
            surcharge d'informations.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Settings;
