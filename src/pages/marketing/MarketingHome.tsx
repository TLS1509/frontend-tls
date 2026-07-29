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
            Cabinet de conseil &amp; studio expert en Skills-Based Organization
          </p>

          <h1
            className="font-display text-hero text-ink-900 m-0 [text-wrap:balance]"
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
            modèle centré sur les compétences. Conseil stratégique, création
            pédagogique sur-mesure et Intelligence Artificielle pour aligner
            enfin vos talents avec vos enjeux business.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs">
            <Button to="/website/contact" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Échanger sur votre projet SBO
            </Button>
            <Button to="/website/diagnostic" variant="ghost" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
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

const BENEFICES = ['Agilité décuplée', 'Capital humain révélé', 'Symbiose Humain-IA'];

const Manifeste: React.FC = () => (
  <section>
    <div className={`${SHELL} py-band flex flex-col gap-flow`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-flow items-start">
        <FadeInWhenVisible className="lg:col-span-6">
          <h2 className="font-display text-section text-ink-900 m-0 [text-wrap:balance]">
            Le poste est mort. L'avenir appartient aux compétences.
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
      'Passeport de compétences dynamique et agents IA pour recommander la meilleure allocation de talents sur les futurs projets.',
  },
];

const Moteur: React.FC = () => (
  <section>
    <div className={`${SHELL} py-band flex flex-col gap-flow`}>
      <FadeInWhenVisible>
        <h2 className="font-display text-section text-ink-900 m-0 [text-wrap:balance] max-w-3xl">
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
              <h3 className="font-display text-title text-ink-900 m-0">
                {e.verbe}
                <span className="block font-body text-body-sm font-bold text-secondary-600 mt-1">
                  {e.sousTitre}
                </span>
              </h3>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0">{e.detail}</p>
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

const OFFRES: Offre[] = [
  {
    title: 'Accompagnement STRIDE',
    role: 'Audit & stratégie',
    desc:
      'La méthode en 6 étapes pour cadrer votre transition SBO et déployer vos premières solutions IA, avec des livrables tangibles à chaque jalon.',
    link: '/website/accompagnement',
    cta: 'Découvrir la méthode STRIDE',
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
    title: 'Upskilling L&D',
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
        <h2 className="font-display text-section text-ink-900 m-0 [text-wrap:balance] max-w-3xl">
          Tout ce dont vous avez besoin pour opérer votre transition SBO.
        </h2>
      </FadeInWhenVisible>

      <ul className="flex flex-col m-0 p-0 list-none">
        {OFFRES.map((o, i) => (
          <FadeInWhenVisible key={o.title} delay={i * 0.06}>
            <li className="border-t border-ink-200">
              <Link
                to={o.link}
                className="group grid grid-cols-1 md:grid-cols-12 gap-group md:gap-flow py-flow rounded-2xl transition-colors duration-base focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
              >
                <div className="md:col-span-5 flex flex-col gap-rule">
                  <span className="font-body text-caption font-bold text-secondary-600">
                    {o.role}
                  </span>
                  <h3 className="font-display text-title text-ink-900 m-0 transition-colors duration-base group-hover:text-primary-700">
                    {o.title}
                  </h3>
                </div>
                <p className="md:col-span-5 font-body text-body text-ink-600 leading-relaxed m-0">
                  {o.desc}
                </p>
                <span className="md:col-span-2 flex items-start md:justify-end font-body text-body-sm font-semibold text-primary-700">
                  <span className="inline-flex items-center gap-1.5">
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

      {/* Learning App — le seul item qui change de registre, parce qu'il change
          de nature : les trois au-dessus sont des prestations, celui-ci est un
          produit. Teinté plutôt que sombre : la page ne garde qu'un seul fond
          sombre, et c'est le CTA final. */}
      <FadeInWhenVisible delay={0.1}>
        <Link
          to="/website/learning-app"
          className="group flex flex-col sm:flex-row sm:items-end justify-between gap-flow rounded-2xl bg-primary-50 ring-1 ring-primary-100 p-flow transition-colors duration-base hover:bg-primary-100/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          <div className="flex flex-col gap-group max-w-2xl">
            <h3 className="font-display text-title text-ink-900 m-0 [text-wrap:balance]">
              Passez à l'échelle avec la Learning App TLS.
            </h3>
            <p className="font-body text-body text-ink-600 leading-relaxed m-0">
              Veille continue, apprentissage par l'action et Passeport de
              compétences vivant : le logiciel qui opère votre modèle SBO au
              quotidien.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 font-body text-body-sm font-semibold text-primary-700">
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
            <h2 className="font-display text-section text-ink-900 m-0 [text-wrap:balance]">
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
                <Button to="/website/equipe" variant="ghost" size="md" trailingIcon={<ArrowRight size={16} />}>
                  Rencontrer les fondateurs
                </Button>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        <FadeInWhenVisible delay={0.12} className="lg:col-span-4 lg:col-start-9">
          <div className="flex flex-col gap-group border-t lg:border-t-0 lg:border-l border-ink-200 pt-flow lg:pt-0 lg:pl-flow">
            <h3 className="font-display text-feature text-ink-900 m-0">
              Partenaire stratégique de C-Campus
            </h3>
            <p className="font-body text-body text-ink-600 leading-relaxed m-0">
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
          <div className="rounded-2xl bg-ink-900 text-white p-flow sm:p-band">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-flow items-start">
              {/* Bloc chaud */}
              <div className="lg:col-span-7 flex flex-col gap-flow">
                <h2 className="font-display text-section text-white m-0 [text-wrap:balance]">
                  Prêt à transformer votre organisation ?
                </h2>
                <p className="font-body text-lede text-white/75 m-0 max-w-xl [text-wrap:pretty]">
                  Trente minutes avec les fondateurs pour comprendre votre
                  contexte et tracer le chemin le plus court vers l'impact.
                  Sans engagement.
                </p>
                <div className="flex flex-col gap-group">
                  <div>
                    <Button to="/website/contact" variant="secondary" size="lg" trailingIcon={<ArrowRight size={18} />}>
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
                  <h3 className="font-display text-feature text-white m-0">
                    Pas encore prêt ? Restez en veille.
                  </h3>
                  <p className="font-body text-body text-white/70 leading-relaxed m-0">
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
                    className="h-12 w-full rounded-pill border border-white/25 bg-white/10 px-5 font-body text-body text-white placeholder:text-white/55 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
                  />
                  <Button type="submit" variant="secondary" size="lg" fullWidth disabled={sending} trailingIcon={<ArrowRight size={18} />}>
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
      title="The Learning Society · Cabinet de conseil & studio expert en Skills-Based Organization"
      description="Ne formez plus pour former. Conseil stratégique, création pédagogique sur-mesure et IA pour transformer votre organisation en Skills-Based Organization."
      canonical="/website"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'The Learning Society',
        url: 'https://thelearningsociety.fr',
        logo: 'https://thelearningsociety.fr/favicon.svg',
        description:
          'Cabinet de conseil et studio expert en Skills-Based Organization : conseil stratégique STRIDE, studio IA & pédagogie, upskilling et Learning App.',
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
