export interface Notification {
  id: string;
  type: 'message' | 'lesson' | 'coaching' | 'achievement' | 'correction' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionUrl?: string;
  sender?: {
    name: string;
    avatar?: string;
    role?: string;
  };
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'correction',
    title: 'Correction disponible',
    message: 'Votre exercice "Prompt Engineering Avancé" a été corrigé. Note : 18/20',
    time: 'Il y a 5 min',
    isRead: false,
    actionUrl: 'lesson',
    sender: {
      name: 'Marc Dubois',
      avatar: '👨‍💼',
      role: 'Coach IA',
    },
  },
  {
    id: '2',
    type: 'message',
    title: 'Nouveau message de votre coach',
    message: 'Sophie Martin vous a envoyé un message concernant votre projet final',
    time: 'Il y a 10 min',
    isRead: false,
    actionUrl: 'messages',
    sender: {
      name: 'Sophie Martin',
      avatar: '👩‍🏫',
      role: 'Coach Principal',
    },
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Nouveau badge débloqué ! 🎉',
    message: 'Félicitations ! Vous avez débloqué le badge "Expert en Prompt Engineering"',
    time: 'Il y a 1h',
    isRead: false,
    actionUrl: 'profile',
  },
  {
    id: '4',
    type: 'coaching',
    title: 'Session de coaching confirmée',
    message: 'Votre session avec Sophie Martin est confirmée pour demain à 14h00',
    time: 'Il y a 2h',
    isRead: true,
    actionUrl: 'coaching',
    sender: {
      name: 'Sophie Martin',
      avatar: '👩‍🏫',
      role: 'Coach Principal',
    },
  },
  {
    id: '5',
    type: 'lesson',
    title: 'Nouvelle leçon disponible',
    message: 'La leçon "IA Générative et Créativité" est maintenant disponible',
    time: 'Il y a 3h',
    isRead: true,
    actionUrl: 'parcours',
  },
];
