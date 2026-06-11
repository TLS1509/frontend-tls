import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, BookOpen, GraduationCap, Users, Settings, Tag } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { FilterChip } from '../components/ui/FilterChip';
import { Input } from '../components/core/Input';
import { Container } from '../components/layout';
import { useHelpcenterStore } from '../stores/persistence';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'cat-01': <GraduationCap size={14} />,
  'cat-02': <BookOpen size={14} />,
  'cat-03': <Tag size={14} />,
  'cat-04': <Users size={14} />,
  'cat-05': <BookOpen size={14} />,
  'cat-06': <Settings size={14} />,
};

export default function HelpSearch() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const store = useHelpcenterStore();

  // Seed via getter on first render
  const allArticles = useMemo(
    () => store.searchArticles('', undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store.articles]
  );

  const results = useMemo(
    () => store.searchArticles(query, activeCategory ?? undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, activeCategory, store.articles]
  );

  const cats = store.categories;

  const toggleCategory = (id: string) => {
    setActiveCategory((prev) => (prev === id ? null : id));
  };

  const getCategoryName = (catId: string) => cats.find((c) => c.id === catId)?.name ?? catId;

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Recherche' }}
        title="Rechercher dans l'aide"
        summary="Trouvez des réponses à toutes vos questions sur la plateforme."
        tone="default"
      />

      <Container width="page" padding={false} className="px-stack flex flex-col gap-section pb-page">
        <Container width="content" padding={false}>
          <Input
            placeholder="Rechercher un article, une question…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leadingIcon={<BookOpen size={16} />}
            size="lg"
          />
        </Container>

        {cats.length > 0 && (
          <SectionCard title="Catégories" titleIcon={<BookOpen size={18} />}>
            <div className="flex flex-wrap gap-stack-xs">
              {cats.map((cat) => (
                <FilterChip
                  key={cat.id}
                  label={cat.name}
                  active={activeCategory === cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  icon={CATEGORY_ICONS[cat.id]}
                />
              ))}
            </div>
          </SectionCard>
        )}

        <div className="flex flex-col gap-stack">
          <h2 className="font-display font-semibold text-h4 text-ink-900 m-0">
            {query ? `Résultats pour "${query}" (${results.length})` : `Articles populaires (${allArticles.length})`}
          </h2>
          {results.length === 0 ? (
            <p className="text-body-sm text-ink-400 py-stack">Aucun article trouvé pour cette recherche.</p>
          ) : (
            results.map((article) => (
              <Card
                key={article.id}
                className="cursor-pointer hover:shadow-md transition-all duration-base"
                onClick={() => navigate(`/help/article/${article.id}`)}
              >
                <div className="flex flex-col gap-stack-xs">
                  <div className="flex items-start justify-between gap-stack">
                    <h3 className="font-display font-semibold text-body text-ink-900 m-0">{article.title}</h3>
                    <Badge variant="neutral">{getCategoryName(article.categoryId)}</Badge>
                  </div>
                  <p className="text-body-sm text-ink-600 leading-relaxed m-0">{article.summary}</p>
                </div>
              </Card>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}
