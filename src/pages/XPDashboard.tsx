import React from 'react';
import { Zap, TrendingUp, Trophy } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';
import { PageShell } from '../components/layout';
import { useGamificationStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';


const XP_CATEGORIES = [
  { label: 'Apprentissage', xp: 1540, fill: 68, fillColor: 'brand' as const },
  { label: 'Coaching', xp: 840, fill: 52, fillColor: 'warm' as const },
  { label: 'Journal', xp: 480, fill: 30, fillColor: 'sun' as const },
  { label: 'Communauté', xp: 380, fill: 24, fillColor: 'success' as const },
];

export default function XPDashboard() {
  const gamifStore = useGamificationStore();
  const streak = gamifStore.getStreak(MOCK_USER_ID);
  const xpEvents = gamifStore.getXPEvents(MOCK_USER_ID);

  const totalXP = streak.totalXP;
  const currentLevel = streak.currentLevel;
  const xpCurrentLevel = currentLevel * 500;
  const xpNextLevel = (currentLevel + 1) * 500;
  const xpProgress = Math.min(100, Math.round(((totalXP - xpCurrentLevel) / (xpNextLevel - xpCurrentLevel)) * 100));

  return (
    /* Haut de page de la coque (il était réécrit à la main), 48 entre les
       blocs, titres de section (h2 28) posés sur la page — ils étaient des h3
       à 20 dans des cartes. Mots et ordre des blocs inchangés (arbitrage n°18
       en cours). */
    <PageShell width="wide">
      <EditorialHero
        eyebrow="Profil · XP"
        title="Mes Points XP"
        summary="Suis ta progression, tes gains d'expérience et les catégories d'apprentissage qui font avancer ton niveau."
        tone="flat"
      />

      <div className="flex flex-col gap-page">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard
            label="Total XP"
            value={totalXP.toLocaleString('fr-FR')}
            sub="XP"
            tone="neutral"
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

        {/* Progress vers niveau suivant — la ligne de chiffres est une donnée :
            la méta de l'en-tête. */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Progression vers le Niveau 8"
            meta={`${totalXP} / ${xpNextLevel} XP : encore ${xpNextLevel - totalXP} XP pour passer au niveau suivant`}
          />
          <Card>
            <ProgressBar
              value={xpProgress}
              fill="sun"
              size="lg"
              label={`Niveau ${currentLevel} → Niveau ${currentLevel + 1}`}
              valueLabel={`${xpProgress} %`}
            />
          </Card>
        </section>

        {/* Historique des gains — le gain se met en avant par la graisse et
            les chiffres tabulaires, plus par une couleur d'alerte. */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Historique des gains XP"
            subtitle="Les dernières activités récompensées en XP"
          />
          <Card>
            <ul className="flex flex-col divide-y divide-ink-100">
              {xpEvents.slice(0, 10).map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-stack py-stack-sm first:pt-0 last:pb-0">
                  <span className="text-body text-ink-900">{item.description}</span>
                  <div className="flex items-baseline gap-stack-xs shrink-0">
                    <span className="text-body font-semibold text-ink-900 tabular-nums">+{item.xp} XP</span>
                    <span className="text-caption text-ink-600">
                      {new Date(item.occurredAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* XP par catégorie — libellé en corps, valeur en légende 600 à
            chiffres tabulaires (elle était en ink-500), 8 jusqu'à la barre. */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="XP par catégorie"
            subtitle="Répartition de tes points XP selon les types d'activités"
          />
          <Card>
            <div className="flex flex-col gap-stack">
              {XP_CATEGORIES.map((cat) => (
                <div key={cat.label} className="flex flex-col gap-stack-xs">
                  <div className="flex items-baseline justify-between gap-stack">
                    <span className="text-body text-ink-900">{cat.label}</span>
                    <span className="text-caption font-semibold text-ink-700 tabular-nums">{cat.xp.toLocaleString('fr-FR')} XP</span>
                  </div>
                  <ProgressBar
                    value={cat.fill}
                    fill={cat.fillColor}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </PageShell>
  );
}
