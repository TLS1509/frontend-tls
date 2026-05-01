import { Calendar, Clock, User, Video, ClipboardList, CalendarClock, Trash2 } from 'lucide-react';

interface UpcomingSessionCardProps {
  session: {
    date: string;
    time: string;
    duration: string;
    title: string;
    meetingLink: string;
    questionnaireId?: number;
  };
  coachName: string;
  onReschedule: () => void;
  onCancel: () => void;
  onPrepare: () => void;
}

export function UpcomingSessionCard({
  session,
  coachName,
  onReschedule,
  onCancel,
  onPrepare,
}: UpcomingSessionCardProps) {
  return (
    <div 
      className="rounded-3xl relative overflow-hidden"
      style={{
        padding: 'var(--card-padding-y) var(--card-padding-x)',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
      }}
    >
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative">
        {/* Header with Title and Action Icons */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 
            style={{ 
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              fontFamily: 'var(--font-display)',
              marginBottom: '4px',
            }}
          >
            {session.title}
          </h3>
          
          {/* Action Icons - Top Right */}
          <div className="flex items-center gap-2">
            <div className="relative group/replan">
              <button
                onClick={onReschedule}
                className="p-2 transition-all duration-200"
                style={{
                  color: 'var(--muted-foreground)',
                  border: 'none',
                  background: 'rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-lg)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.color = 'var(--muted-foreground)';
                }}
              >
                <CalendarClock className="w-4 h-4" />
              </button>
              {/* Tooltip */}
              <div 
                className="absolute top-full right-0 mt-2 px-3 py-2 opacity-0 group-hover/replan:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-20"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--foreground)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                }}
              >
                Replanifier
              </div>
            </div>
            
            <div className="relative group/cancel">
              <button
                onClick={onCancel}
                className="p-2 transition-all duration-200"
                style={{
                  color: 'var(--muted-foreground)',
                  border: 'none',
                  background: 'rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-lg)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--destructive)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.color = 'var(--muted-foreground)';
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {/* Tooltip */}
              <div 
                className="absolute top-full right-0 mt-2 px-3 py-2 opacity-0 group-hover/cancel:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-20"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--foreground)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                }}
              >
                Annuler
              </div>
            </div>
          </div>
        </div>

        {/* Meta Info - Compact et propre */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
              {new Date(session.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
            </span>
          </div>
          <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)', opacity: 0.4 }}>•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
              {session.time}
            </span>
          </div>
          <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)', opacity: 0.4 }}>•</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
            {session.duration}
          </span>
          <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)', opacity: 0.4 }}>•</span>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
              {coachName}
            </span>
          </div>
        </div>

        {/* Primary Actions - Boutons Pastille */}
        <div className="flex flex-wrap gap-2">
          {/* Bouton Bleu - Préparer */}
          <button
            onClick={onPrepare}
            className="inline-flex items-center gap-2 px-4 py-2 transition-all duration-200"
            style={{
              background: 'var(--primary-lighter)',
              color: 'var(--primary)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'var(--font-body)',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 'var(--radius-full)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--primary)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--primary-lighter)';
              e.currentTarget.style.color = 'var(--primary)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <ClipboardList className="w-4 h-4" />
            Préparer ma session
          </button>

          {/* Bouton Orange/Warm - Rejoindre */}
          <a
            href={session.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 transition-all duration-200"
            style={{
              background: 'var(--gradient-warm)',
              color: 'white',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 2px 8px rgba(237, 132, 58, 0.25)',
              textDecoration: 'none',
              border: 'none',
              borderRadius: 'var(--radius-full)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(237, 132, 58, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(237, 132, 58, 0.25)';
            }}
          >
            <Video className="w-4 h-4" />
            Rejoindre la session
          </a>
        </div>
      </div>
    </div>
  );
}
