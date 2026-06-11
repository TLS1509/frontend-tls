import { useState } from 'react';
import { Sparkles, Mail, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface ForgotPasswordPageProps {
  onNavigateToLogin?: () => void;
}

const authBg = {
  background: 'linear-gradient(90deg, #55a1b4, #164267)',
};
const authCard = {
  background: 'rgba(255, 255, 255, 0.88)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1px solid rgba(255, 255, 255, 0.7)',
  boxShadow: '0 24px 64px rgba(0, 0, 0, 0.14), 0 8px 24px rgba(0, 0, 0, 0.08)',
};
const authInput: React.CSSProperties = {
  background: '#f3f4f6',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  color: 'var(--foreground)',
};

export default function ForgotPasswordPage({ onNavigateToLogin }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess(false);
    if (!email) { setError('Veuillez entrer votre adresse email'); return; }
    if (!email.includes('@')) { setError('Email invalide'); return; }
    setSuccess(true);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10" style={authBg} />
      <div className="absolute -top-32 left-1/3 w-[700px] h-[700px] rounded-full blur-3xl opacity-60 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(180, 230, 240, 0.55), transparent 65%)' }} />
      <div className="absolute bottom-0 -left-20 w-96 h-96 rounded-full blur-3xl opacity-50 animate-pulse pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(42, 140, 155, 0.4), transparent 65%)', animationDuration: '7s' }} />
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(100, 200, 215, 0.5), transparent 65%)', animationDuration: '5s', animationDelay: '1s' }} />

      {/* Card */}
      <div className="w-full max-w-[420px] relative">
        <div className="relative rounded-2xl p-8 md:p-10" style={authCard}>

          {/* Back button */}
          <button
            onClick={onNavigateToLogin}
            className="flex items-center gap-2 mb-6 hover:opacity-70 transition-opacity"
            style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la connexion
          </button>

          {/* Header */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
              style={{ background: 'rgba(85, 161, 180, 0.12)', border: '1px solid rgba(85, 161, 180, 0.2)' }}>
              <Sparkles className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            </div>
            <h2 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', fontSize: 'var(--text-xl)' }}>
              Mot de passe oublié ?
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>
              Pas de problème ! Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          {!success ? (
            <>
              {/* Error */}
              {error && (
                <div className="mb-4 p-3 rounded-lg flex items-start gap-2"
                  style={{ background: 'rgba(169, 50, 38, 0.08)', border: '1px solid rgba(169, 50, 38, 0.2)' }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--destructive)' }} />
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--destructive)' }}>{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-1.5"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}>
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                    <Input
                      id="email" type="email" placeholder="votre@email.com"
                      value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      required className="w-full pl-10" style={authInput}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full text-white transition-opacity hover:opacity-90"
                  style={{ background: 'var(--primary-800)', fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)' }}>
                  Envoyer le lien de réinitialisation
                </Button>
              </form>

              {/* Help */}
              <div className="text-center mt-5">
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
                  Vous n'avez pas reçu l'email ?{' '}
                  <button type="button" onClick={(e) => { if (email) handleSubmit(e as any); }}
                    className="hover:underline" style={{ color: 'var(--primary)', fontWeight: 'var(--font-weight-medium)' }}>
                    Renvoyer
                  </button>
                </p>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="p-6 rounded-xl text-center"
              style={{ background: 'rgba(74, 140, 110, 0.08)', border: '1px solid rgba(74, 140, 110, 0.2)' }}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                style={{ background: 'rgba(74, 140, 110, 0.12)' }}>
                <CheckCircle2 className="w-7 h-7" style={{ color: 'var(--success)' }} />
              </div>
              <h3 className="mb-2" style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', fontFamily: 'var(--font-display)' }}>
                Email envoyé !
              </h3>
              <p className="mb-2" style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}>
                Nous venons d'envoyer un lien à <strong>{email}</strong>.
              </p>
              <p className="mb-6" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
                Vérifiez votre boîte de réception. Le lien expirera dans 1 heure.
              </p>
              <Button onClick={onNavigateToLogin} className="w-full text-white transition-opacity hover:opacity-90"
                style={{ background: 'var(--primary-800)', fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)' }}>
                Retour à la connexion
              </Button>
            </div>
          )}
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