import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Send, X } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import { FormGroup } from '../components/core/FormGroup';
import { useHelpcenterStore } from '../stores/persistence';
import { PageShell } from '../components/layout';

const MOCK_USER_ID = 'user-demo';

const PRIORITY_OPTIONS = [
  { value: '', label: 'Choisir une priorité…', disabled: true },
  { value: 'low',    label: 'Faible' },
  { value: 'medium', label: 'Normale' },
  { value: 'high',   label: 'Haute' },
];

export default function HelpTicketNew() {
  const navigate = useNavigate();
  const store = useHelpcenterStore();

  // Seed via getTutorials call
  store.getTutorials();

  const [categoryId, setCategoryId] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const categoryOptions = [
    { value: '', label: 'Choisir une catégorie…', disabled: true },
    ...(store.categories.map((c) => ({ value: c.id, label: c.name }))),
  ];

  const handleSubmit = () => {
    if (!subject.trim() || !description.trim() || !categoryId) return;
    const ticket = store.submitTicket({
      userId: MOCK_USER_ID,
      subject: subject.trim(),
      description: description.trim(),
      categoryId,
      priority,
      status: 'open',
    });
    navigate(`/help/tickets/${ticket.id}`);
  };

  return (
    <PageShell width="medium" noPadTop={true} className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Nouveau ticket' }}
        title="Contacter le support"
        summary="Notre équipe répond généralement dans un délai de 24 h ouvrées."
        tone="flat"
      />

      <Card>
        <div className="flex flex-col gap-stack-lg">
          <h2 className="font-display font-semibold text-h3 text-ink-900 m-0">
            Nouvelle demande de support
          </h2>

          <div className="flex flex-col gap-stack">
            <FormGroup label="Catégorie" required>
              <Select
                options={categoryOptions}
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </FormGroup>

            <FormGroup label="Objet" required>
              <Input
                placeholder="Résumez votre problème en une ligne…"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </FormGroup>

            <FormGroup label="Priorité">
              <Select
                options={PRIORITY_OPTIONS}
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              />
            </FormGroup>

            <FormGroup label="Description détaillée" required>
              <Input
                multiline
                rows={6}
                placeholder="Décrivez votre problème en détail : contexte, étapes pour le reproduire, messages d'erreur éventuels…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
          </div>

          <div className="flex flex-wrap gap-stack-xs">
            <Button
              variant="primary"
              leadingIcon={<Send size={16} />}
              disabled={!subject.trim() || !description.trim() || !categoryId}
              onClick={handleSubmit}
            >
              Envoyer la demande
            </Button>
            <Button variant="ghost" leadingIcon={<X size={16} />} onClick={() => navigate('/help/tickets')}>
              Annuler
            </Button>
          </div>
        </div>
      </Card>
    </PageShell>
  );
}
