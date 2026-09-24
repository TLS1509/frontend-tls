/**
 * Magazine : Phase 10 Tier 2 refonte.
 *
 * Page landing du Magazine TLS (numéro courant) : pattern issue/numéro.
 *
 * Structure (per Figma audit) :
 *  1. Sticky glass header (back + bookmark + download)
 *  2. Full-bleed dark hero avec eyebrow + h1 + meta date/pages
 *  3. EditorialLayout asideFirst : Synthèse exécutive sticky gauche
 *     + Sommaire numéroté droite (NumberedArticleListItem)
 */

import React from 'react';
import { useBookmarksStore } from '../stores/persistence';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Download,
  ArrowRight,
  CalendarDays,
  FileText,
  Bookmark,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { Card } from '../components/core/Card';
import { ReaderContextStrip } from '../components/patterns/ReaderContextStrip';
import { PageShell } from '../components/layout';

/* ─── Data ───────────────────────────────────────────────────────────────── */

interface MagazineEntry {
  num: string;
  title: string;
  pages: string;
  tone: 'brand' | 'warm' | 'sun';
}

const SOMMAIRE: MagazineEntry[] = [
  { num: '01', title: "L'IA générative redéfinit la conception pédagogique",                pages: 'pp. 4–12',  tone: 'brand' },
  { num: '02', title: 'Micro-learning et neurosciences : ce que la science dit vraiment',   pages: 'pp. 14–22', tone: 'warm'  },
  { num: '03', title: "Portrait : 10 formateurs qui transforment leur pratique avec l'IA", pages: 'pp. 24–30', tone: 'sun'   },
  { num: '04', title: 'Outils du moment : comparatif des LMS nouvelle génération',         pages: 'pp. 32–40', tone: 'brand' },
  { num: '05', title: 'Tendances 2026 : ce qui va changer dans la formation professionnelle', pages: 'pp. 42–50', tone: 'warm'  },
  { num: '06', title: 'Tribune libre : quel futur pour le métier de formateur ?',           pages: 'pp. 52–56', tone: 'sun'   },
];

const SUMMARY_POINTS = [
  '6 thématiques approfondies',
  '12 formateurs interviewés',
  '3 études de cas inédites',
  'Outils & ressources inclus',
];

/* Le numéro d'un article est une seule encre (primary-800, une valeur de
   marque au cran 800) : il alternait teal, orange et or sans rien dire, au
   cran 600 qui ne porte pas de texte. Le survol garde le ton de l'article. */
