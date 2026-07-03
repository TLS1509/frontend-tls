/**
 * MarketingGuideDetail : landing page de conversion pour un guide PDF (lead magnet).
 *
 * ≠ Article/Dossier/Vidéo : ce n'est pas une page de lecture, c'est une page
 * de conversion. Email obligatoire avant accès au fichier. Pas de TOC, pas
 * de sommaire — juste description + bénéfices + formulaire.
 */

import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  MailCheck,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { Input } from '../../components/core/Input';
import { PageShell } from '../../components/layout';
import { FadeInWhenVisible } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';
import { submitForm } from './utils/submitForm';
import { findGuide, getRelatedGuides } from '../../data/marketingGuides';

const CONTAINER = 'max-w-content mx-auto px-4 sm:px-6 lg:px-10';

export const MarketingGuideDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? findGuide(slug) : null;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  if (!guide) {
    return <Navigate to="/website/resources" replace />;
  }

  const related = getRelatedGuides(guide.slug, 2);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await submitForm({
      name: 'Téléchargement guide',
      email,
      subject: `Téléchargement guide : ${guide.title}`,
      _source: `guide-${guide.slug}`,
    });
    setLoading(false);
    if (result.ok) setUnlocked(true);
    else setError(result.error ?? "Une erreur est survenue. Réessayez ou écrivez-nous.");
  };

  return (
    <div className="bg-white">
      <SEOHead
        title={guide.title}
        description={guide.description}
        canonical={`/website/guides/${guide.slug}`}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-section overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-accent-50/40">
        <div className={`relative ${CONTAINER} flex flex-col gap-stack-lg`}>
          <FadeInWhenVisible direction="up">
            <Link
              to="/website/resources"
              className="inline-flex items-center gap-1.5 self-start text-ink-700 hover:text-ink-900 font-body text-body-sm font-semibold transition-colors duration-fast group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
            >
              <ArrowLeft size={16} className="transition-transform duration-base group-hover:-translate-x-1" />
              Retour aux ressources
            </Link>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.05}>
            <div className="flex items-center gap-stack flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-pill border bg-secondary-50 text-secondary-700 border-secondary-100 font-body text-caption font-bold uppercase tracking-wider">
                <FileText size={11} className="mr-1.5" /> Guide {guide.format}
              </span>
              <span className="font-body text-caption text-ink-600">
                {guide.pageCount} pages · {guide.date}
              </span>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 text-[clamp(2rem,4.5vw,3.25rem)]">
              {guide.title}
            </h1>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.15}>
            <p className="font-display text-[clamp(1.1rem,1.8vw,1.35rem)] text-ink-700 leading-snug m-0 italic">
              {guide.subtitle}
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Body : description + form ────────────────────────────────────── */}
      <PageShell width="content" className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-section items-start">
          {/* Description + highlights */}
          <FadeInWhenVisible direction="up" className="flex flex-col gap-stack-lg">
            <p className="font-body text-body text-ink-700 leading-relaxed m-0">
              {guide.description}
            </p>
            <div className="flex flex-col gap-stack">
              <span className="font-body text-caption font-bold text-ink-500 uppercase tracking-widest">
                Ce que vous trouverez dans ce guide
              </span>
              <ul className="flex flex-col gap-stack m-0 pl-0 list-none">
                {guide.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-stack-xs">
                    <CheckCircle2 size={18} className="text-secondary-500 shrink-0 mt-0.5" />
                    <span className="font-body text-body-sm text-ink-700 leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>

          {/* Form card */}
          <FadeInWhenVisible direction="up" delay={0.05}>
            <div className={`relative rounded-3xl border p-section-lg flex flex-col gap-stack bg-gradient-to-br ${guide.cover} border-ink-100 shadow-sm`}>
              <AnimatePresence mode="wait">
                {!unlocked ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-stack"
                  >
                    <div className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-white/70 text-secondary-700">
                      <Download size={22} />
                    </div>
                    <div className="flex flex-col gap-tight">
                      <span className="font-display text-h5 font-bold text-ink-900">
                        Recevoir le guide
                      </span>
                      <span className="font-body text-caption text-ink-600">
                        Votre email pour recevoir le lien de téléchargement immédiatement.
                      </span>
                    </div>
                    <Input
                      type="email"
                      label="Email professionnel"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vous@organisation.fr"
                      autoComplete="email"
                    />
                    {error && (
                      <span className="font-body text-caption text-danger-fg">{error}</span>
                    )}
                    <Button type="submit" variant="primary" size="lg" loading={loading} trailingIcon={<ArrowRight size={16} />}>
                      Télécharger le PDF
                    </Button>
                    <span className="inline-flex items-center gap-1.5 font-body text-micro text-ink-500">
                      <ShieldCheck size={12} /> RGPD conforme · zéro spam
                    </span>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center gap-stack py-stack"
                  >
                    <div className="inline-flex w-14 h-14 items-center justify-center rounded-full bg-white text-secondary-600 shadow-sm">
                      <MailCheck size={26} />
                    </div>
                    <div className="flex flex-col gap-tight">
                      <span className="font-display text-h5 font-bold text-ink-900">
                        C'est prêt !
                      </span>
                      <span className="font-body text-caption text-ink-600 max-w-xs">
                        Votre téléchargement est prêt. Vous recevrez aussi une copie du lien par email.
                      </span>
                    </div>
                    <a href={guide.fileUrl} download className="w-full">
                      <Button variant="primary" size="lg" className="w-full" trailingIcon={<Download size={16} />}>
                        Télécharger maintenant
                      </Button>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeInWhenVisible>
        </div>
      </PageShell>

      {/* ── Related guides ───────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-page bg-ink-50/40 border-t border-ink-100">
          <div className={`${CONTAINER} flex flex-col gap-section`}>
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-secondary-700 uppercase tracking-widest">
                Autres guides
              </span>
            </FadeInWhenVisible>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
              {related.map((g, i) => (
                <FadeInWhenVisible key={g.slug} direction="up" delay={i * 0.06}>
                  <Link to={`/website/guides/${g.slug}`} className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
                    <div className="h-full bg-white border border-ink-100 rounded-2xl p-stack-lg flex flex-col gap-stack shadow-card hover:shadow-card-hover hover:border-secondary-200 transition-all duration-base">
                      <span className="inline-flex items-center gap-tight font-body text-caption text-ink-500">
                        <FileText size={12} /> {g.pageCount} pages
                      </span>
                      <h3 className="font-display text-h5 font-bold text-ink-900 leading-tight m-0 group-hover:text-secondary-700 transition-colors duration-base">
                        {g.title}
                      </h3>
                      <div className="inline-flex items-center gap-tight font-body text-caption font-bold text-secondary-700 mt-auto pt-stack border-t border-ink-100">
                        Voir le guide
                        <ArrowRight size={12} className="transition-transform duration-base group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MarketingGuideDetail;
