import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Users, Settings, Tag, Search, ChevronRight } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { MetaPill } from '../components/ui/MetaPill';
import { FilterChip } from '../components/ui/FilterChip';
import { Input } from '../components/core/Input';
import { PageShell } from '../components/layout';
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

  /* Passe typographique du 2026-09-24 : haut de page au padding de
     `PageShell` ; le champ, centré dans une colonne à part (x 469 contre 306
     pour le titre), part du même bord que tout le reste, avec une loupe (il
     portait un livre) ; les catégories sont un groupe de pastilles nommé, plus
     une carte à titre ; le titre des résultats passe à 28 et son compte en
     méta ; les huit résultats sont des rangées-liens dans une carte — des
     `button`, plus des cartes cliquables au clavier muet — et leur catégorie
     est une donnée (`MetaPill`). */
  return (
    <PageShell width="page">
      <PageHero
        eyebrow="Centre d'aide"
        title="Rechercher dans l'aide"
        summary="Trouvez des réponses à toutes vos questions sur la plateforme."
        tone="flat"
      />

      {/* Le champ et les catégories qui le filtrent : un bloc. */}
      <div className="flex flex-col gap-stack-lg">
        <div className="max-w-2xl">
          <Input
            placeholder="Rechercher un article, une question…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leadingIcon={<Search size={16} />}
            aria-label="Rechercher dans l'aide"
            size="lg"
          />
        </div>

        {cats.length > 0 && (
          <div className="flex flex-col gap-stack-xs" role="group" aria-labelledby="aide-categories">
            {/* Un groupe de pastilles se nomme comme un champ : 16 / 600 ink-900. */}
            <span id="aide-categories" className="font-body text-body font-semibold text-ink-900">Catégories</span>
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
          </div>
        )}
      </div>

      <section className="flex flex-col gap-stack">
        <SectionHeader
          title={query ? `Résultats pour «\u00a0${query}\u00a0»` : 'Articles populaires'}
          meta={query ? `${results.length} résultat${results.length > 1 ? 's' : ''}` : `${allArticles.length} articles`}
        />
        {results.length === 0 ? (
          <p className="text-body text-ink-700">Aucun article trouvé pour cette recherche.</p>
        ) : (
          <Card className="p-0 overflow-hidden">
            <ul className="flex flex-col divide-y divide-ink-100" aria-label="Articles">
              {results.map((article) => (
                <li key={article.id}>
                  <button
                    type="button"
                    onClick={() => navigate(`/help/article/${article.id}`)}
                    className="w-full flex items-start justify-between gap-stack px-stack-md sm:px-stack-lg py-stack text-left bg-transparent border-0 cursor-pointer transition-colors duration-base hover:bg-ink-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500"
                  >
                    {/* Titre, résumé, puis la catégorie en donnée. */}
                    <span className="flex flex-col gap-stack-3xs min-w-0">
                      <span className="font-body text-body font-semibold text-ink-900">{article.title}</span>
                      <span className="font-body text-body text-ink-700 max-w-prose">{article.summary}</span>
                      <MetaPill text={getCategoryName(article.categoryId)} tone="neutral" className="self-start mt-stack-3xs" />
                    </span>
                    <span className="shrink-0 inline-flex items-center h-lh text-primary-700" aria-hidden="true">
                      <ChevronRight size={18} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </section>
    </PageShell>
  );
}
