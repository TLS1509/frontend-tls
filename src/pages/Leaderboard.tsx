import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/core/Button';
import { Medal, Sparkles, Target, Trophy } from 'lucide-react';
import '../styles/static-pages.css';

const ranking = [
  { name: 'Sophie Martin', points: 1240, streak: 18 },
  { name: 'Pierre Bernard', points: 1120, streak: 13 },
  { name: 'Nadia Ferreira', points: 980, streak: 9 },
];

export const Leaderboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Trophy size={12} /> Progression communaute</span>
        <h1>Leaderboard</h1>
        <p className="tls-editorial-summary">Classement communautaire avec objectif de progression hebdomadaire et mise en avant des meilleurs streaks.</p>
      </section>
      <section className="tls-kpi-row">
        <div className="tls-kpi"><strong>3</strong><span>Top contributors</span></div>
        <div className="tls-kpi"><strong>+12%</strong><span>Engagement semaine</span></div>
        <div className="tls-kpi"><strong>18j</strong><span>Meilleur streak actuel</span></div>
      </section>
      <section className="tls-grid tls-grid--wide">
        {ranking.map((entry, index) => (
          <Card key={entry.name} className="tls-section-card">
            <div className="tls-stack">
              <div className="tls-row">
                <h3>#{index + 1} {entry.name}</h3>
                <Badge variant={index === 0 ? 'sun' : 'neutral'}>{entry.points} pts</Badge>
              </div>
              <span className="tls-pill"><Target size={14} /> Streak {entry.streak} jours</span>
              <div className="tls-actions">
                <Button size="sm" variant="secondary"><Medal size={14} /> Voir profil</Button>
              </div>
            </div>
          </Card>
        ))}
      </section>
      <Card className="tls-section-card">
        <h3><Sparkles size={16} /> Objectif de la semaine</h3>
        <p className="tls-muted">Completer 3 activites reflexives et 2 modules pour remonter dans le top 3.</p>
        <div className="tls-actions">
          <Button onClick={() => navigate('/learning-paths')}>Continuer mon parcours</Button>
        </div>
      </Card>
    </div>
  );
};
