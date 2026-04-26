import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MessageSquare, Search, Send, Sparkles, UserRound } from 'lucide-react';
import '../styles/static-pages.css';

const threads = [
  { id: 'm1', from: 'Coach Alice', subject: 'Preparation session leadership', preview: 'Peux-tu preparer 3 situations concretes ?' },
  { id: 'm2', from: 'Equipe Product', subject: 'Retours parcours', preview: 'Merci pour le feedback sur le module 2.' },
  { id: 'm3', from: 'Support TLS', subject: 'Configuration profil', preview: 'Voici la checklist pour finaliser ton profil.' },
];

export const Messages: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Collaboration</span>
        <h1>Messages</h1>
        <p className="tls-editorial-summary">Boite de reception orientee coaching, equipe et support, avec un layout conversationnel plus complet.</p>
      </section>
      <section className="tls-content-layout">
        <div className="tls-content-main">
          <Card className="tls-section-card">
            <label className="tls-journal-search">
              <Search size={14} />
              <input type="search" placeholder="Rechercher une conversation..." />
            </label>
            <div className="tls-stack">
              {threads.map((thread) => (
                <div key={thread.id} className="tls-related-item">
                  <div className="tls-row">
                    <div className="tls-stack">
                      <strong>{thread.subject}</strong>
                      <span className="tls-micro"><UserRound size={12} /> {thread.from}</span>
                      <p className="tls-muted">{thread.preview}</p>
                    </div>
                    <Button size="sm">Ouvrir</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
          <Card className="tls-section-card">
            <h4><MessageSquare size={15} /> Conversation active</h4>
            <p className="tls-muted">Selectionnez un fil pour afficher le detail de la conversation.</p>
            <div className="tls-callout">
              <p>Conseil: regroupez les demandes par sujet pour accelerer les reponses en equipe.</p>
            </div>
            <Button variant="secondary" onClick={() => navigate('/collaboration')}>
              <Send size={14} /> Retour communaute
            </Button>
          </Card>
        </aside>
      </section>
    </div>
  );
};
