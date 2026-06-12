import React, { useId } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '../core/Button';
import { Input } from '../core/Input';

export interface NewsletterSignupCardProps {
  onSubmit?: (email: string) => void;
  onSeeLastIssue?: () => void;
  className?: string;
}

export const NewsletterSignupCard: React.FC<NewsletterSignupCardProps> = ({
  onSubmit,
  onSeeLastIssue,
  className = '',
}) => {
  const inputId = useId();

  return (
    <div className={['relative w-full overflow-hidden bg-primary-900', className].filter(Boolean).join(' ')}>
      {/* Ambient glows */}
      <div aria-hidden className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary-600/20 blur-[80px] pointer-events-none" />
      <div aria-hidden className="absolute -bottom-10 right-1/4 w-48 h-48 rounded-full bg-accent-400/10 blur-[60px] pointer-events-none" />

      <div className="relative z-10 max-w-page mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12">

          {/* Editorial copy */}
          <div className="flex flex-col gap-stack flex-1 min-w-0">
            <span className="font-body text-micro font-bold uppercase tracking-[0.2em] text-white/40">
              Newsletter · Gratuit
            </span>
            <h2 className="m-0 font-display text-h2 font-bold text-white leading-tight text-balance">
              La sélection TLS,<br />chaque vendredi.
            </h2>
            <p className="m-0 font-body text-body text-white/60 leading-relaxed max-w-md">
              Les meilleurs articles, vidéos et dossiers de la semaine — curés par notre équipe éditoriale.
            </p>
            {onSeeLastIssue && (
              <Button
                type="button"
                variant="glass"
                size="sm"
                trailingIcon={<ArrowRight size={13} />}
                onClick={onSeeLastIssue}
                className="self-start"
              >
                Voir la dernière édition
              </Button>
            )}
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-stack-xs w-full sm:w-auto sm:min-w-[320px]"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              onSubmit?.(fd.get('email') as string);
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <label htmlFor={inputId} className="font-body text-caption font-semibold text-white/70">
              Votre adresse e-mail
            </label>
            <div className="flex flex-col sm:flex-row gap-stack-xs">
              <Input
                id={inputId}
                name="email"
                type="email"
                required
                placeholder="votre@email.com"
                autoComplete="email"
                size="md"
                leadingIcon={<Mail size={15} />}
                className="flex-1 min-w-0"
              />
              <Button type="submit" variant="primary" size="md">
                S'inscrire
              </Button>
            </div>
            <p className="m-0 font-body text-micro text-white/40">
              Pas de spam · Désinscription en 1 clic
            </p>
          </form>

        </div>
      </div>
    </div>
  );
};

export default NewsletterSignupCard;
