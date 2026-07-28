/**
 * MarketingVigie — landing "La Vigie", /website/vigie.
 *
 * Créée le 28/07/2026. Nom tranché en réunion 28/07 : "La Vigie" tout court
 * (ni "SBO" ni "IA"). Destination du lien nav Ressources ; le bloc froid de la
 * Homepage (PAD section 6) pointe aussi ici.
 */

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Radar, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, useMarketingToast } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';
import { submitForm } from './utils/submitForm';

const PROMESSES = [
  "Une analyse de fond sur l'IA, les compétences et le futur du travail",
  'Des sources vérifiées, jamais de chiffre recyclé sans preuve',
  'Le regard SBO : ce que ça change concrètement pour vos équipes',
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
      subject: 'Inscription La Vigie',
      _source: 'vigie-landing',
    });
    setSending(false);
    if (ok) {
      toast.push({ tone: 'success', message: 'Merci, votre inscription à La Vigie est enregistrée.' });
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
        title="La Vigie · The Learning Society"
        description="La newsletter de The Learning Society : nos meilleures analyses sur l'IA, les compétences et le futur du travail. Sources vérifiées, regard Skills-Based Organization."
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
              La Vigie. <span className="text-primary-700">Le signal, sans le bruit.</span>
            </h1>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
              Nos meilleures analyses sur l'IA, les compétences et le futur du
              travail, écrites par les fondateurs de The Learning Society.
            </p>

            <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
              {PROMESSES.map((p) => (
                <li key={p} className="flex items-start gap-stack-xs">
                  <CheckCircle2 size={18} className="text-primary-700 shrink-0 mt-0.5" />
                  <span className="font-body text-body text-ink-700">{p}</span>
                </li>
              ))}
            </ul>

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
                {sending ? 'Envoi en cours…' : "S'abonner à La Vigie"}
              </Button>
            </form>
            <p className="font-body text-caption text-ink-500 m-0">
              Un email de qualité, pas de spam. Désinscription en un clic.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-t border-ink-100">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
          <FadeInWhenVisible>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-stack">
              <p className="font-body text-body text-ink-600 m-0 max-w-xl">
                En attendant le prochain numéro, nos analyses publiques sont en
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
