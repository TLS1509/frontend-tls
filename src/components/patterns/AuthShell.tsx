import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react';
import { TlsLogo } from '../ui/TlsLogo';
import { Input } from '../core/Input';

/**
 * AuthShell — full-bleed branded auth layout.
 *
 * Visual:
 *   - Page bg : deep teal gradient (primary-600 → primary-800)
 *   - Ambient diffuse blobs (blur-ambient)
 *   - Centered glass Card (max-w-[480px]) on dark — `bg-white/10` + `backdrop-blur-glass-medium`
 *   - Branded header inside card : icon bubble + brand title + subtitle (all white)
 *   - Form slot
 *   - Optional aside footer slot (below the card, e.g. recommendations on ResetPassword)
 *   - Optional copyright footer
 *
 * Used by Login, Signup, ForgotPassword, ResetPassword.
 *
 * For glassy form fields inside, use the `AUTH_INPUT_CLASSES` helper exported below.
 */

export interface AuthShellProps {
  /** Form content (inputs + buttons). Wrapped in a glass dark Card automatically. */
  form: React.ReactNode;
  /**
   * Branding inside the Card top — defaults to TLS Sparkles icon + "The Learning Society".
   * Pass `null` to disable, or a custom node.
   */
  brand?: {
    icon?: React.ReactNode;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
  } | null;
  /** Optional back link (e.g. "Retour à la connexion") rendered above the card. */
  backLink?: { label: string; onClick: () => void };
  /** Optional aside/extra content rendered below the card (e.g. recommendations). */
  aside?: React.ReactNode;
  /** Optional footer line below everything (defaults to "© {year} The Learning Society · Formation IA"). */
  footer?: React.ReactNode;
  className?: string;
}

// ─── Glass dark style helpers (exported for form fields) ─────────────────────

/**
 * Tailwind classes for inputs/textareas on the glass dark Card.
 * Apply with `<Input className={AUTH_INPUT_CLASSES} ... />` or directly on raw inputs.
 */
export const AUTH_INPUT_CLASSES =
  'bg-white/10 backdrop-blur-glass-light border border-white/20 text-white placeholder:text-white/55 ' +
  'focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/20 ' +
  'hover:border-white/30';

export const AUTH_LABEL_CLASSES = 'text-white font-semibold';

// ─── Component ───────────────────────────────────────────────────────────────

