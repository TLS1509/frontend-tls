import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, X } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
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

  /* Passe typographique du 2026-09-24 : haut de page au padding de
     `PageShell`, colonne de formulaire (768) au lieu de 1 024 ; le titre de
     carte « Nouvelle demande de support » redisait le h1 : retiré. */
  return (
    <PageShell width="content">
      <PageHero
        eyebrow="Centre d'aide"
        title="Contacter le support"
        summary="Notre équipe répond généralement dans un délai de 24 h ouvrées."
        tone="flat"
      />

      <Card className="flex flex-col gap-stack-lg">
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

        {/* L'envoi d'un formulaire est l'aplat de l'écran, Annuler l'outline
            neutre qui forme la paire (arbitrage n°19). */}
        <div className="flex flex-wrap gap-stack-xs">
          <Button
            emphasis="solid"
            tone="brand"
            leadingIcon={<Send size={16} />}
            disabled={!subject.trim() || !description.trim() || !categoryId}
            onClick={handleSubmit}
          >
            Envoyer la demande
          </Button>
          <Button emphasis="outline" tone="neutral" leadingIcon={<X size={16} />} onClick={() => navigate('/help/tickets')}>
            Annuler
          </Button>
        </div>
      </Card>
    </PageShell>
  );
}
