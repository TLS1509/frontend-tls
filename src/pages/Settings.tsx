/**
 * Settings Page - User preferences and settings
 */

import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { BellRing, LockKeyhole, SlidersHorizontal, Shield, Palette, Globe } from 'lucide-react';
import '../styles/feature-pages-modern.css';
import '../styles/static-pages.css';

export const Settings: React.FC = () => {
  return (
    <div className="feature-page">
      <section className="tls-editorial-hero">
        <p className="tls-editorial-eyebrow">Account • Preferences</p>
        <h1 style={{ margin: 0 }}>Parametres</h1>
        <p className="tls-editorial-summary">
          Controlez vos preferences de notifications, confidentialite et experience.
        </p>
        <div className="tls-editorial-meta">
          <span className="tls-micro">2 canaux notification actifs</span>
          <span className="tls-micro">Confidentialite: standard</span>
          <span className="tls-micro">Synchro profil: active</span>
        </div>
      </section>
      <section className="feature-page__kpis">
        <div className="feature-page__kpi"><span>Notifications</span><strong>2 activees</strong></div>
        <div className="feature-page__kpi"><span>Confidentialité</span><strong>Standard</strong></div>
        <div className="feature-page__kpi"><span>Mise a jour</span><strong>Auto</strong></div>
      </section>
      <section className="feature-page__grid">
        <Card variant="interactive">
          <div className="feature-page__settings-group">
            <h3><BellRing size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} />Notifications</h3>
            <label className="feature-page__check"><input type="checkbox" defaultChecked /> Notifications par email</label>
            <label className="feature-page__check"><input type="checkbox" defaultChecked /> Notifications push navigateur</label>
            <label className="feature-page__check"><input type="checkbox" /> Resume quotidien</label>
            <p className="feature-page__muted">Activez uniquement les canaux utiles pour eviter la surcharge.</p>
          </div>
        </Card>

        <Card variant="interactive">
          <div className="feature-page__settings-group">
            <h3><LockKeyhole size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} />Confidentialite</h3>
            <label className="feature-page__check"><input type="checkbox" /> Partager mes statistiques anonymisees</label>
            <label className="feature-page__check"><input type="checkbox" defaultChecked /> Autoriser les notifications systeme</label>
            <label className="feature-page__check"><input type="checkbox" defaultChecked /> Historique de connexions actif</label>
            <Button>Enregistrer</Button>
          </div>
        </Card>

        <Card variant="interactive">
          <div className="feature-page__settings-group">
            <h3><Palette size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} />Interface</h3>
            <label className="feature-page__check"><input type="checkbox" defaultChecked /> Activer animations fluides</label>
            <label className="feature-page__check"><input type="checkbox" /> Mode contraste renforce</label>
            <label className="feature-page__check"><input type="checkbox" defaultChecked /> Navigation compacte</label>
            <p className="feature-page__muted">Ces preferences sont synchronisees avec votre profil utilisateur.</p>
          </div>
        </Card>

        <Card variant="interactive">
          <div className="feature-page__settings-group">
            <h3><SlidersHorizontal size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} />Compte</h3>
            <div className="feature-page__chips">
              <span className="feature-page__chip"><Shield size={14} /> Securite: standard</span>
              <span className="feature-page__chip"><Globe size={14} /> Langue: francais</span>
            </div>
            <div className="feature-page__actions-row">
              <Button variant="secondary">Exporter mes donnees</Button>
              <Button variant="ghost">Gerer mon compte</Button>
            </div>
          </div>
        </Card>
      </section>
      <div className="tls-callout" style={{ marginTop: 'var(--s-4)' }}>
        <p style={{ marginTop: 0, marginBottom: 'var(--s-1)', fontWeight: 600 }}>Bonne pratique</p>
        <p className="tls-micro" style={{ marginBottom: 0 }}>
          Conserver les alertes critiques actives et limiter les resumes pour reduire la surcharge.
        </p>
      </div>
    </div>
  );
};
