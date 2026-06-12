/**
 * VerifyEmail : Confirmation email post-inscription.
 *
 * Flow : après /auth/signup, l'utilisateur arrive ici. Il doit cliquer sur le
 * lien reçu par email. La page propose :
 *  - State 1 (pending) : "Vérifiez vos emails" + bouton "Renvoyer le lien"
 *    avec compte à rebours 60s anti-spam.
 *  - State 2 (verified) : AuthSuccess + CTA "Continuer".
 *
 * Route : /auth/verify-email
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AuthShell,
  AuthSuccess,
  AuthPrimaryButton,
  AuthGhostButton,
  AuthInlineLink,
} from '../components/patterns/AuthShell';
import { MailCheck, CheckCircle2, RefreshCcw, Inbox } from 'lucide-react';

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const email = 'marie.dupont@example.com'; // mock (would come from signup state / query)

  const [verified, setVerified] = useState(false);
  const [cooldown, setCooldown] = useState(60);

  // Decrement cooldown each second
  useEffect(() => {
    if (verified || cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown, verified]);

  // Simulate auto-verification (for demo purpose). Remove when wired to API.
  // setTimeout disabled : uncomment to test the success state automatically.

  const handleResend = () => {
    if (cooldown > 0) return;
    setCooldown(60);
    // (API call) : send new verification email
  };

  const handleSimulateClick = () => {
    setVerified(true);
  };

  const handleContinue = () => {
    navigate('/onboarding');
  };

  return (
    <AuthShell
      brand={{
        icon: <MailCheck size={24} strokeWidth={1.75} className="text-white" />,
        title: 'Vérifie ton email',
        subtitle: 'Une dernière étape pour activer ton compte',
      }}
      backLink={{ label: 'Retour à la connexion', onClick: () => navigate('/auth/login') }}
      form={
        !verified ? (
          <div className="flex flex-col gap-stack">
            {/* Inbox visual */}
            <div className="flex flex-col items-center gap-stack-xs p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-glass-light">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 border border-white/25 text-white">
                <Inbox size={26} strokeWidth={1.75} />
              </div>
              <div className="flex flex-col items-center text-center gap-tight">
                <p className="m-0 font-body text-body-sm text-white/70">
                  Lien envoyé à
                </p>
                <p className="m-0 font-display text-body font-semibold text-white">
                  {email}
                </p>
              </div>
            </div>

            <p className="m-0 font-body text-body-sm text-white/75 leading-relaxed text-center">
              Clique sur le lien de confirmation reçu dans ta boîte de réception pour activer ton compte.
              Vérifie aussi tes spams si besoin.
            </p>

            <div className="flex flex-col gap-stack-xs">
              {/* Demo button : would not exist in prod; simulates clicking the email link */}
              <AuthPrimaryButton onClick={handleSimulateClick}>
                Simuler la vérification (démo)
              </AuthPrimaryButton>

              <AuthGhostButton onClick={handleResend} disabled={cooldown > 0}>
                <span className="inline-flex items-center gap-stack-xs">
                  <RefreshCcw size={16} />
                  {cooldown > 0 ? `Renvoyer le lien (${cooldown}s)` : 'Renvoyer le lien'}
                </span>
              </AuthGhostButton>
            </div>

            <p className="m-0 font-body text-caption text-white/60 text-center leading-relaxed">
              Mauvaise adresse email ? <AuthInlineLink onClick={() => navigate('/auth/signup')}>Modifier l'inscription</AuthInlineLink>
            </p>
          </div>
        ) : (
          <AuthSuccess
            icon={<CheckCircle2 size={32} />}
            title="Email vérifié !"
            description="Ton compte est actif. Continue ton inscription en choisissant ta formule d'abonnement."
          >
            <div className="flex flex-col gap-stack-xs">
              <AuthPrimaryButton onClick={handleContinue}>
                Choisir ma formule
              </AuthPrimaryButton>
              <AuthGhostButton onClick={() => navigate('/auth/login')}>
                Aller à la connexion
              </AuthGhostButton>
            </div>
          </AuthSuccess>
        )
      }
    />
  );
};

export default VerifyEmail;
