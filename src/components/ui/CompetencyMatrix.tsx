import React from 'react';
import { Lightbulb, Brain, Rocket, Zap, Crown } from 'lucide-react';

export type SkillColor = 'primary' | 'warm' | 'sun' | 'success';

export interface SkillEntry {
  name: string;
  level: number;
  color?: SkillColor;
}

export interface CompetencyMatrixProps {
  skills: SkillEntry[];
  maxLevel?: number;
  labels?: string[];
  onSkillHover?: (skill: SkillEntry | null) => void;
}

const DEFAULT_LABELS = ['', 'Novice', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
const ICON_COMPONENTS = [null, Lightbulb, Brain, Rocket, Zap, Crown];
const COLOR_KEYS: SkillColor[] = ['primary', 'warm', 'sun', 'success'];

const SKILL_BG_ACTIVE: Record<SkillColor, string> = {
  primary: 'bg-primary-500 border-primary-500 text-white',
  warm:    'bg-secondary-500 border-secondary-500 text-white',
  sun:     'bg-accent-400 border-accent-400 text-accent-900',
  success: 'bg-success-base border-success-base text-white',
};

const CELL_INACTIVE = 'bg-ink-50 border-ink-200 text-ink-400';

export const CompetencyMatrix: React.FC<CompetencyMatrixProps> = ({
  skills,
  maxLevel = 5,
  labels = DEFAULT_LABELS,
  onSkillHover,
}) => {
  const colorAssignment: Record<string, SkillColor> = {};
  skills.forEach((skill, idx) => {
    colorAssignment[skill.name] = skill.color || COLOR_KEYS[idx % COLOR_KEYS.length];
  });

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border-collapse font-body">
        <thead>
          <tr>
            <th className="p-4 text-left text-caption font-semibold text-ink-900 border-b-2 border-ink-200">
              Skill
            </th>
            {labels.slice(1).map((level, idx) => {
              const IconComponent = ICON_COMPONENTS[idx + 1];
              return (
                <th
                  key={level}
                  className="p-4 text-center text-micro font-medium text-ink-500 border-b-2 border-ink-200 whitespace-nowrap"
                >
                  {IconComponent && <IconComponent size={18} className="inline-block mr-1 -mt-0.5" />}
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
              className="border-b-2 border-ink-200"
              onMouseEnter={() => onSkillHover?.(skill)}
              onMouseLeave={() => onSkillHover?.(null)}
            >
              <td className="p-4 text-body-sm font-semibold text-ink-900">{skill.name}</td>
              {Array.from({ length: maxLevel }).map((_, levelIdx) => {
                const lvl = levelIdx + 1;
                const isAchieved = lvl <= skill.level;
                const Icon = ICON_COMPONENTS[lvl];
                const color = colorAssignment[skill.name];

                return (
                  <td key={lvl} className="p-4 text-center">
                    <div
                      title={isAchieved ? labels[lvl] : 'Not yet achieved'}
                      className={[
                        'w-10 h-10 mx-auto rounded-full inline-flex items-center justify-center border-2 cursor-pointer transition-transform',
                        'hover:scale-110',
                        isAchieved ? SKILL_BG_ACTIVE[color] : CELL_INACTIVE,
                      ].join(' ')}
                    >
                      {isAchieved && Icon && <Icon size={20} />}
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
