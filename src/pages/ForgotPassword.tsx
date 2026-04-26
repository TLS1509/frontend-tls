import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { KeyRound, MailCheck, ShieldAlert, CheckCircle2, ArrowLeft } from 'lucide-react';
import '../styles/static-pages.css';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

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
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <button type="button" className="tls-auth-link" onClick={() => navigate('/auth/login')}>
                <ArrowLeft size={14} />
                Retour a la connexion
              </button>
              <div className="tls-field">
                <label>Email</label>
                <input type="email" placeholder="vous@thelearningsociety.com" />
              </div>
              <div className="tls-auth-actions">
                <Button type="submit"><MailCheck size={16} />Envoyer le lien</Button>
                <Button type="button" variant="ghost" onClick={() => navigate('/auth/login')}>Retour connexion</Button>
              </div>
            </form>
          ) : (
            <div className="tls-auth-success">
              <span>
                <CheckCircle2 size={20} />
              </span>
              <h3>Email envoye !</h3>
              <p>Un lien de reinitialisation a ete envoye sur votre adresse email.</p>
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
