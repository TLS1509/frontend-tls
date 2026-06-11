/**
 * Motion primitives lab: internal showcase for Phase 1.0 validation.
 * Visible at /marketing/_motion-lab. Will be removed once primitives are validated in production pages.
 */

import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Brain, Target } from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  MeshGradientBg,
  FadeInWhenVisible,
  ParallaxLayer,
  MagneticButton,
  GradientText,
  MarqueeRow,
  CountUp,
  StickyScrollStory,
  InteractiveAppMockup,
  type StoryPanel,
} from '../../components/marketing/motion';

const SECTION = 'min-h-screen flex flex-col justify-center py-page border-b border-ink-100';
const SECTION_INNER = 'max-w-6xl mx-auto px-6 flex flex-col gap-stack-lg w-full';
const SECTION_TITLE = 'font-display text-h2 font-extrabold text-ink-900 leading-tight m-0';
const SECTION_EYEBROW = 'font-body text-caption font-bold text-warning-fg uppercase tracking-widest';

const LOGO_ITEMS = [
  'Renault', 'BNP Paribas', 'Capgemini', "L'Oréal", 'Airbus', 'Decathlon', 'Orange', 'Société Générale',
];

const STORY_PANELS: StoryPanel[] = [
  {
    eyebrow: 'Principe 01',
    title: "L'intelligence augmente.",
    body: "L'IA est un copilote pour vos formateurs. Elle accélère la conception, personnalise les parcours, et libère du temps pour l'accompagnement humain qui fait la vraie différence.",
  },
  {
    eyebrow: 'Principe 02',
    title: 'La pédagogie reste reine.',
    body: "Avant chaque feature, une question : est-ce qu'elle améliore l'apprentissage profond ? Nous ne shippons pas de gadgets, nous concevons des outils au service de la transmission.",
  },
  {
    eyebrow: 'Principe 03',
    title: "L'éthique se code dans les fondations.",
    body: "RGPD, AI Act, audit trail des décisions IA : tout est intégré dès le design, jamais en patch. La confiance se construit, elle ne se promet pas.",
  },
];

const STORY_VISUALS = [
  { tone: 'from-primary-500 to-primary-700', icon: <Brain size={48} />, label: "L'IA assiste" },
  { tone: 'from-secondary-500 to-secondary-600', icon: <BookOpen size={48} />, label: 'La pédagogie guide' },
  { tone: 'from-accent-400 to-secondary-500', icon: <Target size={48} />, label: "L'éthique cadre" },
];