export const AuthShell: React.FC<AuthShellProps> = ({
  form,
  brand,
  backLink,
  aside,
  footer,
  className = '',
}) => {
  // Default branding (TLS) — can be overridden or disabled with brand={null}
  const brandContent =
    brand === null
      ? null
      : {
          icon: brand?.icon ?? <TlsLogo size={40} withBubble={false} />,
          title: brand?.title ?? 'The Learning Society',
          subtitle: brand?.subtitle ?? 'Connectez-vous pour accéder à vos formations',
        };

  const defaultFooter = (
    <>© {new Date().getFullYear()} The Learning Society · Formation IA</>
  );

  return (
    <div
      className={[
        // Full-bleed page background : deep teal gradient
        'relative min-h-[100dvh] overflow-hidden',
        'bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Diffuse ambient blobs — large + heavily blurred for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[10%] -left-40 w-[640px] h-[640px] rounded-full bg-primary-400/25 blur-ambient"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[5%] -right-32 w-[560px] h-[560px] rounded-full bg-primary-300/20 blur-ambient"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-primary-500/15 blur-ambient -translate-x-1/2 -translate-y-1/2"
      />

      {/* Centered content */}
      <div className="relative min-h-[100dvh] flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-[480px] flex flex-col gap-stack-lg">

          {/* Back link */}
          {backLink && (
            <AuthBackLink label={backLink.label} onClick={backLink.onClick} />
          )}

          {/* Glass dark Card */}
          <section
            className={[
              'relative rounded-3xl px-8 py-10 sm:px-10 sm:py-12',
              'bg-white/10 backdrop-blur-glass-medium',
              'border border-white/20',
              'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.30)]',
              'flex flex-col gap-stack-lg',
            ].join(' ')}
          >
            {/* Inner highlight on top edge for glass premium feel */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-3xl"
            />

            {/* Branding */}
            {brandContent && (
              <header className="flex flex-col items-center text-center gap-3">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/15 backdrop-blur-glass-light border border-white/25 shadow-sm">
                  {brandContent.icon}
                </span>
                <h1 className="font-display text-h2 font-bold text-white m-0 leading-tight tracking-tight text-balance">
                  {brandContent.title}
                </h1>
                {brandContent.subtitle && (
                  <p className="font-body text-body-sm text-white/75 m-0 leading-relaxed">
                    {brandContent.subtitle}
                  </p>
                )}
              </header>
            )}

            {/* Form slot */}
            <div className="flex flex-col gap-stack">{form}</div>
          </section>

          {/* Optional aside content (e.g. recommendations on ResetPassword) */}
          {aside && (
            <aside className="rounded-2xl px-6 py-5 bg-white/8 backdrop-blur-glass-light border border-white/15 text-white/85">
              {aside}
            </aside>
          )}

          {/* Footer */}
          <p className="text-center text-caption text-white/60 m-0">
            {footer ?? defaultFooter}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Sub-components ──────────────────────────────────────────────────────────

export interface AuthBackLinkProps {
  label: string;
  onClick: () => void;
  className?: string;
}

/**
 * AuthBackLink — "← Retour à la connexion" back-navigation link styled for the
 * glass-dark auth surface (white/75 text, no background, ArrowLeft icon).
 * Used standalone above the glass card, or internally by AuthShell via the
 * `backLink` prop.
 */
export const AuthBackLink: React.FC<AuthBackLinkProps> = ({ label, onClick, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      'inline-flex items-center gap-1.5 self-start',
      'bg-transparent border-0 p-0 cursor-pointer',
      'text-body-sm font-medium text-white/75 hover:text-white transition-colors',
      className,
    ].filter(Boolean).join(' ')}
  >
    <ArrowLeft size={14} />
    {label}
  </button>
);

export interface AuthDividerProps {
  children?: React.ReactNode;
}

/** Horizontal "ou continuer avec" divider — tone-adapted for glass dark Card. */
export const AuthDivider: React.FC<AuthDividerProps> = ({
  children = 'ou continuer avec',
}) => (
  <div className="flex items-center gap-3 my-1">
    <span aria-hidden className="h-px flex-1 bg-white/20" />
    <p className="m-0 text-micro text-white/70 uppercase tracking-wider font-semibold whitespace-nowrap">
      {children}
    </p>
    <span aria-hidden className="h-px flex-1 bg-white/20" />
  </div>
);

export interface AuthSocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

/**
 * Social provider button (Google, LinkedIn, etc.) — white card on glass dark.
 * Pass `icon` (provider logo) + label as children.
 */
export const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon,
  children,
  className = '',
  ...rest
}) => (
  <button
    type="button"
    className={[
      'inline-flex items-center justify-center gap-3 h-12 px-4 rounded-xl',
      'bg-white text-ink-900 text-body-sm font-semibold cursor-pointer transition-all',
      'hover:bg-ink-50 hover:-translate-y-px hover:shadow-md',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {icon}
    {children}
  </button>
);

/** Success state (centered) for use inside the glass Card (e.g. password reset email sent). */
export interface AuthSuccessProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

export const AuthSuccess: React.FC<AuthSuccessProps> = ({ icon, title, description, children }) => (
  <div className="flex flex-col items-center text-center gap-4 py-4">
    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 backdrop-blur-glass-light border border-white/25 text-white">
      {icon}
    </span>
    <div className="flex flex-col gap-2">
      <h3 className="font-display text-h3 font-bold text-white m-0">{title}</h3>
      {description && (
        <p className="m-0 text-body-sm text-white/75 leading-relaxed max-w-[44ch]">{description}</p>
      )}
    </div>
    {children && <div className="mt-2 w-full">{children}</div>}
  </div>
);

/**
 * Inline secondary link inside the Card (e.g. "Pas encore de compte? Créer un compte").
 */
export const AuthInlineLink: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = '',
  ...rest
}) => (
  <button
    type="button"
    className={[
      'bg-transparent border-0 p-0 cursor-pointer text-body-sm font-semibold text-white underline-offset-4 hover:underline transition-colors',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {children}
  </button>
);

// ─── Provider icons (shared by Login, Signup) ────────────────────────────────

export const AuthGoogleIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path fill="#EA4335" d="M12 5.04c1.62 0 3.07.56 4.21 1.65l3.15-3.15C17.45 1.74 14.97.79 12 .79 7.32.79 3.26 3.48 1.28 7.41l3.66 2.84C5.94 7.23 8.7 5.04 12 5.04z"/>
    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.28 1.41-1.12 2.61-2.39 3.41l3.59 2.78c2.09-1.93 3.32-4.78 3.32-8.43z"/>
    <path fill="#FBBC05" d="M4.94 14.27c-.22-.66-.34-1.36-.34-2.07s.12-1.41.34-2.07L1.28 7.41C.46 9.05 0 10.99 0 12.2c0 1.21.46 3.15 1.28 4.79l3.66-2.72z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.59-2.78c-1 .67-2.28 1.07-3.84 1.07-3.3 0-6.06-2.19-7.06-5.21l-3.66 2.72C3.26 20.52 7.32 24 12 24z"/>
  </svg>
);

export const AuthLinkedinIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="24" height="24" rx="3" fill="#0A66C2"/>
    <path fill="#fff" d="M7.34 9.67h-2.7V18h2.7V9.67zM5.99 8.5a1.56 1.56 0 1 0 0-3.13 1.56 1.56 0 0 0 0 3.13zM18.66 13.43c0-2.27-1.21-3.93-3.5-3.93-1.39 0-2.21.55-2.66 1.31V9.67H9.81V18h2.69v-4.32c0-1.13.21-2.22 1.61-2.22 1.38 0 1.4 1.29 1.4 2.29V18h2.69v-4.57h.46z"/>
  </svg>
);

export interface AuthFeatureProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}

/** @deprecated AuthFeature was for split-screen aside (legacy). Use plain divs in `aside` prop. */
export const AuthFeature: React.FC<AuthFeatureProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="rounded-lg bg-white/10 border border-white/20 p-4 backdrop-blur-glass-light">
    <h4 className="font-display text-body font-semibold text-white m-0 mb-1.5 inline-flex items-center gap-2">
      {icon}
      {title}
    </h4>
    {description && <p className="m-0 text-body-sm text-white/75 leading-relaxed">{description}</p>}
  </div>
);

