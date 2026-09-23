/**
 * MarketingHome — homepage de production, `/website` (route index).
 *
 * Contenu : copy validée de la fiche Notion « Accueil (Home) » (Website pages,
 * état du 28/07/2026). Le texte n'a pas été retouché ici — seule la composition
 * change.
 *
 * ── Reconstruction du 2026-07-29 ─────────────────────────────────────────────
 *
 * PLUS DE CARTES. C'est le changement principal. La page empilait des grilles de
 * cartes identiques (trois offres icône + rôle + titre + texte + lien) et des
 * blocs à filet supérieur repris de page en page. Les sites éditoriaux qui
 * respirent ne font pas ça : ils séparent par un filet, ou par rien, et laissent
 * le blanc grouper. Un contenant ne se justifie que s'il est cliquable ou s'il
 * doit se détacher du fond.
 *
 * UN SEUL FOND. La coque porte le dégradé ambiant ; toutes les sections sont
 * transparentes. La page ne s'interrompt plus tous les 600px.
 *
 * UN SEUL MOMENT SOMBRE. Il y en avait trois (hero vidéo, bandeau Learning App,
 * bloc chaud) : à la troisième occurrence le contraste ne contraste plus. Seul
 * le CTA final reste sombre, en fin de parcours, là où il conclut.
 *
 * PAS DE SUR-TITRE. Les quatre sur-titres en capitales de la proposition PAD
 * (NOTRE CONVICTION, NOTRE MOTEUR…) restent supprimés : une pastille en capitales
 * au-dessus de chaque section est le tic le plus reconnaissable des pages
 * générées. La numérotation de Learn → Do → Match est conservée, c'est la seule
 * du site : une vraie séquence ordonnée, pas du décor.
 *
 * Discipline : vous (pas tu), pas de métrique inventée, pas de client nommé,
 * pas d'em dash, CTA verbe+objet.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  useMarketingToast,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';
import { submitForm } from './utils/submitForm';

const SHELL = 'max-w-wide mx-auto px-gutter';

// ─── 1. Hero — ouverture typographique ───────────────────────────────────────
//
// La vidéo aquarelle a été retirée le 2026-07-29 (décision de Chloé). Ce qui
// part avec elle : la boucle MP4 en tête de page (coût LCP sur la première chose
// que voit un visiteur), le plancher ink-900 à 90 % qui virait l'aquarelle au
// gris-brun, le bouton pause imposé par WCAG 2.2.2 au-delà de cinq secondes
// d'animation, et le hero de 100dvh qui repoussait tout le contenu sous la ligne
// de flottaison.
//
// La demande d'une image d'ouverture n'est pas abandonnée : elle est remise à la
// phase de direction artistique, où sa forme sera choisie plutôt qu'héritée.

const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden">
      {/* Seul décor du hero : un halo très diffus qui donne un centre de gravité
          au cadre sans rien recouvrir. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-15%] h-[560px] w-[560px] rounded-pill bg-primary-200/35 blur-3xl"
      />
      <div className={`relative ${SHELL} pt-hero pb-chapter`}>
        <motion.div
          initial={reduced ? false : { y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-4xl flex-col gap-flow"
        >
          <p className="flex items-center gap-stack-xs font-body text-body-sm font-bold text-primary-800 m-0">
            <span aria-hidden className="h-px w-10 bg-secondary-500" />
            Studio expert en Skills-Based Organization
          </p>

          <h1
            className="font-display text-hero text-ink-900 [text-wrap:balance]"
            aria-label="Ne formez plus pour former. Bâtissez votre moteur de performance."
          >
            <span className="block">Ne formez plus pour former.</span>
            {/* primary-700 et non accent-400 : le jaune tenait sur un plancher
                sombre, il tombe sous AA dès que le fond devient clair. */}
            <span className="block text-primary-700">
              Bâtissez votre moteur de performance.
            </span>
          </h1>

          <p className="font-body text-lede text-ink-700 m-0 max-w-[58ch] [text-wrap:pretty]">
            Nous accompagnons les organisations dans leur transition vers un
            modèle centré sur les compétences. Ingénierie pédagogique, agents
            IA et transformation des organisations pour aligner enfin vos
            talents avec vos enjeux business.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs">
            <Button to="/website/contact" emphasis="solid" tone="brand" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Échanger sur votre projet SBO
            </Button>
            <Button to="/website/diagnostic" emphasis="outline" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
              Évaluer votre maturité
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── 2. Le manifeste ─────────────────────────────────────────────────────────
//
// Était un bandeau teal saturé pleine largeur. Devient une composition
// asymétrique : l'affirmation à gauche, la démonstration à droite. Le texte ne
// se lit plus sous le titre mais à côté — c'est ce qui distingue une page
// éditoriale d'un empilement de blocs.

