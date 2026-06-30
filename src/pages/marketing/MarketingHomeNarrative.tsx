/**
 * MarketingHome (Editorial base, redesigned) : live at `/`.
 *
 * Lane: LIGHT · WARM · BOLD sans (League Spartan) · editorial · dosed motion.
 * Wins through type, hierarchy and whitespace, with ONE immersive moment (the
 * Learn → Do → Match sticky scroll-story that SHOWS the competency system) and
 * ONE dark section (final CTA). Human stays in the frame through voice and real
 * product UI : no stock photography.
 *
 * Discipline: register = VOUS (B2B). Tokens only (no hex / arbitrary). No
 * gradient-text. No invented metrics, no fake logos, no testimonials presented
 * as real (honest proof + placeholders only). "Open Badge" (never "2.0") in the
 * formation context. Flat routes. No pricing (frozen). Reveals never gate
 * visibility (opacity:1 by default). Copy = drafts, to validate.
 *
 * Renders ONLY the page body (a <div> of <section>s). Header / footer /
 * scroll-progress / top offset come from MarketingLayout.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, BadgeCheck } from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  InteractiveAppMockup,
  StickyScrollStory,
  MeshGradientBg,
  MagneticButton,
  MorphingSVGVisualizer,
  CounterAnimation,
  ParallexTextLayers,
  type StoryPanel,
} from '../../components/marketing/motion';
import {
  ParallaxSection,
  ScrollReveal,
  StaggerGroup,
  ScrollProgressIndicator,
} from '../../components/marketing/scroll-effects';
import { LearnDoMatchVisual } from './components/LearnDoMatchVisual';
import { CinematicHero } from './components/CinematicHero';

/**
 * Reveal : minimal scroll-in wrapper. Content is VISIBLE BY DEFAULT (opacity:1);
 * on first intersection a one-shot upward translateY settles to 0. Transform-only
 * means an entrance can NEVER strand a block invisible. Reduced motion / no IO →
 * no transform. `className` is preserved so it can carry grid-column classes.
 */
