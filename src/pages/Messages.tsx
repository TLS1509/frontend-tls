import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import '../styles/static-pages.css';

const threads = [
  { id: 'm1', from: 'Coach Alice', subject: 'Preparation session leadership', preview: 'Peux-tu preparer 3 situations concretes ?' },
  { id: 'm2', from: 'Equipe Product', subject: 'Retours parcours', preview: 'Merci pour le feedback sur le module 2.' },
  { id: 'm3', from: 'Support TLS', subject: 'Configuration profil', preview: 'Voici la checklist pour finaliser ton profil.' },
];

export const Messages: React.FC = () => {
  return (
    <div className="tls-page">
      <section className="tls-page__hero">
        <h1>Messages</h1>
        <p>Boite de reception statique pour validation UI.</p>
      </section>
      <section className="tls-stack">
        {threads.map((thread) => (
          <Card key={thread.id}>
            <div className="tls-row">
              <div className="tls-stack">
                <strong>{thread.subject}</strong>
                <span className="tls-micro">{thread.from}</span>
                <p className="tls-muted">{thread.preview}</p>
              </div>
              <Button size="sm">Ouvrir</Button>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
};
