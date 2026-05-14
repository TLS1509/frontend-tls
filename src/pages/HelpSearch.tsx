import React, { useState } from 'react';
import { HelpCircle, Search, BookOpen, GraduationCap, Users, Settings } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { FilterChip } from '../components/ui/FilterChip';
import { Input } from '../components/core/Input';

const RESULTS = [
  {
    id: '1',
    title: 'Comment fonctionne le Passeport de Compétences ?',
    excerpt: 'Le Passeport de Compétences est un document numérique qui centralise vos compétences développées au fil de vos formations...',
    category: 'Parcours',
  },
  {
    id: '2',
    title: 'Configurer les notifications de coaching',
    excerpt: 'Accédez à Paramètres → Notifications pour personnaliser la fréquence et les canaux de vos alertes de coaching...',
    category: 'Compte',
  },
  {
    id: '3',
    title: 'Rejoindre un atelier en visioconférence',
    excerpt: 'Pour rejoindre un atelier live, cliquez sur le bouton "Rejoindre" depuis la page de l\'atelier ou depuis votre tableau de bord...',
    category: 'Coaching',
  },
  {
    id: '4',
    title: 'Créer son compte et finaliser l\'inscription',
    excerpt: 'Lors de votre première connexion, vous serez guidé à travers un parcours d\'onboarding en 5 étapes pour personnaliser votre expérience...',
    category: 'Onboarding',
  },
  {
    id: '5',
    title: 'Télécharger mon attestation de formation',
    excerpt: 'Votre attestation de formation est générée automatiquement à la validation de chaque parcours. Vous pouvez la télécharger depuis...',
    category: 'Parcours',
  },
];

const CATEGORY_VARIANTS: Record<string, 'brand' | 'warm' | 'sun' | 'neutral'> = {
  Onboarding: 'sun',
  Parcours:   'brand',
  Coaching:   'warm',
  Compte:     'neutral',
};

const POPULAR_CATEGORIES = [
  { id: 'onboarding', label: 'Onboarding',  icon: <GraduationCap size={14} /> },
  { id: 'parcours',   label: 'Parcours',    icon: <BookOpen size={14} /> },
  { id: 'coaching',   label: 'Coaching',    icon: <Users size={14} /> },
  { id: 'compte',     label: 'Compte',      icon: <Settings size={14} /> },
];

export default function HelpSearch() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setActiveCategory((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Recherche' }}
        title="Rechercher dans l'aide"
        summary="Trouvez des réponses à toutes vos questions sur la plateforme."
        tone="default"
      />

      <div className="max-w-page mx-auto w-full px-4 flex flex-col gap-section pb-page">
        <div className="max-w-content mx-auto w-full">
          <Input
            placeholder="Rechercher un article, une question…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leadingIcon={<Search size={16} />}
            size="lg"
          />
        </div>

        <SectionCard
          title="Catégories populaires"
          titleIcon={<BookOpen size={18} />}
        >
          <div className="flex flex-wrap gap-stack-xs">
            {POPULAR_CATEGORIES.map((cat) => (
              <FilterChip
                key={cat.id}
                label={cat.label}
                active={activeCategory === cat.id}
                onClick={() => toggleCategory(cat.id)}
                icon={cat.icon}
              />
            ))}
          </div>
        </SectionCard>

        <div className="flex flex-col gap-stack">
          <h2 className="font-display font-semibold text-h4 text-ink-900 m-0">
            {query ? `Résultats pour "${query}"` : 'Articles populaires'}
          </h2>
          {RESULTS.map((result) => (
            <Card key={result.id} className="cursor-pointer hover:shadow-md transition-all duration-base">
              <div className="flex flex-col gap-stack-xs">
                <div className="flex items-start justify-between gap-stack">
                  <h3 className="font-display font-semibold text-body text-ink-900 m-0">{result.title}</h3>
                  <Badge variant={CATEGORY_VARIANTS[result.category] ?? 'neutral'}>{result.category}</Badge>
                </div>
                <p className="text-body-sm text-ink-600 leading-relaxed m-0">{result.excerpt}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
