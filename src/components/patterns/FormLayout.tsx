import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '../core/Button';

export interface FormField {
  name: string;
  label: string;
  helpText?: string;
  error?: string;
  required?: boolean;
  input: React.ReactNode;
}

export interface FormSection {
  title?: string;
  fields: FormField[];
}

export interface FormLayoutProps {
  title?: string;
  description?: string;
  sections: FormSection[];
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  className?: string;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  description,
  sections,
  submitLabel = 'Enregistrer',
  cancelLabel = 'Annuler',
  onSubmit,
  onCancel,
  isSubmitting = false,
  className = '',
}) => {
  return (
    <form
      className={[
        // Conteneur : rayon 20 et padding 24, le canon de la carte (rayons
        // étagés, arbitrage n°4) — il portait le 14 d'un bouton et 32 de padding.
        'flex flex-col gap-section bg-white border border-ink-200 rounded-xl p-stack-lg',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {(title || description) && (
        <div className="flex flex-col gap-stack-xs pb-stack-lg border-b border-ink-200">
          {title && <h2 className="text-h2 font-display text-ink-900 text-balance">{title}</h2>}
          {description && <p className="text-body text-ink-700 max-w-prose">{description}</p>}
        </div>
      )}

      <div className="flex flex-col gap-section">
        {sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="flex flex-col gap-stack">
            {section.title && (
              <h3 className="text-h3 font-display text-ink-900 pb-stack-xs border-b border-ink-100">
                {section.title}
              </h3>
            )}

            <div className="flex flex-col gap-stack">
              {section.fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-stack-xs">
                  <label
                    htmlFor={field.name}
                    className="inline-flex items-center text-body font-semibold text-ink-900"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-danger-fg ml-0.5" aria-label="Champ obligatoire">
                        *
                      </span>
                    )}
                  </label>

                  <div>{field.input}</div>

                  {/* Erreur : 13 / 400 en danger-fg, icône Lucide de 14 alignée sur
                      la ligne (le glyphe texte ⚠ suivait la police). Aide : 13 /
                      400, ink-600. */}
                  {field.error && (
                    <p className="inline-flex items-center gap-stack-3xs text-caption text-danger-fg">
                      <AlertCircle size={14} aria-hidden="true" className="shrink-0" />
                      {field.error}
                    </p>
                  )}
                  {field.helpText && !field.error && (
                    <p className="text-caption text-ink-600">{field.helpText}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {(onSubmit || onCancel) && (
        <div className="flex justify-end gap-stack-xs pt-stack-lg border-t border-ink-200">
          {onCancel && (
            <Button emphasis="soft" tone="warm" onClick={onCancel} disabled={isSubmitting}>
              {cancelLabel}
            </Button>
          )}
          {onSubmit && (
            <Button emphasis="soft" onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Envoi…' : submitLabel}
            </Button>
          )}
        </div>
      )}
    </form>
  );
};

export default FormLayout;
