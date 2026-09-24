/**
 * SettingsRow / SettingsToggleRow — canonical settings-list row primitives.
 *
 * Replaces 4 near-duplicate reimplementations found across Settings.tsx
 * (ToggleRow), Account.tsx (SettingRow), NotificationPreferences.tsx
 * (SwitchRow), and inline divs in ProfilePrivacy/ProfileConsent.
 *
 * - `SettingsRow`: generic row (optional icon bubble + label + description +
 *   arbitrary trailing content — Button, Select, Badge, etc.)
 * - `SettingsToggleRow`: specialized row for a single boolean preference,
 *   trailing a `Switch`, with an optional "Requis" badge for non-disableable
 *   consents.
 */

import React from 'react';
import { Switch } from '../core/Input';
import { Badge } from '../ui/Badge';
import { IconChip } from '../ui/IconChip';

export interface SettingsRowProps {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  children?: React.ReactNode;
  danger?: boolean;
}

/* Anatomie de rangée (passe typographique du 2026-09-24) — la même pour les
   deux rangées de réglage : libellé 16/600 ink-900, description 16/400 ink-700
   à 4 px, rangée de 58 px au moins (16 + 26 + 16). La description était en
   légende (13) : c'est pourtant le texte qui dit ce que le réglage change, donc
   du texte qu'on lit. Avec une pastille (40 px), le texte descend de 6 px pour
   que sa première ligne tombe sur le centre de la pastille (6 + 13 = 19).

   Le contrôle passe SOUS le texte quand la place manque (2026-09-24). À 375 px,
   « Langue de l'interface » n'avait que 45 px à côté d'un Select de 180 : un mot
   par ligne, et sept lignes de description ailleurs. Le texte et le contrôle
   forment une rangée qui se replie : le texte réclame 12rem (192 px) à côté du
   contrôle, sinon celui-ci descend de 12 px, dans la colonne du texte — la
   pastille reste la marque de la rangée. La règle mesure la place réelle, pas
   la fenêtre, et suit la largeur du contrôle (un Select de 180 descend plus
   tôt qu'un bouton de 110). Au-dessus du seuil, rien ne change : le contrôle
   reste à droite, centré sur le texte. */
export const SettingsRow: React.FC<SettingsRowProps> = ({ icon, label, description, children, danger }) => (
  <div className="flex items-start gap-stack-sm py-stack first:pt-0 last:pb-0">
    {icon && (
      <IconChip size="md" tone={danger ? 'danger' : 'neutral'}>
        {icon}
      </IconChip>
    )}
    <div className="flex-1 min-w-0 flex flex-wrap items-center justify-between gap-x-stack gap-y-stack-sm">
      <div className={['grow basis-48 min-w-0', icon ? 'pt-stack-2xs' : ''].join(' ')}>
        <p className={`m-0 font-body text-body font-semibold ${danger ? 'text-danger-fg' : 'text-ink-900'}`}>
          {label}
        </p>
        {description && (
          <p className="m-0 mt-stack-3xs font-body text-body text-ink-700 max-w-prose">
            {description}
          </p>
        )}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  </div>
);

export interface SettingsToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

export const SettingsToggleRow: React.FC<SettingsToggleRowProps> = ({
  label,
  description,
  checked,
  onChange,
  required,
  disabled,
  id,
}) => (
  <div className="flex items-start justify-between gap-stack py-stack first:pt-0 last:pb-0">
    <div className="flex flex-col gap-stack-3xs flex-1 min-w-0">
      <div className="flex items-center gap-stack-xs">
        <span className="text-body font-semibold text-ink-900">{label}</span>
        {required && <Badge variant="info" size="compact">Requis</Badge>}
      </div>
      {description && <span className="text-body text-ink-700 max-w-prose">{description}</span>}
    </div>
    {/* Rail de 24 px à 2 px du haut : son centre (14) tombe sur celui de la
        première ligne (13). */}
    <Switch
      id={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled ?? required}
      className="shrink-0 mt-tight"
      aria-label={label}
    />
  </div>
);

export default SettingsRow;
