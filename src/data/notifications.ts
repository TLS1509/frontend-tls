/**
 * Mock Notifications data (Cahier #09).
 * In-app notifications feed + default user preferences.
 */

import type { InAppNotification, UserNotificationPrefs } from '../types/learning';
import { MOCK_USER_ID } from './passeport';

export const MOCK_IN_APP_NOTIFICATIONS: InAppNotification[] = [
  {
    id: 'notif-1',
    userId: MOCK_USER_ID,
    eventType: 'coaching_confirmed',
    title: 'Session de coaching confirmée',
    body: 'Ta session avec Sophie Marchand est confirmée pour le mardi 20 mai à 14h30.',
    isRead: false,
    deepLink: '/coaching',
    createdAt: '2026-05-15T08:05:00Z',
  },
  {
    id: 'notif-3',
    userId: MOCK_USER_ID,
    eventType: 'lesson_published',
    title: 'Nouvelle leçon disponible',
    body: "« IA Générative et Créativité » est désormais dans ton parcours.",
    isRead: false,
    deepLink: '/learning-space',
    createdAt: '2026-05-14T10:00:00Z',
  },
  {
    id: 'notif-4',
    userId: MOCK_USER_ID,
    eventType: 'parcours_completed',
    title: 'Leçon complétée',
    body: '« Fondamentaux du Prompt Engineering », score 95 %.',
    isRead: true,
    deepLink: '/learning-paths',
    createdAt: '2026-05-13T14:00:00Z',
  },
  {
    id: 'notif-5',
    userId: MOCK_USER_ID,
    eventType: 'coaching_recap_ready',
    title: 'Compte-rendu de coaching disponible',
    body: 'Le compte-rendu de ta session du 12 mai est disponible.',
    isRead: true,
    deepLink: '/coaching',
    createdAt: '2026-05-12T18:00:00Z',
  },
  {
    id: 'notif-6',
    userId: MOCK_USER_ID,
    eventType: 'session_reminder',
    title: 'Rappel : session de coaching demain',
    body: 'Ta session avec Sophie Marchand est programmée demain à 14h.',
    isRead: true,
    deepLink: '/coaching/booking',
    createdAt: '2026-05-11T08:00:00Z',
  },
  {
    id: 'notif-7',
    userId: MOCK_USER_ID,
    eventType: 'jac_approved',
    title: 'JAC approuvé',
    body: 'Ton Jalon d\'Application Critique sur la « Communication assertive » a été validé.',
    isRead: true,
    deepLink: '/passeport',
    createdAt: '2026-05-10T11:30:00Z',
  },
  // Arbitrage n°18 : un badge ne se « débloque » plus, il atteste un niveau
  // validé. Cette notification annonçait un badge « Expert en Prompt
  // Engineering » que rien ne portait, et menait à /badges, une route qui
  // n'existe pas. Elle dit désormais l'Open Badge que les données portent
  // (Communication & Influence, D4, émis le 3 mai : MOCK_USER_BADGES) et mène
  // à la section Reconnaissances du profil.
  {
    id: 'notif-2',
    userId: MOCK_USER_ID,
    eventType: 'badge_earned',
    title: 'Nouvel Open Badge',
    body: 'Ton niveau D4 en Communication & Influence est validé. Son Open Badge rejoint tes reconnaissances.',
    isRead: false,
    deepLink: '/profile#reconnaissances',
    createdAt: '2026-05-03T14:05:00Z',
  },
];

export const MOCK_USER_NOTIFICATION_PREFS: UserNotificationPrefs = {
  userId: MOCK_USER_ID,
  summaryFrequency: 'daily',
  emailTrackingDisabled: false,
  lessons: { inApp: true, email: true, whatsapp: false, push: true },
  coaching: { inApp: true, email: true, whatsapp: false, push: true },
  achievements: { inApp: true, email: false, whatsapp: false, push: false },
  managerAlerts: { inApp: true, email: true, whatsapp: false, push: true },
  newsletter: { email: true },
  updatedAt: '2026-05-01T00:00:00Z',
};