export const MarketingMotionLab: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Intro */}
      <header className="relative pt-32 pb-section overflow-hidden">
        <MeshGradientBg tone="primary" intensity="subtle" />
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-white border border-ink-200 shadow-xs">
            <Sparkles size={14} className="text-accent-400" />
            <span className="font-body text-caption font-semibold text-ink-700 tracking-wider uppercase">
              Motion Lab · Phase 1.0
            </span>
          </span>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0">
            9 primitives pour{' '}
            <GradientText from="from-secondary-500" via="via-secondary-600" to="to-accent-500">
              animer le site marketing
            </GradientText>
            .
          </h1>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-prose">
            Scroll pour voir chaque primitive en action. Toutes respectent prefers-reduced-motion.
          </p>
        </div>
      </header>

      {/* 01: MeshGradientBg */}
      <section className={`${SECTION} relative overflow-hidden`}>
        <MeshGradientBg tone="warm" intensity="normal" />
        <div className={`${SECTION_INNER} relative`}>
          <span className={SECTION_EYEBROW}>01 · MeshGradientBg</span>
          <h2 className={SECTION_TITLE}>Fond mesh-gradient animé.</h2>
          <p className="font-body text-body-lg text-ink-700 max-w-prose m-0">
            5 tones (primary / warm / sun / brand / ink). 3 blobs drift en loop 18-28s, blur 100-120px.
            Cette section utilise <code className="px-1.5 py-0.5 rounded bg-ink-100 text-caption">tone="warm"</code>.
          </p>
        </div>
      </section>

      {/* 02: FadeInWhenVisible */}
      <section className={SECTION}>
        <div className={SECTION_INNER}>
          <span className={SECTION_EYEBROW}>02 · FadeInWhenVisible</span>
          <h2 className={SECTION_TITLE}>IntersectionObserver fade-in.</h2>
          <p className="font-body text-body-lg text-ink-700 max-w-prose m-0">
            5 directions (up/down/left/right/none), trigger margin ajustable. Scroll lentement pour voir.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack pt-stack">
            {['up', 'left', 'right'].map((dir, i) => (
              <FadeInWhenVisible
                key={dir}
                direction={dir as 'up' | 'left' | 'right'}
                delay={i * 0.15}
                className="rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-6 min-h-40 flex flex-col gap-2"
              >
                <span className="font-body text-caption font-bold text-primary-700 uppercase">direction</span>
                <h3 className="font-display text-h3 font-bold text-ink-900 m-0">{dir}</h3>
                <p className="font-body text-body-sm text-ink-600 m-0">
                  Delay {i * 0.15}s, duration 0.7s, ease cubic.
                </p>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* 03: ParallaxLayer */}
      <section className={`${SECTION} relative overflow-hidden`}>
        <div className={`${SECTION_INNER} relative`}>
          <span className={SECTION_EYEBROW}>03 · ParallaxLayer</span>
          <h2 className={SECTION_TITLE}>Parallax multi-couches au scroll.</h2>
          <p className="font-body text-body-lg text-ink-700 max-w-prose m-0">
            3 couches : back amplitude 80 (lent), mid 40, front 15 (rapide). Scroll vers le haut et bas pour voir le décalage.
          </p>
          <div className="relative h-[400px] mt-stack">
            <ParallaxLayer amplitude={80} className="absolute inset-x-0 top-0">
              <div className="w-48 h-48 rounded-pill bg-primary-200/60 blur-xl mx-auto" />
            </ParallaxLayer>
            <ParallaxLayer amplitude={40} className="absolute inset-x-0 top-16">
              <div className="w-32 h-32 rounded-pill bg-secondary-300/70 blur-md mx-auto" />
            </ParallaxLayer>
            <ParallaxLayer amplitude={15} className="absolute inset-x-0 top-28">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-400 to-secondary-500 mx-auto flex items-center justify-center text-white font-bold">
                FRONT
              </div>
            </ParallaxLayer>
          </div>
        </div>
      </section>

      {/* 04: MagneticButton */}
      <section className={SECTION}>
        <div className={SECTION_INNER}>
          <span className={SECTION_EYEBROW}>04 · MagneticButton</span>
          <h2 className={SECTION_TITLE}>Boutons magnétiques.</h2>
          <p className="font-body text-body-lg text-ink-700 max-w-prose m-0">
            Approche ton curseur des CTAs ci-dessous : ils suivent à 12px max, spring physics.
          </p>
          <div className="flex flex-wrap items-center gap-stack pt-stack">
            <MagneticButton strength={12}>
              <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                CTA principal
              </Button>
            </MagneticButton>
            <MagneticButton strength={8}>
              <Button variant="primary" size="lg">
                CTA secondaire
              </Button>
            </MagneticButton>
            <MagneticButton strength={20}>
              <Button variant="ghost" size="lg">
                Strong magnetic
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 05: GradientText */}
      <section className={SECTION}>
        <div className={SECTION_INNER}>
          <span className={SECTION_EYEBROW}>05 · GradientText</span>
          <h2 className={SECTION_TITLE}>
            Texte avec{' '}
            <GradientText>gradient teal animé</GradientText>,{' '}
            <GradientText from="from-secondary-500" via="via-secondary-600" to="to-accent-500">
              gradient warm
            </GradientText>{' '}
            ou{' '}
            <GradientText from="from-accent-400" via="via-secondary-500" to="to-primary-600">
              tri-color sun
            </GradientText>
            .
          </h2>
          <p className="font-body text-body-lg text-ink-700 max-w-prose m-0">
            Position du gradient bouge sur 12s en loop. Désactivable via <code className="px-1.5 py-0.5 rounded bg-ink-100 text-caption">animated=false</code>.
          </p>
        </div>
      </section>

      {/* 06: MarqueeRow */}
      <section className={SECTION}>
        <div className={SECTION_INNER}>
          <span className={SECTION_EYEBROW}>06 · MarqueeRow</span>
          <h2 className={SECTION_TITLE}>Marquee logos infinite.</h2>
          <p className="font-body text-body-lg text-ink-700 max-w-prose m-0">
            Edge fade gauche/droite, direction réversible, durée ajustable.
          </p>
        </div>
        <div className="mt-stack-lg w-full">
          <MarqueeRow
            duration={40}
            items={LOGO_ITEMS.map((name) => (
              <span className="font-display text-h3 font-bold text-ink-500 tracking-tight whitespace-nowrap">
                {name}
              </span>
            ))}
          />
        </div>
        <div className="mt-stack w-full">
          <MarqueeRow
            duration={50}
            reverse
            items={LOGO_ITEMS.map((name) => (
              <span className="font-display text-h4 font-bold text-primary-700 tracking-tight whitespace-nowrap">
                {name}
              </span>
            ))}
          />
        </div>
      </section>

      {/* 07: CountUp */}
      <section className={SECTION}>
        <div className={SECTION_INNER}>
          <span className={SECTION_EYEBROW}>07 · CountUp</span>
          <h2 className={SECTION_TITLE}>Compteurs numériques IO-triggered.</h2>
          <p className="font-body text-body-lg text-ink-700 max-w-prose m-0">
            Anime en easeOutCubic dès que le composant entre dans le viewport. Format locale FR.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-stack pt-stack">
            {[
              { label: 'Formateurs certifiés', to: 200, suffix: '+' },
              { label: 'Organisations', to: 40, suffix: '+' },
              { label: 'Modules pédagogiques', to: 120, suffix: '+' },
              { label: 'Satisfaction', to: 97, suffix: ' %' },
            ].map((m) => (
              <div key={m.label} className="flex flex-col gap-1 p-4 rounded-2xl bg-primary-50/40 border border-primary-100">
                <CountUp
                  to={m.to}
                  suffix={m.suffix}
                  className="font-display text-h1 font-extrabold text-primary-700 leading-none"
                />
                <span className="font-body text-caption text-ink-600 mt-1">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08: InteractiveAppMockup */}
      <section className={SECTION}>
        <div className={SECTION_INNER}>
          <span className={SECTION_EYEBROW}>08 · InteractiveAppMockup</span>
          <h2 className={SECTION_TITLE}>Mockup app jouable inline.</h2>
          <p className="font-body text-body-lg text-ink-700 max-w-prose m-0">
            Clique sur les onglets : Parcours / Coaching / Journal / Veille. Chaque panel a ses animations internes staggered.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-page items-center pt-stack">
            <div className="flex flex-col gap-stack max-w-md">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                La Learning App, jouable
              </span>
              <h3 className="font-display text-h2 font-extrabold text-ink-900 leading-tight m-0">
                Essaie-la avant d'en parler à ton équipe.
              </h3>
              <p className="font-body text-body text-ink-600 m-0">
                Pas besoin de démo, pas besoin de demo call. Clique, regarde, comprends.
              </p>
            </div>
            <InteractiveAppMockup />
          </div>
        </div>
      </section>

      {/* 09: StickyScrollStory */}
      <div>
        <div className={`${SECTION_INNER} pt-page`}>
          <span className={SECTION_EYEBROW}>09 · StickyScrollStory</span>
          <h2 className={SECTION_TITLE}>Sticky scroll storytelling.</h2>
          <p className="font-body text-body-lg text-ink-700 max-w-prose m-0">
            Section 300vh : le visuel reste sticky, les 3 panels texte fadent/translatent l'un après l'autre au scroll.
          </p>
        </div>
        <StickyScrollStory
          panels={STORY_PANELS}
          eyebrowToneClass="text-primary-700"
          visual={(i) => {
            const v = STORY_VISUALS[i];
            return (
              <div
                className={`relative w-full aspect-square max-w-md rounded-3xl overflow-hidden bg-gradient-to-br ${v.tone} flex items-center justify-center text-white shadow-2xl`}
              >
                <div className="flex flex-col items-center gap-stack">
                  {v.icon}
                  <span className="font-display text-h3 font-extrabold">{v.label}</span>
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* Footer note */}
      <footer className="py-page bg-ink-50 border-t border-ink-100">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-stack">
          <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0">
            ✅ 9 primitives prêtes.
          </h2>
          <p className="font-body text-body-lg text-ink-600 m-0">
            Phase 1.0 validée → on attaque le header fix puis la home immersive.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MarketingMotionLab;
