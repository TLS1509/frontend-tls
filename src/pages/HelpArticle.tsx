import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
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
        /* Un intertitre de l'article est une section : h2, au pas 28. Il
           était dessiné en 20, la taille d'un titre de carte. */
        <h2 key={`t${b}`} className="font-display text-h2 text-ink-900 text-balance">
          {titre[1]}
        </h2>,
      );
      lignes = lignes.slice(1);
    }
    if (lignes.length === 0) return;
    if (lignes.every((l) => PUCE.test(l))) {
      rendu.push(
        <ul key={`l${b}`} className="list-disc pl-stack-lg flex flex-col gap-stack-3xs text-body text-ink-700">
          {lignes.map((l, i) => <li key={i}>{enLigne(l.replace(PUCE, ''), `l${b}-${i}`)}</li>)}
        </ul>,
      );
    } else if (lignes.every((l) => NUMERO.test(l))) {
      rendu.push(
        <ol key={`o${b}`} className="list-decimal pl-stack-lg flex flex-col gap-stack-3xs text-body text-ink-700">
          {lignes.map((l, i) => <li key={i}>{enLigne(l.replace(NUMERO, ''), `o${b}-${i}`)}</li>)}
        </ol>,
      );
    } else {
      rendu.push(
        <p key={`p${b}`} className="text-body text-ink-700">
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

  const categoryName = article
    ? store.categories.find((c) => c.id === article.categoryId)?.name
    : undefined;

  if (!article) {
    return (
      <PageShell width="page">
        <PageHero
          eyebrow="Centre d'aide"
          title="Article introuvable"
          summary="Cet article n'existe pas ou a été déplacé."
          tone="flat"
        />
        {/* Arbitrage n°19 : l'article manque, le retour est la seule issue,
            donc l'action principale de l'écran. */}
        <div>
          <Button emphasis="solid" tone="brand" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/help')}>
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

  /* Passe typographique du 2026-09-24 : haut de page au padding de
     `PageShell` ; le retour passe au-dessus du titre (lien de retour de
     `PageHero`) au lieu d'un bouton après le chapô ; la date de mise à jour
     est une donnée d'en-tête (méta), plus une `Alert` info ; le corps est un
     article posé sur la page, à la largeur de lecture, ses intertitres en h2
     à 28 ; les articles liés sont internes — chevron, plus l'icône de lien
     externe. */
  return (
    <PageShell width="page">
      <PageHero
        backLink={{ label: 'Centre d\'aide', onClick: () => navigate('/help') }}
        eyebrow={categoryName ? `Centre d'aide · ${categoryName}` : 'Centre d\'aide'}
        title={article.title}
        summary={article.summary}
        meta={[{ label: `Mis à jour le ${updatedDate}` }]}
        tone="flat"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-x-section gap-y-page items-start">
        <div className="flex flex-col gap-page">
          <article className="flex flex-col gap-stack max-w-prose">
            <CorpsArticle contenu={article.content} />
          </article>

          {/* Retour d'usage : une question et sa réponse, un seul groupe. */}
          <div className="flex flex-col gap-stack-sm p-stack-md rounded-xl border border-ink-200 bg-ink-50 max-w-prose">
            <p className="text-body font-semibold text-ink-900">Cet article vous a-t-il été utile ?</p>
            <div className="flex flex-wrap gap-stack-xs">
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

          {/* Une page de lecture n'a pas d'action principale (arbitrage n°19) :
              le retour, doublé par le lien au-dessus du titre, est un ghost. */}
          <div className="flex flex-wrap gap-stack-xs">
            <Button emphasis="ghost" tone="brand" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/help')}>
              Retour à l'aide
            </Button>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <aside className="lg:sticky lg:top-stack-lg flex flex-col gap-stack">
            <SectionHeader title="Articles liés" />
            <Card className="p-0 overflow-hidden">
              <ul className="flex flex-col divide-y divide-ink-100">
                {relatedArticles.map((related) => (
                  <li key={related.id}>
                    <button
                      type="button"
                      onClick={() => navigate(`/help/article/${related.id}`)}
                      className="w-full flex items-start justify-between gap-stack-xs px-stack-md py-stack text-left bg-transparent border-0 cursor-pointer transition-colors duration-base hover:bg-ink-50 group focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500"
                    >
                      <span className="text-body text-ink-900 group-hover:text-primary-800 transition-colors duration-base">
                        {related.title}
                      </span>
                      <span className="shrink-0 inline-flex items-center h-lh text-primary-700" aria-hidden="true">
                        <ChevronRight size={16} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        )}
      </div>
    </PageShell>
  );
}
