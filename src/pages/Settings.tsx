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
import { useTheme } from '../hooks/useTheme';
import { BellRing, LockKeyhole, SlidersHorizontal, Shield, Palette, Settings2, Moon, Sun } from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, toggle: toggleTheme } = useTheme();

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
      <section className="tls-kpi-row" style={{ marginBottom: 'var(--s-10)' }}>
        <div className="tls-kpi" style={{
          transition: 'all var(--dur-2)',
          cursor: 'default',
          boxShadow: 'var(--shadow-sm)',
          padding: 'var(--s-4)',
          borderRadius: 'var(--r-lg)',
          background: 'var(--surface)',
          border: '1px solid var(--border)'
        }}>
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)', marginBottom: 'var(--s-2)' }}>
            <BellRing size={20} />
          </div>
          <strong style={{ color: 'var(--tls-primary-700)' }}>2</strong>
          <span>Canaux actifs</span>
        </div>
        <div className="tls-kpi" style={{
          transition: 'all var(--dur-2)',
          cursor: 'default',
          boxShadow: 'var(--shadow-sm)',
          padding: 'var(--s-4)',
          borderRadius: 'var(--r-lg)',
          background: 'var(--surface)',
          border: '1px solid var(--border)'
        }}>
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-orange-50)', color: 'var(--tls-orange-600)', marginBottom: 'var(--s-2)' }}>
            <Shield size={20} />
          </div>
          <strong style={{ color: 'var(--tls-orange-600)' }}>Standard</strong>
          <span>Niveau sécurité</span>
        </div>
        <div className="tls-kpi" style={{
          transition: 'all var(--dur-2)',
          cursor: 'default',
          boxShadow: 'var(--shadow-sm)',
          padding: 'var(--s-4)',
          borderRadius: 'var(--r-lg)',
          background: 'var(--surface)',
          border: '1px solid var(--border)'
        }}>
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-yellow-50)', color: 'var(--tls-yellow-600)', marginBottom: 'var(--s-2)' }}>
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </div>
          <strong style={{ color: 'var(--tls-yellow-600)' }}>{theme === 'dark' ? 'Sombre' : 'Clair'}</strong>
          <span>Thème actif</span>
        </div>
      </section>

      {/* Settings Grid */}
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--s-6)' }}>

          {/* Notifications Card */}
          <Card variant="feature" style={{
            background: 'var(--surface)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all var(--dur-2)',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}>
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
          <Card variant="feature" style={{
            background: 'var(--surface)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all var(--dur-2)',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}>
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
          <Card variant="feature" style={{
            background: 'var(--surface)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all var(--dur-2)',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}>
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

              {/* Dark mode toggle — wired to useTheme hook */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--s-4) var(--s-4)',
                borderRadius: 'var(--r-lg)',
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, var(--on-color-fill-2xs), var(--overlay-white-xs))'
                  : 'linear-gradient(135deg, var(--tls-primary-50), var(--tls-primary-25))',
                border: `1px solid ${theme === 'dark' ? 'var(--on-color-border-sm)' : 'var(--tls-primary-200)'}`,
                boxShadow: 'var(--shadow-xs)',
                transition: 'all var(--dur-2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 'var(--r-md)',
                    background: theme === 'dark' ? 'var(--tls-yellow-100)' : 'var(--tls-primary-100)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: theme === 'dark' ? 'var(--tls-yellow-500)' : 'var(--tls-primary-600)',
                    flexShrink: 0,
                  }}>
                    {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--text)' }}>
                      Mode sombre
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                      {theme === 'dark' ? 'Thème sombre activé' : 'Thème clair activé'}
                    </p>
                  </div>
                </div>
                <label className="switch" style={{ margin: 0 }}>
                  <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                  />
                  <span className="switch__track" />
                </label>
              </div>

              <p style={{ margin: 'var(--s-1) 0 0', fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Ces préférences sont synchronisées avec votre profil utilisateur.
              </p>
            </div>
          </Card>

          {/* Account Card */}
          <Card variant="feature" style={{
            background: 'var(--surface)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all var(--dur-2)',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}>
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
        <div style={{
          maxWidth: 'var(--container-wide)',
          margin: 'var(--s-10) auto 0',
          padding: 'var(--s-6)',
          background: 'linear-gradient(135deg, var(--tls-primary-50), var(--tls-primary-25))',
          border: '1.5px solid var(--tls-primary-200)',
          borderRadius: 'var(--r-lg)',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all var(--dur-2)'
        }}>
          <p style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-body-sm)', fontWeight: 700, color: 'var(--tls-primary-700)' }}>
            💡 Bonne pratique
          </p>
          <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text)', lineHeight: 1.6 }}>
            Conserver les alertes critiques actives et limiter les résumés pour réduire la surcharge d'informations.
          </p>
        </div>
      </section>
    </div>
  );
};
