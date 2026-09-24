import React from 'react';

/**
 * Input — Self-contained form field component (Tailwind v4)
 *
 * Includes everything needed for a form field:
 * - Label (with optional required indicator)
 * - Control (input/textarea with optional icons)
 * - Helper text or error message
 *
 * Sizes: sm/md/lg
 * Status: default/success/error
 * Surface: light (default, white bg) | glass (dark glass surface — auth, overlays)
 * Features: Leading/trailing icons, multiline, disabled, required
 */

export type InputSize = 'sm' | 'md' | 'lg';
export type InputStatus = 'default' | 'success' | 'error';
export type InputSurface = 'light' | 'glass';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  size?: InputSize;
  status?: InputStatus;
  /** `light` (default) = white bg on light surfaces. `glass` = dark translucent bg for auth/overlays. */
  surface?: InputSurface;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}

const FIELD_BASE = 'flex flex-col gap-stack-xs font-body';

const CONTROL_BASE =
  'flex items-center gap-stack-xs w-full border font-body transition-[border-color,box-shadow] duration-base ease-standard';

/* R4 — LA FAMILLE CHAMP PREND L'ÉCHELLE, À 14 px (tranché le 2026-09-14).
   ────────────────────────────────────────────────────────────────────────
   R3 a posé la règle du seuil : sous 28 px de haut la pilule, au-dessus
   l'échelle. Un champ fait 36 · 44 · 52 px — il est TOUJOURS au-dessus, donc
   son rayon est une déclaration, pas un accident de plafonnement. Restait à
   dire quel cran. Ce fichier disait `rounded-md` (10) sans l'avoir jamais
   justifié ; la mesure a tranché contre lui.

   Ce qui a été mesuré au navigateur, et qui décide :
   · /website/contact — les quatre champs à 10 px et le bouton « Envoyer le
     message » à 14 px font EXACTEMENT la même hauteur (48 px) et se suivent
     dans le même formulaire. Deux courbes pour des objets jumeaux.
   · La Card qui porte les formulaires est à 14 px (R1), le Button à 14 (R3).
     10 px était donc un troisième cran, sans raison, pour la même taille.
   · Aucune raison ne se vérifie côté champ : deux textarea quasi identiques
     rendaient 156 px à 10 (contact) contre 158 px à 14 (pré-questionnaire).
     Ni la hauteur, ni le contexte éditorial, ni le voisinage n'expliquaient
     la répartition — c'était de la dérive.
   · Le terrain fait main votait déjà 14 : 30 champs contre 15.

   Vérifié aux trois tailles avant de trancher : à 36 px de haut — la plus
   petite — le ratio rayon/hauteur reste à 0,39, loin des 0,5 de la pilule.
   Le champ reste un rectangle, il ne devient pas une gélule.

   Les contrôles à forme propre ne sont PAS concernés : la case à cocher garde
   `rounded-sm`, le radio son cercle, le switch sa pilule, le slider la sienne.
   La bulle de chat (`JournalChatCompose`, `rounded-2xl` + queue) non plus —
   c'est un pattern speech-bubble, pas un champ.

   Le rayon vit HORS de CONTROL_BASE, comme dans `Button.tsx`, et pour la même
   raison : deux classes de rayon dans la même liste ont la même spécificité
   (0,1,0), donc c'est l'ordre d'émission de Tailwind qui trancherait, pas
   l'ordre du `className` — piège n°6 de .claude/rules/pieges-tailwind.md. Une seule par appel. */
const RAYON = 'rounded-lg';

// Light surface (default)
const CONTROL_LIGHT = 'bg-white text-ink-900';

const STATUS_CLASSES: Record<InputStatus, string> = {
  // Filet à ink-400 — arbitrage n°7 du 2026-09-23 : 3,01:1 sur blanc (WCAG 1.4.11
  // exige 3:1), 2,68:1 sur carte teintée (sous le seuil, choix assumé). ink-300
  // mesurait 1,47:1 : un champ blanc sur fond blanc n'existait pas.
  default: 'border-ink-400 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20',
  success: 'border-success-base focus-within:ring-2 focus-within:ring-success-base/35',
  error: 'border-danger-base focus-within:ring-2 focus-within:ring-danger-base/35',
};

const DISABLED_LIGHT = 'bg-ink-50 text-ink-500 cursor-not-allowed hover:border-ink-300';

