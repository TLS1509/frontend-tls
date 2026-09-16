/**
 * MarketingAccompagnement — page "Accompagnement STRIDE", /website/accompagnement.
 *
 * Reconstruite le 28/07/2026 depuis le copy arbitré
 * PAD-page-accompagnement-stride.md (docs/site/propositions-PAD/).
 * Tone primary (conseil / leadership). Libellé nav provisoire :
 * "Déploiement IA & SBO" (piste réunion 28/07, RECAP §2).
 *
 * Écarts copy documentés :
 *  - "D — Déploiement" → "D — Déployer" (FACTS-CANON A2 : les 6 mots officiels
 *    sont S'orienter · Tester · Réaliser · Intégrer · Déployer · Évoluer) ;
 *  - "Open Badges 2.0" (bonus) → "Open Badge" (FACTS-CANON F6).
 *
 * ── Passe rythme & fond du 2026-07-29 ────────────────────────────────────────
 * Première page portée sur le système éditorial. Trois choses ont changé, et
 * aucune ne touche au texte.
 *
 * 1. LES FONDS SONT PARTIS. La page alternait `primary-50` → `ink-900` → blanc →
 *    `primary-50/50` → blanc ×3 : sept bandes de couleur qui la découpaient en
 *    chapitres sans rapport. Tout est transparent désormais, et le dégradé
 *    ambiant de la coque traverse la page d'un bout à l'autre.
 *    La bande sombre pleine largeur de la section 2 a disparu : elle occupait la
 *    même position, avec la même couleur et le même rôle, sur les quatre
 *    sous-pages du site. C'était l'élément le plus répétitif de l'ensemble.
 *    Le bloc CTA reste sombre : une carte contenue est une ponctuation, une
 *    bande pleine largeur était un refrain.
 *
 * 2. LE RYTHME PASSE SUR L'ÉCHELLE ÉDITORIALE. `py-band` (64→120px) remplace
 *    `py-16 sm:py-20 lg:py-28`, et surtout `gap-flow` (32→56px) remplace
 *    `gap-section-lg`, qui plafonnait à 40px. C'est l'écart entre un titre de
 *    section et son contenu : il était le même que celui entre deux cartes.
 *
 * 3. LA TYPO PASSE SUR L'ÉCHELLE. Cette page portait quatre `clamp()` écrits à
 *    la main, dont deux qui ne différaient que de 0,6vw. Elles deviennent
 *    `text-hero` / `text-section` / `text-feature` / `text-lede`.
 *
 * ── Rétrogradation du 2026-09-16 : la page cesse de vendre ───────────────────
 * Le catalogue arrêté le 31/08/2026 classe **STRIDE / SBO Global (30 000 € HT)
 * « gelée pour 2027, cible 2028 »**, et abandonne le mot « conseil » au profit
 * de « studio ». Cette page vendait donc une offre que l'entreprise ne prend
 * plus : Audit Flash chiffré, livrables, CTA d'achat, accès Learning App inclus.
 *
 * Elle devient une **page de méthode**. Ce qui reste : la thèse (le double
 * piège), la séquence STRIDE en six étapes, et à qui elle s'adresse. Ce qui
 * part :
 *  - la section « Audit Flash » — un produit daté et chiffré (0,5 à 1 jour) ;
 *  - la section « Ce que vous obtenez » — une liste de livrables contractuels,
 *    plus le bonus « un an d'accès offert à la Learning App », qui portait en
 *    prime une incohérence connue (6 mois ailleurs, 6 à 12 mois dans la Prez) ;
 *  - les deux CTA « Réserver un Audit Flash STRIDE ».
 *
 * ⚠️ Ce qui N'EST PAS tranché, et qu'il ne faut donc pas faire ici : une fois
 * dépouillée, cette page raconte à peu près ce que raconte `/website/methode`.
 * Fusionner les deux est une décision de design qui n'a pas été prise. En
 * attendant, les deux coexistent et se lient l'une à l'autre.
 *
 * L'offre Studio réellement vendable est le **Pack Sprint OS & Agents IA**
 * (7 500 € HT minimum, lancement janvier 2027) — elle n'a pas encore de page.
 * Voir docs/site/SITEMAP-V1.md §1 bis.
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  FileText,
  School,
  UserRound,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible } from '../../components/marketing/motion';
import { GRID_CONTAINER } from '../../lib/grid-columns';
import { SEOHead } from './components/SEOHead';

const SHELL = 'max-w-wide mx-auto px-4 sm:px-6 lg:px-10';

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

/**
 * Hero — l'acronyme EST le hero.
 *
 * Les sept sous-pages partageaient le même gabarit : blob flou, pastille de
 * sur-titre, H1, sous-titre, rangée de boutons. Sept pages qui s'ouvrent de la
 * même manière n'ont pas d'ouverture — elles ont un en-tête.
 *
 * Ici la matière est donnée : six lettres qui épellent le nom de la méthode, et
 * qui sont déjà la meilleure ressource visuelle du site. Elles montent en tête
 * de page et deviennent l'objet qu'on regarde en premier. Le sous-titre n'est
 * plus un paragraphe de plus sous le titre : il légende la séquence.
 *
 * La pastille de sur-titre disparaît — l'acronyme dit à lui seul où l'on est.
 */
