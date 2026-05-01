import React from 'react';
import { Lightbulb, Brain, Rocket, Zap, Crown } from 'lucide-react';
import './CompetencyMatrix.css';

export interface SkillEntry {
  name: string;
  level: number; // 1-5
  color?: string;
}

export interface CompetencyMatrixProps {
  skills: SkillEntry[];
  maxLevel?: number;
  labels?: string[];
  onSkillHover?: (skill: SkillEntry | null) => void;
}

const defaultLabels = ['', 'Novice', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
const iconComponents = [null, Lightbulb, Brain, Rocket, Zap, Crown];
const skillColors: Record<string, string> = {
  default: 'var(--tls-primary-500)',
  orange: 'var(--tls-orange-500)',
  yellow: 'var(--tls-yellow-400)',
  success: 'var(--tls-success-base)',
};

export const CompetencyMatrix: React.FC<CompetencyMatrixProps> = ({
  skills,
  maxLevel = 5,
  labels = defaultLabels,
  onSkillHover,
}) => {
  const skillColorAssignment: Record<string, string> = {};
  const colorKeys = Object.keys(skillColors);

  skills.forEach((skill, idx) => {
    skillColorAssignment[skill.name] = skill.color || skillColors[colorKeys[idx % colorKeys.length]];
  });

  return (
    <div style={{ overflowX: 'auto', marginTop: 'var(--s-6)' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'var(--font-body)',
      }}>
        <thead>
          <tr>
            <th style={{
              padding: 'var(--s-4)',
              textAlign: 'left',
              fontSize: 'var(--t-caption)',
              fontWeight: '600',
              color: 'var(--text)',
              borderBottom: '2px solid var(--border)',
            }}>
              Skill
            </th>
            {labels.slice(1).map((level, idx) => {
              const IconComponent = iconComponents[idx + 1];
              return (
                <th
                  key={level}
                  style={{
                    padding: 'var(--s-4)',
                    textAlign: 'center',
                    fontSize: 'var(--t-micro)',
                    fontWeight: '500',
                    color: 'var(--text-soft)',
                    borderBottom: '2px solid var(--border)',
                  }}
                >
                  {IconComponent && <IconComponent size={20} style={{ marginRight: 'var(--s-1)', display: 'inline' }} />}
                  {level}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr
              key={skill.name}
              style={{ borderBottom: '2px solid var(--border)' }}
              onMouseEnter={() => onSkillHover?.(skill)}
              onMouseLeave={() => onSkillHover?.(null)}
            >
              <td style={{
                padding: 'var(--s-4)',
                fontSize: 'var(--t-body-sm)',
                fontWeight: '600',
                color: 'var(--text)',
              }}>
                {skill.name}
              </td>
              {Array.from({ length: maxLevel }).map((_, levelIdx) => {
                const lvl = levelIdx + 1;
                const isAchieved = lvl <= skill.level;
                const color = skillColorAssignment[skill.name];

                return (
                  <td
                    key={lvl}
                    style={{
                      padding: 'var(--s-4)',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        margin: '0 auto',
                        borderRadius: '50%',
                        backgroundColor: isAchieved ? color : 'var(--surface-sunken)',
                        border: `2px solid ${isAchieved ? color : 'var(--border)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all var(--dur-2) var(--ease-standard)',
                        transform: 'scale(1)',
                        color: isAchieved ? '#fff' : 'var(--text-soft)',
                      }}
                      title={isAchieved ? labels[lvl] : 'Not yet achieved'}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.15)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                      }}
                    >
                      {isAchieved && iconComponents[lvl] && React.createElement(iconComponents[lvl] as any, { size: 20 })}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetencyMatrix;
