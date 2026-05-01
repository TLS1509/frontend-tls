/**
 * Reset Password Page — Password reset form
 *
 * Features:
 * - New password input with confirmation
 * - Password strength recommendations
 * - Dark mode support via CSS tokens
 * - Fully accessible form components
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { ArrowLeft, ShieldCheck, Sparkles, Lock, CheckCircle2 } from 'lucide-react';
import '../styles/static-pages.css';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (confirmPassword) {
      setPasswordMatch(value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setPasswordMatch(password === value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    // API call would happen here
    console.log('Password reset with new password');
    navigate('/auth/login');
  };

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Nouveau mot de passe</span>
        <h1>Reinitialiser mon mot de passe</h1>
        <p className="tls-editorial-summary">Definition d'un nouveau mot de passe apres validation email.</p>
      </section>
      <section className="tls-content-layout">
        <div className="tls-content-main">
          <Card className="tls-section-card" style={{ background: 'var(--surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', marginBottom: 'var(--s-6)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--r-lg)',
                  background: 'var(--tls-primary-50)',
                }}
              >
                <ShieldCheck size={20} style={{ color: 'var(--tls-primary-600)' }} />
              </div>
              <h3 style={{ margin: 0, fontSize: 'var(--t-h4)', color: 'var(--text)' }}>
                Creer un mot de passe robuste
              </h3>
            </div>

            <form
              className="tls-form"
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}
            >
              <FormGroup
                label="Nouveau mot de passe"
                hint="Minimum 12 caractères avec majuscules, minuscules, chiffres et symboles"
                id="password"
                required
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  leadingIcon={<Lock size={14} />}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
              </FormGroup>

              <FormGroup
                label="Confirmer le mot de passe"
                error={!passwordMatch ? 'Les mots de passe ne correspondent pas' : undefined}
                id="confirm-password"
                required
              >
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••••••"
                  leadingIcon={<Lock size={14} />}
                  status={!passwordMatch && confirmPassword ? 'error' : 'default'}
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                />
              </FormGroup>

              <div style={{ display: 'flex', gap: 'var(--s-3)', flexDirection: 'column' }}>
                <Button type="submit">Mettre a jour</Button>
                <Button type="button" variant="secondary" onClick={() => navigate('/auth/login')}>
                  <ArrowLeft size={14} /> Retour connexion
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <aside className="tls-content-aside tls-editorial-sticky">
          <Card className="tls-section-card" style={{ background: 'var(--surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-3)' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--tls-primary-600)' }} />
              <h4 style={{ margin: 0, fontSize: 'var(--t-h4)', color: 'var(--text)' }}>
                Regles recommandees
              </h4>
            </div>
            <ul style={{ margin: '0', paddingLeft: 'var(--s-4)', fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: 'var(--s-2)' }}>Au moins 12 caracteres.</li>
              <li style={{ marginBottom: 'var(--s-2)' }}>Melanger lettres, chiffres et symboles.</li>
              <li>Eviter les mots evidents ou personnels.</li>
            </ul>
          </Card>
        </aside>
      </section>
    </div>
  );
};

