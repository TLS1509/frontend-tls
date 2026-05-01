/**
 * Forgot Password Page — Password recovery flow
 *
 * Features:
 * - Email input for password reset request
 * - Success confirmation message
 * - Dark mode support via CSS tokens
 * - Fully accessible form components
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { KeyRound, MailCheck, ShieldAlert, CheckCircle2, ArrowLeft, Mail } from 'lucide-react';
import '../styles/static-pages.css';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call would happen here to request password reset
    console.log('Password reset requested for:', email);
    setSent(true);
  };

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><MailCheck size={12} /> Recuperation d'acces</span>
        <h1>Mot de passe oublié</h1>
        <p className="tls-editorial-summary">Reinitialisez votre acces en quelques etapes securisees.</p>
      </section>

      <section className="tls-auth-shell">
        <Card className="tls-auth-card">
          {!sent ? (
            <form
              className="tls-form"
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}
            >
              <button
                type="button"
                onClick={() => navigate('/auth/login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--tls-primary-600)',
                  cursor: 'pointer',
                  fontSize: 'var(--t-body-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--s-1)',
                  padding: 0,
                  marginBottom: 'var(--s-2)',
                }}
              >
                <ArrowLeft size={14} />
                Retour a la connexion
              </button>

              <FormGroup
                label="Email"
                hint="Entrez l'email associé à votre compte"
                id="email"
                required
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@thelearningsociety.com"
                  leadingIcon={<Mail size={14} />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <div style={{ display: 'flex', gap: 'var(--s-3)', flexDirection: 'column' }}>
                <Button type="submit">
                  <MailCheck size={16} />
                  Envoyer le lien
                </Button>
                <Button type="button" variant="ghost" onClick={() => navigate('/auth/login')}>
                  Retour connexion
                </Button>
              </div>
            </form>
          ) : (
            <div
              className="tls-auth-success"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--s-4)',
                textAlign: 'center',
                padding: 'var(--s-6)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'var(--tls-primary-50)',
                  color: 'var(--tls-primary-600)',
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-h3)', color: 'var(--text)' }}>
                  Email envoye !
                </h3>
                <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Un lien de reinitialisation a ete envoye sur votre adresse email. Verifiez votre boite de reception et vos spams si besoin.
                </p>
              </div>
              <Button type="button" onClick={() => navigate('/auth/login')}>
                Aller a la connexion
              </Button>
            </div>
          )}
        </Card>

        <aside className="tls-auth-aside">
          <div className="tls-auth-feature">
            <h4><KeyRound size={16} /> Lien à usage unique</h4>
            <p>Le lien de réinitialisation expire automatiquement pour plus de sécurité.</p>
          </div>
          <div className="tls-auth-feature">
            <h4><ShieldAlert size={16} /> Vérification email</h4>
            <p>Vérifiez votre boîte de réception et vos spams si besoin.</p>
          </div>
        </aside>
      </section>
    </div>
  );
};
