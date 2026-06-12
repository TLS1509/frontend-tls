/**
 * Forgot Password Page : branded auth (deep teal glass dark layout).
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AuthShell,
  AuthSuccess,
  AuthField,
  AuthPrimaryButton,
  AuthGhostButton,
} from '../components/patterns/AuthShell';
import { MailCheck, CheckCircle2, Mail } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    setSent(true);
  };

  return (
    <AuthShell
      brand={{
        icon: <MailCheck size={24} strokeWidth={1.75} className="text-white" />,
        title: 'Mot de passe oublié',
        subtitle: 'Réinitialise ton accès en quelques étapes sécurisées',
      }}
      backLink={{ label: 'Retour à la connexion', onClick: () => navigate('/auth/login') }}
      form={
        !sent ? (
          <form className="flex flex-col gap-stack" onSubmit={handleSubmit}>
            <AuthField
              label="Adresse email"
              icon={<Mail size={18} />}
              type="email"
              placeholder="vous@entreprise.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="flex flex-col gap-stack-xs">
              <AuthPrimaryButton type="submit">Envoyer le lien</AuthPrimaryButton>
              <AuthGhostButton onClick={() => navigate('/auth/login')}>
                Retour connexion
              </AuthGhostButton>
            </div>
          </form>
        ) : (
          <AuthSuccess
            icon={<CheckCircle2 size={32} />}
            title="Email envoyé !"
            description="Un lien de réinitialisation a été envoyé sur votre adresse email. Vérifiez votre boîte de réception et vos spams si besoin."
          >
            <AuthPrimaryButton type="button" onClick={() => navigate('/auth/login')}>
              Aller à la connexion
            </AuthPrimaryButton>
          </AuthSuccess>
        )
      }
    />
  );
};

export default ForgotPassword;
