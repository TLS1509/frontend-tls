import React from 'react';
import { HelpCircle, Send, X } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import { FormGroup } from '../components/core/FormGroup';

const CATEGORY_OPTIONS = [
  { value: '',           label: 'Choisir une catégorie…', disabled: true },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'parcours',   label: 'Parcours' },
  { value: 'coaching',   label: 'Coaching' },
  { value: 'compte',     label: 'Compte' },
  { value: 'autre',      label: 'Autre' },
];

export default function HelpTicketNew() {
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Nouveau ticket' }}
        title="Contacter le support"
        summary="Notre équipe répond généralement dans un délai de 24 h ouvrées."
        tone="default"
      />

      <div className="max-w-content mx-auto w-full px-4 pb-page">
        <Card>
          <div className="flex flex-col gap-stack-lg">
            <h2 className="font-display font-semibold text-h3 text-ink-900 m-0">
              Nouvelle demande de support
            </h2>

            <div className="flex flex-col gap-stack">
              <FormGroup label="Catégorie" required>
                <Select
                  options={CATEGORY_OPTIONS}
                  defaultValue=""
                  placeholder="Choisir une catégorie…"
                />
              </FormGroup>

              <FormGroup label="Objet" required>
                <Input
                  placeholder="Résumez votre problème en une ligne…"
                />
              </FormGroup>

              <FormGroup label="Description détaillée" required>
                <Input
                  multiline
                  rows={6}
                  placeholder="Décrivez votre problème en détail : contexte, étapes pour le reproduire, messages d'erreur éventuels…"
                />
              </FormGroup>
            </div>

            <div className="flex flex-wrap gap-stack-xs">
              <Button variant="primary" leadingIcon={<Send size={16} />}>
                Envoyer la demande
              </Button>
              <Button variant="ghost" leadingIcon={<X size={16} />}>
                Annuler
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