const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden">
      <div className={`relative ${SHELL} pt-hero pb-band`}>
        <div className="flex max-w-4xl flex-col gap-flow">
          {/* La séquence, en ouverture. `aria-hidden` : les six verbes sont
              annoncés en toutes lettres par la section Méthodologie — les
              répéter ici en lettres isolées ferait épeler « S T R I D E » à un
              lecteur d'écran sans rien lui apprendre. */}
          <ol aria-hidden className="flex flex-wrap items-center gap-stack-xs m-0 p-0 list-none">
            {ETAPES.map((e, i) => (
              <motion.li
                key={e.lettre}
                initial={reduced ? false : { y: 16 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-primary-700 font-display text-h2 font-extrabold text-white sm:h-20 sm:w-20"
              >
                {e.lettre}
              </motion.li>
            ))}
          </ol>

          <motion.div
            initial={reduced ? false : { y: 24 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-flow"
          >
            <h1 className="font-display text-hero text-ink-900 [text-wrap:balance]">
              Six étapes pour relier{' '}
              <span className="text-primary-700">compétences réelles et déploiement IA.</span>
            </h1>
            <p className="font-body text-lede text-ink-700 m-0 max-w-2xl [text-wrap:pretty]">
              S'orienter, tester, réaliser, intégrer, déployer, évoluer. C'est la
              méthode que nous suivons pour faire sauter les verrous de la fiche
              de poste et installer des copilotes IA là où le travail se fait.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs">
              <Button href="#stride-etapes" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Découvrir les six étapes
              </Button>
              <Button to="/website/methode" variant="ghost" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
                La science derrière la méthode
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── 2. Le double piège ──────────────────────────────────────────────────────

const PIEGES = [
  {
    icon: <Bot size={20} />,
    title: "Déployer des outils IA à l'aveugle",
    detail:
      'Sans cadre ni référentiel de compétences, les licences dorment, le Shadow AI prolifère et le ROI reste introuvable.',
  },
  {
    icon: <FileText size={20} />,
    title: 'Passer au SBO avec des méthodes manuelles',
    detail:
      'Cartographier des compétences au tableur prend dix-huit mois : épuisement des équipes RH, rejet des managers, données mortes à la livraison.',
  },
];

const DoublePiege: React.FC = () => (
  <section className="relative">
    <div className={`${SHELL} py-band`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-flow items-start">
        <div className="lg:col-span-5">
          <FadeInWhenVisible>
            <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
              L'IA sans SBO est un gadget.{' '}
              <span className="text-primary-700">Le SBO sans IA est trop lent.</span>
            </h2>
          </FadeInWhenVisible>
        </div>
        <div className="lg:col-span-7 flex flex-col">
          {PIEGES.map((p, i) => (
            <FadeInWhenVisible key={p.title} delay={i * 0.08}>
              <div className="flex items-start gap-stack-lg border-t border-ink-200 py-flow first:border-t-0 first:pt-0">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                  {p.icon}
                </span>
                <div className="flex flex-col gap-group">
                  <h3 className="font-display text-feature text-ink-900">{p.title}</h3>
                  <p className="font-body text-body text-ink-600 leading-relaxed m-0 max-w-xl">{p.detail}</p>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* La section « L'Audit Flash » vivait ici. Retirée le 16/09/2026 : elle vendait
   un produit daté (« une demi-journée à une journée ») et chiffré, sur une offre
   gelée jusqu'en 2028. Voir l'en-tête du fichier. */

// ─── 3. La méthodologie STRIDE — 6 étapes, vraie séquence ────────────────────

const ETAPES: { lettre: string; verbe: string; phase: string; livrable: string }[] = [
  {
    lettre: 'S',
    verbe: "S'orienter",
    phase: 'Audit & cadrage',
    livrable: "Rapport d'audit et feuille de route 12-24 mois",
  },
  {
    lettre: 'T',
    verbe: 'Tester',
    phase: 'POC pilote',
    livrable: 'Dispositif pilote validé sur un périmètre réel',
  },
  {
    lettre: 'R',
    verbe: 'Réaliser',
    phase: 'Ingénierie & copilotes',
    livrable: 'Référentiel dynamique et Agents IA configurés',
  },
  {
    lettre: 'I',
    verbe: 'Intégrer',
    phase: 'Connexion stack tech',
    livrable: 'Stack interconnectée (LMS, SIRH, outils métiers)',
  },
  {
    lettre: 'D',
    verbe: 'Déployer',
    phase: 'Mise en production',
    livrable: "Dispositif déployé et dashboard d'engagement",
  },
  {
    lettre: 'E',
    verbe: 'Évoluer',
    phase: 'Amélioration par la donnée',
    livrable: 'Executive Dashboard et backlog mensuel',
  },
];

const Methodologie: React.FC = () => (
  <section id="stride-etapes" className="scroll-mt-28">
    <div className={`${SHELL} py-band flex flex-col gap-flow`}>
      <FadeInWhenVisible>
        <h2 className="font-display text-section text-ink-900 [text-wrap:balance] max-w-3xl">
          Six étapes, un livrable tangible à chaque jalon.
        </h2>
      </FadeInWhenVisible>

      {/* Conteneur mesuré : la séquence répond à SA largeur, pas à celle de la
          fenêtre. Deux boîtes obligatoires — une requête de conteneur remonte à
          l'ancêtre le plus proche, jamais à l'élément qui la porte. */}
      <div className={GRID_CONTAINER}>
        <ol className="relative flex flex-col m-0 p-0 list-none">
          {ETAPES.map((e, i) => {
            const premier = i === 0;
            const dernier = i === ETAPES.length - 1;
            return (
              // Le `<li>` porte la liste, la motion vit à l'intérieur.
              // `FadeInWhenVisible` rend une `<div>` : l'envelopper autour du
              // `<li>` produisait `<ol><div><li>`, invalide, et neutralisait
              // les sélecteurs de position sur l'item.
              <li key={e.lettre} className="relative">
                {/* L'épine dorsale — c'est elle qui fait la différence entre une
                    liste et une séquence. Elle passe au centre des pastilles
                    (left-7 = la moitié de w-14) et s'arrête au centre de la
                    première et de la dernière plutôt que de déborder. */}
                <span
                  aria-hidden
                  className={[
                    // `-translate-x-1/2` recentre le filet sur l'axe : `left-7`
                    // pose son BORD à 28 px, pas son axe — l'épine passait 1 px
                    // à droite du centre des pastilles.
                    'absolute left-7 -translate-x-1/2 w-px bg-primary-200',
                    premier ? 'top-1/2' : 'top-0',
                    dernier ? 'bottom-1/2' : 'bottom-0',
                  ].join(' ')}
                />
                <FadeInWhenVisible
                  delay={i * 0.04}
                  className="relative grid grid-cols-[auto_minmax(0,1fr)] @3xl:grid-cols-[auto_240px_minmax(0,1fr)] items-center gap-stack @3xl:gap-flow py-stack-lg"
                >
                  {/* `rounded-lg` et non `rounded-2xl` : 56 px de côté, donc
                      au-dessus du seuil des 28 px où le rayon cesse d'être un
                      accident de plafonnement. Au-dessus, il prend l'échelle —
                      la même que la Card et le Button (14 px). */}
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary-700 font-display text-h3 font-extrabold text-white">
                    {e.lettre}
                  </span>
                  <div className="flex flex-col gap-tight">
                    <h3 className="font-display text-feature text-ink-900">{e.verbe}</h3>
                    <span className="font-body text-caption font-bold text-primary-700">
                      {String(i + 1).padStart(2, '0')} · {e.phase}
                    </span>
                  </div>
                  <p className="col-span-2 @3xl:col-span-1 font-body text-body text-ink-600 leading-relaxed m-0">
                    {e.livrable}
                  </p>
                </FadeInWhenVisible>
              </li>
            );
          })}
        </ol>
      </div>

      <FadeInWhenVisible>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-stack rounded-lg bg-white/70 p-stack-lg ring-1 ring-primary-100">
          <p className="font-body text-body text-ink-600 m-0 max-w-xl">
            Pourquoi ces six étapes ? La science derrière STRIDE : échelle
            Dreyfus, méthode EDRACT de C-Campus et augmentation cognitive.
          </p>
          <Button to="/website/methode" variant="ghost" size="md" trailingIcon={<ArrowRight size={16} />}>
            Lire la Méthode TLS
          </Button>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

/* La section « Ce que vous obtenez » vivait ici. Retirée le 16/09/2026 : quatre
   livrables contractuels et un bonus « un an d'accès offert à la Learning App »
   — un engagement commercial sur une offre gelée, et un chiffre qui contredisait
   les 6 mois annoncés ailleurs. Voir l'en-tête du fichier. */

// ─── 4. Pour qui ─────────────────────────────────────────────────────────────

const PROFILS = [
  {
    icon: <UserRound size={20} />,
    title: 'DRH & Directeurs L&D',
    detail: 'Vous voulez sortir du catalogue et piloter des compétences réelles.',
  },
  {
    icon: <Building2 size={20} />,
    title: 'CEO, COO & Directeurs de la Transformation',
    detail: 'Vous cherchez un déploiement IA qui produise un ROI observable.',
  },
  {
    icon: <School size={20} />,
    title: 'Organismes de Formation',
    detail: 'Vous voulez faire évoluer votre offre vers la preuve de compétence.',
  },
];

const PourQui: React.FC = () => (
  <section>
    <div className={`${SHELL} py-band flex flex-col gap-flow`}>
      <FadeInWhenVisible>
        <h2 className="font-display text-section text-ink-900 [text-wrap:balance] max-w-2xl">
          À qui cette méthode s'adresse.
        </h2>
      </FadeInWhenVisible>
      {/* Traitement volontairement différent des cartes de l'Audit Flash
          (filet supérieur) : trois grilles identiques sur une même page se
          lisent comme un gabarit, pas comme une composition. Ici la liste
          respire sans contenant. */}
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-flow m-0 p-0 list-none">
        {PROFILS.map((p, i) => (
          <FadeInWhenVisible key={p.title} delay={i * 0.06} direction="up">
            <li className="flex h-full flex-col gap-group">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-pill bg-primary-100 text-primary-700">
                {p.icon}
              </span>
              <h3 className="font-display text-feature text-ink-900">{p.title}</h3>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0">{p.detail}</p>
            </li>
          </FadeInWhenVisible>
        ))}
      </ul>
    </div>
  </section>
);

// ─── 5. CTA final ────────────────────────────────────────────────────────────

/* Le CTA vendait l'Audit Flash. Il pointe désormais vers ce qui existe
   réellement au catalogue — un projet d'upskilling — et vers une conversation.
   Une méthode se raconte ; elle ne se commande pas. */
const CtaFinal: React.FC = () => (
  <section>
    <div className={`${SHELL} py-band`}>
      <FadeInWhenVisible>
        <div className="relative overflow-hidden rounded-lg bg-ink-900 text-white px-6 sm:px-10 lg:px-16 py-band">
          <div className="relative max-w-content flex flex-col gap-flow">
            <h2 className="font-display text-section text-white [text-wrap:balance]">
              Cette méthode structure tout ce que nous livrons.
            </h2>
            <p className="font-body text-lede text-white/80 m-0 max-w-2xl [text-wrap:pretty]">
              Elle cadre nos projets d'upskilling comme nos productions Studio.
              Un premier échange suffit à voir ce qu'elle donnerait chez vous.
            </p>
            <div className="flex flex-wrap items-center gap-stack-xs">
              <Button to="/website/contact" variant="secondary" size="xl" trailingIcon={<ArrowRight size={20} />}>
                Parler de votre contexte
              </Button>
              <Button to="/website/upskilling" variant="glass" size="xl" trailingIcon={<ArrowUpRight size={20} />}>
                Voir les projets d'upskilling
              </Button>
            </div>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

export const MarketingAccompagnement: React.FC = () => (
  <>
    <SEOHead
      title="La méthode STRIDE · The Learning Society"
      description="STRIDE en six étapes : s'orienter, tester, réaliser, intégrer, déployer, évoluer. La méthode que nous suivons pour relier compétences réelles et déploiement IA dans une organisation."
      canonical="/website/accompagnement"
    />
    <Hero />
    <DoublePiege />
    <Methodologie />
    <PourQui />
    <CtaFinal />
  </>
);

export default MarketingAccompagnement;
