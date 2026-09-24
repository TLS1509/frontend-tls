import React, { useId } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '../core/Button';
import { Input } from '../core/Input';

export interface NewsletterSignupCardProps {
  onSubmit?: (email: string) => void;
  onSeeLastIssue?: () => void;
  /**
   * Niveau du bouton « S'inscrire ». Par défaut `soft` : posé dans une page,
   * le panneau porte une action de contexte (arbitrage n°19 — un seul `solid`
   * par écran, et c'est l'action principale de la page). `solid` pour une page
   * dont l'inscription EST l'action principale (une page Newsletter) : il rend
   * alors le verre clair `onDark`, le `solid` d'un fond sombre.
   */
  ctaEmphasis?: 'soft' | 'solid';
  className?: string;
}

export const NewsletterSignupCard: React.FC<NewsletterSignupCardProps> = ({
  onSubmit,
  onSeeLastIssue,
  ctaEmphasis = 'soft',
  className = '',
}) => {
  const inputId = useId();

  return (
    <div className={['relative w-full overflow-hidden bg-primary-900', className].filter(Boolean).join(' ')}>
      {/* Ambient glows */}
      <div aria-hidden className="absolute -top-16 -left-16 w-64 h-64 rounded-pill bg-primary-600/20 blur-[80px] pointer-events-none" />
      <div aria-hidden className="absolute -bottom-10 right-1/4 w-48 h-48 rounded-pill bg-accent-400/10 blur-[60px] pointer-events-none" />

      <div className="@container relative z-10 max-w-page mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
        <div className="flex flex-col @2xl:flex-row @2xl:items-center gap-section">

          {/* Editorial copy — surtitre → titre 8 · titre → texte 12 ·
              texte → action 24. Sur ce fond sombre, le texte est en blanc
              plein : la hiérarchie passe par la taille et la graisse, pas par
              l'opacité (le surtitre était à blanc/40, 11 px capitales
              espacées ; le texte à blanc/60). */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex flex-col">
              <p className="font-body text-caption font-semibold text-white">
                Newsletter · Gratuit
              </p>
              {/* `mt-stack-xs` sur le titre : il bat la marge de base des
                  titres (0,75em = 21 px), qui éloignait le surtitre. */}
              <h2 className="mt-stack-xs font-display text-h2 text-white text-balance">
                La sélection TLS,<br />chaque vendredi.
              </h2>
            </div>
            <p className="mt-stack-sm font-body text-body text-white max-w-prose">
              Les meilleurs articles, vidéos et dossiers de la semaine — curés par notre équipe éditoriale.
            </p>
            {/* Une action secondaire du panneau : `ghost` sur fond sombre
                (primary-900, au-delà du cran 700 que demande le blanc). Elle
                était en `solid` — le niveau principal, pendant que
                l'inscription, l'action du panneau, restait en `soft`.
                `-ml-stack` rend au libellé le bord gauche du texte : sans
                boîte au repos, le padding du `ghost` (16 px en `sm`) le
                décalait ; son fond de survol déborde à gauche, c'est voulu. */}
            {onSeeLastIssue && (
              <Button
                type="button"
                emphasis="ghost" onDark
                size="sm"
                trailingIcon={<ArrowRight size={14} />}
                onClick={onSeeLastIssue}
                className="self-start mt-stack-lg -ml-stack"
              >
                Voir la dernière édition
              </Button>
            )}
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-stack-xs w-full @2xl:w-auto @2xl:min-w-[320px]"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              onSubmit?.(fd.get('email') as string);
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <label htmlFor={inputId} className="font-body text-caption font-semibold text-white">
              Votre adresse e-mail
            </label>
            <div className="flex flex-col @lg:flex-row gap-stack-xs">
              <Input
                id={inputId}
                name="email"
                type="email"
                required
                placeholder="votre@email.com"
                autoComplete="email"
                size="md"
                leadingIcon={<Mail size={14} />}
                className="flex-1 min-w-0"
              />
              <Button type="submit" emphasis={ctaEmphasis} onDark={ctaEmphasis === 'solid'} size="md">
                S'inscrire
              </Button>
            </div>
            <p className="font-body text-caption text-white/80">
              Pas de spam · Désinscription en 1 clic
            </p>
          </form>

        </div>
      </div>
    </div>
  );
};

export default NewsletterSignupCard;
