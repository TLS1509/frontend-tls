/**
 * Settings Page - User preferences and settings
 *
 * Features:
 * - Notification preferences with toggles
 * - Privacy/confidentiality controls
 * - Interface preferences (animations, contrast, layout)
 * - Account settings with language and security level selection
 * - Dark mode support via CSS tokens
 * - Accessible form components with labels and descriptions
 */

import React, { useState } from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Select } from '../components/core/Select';
import type { SelectOption } from '../components/core/Select';
import { Switch } from '../components/core/Input';
import { BellRing, LockKeyhole, SlidersHorizontal, Shield, Palette, Globe, Settings2 } from 'lucide-react';
import '../styles/feature-pages-modern.css';
import '../styles/static-pages.css';

export const Settings: React.FC = () => {
  // Notification preferences
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);

  // Privacy preferences
  const [shareStats, setShareStats] = useState(false);
  const [sysNotifs, setSysNotifs] = useState(true);
  const [loginHistory, setLoginHistory] = useState(true);

  // Interface preferences
  const [smoothAnimations, setSmoothAnimations] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [compactNav, setCompactNav] = useState(true);

  // Account settings
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
    // In a real app, this would save to an API
    console.log('Settings saved:', {
      notifications: { emailNotifs, pushNotifs, dailyDigest },
      privacy: { shareStats, sysNotifs, loginHistory },
      interface: { smoothAnimations, highContrast, compactNav },
      account: { language, securityLevel },
    });
  };

  return (
    <div className="tls-page">
      {/* Glass Hero */}
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Settings2 size={12} /> Compte &amp; Préférences</span>
        <h1>Paramètres</h1>
        <p className="tls-editorial-summary">
          Contrôlez vos préférences de notifications, confidentialité et expérience utilisateur.
        </p>
      </section>

      {/* KPI Summary row */}
      <section className="tls-kpi-row">
        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)', marginBottom: 'var(--s-2)' }}>
            <BellRing size={20} />
          </div>
          <strong style={{ color: 'var(--tls-primary-700)' }}>2</strong>
          <span>Canaux actifs</span>
        </div>
        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'rgba(237,132,58,0.1)', color: 'var(--tls-orange-600)', marginBottom: 'var(--s-2)' }}>
            <Shield size={20} />
          </div>
          <strong style={{ color: 'var(--tls-orange-600)' }}>Standard</strong>
          <span>Niveau sécurité</span>
        </div>
        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'rgba(234,192,74,0.12)', color: 'var(--tls-yellow-600)', marginBottom: 'var(--s-2)' }}>
            <Palette size={20} />
          </div>
          <strong style={{ color: 'var(--tls-yellow-600)' }}>Auto</strong>
          <span>Mises à jour</span>
        </div>
      </section>

      {/* Settings Grid */}
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--s-6)' }}>

          {/* Notifications Card */}
          <Card variant="feature" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', marginBottom: 'var(--s-4)', paddingBottom: 'var(--s-4)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 'var(--r-lg)', background: 'var(--tls-primary-50)' }}>
                <BellRing size={20} style={{ color: 'var(--tls-primary-600)' }} />
              </div>
              <h2 style={{ margin: 0, fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)' }}>
                Notifications
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                />
                <span className="switch__track" />
                <span style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text)' }}>Notifications par email</span>
              </label>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={pushNotifs}
                  onChange={(e) => setPushNotifs(e.target.checked)}
                />
                <span className="switch__track" />
                <span style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text)' }}>Notifications push navigateur</span>
              </label>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={dailyDigest}
                  onChange={(e) => setDailyDigest(e.target.checked)}
                />
                <span className="switch__track" />
                <span style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text)' }}>Resume quotidien</span>
              </label>

              <p style={{ margin: 'var(--s-2) 0 0', fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Activez uniquement les canaux utiles pour eviter la surcharge.
              </p>
            </div>
          </Card>

          {/* Privacy Card */}
          <Card variant="feature" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', marginBottom: 'var(--s-4)', paddingBottom: 'var(--s-4)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 'var(--r-lg)', background: 'var(--tls-orange-50)' }}>
                <LockKeyhole size={20} style={{ color: 'var(--tls-orange-600)' }} />
              </div>
              <h2 style={{ margin: 0, fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)' }}>
                Confidentialite
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={shareStats}
                  onChange={(e) => setShareStats(e.target.checked)}
                />
                <span className="switch__track" />
                <span style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text)' }}>Partager mes statistiques anonymisees</span>
              </label>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={sysNotifs}
                  onChange={(e) => setSysNotifs(e.target.checked)}
                />
                <span className="switch__track" />
                <span style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text)' }}>Autoriser les notifications systeme</span>
              </label>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={loginHistory}
                  onChange={(e) => setLoginHistory(e.target.checked)}
                />
                <span className="switch__track" />
                <span style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text)' }}>Historique de connexions actif</span>
              </label>

              <Button style={{ marginTop: 'var(--s-2)' }} onClick={handleSaveAll}>
                Enregistrer preferences
              </Button>
            </div>
          </Card>

          {/* Interface Card */}
          <Card variant="feature" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', marginBottom: 'var(--s-4)', paddingBottom: 'var(--s-4)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 'var(--r-lg)', background: 'var(--tls-primary-50)' }}>
                <Palette size={20} style={{ color: 'var(--tls-primary-600)' }} />
              </div>
              <h2 style={{ margin: 0, fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)' }}>
                Interface
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={smoothAnimations}
                  onChange={(e) => setSmoothAnimations(e.target.checked)}
                />
                <span className="switch__track" />
                <span style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text)' }}>Activer animations fluides</span>
              </label>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                />
                <span className="switch__track" />
                <span style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text)' }}>Mode contraste renforce</span>
              </label>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={compactNav}
                  onChange={(e) => setCompactNav(e.target.checked)}
                />
                <span className="switch__track" />
                <span style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text)' }}>Navigation compacte</span>
              </label>

              <p style={{ margin: 'var(--s-2) 0 0', fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Ces preferences sont synchronisees avec votre profil utilisateur.
              </p>
            </div>
          </Card>

          {/* Account Card */}
          <Card variant="feature" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', marginBottom: 'var(--s-4)', paddingBottom: 'var(--s-4)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 'var(--r-lg)', background: 'var(--tls-yellow-50)' }}>
                <SlidersHorizontal size={20} style={{ color: 'var(--tls-yellow-600)' }} />
              </div>
              <h2 style={{ margin: 0, fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)' }}>
                Compte
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
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

              <div style={{ display: 'flex', gap: 'var(--s-3)', paddingTop: 'var(--s-2)' }}>
                <Button variant="secondary">Exporter mes donnees</Button>
                <Button variant="ghost">Gerer mon compte</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Best Practices Callout */}
        <div style={{ maxWidth: 'var(--container-wide)', margin: 'var(--s-8) auto 0', padding: 'var(--s-4)', background: 'var(--tls-primary-50)', border: '1px solid var(--tls-primary-200)', borderRadius: 'var(--r-lg)' }}>
          <p style={{ margin: '0 0 var(--s-1)', fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--text)' }}>
            💡 Bonne pratique
          </p>
          <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Conserver les alertes critiques actives et limiter les resumes pour reduire la surcharge d'informations.
          </p>
        </div>
      </section>
    </div>
  );
};