// Glass surface — for dark backgrounds (auth shell, modals on dark)
const CONTROL_GLASS =
  'bg-white/15 backdrop-blur-glass-medium text-white ' +
  'border-white/25 hover:border-white/35 ' +
  'focus-within:border-white/50 focus-within:ring-2 focus-within:ring-white/20';

const DISABLED_GLASS = 'bg-white/8 text-white/40 cursor-not-allowed hover:border-white/20';

const SIZE_CLASSES: Record<InputSize, string> = {
  sm: 'h-9 px-3 text-caption',
  md: 'h-touch px-3.5 text-body',
  lg: 'h-13 px-4 text-body',
};

const TEXTAREA_EXTRA = 'min-h-24 py-3 items-start';

const NATIVE_FIELD_LIGHT =
  'flex-1 bg-transparent outline-none border-0 shadow-none p-0 min-w-0 font-body text-inherit placeholder:text-ink-500 disabled:cursor-not-allowed focus:outline-none focus:shadow-none focus:bg-transparent focus-visible:outline-none [appearance:textfield]';

const NATIVE_FIELD_GLASS =
  'flex-1 bg-transparent outline-none border-0 shadow-none p-0 min-w-0 font-body text-inherit placeholder:text-white/50 disabled:cursor-not-allowed focus:outline-none focus:shadow-none focus:bg-transparent focus-visible:outline-none [appearance:textfield]';

