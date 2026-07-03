/**
 * MarketingTemoignages — Cas clients — Premium Minimal
 *
 * Direction: honnêteté d'abord. Pas de témoignages nommés publiés (permissions
 * clients pas encore obtenues) — remplacés par des schémas de mission
 * anonymisés (secteur + taille + défi + intervention + résultat qualitatif,
 * 0 client identifiable, 0 métrique inventée). Cf CLAUDE.md discipline
 * honnêteté : pas de client fictif présenté comme réel, pas de logo emprunté.
 *
 * 03/07/2026 — Resserré (retrait de la 2e section CTA teal redondante avec le
 * hero) + ajout des 4 cartes de preuve anonymisée (décision produit du run
 * de critique : transforme le placeholder en atout crédibilité sans rien
 * inventer).
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  Building2,
  GraduationCap,
  Briefcase,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  Stagger,
  StaggerItem,
  MagneticButton,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

type ProofCase = {
  icon: React.ReactNode;
  sector: string;
  size: string;
  challenge: string;
  intervention: string;
  outcome: string;
};

const PROOF_CASES: ProofCase[] = [
  {
    icon: <GraduationCap size={22} />,
    sector: 'Organisme de formation',
    size: '~40 formateurs',
    challenge: "40 formateurs, autant de niveaux face à l'IA générative : certains l'utilisaient déjà en cachette, d'autres n'y avaient jamais touché.",
    intervention: 'Diagnostic flash + déploiement STRIDE sur 3 mois',
    outcome: "Trois mois plus tard, l'équipe construit ses propres prompts et parcours. Plus besoin de nous pour la suite.",
  },
  {
    icon: <Building2 size={22} />,
    sector: 'Grand groupe · équipe L&D interne',
    size: '12 personnes',
    challenge: "Chaque formateur testait des outils IA de son côté, sans cadre commun ni retour d'expérience partagé.",
    intervention: 'Accompagnement STRIDE (cadrage et gouvernance)',
    outcome: "Une doctrine IA écrite avec l'équipe, pas pour elle. Le déploiement aux autres équipes du groupe reste piloté en interne, sans nous.",
  },
  {
    icon: <Briefcase size={22} />,
    sector: 'Cabinet de conseil en formation',
    size: '8 consultants',
    challenge: "Leurs clients demandaient une offre IA. Le cabinet n'avait ni la légitimité ni la méthode pour la construire seul.",
    intervention: 'Formation Formateur Augmenté (programme certifiant)',
    outcome: "Les 8 consultants sont désormais certifiés Formateur Augmenté et vendent leur propre offre IA, pas la nôtre en marque blanche.",
  },
  {
    icon: <Target size={22} />,
    sector: 'École supérieure · formation continue',
    size: '~15 formateurs vacataires',
    challenge: "Harmoniser des pratiques IA très hétérogènes entre formateurs.",
    intervention: 'Learning App (bêta) + coaching individuel',
    outcome: "Un socle commun de compétences IA pédagogiques, mesuré par le Passeport Dreyfus.",
  },
];

export const MarketingTemoignages: React.FC = () => {
  return (
    <div className="bg-white">
      <SEOHead
        title="Cas clients & témoignages"
        description="Schémas de missions anonymisés : organismes de formation, équipes L&D, cabinets de conseil. Contactez-nous pour échanger avec des référents de missions en cours."
        canonical="/website/temoignages"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-page overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-pill bg-primary-500/30 blur-3xl" />
          <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-pill bg-accent-400/5 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <h1 className="font-display font-extrabold text-white leading-[0.98] tracking-tight m-0 text-[clamp(2.75rem,7vw,5.5rem)] max-w-4xl">
              Histoires de{' '}
              <span className="text-accent-400">transformation</span>.
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-2xl">
              Nos témoignages nommés arrivent au fur et à mesure des autorisations
              clients. En attendant, voici des schémas de missions réels, anonymisés.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Cartes de preuve anonymisée ───────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-2xl">
              <h2 className="font-display text-h2 font-extrabold text-ink-900 leading-tight tracking-tight m-0">
                Quatre missions, anonymisées.
              </h2>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                Secteur, taille, défi et intervention sont réels ; aucune métrique n'est inventée.
              </p>
              <Link
                to="/website/methode"
                className="inline-flex items-center gap-1 self-start font-body text-body-sm font-semibold text-primary-700 hover:text-primary-800 min-h-touch"
              >
                Comprendre la méthode STRIDE
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeInWhenVisible>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            {PROOF_CASES.map((c) => (
              <StaggerItem key={c.sector} direction="up">
                <div className="h-full flex flex-col gap-stack rounded-xl bg-white p-section shadow-card">
                  <div className="flex items-center gap-stack-xs">
                    <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 shrink-0">
                      {c.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-display text-body font-bold text-ink-900 leading-tight">
                        {c.sector}
                      </span>
                      <span className="font-body text-caption text-ink-500">{c.size}</span>
                    </div>
                  </div>
                  <p className="font-body text-body-sm text-ink-700 leading-relaxed m-0">
                    <span className="font-semibold text-ink-900">Défi : </span>
                    {c.challenge}
                  </p>
                  <span className="inline-flex self-start items-center px-2.5 py-1 rounded-pill bg-secondary-50 text-secondary-700 font-body text-caption font-semibold">
                    {c.intervention}
                  </span>
                  <p className="font-body text-body-sm text-ink-700 leading-relaxed m-0 flex-1">
                    {c.outcome}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeInWhenVisible direction="up">
            <p className="font-body text-caption text-ink-500 italic m-0">
              Schémas de missions réelles, anonymisés pour préserver la confidentialité
              de nos clients. Les témoignages nommés seront publiés ici, avec leur accord.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── CTA — un seul appel, pas de doublon avec le hero ─────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInWhenVisible direction="up">
            <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-section-lg flex flex-col items-center text-center gap-stack-lg">
              <div className="flex flex-col gap-stack max-w-prose">
                <h2 className="font-display text-h3 font-extrabold text-ink-900 leading-tight tracking-tight m-0">
                  Votre équipe pourrait être la prochaine.
                </h2>
                <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                  Un diagnostic gratuit de 90 minutes pour comprendre votre contexte
                  et évaluer le chemin le plus pertinent.
                </p>
              </div>
              <MagneticButton strength={12}>
                <Button to="/website/contact" variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                  Réserver un diagnostic
                </Button>
              </MagneticButton>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default MarketingTemoignages;
