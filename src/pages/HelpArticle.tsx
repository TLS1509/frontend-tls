import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, ArrowLeft, ThumbsUp, ThumbsDown, BookOpen, ExternalLink } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Alert } from '../components/ui/Alert';
import { useHelpcenterStore } from '../stores/persistence';

const MOCK_USER_ID = 'user-demo';

export default function HelpArticle() {
  const { id: slug } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useHelpcenterStore();

  const article = store.getArticle(slug ?? '');
  const feedback = article
    ? store.getArticleFeedback(MOCK_USER_ID, article.id)
    : undefined;

  const relatedArticles = article?.relatedArticleIds
    ? article.relatedArticleIds
        .map((id) => store.getArticle(id))
        .filter(Boolean) as NonNullable<ReturnType<typeof store.getArticle>>[]
    : [];

  useEffect(() => {
    if (article) {
      store.markArticleViewed(article.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article?.id]);

  if (!article) {
    return (
      <div className="flex flex-col gap-section">
        <EditorialHero
          eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Article' }}
          title="Article introuvable"
          summary="Cet article n'existe pas ou a été déplacé."
          tone="default"
        />
        <div className="max-w-page mx-auto w-full px-4 pb-page">
          <Button variant="ghost" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/help')}>
            Retour à l'aide
          </Button>
        </div>
      </div>
    );
  }

  const updatedDate = new Date(article.updatedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Article' }}
        title={article.title}
        summary={article.summary}
        tone="default"
        trailing={
          <Button variant="glass" leadingIcon={<ArrowLeft size={16} />} size="sm" onClick={() => navigate('/help')}>
            Retour à l'aide
          </Button>
        }
      />

      <div className="max-w-page mx-auto w-full px-4 pb-page">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-section items-start">
          <div className="flex flex-col gap-section">
            <Alert variant="info">Mis à jour le {updatedDate}</Alert>

            <Card>
              <div className="flex flex-col gap-stack-lg">
                <p className="text-body text-ink-700 leading-relaxed m-0 whitespace-pre-line">
                  {article.content}
                </p>
              </div>
            </Card>

            <div className="flex flex-col gap-stack-xs p-4 rounded-xl border border-ink-200 bg-ink-50">
              <p className="text-body-sm font-semibold text-ink-800 m-0">Cet article vous a-t-il été utile ?</p>
              <div className="flex gap-stack-xs">
                <Button
                  variant={feedback?.reaction === 'helpful' || feedback?.reaction === '👍' ? 'primary' : 'secondary'}
                  size="sm"
                  leadingIcon={<ThumbsUp size={14} />}
                  onClick={() => store.submitFeedback(MOCK_USER_ID, article.id, 'helpful')}
                >
                  Oui ({article.helpfulCount})
                </Button>
                <Button
                  variant={feedback?.reaction === 'unhelpful' || feedback?.reaction === '😕' ? 'primary' : 'secondary'}
                  size="sm"
                  leadingIcon={<ThumbsDown size={14} />}
                  onClick={() => store.submitFeedback(MOCK_USER_ID, article.id, 'unhelpful')}
                >
                  Non ({article.unhelpfulCount})
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-stack-xs">
              <Button variant="ghost" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/help')}>
                Retour à l'aide
              </Button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-6 flex flex-col gap-section">
            {relatedArticles.length > 0 && (
              <SectionCard title="Articles liés" titleIcon={<BookOpen size={18} />}>
                <div className="flex flex-col gap-stack-xs">
                  {relatedArticles.map((related) => (
                    <button
                      key={related.id}
                      type="button"
                      onClick={() => navigate(`/help/article/${related.id}`)}
                      className="flex items-center justify-between gap-stack-xs p-3 rounded-lg hover:bg-ink-50 transition-all duration-base group text-left w-full border-0 bg-transparent cursor-pointer"
                    >
                      <span className="text-body-sm text-ink-700 group-hover:text-primary-700 transition-all duration-base">
                        {related.title}
                      </span>
                      <ExternalLink size={14} className="text-ink-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </SectionCard>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
