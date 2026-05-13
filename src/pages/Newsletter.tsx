/**
 * Newsletter — Phase 10 Tier 2 polish.
 *
 * Page utilitaire abonnement / préférences newsletter + archives.
 * Petite page (S complexity) — utilise EditorialHero + EditorialLayout + SectionCard.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  BellRing,
  Mail,
  Newspaper,
  Calendar,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { RelatedItemList } from '../components/patterns/RelatedItemList';

const ARCHIVES = [
  { id: 'w17', title: 'Semaine #17', description: 'IA & Pédagogie',          meta: '28 avril 2026' },
  { id: 'w16', title: 'Semaine #16', description: 'Leadership apprenant',     meta: '21 avril 2026' },
  { id: 'w15', title: 'Semaine #15', description: 'Micro-learning',            meta: '14 avril 2026' },
  { id: 'w14', title: 'Semaine #14', description: 'Évaluation des acquis',     meta: '7 avril 2026' },
];

export const Newsletter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface">
      {/* Sticky glass header */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/veille')}
            className="inline-flex items-center gap-1.5 font-body text-caption font-semibold text-ink-700 hover:text-primary-700 bg-transparent border-0 cursor-pointer"
          >
            <ArrowLeft size={14} /> Retour à la veille
          </button>
          <Button variant="primary" size="sm" trailingIcon={<ArrowRight size={13} />} onClick={() => navigate('/veille/weekly-newsletter')}>
            Voir la dernière édition
          </Button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">
        <EditorialHero
          eyebrow={{ icon: <Newspaper size={12} />, label: 'Abonnement Veille' }}
          title="Newsletter TLS"
          summary="Préférences d'abonnement, archives des éditions et accès rapide à la dernière sélection hebdo."
        />

        <EditorialLayout
          main={
            <>
              <SectionCard
                title="Préférences d'abonnement"
                titleIcon={<Mail size={18} className="text-primary-600" />}
                description="Vous pouvez vous désinscrire à tout moment depuis n'importe quel email reçu."
              >
                <div className="flex flex-col gap-stack">
                  <FormGroup label="Adresse email" id="newsletter-email">
                    <Input id="newsletter-email" type="email" placeholder="vous@entreprise.com" />
                  </FormGroup>
                  <FormGroup label="Fréquence" id="newsletter-freq">
                    <Input id="newsletter-freq" type="text" defaultValue="Hebdomadaire (chaque lundi)" readOnly />
                  </FormGroup>
                  <Button variant="primary" className="self-start" leadingIcon={<Mail size={14} />}>
                    Mettre à jour mes préférences
                  </Button>
                </div>
              </SectionCard>

              <SectionCard
                title="Dernière édition publiée"
                titleIcon={<Calendar size={18} className="text-primary-600" />}
                description="Édition de la semaine #17 — Lundi 28 avril 2026"
              >
                <p className="m-0 font-body text-body-sm text-ink-600 leading-relaxed">
                  Consultez la dernière synthèse hebdomadaire pour capter les tendances utiles en
                  quelques minutes. Vidéo de la semaine, articles à la une et sélection courte
                  curée par l'équipe éditoriale.
                </p>
                <Button
                  variant="primary"
                  trailingIcon={<ArrowRight size={14} />}
                  onClick={() => navigate('/veille/weekly-newsletter')}
                  className="self-start mt-stack"
                >
                  Ouvrir l'édition #17
                </Button>
              </SectionCard>
            </>
          }
          aside={
            <SectionCard title="Archives récentes" titleIcon={<BellRing size={16} className="text-primary-600" />}>
              <RelatedItemList
                items={ARCHIVES.map((a) => ({
                  id: a.id,
                  title: a.title,
                  description: a.description,
                  meta: a.meta,
                  onClick: () => navigate('/veille/weekly-newsletter'),
                }))}
              />
            </SectionCard>
          }
        />
      </main>
    </div>
  );
};

export default Newsletter;
