/**
 * MarketingVigie — landing "La Vigie IA", /website/vigie.
 *
 * Créée le 28/07/2026. Nom PROVISOIRE : "La Vigie IA" (arbitrage Chloé 28/07,
 * susceptible de changer). Il a hésité entre "La Vigie SBO" (copy PAD),
 * "La Vigie" (ma note de réunion) et "La Vigie IA" (docs Notion) — c'est cette
 * dernière forme qui est retenue pour l'instant. Un seul point de changement :
 * les libellés de cette page, du header, du footer, de la Home et de Méthode.
 *
 * Contenu réécrit le 28/07 depuis la structure éditoriale réelle du doc
 * "Stratégie de Contenu Marketing B2B" §5 (mirroir : PAD-strategie-contenu-b2b.md) :
 * bimensuelle, mardi 8h, 5 min de lecture, structure fixe en 3 rubriques.
 * La version précédente annonçait trois "promesses" génériques que j'avais
 * inventées faute de source — remplacées par le format réel.
 */

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Stethoscope, Wrench, FlaskConical, Clock } from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, useMarketingToast } from '../../components/marketing/motion';
import { GRID_CONTAINER } from '../../lib/grid-columns';
import { SEOHead } from './components/SEOHead';
import { submitForm } from './utils/submitForm';

/** Les 3 rubriques fixes de chaque numéro (doc Stratégie Contenu B2B §5). */
const RUBRIQUES = [
  {
    icon: <Stethoscope size={20} />,
    titre: "L'Autopsie du Workflow Pédagogique",
    detail:
      "Un workflow réel disséqué étape par étape : ce que l'IA prend en charge, ce qu'elle rate, et où l'ingénieur pédagogique reste indispensable.",
  },
  {
    icon: <Wrench size={20} />,
    titre: 'La Fiche Out-Skill',
    detail:
      "Une compétence d'augmentation par l'IA, décrite comme on décrirait un savoir-faire métier : ce qu'on doit savoir faire, à quel niveau, et comment le prouver.",
  },
  {
    icon: <FlaskConical size={20} />,
    titre: 'Le Crash-Test Terrain',
    detail:
      "Un outil ou une méthode mis à l'épreuve sur un cas concret, avec le résultat brut : ce qui a tenu, ce qui a cassé.",
  },
];

export const MarketingVigie: React.FC = () => {
  const reduced = useReducedMotion();
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
      _source: 'vigie-landing',
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
    <>
      <SEOHead
        title="La Vigie IA · The Learning Society"
        description="La Vigie IA, la newsletter bimensuelle de The Learning Society pour les équipes L&D : un workflow pédagogique autopsié, une fiche Out-skill, un crash-test terrain. Cinq minutes, le mardi à 8h."
        canonical="/website/vigie"
      />

      <section className="relative overflow-hidden">
        <div className="relative max-w-wide mx-auto px-4 sm:px-6 lg:px-10 pt-hero pb-band">
          <motion.div
            initial={reduced ? false : { y: 24 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-flow"
          >
            {/* La cadence ouvre la page. C'est la matière propre d'une
                newsletter — un rendez-vous, pas un argumentaire — et ce qui
                décide de l'abonnement avant tout le reste. La pastille de
                sur-titre disparaît : « mardi, 8h » dit ce qu'elle disait. */}
            <p className="flex flex-wrap items-baseline gap-stack-xs m-0 font-display text-title text-ink-900">
              <Clock size={20} className="text-primary-700 self-center" aria-hidden />
              <span>Mardi</span>
              <span className="text-primary-700">8h</span>
              <span aria-hidden className="text-ink-200">/</span>
              <span className="text-primary-700">5 min</span>
              <span className="font-body text-body-sm font-normal text-ink-500">un mardi sur deux</span>
            </p>

            <h1 className="font-display text-hero text-ink-900 [text-wrap:balance] max-w-3xl">
              Le signal, <span className="text-primary-700">sans le bruit.</span>
            </h1>

            {/* Deux boîtes : la requête de conteneur remonte à l'ancêtre le plus
                proche, jamais à l'élément qui la porte. */}
            <div className={GRID_CONTAINER}>
              <div className="grid grid-cols-1 @3xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-flow items-start">
                <div className="flex flex-col gap-stack">
                  <p className="font-body text-lede text-ink-700 leading-relaxed m-0 [text-wrap:pretty]">
                    De la matière opérationnelle pour les équipes L&amp;D, les
                    concepteurs pédagogiques et les directions de formation. Pas
                    de discours commercial, pas de veille recopiée.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-stack-xs">
                    <label htmlFor="vigie-email" className="sr-only">
                      Votre adresse email professionnelle
                    </label>
                    <input
                      id="vigie-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre email professionnel"
                      className="h-12 flex-1 rounded-lg border border-ink-200 bg-white px-stack-md font-body text-body text-ink-900 placeholder:text-ink-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    />
                    <Button type="submit" emphasis="solid" tone="brand" size="lg" disabled={sending} trailingIcon={<ArrowRight size={18} />}>
                      {sending ? 'Envoi en cours…' : "S'abonner"}
                    </Button>
                  </form>
                  <p className="font-body text-caption text-ink-500 m-0">
                    Un email tous les quinze jours, pas de spam. Désinscription en un clic.
                  </p>
                </div>

                {/* Le sommaire fait la preuve avant l'argument : le lecteur voit
                    ce qu'il recevra avant de donner son adresse. */}
                <div className="flex flex-col gap-stack rounded-lg border border-ink-200 bg-white/70 p-stack-lg">
                  <p className="font-body text-caption font-bold uppercase tracking-label text-ink-500 m-0">
                    Au sommaire de chaque numéro
                  </p>
                  <ul className="flex flex-col m-0 p-0 list-none">
                    {[
                      'Un workflow pédagogique autopsié',
                      'Une fiche Out-skill',
                      'Un crash-test terrain',
                    ].map((r) => (
                      <li
                        key={r}
                        className="border-t border-ink-100 py-stack-xs first:border-t-0 first:pt-0 font-display text-body text-ink-800"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ce que contient chaque numéro — la structure fixe, pas une promesse vague */}
      <section>
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band flex flex-col gap-flow">
          <FadeInWhenVisible>
            <div className="max-w-3xl flex flex-col gap-stack">
              <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
                Trois rubriques, à chaque numéro.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 [text-wrap:pretty]">
                Le format ne change pas : vous savez toujours ce que vous allez
                lire, et en combien de temps.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="flex flex-col">
            {RUBRIQUES.map((r, i) => (
              <FadeInWhenVisible key={r.titre} delay={i * 0.06}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack lg:gap-flow items-start border-t border-ink-200/70 py-section first:border-t-0">
                  <div className="lg:col-span-5 flex items-start gap-stack">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                      {r.icon}
                    </span>
                    <h3 className="font-display text-h3 font-bold text-ink-900 leading-tight [text-wrap:balance]">
                      {r.titre}
                    </h3>
                  </div>
                  <p className="lg:col-span-7 font-body text-body text-ink-600 leading-relaxed m-0 max-w-2xl">
                    {r.detail}
                  </p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
          <FadeInWhenVisible>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-stack">
              <p className="font-body text-body text-ink-600 m-0 max-w-xl">
                En attendant le prochain numéro, nos analyses de fond sont en
                accès libre dans le Magazine.
              </p>
              <Button to="/website/resources" emphasis="outline" size="md" trailingIcon={<ArrowRight size={16} />}>
                Lire nos analyses
              </Button>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
};

export default MarketingVigie;
