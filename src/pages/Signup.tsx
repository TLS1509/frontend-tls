/**
 * Signup Page : branded auth (deep teal glass dark layout).
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AuthShell,
  AuthDivider,
  AuthSocialButton,
  AuthInlineLink,
  AuthGoogleIcon,
  AuthLinkedinIcon,
  AuthField,
  AuthPasswordField,
  AuthPrimaryButton,
  AuthCheckbox,
} from '../components/patterns/AuthShell';
import { Mail, UserRound } from 'lucide-react';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) return;
    navigate('/auth/verify-email');
  };

  return (
    <AuthShell
      brand={{ subtitle: 'Crée ton compte pour démarrer ta formation' }}
      form={
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <AuthField
            label="Nom complet"
            icon={<UserRound size={18} />}
            type="text"
            placeholder="Ton nom"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <AuthField
            label="Adresse email"
            icon={<Mail size={18} />}
            type="email"
            placeholder="toi@entreprise.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <AuthPasswordField
            label="Mot de passe"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <AuthCheckbox
            checked={acceptTerms}
            onChange={setAcceptTerms}
            required
            label={
              <>
                J'accepte les{' '}

                <a href="#" className="text-white underline underline-offset-4 hover:text-white/85">
                  conditions d'utilisation
                </a>{' '}
                et la{' '}
                <a href="#" className="text-white underline underline-offset-4 hover:text-white/85">
                  politique de confidentialité
                </a>
              </>
            }
          />

          <AuthPrimaryButton type="submit" disabled={!acceptTerms}>
            Créer mon compte
          </AuthPrimaryButton>

          {/* Divider + Socials */}
          <AuthDivider>ou continuer avec</AuthDivider>
          <div className="flex flex-col gap-3">
            <AuthSocialButton icon={<AuthGoogleIcon />}>Google</AuthSocialButton>
            <AuthSocialButton icon={<AuthLinkedinIcon />}>LinkedIn</AuthSocialButton>
          </div>

          {/* Footer link */}
          <p className="text-center text-body-sm text-white/75 m-0 mt-1">
            Déjà inscrit ?{' '}
            <AuthInlineLink onClick={() => navigate('/auth/login')}>
              Se connecter
            </AuthInlineLink>
          </p>
        </form>
      }
    />
  );
};

export default Signup;
