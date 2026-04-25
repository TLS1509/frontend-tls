import React, { useState } from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { KeyRound, MailCheck, ShieldAlert, CheckCircle2, ArrowLeft } from 'lucide-react';
import '../styles/static-pages.css';

export const ForgotPassword: React.FC = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="tls-page">
      <section className="tls-page__hero">
        <h1>Mot de passe oublié</h1>
        <p>Réinitialisez votre accès en quelques étapes sécurisées.</p>
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
              <button type="button" className="tls-auth-link">
                <ArrowLeft size={14} />
                Retour a la connexion
              </button>
              <div className="tls-field">
                <label>Email</label>
                <input type="email" placeholder="vous@thelearningsociety.com" />
              </div>
              <div className="tls-auth-actions">
                <Button type="submit"><MailCheck size={16} />Envoyer le lien</Button>
                <Button type="button" variant="ghost">Retour connexion</Button>
              </div>
            </form>
          ) : (
            <div className="tls-auth-success">
              <span>
                <CheckCircle2 size={20} />
              </span>
              <h3>Email envoye !</h3>
              <p>Un lien de reinitialisation a ete envoye sur votre adresse email.</p>
              <Button type="button" onClick={() => setSent(false)}>
                Retour a la connexion
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