// ─── Form sub-components (high-level — to use inside AuthShell.form) ────────

export interface AuthFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  /** Field label rendered above the input. */
  label: React.ReactNode;
  /** Optional leading icon (e.g. <Mail size={18} />). */
  icon?: React.ReactNode;
  /** Optional error message rendered below the input (red on dark). */
  error?: React.ReactNode;
  /** Optional trailing slot (e.g. show-password button). */
  trailing?: React.ReactNode;
  /** Controlled change handler — receives the raw event. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * AuthField — thin wrapper over <Input surface="glass"> for auth forms.
 * Maps icon → leadingIcon and trailing → trailingIcon.
 */
export const AuthField: React.FC<AuthFieldProps> = ({
  label,
  icon,
  error,
  trailing,
  className = '',
  ...rest
}) => (
  <Input
    surface="glass"
    size="lg"
    label={label}
    error={error}
    leadingIcon={icon}
    trailingIcon={trailing}
    className={className}
    {...rest}
  />
);

export interface AuthPasswordFieldProps extends Omit<AuthFieldProps, 'type' | 'icon' | 'trailing'> {
  /** Show Lock icon by default. Pass `false` to hide. */
  showLockIcon?: boolean;
}

/**
 * AuthPasswordField — password input with show/hide eye toggle.
 * Encapsulates the show/hide state so consumers don't need to manage it.
 */
export const AuthPasswordField: React.FC<AuthPasswordFieldProps> = ({
  showLockIcon = true,
  label = 'Mot de passe',
  placeholder = 'Votre mot de passe',
  ...rest
}) => {
  const [show, setShow] = useState(false);
  return (
    <AuthField
      label={label}
      placeholder={placeholder}
      type={show ? 'text' : 'password'}
      icon={showLockIcon ? <Lock size={18} /> : undefined}
      trailing={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          className="bg-transparent border-0 p-1 cursor-pointer text-white/60 hover:text-white transition-colors inline-flex items-center justify-center"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
      {...rest}
    />
  );
};

/**
 * AuthPrimaryButton — white-on-dark inverse CTA used as the main action button.
 * Renders an unstyled native <button> (so it works inside <form>) with the proper
 * white-on-dark utilities + 48px height for touch accessibility.
 */
export const AuthPrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = '',
  ...rest
}) => (
  <button
    className={[
      'inline-flex items-center justify-center gap-2 w-full h-12 px-4 rounded-xl',
      'bg-white text-ink-900 text-body font-semibold cursor-pointer transition-all',
      'shadow-md hover:bg-ink-50 hover:-translate-y-px hover:shadow-lg',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {children}
  </button>
);

/**
 * AuthGhostButton — outlined white-border button on dark for secondary actions
 * (e.g. "Retour connexion" next to a primary CTA).
 */
export const AuthGhostButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = '',
  ...rest
}) => (
  <button
    type="button"
    className={[
      'inline-flex items-center justify-center gap-2 w-full h-12 px-4 rounded-xl',
      'bg-transparent text-white border border-white/30 text-body font-semibold cursor-pointer transition-all',
      'hover:bg-white/10 hover:border-white/50 hover:-translate-y-px',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {children}
  </button>
);

export interface AuthCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Label can be a string or ReactNode (e.g. "I accept the <a>terms</a>"). */
  label: React.ReactNode;
  /** Required state (passed to underlying input). */
  required?: boolean;
  className?: string;
}

/**
 * AuthCheckbox — accessible glass-dark checkbox using the peer/sr-only pattern.
 * The visible ✓ check mark uses `after:content-['✓']` instead of an SVG.
 */
export const AuthCheckbox: React.FC<AuthCheckboxProps> = ({
  checked,
  onChange,
  label,
  required,
  className = '',
}) => (
  <label
    className={[
      'relative inline-flex items-start gap-2 cursor-pointer',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <input
      type="checkbox"
      className="peer sr-only"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      required={required}
    />
    <span
      aria-hidden
      className="mt-0.5 inline-flex items-center justify-center w-5 h-5 shrink-0 rounded-sm border-2 border-white/40 bg-white/10 transition-all peer-checked:bg-white peer-checked:border-white after:content-['✓'] after:text-primary-700 after:font-bold after:text-[13px] after:opacity-0 peer-checked:after:opacity-100"
    />
    <span className="text-body-sm text-white/85 leading-snug">{label}</span>
  </label>
);

export default AuthShell;
