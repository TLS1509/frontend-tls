# 🧪 Page Autodiagnostic - Proposition PAD

> Mirror local — export Notion du 28/07/2026. Statut : spec complète (landing + 2 tests × 8 Q fermées + 2 Q ouvertes + scoring + génération PDF). **Confirmé en réunion 28/07 : les DEUX diagnostics (SBO + IA) sont maintenus**, pas un seul — la logique métier des deux est déjà codée côté PAD (barème, calcul, questions), reste le front-end à faire. Un fichier zip `TEST_WIZARD_PAGE_AUTODIAG.zip` est joint à la page Notion source (composant front demandé rapidement à un outil de code, pas le design final).

## SECTION 1 : Landing Page Hub (Écran 0)

**H1** : Évaluez la maturité stratégique de votre organisation en 3 minutes.
**Sous-titre** : Obtenez un diagnostic instantané et recevez un rapport personnalisé avec des recommandations d'actions concrètes.

**Carte 1 — Diagnostic SBO Readiness** (cible DRH/L&D/Dir. Transformation) : matrice de compétences vivante, élimination compétences fantômes, fin des fiches de poste. 3 min, 8 questions + 2 ouvertes.
**Carte 2 — Diagnostic IA Readiness** (cible CODIR/Ops/Dir. Digital) : usage réel de l'IA générative, processus augmentés, ancrage terrain WIL/AFEST. 3 min, 8 questions + 2 ouvertes.

**Réassurance** : ⚠️ *"Plus de 120 organisations ont évalué leur readiness cette année"* — chiffre à vérifier/sourcer avant publication (FACTS-CANON : pas de claim non vérifié). 100% confidentiel, restitution immédiate, modèle scientifique.

## SECTION 2 : Méthode de Calcul

8 questions fermées à choix unique (A=0pt obsolète, B=1pt émergent, C=2pt structuré, D=3pt natif SBO/TLS). Score brut ∈ [0,24] → Score final = round(brut/24 × 100).

## SECTION 3 : Test 1 — SBO Readiness (Q1-Q8)

1. Modélisation des Métiers (fiches figées → briques SBO vivantes)
2. Évaluation de la Maîtrise (déclaratif annuel → échelle Dreyfus + preuves)
3. Fraîcheur des Données RH (annuelle → temps réel)
4. Gestion de l'Obsolescence/Atrophie (acquis à vie → dégradation auto à 90j)
5. Granularité du Référentiel (liste générique → Hard/Soft/Out-skills)
6. Alignement Projets & Skill Gaps (feeling → Heatmap 360°)
7. Mécanisme de Formation (stage hors travail → Work-Integrated Learning/EDRA)
8. Reconnaissance & Valorisation (changement de titre → ⚠️ *"Passeport de compétences certifié avec délivrance d'Open Badges 2.0"* → corriger : retirer "certifié" ou sourcer, et "Open Badge" sans "2.0")

**Questions ouvertes** : frustration principale sur la gestion des compétences · priorité stratégique à 12 mois.

**Grille des profils** : 0-30% Modèle Figé · 31-60% Sensibilisé · 61-85% Skill-Oriented en Transition · 86-100% Native SBO Organization.

## SECTION 4 : Test 2 — IA Readiness (Q1-Q8)

1. Taux d'Adoption Réelle (Shadow AI → 100% intégré)
2. Reconstitution des Processus Métiers (aucun → fiches de process révisées/Out-skills)
3. Acculturation & Formation IA (aucune → veille quotidienne + tuteurs IA)
4. Qualité de la Donnée & Hallucinations (confiance aveugle → double validation)
5. Veille & Évolution Technologique (individuelle → Continuous Intelligence distribuée)
6. Posture des Managers (réticents → co-animent ateliers, valident acquis terrain)
7. Ancrage dans le Travail (livrés à eux-mêmes → méthodologie AFEST/EDRA)
8. ROI & Mesure de la Valeur (aucun suivi → progression Dreyfus mesurée + productivité)

**Questions ouvertes** : frein principal d'adoption · métier/processus qui bénéficierait le plus.

**Grille des profils** : 0-30% Shadow IA & Passivité · 31-60% Expérimentation Aérienne · 61-85% Adoption Structurée · 86-100% Entreprise Augmentée par l'IA.

## SECTION 5 : Génération & Envoi du Rapport PDF

**Architecture** : Frontend (formulaire) → Webhook backend (n8n/Make/Node) → (1) stockage lead CRM, (2) enrichissement LLM des réponses ouvertes → 3 préconisations sur-mesure, (3) génération PDF 6 pages, (4) envoi email HTML + PJ.

**Structure PDF (6 pages)** : Couverture personnalisée · Résumé exécutif + benchmark (radar chart) · Analyse détaillée par axe · Recommandations générées par IA (plan 30/60/90j) · Présentation solution TLS · CTA + lien Calendly.

**Côté TLS en interne** : réception d'un fichier Markdown importé dans Market Studio.

**Template email** : objet `[Rapport Diagnostic TLS] Votre bilan de maturité {type} - {entreprise}`, corps personnalisé avec score, force principale, zone de vulnérabilité, CTA débriefing 15 min.
