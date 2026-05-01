import React from 'react';
import { Palette, BookOpen, Grid3x3, User, Play, Zap } from 'lucide-react';
import './CourseCard.css';

export interface CourseCardProps {
  title: string;
  instructor?: string;
  category?: 'Design' | 'React' | 'Design Systems' | string;
  enrolled?: boolean;
  progress?: number; // 0-100
  color?: string;
  onEnroll?: () => void;
  onContinue?: () => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Design':
      return <Palette size={64} color="white" strokeWidth={1.5} />;
    case 'React':
      return <Grid3x3 size={64} color="white" strokeWidth={1.5} />;
    case 'Design Systems':
      return <BookOpen size={64} color="white" strokeWidth={1.5} />;
    default:
      return <BookOpen size={64} color="white" strokeWidth={1.5} />;
  }
};

const categoryColors: Record<string, string> = {
  Design: 'var(--tls-orange-500)',
  React: 'var(--tls-primary-500)',
  'Design Systems': 'var(--tls-yellow-400)',
};

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  instructor = 'Course Instructor',
  category = 'Other',
  enrolled = false,
  progress = 0,
  color,
  onEnroll,
  onContinue,
}) => {
  const categoryColor = color || categoryColors[category] || 'var(--tls-primary-500)';

  return (
    <div
      style={{
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        border: '2px solid var(--border)',
        backgroundColor: 'var(--surface)',
        boxShadow: 'var(--shadow-md)',
        transition: 'all var(--dur-3) var(--ease-standard)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = 'var(--shadow-lg)';
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = 'var(--shadow-md)';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Course Image with Gradient Overlay */}
      <div
        style={{
          aspectRatio: '16 / 9',
          background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)`,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        {getCategoryIcon(category)}
      </div>

      {/* Course Content */}
      <div style={{ padding: 'var(--s-6)' }}>
        {/* Category Badge */}
        <div style={{ marginBottom: 'var(--s-4)' }}>
          <span
            style={{
              display: 'inline-block',
              padding: 'var(--s-2) var(--s-4)',
              background: `${categoryColor}22`,
              color: categoryColor,
              fontSize: 'var(--t-caption)',
              fontWeight: '600',
              borderRadius: 'var(--r-pill)',
              border: `1px solid ${categoryColor}44`,
            }}
          >
            {category}
          </span>
        </div>

        {/* Course Title */}
        <h3
          style={{
            margin: `0 0 var(--s-2) 0`,
            fontSize: 'var(--t-h4)',
            fontWeight: '600',
            color: 'var(--text)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {title}
        </h3>

        {/* Course Description */}
        <p
          style={{
            fontSize: 'var(--t-caption)',
            color: 'var(--text-muted)',
            marginBottom: 'var(--s-4)',
            lineHeight: '1.5',
          }}
        >
          Expand your skills with comprehensive, project-based learning...
        </p>

        {/* Instructor Info */}
        <div style={{ marginBottom: 'var(--s-4)', display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
          <User size={14} color="var(--text-muted)" strokeWidth={2} />
          <p
            style={{
              fontSize: 'var(--t-caption)',
              fontWeight: '500',
              color: 'var(--text)',
              margin: 0,
            }}
          >
            {instructor}
          </p>
        </div>

        {/* Progress Bar (if enrolled) */}
        {enrolled && (
          <div style={{ marginBottom: 'var(--s-6)' }}>
            <div
              style={{
                height: '6px',
                backgroundColor: 'var(--border)',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: 'var(--s-2)',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${categoryColor}, var(--tls-yellow-400))`,
                  transition: 'width var(--dur-3) var(--ease-standard)',
                }}
              />
            </div>
            <p
              style={{
                fontSize: 'var(--t-micro)',
                color: 'var(--text-soft)',
                margin: 0,
              }}
            >
              {progress}% complete
            </p>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={enrolled ? onContinue : onEnroll}
          style={{
            width: '100%',
            padding: 'var(--s-4)',
            background: enrolled
              ? 'var(--surface-sunken)'
              : `linear-gradient(135deg, ${categoryColor}, var(--tls-yellow-400))`,
            color: enrolled ? 'var(--text)' : '#fff',
            border: 'none',
            borderRadius: 'var(--r-md)',
            fontSize: 'var(--t-body-sm)',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: enrolled ? 'none' : '0 4px 12px rgba(127, 86, 217, 0.2)',
            transition: 'all var(--dur-2) var(--ease-standard)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--s-2)',
          }}
          onMouseEnter={(e) => {
            if (!enrolled) {
              const el = e.currentTarget;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 6px 16px rgba(127, 86, 217, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (!enrolled) {
              const el = e.currentTarget;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = '0 4px 12px rgba(127, 86, 217, 0.2)';
            }
          }}
        >
          {enrolled ? (
            <>
              <Play size={16} />
              Continue Learning
            </>
          ) : (
            <>
              <Zap size={16} />
              Enroll Now
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
