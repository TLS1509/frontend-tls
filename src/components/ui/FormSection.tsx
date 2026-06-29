import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FormSectionProps {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  titleIcon?: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  collapsible = false,
  defaultExpanded = true,
  titleIcon,
  className = '',
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const sectionId = `formsection-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section
      className={['flex flex-col gap-stack font-body', className].filter(Boolean).join(' ')}
    >
      {/* Header */}
      <div className="flex flex-col gap-tight pb-stack border-b border-ink-100">
        <div className="flex items-center justify-between gap-stack-xs">
          <div className="flex items-center gap-2.5">
            {titleIcon && (
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-50 text-primary-600 shrink-0">
                {titleIcon}
              </span>
            )}
            <h3 className="text-h4 font-display font-semibold text-ink-900 m-0">
              {title}
            </h3>
          </div>

          {collapsible && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={sectionId}
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-ink-500 hover:bg-ink-50 hover:text-ink-700 transition-colors duration-base shrink-0"
              aria-label={expanded ? 'Réduire la section' : 'Développer la section'}
            >
              <ChevronDown
                size={18}
                className={[
                  'transition-transform duration-base ease-standard',
                  expanded ? 'rotate-180' : 'rotate-0',
                ].join(' ')}
              />
            </button>
          )}
        </div>

        {description && (
          <p className="text-body-sm text-ink-500 leading-relaxed m-0">
            {description}
          </p>
        )}
      </div>

      {/* Content */}
      <div
        id={sectionId}
        className={[
          'flex flex-col gap-stack overflow-hidden transition-all duration-slow ease-emphasis',
          collapsible && !expanded ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-[9999px] opacity-100',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={collapsible ? !expanded : undefined}
      >
        {children}
      </div>
    </section>
  );
};

export default FormSection;
