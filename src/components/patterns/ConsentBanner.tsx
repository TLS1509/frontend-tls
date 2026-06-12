import React, { useState } from 'react';
import { Cookie, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../core/Button';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ConsentCategory {
  id: string;
  label: string;
  description: string;
  required?: boolean;
  defaultEnabled?: boolean;
}

export interface ConsentBannerProps {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCustomize?: (categories: Record<string, boolean>) => void;
  categories?: ConsentCategory[];
  companyName?: string;
  className?: string;
}

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_CATEGORIES: ConsentCategory[] = [
  {
    id: 'necessary',
    label: 'Cookies nécessaires',
    description: 'Indispensables au fonctionnement de la plateforme (session, authentification, préférences).',
    required: true,
    defaultEnabled: true,
  },
  {
    id: 'analytics',
    label: 'Cookies analytiques',
    description: 'Nous aident à comprendre comment vous utilisez la plateforme pour l\'améliorer.',
    required: false,
    defaultEnabled: false,
  },
  {
    id: 'marketing',
    label: 'Cookies marketing',
    description: 'Utilisés pour personnaliser les contenus et les communications selon vos intérêts.',
    required: false,
    defaultEnabled: false,
  },
];

// ─── Toggle Component ─────────────────────────────────────────────────────────

const Toggle: React.FC<{
  checked: boolean;
  disabled?: boolean;
  onChange: (val: boolean) => void;
  label: string;
}> = ({ checked, disabled = false, onChange, label }) => (
  <label className="relative inline-flex items-center cursor-pointer shrink-0">
    <input
      type="checkbox"
      className="peer sr-only"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      aria-label={label}
    />
    <span
      aria-hidden
      className={[
        'w-9 h-5 rounded-pill transition-colors duration-base',
        'after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px]',
        'after:w-4 after:h-4 after:rounded-full after:bg-white after:shadow-sm',
        'after:transition-transform after:duration-base',
        'peer-checked:after:translate-x-4',
        disabled
          ? 'bg-ink-200 cursor-not-allowed'
          : checked
            ? 'bg-primary-600'
            : 'bg-ink-300',
      ].filter(Boolean).join(' ')}
    />
  </label>
);

// ─── ConsentBanner ───────────────────────────────────────────────────────────

export const ConsentBanner: React.FC<ConsentBannerProps> = ({
  onAcceptAll,
  onRejectAll,
  onCustomize,
  categories = DEFAULT_CATEGORIES,
  companyName = 'The Learning Society',
  className = '',
}) => {
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(categories.map((c) => [c.id, c.defaultEnabled ?? false]))
  );

  const handleToggle = (id: string, val: boolean) => {
    setPrefs((prev) => ({ ...prev, [id]: val }));
  };

  const handleSaveCustom = () => {
    onCustomize?.(prefs);
  };

  return (
    <div
      role="dialog"
      aria-label="Paramètres de confidentialité"
      aria-modal="false"
      className={[
        'fixed bottom-0 left-0 right-0 z-toast',
        'bg-white/95 backdrop-blur-glass-medium',
        'border-t border-ink-100 shadow-lg',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="max-w-wide mx-auto px-4 md:px-8 py-stack">

        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-center gap-stack">
          {/* Icon + text */}
          <div className="flex items-start gap-stack-xs flex-1 min-w-0">
            <Cookie className="shrink-0 mt-0.5 text-primary-500" size={18} />
            <div className="flex flex-col gap-tight">
              <p className="text-body-sm font-semibold text-ink-900">
                {companyName} respecte votre vie privée
              </p>
              <p className="text-body-sm text-ink-600">
                Nous utilisons des cookies pour améliorer votre expérience, analyser notre trafic et personnaliser les contenus.{' '}
                <button
                  onClick={() => setShowCustomize((v) => !v)}
                  className="text-primary-600 underline underline-offset-2 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xs"
                >
                  En savoir plus
                </button>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCustomize((v) => !v)}
              trailingIcon={showCustomize ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            >
              Personnaliser
            </Button>
            <Button variant="secondary" size="sm" onClick={onRejectAll}>
              Tout refuser
            </Button>
            <Button variant="primary" size="sm" onClick={onAcceptAll}>
              Tout accepter
            </Button>
          </div>
        </div>

        {/* Customize panel */}
        {showCustomize && (
          <div className="mt-stack pt-stack border-t border-ink-100 flex flex-col gap-stack-xs">
            <p className="text-caption text-ink-500 font-medium uppercase tracking-wide">
              Gérer mes préférences
            </p>
            <div className="flex flex-col gap-stack-xs">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-start gap-stack-xs">
                  <Toggle
                    checked={prefs[cat.id] ?? false}
                    disabled={cat.required}
                    onChange={(val) => handleToggle(cat.id, val)}
                    label={cat.label}
                  />
                  <div className="flex flex-col gap-tight flex-1">
                    <span className="text-body-sm font-semibold text-ink-900 leading-tight">
                      {cat.label}
                      {cat.required && (
                        <span className="ml-1 text-micro text-ink-400 font-normal">(obligatoire)</span>
                      )}
                    </span>
                    <span className="text-caption text-ink-500">{cat.description}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-2">
              <Button variant="primary" size="sm" onClick={handleSaveCustom}>
                Enregistrer mes préférences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsentBanner;
