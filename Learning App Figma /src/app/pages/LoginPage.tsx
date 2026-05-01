import { useState } from 'react';
import { Eye, EyeOff, Sparkles, Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface LoginPageProps {
  onLogin?: () => void;
  onNavigateToSignup?: () => void;
  onNavigateToForgotPassword?: () => void;
}

/* ─── Shared auth background styles ─────────────────────────── */
const authBg = {
  background: 'linear-gradient(90deg, #55a1b4, #164267)',
};
const blob1 = {
  background: 'radial-gradient(circle, rgba(180, 230, 240, 0.55), transparent 65%)',
};
const blob2 = {
  background: 'radial-gradient(circle, rgba(42, 140, 155, 0.4), transparent 65%)',
};

/* ─── Shared card styles ─────────────────────────────────────── */
const authCard = {
  background: 'rgba(255, 255, 255, 0.88)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1px solid rgba(255, 255, 255, 0.7)',
  boxShadow: '0 24px 64px rgba(0, 0, 0, 0.14), 0 8px 24px rgba(0, 0, 0, 0.08)',
};

/* ─── Shared input styles ────────────────────────────────────── */
const authInput = {
  background: '#f3f4f6',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  color: 'var(--foreground)',
};

export default function LoginPage({
  onLogin,
  onNavigateToSignup,
  onNavigateToForgotPassword,
}: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Veuillez remplir tous les champs'); return; }
    if (!email.includes('@')) { setError('Email invalide'); return; }
    if (onLogin) onLogin();
  };

  const handleSocialLogin = () => { if (onLogin) onLogin(); };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* Background */}
      <div className="absolute inset-0 -z-10" style={authBg} />

      {/* Blob 1 — upper center */}
      <div
        className="absolute -top-32 left-1/3 w-[700px] h-[700px] rounded-full blur-3xl opacity-60 pointer-events-none"
        style={blob1}
      />
      {/* Blob 2 — lower left */}
      <div
        className="absolute bottom-0 -left-20 w-96 h-96 rounded-full blur-3xl opacity-50 animate-pulse pointer-events-none"
        style={{ ...blob2, animationDuration: '7s' }}
      />
      {/* Blob 3 — upper right */}
      <div
        className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(100, 200, 215, 0.5), transparent 65%)', animationDuration: '5s', animationDelay: '1s' }}
      />

      {/* Card */}
      <div className="w-full max-w-[420px] relative">
        <div className="relative rounded-2xl p-8 md:p-10" style={authCard}>

          {/* Logo & Header */}
          <div className="text-center mb-7">
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
              style={{ background: 'rgba(85, 161, 180, 0.12)', border: '1px solid rgba(85, 161, 180, 0.2)' }}
            >
              <Sparkles className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            </div>
            <h2
              className="mb-1.5"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                fontSize: 'var(--text-xl)',
              }}
            >
              The Learning App
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
              Connectez-vous pour accéder à votre espace d'apprentissage
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-5 p-3 rounded-lg flex items-start gap-2"
              style={{ background: 'rgba(169, 50, 38, 0.08)', border: '1px solid rgba(169, 50, 38, 0.2)' }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--destructive)' }} />
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--destructive)' }}>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1.5"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                <Input
                  id="email"
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  required
                  className="w-full pl-10"
                  style={authInput}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1.5"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  required
                  className="w-full pl-10 pr-10"
                  style={authInput}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:opacity-80"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded"
                  style={{ accentColor: 'var(--primary)', width: '15px', height: '15px' }}
                />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}>
                  Se souvenir de moi
                </span>
              </label>
              <button
                type="button"
                onClick={onNavigateToForgotPassword}
                className="hover:underline transition-colors"
                style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* CTA */}
            <Button
              type="submit"
              className="w-full text-white transition-opacity hover:opacity-90"
              style={{
                background: 'var(--primary-800)',
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              Se connecter
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 border-t" style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
              ou continuer avec
            </span>
            <div className="flex-1 border-t" style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              onClick={handleSocialLogin}
              variant="outline"
              className="w-full flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
              style={{
                background: 'white',
                border: '1px solid rgba(0,0,0,0.12)',
                color: 'var(--foreground)',
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.8789 15.7789 19.9895 13.221 19.9895 10.1871Z" fill="#4285F4" />
                <path d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9466L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z" fill="#34A853" />
                <path d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z" fill="#FBBC05" />
                <path d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z" fill="#EB4335" />
              </svg>
              Google
            </Button>

            <Button
              type="button"
              onClick={handleSocialLogin}
              variant="outline"
              className="w-full flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
              style={{
                background: 'white',
                border: '1px solid rgba(0,0,0,0.12)',
                color: 'var(--foreground)',
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <rect width="20" height="20" rx="3" fill="#0A66C2" />
                <path d="M6.25 16.25H3.75V8.125H6.25V16.25ZM5 6.875C4.30964 6.875 3.75 6.31536 3.75 5.625C3.75 4.93464 4.30964 4.375 5 4.375C5.69036 4.375 6.25 4.93464 6.25 5.625C6.25 6.31536 5.69036 6.875 5 6.875ZM16.25 16.25H13.75V12.1875C13.75 11.0625 13.4375 10.3125 12.5 10.3125C11.5625 10.3125 11.25 11.0625 11.25 12.1875V16.25H8.75V8.125H11.25V9.375C11.5625 8.75 12.5 8.125 13.75 8.125C15.3125 8.125 16.25 9.0625 16.25 11.25V16.25Z" fill="white" />
              </svg>
              LinkedIn
            </Button>
          </div>

          {/* Signup link */}
          <div className="text-center mt-6">
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
              Pas encore de compte ?{' '}
              <button
                type="button"
                onClick={onNavigateToSignup}
                className="hover:underline transition-colors"
                style={{ color: 'var(--primary)', fontWeight: 'var(--font-weight-semibold)' }}
              >
                Créer un compte
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-white/70" style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-body)' }}>
            © 2026 The Learning Society • Formation IA
          </p>
        </div>
      </div>
    </div>
  );
}