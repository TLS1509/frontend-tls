/**
 * MagicLink : Authentification sans mot de passe par lien email.
 *
 * Flow : alternative au login classique. L'utilisateur entre son email →
 * reçoit un lien magique unique → clique pour se connecter.
 *
 * Structure (2 states) :
 *  - State 1 (request) : AuthShell + form email + bouton "Envoyer le lien magique"
 *  - State 2 (sent) : AuthSuccess + "Vérifiez vos emails" + bouton "Renvoyer"
 *
 * Route : /auth/magic-link
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AuthShell,
  AuthSuccess,
  AuthField,
  AuthPrimaryButton,
  AuthGhostButton,
  AuthDivider,
  AuthInlineLink,
} from '../components/patterns/AuthShell';
import { Wand2, Mail, RefreshCcw, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const MagicLink: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setCooldown(60);
  };

  const handleResend = () => {
    if (cooldown > 0) return;
    setCooldown(60);
  };

  return (
    <AuthShell
      brand={{
        icon: <Wand2 size={24} strokeWidth={1.75} className="text-white" />,
        title: 'Connexion par lien magique',
        subtitle: 'Sans mot de passe, juste votre email',
      }}
      backLink={{ label: 'Retour à la connexion', onClick: () => navigate('/auth/login') }}
      form={
        !sent ? (
          <form className="flex flex-col gap-stack" onSubmit={handleSubmit}>
            {/* Mini-pitch trust */}
            <div className="flex flex-col gap-stack-xs p-stack rounded-2xl bg-white/8 border border-white/15 backdrop-blur-glass-light">
              <div className="flex items-start gap-2.5">
                <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/15 text-white">
                  <Zap size={14} />
                </span>
                <div>
                  <p className="m-0 font-body text-body-sm font-semibold text-white">
                    Plus rapide
                  </p>
                  <p className="m-0 font-body text-caption text-white/65 leading-snug">
                    Connexion en 2 clics sans mot de passe à retenir.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/15 text-white">
                  <ShieldCheck size={14} />
                </span>
                <div>
                  <p className="m-0 font-body text-body-sm font-semibold text-white">
                    Plus sûr
                  </p>
                  <p className="m-0 font-body text-caption text-white/65 leading-snug">
                    Lien à usage unique, expirant après 15 minutes.
                  </p>
                </div>
              </div>
            </div>

            <AuthField
              label="Adresse email"
              icon={<Mail size={18} />}
              type="email"
              placeholder="vous@entreprise.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <div className="flex flex-col gap-stack-xs">
              <AuthPrimaryButton type="submit">
                <span className="inline-flex items-center gap-stack-xs">
                  <Sparkles size={16} />
                  Envoyer le lien magique
                </span>
              </AuthPrimaryButton>
            </div>

            <AuthDivider>ou</AuthDivider>

            <AuthGhostButton onClick={() => navigate('/auth/login')}>
              Se connecter avec mot de passe
            </AuthGhostButton>

            <p className="m-0 font-body text-caption text-white/60 text-center leading-relaxed">
              Pas encore de compte ? <AuthInlineLink onClick={() => navigate('/auth/signup')}>Créer un compte</AuthInlineLink>
            </p>
          </form>
        ) : (
          <AuthSuccess
            icon={<Mail size={32} />}
            title="Lien envoyé !"
            description={
              <>
                Un lien magique a été envoyé à <strong className="text-white">{email}</strong>. Cliquez dessus pour vous connecter. Le lien expire dans 15 minutes.
              </>
            }
          >
            <div className="flex flex-col gap-stack-xs">
              <AuthGhostButton onClick={handleResend} disabled={cooldown > 0}>
                <span className="inline-flex items-center gap-stack-xs">
                  <RefreshCcw size={16} />
                  {cooldown > 0 ? `Renvoyer (${cooldown}s)` : 'Renvoyer le lien'}
                </span>
              </AuthGhostButton>
              <AuthGhostButton onClick={() => { setSent(false); setEmail(''); }}>
                Modifier l'adresse
              </AuthGhostButton>
            </div>

            <p className="m-0 mt-stack font-body text-caption text-white/60 text-center leading-relaxed">
              Email non reçu ? Vérifiez vos spams ou <AuthInlineLink onClick={() => navigate('/help')}>contactez le support</AuthInlineLink>.
            </p>
          </AuthSuccess>
        )
      }
    />
  );
};

export default MagicLink;
