import React from 'react';
import { ExternalLink, BookOpen, Calendar, User, Clock3 } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { PageShell } from '../components/layout';

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

/* Passe typographique du 24/09 :
   · la page n'avait pas de PageShell — son surtitre collait au haut de l'écran ;
   · la méta (durée, date, source) passe dans l'en-tête, en légende 13 ink-600
     (elle était au cran 500, la durée en Badge capitales) ; l'étiquette IA
     reste visible juste dessous ;
   · le texte de la synthèse est le texte principal : ink-900 ;
   · « Sources originales » est une section (h2 28) : elle était une carte
     titrée en h3 — la page sautait du h1 au h3 — qui contenait trois cartes.
     Les sources sont des rangées dans UNE carte (arbitrage n°5) ;
   · l'encart « Sur le même sujet » prend le libellé commun des encarts
     (13/600 ink-600) ; c'était un h3 en 16/600. */
const PerplexityContentDetail: React.FC = () => {
  return (
    <PageShell width="page" className="bg-surface">
      <EditorialHero
        eyebrow="Veille IA · Sourcé via Perplexity"
        title={MOCK_ARTICLE.title}
        summary={MOCK_ARTICLE.excerpt}
        tone="flat"
        meta={[
          { icon: <Clock3 size={14} />, label: MOCK_ARTICLE.readTime },
          { icon: <Calendar size={14} />, label: MOCK_ARTICLE.date },
          { icon: <User size={14} />, label: MOCK_ARTICLE.author },
        ]}
        trailing={<AITransparencyLabel variant="generated" />}
      />
      <EditorialLayout
        main={
          <div className="flex flex-col gap-page">
            <article className="flex flex-col gap-stack max-w-prose">
              {MOCK_ARTICLE.body.split('\n\n').map((p, i) => (
                <p key={i} className="font-body text-body text-ink-900">{p}</p>
              ))}
            </article>

            <section className="flex flex-col gap-stack" aria-labelledby="perplexity-sources">
              <div className="flex flex-col gap-stack-3xs">
                <h2 id="perplexity-sources" className="font-display text-h2 text-ink-900">Sources originales</h2>
                <p className="font-body text-body text-ink-700 max-w-prose">
                  Articles et papiers cités par Perplexity dans cette synthèse
                </p>
              </div>
              <Card as="ul" className="flex flex-col gap-0 p-0 divide-y divide-ink-100">
                {MOCK_ARTICLE.sources.map((s, i) => (
                  <li key={i} className="flex flex-wrap items-center justify-between gap-stack px-stack-lg py-stack">
                    <div className="flex items-start gap-stack-xs">
                      {/* Calée sur la 1re ligne : (26 − 20) / 2. */}
                      <BookOpen size={20} className="text-primary-700 shrink-0 mt-[3px]" aria-hidden="true" />
                      <div className="flex flex-col gap-tight">
                        <p className="font-body text-body font-semibold text-ink-900">{s.name}</p>
                        <p className="font-body text-caption text-ink-600">{s.date}</p>
                      </div>
                    </div>
                    <Button emphasis="outline" size="sm" trailingIcon={<ExternalLink size={14} />}>
                      Lire
                    </Button>
                  </li>
                ))}
              </Card>
            </section>
          </div>
        }
        aside={
          <div className="flex flex-col gap-stack-sm">
            <p className="font-body text-caption font-semibold text-ink-600">Sur le même sujet</p>
            <RelatedItemList
              items={RELATED.map((r) => ({ id: r.id, title: r.title, meta: r.meta, href: `/veille/perplexity/${r.id}` }))}
            />
          </div>
        }
      />
    </PageShell>
  );
};

export default PerplexityContentDetail;
