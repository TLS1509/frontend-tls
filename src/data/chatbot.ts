import type { ChatSession, ChatMessage, ChatSourceCitation, ChatIntentCategory, KBSourceModule } from '../types/learning';

export const MOCK_CHAT_SESSION_ID = 'session-demo-001';

/** Privacy blocklist — questions containing these keywords are blocked */
export const PRIVACY_BLOCKLIST = [
  'clients', 'revenus', 'chiffre d\'affaires', 'salaire', 'données personnelles',
  'confidentiel', 'factures', 'bankcard', 'mot de passe', 'password',
];

/** Suggested quick-start questions shown in the sidebar */
export const CHAT_SUGGESTIONS = [
  { id: 's1', label: 'Résumé du module en cours', intent: 'formation' as ChatIntentCategory },
  { id: 's2', label: 'Aide pour ma mission JAC', intent: 'projects' as ChatIntentCategory },
  { id: 's3', label: 'Différence Dreyfus 2 et Dreyfus 3 ?', intent: 'passeport' as ChatIntentCategory },
  { id: 's4', label: 'Comment préparer mon prochain atelier ?', intent: 'formation' as ChatIntentCategory },
];

// ─── Mock RAG responses (simulate backend Mistral + vector search) ─────────────

interface MockRAGResponse {
  content: string;
  confidenceScore: number;
  intentCategory: ChatIntentCategory;
  sourcesCited: ChatSourceCitation[];
}

function makeSrc(module: KBSourceModule, id: string, title: string, url?: string, relevance = 0.85): ChatSourceCitation {
  return { sourceModule: module, sourceId: id, title, url, relevanceScore: relevance };
}

export const MOCK_RAG_RESPONSES: MockRAGResponse[] = [
  {
    content: 'Le prompt engineering, c\'est l\'art de formuler des instructions claires et précises pour guider un modèle de langage vers la réponse souhaitée.\n\nConcrètement, la qualité de ta question influe directement sur la qualité de la réponse. Un bon prompt comprend généralement : le contexte, la tâche, le format attendu et les contraintes éventuelles.\n\nC\'est une compétence clé dans ton parcours Leadership & IA.',
    confidenceScore: 0.92,
    intentCategory: 'formation',
    sourcesCited: [
      makeSrc('formation', 'lesson-ia-1', 'Module 3 — IA & Leadership', '/learning-paths/lp-ia', 0.94),
      makeSrc('formation', 'item-prompts', 'Fiche outil : Prompts efficaces', '/learning-space', 0.87),
    ],
  },
  {
    content: 'Plusieurs ressources sont disponibles directement dans ton parcours :\n\n• **L\'atelier "Prompts & Cie"** (Module 3, semaine 2) — exercices pratiques avec feedback immédiat\n• **La mission JAC "IA en contexte"** — applique le prompt engineering à un vrai cas de ton poste\n• **Les flashcards du module** — révision rapide des patterns de prompts les plus utiles\n\nJe te recommande de commencer par l\'atelier.',
    confidenceScore: 0.88,
    intentCategory: 'formation',
    sourcesCited: [
      makeSrc('formation', 'lesson-atelier-prompts', 'Module 3 — Atelier Prompts', '/learning-space', 0.90),
      makeSrc('projects', 'mission-jac-4', 'Mission JAC #4 — IA en contexte', '/projects', 0.82),
    ],
  },
  {
    content: 'Pour formuler une bonne problématique JAC, commence par répondre à ces trois questions :\n\n1. **Quel est le défi réel** que tu rencontres dans ton équipe ou dans ton rôle ?\n2. **Quelle compétence** veux-tu développer à travers cette mission ?\n3. **Quel serait le signe** que tu as réussi — qu\'est-ce qui aurait changé concrètement ?\n\nDis-moi ton contexte et la compétence ciblée, et je t\'aide à reformuler une problématique précise.',
    confidenceScore: 0.85,
    intentCategory: 'projects',
    sourcesCited: [
      makeSrc('projects', 'guide-jac', 'Guide JAC — Formuler sa problématique', '/projects', 0.88),
      makeSrc('coaching', 'coaching-best-practices', 'Coaching Best Practices', undefined, 0.71),
    ],
  },
];

/** Low-confidence fallback response (triggers when confidenceScore < 0.6) */
export const LOW_CONFIDENCE_RESPONSE: MockRAGResponse = {
  content: 'Je ne suis pas certain de ma réponse sur ce sujet. Je te recommande de contacter ton coach ou l\'équipe support pour une réponse précise.',
  confidenceScore: 0.45,
  intentCategory: 'unknown',
  sourcesCited: [],
};

/** Simulate a RAG response for a given question (cycles through mock responses) */
let mockResponseIndex = 0;
export function simulateRAGResponse(question: string): MockRAGResponse {
  const q = question.toLowerCase();

  // Privacy check
  if (PRIVACY_BLOCKLIST.some((kw) => q.includes(kw))) {
    return {
      content: 'Je ne peux pas répondre à cette question pour des raisons de confidentialité.',
      confidenceScore: 1.0, // high confidence in blocking
      intentCategory: 'unknown',
      sourcesCited: [],
    };
  }

  // Simulate low confidence for short/ambiguous questions
  if (question.trim().length < 10) {
    return LOW_CONFIDENCE_RESPONSE;
  }

  const response = MOCK_RAG_RESPONSES[mockResponseIndex % MOCK_RAG_RESPONSES.length];
  mockResponseIndex++;
  return response;
}

// ─── Initial conversation seed ─────────────────────────────────────────────────

function ts(minutesAgo: number): string {
  const d = new Date(Date.now() - minutesAgo * 60000);
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'Peux-tu m\'expliquer ce qu\'est le prompt engineering ?',
    timestamp: ts(8),
    intentCategory: 'formation',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: MOCK_RAG_RESPONSES[0].content,
    timestamp: ts(7),
    confidenceScore: MOCK_RAG_RESPONSES[0].confidenceScore,
    intentCategory: MOCK_RAG_RESPONSES[0].intentCategory,
    sourcesCited: MOCK_RAG_RESPONSES[0].sourcesCited,
    feedback: { messageId: 'msg-2', rating: 'yes' },
  },
  {
    id: 'msg-3',
    role: 'user',
    content: 'Comment je peux m\'entraîner concrètement dans mon parcours ?',
    timestamp: ts(5),
    intentCategory: 'formation',
  },
  {
    id: 'msg-4',
    role: 'assistant',
    content: MOCK_RAG_RESPONSES[1].content,
    timestamp: ts(5),
    confidenceScore: MOCK_RAG_RESPONSES[1].confidenceScore,
    intentCategory: MOCK_RAG_RESPONSES[1].intentCategory,
    sourcesCited: MOCK_RAG_RESPONSES[1].sourcesCited,
  },
];

export const MOCK_CHAT_SESSION: ChatSession = {
  sessionId: MOCK_CHAT_SESSION_ID,
  userId: 'user-demo',
  title: 'Prompt Engineering & JAC',
  createdAt: new Date(Date.now() - 8 * 60000).toISOString(),
  updatedAt: new Date(Date.now() - 5 * 60000).toISOString(),
  messages: MOCK_CHAT_MESSAGES,
};

export const MOCK_PAST_SESSIONS: ChatSession[] = [
  MOCK_CHAT_SESSION,
  {
    sessionId: 'session-demo-002',
    userId: 'user-demo',
    title: 'Dreyfus & niveaux compétences',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    messages: [],
  },
  {
    sessionId: 'session-demo-003',
    userId: 'user-demo',
    title: 'Leadership situationnel',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    messages: [],
  },
];
