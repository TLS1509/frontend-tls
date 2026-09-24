/**
 * WeeklyNewsDetail : Actu individuelle issue de la newsletter hebdo.
 *
 * Accessible depuis :
 *  - La page hub /veille (type 'actu')
 *  - La page /veille/weekly-newsletter (édition hebdo)
 *
 * Navigation : navigate(-1) pour retourner à la source naturellement.
 */

import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookmarksStore } from '../stores/persistence';
import {
  Bookmark,
  Share2,
  CalendarDays,
  Clock3,
  TrendingUp,
  ExternalLink,
  Tag as TagIcon,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { PageShell } from '../components/layout';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import { IntroCallout } from '../components/patterns/IntroCallout';
import { ReaderContextStrip } from '../components/patterns/ReaderContextStrip';
import {
  ReadingProgressBar,
  ReadingProgressRing,
} from '../components/patterns/ReadingProgress';

/* ─── Data ───────────────────────────────────────────────────────────────── */

const ACTU = {
  id: '1',
  week: 'Semaine #17',
  date: 'Lundi 28 avril 2026',
  category: 'IA & Pédagogie',
  priority: 'Priorité forte',
  title: 'IA générative et formation : où en sommes-nous en 2026 ?',
  excerpt:
    "L'essentiel de l'actualité en une page : impact, opportunités à court terme et actions recommandées pour les équipes formation.",
  readTime: '6 min',
  sourceLabel: 'MIT Technology Review',
  sourceUrl: 'https://www.technologyreview.com',
  tags: ['IA générative', 'Formation pro', 'EdTech', '2026'],
  body: [
    {
      heading: 'Ce qui s\'est passé',
      text: "Une méta-analyse portant sur 340 dispositifs de formation intégrant l'IA générative publiée ce mois-ci confirme une tendance que les practitioners observaient depuis 18 mois : le gain de temps moyen sur la production de contenu pédagogique dépasse 40 %, mais l'impact sur les résultats apprenants reste très variable selon le niveau d'accompagnement humain maintenu.",
    },
    {
      heading: 'Pourquoi c\'est important',
      text: "Pour les responsables formation, cela confirme que l'IA n'est pas un remplacement du formateur mais un levier de scalabilité : à condition de préserver les moments de guidance personnalisée. Les organisations qui ont sabré les budgets formateurs tout en déployant de l'IA rapportent des résultats décevants.",
    },
    {
      heading: 'Ce que vous pouvez faire maintenant',
      text: "Trois actions concrètes : (1) Auditer vos dispositifs existants pour identifier où l'IA peut absorber la production répétitive (quiz, résumés, transcriptions). (2) Renforcer les rituels d'accompagnement synchrone là où l'IA prend du terrain. (3) Mettre en place un indicateur de qualité perçue par les apprenants pour détecter les glissements rapidement.",
    },
  ],
};

const RELATED = [
  { id: 'r1', title: 'Dossier complet : transformation IA des parcours',  description: 'Dossier · 22 min',   tone: 'warm'  as const, href: '/veille/dossier/1' },
  { id: 'r2', title: 'Tutoriel : construire un prompt pédagogique',        description: 'Vidéo · 12 min',     tone: 'sun'   as const, href: '/veille/video-tutorial/1' },
  { id: 'r3', title: 'L\'essor du microlearning dans les entreprises',     description: 'Article · 4 min',    tone: 'brand' as const, href: '/veille/article/2' },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const WeeklyNewsDetail: React.FC = () => {
  const navigate   = useNavigate();
  const { id = '1' } = useParams<{ id: string }>();
  const articleRef = useRef<HTMLDivElement>(null);
  const bookmarkKey = `weekly-news-${id}`;
  const saved   = useBookmarksStore((s) => s.ids.includes(bookmarkKey));
  const toggleBookmark = useBookmarksStore((s) => s.toggle);

  return (
    <PageShell width="medium" noPadTop={true} className="bg-surface">
      <ReadingProgressBar targetRef={articleRef} tone="brand" />

      <ReaderContextStrip
        title={ACTU.title}
        onBack={() => navigate(-1)}
        trailing={
          <>
            <ReadingProgressRing targetRef={articleRef} tone="brand" size={32} />
            <Button
              emphasis={saved ? 'soft' : 'outline'}
              iconOnly
              aria-label={saved ? 'Retirer le marque-page' : 'Ajouter aux marque-pages'}
              onClick={() => toggleBookmark(bookmarkKey)}
            >
              <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
            </Button>
            <Button emphasis="outline" iconOnly aria-label="Partager">
              <Share2 size={14} />
            </Button>
          </>
        }
      />

      {/* Un seul bord gauche : celui de la page (la gouttière de l'app). Ce
          conteneur en ajoutait une seconde, de 40 px. */}
      <div ref={articleRef} className="py-section">
        <EditorialLayout
          main={
            <div className="flex flex-col gap-section">

              {/* Hero éditorial — étiquettes → 8 → h1 → 12 → méta (ink-600 ;
                  elle était au cran 500 des placeholders). */}
              <header className="flex flex-col">
                <div className="flex items-center gap-stack-xs flex-wrap">
                  <MetaPill icon={<TrendingUp />} text={ACTU.week} tone="primary" />
                  <MetaPill text={ACTU.category} />
                  <Badge variant="danger">{ACTU.priority}</Badge>
                </div>

                <h1 className="mt-stack-xs font-display text-h1 text-ink-900 text-balance">
                  {ACTU.title}
                </h1>

                <div className="mt-stack-sm flex items-center gap-stack font-body text-caption text-ink-600 flex-wrap border-b border-ink-100 pb-stack">
                  <span className="inline-flex items-center gap-stack-2xs">
                    <CalendarDays size={14} /> {ACTU.date}
                  </span>
                  <span className="inline-flex items-center gap-stack-2xs">
                    <Clock3 size={14} /> {ACTU.readTime}
                  </span>
                </div>
              </header>

              {/* Intro callout */}
              <IntroCallout tone="brand">
                {ACTU.excerpt}
              </IntroCallout>

              {/* Featured image placeholder */}
              <div className="rounded-xl border border-ink-100 bg-gradient-to-br from-primary-50 via-white to-secondary-50/30 aspect-video flex items-center justify-center font-body text-caption text-ink-600">
                Visuel / illustration principale
              </div>

              {/* Body sections — trois sections : h2 28 (il était à 20),
                  16 avant le texte, 48 entre elles ; le texte principal en
                  ink-900 sur la largeur de lecture. */}
              <div className="flex flex-col gap-page">
                {ACTU.body.map((section, i) => (
                  <section key={i} className="flex flex-col gap-stack">
                    <h2 className="font-display text-h2 text-ink-900">
                      {section.heading}
                    </h2>
                    <p className="font-body text-body text-ink-900 max-w-prose">
                      {section.text}
                    </p>
                  </section>
                ))}
              </div>

              {/* Tags + source */}
              <footer className="flex flex-col gap-stack-xs pt-stack border-t border-ink-100">
                <div className="flex items-center gap-stack-2xs flex-wrap">
                  <TagIcon size={14} className="text-ink-400 shrink-0" />
                  {ACTU.tags.map((tag) => (
                    <MetaPill key={tag} text={tag} />
                  ))}
                </div>
                <Button
                  emphasis="soft" tone="warm"
                  size="sm"
                  trailingIcon={<ExternalLink size={14} />}
                  onClick={() => window.open(ACTU.sourceUrl, '_blank', 'noopener')}
                  className="self-start"
                >
                  Lire la source : {ACTU.sourceLabel}
                </Button>
              </footer>

            </div>
          }
          aside={
            /* Un libellé au-dessus de la liste, comme l'article : la carte
               titrée en h3 contenait elle-même des cartes. */
            <div className="flex flex-col gap-stack-sm">
              <p className="font-body text-caption font-semibold text-ink-600">À lire aussi</p>
              <RelatedItemList
                items={RELATED.map((r) => ({
                  ...r,
                  onClick: () => navigate(r.href),
                }))}
              />
            </div>
          }
        />
      </div>
    </PageShell>
  );
};

export default WeeklyNewsDetail;