const BENEFICES = ['Agilité retrouvée', 'Capital humain révélé', 'Symbiose Humain-IA'];

const Manifeste: React.FC = () => (
  <section>
    <div className={`${SHELL} py-band flex flex-col gap-flow`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-flow items-start">
        <FadeInWhenVisible className="lg:col-span-6">
          <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
            La fiche de poste ne suffit plus. L'avenir appartient aux
            compétences.
          </h2>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.08} className="lg:col-span-6 lg:pt-2">
          <p className="font-body text-lede text-ink-700 m-0 [text-wrap:pretty]">
            Face à l'obsolescence rapide des savoirs et à l'accélération de
            l'IA, les fiches de poste traditionnelles ne suffisent plus. Les
            organisations les plus performantes ne gèrent plus des titres :
            elles déploient des compétences fluides et actionnables. Bâtir une
            Skills-Based Organization, c'est arrêter de parier sur les diplômes
            pour se concentrer sur l'impact réel.
          </p>
        </FadeInWhenVisible>
      </div>

      {/* Trois bénéfices sur un filet unique. Ils étaient dans des bulles
          d'icônes : trois contenants pour trois mots. */}
      <FadeInWhenVisible delay={0.12}>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-group border-t border-ink-200 pt-flow m-0 p-0 list-none">
          {BENEFICES.map((b) => (
            <li key={b} className="font-display text-feature text-primary-800">
              {b}
            </li>
          ))}
        </ul>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── 3. Le moteur — Learn → Do → Match ───────────────────────────────────────
//
// La seule numérotation du site, et elle est méritée : c'est une séquence
// ordonnée, pas un décor de section. Les trois étapes pendent sous un filet
// continu au lieu de porter chacune son propre `border-t-2` — ce motif était
// repris tel quel sur quatre pages.

const ETAPES = [
  {
    num: '01',
    verbe: 'Learn',
    sousTitre: 'Acquérir',
    detail: "L'apprentissage ciblé via notre ingénierie pédagogique spécialisée.",
  },
  {
    num: '02',
    verbe: 'Do',
    sousTitre: 'Prouver',
    detail: "Application immédiate sur les projets réels de l'entreprise.",
  },
  {
    num: '03',
    verbe: 'Match',
    sousTitre: 'Allouer',
    detail:
      "Passeport de compétences dynamique aujourd'hui ; demain, des agents IA qui recommanderont la meilleure allocation de talents sur vos projets.",
  },
];

const Moteur: React.FC = () => (
  <section>
    <div className={`${SHELL} py-band flex flex-col gap-flow`}>
      <FadeInWhenVisible>
        <h2 className="font-display text-section text-ink-900 [text-wrap:balance] max-w-3xl">
          Le cycle <span className="text-primary-700">Learn → Do → Match</span> :
          la formation devient un actif stratégique.
        </h2>
      </FadeInWhenVisible>

      <ol className="grid grid-cols-1 md:grid-cols-3 gap-flow border-t border-ink-300 pt-flow m-0 p-0 list-none">
        {ETAPES.map((e, i) => (
          <FadeInWhenVisible key={e.verbe} delay={i * 0.08} direction="up">
            <li className="flex flex-col gap-group">
              <span className="font-body text-caption font-bold tabular-nums text-primary-500">
                {e.num}
              </span>
              <h3 className="font-display text-title text-ink-900">
                {e.verbe}
                <span className="block font-body text-body-sm font-bold text-secondary-600 mt-1">
                  {e.sousTitre}
                </span>
              </h3>
              <p className="font-body text-body text-ink-600 m-0">{e.detail}</p>
            </li>
          </FadeInWhenVisible>
        ))}
      </ol>
    </div>
  </section>
);

// ─── 4. L'écosystème d'offres ────────────────────────────────────────────────
//
// Trois cartes-liens identiques (icône + rôle + titre + texte + flèche) sont
// devenues trois rangées séparées par un filet. Chaque offre occupe toute la
// largeur, respire, et se lit dans l'ordre plutôt qu'en balayage. Le survol
// n'a plus besoin de soulever une boîte : le titre passe en teal et la flèche
// avance.

type Offre = { title: string; role: string; desc: string; link: string; cta: string };

// ⚠️ STRIDE reste dans cette liste mais **n'y est plus une offre** : D10 la
// gèle « pour 2027, cible 2028 », donc la carte a été reformulée en méthode
// (rôle « Notre méthode », CTA vers les six étapes). Deux résolutions de ce
// problème ont coexisté sur deux branches le 16/09 ; celle-ci est retenue —
// trois cartes tiennent mieux le rythme qu'une liste de deux suivie d'une
// ligne isolée.
//
// ⏳ Le Sprint OS & Agents IA — l'offre Studio vendable — a sa page depuis le
// 16/09 (`/website/sprint`). Elle n'entre dans cette liste qu'en **janvier
// 2027**, au lancement de l'offre : décidé le 16/09. L'ajouter avant ferait
// vendre ce qui n'est pas encore vendable. Tâche Notion « Publier la page
// Sprint », échéance 04/01/2027.
//
// La Marketplace Notion, elle, n'aura pas de page — tranché le 16/09. Session 3
// pose que les templates sont publiés au nom propre et « non mis en avant sur
// le site vitrine ». Ne pas la rajouter ici en croyant combler un trou.
const OFFRES: Offre[] = [
  // ⚠️ 16/09/2026 — cette carte vendait STRIDE comme une offre (« Audit &
  // stratégie », « livrables tangibles à chaque jalon »). STRIDE est gelée
  // jusqu'en 2028 : elle est reformulée en méthode. La refonte des trois
  // piliers de l'accueil (Tech & SaaS · Upskilling · Studio, arrêtés le 31/08)
  // reste à faire et dépend de l'arbitrage de nav — voir SITEMAP-V1.md §1 bis.
  {
    title: 'La méthode STRIDE',
    role: 'Notre méthode',
    desc:
      "Six étapes pour relier compétences réelles et déploiement IA, de l'orientation à l'amélioration continue. C'est le cadre que suivent nos projets.",
    link: '/website/accompagnement',
    cta: 'Découvrir les six étapes',
  },
  {
    title: 'Le Studio IA & Pédagogie',
    role: 'Production & déploiement',
    desc:
      'Contenus pédagogiques sur-mesure, agents IA métiers et intégration dans votre écosystème : une production opérationnelle, clé en main.',
    link: '/website/studio',
    cta: 'Visiter le Studio',
  },
  {
    title: 'Upskilling sur-mesure',
    role: 'Formation interne',
    desc:
      "Des projets d'upskilling sur-mesure qui commencent par habiliter vos concepteurs et formateurs, pilotés par la Learning App.",
    link: '/website/upskilling',
    cta: 'Former vos équipes',
  },
];

const Ecosysteme: React.FC = () => (
  <section>
    <div className={`${SHELL} py-band flex flex-col gap-flow`}>
      <FadeInWhenVisible>
        <h2 className="font-display text-section text-ink-900 [text-wrap:balance] max-w-3xl">
          Tout ce dont vous avez besoin pour opérer votre transition SBO.
        </h2>
      </FadeInWhenVisible>

      <ul className="flex flex-col m-0 p-0 list-none">
        {OFFRES.map((o, i) => (
          <FadeInWhenVisible key={o.title} delay={i * 0.06}>
            <li className="border-t border-ink-200">
              <Link
                to={o.link}
                className="group grid grid-cols-1 md:grid-cols-12 gap-group md:gap-flow py-flow rounded-xl transition-colors duration-base focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
              >
                <div className="md:col-span-5 flex flex-col gap-rule">
                  <span className="font-body text-caption font-bold text-secondary-600">
                    {o.role}
                  </span>
                  <h3 className="font-display text-title text-ink-900 transition-colors duration-base group-hover:text-primary-700">
                    {o.title}
                  </h3>
                </div>
                <p className="md:col-span-5 font-body text-body text-ink-600 m-0">
                  {o.desc}
                </p>
                <span className="md:col-span-2 flex items-start md:justify-end font-body text-body-sm font-semibold text-primary-700">
                  <span className="inline-flex items-center gap-stack-2xs">
                    {o.cta}
                    <ArrowRight
                      size={16}
                      className="shrink-0 transition-transform duration-base group-hover:translate-x-1"
                    />
                  </span>
                </span>
              </Link>
            </li>
          </FadeInWhenVisible>
        ))}
      </ul>

      {/* Learning App — change de registre parce qu'elle change de nature : les
          deux au-dessus sont des prestations, celle-ci est l'outil qui les
          ancre. D11 (31/08) la retire du modèle d'abonnement — le texte ne
          promet donc plus de « passer à l'échelle », il dit ce qu'elle fait. */}
      <FadeInWhenVisible delay={0.1}>
        <Link
          to="/website/learning-app"
          className="group flex flex-col sm:flex-row sm:items-end justify-between gap-flow rounded-xl bg-primary-50 ring-1 ring-primary-100 p-flow transition-colors duration-base hover:bg-primary-100/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          <div className="flex flex-col gap-group max-w-2xl">
            <h3 className="font-display text-title text-ink-900 [text-wrap:balance]">
              Ce qui a été appris ne se perd pas.
            </h3>
            <p className="font-body text-body text-ink-600 m-0">
              Veille continue, apprentissage par l'action et Passeport de
              compétences vivant : la Learning App ancre les compétences
              acquises et les rend mesurables dans la durée.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-stack-2xs font-body text-body-sm font-semibold text-primary-700">
            Découvrir la Learning App
            <ArrowRight size={16} className="transition-transform duration-base group-hover:translate-x-1" />
          </span>
        </Link>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── 5. Réassurance ──────────────────────────────────────────────────────────
//
// Le bloc partenaire C-Campus était une carte teintée avec bulle d'icône. Il
// devient un encart séparé par un filet vertical : même distinction, sans
// contenant.

const Reassurance: React.FC = () => (
  <section>
    <div className={`${SHELL} py-band`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-flow items-start">
        <div className="lg:col-span-7 flex flex-col gap-flow">
          <FadeInWhenVisible>
            <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
              L'alliance de l'ingénierie pédagogique de pointe et de
              l'Intelligence Artificielle.
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <div className="flex flex-col gap-flow">
              <p className="font-body text-lede text-ink-700 m-0 max-w-2xl [text-wrap:pretty]">
                Fondée par Chloé Mimault et Pierre-Armand Dennery : la recherche
                en ingénierie pédagogique, l'architecture IA et la transformation
                des organisations, réunies dans une même structure experte.
              </p>
              <div>
                <Button to="/website/equipe" emphasis="outline" size="md" trailingIcon={<ArrowRight size={16} />}>
                  Rencontrer les fondateurs
                </Button>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        <FadeInWhenVisible delay={0.12} className="lg:col-span-4 lg:col-start-9">
          <div className="flex flex-col gap-group border-t lg:border-t-0 lg:border-l border-ink-200 pt-flow lg:pt-0 lg:pl-flow">
            <h3 className="font-display text-feature text-ink-900">
              Partenaire stratégique de C-Campus
            </h3>
            <p className="font-body text-body text-ink-600 m-0">
              Référence française de l'ingénierie de formation et de l'AFEST,
              C-Campus certifie les dispositifs que nous concevons ensemble.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  </section>
);

// ─── 6. Double CTA — bloc chaud (RDV B2B) + bloc froid (La Vigie IA) ─────────
//
// Le seul fond sombre de la page, et il arrive en dernier : c'est le moment où
// l'on conclut. Le bloc froid, lui, sort de sa carte teintée et se pose
// simplement à côté, séparé par un filet.

const DoubleCta: React.FC = () => {
  const toast = useMarketingToast();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  // L'inscription part réellement (Web3Forms) : le toast de succès est
  // conditionné au retour du service, jamais affiché à l'aveugle.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || sending) return;
    setSending(true);
    const { ok, error } = await submitForm({
      name: email.trim(),
      email: email.trim(),
      subject: 'Inscription La Vigie IA',
      _source: 'vigie-home',
    });
    setSending(false);
    if (ok) {
      toast.push({ tone: 'success', message: 'Merci, votre inscription à La Vigie IA est enregistrée.' });
      setEmail('');
    } else {
      toast.push({
        tone: 'danger',
        message: "L'inscription n'a pas pu être enregistrée.",
        description: error ?? 'Réessayez ou écrivez-nous à contact@thelearningsociety.fr.',
      });
    }
  };

  return (
    <section>
      <div className={`${SHELL} pb-chapter`}>
        <FadeInWhenVisible>
          <div className="rounded-xl bg-ink-900 text-white p-flow sm:p-band">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-flow items-start">
              {/* Bloc chaud */}
              <div className="lg:col-span-7 flex flex-col gap-flow">
                <h2 className="font-display text-section text-white [text-wrap:balance]">
                  Prêt à transformer votre organisation ?
                </h2>
                <p className="font-body text-lede text-white/75 m-0 max-w-xl [text-wrap:pretty]">
                  Trente minutes avec les fondateurs pour comprendre votre
                  contexte et tracer le chemin le plus court vers l'impact.
                  Sans engagement.
                </p>
                <div className="flex flex-col gap-group">
                  <div>
                    <Button to="/website/contact" emphasis="solid" tone="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Planifier un échange de 30 min
                    </Button>
                  </div>
                  <p className="font-body text-body-sm text-white/75 m-0">
                    Pas encore prêt ?{' '}
                    <Link
                      to="/website/diagnostic"
                      className="font-bold text-accent-400 underline underline-offset-4 transition-colors duration-fast hover:text-accent-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
                    >
                      Évaluez d'abord votre maturité en 3 minutes
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Bloc froid — séparé par un filet, pas par une carte */}
              <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-flow border-t lg:border-t-0 lg:border-l border-white/15 pt-flow lg:pt-0 lg:pl-flow">
                <div className="flex flex-col gap-group">
                  <h3 className="font-display text-feature text-white">
                    Restez en veille.
                  </h3>
                  <p className="font-body text-body text-white/70 m-0">
                    Abonnez-vous à La Vigie IA pour recevoir nos meilleures
                    analyses sur l'IA, les compétences et le futur du travail.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-stack-xs">
                  <label htmlFor="home-vigie-email" className="sr-only">
                    Votre adresse email professionnelle
                  </label>
                  {/* `name` + `autoComplete` + `spellCheck` : même raison que sur
                      la page Contact (2026-07-29). Le remplissage automatique ne
                      se déclenche pas sans eux, et un correcteur orthographique
                      souligne l'adresse en rouge comme si elle était fautive. */}
                  <input
                    id="home-vigie-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email professionnel"
                    className="h-12 w-full rounded-lg border border-white/25 bg-white/10 px-stack-md font-body text-body text-white placeholder:text-white/55 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
                  />
                  <Button type="submit" emphasis="solid" tone="warm" size="lg" fullWidth disabled={sending} trailingIcon={<ArrowRight size={18} />}>
                    {sending ? 'Envoi en cours…' : "S'abonner à La Vigie IA"}
                  </Button>
                  <Link
                    to="/website/vigie"
                    className="inline-flex min-h-[24px] items-center font-body text-caption text-white/70 transition-colors duration-fast hover:text-white w-fit"
                  >
                    Découvrir La Vigie IA
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export const MarketingHome: React.FC = () => (
  <>
    <SEOHead
      title="The Learning Society · Studio expert en Skills-Based Organization"
      description="Ne formez plus pour former. Ingénierie pédagogique, agents IA et transformation des organisations pour bâtir votre Skills-Based Organization."
      canonical="/website"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'The Learning Society',
        url: 'https://thelearningsociety.fr',
        logo: 'https://thelearningsociety.fr/favicon.svg',
        description:
          'Studio expert en Skills-Based Organization : studio IA & pédagogie, upskilling sur-mesure, et la Learning App qui ancre les compétences acquises.',
        foundingYear: 2022,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '26 bis, rue Olivier Noyer',
          addressLocality: 'Paris',
          postalCode: '75014',
          addressCountry: 'FR',
        },
        sameAs: ['https://www.linkedin.com/company/thelearningsociety'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'contact@thelearningsociety.fr',
          availableLanguage: 'French',
        },
      }}
    />

    <Hero />
    <Manifeste />
    <Moteur />
    <Ecosysteme />
    <Reassurance />
    <DoubleCta />
  </>
);

export default MarketingHome;
