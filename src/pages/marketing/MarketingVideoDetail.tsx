/**
 * MarketingVideoDetail : lecture d'une vidéo/tutoriel (format court, ≠ lecture longue).
 *
 * Pas de sommaire flottant ici (contrairement à Article/Dossier) : les
 * chapitres sont courts et rendus inline sous le lecteur, pas besoin d'un
 * TOC sticky pour un contenu de quelques minutes.
 */

import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Play,
  User,
  ListVideo,
} from 'lucide-react';
import { PageShell } from '../../components/layout';
import { FadeInWhenVisible } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';
import { findVideo, getRelatedVideos } from '../../data/marketingVideos';

const CONTAINER = 'max-w-medium mx-auto px-4 sm:px-6 lg:px-10';

export const MarketingVideoDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const video = slug ? findVideo(slug) : null;

  if (!video) {
    return <Navigate to="/website/resources" replace />;
  }

  const related = getRelatedVideos(video.slug, 3);

  return (
    <div className="bg-white">
      <SEOHead
        title={video.title}
        description={video.description}
        canonical={`/website/videos/${video.slug}`}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className={`relative pt-24 sm:pt-28 lg:pt-32 pb-section overflow-hidden bg-gradient-to-br ${video.cover}`}>
        <div className={`relative ${CONTAINER} flex flex-col gap-stack-lg`}>
          <FadeInWhenVisible direction="up">
            <Link
              to="/website/resources"
              className="inline-flex items-center gap-1.5 self-start text-ink-700 hover:text-ink-900 font-body text-body-sm font-semibold transition-colors duration-fast group"
            >
              <ArrowLeft size={16} className="transition-transform duration-base group-hover:-translate-x-1" />
              Retour aux ressources
            </Link>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.05}>
            <div className="flex items-center gap-stack flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-pill border bg-primary-50 text-primary-700 border-primary-100 font-body text-caption font-bold uppercase tracking-wider">
                <Play size={11} className="mr-1.5" /> Vidéo
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <Calendar size={14} /> {video.date}
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <Clock size={14} /> {video.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <User size={14} /> {video.author}
              </span>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 text-[clamp(2rem,4.5vw,3.25rem)]">
              {video.title}
            </h1>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.15}>
            <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-prose">
              {video.description}
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Player + chapters ────────────────────────────────────────────── */}
      <PageShell width="medium" className="bg-white">
        <FadeInWhenVisible direction="up">
          <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-primary-900 via-primary-800 to-ink-900 relative flex items-center justify-center overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 40%, rgba(85,161,180,0.14) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(85,161,180,0.05) 0%, transparent 50%)',
              }}
            />
            <button
              type="button"
              aria-label="Lire la vidéo"
              className="relative z-[1] w-20 h-20 rounded-full bg-primary-500 shadow-[0_0_0_14px_rgba(85,161,180,0.20)] flex items-center justify-center transition-transform duration-base hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            >
              <Play size={30} className="ml-1 fill-white text-white" />
            </button>
            <span className="absolute bottom-4 right-5 bg-black/45 backdrop-blur-sm text-white font-body text-caption font-bold px-2.5 py-1 rounded-md">
              {video.duration}
            </span>
          </div>
        </FadeInWhenVisible>

        {video.chapters.length > 0 && (
          <FadeInWhenVisible direction="up" delay={0.05} className="flex flex-col gap-stack">
            <span className="inline-flex items-center gap-1.5 font-body text-caption font-bold text-ink-500 uppercase tracking-widest">
              <ListVideo size={14} /> Chapitres
            </span>
            <ul className="flex flex-col gap-tight m-0 p-0 list-none">
              {video.chapters.map((ch, i) => (
                <li key={i} className="flex items-center gap-stack-xs py-1.5 border-b border-ink-100 last:border-b-0">
                  <span className="font-body text-caption font-bold text-primary-600 tabular-nums w-12 shrink-0">
                    {ch.time}
                  </span>
                  <span className="font-body text-body-sm text-ink-700">{ch.label}</span>
                </li>
              ))}
            </ul>
          </FadeInWhenVisible>
        )}
      </PageShell>

      {/* ── Related videos ───────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-page bg-ink-50/40 border-t border-ink-100">
          <div className={`${CONTAINER} flex flex-col gap-section`}>
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                À voir aussi
              </span>
            </FadeInWhenVisible>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
              {related.map((r, i) => (
                <FadeInWhenVisible key={r.slug} direction="up" delay={i * 0.06}>
                  <Link to={`/website/videos/${r.slug}`} className="group block h-full">
                    <motion.article
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      className="h-full bg-white border border-ink-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg hover:border-primary-200 transition-shadow duration-base"
                    >
                      <div className={`relative h-32 bg-gradient-to-br ${r.cover} flex items-center justify-center`}>
                        <Play size={28} strokeWidth={1.5} className="text-ink-900/30" />
                      </div>
                      <div className="p-stack-lg flex flex-col gap-stack flex-1">
                        <span className="inline-flex items-center gap-tight font-body text-caption text-ink-500">
                          <Clock size={11} /> {r.duration}
                        </span>
                        <h3 className="font-display text-h5 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors duration-base">
                          {r.title}
                        </h3>
                        <div className="inline-flex items-center gap-tight font-body text-caption font-bold text-primary-700 mt-auto pt-stack border-t border-ink-100">
                          Regarder
                          <ArrowRight size={12} className="transition-transform duration-base group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </motion.article>
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

export default MarketingVideoDetail;
