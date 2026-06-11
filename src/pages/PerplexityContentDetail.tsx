import React from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink, BookOpen, Calendar, User } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import SectionCard from '../components/patterns/SectionCard';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';

const MOCK_ARTICLE = {
  title: 'État de l\'art des LLM open-source en 2026',
  excerpt: 'Une synthèse des dernières avancées sur Mistral, Llama 3 et les modèles spécialisés.',
  author: 'Sourcé via Perplexity AI',
  date: '12 mai 2026',
  readTime: '8 min',
  body: `Les modèles de langage open-source ont connu une évolution remarquable en 2026. Mistral Large 2, sorti en mars, atteint des performances comparables à GPT-4 sur les benchmarks de raisonnement. Llama 3 405B propose une architecture mixture-of-experts particulièrement efficace pour l'inférence.

Les modèles spécialisés (code, médical, juridique) tirent leur épingle du jeu via le fine-tuning supervisé sur des datasets propriétaires de haute qualité. Cette tendance favorise les déploiements on-premise pour les secteurs régulés.

L'écosystème de tooling (vLLM, TGI, Ollama) atteint maintenant une maturité production-ready, rendant l'auto-hébergement accessible aux équipes de taille moyenne.`,
  sources: [
    { name: 'Mistral AI Blog', url: 'https://mistral.ai/news', date: 'mars 2026' },
    { name: 'Meta AI Research', url: 'https://ai.meta.com', date: 'avril 2026' },
    { name: 'HuggingFace Reports', url: 'https://huggingface.co', date: 'mai 2026' },
  ],
};

const RELATED = [
  { id: '1', title: 'Mistral 8x22B : architecture détaillée', meta: 'Article · 6 min' },
  { id: '2', title: 'Fine-tuning Llama 3 sur dataset privé', meta: 'Tutoriel · 12 min' },
  { id: '3', title: 'vLLM vs TGI : benchmark 2026', meta: 'Dossier · 15 min' },
];

const PerplexityContentDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow="Veille IA · Sourcé via Perplexity"
        title={MOCK_ARTICLE.title}
        summary={MOCK_ARTICLE.excerpt}
        tone="default"
      />
      <EditorialLayout
        main={
          <div className="flex flex-col gap-section">
            <div className="flex items-center gap-stack-xs flex-wrap">
              <AITransparencyLabel variant="generated" />
              <Badge variant="info">{MOCK_ARTICLE.readTime}</Badge>
              <span className="flex items-center gap-1 text-caption text-ink-500">
                <Calendar className="w-4 h-4" /> {MOCK_ARTICLE.date}
              </span>
              <span className="flex items-center gap-1 text-caption text-ink-500">
                <User className="w-4 h-4" /> {MOCK_ARTICLE.author}
              </span>
            </div>

            <article className="prose prose-ink max-w-prose">
              {MOCK_ARTICLE.body.split('\n\n').map((p, i) => (
                <p key={i} className="text-body text-ink-700 leading-relaxed mb-stack">{p}</p>
              ))}
            </article>

            <SectionCard
              title="Sources originales"
              description="Articles et papiers cités par Perplexity dans cette synthèse"
            >
              <div className="flex flex-col gap-stack-xs">
                {MOCK_ARTICLE.sources.map((s, i) => (
                  <Card key={i} className="p-stack flex items-center justify-between gap-stack">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="font-semibold text-body-sm">{s.name}</div>
                        <div className="text-caption text-ink-500">{s.date}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" trailingIcon={<ExternalLink className="w-4 h-4" />}>
                      Lire
                    </Button>
                  </Card>
                ))}
              </div>
            </SectionCard>
          </div>
        }
        aside={
          <div className="flex flex-col gap-stack">
            <h3 className="font-display text-h5 font-semibold text-ink-900">Sur le même sujet</h3>
            <RelatedItemList
              items={RELATED.map((r) => ({ id: r.id, title: r.title, meta: r.meta, href: `/veille/perplexity/${r.id}` }))}
            />
          </div>
        }
      />
    </div>
  );
};

export default PerplexityContentDetail;
