/**
 * FormLayout — Design System Pattern
 *
 * Structured form wrapper with consistent label/input/error layout.
 * Provides visual hierarchy, accessibility, and spacing consistency.
 *
 * Usage:
 *   <FormLayout
 *     title="Create Account"
 *     description="Enter your details below"
 *     sections={[
 *       {
 *         title: "Personal Info",
 *         fields: [
 *           {
 *             name: "name",
 *             label: "Full Name",
 *             required: true,
 *             input: <input type="text" />
 *           }
 *         ]
 *       }
 *     ]}
 *     onSubmit={() => console.log('submitted')}
 *   />
 */

import React from 'react';
import { Button } from '../core/Button';
import './FormLayout.css';

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
    <form className={`form-layout ${className}`}>
      {/* Header */}
      {(title || description) && (
        <div className="form-layout__header">
          {title && <h2 className="form-layout__title">{title}</h2>}
          {description && <p className="form-layout__description">{description}</p>}
        </div>
      )}

      {/* Sections */}
      <div className="form-layout__content">
        {sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="form-layout__section">
            {section.title && (
              <h3 className="form-layout__section-title">{section.title}</h3>
            )}

            {/* Fields */}
            <div className="form-layout__fields">
              {section.fields.map((field) => (
                <div key={field.name} className="form-layout__field">
                  <label htmlFor={field.name} className="form-layout__label">
                    {field.label}
                    {field.required && <span className="form-layout__required">*</span>}
                  </label>

                  {/* Input wrapper */}
                  <div className="form-layout__input-wrapper">
                    {field.input}
                  </div>

                  {/* Help text or error */}
                  {field.error && (
                    <p className="form-layout__error">{field.error}</p>
                  )}
                  {field.helpText && !field.error && (
                    <p className="form-layout__help-text">{field.helpText}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer actions */}
      {(onSubmit || onCancel) && (
        <div className="form-layout__footer">
          <div className="form-layout__actions">
            {onCancel && (
              <Button
                variant="secondary"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                {cancelLabel}
              </Button>
            )}
            {onSubmit && (
              <Button
                variant="primary"
                onClick={onSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : submitLabel}
              </Button>
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default FormLayout;
