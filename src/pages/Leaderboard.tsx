import React from 'react';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import '../styles/static-pages.css';

const ranking = [
  { name: 'Sophie Martin', points: 1240, streak: 18 },
  { name: 'Pierre Bernard', points: 1120, streak: 13 },
  { name: 'Nadia Ferreira', points: 980, streak: 9 },
];

export const Leaderboard: React.FC = () => {
  return (
    <div className="tls-page">
      <section className="tls-page__hero">
        <h1>Leaderboard</h1>
        <p>Classement communautaire statique pour calibrage visuel.</p>
      </section>
      <section className="tls-grid tls-grid--wide">
        {ranking.map((entry, index) => (
          <Card key={entry.name}>
            <div className="tls-stack">
              <div className="tls-row">
                <h3>#{index + 1} {entry.name}</h3>
                <Badge variant={index === 0 ? 'sun' : 'neutral'}>{entry.points} pts</Badge>
              </div>
              <span className="tls-pill">Streak {entry.streak} jours</span>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
};
