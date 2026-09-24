import React, { useState } from 'react';
import { Cookie, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../core/Button';
import { Switch } from '../core/Input';

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

/* L'interrupteur du système (arbitrage n°9, Material 3). Celui-ci était fait
   main : rail ink-300 sans filet (1,5:1 contre la page), allumé en primary-600,
   et sans role="switch". Le nom accessible passe par aria-label : la catégorie
   est déjà écrite à côté. */
const Toggle: React.FC<{
  checked: boolean;
  disabled?: boolean;
  onChange: (val: boolean) => void;
  label: string;
}> = ({ checked, disabled = false, onChange, label }) => (
  <Switch
    checked={checked}
    disabled={disabled}
    onChange={(e) => onChange(e.target.checked)}
    aria-label={label}
    className="shrink-0"
  />
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
              <p className="text-body font-semibold text-ink-900">
                {companyName} respecte votre vie privée
              </p>
              <p className="text-body text-ink-600">
                Nous utilisons des cookies pour améliorer votre expérience, analyser notre trafic et personnaliser les contenus.{' '}
                <button
                  onClick={() => setShowCustomize((v) => !v)}
                  className="text-primary-700 underline underline-offset-2 hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xs"
                >
                  En savoir plus
                </button>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs shrink-0">
            <Button
              emphasis="outline"
              size="sm"
              onClick={() => setShowCustomize((v) => !v)}
              trailingIcon={showCustomize ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            >
              Personnaliser
            </Button>
            <Button emphasis="soft" tone="warm" size="sm" onClick={onRejectAll}>
              Tout refuser
            </Button>
            <Button emphasis="soft" size="sm" onClick={onAcceptAll}>
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
                    <span className="text-body font-semibold text-ink-900">
                      {cat.label}
                      {cat.required && (
                        <span className="ml-1 text-micro text-ink-600 font-normal">(obligatoire)</span>
                      )}
                    </span>
                    <span className="text-caption text-ink-500">{cat.description}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-2">
              <Button emphasis="soft" size="sm" onClick={handleSaveCustom}>
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
