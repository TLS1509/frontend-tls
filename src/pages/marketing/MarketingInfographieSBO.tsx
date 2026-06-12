/**
 * MarketingInfographieSBO: ressource interactive : l'organisation par les compétences (SBO),
 * en scrollytelling. Pièce signature de la section Ressources.
 *
 * Direction : sticky scroll storytelling (StickyScrollStory) + compteurs (CountUp), lane light+warm.
 * Données chiffrées ATTRIBUÉES (WEF, Deloitte): aucune métrique TLS inventée (FACTS-CANON C7).
 * Le dossier de fond correspondant : /dossiers/organisation-par-les-competences-sbo.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, ArrowDown, Sparkles, BookOpen, GraduationCap, Wrench, Compass } from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  MeshGradientBg,
  StickyScrollStory,
  CountUp,
  type StoryPanel,
} from '../../components/marketing/motion';

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className,
}) => (
  <motion.div
    className={className}
    initial={{ y: 24 }}
    whileInView={{ y: 0 }}
    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const PANELS: StoryPanel[] = [
  {
    eyebrow: 'Le basculement',
    title: 'Du poste à la compétence.',
    body: "Pendant un siècle, l'unité de base du travail a été le poste. Le modèle Skills-Based la remplace par la compétence réelle : on raisonne en projets et missions, plus en fiches de poste figées.",
  },
  {
    eyebrow: 'Pourquoi maintenant',
    title: 'Les compétences expirent vite.',
    body: "L'obsolescence s'accélère et l'IA rebat les cartes des tâches. Le World Economic Forum estime qu'une part majeure des actifs devra se requalifier d'ici la fin de la décennie.",
  },
  {
    eyebrow: 'Ce que ça change',
    title: 'Plus agile, plus innovant.',
    body: "Les organisations qui raisonnent par compétences sont mieux armées pour innover et anticiper le changement. (Données Deloitte sur la SBO, pas des résultats The Learning Society.)",
  },
  {
    eyebrow: 'La mécanique',
    title: 'Apprendre, faire, replacer.',
    body: "La boucle Learn → Do → Match : on apprend, on applique sur un projet réel, et la preuve permet de replacer la bonne personne sur le bon projet. Le passeport de compétences en est le pivot.",
  },
];

const VisualShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-ink-100 bg-white shadow-2xl flex items-center justify-center p-section">
    {children}
  </div>
);

const StatBlock: React.FC<{ to: number; suffix?: string; label: string; source: string }> = ({
  to,
  suffix = ' %',
  label,
  source,
}) => (
  <div className="flex flex-col items-center text-center gap-tight">
    <CountUp to={to} suffix={suffix} className="font-display text-[clamp(3rem,9vw,5rem)] font-extrabold text-secondary-700 leading-none" />
    <span className="font-body text-body-sm text-ink-700 leading-snug max-w-[16rem]">{label}</span>
    <span className="font-body text-caption text-ink-400 mt-1">Source : {source}</span>
  </div>
);

const renderVisual = (i: number): React.ReactNode => {
  switch (i) {
    case 0:
      return (
        <VisualShell>
          <div className="flex flex-col gap-stack w-full">
            <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-stack-lg">
              <span className="font-body text-caption font-bold text-ink-400 uppercase tracking-widest">Hier · Job-Based</span>
              <p className="font-body text-body-sm text-ink-500 m-0 mt-1">Postes figés · diplômes · ancienneté</p>
            </div>
            <ArrowDown size={20} className="text-primary-500 self-center" />
            <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-stack-lg">
              <span className="font-body text-caption font-bold text-secondary-700 uppercase tracking-widest">Aujourd'hui · Skills-Based</span>
              <p className="font-body text-body-sm text-ink-700 m-0 mt-1">Compétences réelles · projets · mobilité</p>
            </div>
          </div>
        </VisualShell>
      );
    case 1:
      return (
        <VisualShell>
          <StatBlock to={60} suffix=" %" label="des actifs auront besoin d'une requalification d'ici 2027" source="WEF · Future of Jobs 2025" />
        </VisualShell>
      );
    case 2:
      return (
        <VisualShell>
          <div className="flex flex-col gap-stack-lg w-full items-center">
            <StatBlock to={52} label="de probabilité d'innover" source="Deloitte" />
            <div className="h-px w-2/3 bg-ink-100" />
            <StatBlock to={57} label="d'anticiper le changement" source="Deloitte" />
          </div>
        </VisualShell>
      );
    case 3:
    default:
      return (
        <VisualShell>
          <div className="flex flex-col gap-stack w-full">
            {[
              { icon: <GraduationCap size={20} />, k: 'Learn', v: 'On apprend', tone: 'bg-primary-600' },
              { icon: <Wrench size={20} />, k: 'Do', v: 'On applique sur un projet réel', tone: 'bg-secondary-600' },
              { icon: <Compass size={20} />, k: 'Match', v: 'On replace la bonne personne', tone: 'bg-accent-500' },
            ].map((s, idx) => (
              <React.Fragment key={s.k}>
                <div className="flex items-center gap-stack rounded-2xl border border-ink-100 bg-white p-stack shadow-sm">
                  <span className={`inline-flex w-10 h-10 rounded-xl text-white items-center justify-center shrink-0 ${s.tone}`}>
                    {s.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-body font-extrabold text-ink-900 leading-none">{s.k}</span>
                    <span className="font-body text-caption text-ink-600">{s.v}</span>
                  </div>
                </div>
                {idx < 2 && <ArrowDown size={16} className="text-ink-300 self-center" />}
              </React.Fragment>
            ))}
            <p className="font-body text-caption text-ink-500 text-center m-0 pt-1">
              Le passeport de compétences enregistre chaque preuve → la boucle se referme.
            </p>
          </div>
        </VisualShell>
      );
  }
};

export const MarketingInfographieSBO: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-accent-50/40">
        <MeshGradientBg tone="warm" intensity="subtle" />
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col gap-stack-lg">
          <Reveal>
            <Link
              to="/ressources"
              className="inline-flex items-center gap-tight.5 self-start text-ink-700 hover:text-ink-900 font-body text-body-sm font-semibold transition-colors duration-fast group"
            >
              <ArrowLeft size={16} className="transition-transform duration-base group-hover:-translate-x-1" />
              Ressources
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="inline-flex items-center gap-stack-xs self-start px-3 py-1 rounded-pill bg-white border border-secondary-200 shadow-xs">
              <Sparkles size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-secondary-700 tracking-wider uppercase">
                Infographie interactive
              </span>
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[1.0] tracking-tight m-0 text-[clamp(2.5rem,6vw,4.5rem)]">
              L'organisation par les compétences, en 4 temps.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
              Faites défiler pour parcourir le passage du poste à la compétence, chiffres à l'appui,
              sources citées. Version longue dans le dossier complet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Scrollytelling */}
      <StickyScrollStory panels={PANELS} eyebrowToneClass="text-secondary-700" visual={renderVisual} />

      {/* Sources + lien dossier */}
      <section className="py-page bg-ink-50/40 border-y border-ink-100">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <Reveal>
            <p className="font-body text-body text-ink-600 m-0 max-w-prose">
              Tous les chiffres de cette infographie décrivent la Skills-Based Organization en général
              (recherche WEF, Deloitte). Aucune donnée n'est un résultat The Learning Society.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link to="/dossiers/organisation-par-les-competences-sbo">
              <Button variant="ghost" size="lg" leadingIcon={<BookOpen size={18} />}>
                Lire le dossier complet (sources incluses)
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA final (dark) */}
      <section className="relative overflow-hidden py-page bg-gradient-to-br from-ink-900 via-primary-900 to-primary-950">
        <MeshGradientBg tone="ink" intensity="subtle" />
        <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-stack-lg">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
              Et dans votre organisation ?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-body text-body-lg text-white/80 max-w-2xl m-0">
              La Learning App et l'accompagnement STRIDE mettent cette boucle en place, étape par étape.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="flex flex-wrap items-center justify-center gap-stack">
              <Link to="/conseil">
                <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                  Découvrir l'accompagnement
                </Button>
              </Link>
              <Link to="/learning-app">
                <Button variant="glass" size="lg" trailingIcon={<ArrowRight size={18} />}>
                  Voir la Learning App
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default MarketingInfographieSBO;
