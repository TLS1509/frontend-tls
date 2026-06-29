---
timestamp: 2026-06-26T15-59-44Z
slug: src-pages-marketing
---
# Critique — src/pages/marketing — 2026-06-26

## Target
src/pages/marketing/ — site marketing public TLS

## Score: 22/40

## Assessment Independence
Degraded — Assessment A (sub-agent) + Assessment B (CLI detector + browser eval) run sequentially, not fully isolated.

## Detector
CLI: [] (clean — P0 gradient text already fixed in 48c18b2)
Browser: 3 findings confirmed via DOM inspection

## Priority Issues

### P0-A: Open Badge duplicated in trust section (MarketingHome)
"QUALITÉ & FINANCEMENT" section: items 1 and 3 both titled "Open Badge" with near-identical descriptions.
Fix: Replace item 3 with a distinct third trust signal (RGPD, partenariat C-Campus, 100% à distance, etc.)

### P0-B: Contact form never sends data (all 3 contact forms)
setSubmitted(true) with no API call. MarketingContact, MarketingAccompagnement, MarketingLearningApp.
Fix: Wire to Resend/Brevo/FormSpree or at minimum mailto fallback.

### P1-A: Tu/vous register inconsistency on Contact page
"Réserve un échange de 30 min" (aside) + "Tes données restent confidentielles" (form disclaimer) = tu
while entire site uses vous. 
Fix: "Réservez un échange" + "Vos données restent confidentielles"

### P1-B: Eyebrow on every section across all pages
MarketingFormation: 7 consecutive eyebrows. Remove 60%+ — reserve for major narrative transitions.

### P2-A: LearningApp page lacks emotional peak
5 layout sections, none with different visual weight. Add one manifesto-style dark pull-quote or anchor section.

### P2-B: Accompagnement 6 service cards undifferentiated
"Diagnostic & Stratégie" should be visually dominant (entry point). Currently all equal.

### P3: Methode use-case metrics are illustrative but presented as real
Specific percentages + blanket disclaimer = credibility hole. Commit to real sourced numbers or use qualitative framing.

## Strengths
1. Motion architecture genuinely premium (framer-motion, restrained, reduced-motion honored)
2. Copy has real voice moments ("Essayez-la avant d'en parler à votre équipe")
3. Trust signals honest and sourced (C-Campus 2023, 578 apprenants, disclaimer on illustrative examples)

## Provocative Question
What is the one thing about L&D and IA that TLS believes is true and most of the industry believes is false?
