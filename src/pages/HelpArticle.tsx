import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, ArrowLeft, ThumbsUp, ThumbsDown, BookOpen, ExternalLink } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Alert } from '../components/ui/Alert';
import { PageShell } from '../components/layout';
import { useHelpcenterStore } from '../stores/persistence';

const MOCK_USER_ID = 'user-demo';

/* Rendu du corps d'article (2026-09-24). Les contenus de l'aide sont écrits
   en Markdown léger — intertitres `**…**`, listes `- ` et `1. `, gras en
   ligne — et la page les affichait bruts : « **1. Accédez à la liste des
   parcours** » en tête de chaque section. Ce rendu couvre exactement ce que
   `data/helpcenter.ts` emploie, sans dépendance : un bloc = un paragraphe
   séparé par une ligne vide ; une ligne entièrement en gras = un intertitre. */
const INTERTITRE = /^\*\*([^*]+)\*\*$/;
const PUCE = /^[-•]\s+/;
const NUMERO = /^\d+\.\s+/;

function enLigne(texte: string, cle: string): React.ReactNode[] {
  return texte.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((morceau, i) => {
    const gras = morceau.match(INTERTITRE);
    return gras ? <strong key={`${cle}-${i}`} className="font-semibold text-ink-900">{gras[1]}</strong> : morceau;
  });
}

function CorpsArticle({ contenu }: { contenu: string }) {
  const rendu: React.ReactNode[] = [];
  contenu.split(/\n{2,}/).forEach((bloc, b) => {
    let lignes = bloc.split('\n').map((l) => l.trim()).filter(Boolean);
    const titre = lignes[0]?.match(INTERTITRE);
    if (titre) {
      rendu.push(
        <h2 key={`t${b}`} className="font-display text-h3 text-ink-900">
          {titre[1]}
        </h2>,
      );
      lignes = lignes.slice(1);
    }
    if (lignes.length === 0) return;
    if (lignes.every((l) => PUCE.test(l))) {
      rendu.push(
        <ul key={`l${b}`} className="list-disc pl-stack-lg flex flex-col gap-tight text-body text-ink-700 m-0">
          {lignes.map((l, i) => <li key={i}>{enLigne(l.replace(PUCE, ''), `l${b}-${i}`)}</li>)}
        </ul>,
      );
    } else if (lignes.every((l) => NUMERO.test(l))) {
      rendu.push(
        <ol key={`o${b}`} className="list-decimal pl-stack-lg flex flex-col gap-tight text-body text-ink-700 m-0">
          {lignes.map((l, i) => <li key={i}>{enLigne(l.replace(NUMERO, ''), `o${b}-${i}`)}</li>)}
        </ol>,
      );
    } else {
      rendu.push(
        <p key={`p${b}`} className="text-body text-ink-700 m-0">
          {lignes.flatMap((l, i) => (i === 0 ? enLigne(l, `p${b}-${i}`) : [<br key={`br${i}`} />, ...enLigne(l, `p${b}-${i}`)]))}
        </p>,
      );
    }
  });
  return <>{rendu}</>;
}

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
      <PageShell width="page" noPadTop className="pt-6 md:pt-8 lg:pt-10">
        <EditorialHero
          eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Article' }}
          title="Article introuvable"
          summary="Cet article n'existe pas ou a été déplacé."
          tone="flat"
        />
        <div className="pb-page">
          <Button emphasis="outline" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/help')}>
            Retour à l'aide
          </Button>
        </div>
      </PageShell>
    );
  }

  const updatedDate = new Date(article.updatedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <PageShell width="page" noPadTop className="gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Article' }}
        title={article.title}
        summary={article.summary}
        tone="flat"
        trailing={
          <Button emphasis="soft" leadingIcon={<ArrowLeft size={16} />} size="sm" onClick={() => navigate('/help')}>
            Retour à l'aide
          </Button>
        }
      />

      <div className="pb-page">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-section items-start">
          <div className="flex flex-col gap-section">
            <Alert variant="info">Mis à jour le {updatedDate}</Alert>

            <Card>
              <div className="flex flex-col gap-stack">
                <CorpsArticle contenu={article.content} />
              </div>
            </Card>

            <div className="flex flex-col gap-stack-xs p-stack rounded-lg border border-ink-200 bg-ink-50">
              <p className="text-body font-semibold text-ink-800 m-0">Cet article vous a-t-il été utile ?</p>
              <div className="flex gap-stack-xs">
                <Button
                  emphasis="soft"
                tone={feedback?.reaction === 'helpful' || feedback?.reaction === '👍' ? 'brand' : 'warm'}
                  size="sm"
                  leadingIcon={<ThumbsUp size={14} />}
                  onClick={() => store.submitFeedback(MOCK_USER_ID, article.id, 'helpful')}
                >
                  Oui ({article.helpfulCount})
                </Button>
                <Button
                  emphasis="soft"
                tone={feedback?.reaction === 'unhelpful' || feedback?.reaction === '😕' ? 'brand' : 'warm'}
                  size="sm"
                  leadingIcon={<ThumbsDown size={14} />}
                  onClick={() => store.submitFeedback(MOCK_USER_ID, article.id, 'unhelpful')}
                >
                  Non ({article.unhelpfulCount})
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-stack-xs">
              <Button emphasis="outline" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/help')}>
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
                      className="flex items-center justify-between gap-stack-xs p-3 rounded-lg hover:bg-ink-50 transition-all duration-base group text-left w-full border-0 bg-transparent cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    >
                      <span className="text-body text-ink-700 group-hover:text-primary-700 transition-all duration-base">
                        {related.title}
                      </span>
                      <ExternalLink size={14} className="text-ink-600 shrink-0" />
                    </button>
                  ))}
                </div>
              </SectionCard>
            )}
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
