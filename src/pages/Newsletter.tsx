/**
 * Newsletter : Phase 10 Tier 2 polish.
 *
 * Page utilitaire abonnement / préférences newsletter + archives.
 * Petite page (S complexity) : utilise EditorialHero + EditorialLayout + SectionCard.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Mail,
  Newspaper,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { Card } from '../components/core/Card';
import { ReaderContextStrip } from '../components/patterns/ReaderContextStrip';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import { PageShell } from '../components/layout';

const ARCHIVES = [
  { id: 'w17', title: 'Semaine #17', description: 'IA & Pédagogie',          meta: '28 avril 2026' },
  { id: 'w16', title: 'Semaine #16', description: 'Leadership apprenant',     meta: '21 avril 2026' },
  { id: 'w15', title: 'Semaine #15', description: 'Micro-learning',            meta: '14 avril 2026' },
  { id: 'w14', title: 'Semaine #14', description: 'Évaluation des acquis',     meta: '7 avril 2026' },
];

export const Newsletter: React.FC = () => {
  const navigate = useNavigate();

  /* Passe typographique du 24/09 : la barre est ReaderContextStrip (elle
     était un PageShell dont la `flex-col` empilait ses deux actions hors de
     la barre) ; les trois blocs sont les sections de la page, un h2 28 posé
     au-dessus de leur carte — ils étaient trois cartes titrées en h3, avec
     une icône chacune, et la page sautait du h1 au h3. */
  return (
    <PageShell width="page" noPadTop={true}>
      <ReaderContextStrip
        title="Newsletter TLS"
        onBack={() => navigate('/veille')}
        backLabel="Retour à la veille"
        trailing={
          /* Un raccourci de la barre : `ghost` (arbitrage n°19). La page sert
             à régler l'abonnement ; l'aplat est l'envoi du formulaire. */
          <Button emphasis="ghost" size="sm" trailingIcon={<ArrowRight size={14} />} onClick={() => navigate('/veille/weekly-newsletter')}>
            Voir la dernière édition
          </Button>
        }
      />

      <EditorialHero
        eyebrow={{ icon: <Newspaper size={14} />, label: 'Abonnement Veille' }}
        title="Newsletter TLS"
        summary="Préférences d'abonnement, archives des éditions et accès rapide à la dernière sélection hebdo."
      />

      <EditorialLayout
        main={
          <div className="flex flex-col gap-page">
            <section className="flex flex-col gap-stack" aria-labelledby="newsletter-preferences">
              <div className="flex flex-col gap-stack-3xs">
                <h2 id="newsletter-preferences" className="font-display text-h2 text-ink-900">Préférences d'abonnement</h2>
                <p className="font-body text-body text-ink-700 max-w-prose">
                  Vous pouvez vous désinscrire à tout moment depuis n'importe quel email reçu.
                </p>
              </div>
              <Card className="flex flex-col gap-stack">
                <FormGroup label="Adresse email" id="newsletter-email">
                  <Input id="newsletter-email" type="email" placeholder="prenom.nom@entreprise.fr" />
                </FormGroup>
                <FormGroup label="Fréquence" id="newsletter-freq">
                  <Input id="newsletter-freq" type="text" defaultValue="Hebdomadaire (chaque lundi)" readOnly />
                </FormGroup>
                {/* L'envoi du formulaire, l'action principale de la page :
                    le seul `solid` (arbitrage n°19). */}
                <Button emphasis="solid" className="self-start mt-stack-xs" leadingIcon={<Mail size={14} />}>
                  Mettre à jour mes préférences
                </Button>
              </Card>
            </section>

            <section className="flex flex-col gap-stack" aria-labelledby="newsletter-derniere">
              <div className="flex flex-col gap-stack-3xs">
                <h2 id="newsletter-derniere" className="font-display text-h2 text-ink-900">Dernière édition publiée</h2>
                {/* Une donnée : légende 13 ink-600 (« Semaine #17 : Lundi… » :
                    reste d'un tiret remplacé). */}
                <p className="font-body text-caption text-ink-600">Semaine #17 · lundi 28 avril 2026</p>
              </div>
              <Card className="flex flex-col items-start gap-stack-lg">
                <p className="font-body text-body text-ink-700 max-w-prose">
                  Consultez la dernière synthèse hebdomadaire pour capter les tendances utiles en
                  quelques minutes. Vidéo de la semaine, articles à la une et sélection courte
                  curée par l'équipe éditoriale.
                </p>
                <Button
                  emphasis="soft"
                  trailingIcon={<ArrowRight size={14} />}
                  onClick={() => navigate('/veille/weekly-newsletter')}
                >
                  Ouvrir l'édition #17
                </Button>
              </Card>
            </section>
          </div>
        }
        aside={
          <section className="flex flex-col gap-stack" aria-labelledby="newsletter-archives">
            <h2 id="newsletter-archives" className="font-display text-h2 text-ink-900">Archives récentes</h2>
            <RelatedItemList
              items={ARCHIVES.map((a) => ({
                id: a.id,
                title: a.title,
                description: a.description,
                meta: a.meta,
                onClick: () => navigate('/veille/weekly-newsletter'),
              }))}
            />
          </section>
        }
      />
    </PageShell>
  );
};

export default Newsletter;
