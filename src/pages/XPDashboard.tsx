import React, { useState } from 'react';
import { Zap, TrendingUp, BookOpen, Users, Pencil, Trophy } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';

const XP_HISTORY = [
  { id: '1', activity: 'Leçon terminée — CSS Flexbox', xp: +80, date: '13 mai 2026' },
  { id: '2', activity: 'Session coaching validée', xp: +120, date: '12 mai 2026' },
  { id: '3', activity: 'Entrée journal complétée', xp: +20, date: '11 mai 2026' },
  { id: '4', activity: 'Badge Dreyfus débloqué', xp: +200, date: '10 mai 2026' },
  { id: '5', activity: 'Parcours terminé — Fondamentaux', xp: +300, date: '9 mai 2026' },
  { id: '6', activity: 'Quiz réussi — Score 100 %', xp: +50, date: '8 mai 2026' },
];

const XP_CATEGORIES = [
  { label: 'Apprentissage', xp: 1540, fill: 68, fillColor: 'brand' as const },
  { label: 'Coaching', xp: 840, fill: 52, fillColor: 'warm' as const },
  { label: 'Journal', xp: 480, fill: 30, fillColor: 'sun' as const },
  { label: 'Communauté', xp: 380, fill: 24, fillColor: 'success' as const },
];

export default function XPDashboard() {
  const totalXP = 3240;
  const currentLevel = 7;
  const xpCurrentLevel = 3000;
  const xpNextLevel = 3500;
  const xpProgress = Math.round(((totalXP - xpCurrentLevel) / (xpNextLevel - xpCurrentLevel)) * 100);

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Profil · XP"
        title="Mes Points XP"
        summary="Suis ta progression, tes gains d'expérience et les catégories d'apprentissage qui font avancer ton niveau."
        tone="sun"
      />

      <div className="max-w-page mx-auto w-full px-4 flex flex-col gap-section">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard
            label="Total XP"
            value="3 240"
            sub="XP"
            tone="sun"
            surface="tinted"
            icon={<Zap size={20} />}
            delta="+450 ce mois"
            deltaDirection="up"
          />
          <StatCard
            label="Niveau actuel"
            value={`Niveau ${currentLevel}`}
            tone="sun"
            surface="tinted"
            icon={<Trophy size={20} />}
          />
          <StatCard
            label="XP pour niveau suivant"
            value={xpNextLevel - totalXP}
            sub="XP restants"
            tone="neutral"
            surface="card"
            icon={<TrendingUp size={20} />}
          />
        </div>

        {/* Progress vers niveau suivant */}
        <SectionCard
          title="Progression vers le Niveau 8"
          titleIcon={<TrendingUp size={18} />}
          description={`${totalXP} / ${xpNextLevel} XP — encore ${xpNextLevel - totalXP} XP pour passer au niveau suivant`}
        >
          <ProgressBar
            value={xpProgress}
            fill="sun"
            size="lg"
            label={`Niveau ${currentLevel} → Niveau ${currentLevel + 1}`}
            valueLabel={`${xpProgress} %`}
          />
        </SectionCard>

        {/* Historique des gains */}
        <SectionCard
          title="Historique des gains XP"
          titleIcon={<Zap size={18} />}
          description="Les dernières activités récompensées en XP"
        >
          <ul className="flex flex-col divide-y divide-ink-100">
            {XP_HISTORY.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-stack py-3">
                <span className="text-body-sm text-ink-800">{item.activity}</span>
                <div className="flex items-center gap-stack-xs shrink-0">
                  <span className="text-body-sm font-bold text-warning-fg">+{item.xp} XP</span>
                  <span className="text-caption text-ink-400">{item.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* XP par catégorie */}
        <SectionCard
          title="XP par catégorie"
          titleIcon={<BookOpen size={18} />}
          description="Répartition de tes points XP selon les types d'activités"
        >
          <div className="flex flex-col gap-stack">
            {XP_CATEGORIES.map((cat) => (
              <div key={cat.label} className="flex flex-col gap-tight">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm font-semibold text-ink-800">{cat.label}</span>
                  <span className="text-caption text-ink-500">{cat.xp} XP</span>
                </div>
                <ProgressBar
                  value={cat.fill}
                  fill={cat.fillColor}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
