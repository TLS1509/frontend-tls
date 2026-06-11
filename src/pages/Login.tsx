/**
 * Login Page : branded auth (deep teal glass dark layout).
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
import { Mail } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <AuthShell
      form={
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <AuthField
            label="Adresse email"
            icon={<Mail size={18} />}
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <AuthPasswordField
            label="Mot de passe"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <AuthCheckbox
              checked={rememberMe}
              onChange={setRememberMe}
              label="Se souvenir de moi"
            />
            <button
              type="button"
              onClick={() => navigate('/auth/forgot-password')}
              className="bg-transparent border-0 p-0 cursor-pointer text-body-sm font-medium text-white/85 hover:text-white hover:underline underline-offset-4 transition-colors"
            >
              Mot de passe oublié ?
            </button>
          </div>

          <AuthPrimaryButton type="submit">Se connecter</AuthPrimaryButton>

          {/* Divider + Socials */}
          <AuthDivider>ou continuer avec</AuthDivider>
          <div className="flex flex-col gap-3">
            <AuthSocialButton icon={<AuthGoogleIcon />}>Google</AuthSocialButton>
            <AuthSocialButton icon={<AuthLinkedinIcon />}>LinkedIn</AuthSocialButton>
          </div>

          {/* Footer link */}
          <p className="text-center text-body-sm text-white/75 m-0 mt-1">
            Pas encore de compte ?{' '}
            <AuthInlineLink onClick={() => navigate('/auth/signup')}>
              Créer un compte
            </AuthInlineLink>
          </p>
        </form>
      }
    />
  );
};

export default Login;
