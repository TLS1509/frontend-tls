import React from 'react';
import { HelpCircle, ArrowLeft, ThumbsUp, BookOpen, ExternalLink } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Alert } from '../components/ui/Alert';

const ARTICLE_SECTIONS = [
  {
    heading: 'Qu\'est-ce que le Passeport de Compétences ?',
    content: 'Le Passeport de Compétences est un document numérique personnel qui centralise toutes vos compétences développées au fil de vos formations et expériences sur The Learning Society. Il constitue une preuve tangible de votre progression et peut être partagé avec votre manager ou d\'éventuels recruteurs.',
  },
  {
    heading: 'Comment est-il alimenté ?',
    content: 'Votre passeport est mis à jour automatiquement à chaque validation de module, atelier ou parcours. Les compétences sont catégorisées selon un référentiel commun : compétences métiers, compétences transversales et comportements professionnels. Chaque compétence est accompagnée d\'une preuve concrète (résultats d\'évaluation, production réalisée, etc.).',
  },
  {
    heading: 'Peut-on ajouter des compétences manuellement ?',
    content: 'Oui. Vous pouvez enrichir votre passeport avec des compétences acquises en dehors de la plateforme (formations externes, certifications, expériences professionnelles). Ces ajouts manuels sont clairement distingués des compétences validées sur la plateforme. Votre coach peut également annoter et valider ces entrées.',
  },
  {
    heading: 'Comment partager mon Passeport ?',
    content: 'Rendez-vous dans votre espace Profil → Passeport de Compétences → Partager. Vous pouvez générer un lien public avec une date d\'expiration, ou exporter le document en PDF formaté. Le partage est révocable à tout moment depuis vos paramètres de confidentialité.',
  },
];

const RELATED_ARTICLES = [
  { id: '1', title: 'Comment configurer mon profil apprenant', href: '#' },
  { id: '2', title: 'Comprendre les niveaux de compétences', href: '#' },
  { id: '3', title: 'Exporter mes données et certifications', href: '#' },
];

export default function HelpArticle() {
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Article' }}
        title="Comment fonctionne le Passeport de Compétences ?"
        summary="Guide complet pour comprendre, enrichir et partager votre Passeport de Compétences."
        tone="default"
        trailing={
          <div className="flex gap-stack-xs">
            <Button variant="glass" leadingIcon={<ArrowLeft size={16} />} size="sm">Retour à l'aide</Button>
          </div>
        }
      />

      <div className="max-w-page mx-auto w-full px-4 pb-page">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-section items-start">
          <div className="flex flex-col gap-section">
            <Alert variant="info">
              Cet article a été mis à jour le 12 mai 2026
            </Alert>

            <Card>
              <div className="flex flex-col gap-stack-lg">
                {ARTICLE_SECTIONS.map((section) => (
                  <div key={section.heading} className="flex flex-col gap-stack-xs">
                    <h2 className="font-display font-semibold text-h4 text-ink-900 m-0">{section.heading}</h2>
                    <p className="text-body text-ink-700 leading-relaxed m-0">{section.content}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex flex-wrap gap-stack-xs">
              <Button variant="ghost" leadingIcon={<ArrowLeft size={16} />}>Retour à l'aide</Button>
              <Button variant="ghost" leadingIcon={<ThumbsUp size={16} />}>Utile ? Donner mon avis</Button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-6 flex flex-col gap-section">
            <SectionCard
              title="Articles liés"
              titleIcon={<BookOpen size={18} />}
            >
              <div className="flex flex-col gap-stack-xs">
                {RELATED_ARTICLES.map((article) => (
                  <a
                    key={article.id}
                    href={article.href}
                    className="flex items-center justify-between gap-stack-xs p-3 rounded-lg hover:bg-ink-50 transition-all duration-base group"
                  >
                    <span className="text-body-sm text-ink-700 group-hover:text-primary-700 transition-all duration-base">
                      {article.title}
                    </span>
                    <ExternalLink size={14} className="text-ink-400 shrink-0" />
                  </a>
                ))}
              </div>
            </SectionCard>
          </aside>
        </div>
      </div>
    </div>
  );
}
