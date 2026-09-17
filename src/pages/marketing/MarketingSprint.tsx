/**
 * MarketingSprint — page « Sprint OS & Agents IA », /website/sprint.
 *
 * Créée le 2026-09-16. Cette page existe parce que la liste des offres de
 * l'accueil avait un trou : STRIDE l'ouvrait, et D10 la gèle « pour 2027,
 * cible 2028 ». Le Sprint est l'offre Studio réellement vendable qui prend sa
 * place.
 *
 * ── Ce que la page NE dit PAS, et pourquoi ──────────────────────────────────
 *
 *  - **Aucun prix.** Le catalogue du 31/08 pose un minimum de 7 500 € HT, mais
 *    D6 (« pas de prix public ») n'a pas été reconduite depuis que le modèle
 *    est figé. Tant qu'elle tient, C9 tient : aucun prix n'est affiché sur le
 *    site. Le minimum se dit au premier échange.
 *
 *  - **Aucun client.** L'offre est la templatisation d'un modèle vendu à un
 *    client réel, et c'est la seule preuve existante. `FACTS-CANON` interdit
 *    de nommer un client. La page ne le nomme donc pas, et **ne le remplace
 *    par rien** : pas de témoignage fabriqué, pas de « déjà déployé chez des
 *    dizaines de ». ⏳ La question « quelle preuve met-on à la place ? » est
 *    ouverte dans la fiche Notion — elle se tranchera avec une vraie preuve
 *    autorisée, pas avec du remplissage.
 *
 *  - **Aucun découpage en phases.** Le catalogue donne une durée (4 mois) et
 *    trois livrables, pas un déroulé semaine par semaine. Inventer les phases
 *    aurait fait joli et aurait été faux.
 *
 * ── Tranché par Chloé le 2026-09-16 ────────────────────────────────────────
 *
 *  - **Le nom public : « Sprint OS & Agents IA ».** Le mot « Pack », du
 *    vocabulaire de vendeur, est retiré. ⚠️ C'est un accord de travail — le
 *    verbatim est « pour l'instant on peut garder ce nom » — pas un verrou.
 *    Dernière occasion de le changer avant qu'il devienne une URL publique.
 *  - **La publication : janvier 2027**, au lancement de l'offre. Pas de
 *    teasing anticipé.
 *
 * ⚠️ **La page reste donc hors navigation, hors pied de page et hors liste
 * d'offres de l'accueil jusqu'en janvier.** Elle est routée, donc consultable
 * par lien direct. Trois gestes à faire ce jour-là, pas un — la tâche Notion
 * « Publier la page Sprint » (échéance 04/01/2027) les liste.
 *
 * ── Ce qui reste ouvert ─────────────────────────────────────────────────────
 *
 *  - **La preuve.** Voir plus haut : la page ne remplace le client innommable
 *    par rien. À trancher avant janvier, avec une preuve réellement autorisée.
 *  - **Le rapport à STRIDE.** Traité en section 4 faute d'arbitrage officiel :
 *    le Sprint outille, la méthode transforme. À relire si la décision
 *    formelle diverge.
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Bot, LayoutGrid, Radar } from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

const SHELL = 'max-w-wide mx-auto px-4 sm:px-6 lg:px-10';

// ─── 1. Hero ─────────────────────────────────────────────────────────────────
//
// La matière propre à cette page, c'est son rapport au temps : une installation
// courte suivie d'un entretien long. Deux nombres, pas une progression — la
// page Learning App porte déjà une frise J+1 → J+90, il ne fallait pas la
// redire.

const DUREES = [
  { valeur: '4 mois', role: "pour installer", detail: "Le temps de poser l'outil, de le remplir et de vous le remettre." },
  { valeur: '12 mois', role: 'pour tenir', detail: "Le suivi de veille inclus, parce qu'un système qu'on n'entretient pas se périme." },
];

const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden">
      <div className={`relative ${SHELL} pt-hero pb-band`}>
        <motion.div
          initial={reduced ? false : { y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-4xl flex-col gap-flow"
        >
          <h1 className="font-display text-hero text-ink-900 [text-wrap:balance]">
            <span className="block">Votre système d'exploitation,</span>
            <span className="block text-primary-700">installé et tenu.</span>
          </h1>

          <p className="font-body text-lede text-ink-700 m-0 max-w-[60ch] [text-wrap:pretty]">
            Un espace Notion conçu pour votre activité, des agents IA
            co-construits avec vos équipes, et une veille qui continue de
            tourner après notre départ. Un forfait, pas une régie.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-flow border-t border-ink-300 pt-flow m-0 p-0 list-none max-w-2xl">
            {DUREES.map((d) => (
              <li key={d.valeur} className="flex flex-col gap-rule">
                <span className="font-display text-section text-ink-900 tabular-nums leading-none">
                  {d.valeur}
                </span>
                <span className="font-body text-body-sm font-bold text-secondary-700">{d.role}</span>
                <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{d.detail}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs">
            <Button to="/website/contact" emphasis="solid" tone="brand" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Parler de votre périmètre
            </Button>
            <Button to="/website/studio" variant="ghost" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
              Voir le Studio
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── 2. Ce qui est installé ──────────────────────────────────────────────────

const LIVRABLES = [
  {
    icon: <LayoutGrid size={20} />,
    titre: 'Un espace Notion sur mesure',
    detail:
      "Pas un gabarit qu'on vous adapte : une architecture conçue sur vos objets métier, vos circuits de validation et vos rythmes. Vous en sortez propriétaire — l'espace vous appartient, il ne dépend d'aucun abonnement chez nous.",
  },
  {
    icon: <Bot size={20} />,
    titre: 'Des agents IA co-construits',
    detail:
      "Conçus avec les personnes qui feront le travail, pas à leur place. Locaux, appelés par API, ou chaînés les uns aux autres selon ce que la tâche demande et ce que votre politique de données autorise.",
  },
  {
    icon: <Radar size={20} />,
    titre: 'Une veille qui tourne un an',
    detail:
      "Un système installé en janvier et jamais rouvert est périmé en juin. Les douze mois de suivi servent à ça : les sources changent, les modèles changent, l'outil suit.",
  },
];

const Livrables: React.FC = () => (
  <section>
    <div className={`${SHELL} py-band flex flex-col gap-flow`}>
      <FadeInWhenVisible>
        <h2 className="font-display text-section text-ink-900 [text-wrap:balance] max-w-3xl">
          Trois choses installées, et rien qui reste chez nous.
        </h2>
      </FadeInWhenVisible>

      <ul className="flex flex-col m-0 p-0 list-none">
        {LIVRABLES.map((l, i) => (
          <FadeInWhenVisible key={l.titre} delay={i * 0.06}>
            <li className="grid grid-cols-1 md:grid-cols-12 gap-group md:gap-flow border-t border-ink-200 py-flow">
              <div className="md:col-span-5 flex items-start gap-stack">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  {l.icon}
                </span>
                <h3 className="font-display text-title text-ink-900 [text-wrap:balance]">{l.titre}</h3>
              </div>
              <p className="md:col-span-7 font-body text-body text-ink-600 leading-relaxed m-0">
                {l.detail}
              </p>
            </li>
          </FadeInWhenVisible>
        ))}
      </ul>
    </div>
  </section>
);

// ─── 3. Le sur-mesure, dit précisément ───────────────────────────────────────
//
// « Sur mesure » ne veut rien dire tout seul — c'est le mot que tout le monde
// écrit. Ce qui le rend vérifiable ici, c'est le choix technique laissé ouvert
// sur les agents, qui est une vraie contrainte de souveraineté et pas un
// argument de vente.

const SurMesure: React.FC = () => (
  <section>
    <div className={`${SHELL} py-band`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-flow items-start">
        <FadeInWhenVisible className="lg:col-span-5">
          <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
            « Sur mesure » se vérifie sur un point précis.
          </h2>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.08} className="lg:col-span-7 lg:pt-2">
          <div className="flex flex-col gap-flow">
            <p className="font-body text-lede text-ink-700 m-0 [text-wrap:pretty]">
              Celui de savoir <em>où</em> tourne l'intelligence. Un agent peut
              s'exécuter chez vous, appeler un modèle distant, ou enchaîner les
              deux. Ce n'est pas un détail d'implémentation : c'est ce qui
              décide quelles données sortent de votre système et lesquelles
              n'en sortent jamais.
            </p>
            <p className="font-body text-body text-ink-600 leading-relaxed m-0">
              La question se tranche au cadrage, avec votre DSI si vous en avez
              une, et elle se tranche par cas d'usage — pas une fois pour
              toutes. C'est le genre d'arbitrage qu'un gabarit ne peut pas
              porter à votre place.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  </section>
);

// ─── 4. Le périmètre, dit franchement ────────────────────────────────────────
//
// La fiche Notion demandait explicitement de rendre lisible ce qui sépare le
// Sprint de la méthode STRIDE, « sinon le visiteur ne comprend pas pourquoi
// l'une existe et l'autre pas ». Ni le prix de l'une ni le gel de l'autre
// n'étant publics, la distinction se fait sur la nature : outiller n'est pas
// transformer.

const Perimetre: React.FC = () => (
  <section>
    <div className={`${SHELL} py-band flex flex-col gap-flow`}>
      <FadeInWhenVisible>
        <h2 className="font-display text-section text-ink-900 [text-wrap:balance] max-w-3xl">
          Ce que le Sprint fait, et ce qu'il ne fait pas.
        </h2>
      </FadeInWhenVisible>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-flow border-t border-ink-300 pt-flow">
        <FadeInWhenVisible>
          <div className="flex flex-col gap-group">
            <h3 className="font-display text-feature text-primary-800">Il outille</h3>
            <p className="font-body text-body text-ink-600 leading-relaxed m-0">
              Le Sprint part de vos processus tels qu'ils sont et leur donne un
              outil qui les tient. Quatre mois plus tard, vos équipes
              travaillent dans un système qui leur ressemble, et elles savent le
              faire évoluer sans nous.
            </p>
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.08}>
          <div className="flex flex-col gap-group">
            <h3 className="font-display text-feature text-ink-900">Il ne transforme pas</h3>
            <p className="font-body text-body text-ink-600 leading-relaxed m-0">
              Si la question est de revoir votre modèle de compétences, vos
              référentiels et votre gouvernance, c'est un autre chantier — celui
              que décrit{' '}
              <a
                href="/website/accompagnement"
                className="font-semibold text-primary-700 underline underline-offset-4 decoration-primary-200 hover:decoration-primary-700 transition-colors duration-base"
              >
                la méthode STRIDE
              </a>
              . Les deux se suivent bien ; ils ne se remplacent pas.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  </section>
);

// ─── 5. CTA final ────────────────────────────────────────────────────────────
//
// La date de lancement est dite ici plutôt que dans le hero : elle informe la
// décision, elle ne la déclenche pas. L'annoncer en ouverture aurait fait
// fuir avant d'avoir expliqué ce qu'on installe.

const CtaFinal: React.FC = () => (
  <section>
    <div className={`${SHELL} py-band`}>
      <FadeInWhenVisible>
        <div className="mx-auto flex max-w-content flex-col items-center gap-stack-lg text-center">
          <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
            Les premiers Sprints démarrent en janvier 2027.
          </h2>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-[62ch] [text-wrap:pretty]">
            Le cadrage, lui, se fait avant : c'est là qu'on regarde votre
            périmètre, qu'on vérifie que le format convient, et qu'on vous dit
            franchement si ce n'est pas le cas.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs pt-stack-xs">
            <Button to="/website/contact" emphasis="solid" tone="brand" size="xl" trailingIcon={<ArrowRight size={20} />}>
              Cadrer votre Sprint
            </Button>
            <Button to="/website/diagnostic" variant="ghost" size="xl" trailingIcon={<ArrowUpRight size={20} />}>
              Évaluer votre maturité
            </Button>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

export const MarketingSprint: React.FC = () => (
  <>
    <SEOHead
      title="Sprint OS & Agents IA · The Learning Society"
      description="Quatre mois pour installer votre espace Notion sur mesure et vos agents IA co-construits, douze mois de veille pour que le système tienne. Un forfait, pas une régie."
      canonical="/website/sprint"
    />
    <Hero />
    <Livrables />
    <SurMesure />
    <Perimetre />
    <CtaFinal />
  </>
);

export default MarketingSprint;
