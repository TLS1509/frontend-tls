/**
 * MarketingWebinaireDetail : page d'un webinaire — 2 états selon status :
 *  - upcoming : formulaire d'inscription (email obligatoire)
 *  - past     : replay (lecteur vidéo) au lieu du formulaire
 *
 * Même famille visuelle que Guide (page de conversion, pas de lecture longue),
 * mais avec un bloc infos pratiques (date/heure/durée/intervenants) et agenda.
 */

import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarCheck,
  Clock,
  ListChecks,
  MailCheck,
  Play,
  Radio,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { Input } from '../../components/core/Input';
import { PageShell } from '../../components/layout';
import { FadeInWhenVisible } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';
import { submitForm } from './utils/submitForm';
import { findWebinaire, getRelatedWebinaires } from '../../data/marketingWebinaires';

const CONTAINER = 'max-w-content mx-auto px-4 sm:px-6 lg:px-10';

export const MarketingWebinaireDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const webinaire = slug ? findWebinaire(slug) : null;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);

  if (!webinaire) {
    return <Navigate to="/website/resources" replace />;
  }

  const isUpcoming = webinaire.status === 'upcoming';
  const related = getRelatedWebinaires(webinaire.slug, 2);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await submitForm({
      name: 'Inscription webinaire',
      email,
      subject: `Inscription webinaire : ${webinaire.title}`,
      _source: `webinaire-${webinaire.slug}`,
    });
    setLoading(false);
    if (result.ok) setRegistered(true);
    else setError(result.error ?? "Une erreur est survenue. Réessayez ou écrivez-nous.");
  };

  return (
    <div className="bg-white">
      <SEOHead
        title={webinaire.title}
        description={webinaire.description}
        canonical={`/website/webinaires/${webinaire.slug}`}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className={`relative pt-24 sm:pt-28 lg:pt-32 pb-section overflow-hidden bg-gradient-to-br ${webinaire.cover}`}>
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
              <span
                className={`inline-flex items-center px-3 py-1 rounded-pill border font-body text-caption font-bold uppercase tracking-wider ${
                  isUpcoming
                    ? 'bg-success-bg text-success-fg border-success-base/30'
                    : 'bg-ink-50 text-ink-700 border-ink-100'
                }`}
              >
                <Radio size={11} className="mr-1.5" /> {isUpcoming ? 'À venir' : 'Replay'}
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <Calendar size={14} /> {webinaire.date}
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <Clock size={14} /> {webinaire.time}
              </span>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 text-[clamp(2rem,4.5vw,3.25rem)]">
              {webinaire.title}
            </h1>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.15}>
            <p className="font-display text-[clamp(1.1rem,1.8vw,1.35rem)] text-ink-700 leading-snug m-0 italic">
              {webinaire.subtitle}
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Body : description + agenda + registration/replay ───────────── */}
      <PageShell width="content" className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-section items-start">
          {/* Description + agenda + speakers */}
          <FadeInWhenVisible direction="up" className="flex flex-col gap-stack-lg">
            <p className="font-body text-body text-ink-700 leading-relaxed m-0">
              {webinaire.description}
            </p>

            <div className="flex flex-col gap-stack">
              <span className="inline-flex items-center gap-1.5 font-body text-caption font-bold text-ink-500 uppercase tracking-widest">
                <ListChecks size={14} /> Au programme
              </span>
              <ul className="flex flex-col gap-stack m-0 pl-0 list-none">
                {webinaire.agenda.map((item, i) => (
                  <li key={i} className="flex items-start gap-stack-xs">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                    <span className="font-body text-body-sm text-ink-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-stack-xs pt-stack border-t border-ink-100">
              <Users size={16} className="text-ink-400" />
              <span className="font-body text-caption text-ink-600">
                Intervenant{webinaire.speakers.length > 1 ? 's' : ''} :{' '}
                {webinaire.speakers.map((s) => `${s.name} (${s.role})`).join(', ')}
              </span>
            </div>
          </FadeInWhenVisible>

          {/* Registration card OR replay player */}
          <FadeInWhenVisible direction="up" delay={0.05}>
            {isUpcoming ? (
              <div className="relative rounded-3xl border border-ink-100 bg-white p-section-lg flex flex-col gap-stack shadow-sm">
                <AnimatePresence mode="wait">
                  {!registered ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-stack"
                    >
                      <div className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                        <CalendarCheck size={22} />
                      </div>
                      <div className="flex flex-col gap-tight">
                        <span className="font-display text-h5 font-bold text-ink-900">
                          Je m'inscris
                        </span>
                        <span className="font-body text-caption text-ink-600">
                          Lien de connexion envoyé par email avant la session.
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
                        Réserver ma place
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
                      <div className="inline-flex w-14 h-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                        <MailCheck size={26} />
                      </div>
                      <div className="flex flex-col gap-tight">
                        <span className="font-display text-h5 font-bold text-ink-900">
                          C'est noté !
                        </span>
                        <span className="font-body text-caption text-ink-600 max-w-xs">
                          Vous recevrez le lien de connexion par email avant la session.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col gap-stack">
                <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-primary-900 via-primary-800 to-ink-900 relative flex items-center justify-center overflow-hidden">
                  {webinaire.replayUrl ? (
                    <a
                      href={webinaire.replayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Lire le replay (nouvel onglet)"
                      className="w-16 h-16 rounded-full bg-primary-500 shadow-[0_0_0_12px_rgba(85,161,180,0.20)] flex items-center justify-center transition-transform duration-base hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
                    >
                      <Play size={24} className="ml-1 fill-white text-white" />
                    </a>
                  ) : (
                    <div aria-label="Replay à venir" className="flex flex-col items-center gap-stack-xs text-white/70">
                      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <Play size={24} className="ml-1 text-white/50" />
                      </div>
                      <span className="font-body text-caption font-semibold">Replay à venir</span>
                    </div>
                  )}
                </div>
                <span className="font-body text-caption text-ink-500 text-center">
                  Replay disponible · {webinaire.duration}
                </span>
              </div>
            )}
          </FadeInWhenVisible>
        </div>
      </PageShell>

      {/* ── Related webinaires ───────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-page bg-ink-50/40 border-t border-ink-100">
          <div className={`${CONTAINER} flex flex-col gap-section`}>
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                Autres webinaires
              </span>
            </FadeInWhenVisible>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
              {related.map((w, i) => (
                <FadeInWhenVisible key={w.slug} direction="up" delay={i * 0.06}>
                  <Link to={`/website/webinaires/${w.slug}`} className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
                    <div className="h-full bg-white border border-ink-100 rounded-2xl p-stack-lg flex flex-col gap-stack shadow-card hover:shadow-card-hover hover:border-primary-200 transition-all duration-base">
                      <span className="inline-flex items-center gap-tight font-body text-caption text-ink-500">
                        <Calendar size={12} /> {w.date}
                      </span>
                      <h3 className="font-display text-h5 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors duration-base">
                        {w.title}
                      </h3>
                      <div className="inline-flex items-center gap-tight font-body text-caption font-bold text-primary-700 mt-auto pt-stack border-t border-ink-100">
                        Voir le webinaire
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

export default MarketingWebinaireDetail;
