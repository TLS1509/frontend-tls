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
import { ArrowRight, Radar, Stethoscope, Wrench, FlaskConical, Clock } from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, useMarketingToast } from '../../components/marketing/motion';
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
    <div className="bg-white">
      <SEOHead
        title="La Vigie IA · The Learning Society"
        description="La Vigie IA, la newsletter bimensuelle de The Learning Society pour les équipes L&D : un workflow pédagogique autopsié, une fiche Out-skill, un crash-test terrain. Cinq minutes, le mardi à 8h."
        canonical="/website/vigie"
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
        <div
          aria-hidden
          className="absolute -top-24 left-[-8%] h-[420px] w-[420px] rounded-pill bg-primary-200/40 blur-3xl pointer-events-none"
        />
        <div className="relative max-w-wide mx-auto px-4 sm:px-6 lg:px-10 pt-36 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-w-3xl flex-col gap-stack-lg"
          >
            <p className="inline-flex w-fit items-center gap-2 rounded-pill bg-primary-100 px-4 py-1.5 font-body text-caption font-bold text-primary-800 m-0">
              <Radar size={14} />
              La newsletter TLS
            </p>
            <h1 className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0 [text-wrap:balance] text-[clamp(2.5rem,5.5vw,4rem)]">
              La Vigie IA. <span className="text-primary-700">Le signal, sans le bruit.</span>
            </h1>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl [text-wrap:pretty]">
              Un mardi sur deux, à 8h : de la matière opérationnelle pour les
              équipes L&amp;D, les concepteurs pédagogiques et les directions de
              formation. Pas de discours commercial, pas de veille recopiée.
            </p>

            <p className="inline-flex w-fit items-center gap-2 font-body text-body-sm font-bold text-ink-700 m-0">
              <Clock size={16} className="text-primary-700" />
              Bimensuelle · 5 minutes de lecture · mardi 8h
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch gap-stack-xs pt-stack-xs max-w-lg"
            >
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
                className="h-12 flex-1 rounded-pill border border-ink-200 bg-white px-5 font-body text-body text-ink-900 placeholder:text-ink-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              />
              <Button type="submit" variant="primary" size="lg" disabled={sending} trailingIcon={<ArrowRight size={18} />}>
                {sending ? 'Envoi en cours…' : "S'abonner à La Vigie IA"}
              </Button>
            </form>
            <p className="font-body text-caption text-ink-500 m-0">
              Un email tous les quinze jours, pas de spam. Désinscription en un clic.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ce que contient chaque numéro — la structure fixe, pas une promesse vague */}
      <section className="bg-white border-t border-ink-100">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 flex flex-col gap-section-lg">
          <FadeInWhenVisible>
            <div className="max-w-3xl flex flex-col gap-stack">
              <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)]">
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack lg:gap-section items-start border-t border-ink-200/70 py-section first:border-t-0">
                  <div className="lg:col-span-5 flex items-start gap-stack">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                      {r.icon}
                    </span>
                    <h3 className="font-display text-h3 font-bold text-ink-900 m-0 leading-tight [text-wrap:balance]">
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

      <section className="bg-primary-50/50 border-t border-primary-100">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
          <FadeInWhenVisible>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-stack">
              <p className="font-body text-body text-ink-600 m-0 max-w-xl">
                En attendant le prochain numéro, nos analyses de fond sont en
                accès libre dans le Magazine.
              </p>
              <Button to="/website/resources" variant="ghost" size="md" trailingIcon={<ArrowRight size={16} />}>
                Lire nos analyses
              </Button>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default MarketingVigie;