export const Input: React.FC<InputProps> = ({
  label,
  hint,
  error,
  required,
  id,
  size = 'md',
  status = 'default',
  surface = 'light',
  leadingIcon,
  trailingIcon,
  multiline = false,
  rows = 4,
  disabled,
  className = '',
  ...rest
}) => {
  const fieldId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const isGlass = surface === 'glass';

  const containerClasses = [FIELD_BASE, className].filter(Boolean).join(' ');

  const controlClasses = [
    CONTROL_BASE,
    RAYON,
    SIZE_CLASSES[size],
    isGlass ? CONTROL_GLASS : CONTROL_LIGHT,
    !isGlass && STATUS_CLASSES[status],
    multiline && TEXTAREA_EXTRA,
    multiline && 'h-auto',
    disabled && (isGlass ? DISABLED_GLASS : DISABLED_LIGHT),
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = isGlass
    ? 'text-body font-semibold text-white'
    : 'text-body font-semibold text-ink-900';

  const nativeFieldClasses = isGlass ? NATIVE_FIELD_GLASS : NATIVE_FIELD_LIGHT;

  const iconClasses = isGlass
    ? 'inline-flex items-center justify-center shrink-0 text-white/60 text-base'
    : 'inline-flex items-center justify-center shrink-0 text-ink-500 text-base';

  const hintClasses = isGlass ? 'text-caption text-white/60' : 'text-caption text-ink-500';
  const errorClasses = isGlass
    ? 'text-caption text-danger-base flex items-center gap-tight'
    : 'text-caption text-danger-fg flex items-center gap-tight';

  return (
    <div className={containerClasses}>
      {label && (
        <label className={labelClasses} htmlFor={fieldId}>
          {label}
          {required && (
            <span className={isGlass ? 'text-danger-base ml-0.5' : 'text-danger-fg ml-0.5'} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className={controlClasses}>
        {leadingIcon && (
          <span className={iconClasses}>{leadingIcon}</span>
        )}

        {multiline ? (
          <textarea
            id={fieldId}
            rows={rows}
            disabled={disabled}
            aria-invalid={status === 'error' || undefined}
            aria-describedby={error || hint ? `${fieldId}-message` : undefined}
            className={`${nativeFieldClasses} resize-y`}
            {...(rest as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={fieldId}
            disabled={disabled}
            aria-invalid={status === 'error' || undefined}
            aria-describedby={error || hint ? `${fieldId}-message` : undefined}
            className={nativeFieldClasses}
            {...rest}
          />
        )}

        {trailingIcon && (
          <span className={iconClasses}>{trailingIcon}</span>
        )}
      </div>

      {(error || hint) && (
        <p
          id={`${fieldId}-message`}
          className={error ? errorClasses : hintClasses}
          role={error ? 'alert' : undefined}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
};

// ============================================================================
// CHECKBOX
// ============================================================================

const TOGGLE_LABEL =
  'relative inline-flex items-center gap-stack-xs cursor-pointer font-body text-body text-ink-900 select-none';

const CHECKBOX_BOX =
  "inline-flex items-center justify-center w-5 h-5 shrink-0 bg-white border-2 border-ink-400 rounded-sm transition-colors " +
  "peer-checked:bg-primary-700 peer-checked:border-primary-700 " +
  "peer-indeterminate:bg-primary-700 peer-indeterminate:border-primary-700 " +
  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-500 " +
  "peer-disabled:bg-ink-50 peer-disabled:border-ink-200 peer-disabled:cursor-not-allowed " +
  "after:content-[''] after:text-white after:font-bold after:text-[12px] after:leading-none after:opacity-0 " +
  "peer-checked:after:content-['✓'] peer-checked:after:opacity-100 " +
  "peer-indeterminate:after:content-['−'] peer-indeterminate:after:opacity-100";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  indeterminate?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  indeterminate,
  className = '',
  ...rest
}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const fieldId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  return (
    <label className={[TOGGLE_LABEL, className].filter(Boolean).join(' ')}>
      <input ref={ref} id={fieldId} type="checkbox" className="peer sr-only" {...rest} />
      <span aria-hidden="true" className={CHECKBOX_BOX} />
      {label && <span>{label}</span>}
    </label>
  );
};

// ============================================================================
// RADIO
// ============================================================================

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
}

const RADIO_BOX =
  "inline-flex items-center justify-center w-5 h-5 shrink-0 bg-white border-2 border-ink-400 rounded-pill transition-colors " +
  "peer-checked:border-primary-700 " +
  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-500 " +
  "peer-disabled:bg-ink-50 peer-disabled:border-ink-200 peer-disabled:cursor-not-allowed " +
  "after:content-[''] after:w-2 after:h-2 after:rounded-pill after:bg-primary-700 after:opacity-0 " +
  "peer-checked:after:opacity-100";

export const Radio: React.FC<RadioProps> = ({
  label,
  id,
  className = '',
  ...rest
}) => {
  const fieldId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label className={[TOGGLE_LABEL, className].filter(Boolean).join(' ')}>
      <input id={fieldId} type="radio" className="peer sr-only" {...rest} />
      <span aria-hidden="true" className={RADIO_BOX} />
      {label && <span>{label}</span>}
    </label>
  );
};

// ============================================================================
// SWITCH / TOGGLE
// ============================================================================

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
}

/* Interrupteur façon Material 3 (arbitrage n°9, 2026-09-23). Éteint, le rail
   n'est PAS rempli : quasi blanc, cerné d'un filet 2 px ink-400 (3:1 sur blanc,
   WCAG 1.4.11), avec un petit rond gris. Allumé, le rail se remplit au cran 700
   (5,02:1 — le 500 d'avant ne faisait que 2,94) et le rond grossit en blanc.
   Le rail plein ink-400 d'avant se lisait comme une masse sombre. Coches et
   radios suivent : leur état coché est au cran 700 pour la même raison. */
const SWITCH_TRACK =
  "relative inline-block w-11 h-6 rounded-pill bg-ink-50 border-2 border-ink-400 shrink-0 transition-colors " +
  "peer-checked:bg-primary-700 peer-checked:border-primary-700 " +
  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-500 " +
  "peer-disabled:bg-ink-50 peer-disabled:border-ink-200 peer-disabled:cursor-not-allowed peer-disabled:after:bg-ink-200 " +
  "after:content-[''] after:absolute after:top-1 after:left-1 after:w-3 after:h-3 after:rounded-pill after:bg-ink-500 after:transition-all " +
  "peer-checked:after:top-0.5 peer-checked:after:left-0.5 peer-checked:after:w-4 peer-checked:after:h-4 peer-checked:after:bg-white peer-checked:after:translate-x-5";

export const Switch: React.FC<SwitchProps> = ({
  label,
  id,
  className = '',
  ...rest
}) => {
  const fieldId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label className={[TOGGLE_LABEL, className].filter(Boolean).join(' ')}>
      <input
        id={fieldId}
        type="checkbox"
        role="switch"
        className="peer sr-only"
        {...rest}
      />
      <span aria-hidden="true" className={SWITCH_TRACK} />
      {label && <span>{label}</span>}
    </label>
  );
};

export default Input;