const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [settled, setSettled] = React.useState(!!reduce);

  React.useEffect(() => {
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setSettled(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSettled(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: settled ? 'none' : 'translateY(14px)',
        transition: 'transform 600ms cubic-bezier(0.21,0.47,0.32,0.98)',
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Learn → Do → Match : the system, told in three beats ─────────────────────
const STORY: StoryPanel[] = [
  {
    eyebrow: 'Learn',
    title: 'Apprendre, à votre rythme.',
    body:
      "Un parcours adaptatif qui part de votre niveau réel (échelle Dreyfus) et vous fait progresser sur ce qui compte pour votre métier : pas un catalogue de vidéos à consommer.",
  },
  {
    eyebrow: 'Do',
    title: 'Mettre en pratique, sur du concret.',
    body:
      "Vous appliquez immédiatement sur vos propres projets. La compétence se construit en faisant, et se prouve sur un livrable réel : accompagné, jamais seul.",
  },
  {
    eyebrow: 'Match',
    title: 'Valoriser, et faire matcher.',
    body:
      "Chaque acquis enrichit un passeport de compétences vérifiable. Des preuves lisibles, prêtes à relier les bonnes compétences aux bons projets.",
  },
];

// ─── Learning App features : plain list ───────────────────────────────────────
const FEATURES = [
  'Parcours adaptatifs avec progression Dreyfus',
  'Coaching 1-1 intégré (messagerie et visio)',
  "Journal de bord réflexif, augmenté par l'IA",
  'Veille pédagogique curée pour votre métier',
];

// ─── The three offers : a disciplined index, tone-coded ───────────────────────
const OFFERS: {
  no: string;
  kicker: string;
  title: string;
  body: string;
  cta: string;
  to: string;
  num: string;
  tag: string;
}[] = [
  {
    no: '01',
    kicker: 'Formation',
    title: 'Formateur Augmenté',
    body:
      "Le programme certifiant, délivré dans la Learning App. Vous apprenez à intégrer l'IA dans votre pédagogie, à votre rythme, avec un suivi qui mesure vos progrès réels. Open Badge à l'issue du parcours.",
    cta: 'Voir le programme',
    to: '/marketing/formation',
    num: 'text-primary-200',
    tag: 'text-primary-700',
  },
  {
    no: '02',
    kicker: 'Conseil',
    title: 'Le Studio',
    body:
      "Audit, stratégie IA et déploiement sur-mesure pour les organismes de formation et les entreprises. On part de vos contraintes réelles, via la méthode STRIDE : pas d'un modèle générique.",
    cta: 'Parler de votre projet',
    to: '/marketing/accompagnement',
    num: 'text-secondary-200',
    tag: 'text-secondary-700',
  },
  {
    no: '03',
    kicker: 'Plateforme',
    title: 'La Learning App',
    body:
      'Parcours adaptatifs (progression Dreyfus), coaching 1-1, journal réflexif, veille curée, passeport de compétences et badges. La plateforme qui porte tout le reste.',
    cta: 'Découvrir la plateforme',
    to: '/marketing/learning-app',
    num: 'text-accent-300',
    tag: 'text-accent-700',
  },
];

// ─── Honest proof : what we can claim today, nothing more ─────────────────────
const PROOFS: { title: string; detail: string }[] = [
  { title: 'Open Badge vérifiable', detail: 'une preuve de compétence numérique, partageable et durable.' },
  { title: 'Premiers déploiements en cours', detail: 'dont un grand groupe français, depuis janvier 2026.' },
];

export const MarketingHomeNarrative: React.FC = () => {
  return (
    <div className="bg-white text-ink-900">
      <ScrollProgressIndicator height={3} />

      {/* ── 1. Hero : Direction C cinematic (Illustrated Glass) ────────────────── */}
      <ParallaxSection speed={0.5}>
        <CinematicHero />
      </ParallaxSection>

      {/* ── 2. Conviction : one committed teal stripe ──────────────────────────── */}
      <section className="bg-primary-700 text-white">
        <div className="max-w-wide mx-auto px-6 py-page lg:py-section-lg">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg lg:gap-section items-baseline">
              <p className="lg:col-span-3 font-body text-caption font-semibold uppercase tracking-widest text-white/70 m-0">
                Notre conviction
              </p>
              <h2 className="lg:col-span-9 font-display font-bold text-white leading-[1.08] tracking-tight m-0 [text-wrap:balance] text-[clamp(1.75rem,3.8vw,3rem)]">
                L'IA ne remplace pas le formateur. Elle l'aide à aller plus loin :
                à personnaliser, à mesurer, et à rendre du temps au métier qui
                compte vraiment.
              </h2>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Learn → Do → Match : the immersive system story ─────────────────── */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 pt-page lg:pt-section-lg">
          <Reveal>
            <div className="max-w-content flex flex-col gap-stack-lg">
              <span className="font-body text-caption font-bold uppercase tracking-widest text-secondary-600 m-0">
                La boucle Learn · Do · Match
              </span>
              <h2 className="font-display font-extrabold text-ink-900 leading-[1.04] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.5vw,3.5rem)]">
                De l'apprentissage à la preuve, une seule boucle.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                On n'apprend pas pour cocher une case, mais pour appliquer,
                prouver et faire reconnaître de vraies compétences. Apprendre,
                mettre en pratique, valoriser : sans rupture.
              </p>
              <p className="font-body text-caption text-ink-500 italic m-0">
                À notre connaissance, le seul dispositif français qui relie les
                trois en une boucle intégrée.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="pt-section">
          <div className="max-w-wide mx-auto px-6 mb-section-lg">
            <Reveal>
              <CounterAnimation
                currentStep={0}
                totalSteps={3}
                label="Étape"
                colorClass="text-secondary-600"
              />
            </Reveal>
          </div>
          <StickyScrollStory
            className="pt-0"
            panels={STORY}
            eyebrowToneClass="text-secondary-600"
            visual={(active) => (
              <div className="flex flex-col items-center gap-section-lg">
                <MorphingSVGVisualizer
                  activeIndex={active}
                  size={140}
                  colorClass="text-secondary-600"
                />
                <LearnDoMatchVisual active={active} />
              </div>
            )}
            renderText={(panel) => (
              <ParallexTextLayers
                eyebrow={panel.eyebrow}
                eyebrowSpeed={0.3}
                title={panel.title}
                titleSpeed={0.5}
                body={panel.body}
                bodySpeed={0.7}
              />
            )}
          />
        </div>
      </section>

      {/* ── 4. Show, don't tell : the playable product mockup ──────────────────── */}
      <section className="bg-ink-50">
        <div className="max-w-wide mx-auto px-6 py-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-section lg:gap-page items-center">
            <div className="lg:col-span-4 flex flex-col gap-stack-lg">
              <Reveal>
                <h2 className="font-display font-extrabold text-ink-900 leading-[1.04] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4vw,3.25rem)]">
                  Essayez la plateforme avant d'en parler à votre équipe.
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-md">
                  Pas de demo call, pas de slides. Cliquez sur les onglets,
                  regardez l'app fonctionner, comprenez en trente secondes ce que
                  vivent vos apprenants.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <ul className="flex flex-col gap-stack m-0 p-0 list-none">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-stack-xs">
                      <CheckCircle2 size={20} className="text-primary-600 shrink-0 mt-0.5" />
                      <span className="font-body text-body text-ink-800">{f}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="pt-stack">
                  <Link to="/marketing/learning-app">
                    <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Voir toutes les fonctionnalités
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:col-span-8 flex items-center justify-center">
              <div className="rounded-2xl overflow-hidden ring-1 ring-ink-200 shadow-xl bg-white">
                <InteractiveAppMockup />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. What it is : the three offers as a disciplined index ────────────── */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 py-page">
          <Reveal>
            <div className="max-w-content mb-section-lg">
              <h2 className="font-display font-extrabold text-ink-900 leading-[1.04] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.5vw,3.5rem)]">
                Trois manières de travailler ensemble.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed mt-stack-lg max-w-2xl">
                Une formation pour les formateurs, un studio pour les
                organisations, et la plateforme qui relie les deux.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col">
            {OFFERS.map((offer, i) => (
              <Reveal key={offer.no} delay={i * 0.06}>
                <Link
                  to={offer.to}
                  className="group block border-t border-ink-200 py-section-lg first:border-t-0 transition-colors duration-base hover:bg-ink-50"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg lg:gap-section items-start">
                    <div className="lg:col-span-3 flex items-baseline gap-stack">
                      <span className={`font-display font-extrabold ${offer.num} text-h2 leading-none tabular-nums`}>
                        {offer.no}
                      </span>
                      <span className={`font-body text-caption font-semibold uppercase tracking-widest ${offer.tag}`}>
                        {offer.kicker}
                      </span>
                    </div>
                    <div className="lg:col-span-6 flex flex-col gap-stack">
                      <h3 className="font-display font-bold text-ink-900 leading-tight tracking-tight m-0 text-[clamp(1.5rem,2.6vw,2rem)]">
                        {offer.title}
                      </h3>
                      <p className="font-body text-body text-ink-600 leading-relaxed m-0 max-w-prose">
                        {offer.body}
                      </p>
                    </div>
                    <div className="lg:col-span-3 lg:text-right">
                      <span className={`inline-flex items-center gap-stack-xs font-body text-body-sm font-bold ${offer.tag} min-h-touch`}>
                        {offer.cta}
                        <ArrowRight
                          size={18}
                          className="transition-transform duration-base group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
            <div className="border-t border-ink-200" />
          </div>
        </div>
      </section>

      {/* ── 6. Method : STRIDE callout ─────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 pb-page">
          <Reveal>
            <Link
              to="/marketing/accompagnement"
              className="group block rounded-2xl bg-primary-50 px-6 py-section-lg sm:px-section-lg transition-colors duration-base hover:bg-primary-100"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg lg:gap-section items-center">
                <div className="lg:col-span-8 flex flex-col gap-stack">
                  <span className="font-body text-caption font-semibold uppercase tracking-widest text-primary-700 m-0">
                    Notre méthode
                  </span>
                  <h2 className="font-display font-bold text-ink-900 leading-[1.08] tracking-tight m-0 [text-wrap:balance] text-[clamp(1.625rem,3.2vw,2.5rem)]">
                    STRIDE : six étapes pour passer de l'intention à l'impact.
                  </h2>
                  <p className="font-body text-body text-ink-700 leading-relaxed m-0 max-w-prose">
                    Une démarche structurée qui relie le besoin métier, le parcours
                    et la preuve de compétence. Sans jargon, sans détour.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <span className="inline-flex items-center gap-stack-xs font-body text-body font-bold text-primary-700 min-h-touch">
                    Découvrir la méthode
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-base group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 7. Proof : honest, no invented metric, no fake logo ────────────────── */}
      <ParallaxSection speed={0.6} className="bg-gradient-page-ambient-warm">
        <section>
          <div className="max-w-wide mx-auto px-6 py-page">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-section lg:gap-page items-start">
              <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col gap-stack-lg">
                  <span className="font-body text-caption font-bold uppercase tracking-widest text-secondary-600 m-0">
                    La preuve, pas la promesse
                  </span>
                  <h2 className="font-display font-extrabold text-ink-900 leading-[1.04] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4vw,3.25rem)]">
                    On préfère prouver que survendre.
                  </h2>
                  <p className="font-body text-body text-ink-600 leading-relaxed m-0 max-w-sm">
                    Pas de métriques gonflées ni de logos empruntés. Voici ce
                    qu'on peut affirmer aujourd'hui : le reste viendra avec les
                    premiers parcours terminés.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              {PROOFS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05}>
                  <div className="flex items-start gap-stack-lg border-t border-ink-200/70 py-stack-lg first:border-t-0 last:border-b last:border-ink-200/70">
                    <BadgeCheck size={24} className="text-primary-600 shrink-0 mt-0.5" />
                    <p className="font-body text-body-lg leading-snug m-0">
                      <span className="font-bold text-ink-900">{p.title}</span>
                      <span className="text-ink-600"> • {p.detail}</span>
                    </p>
                  </div>
                </Reveal>
              ))}
              <p className="font-body text-caption text-ink-500 italic mt-stack-lg m-0">
                Les retours de nos formateurs et clients seront publiés ici, avec
                leur accord : pas avant.
              </p>
            </div>
          </div>
        </div>
        </section>
      </ParallaxSection>

      {/* ── 8. Blog teaser : editorial cross-link, no card chrome ──────────────── */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 py-page">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg lg:gap-section items-end border-b border-ink-200 pb-section-lg">
              <div className="lg:col-span-8 flex flex-col gap-stack">
                <span className="font-body text-caption font-semibold uppercase tracking-widest text-ink-500 m-0">
                  Le blog
                </span>
                <h2 className="font-display font-extrabold text-ink-900 leading-[1.06] tracking-tight m-0 [text-wrap:balance] text-[clamp(1.75rem,3.6vw,2.75rem)]">
                  L'IA en formation, sans esbroufe.
                </h2>
                <p className="font-body text-body text-ink-600 leading-relaxed m-0 max-w-prose">
                  Des analyses concrètes, des retours de terrain et des prises de
                  position. Pour décider en connaissance de cause, pas sur la hype.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link to="/marketing/magazine">
                  <Button variant="secondary" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
                    Lire le blog
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 9. Final CTA : the one dark section, ONE primary action ────────────── */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 pb-page">
          <ScrollReveal distance={32} duration={800}>
            <div className="relative overflow-hidden rounded-2xl bg-ink-900 text-white px-6 py-page sm:px-section-lg">
              <MeshGradientBg tone="ink" intensity="subtle" />
              <div className="relative max-w-content flex flex-col gap-stack-lg">
                <h2 className="font-display font-extrabold text-white leading-[1.02] tracking-tight m-0 [text-wrap:balance] text-[clamp(2.25rem,5vw,4rem)]">
                  Discutons de vos enjeux, pas de la hype.
                </h2>
                <p className="font-body text-body-lg text-white/80 leading-relaxed m-0 max-w-2xl">
                  Trente minutes pour comprendre votre contexte et tracer le chemin
                  le plus court vers l'impact. Sans engagement.
                </p>
                <div className="flex flex-wrap items-center gap-stack-xs pt-stack">
                  <MagneticButton strength={16}>
                    <Link to="/marketing/contact">
                      <Button variant="secondary" size="xl" trailingIcon={<ArrowRight size={20} />}>
                        Réserver un échange
                      </Button>
                    </Link>
                  </MagneticButton>
                  <Link to="/marketing/learning-app">
                    <Button variant="glass" size="xl" trailingIcon={<ArrowUpRight size={20} />}>
                      Explorer la plateforme
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default MarketingHomeNarrative;
