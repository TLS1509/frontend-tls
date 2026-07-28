/* ==========================================================================
   AUTO-DIAGNOSTIC B2B — Application SPA en JavaScript Vanille
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* 1. BANQUES DE QUESTIONS                                             */
  /* ------------------------------------------------------------------ */

  const QUESTION_BANKS = {
    sbo: {
      label: 'SBO Readiness',
      theme: 'sbo',
      openQuestions: [
        "Quelle est aujourd'hui votre principale frustration concernant la gestion des compétences et le développement de vos talents ?",
        "Si vous deviez résoudre un seul enjeu prioritaire RH/Compétences dans les 12 prochains mois, quel serait-il ?"
      ],
      profiles: [
        { max: 30, name: 'Niveau 1 : Modèle Figé', synthesis: "Votre gestion des compétences repose encore sur des outils statiques (fiches de poste, tableurs) déconnectés de la réalité du terrain. La priorité est d'amorcer une cartographie vivante des compétences." },
        { max: 60, name: 'Niveau 2 : Sensibilisé', synthesis: "Des initiatives ponctuelles existent, mais elles restent isolées et peu outillées. Le passage à l'échelle nécessite une structuration autour de référentiels partagés et actualisés." },
        { max: 85, name: 'Niveau 3 : Skill-Oriented en Transition', synthesis: "Votre organisation a engagé une vraie transformation vers le pilotage par les compétences. Il reste à fiabiliser la fraîcheur des données et à généraliser l'approche à l'ensemble des métiers." },
        { max: 100, name: 'Niveau 4 : Native SBO Organization', synthesis: "Votre organisation pilote nativement par les compétences : cartographie vivante, évaluation par preuves et reconnaissance certifiée. Vous êtes en position de référence sur ce sujet." }
      ],
      questions: [
        {
          title: 'Modélisation des Métiers',
          options: [
            'Fiches de poste figées Word/PDF',
            'Référentiels L&D mis à jour 1x/an',
            'Cartographies partagées mais déconnectées des projets',
            '100% SBO, briques vivantes rattachées aux missions'
          ]
        },
        {
          title: 'Évaluation de la Maîtrise',
          options: [
            'Entretien annuel déclaratif',
            'Quiz e-learning théoriques',
            'Auto-évaluations régulières',
            "Échelle d'observation Dreyfus 1 à 5 basée sur preuves"
          ]
        },
        {
          title: 'Fraîcheur des Données',
          options: [
            'Annuelle / Bisannuelle',
            'Ponctuelle post-formation',
            'Trimestrielle au volontariat',
            'Temps réel (veille, parcours, projets)'
          ]
        },
        {
          title: "Gestion de l'Obsolescence",
          options: [
            'Acquis à vie',
            "Supposée s'estomper sans outil",
            'Réévaluation manuelle managers',
            "Dégradation automatique après 90j d'inactivité + alerte"
          ]
        },
        {
          title: 'Granularité du Référentiel',
          options: [
            'Liste générique transversale',
            'Hard vs Soft skills classique',
            'Référentiel par fiche de poste',
            '3 domaines : Hard, Soft, Out skills (IA)'
          ]
        },
        {
          title: 'Alignement Projets & Skill Gaps',
          options: [
            'Réseau / Feeling / Intitulé',
            'Consultation CV interne',
            'Recherche mots-clés base talents',
            'Heatmap 360° en temps réel des skill gaps'
          ]
        },
        {
          title: 'Mécanisme de Formation',
          options: [
            'Stages ponctuels plusieurs jours',
            'Catalogue e-learning vidéo passif',
            'Blended learning théorie + quiz',
            'Work-Integrated Learning (Micro-veille + EDRA)'
          ]
        },
        {
          title: 'Reconnaissance & Valorisation',
          options: [
            'Intitulé de poste / Fiche de paie uniquement',
            'Attestation de présence PDF',
            'Badge interne non standard',
            'Open Badges 2.0 certifiés et vérifiables'
          ]
        }
      ]
    },

    ia: {
      label: 'IA Readiness',
      theme: 'ia',
      openQuestions: [
        "Quel est actuellement le principal frein qui empêche vos équipes d'intégrer pleinement l'IA dans leur travail quotidien ?",
        "Quel métier ou processus de votre entreprise bénéficierait le plus d'une augmentation par l'IA dans les prochains mois ?"
      ],
      profiles: [
        { max: 30, name: 'Niveau 1 : Shadow IA & Passivité', synthesis: "L'IA est utilisée de façon individuelle et non encadrée, sans réécriture des processus. Le risque est une adoption fragmentée sans valeur mesurable pour l'organisation." },
        { max: 60, name: 'Niveau 2 : Expérimentation Aérienne', synthesis: "Des usages émergent mais restent superficiels, sans ancrage dans les processus métiers réels. Il est temps de structurer la formation et de mesurer les premiers cas d'usage." },
        { max: 85, name: 'Niveau 3 : Adoption Structurée', synthesis: "L'IA est intégrée à des processus identifiés, avec un accompagnement des équipes. La prochaine étape est de généraliser la mesure de valeur et l'ancrage terrain durable." },
        { max: 100, name: 'Niveau 4 : Entreprise Augmentée par l\'IA', synthesis: "Votre organisation a transformé ses processus métiers grâce à l'IA, avec une adoption large, mesurée et ancrée dans le travail réel des équipes. Vous êtes en position de référence sur ce sujet." }
      ],
      questions: [
        {
          title: 'Taux d\'Adoption Réelle',
          options: [
            'Shadow AI individuel non encadré',
            'Quelques paires moteurs',
            'Licences distribuées, tests fréquents',
            '100% des équipes sur tâches identifiées'
          ]
        },
        {
          title: 'Reconstitution des Processus Métiers',
          options: [
            'Aucun process réécrit',
            'Recherche / Correction de texte basique',
            'Processus clés identifiés avec prompts',
            'Fiches de process révisées avec l\'IA à chaque étape (Out-skills)'
          ]
        },
        {
          title: 'Acculturation & Formation IA',
          options: [
            'Aucune formation',
            'Webinaires de sensibilisation générale',
            'Formations ponctuelles au prompt engineering',
            'Accompagnement continu : veille + tuteurs IA intégrés'
          ]
        },
        {
          title: 'Qualité & Hallucinations',
          options: [
            'Confiance aveugle ou méfiance totale',
            'Consigne orale de relecture',
            'Relecture humaine systématique',
            'Validation double : curation IA + experts pédagogiques'
          ]
        },
        {
          title: 'Veille & Innovation IA',
          options: [
            'Veille perso individuelle',
            'Canal Slack/Teams informel',
            'Newsletter mensuelle DSI',
            'Flux Continuous Intelligence distribué par compétences'
          ]
        },
        {
          title: 'Posture des Managers',
          options: [
            'Neutres ou réticents',
            'Encourageants mais sans méthode',
            'Suivi des cas d\'usage et outils',
            'Animation d\'ateliers pratiques (12 pers max) + validation terrain'
          ]
        },
        {
          title: 'Ancrage dans le travail',
          options: [
            'Livrés à eux-mêmes post-formation',
            'Exercices fictifs en atelier',
            'Application sur projet réel sous 1 mois',
            'Méthode AFEST / EDRA avec coaching 1-1'
          ]
        },
        {
          title: 'ROI & Mesure de la Valeur',
          options: [
            'Aucun suivi',
            'Nombre de licences ou connexions',
            'Enquêtes de satisfaction / ressenti',
            'Mesure du niveau de compétence (Dreyfus) + gain process'
          ]
        }
      ]
    }
  };

  const POINTS_PER_OPTION = [0, 1, 2, 3]; // A, B, C, D
  const MAX_TOTAL_POINTS = 24; // 8 questions x 3 pts max

  /* ------------------------------------------------------------------ */
  /* 2. STATE MANAGEMENT                                                 */
  /* ------------------------------------------------------------------ */

  const state = {
    testType: null,        // 'sbo' | 'ia'
    currentQuestion: 0,    // index 0-7
    answers: [],           // { optionIndex, points, questionTitle, optionText }
    openAnswers: ['', ''],
    lead: null,
    score: 0,
    profile: null
  };

  function resetState() {
    state.testType = null;
    state.currentQuestion = 0;
    state.answers = [];
    state.openAnswers = ['', ''];
    state.lead = null;
    state.score = 0;
    state.profile = null;
  }

  /* ------------------------------------------------------------------ */
  /* 3. DOM REFERENCES                                                   */
  /* ------------------------------------------------------------------ */

  const el = {
    body: document.body,
    progressShell: document.getElementById('progressShell'),
    progressFill: document.getElementById('progressFill'),
    progressLabel: document.getElementById('progressLabel'),

    screens: {
      hub: document.getElementById('screen-hub'),
      wizard: document.getElementById('screen-wizard'),
      open: document.getElementById('screen-open'),
      result: document.getElementById('screen-result'),
      report: document.getElementById('screen-report')
    },

    hubCards: document.querySelectorAll('.hub-card'),

    wizardKicker: document.getElementById('wizardKicker'),
    wizardQuestionTitle: document.getElementById('wizardQuestionTitle'),
    wizardOptions: document.getElementById('wizardOptions'),
    btnBack: document.getElementById('btnBack'),

    openKicker: document.getElementById('openKicker'),
    openQ1Label: document.getElementById('openQ1Label'),
    openQ2Label: document.getElementById('openQ2Label'),
    openQ1: document.getElementById('openQ1'),
    openQ2: document.getElementById('openQ2'),
    btnBackOpen: document.getElementById('btnBackOpen'),
    btnSeeResult: document.getElementById('btnSeeResult'),

    resultKicker: document.getElementById('resultKicker'),
    scoreValue: document.getElementById('scoreValue'),
    scoreRingFill: document.getElementById('scoreRingFill'),
    resultProfile: document.getElementById('resultProfile'),
    resultSynthesis: document.getElementById('resultSynthesis'),
    leadForm: document.getElementById('leadForm'),

    reportFirstName: document.getElementById('reportFirstName'),
    reportIntro: document.getElementById('reportIntro'),
    reportKicker: document.getElementById('reportKicker'),
    reportScoreValue: document.getElementById('reportScoreValue'),
    reportScoreRingFill: document.getElementById('reportScoreRingFill'),
    reportProfile: document.getElementById('reportProfile'),
    reportSynthesis: document.getElementById('reportSynthesis'),
    reportAnswersList: document.getElementById('reportAnswersList'),
    reportOpenQ1: document.getElementById('reportOpenQ1'),
    reportOpenA1: document.getElementById('reportOpenA1'),
    reportOpenQ2: document.getElementById('reportOpenQ2'),
    reportOpenA2: document.getElementById('reportOpenA2'),
    btnRestart: document.getElementById('btnRestart'),

    toast: document.getElementById('toast')
  };

  const RING_CIRCUMFERENCE = 2 * Math.PI * 60; // r=60

  /* ------------------------------------------------------------------ */
  /* 4. SCREEN NAVIGATION (avec transition fluide)                      */
  /* ------------------------------------------------------------------ */

  let activeScreenKey = 'hub';

  function goToScreen(key) {
    const current = el.screens[activeScreenKey];
    const next = el.screens[key];
    if (current === next) return;

    current.classList.add('is-leaving');
    current.classList.remove('is-active');

    window.setTimeout(() => {
      current.classList.remove('is-leaving');
      next.classList.add('is-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 180);

    activeScreenKey = key;
    el.progressShell.hidden = (key !== 'wizard');
  }

  /* ------------------------------------------------------------------ */
  /* 5. HUB — SÉLECTION DU DIAGNOSTIC                                    */
  /* ------------------------------------------------------------------ */

  el.hubCards.forEach((card) => {
    card.addEventListener('click', () => {
      const testType = card.getAttribute('data-test');
      startDiagnostic(testType);
    });
  });

  function startDiagnostic(testType) {
    resetState();
    state.testType = testType;
    el.body.setAttribute('data-theme', QUESTION_BANKS[testType].theme);
    renderQuestion();
    goToScreen('wizard');
  }

  /* ------------------------------------------------------------------ */
  /* 6. WIZARD — QUESTIONS FERMÉES (Q1 à Q8)                             */
  /* ------------------------------------------------------------------ */

  function renderQuestion() {
    const bank = QUESTION_BANKS[state.testType];
    const qIndex = state.currentQuestion;
    const question = bank.questions[qIndex];
    const total = bank.questions.length;

    el.wizardKicker.textContent = `Diagnostic ${bank.label}`;
    el.wizardQuestionTitle.textContent = `${qIndex + 1}. ${question.title}`;

    updateProgress(qIndex + 1, total);

    el.wizardOptions.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    const existingAnswer = state.answers[qIndex];

    question.options.forEach((optionText, optIndex) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-card';
      if (existingAnswer && existingAnswer.optionIndex === optIndex) {
        btn.classList.add('is-selected');
      }
      btn.innerHTML = `
        <span class="option-card__letter">${letters[optIndex]}</span>
        <span class="option-card__text">${optionText}</span>
      `;
      btn.addEventListener('click', () => selectOption(optIndex, question.title, optionText));
      el.wizardOptions.appendChild(btn);
    });

    el.btnBack.disabled = (qIndex === 0);
  }

  function updateProgress(current, total) {
    const pct = Math.round((current / total) * 100);
    el.progressFill.style.width = pct + '%';
    el.progressLabel.textContent = `Question ${current} / ${total}`;
  }

  function selectOption(optIndex, questionTitle, optionText) {
    const points = POINTS_PER_OPTION[optIndex];
    state.answers[state.currentQuestion] = {
      optionIndex: optIndex,
      points,
      questionTitle,
      optionText
    };

    // Feedback visuel immédiat avant transition
    const cards = el.wizardOptions.querySelectorAll('.option-card');
    cards.forEach((c, i) => c.classList.toggle('is-selected', i === optIndex));

    const bank = QUESTION_BANKS[state.testType];
    const isLast = state.currentQuestion === bank.questions.length - 1;

    window.setTimeout(() => {
      if (isLast) {
        goToOpenQuestions();
      } else {
        state.currentQuestion += 1;
        renderQuestion();
      }
    }, 260);
  }

  el.btnBack.addEventListener('click', () => {
    if (state.currentQuestion > 0) {
      state.currentQuestion -= 1;
      renderQuestion();
    }
  });

  /* ------------------------------------------------------------------ */
  /* 7. QUESTIONS OUVERTES (Step 9)                                      */
  /* ------------------------------------------------------------------ */

  function goToOpenQuestions() {
    const bank = QUESTION_BANKS[state.testType];
    el.openKicker.textContent = `Diagnostic ${bank.label}`;
    el.openQ1Label.textContent = bank.openQuestions[0];
    el.openQ2Label.textContent = bank.openQuestions[1];
    el.openQ1.setAttribute('placeholder', 'Votre réponse (facultatif)...');
    el.openQ2.setAttribute('placeholder', 'Votre réponse (facultatif)...');
    el.openQ1.value = state.openAnswers[0];
    el.openQ2.value = state.openAnswers[1];
    goToScreen('open');
  }

  el.btnBackOpen.addEventListener('click', () => {
    state.openAnswers[0] = el.openQ1.value;
    state.openAnswers[1] = el.openQ2.value;
    state.currentQuestion = QUESTION_BANKS[state.testType].questions.length - 1;
    renderQuestion();
    goToScreen('wizard');
  });

  el.btnSeeResult.addEventListener('click', () => {
    state.openAnswers[0] = el.openQ1.value.trim();
    state.openAnswers[1] = el.openQ2.value.trim();
    computeResult();
    renderResultScreen();
    goToScreen('result');
  });

  /* ------------------------------------------------------------------ */
  /* 8. SCORING & PROFIL                                                 */
  /* ------------------------------------------------------------------ */

  function computeResult() {
    const totalPoints = state.answers.reduce((sum, a) => sum + (a ? a.points : 0), 0);
    state.score = Math.round((totalPoints / MAX_TOTAL_POINTS) * 100);

    const bank = QUESTION_BANKS[state.testType];
    state.profile = bank.profiles.find((p) => state.score <= p.max) || bank.profiles[bank.profiles.length - 1];
  }

  /* ------------------------------------------------------------------ */
  /* 9. ÉCRAN RÉSULTAT PARTIEL + FORMULAIRE LEAD (Step 10)               */
  /* ------------------------------------------------------------------ */

  function renderResultScreen() {
    const bank = QUESTION_BANKS[state.testType];
    el.resultKicker.textContent = `Diagnostic ${bank.label}`;
    animateScoreRing(el.scoreValue, el.scoreRingFill, state.score);
    el.resultProfile.textContent = state.profile.name;
    el.resultSynthesis.textContent = state.profile.synthesis;
  }

  function animateScoreRing(valueEl, ringEl, score) {
    const offset = RING_CIRCUMFERENCE - (score / 100) * RING_CIRCUMFERENCE;
    // Reset puis anime pour garantir la transition CSS
    ringEl.style.strokeDasharray = RING_CIRCUMFERENCE;
    ringEl.style.strokeDashoffset = RING_CIRCUMFERENCE;
    let current = 0;
    valueEl.textContent = '0';

    requestAnimationFrame(() => {
      ringEl.style.strokeDashoffset = offset;
    });

    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.round(progress * score);
      valueEl.textContent = current;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------ */
  /* 10. FORMULAIRE LEAD B2B                                             */
  /* ------------------------------------------------------------------ */

  el.leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = {
      firstName: document.getElementById('leadFirstName'),
      lastName: document.getElementById('leadLastName'),
      email: document.getElementById('leadEmail'),
      role: document.getElementById('leadRole'),
      companySize: document.getElementById('leadCompanySize')
    };

    let valid = true;
    Object.values(fields).forEach((field) => field.classList.remove('is-invalid'));

    if (!fields.firstName.value.trim()) { fields.firstName.classList.add('is-invalid'); valid = false; }
    if (!fields.lastName.value.trim()) { fields.lastName.classList.add('is-invalid'); valid = false; }
    if (!fields.role.value.trim()) { fields.role.classList.add('is-invalid'); valid = false; }
    if (!fields.companySize.value) { fields.companySize.classList.add('is-invalid'); valid = false; }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(fields.email.value.trim())) {
      fields.email.classList.add('is-invalid');
      valid = false;
    }

    if (!valid) {
      showToast('Merci de compléter tous les champs obligatoires.');
      return;
    }

    state.lead = {
      firstName: fields.firstName.value.trim(),
      lastName: fields.lastName.value.trim(),
      email: fields.email.value.trim(),
      role: fields.role.value.trim(),
      companySize: fields.companySize.value
    };

    renderReportScreen();
    goToScreen('report');
  });

  /* ------------------------------------------------------------------ */
  /* 11. ÉCRAN RESTITUTION COMPLÈTE & RDV (Step 11)                      */
  /* ------------------------------------------------------------------ */

  function renderReportScreen() {
    const bank = QUESTION_BANKS[state.testType];

    el.reportFirstName.textContent = state.lead.firstName + ' !';
    el.reportIntro.textContent = `Voici la restitution complète de votre diagnostic ${bank.label}.`;
    el.reportKicker.textContent = `Diagnostic ${bank.label}`;

    animateScoreRing(el.reportScoreValue, el.reportScoreRingFill, state.score);
    el.reportProfile.textContent = state.profile.name;
    el.reportSynthesis.textContent = state.profile.synthesis;

    el.reportAnswersList.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    state.answers.forEach((answer, i) => {
      const li = document.createElement('li');
      li.className = 'report-answer-item';
      li.innerHTML = `
        <div class="report-answer-item__q">${i + 1}. ${answer.questionTitle}</div>
        <div class="report-answer-item__a">
          <span class="report-answer-item__pts">${letters[answer.optionIndex]} · ${answer.points} pt${answer.points > 1 ? 's' : ''}</span>
          <span>${answer.optionText}</span>
        </div>
      `;
      el.reportAnswersList.appendChild(li);
    });

    el.reportOpenQ1.textContent = bank.openQuestions[0];
    el.reportOpenA1.textContent = state.openAnswers[0] || 'Non renseigné.';
    el.reportOpenQ2.textContent = bank.openQuestions[1];
    el.reportOpenA2.textContent = state.openAnswers[1] || 'Non renseigné.';
  }

  /* ------------------------------------------------------------------ */
  /* 12. SIMULATION CALENDLY / HUBSPOT                                   */
  /* ------------------------------------------------------------------ */

  document.querySelectorAll('.calendly-slot').forEach((slot) => {
    slot.addEventListener('click', () => {
      document.querySelectorAll('.calendly-slot').forEach((s) => {
        s.classList.remove('is-booked');
        s.disabled = false;
      });
      slot.classList.add('is-booked');
      showToast(`Débriefing confirmé : ${slot.textContent}. Une invitation vous sera envoyée par email.`);
    });
  });

  /* ------------------------------------------------------------------ */
  /* 13. RESTART                                                         */
  /* ------------------------------------------------------------------ */

  el.btnRestart.addEventListener('click', () => {
    resetState();
    el.body.removeAttribute('data-theme');
    el.leadForm.reset();
    document.querySelectorAll('.calendly-slot').forEach((s) => s.classList.remove('is-booked'));
    goToScreen('hub');
  });

  /* ------------------------------------------------------------------ */
  /* 14. TOAST UTILITAIRE                                                */
  /* ------------------------------------------------------------------ */

  let toastTimeout = null;
  function showToast(message) {
    el.toast.textContent = message;
    el.toast.hidden = false;
    requestAnimationFrame(() => el.toast.classList.add('is-visible'));
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => {
      el.toast.classList.remove('is-visible');
      window.setTimeout(() => { el.toast.hidden = true; }, 320);
    }, 3200);
  }

})();
