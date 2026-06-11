export interface CoachingSession {
  id: number;
  title: string;
  type: 'coaching' | 'atelier' | 'masterclass' | 'webinaire';
  date: Date;
  duration: number; // en minutes
  coach: string;
  iconType: 'message' | 'brain' | 'target' | 'lightbulb' | 'users';
  description?: string;
}

// Fonction pour générer des dates dynamiques
const getUpcomingDate = (daysFromNow: number, hour: number, minute: number = 0): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, minute, 0, 0);
  return date;
};

export const upcomingSessions: CoachingSession[] = [
  {
    id: 1,
    title: 'Coaching IA & Pédagogie',
    type: 'coaching',
    date: getUpcomingDate(1, 14, 0), // Demain à 14h00
    duration: 60,
    coach: 'Sophie Martin',
    iconType: 'message',
    description: 'Session individuelle pour optimiser vos pratiques pédagogiques avec l\'IA',
  },
  {
    id: 2,
    title: 'Atelier Prompt Engineering',
    type: 'atelier',
    date: getUpcomingDate(4, 10, 0), // Dans 4 jours à 10h00
    duration: 120,
    coach: 'Marc Dubois',
    iconType: 'brain',
    description: 'Maîtrisez les techniques avancées de prompting pour des résultats exceptionnels',
  },
  {
    id: 3,
    title: 'Masterclass : IA Générative en Formation',
    type: 'masterclass',
    date: getUpcomingDate(7, 15, 30), // Dans 7 jours à 15h30
    duration: 90,
    coach: 'Dr. Claire Rousseau',
    iconType: 'target',
    description: 'Cas d\'usage avancés et stratégies d\'intégration de l\'IA dans vos formations',
  },
  {
    id: 4,
    title: 'Q&A Communauté : Vos défis IA',
    type: 'webinaire',
    date: getUpcomingDate(10, 18, 0), // Dans 10 jours à 18h00
    duration: 60,
    coach: 'Équipe TLS',
    iconType: 'users',
    description: 'Posez toutes vos questions et partagez vos expériences avec la communauté',
  },
  {
    id: 5,
    title: 'Coaching Créativité & Innovation',
    type: 'coaching',
    date: getUpcomingDate(14, 11, 0), // Dans 14 jours à 11h00
    duration: 60,
    coach: 'Sophie Martin',
    iconType: 'lightbulb',
    description: 'Boostez votre créativité pédagogique avec les outils IA',
  },
];

// Fonction utilitaire pour formater l'affichage de la date
export const formatSessionDate = (date: Date): string => {
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const timeStr = date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  if (diffDays === 0) {
    return `Aujourd'hui · ${timeStr}`;
  } else if (diffDays === 1) {
    return `Demain · ${timeStr}`;
  } else if (diffDays <= 7) {
    const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' });
    return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} · ${timeStr}`;
  } else {
    const dateStr = date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short' 
    });
    return `${dateStr} · ${timeStr}`;
  }
};

export const formatSessionDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h${mins}` : `${hours}h`;
};

// Récupérer les 2 prochaines sessions
export const getNextSessions = (count: number = 2): CoachingSession[] => {
  return upcomingSessions
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, count);
};