const ENTRY_TONE: Record<'brand' | 'warm' | 'sun', { hover: string }> = {
  brand: { hover: 'hover:bg-primary-50' },
  warm:  { hover: 'hover:bg-secondary-50' },
  sun:   { hover: 'hover:bg-accent-50' },
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Magazine: React.FC = () => {
  const navigate = useNavigate();
  const bookmarkKey = 'magazine-current-issue';
  const saved = useBookmarksStore((s) => s.ids.includes(bookmarkKey));
  const toggleBookmark = useBookmarksStore((s) => s.toggle);

  /* Passe typographique du 24/09 — une page, deux sections :
     · la barre de lecture est ReaderContextStrip (elle était un PageShell dont
       la `flex-col` empilait « Retour » et les boutons hors de la barre) ;
     · le numéro ouvre sur un héros sombre à gouttière (le texte touchait le
       bord du bandeau), au pas de l'app : surtitre 13/600, h1 36 (il montait à
       64), chapô 18 et méta 13 en blanc plein (ils étaient à 75 et 70 %) ;
     · « Synthèse exécutive » et « Sommaire » sont les deux sections de la page,
       en h2 28 au-dessus de leur contenu — elles étaient deux cartes titrées
       en h3, et la page sautait du h1 au h3. */
  return (
    <PageShell width="page" noPadTop={true} className="bg-surface">
      <ReaderContextStrip
        title="L'IA au cœur de la formation"
        onBack={() => navigate('/veille')}
        backLabel="Retour à la veille"
        trailing={
          <div className="flex items-center gap-stack-xs">
            <Button emphasis="soft" size="sm" leadingIcon={<Download size={14} />} className="max-sm:hidden">
              Télécharger le PDF
            </Button>
            <Button
              emphasis={saved ? 'soft' : 'outline'}
              iconOnly
              size="sm"
              aria-label={saved ? 'Retirer le marque-page' : 'Ajouter aux marque-pages'}
              onClick={() => toggleBookmark(bookmarkKey)}
            >
              <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
            </Button>
            <Button emphasis="outline" iconOnly size="sm" aria-label="Partager">
              <Share2 size={14} />
            </Button>
          </div>
        }
      />

      {/* Héros du numéro — surtitre → 8 → h1 → 12 → chapô → 16 → méta. */}
      <section className="relative rounded-xl bg-gradient-to-br from-ink-900 via-primary-900 to-ink-800 overflow-hidden">
        {/* Decorative radial blobs : colored ambient — primary-300 et secondary-300,
            au rgb près ; carrés, donc l'ellipse de `bg-radial` est un cercle */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-pill opacity-25 pointer-events-none bg-radial from-primary-300/50 to-transparent to-70%"
        />
        <div
          aria-hidden
          className="absolute -bottom-16 -left-16 w-[350px] h-[350px] rounded-pill opacity-20 pointer-events-none bg-radial from-secondary-300/60 to-transparent to-70%"
        />

        <div className="relative px-stack-lg py-section sm:px-section sm:py-page flex flex-col">
          <p className="inline-flex items-center gap-stack-2xs self-start font-body text-caption font-semibold text-white">
            <BookOpen size={14} aria-hidden="true" />
            Magazine TLS · Édition printemps 2026
          </p>

          <h1 className="mt-stack-xs font-display text-h1 text-white max-w-content text-balance">
            L'IA au cœur de la formation
          </h1>

          <p className="mt-stack-sm font-body text-body-lg text-white max-w-prose">
            56 pages de recherches, portraits, analyses et tendances pour transformer vos
            pratiques pédagogiques en 2026.
          </p>

          <div className="mt-stack flex items-center gap-stack flex-wrap font-body text-caption text-white tabular-nums">
            <span className="inline-flex items-center gap-stack-2xs">
              <CalendarDays size={14} aria-hidden="true" /> Avril 2026
            </span>
            <span aria-hidden className="text-white/60">·</span>
            <span className="inline-flex items-center gap-stack-2xs">
              <FileText size={14} aria-hidden="true" /> 56 pages
            </span>
            <span aria-hidden className="text-white/60">·</span>
            <span className="inline-flex items-center gap-stack-2xs">
              <Download size={14} aria-hidden="true" /> 1 240 téléchargements
            </span>
          </div>
        </div>
      </section>

      {/* Body : Editorial layout aside-left (Synthèse) + Sommaire main */}
      <EditorialLayout
        asideFirst
        aside={
          <section className="flex flex-col gap-stack" aria-labelledby="magazine-synthese">
            <div className="flex flex-col gap-stack-3xs">
              <h2 id="magazine-synthese" className="font-display text-h2 text-ink-900">Synthèse exécutive</h2>
              <p className="font-body text-caption text-ink-600">Lecture rapide</p>
            </div>
            <Card className="flex flex-col gap-stack">
              <p className="font-body text-body text-ink-900">
                Ce numéro explore comment l'IA générative transforme concrètement le métier de
                formateur : de la conception des contenus à la personnalisation des parcours.
                Nos experts dressent un panorama complet des pratiques émergentes, soutenu par
                des données terrain et des témoignages de formateurs pionniers.
              </p>

              <ul className="flex flex-col gap-stack-xs">
                {SUMMARY_POINTS.map((point, i) => (
                  <li key={i} className="flex items-start gap-stack-xs font-body text-body text-ink-900">
                    {/* Calée sur la 1re ligne : (26 − 16) / 2. */}
                    <CheckCircle2 size={16} className="text-primary-700 shrink-0 mt-[5px]" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="pt-stack border-t border-ink-100">
                <Button emphasis="soft" size="sm" leadingIcon={<Download size={14} />}>
                  Télécharger le PDF
                </Button>
              </div>
            </Card>
          </section>
        }
        main={
          <section className="flex flex-col gap-stack" aria-labelledby="magazine-sommaire">
            <div className="flex flex-col gap-stack-3xs">
              <h2 id="magazine-sommaire" className="font-display text-h2 text-ink-900">Sommaire</h2>
              <p className="font-body text-caption text-ink-600 tabular-nums">6 articles · 56 pages</p>
            </div>
            {/* Des rangées dans une carte, sans marges négatives : la carte
                n'a pas de padding, chaque rangée porte le sien. */}
            {/* Une liste ordonnée : c'est elle qui dit le rang aux lecteurs
                d'écran ; le numéro affiché est son dessin (aria-hidden). */}
            <Card as="ol" className="flex flex-col gap-0 p-0 overflow-hidden divide-y divide-ink-100">
              {SOMMAIRE.map((item) => {
                const tone = ENTRY_TONE[item.tone];
                return (
                  <li key={item.num}>
                    <button
                      type="button"
                      onClick={() => navigate('/veille/magazine-article/1')}
                      className={[
                        'w-full flex items-start gap-stack px-stack-md sm:px-stack-lg py-stack text-left cursor-pointer transition-colors duration-base focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-500',
                        tone.hover,
                      ].join(' ')}
                    >
                      {/* Le numéro, sur la ligne du titre : son interligne est
                          ramené à sa taille pour que les deux partagent le haut. */}
                      <span aria-hidden="true" className="font-display text-h2 leading-none min-w-[40px] shrink-0 tabular-nums text-primary-800">
                        {item.num}
                      </span>
                      <span className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                        <span className="font-body text-body font-semibold text-ink-900 leading-snug">
                          {item.title}
                        </span>
                        <span className="font-body text-caption text-ink-600 italic tabular-nums">
                          {item.pages}
                        </span>
                      </span>
                      <ArrowRight size={14} className="text-ink-600 shrink-0 mt-1.5" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </Card>
          </section>
        }
      />
    </PageShell>
  );
};

export default Magazine;
