import React from 'react';
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
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onSubmit,
  onCancel,
  isSubmitting = false,
  className = '',
}) => {
  return (
    <form
      className={['flex flex-col gap-8 bg-white border border-ink-200 rounded-2xl p-8', className]
        .filter(Boolean)
        .join(' ')}
    >
      {(title || description) && (
        <div className="flex flex-col gap-2 pb-6 border-b border-ink-200">
          {title && <h2 className="m-0 text-h2 font-display font-bold text-ink-900">{title}</h2>}
          {description && <p className="m-0 text-body text-ink-500">{description}</p>}
        </div>
      )}

      <div className="flex flex-col gap-8">
        {sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="flex flex-col gap-4">
            {section.title && (
              <h3 className="m-0 text-h4 font-display font-semibold text-ink-900">
                {section.title}
              </h3>
            )}

            <div className="flex flex-col gap-4">
              {section.fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label
                    htmlFor={field.name}
                    className="text-body-sm font-medium text-ink-900"
                  >
                    {field.label}
                    {field.required && <span className="text-danger-base ml-1">*</span>}
                  </label>

                  <div>{field.input}</div>

                  {field.error && (
                    <p className="m-0 text-caption text-danger-fg">{field.error}</p>
                  )}
                  {field.helpText && !field.error && (
                    <p className="m-0 text-caption text-ink-500">{field.helpText}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {(onSubmit || onCancel) && (
        <div className="flex justify-end gap-3 pt-6 border-t border-ink-200">
          {onCancel && (
            <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
              {cancelLabel}
            </Button>
          )}
          {onSubmit && (
            <Button variant="primary" onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : submitLabel}
            </Button>
          )}
        </div>
      )}
    </form>
  );
};

export default FormLayout;
