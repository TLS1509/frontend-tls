# Product

## Register

brand

> This default covers the public marketing site (`/marketing/*`), where the design *is* the product. The internal learning app (`/dashboard`, `/learning-paths`, `/coaching`, …) is a **product** register surface governed by `DESIGN.md` + `CLAUDE.md`; override per task when working inside the app.

## Users

**Who.** Professionals in the training & L&D world, in three overlapping shapes:
- **Formateurs / independent trainers** who want to stay relevant as AI reshapes their craft — the core buyer of the *Formateur Augmenté* certifying program.
- **L&D / training leaders in companies** (CLO, DRH, responsables formation) evaluating how to deploy AI across their teams without losing pedagogical quality.
- **Organismes de formation (OF)** needing to modernize delivery while staying Qualiopi-compliant.

**Context.** They arrive anxious or curious about AI in training ("will this replace me / my trainers?"), having seen a lot of hype and few concrete answers. They are evaluating, comparing, and need to trust before they engage. Mostly desktop during work research, significant mobile share.

**Job to be done.** Become *IA-ready* without becoming dependent on AI: learn to integrate it into real pedagogical practice, measure genuine skill growth, and keep the human relationship at the center. For leaders: a credible, low-risk path to deploy AI in their training org.

## Product Purpose

The Learning Society is an EdTech platform for **AI-augmented professional training**. It sells three connected offers:
1. **Formation — Formateur Augmenté** : a certifying program (Qualiopi, Open Badge 2.0) delivered through the **Learning App** — adaptive parcours with Dreyfus-level progression, integrated 1-1 coaching, a reflective journal, curated pedagogical veille, a competency passport, and gamification.
2. **Accompagnement / Studio** : consulting — audit, AI strategy, custom deployment and change management for OF and companies.
3. **Conseil** : advisory and bespoke AI-in-training projects.

Success = a trainer or L&D leader leaves the site understanding *exactly* what TLS does, trusting it isn't hype, and taking one concrete next step (start the formation, book a 30-min exchange, or try the app). The site must feel as crafted as the product it sells.

## Brand Personality

**Three words: Stratégique. Augmenté. Humain.** (internal alignment triplet — not a public tagline).

Voice: confident, pedagogical, pragmatic, anti-hype. It speaks to experts as peers ("on ne vend pas du rêve, on vous aide à mettre en place une IA qui fonctionne, vraiment"). Warm but serious; specific over sweeping. The emotional goal is **earned confidence** — the visitor should feel "these people actually know what they're doing, and they respect my craft."

Public tagline direction (under arbitration, lean competitive/augmentation): *"Maîtrisez l'IA. Avant qu'elle ne vous remplace."* / *"L'IA augmente vos compétences. Pas l'inverse."* — the human trainer doesn't disappear, they level up toward accompaniment and mastery.

## Anti-references

The site must **NOT** read as any of these (all explicitly rejected by the team):
- **Generic SaaS 2026** : cream/beige body bg, a tiny uppercase tracked eyebrow above every section, endless identical icon+title+text card grids.
- **Corporate e-learning** : stock photos of people smiling at laptops, flat corporate blue, institutional tone with no point of view.
- **AI hype** : neon glow, violet/cyan gradients, "Powered by AI" badges, robot imagery, magic-AI promises. The AI is an *instrument*, never magic.
- **Reflexive editorial-magazine** : display serif + italic + drop caps + broadsheet grid applied without a real editorial reason. (Restraint and typographic confidence are welcome — but through the brand's own League Spartan, not a borrowed Fraunces/Cormorant costume.)
- Also banned (brand doctrine): mascots/cartoons, and anglo-clichés ("Unlock", "Empower", "Transform", "Embrace AI").

## Design Principles

1. **L'IA est un instrument, pas une magie.** Show concrete capability (real product UI, measurable outcomes: Dreyfus levels, Qualiopi, Open Badge, impact metrics). Never breathless, never fear-as-clickbait.
2. **Practice what you preach.** The marketing surface must be as considered as the Learning App's design system. Sloppy craft here contradicts the product's whole premise.
3. **L'humain au centre.** The trainer/learner is the hero of every scene; AI is the tool that augments them. Imagery and copy keep a human in frame.
4. **Montrer, pas raconter.** Demonstrate over assert — interactive mockups, real screens, specific numbers — instead of adjective-stacking.
5. **Crédibilité sobre.** Premium restraint over decoration. Trust is built with specificity and clarity, not with more effects. Distinctive, never generic.

## Accessibility & Inclusion

- **WCAG 2.1 AA** target. Body text ≥ 4.5:1, large text ≥ 3:1, placeholders ≥ 4.5:1 (watch white-on-glass CTAs over gradients — a known current failure).
- **Reduced motion is mandatory.** Every animation has a `prefers-reduced-motion: reduce` fallback (the marketing motion primitives already wire `useReducedMotion`); never gate content visibility on a reveal.
- **Touch targets ≥ 44px** (`min-h-touch` / `h-touch`) on all interactive elements.
- Keyboard-visible focus states; meaningful link text and alt text (alt text is part of the brand voice).
