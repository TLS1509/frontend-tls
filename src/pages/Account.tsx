import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { BellRing, Languages, ShieldCheck } from 'lucide-react';
import '../styles/static-pages.css';

export const Account: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Account</h1>
      <p>Parametres de compte detailles: securite, notifications, langue.</p>
    </section>
    <section className="tls-grid">
      <Card className="tls-section-card">
        <div className="tls-stack">
          <h3><ShieldCheck size={16} /> Securite</h3>
          <p className="tls-muted">Sessions actives, mot de passe, verification.</p>
          <Button size="sm">Configurer</Button>
        </div>
      </Card>
      <Card className="tls-section-card">
        <div className="tls-stack">
          <h3><BellRing size={16} /> Notifications</h3>
          <p className="tls-muted">Canaux email/push et frequence.</p>
          <Button size="sm" variant="secondary">Modifier</Button>
        </div>
      </Card>
      <Card className="tls-section-card">
        <div className="tls-stack">
          <h3><Languages size={16} /> Langue & Region</h3>
          <p className="tls-muted">Langue interface, fuseau horaire, formats de date.</p>
          <Button size="sm" variant="secondary">Mettre a jour</Button>
        </div>
      </Card>
    </section>
  </div>
);

