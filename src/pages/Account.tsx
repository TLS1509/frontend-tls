/**
 * Account Page — Paramètres du compte
 *
 * 4-tab layout: Général / Sécurité / Notifications / Facturation
 * Uses TLS design system: Tabs, Switch, Button, Card, Input components
 */

import React, { useState } from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Switch, Field } from '../components/core/Input';
import { Tabs } from '../components/ui/Tabs';
import {
  UserRound,
  ShieldCheck,
  BellRing,
  CreditCard,
  Sparkles,
  Mail,
  Smartphone,
  Globe,
  Lock,
  Fingerprint,
  LogOut,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import '../styles/static-pages.css';

/* ─── Types ─────────────────────────────────────────────────────────────────── */

type TabId = 'general' | 'security' | 'notifications' | 'billing';

interface NotifPref {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface Session {
  id: string;
  device: string;
  location: string;
  lastSeen: string;
  current: boolean;
}

/* ─── Mock data ─────────────────────────────────────────────────────────────── */

const SESSIONS: Session[] = [
  { id: 's1', device: 'Chrome · macOS', location: 'Paris, France', lastSeen: 'En cours', current: true },
  { id: 's2', device: 'Safari · iPhone 15', location: 'Lyon, France', lastSeen: 'Il y a 2 heures', current: false },
  { id: 's3', device: 'Firefox · Windows 11', location: 'Bordeaux, France', lastSeen: 'Il y a 3 jours', current: false },
];

/* ─── Sub-tabs ──────────────────────────────────────────────────────────────── */

const SettingRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  description?: string;
  children?: React.ReactNode;
  danger?: boolean;
}> = ({ icon, label, description, children, danger }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: 'var(--s-4)', padding: 'var(--s-5) 0',
    borderBottom: '1px solid var(--border-light)',
  }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--s-3)', flex: 1, minWidth: 0 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 'var(--r-md)', flexShrink: 0,
        background: danger ? 'var(--tls-danger-subtle)' : 'var(--surface-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: danger ? 'var(--tls-danger-base)' : 'var(--text-muted)',
      }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', fontWeight: 600, color: danger ? 'var(--tls-danger-base)' : 'var(--text)' }}>
          {label}
        </p>
        {description && (
          <p style={{ margin: '2px 0 0', fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            {description}
          </p>
        )}
      </div>
    </div>
    {children}
  </div>
);

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{
    borderRadius: 'var(--r-xl)',
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    overflow: 'hidden',
    marginBottom: 'var(--s-8)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'all var(--dur-2)'
  }}>
    <div style={{
      padding: 'var(--s-5) var(--s-6)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface-muted)',
    }}>
      <h3 style={{
        margin: 0,
        fontSize: 'var(--t-body-sm)',
        fontWeight: 700,
        color: 'var(--text)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {title}
      </h3>
    </div>
    <div style={{ padding: '0 var(--s-6)' }}>
      {children}
    </div>
  </div>
);

/* ─── Tab panels ─────────────────────────────────────────────────────────────── */

const GeneralTab: React.FC = () => {
  const [name, setName] = useState('Claire Fontaine');
  const [email, setEmail] = useState('claire.fontaine@example.com');
  const [lang, setLang] = useState('fr');

  return (
    <div>
      <SectionCard title="Informations personnelles">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-5)', paddingTop: 'var(--s-5)', paddingBottom: 'var(--s-5)' }}>
          <Field label="Nom complet" id="name">
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </Field>
          <Field label="Adresse email" id="email">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </Field>
          <Field label="Poste" id="poste">
            <input id="poste" defaultValue="Responsable Formation" className="input" style={{ fontFamily: 'var(--font-body)' }} />
          </Field>
          <Field label="Entreprise" id="company">
            <input id="company" defaultValue="TLS Learning Society" className="input" style={{ fontFamily: 'var(--font-body)' }} />
          </Field>
        </div>
        <div style={{ paddingBottom: 'var(--s-5)', display: 'flex', gap: 'var(--s-3)' }}>
          <Button>Enregistrer les modifications</Button>
          <Button variant="secondary">Annuler</Button>
        </div>
      </SectionCard>

      <SectionCard title="Préférences">
        <SettingRow icon={<Globe size={16} />} label="Langue de l'interface" description="Actuellement : Français">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="select"
            style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--t-body-sm)' }}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </SettingRow>
        <SettingRow icon={<Clock size={16} />} label="Fuseau horaire" description="Europe/Paris (UTC+2)">
          <button style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tls-primary-600)', fontSize: 'var(--t-caption)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
            Modifier <ChevronRight size={14} />
          </button>
        </SettingRow>
      </SectionCard>

      <SectionCard title="Zone de danger">
        <SettingRow icon={<Download size={16} />} label="Exporter mes données" description="Télécharger toutes vos données de progression et journaux" danger={false}>
          <Button variant="secondary" size="sm"><Download size={13} /> Exporter</Button>
        </SettingRow>
        <SettingRow icon={<Trash2 size={16} />} label="Supprimer mon compte" description="Cette action est irréversible. Toutes vos données seront perdues." danger>
          <Button variant="secondary" size="sm" style={{ borderColor: 'var(--tls-danger-base)', color: 'var(--tls-danger-base)' }}>
            <Trash2 size={13} /> Supprimer
          </Button>
        </SettingRow>
      </SectionCard>
    </div>
  );
};

const SecurityTab: React.FC = () => {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div>
      <SectionCard title="Authentification">
        <SettingRow icon={<Lock size={16} />} label="Mot de passe" description="Dernière modification il y a 3 mois">
          <Button variant="secondary" size="sm">Changer</Button>
        </SettingRow>
        <SettingRow
          icon={<Fingerprint size={16} />}
          label="Double authentification (2FA)"
          description={twoFA ? "Activée — votre compte est protégé" : "Désactivée — recommandé pour plus de sécurité"}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
            {twoFA && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', fontSize: 'var(--t-caption)', color: 'var(--tls-success-fg)', fontWeight: 600 }}>
                <CheckCircle2 size={13} /> Activée
              </span>
            )}
            <Switch
              checked={twoFA}
              onChange={(e) => setTwoFA(e.target.checked)}
              aria-label="Activer la double authentification"
            />
          </div>
        </SettingRow>
      </SectionCard>

      <SectionCard title="Sessions actives">
        {SESSIONS.map((session, i) => (
          <div
            key={session.id}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 'var(--s-4)',
              padding: 'var(--s-5) 0',
              borderBottom: i < SESSIONS.length - 1 ? '1px solid var(--border-light)' : 'none',
              background: session.current ? 'rgba(85,161,180,0.04)' : 'transparent',
              marginLeft: '-var(--s-6)',
              marginRight: '-var(--s-6)',
              paddingLeft: 'var(--s-6)',
              paddingRight: 'var(--s-6)',
              transition: 'all var(--dur-2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--s-3)' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 'var(--r-md)', flexShrink: 0,
                background: session.current ? 'var(--tls-primary-50)' : 'var(--surface-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: session.current ? 'var(--tls-primary-600)' : 'var(--text-muted)',
              }}>
                <Smartphone size={16} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                  <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--text)' }}>
                    {session.device}
                  </p>
                  {session.current && (
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: 'var(--r-pill)', background: 'var(--tls-success-bg)', color: 'var(--tls-success-fg)', border: '1px solid var(--tls-success-border)' }}>
                      session actuelle
                    </span>
                  )}
                </div>
                <p style={{ margin: '2px 0 0', fontSize: 'var(--t-caption)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                  <MapPin size={11} /> {session.location} · {session.lastSeen}
                </p>
              </div>
            </div>
            {!session.current && (
              <Button variant="secondary" size="sm" style={{ flexShrink: 0 }}>
                <LogOut size={13} /> Révoquer
              </Button>
            )}
          </div>
        ))}
        <div style={{ paddingBottom: 'var(--s-5)', paddingTop: 'var(--s-3)' }}>
          <Button variant="ghost" size="sm" style={{ color: 'var(--tls-danger-base)' }}>
            <LogOut size={13} /> Déconnecter toutes les autres sessions
          </Button>
        </div>
      </SectionCard>
    </div>
  );
};

const NotificationsTab: React.FC = () => {
  const [prefs, setPrefs] = useState<NotifPref[]>([
    { id: 'coaching', label: 'Rappels de coaching', description: "Rappels 24h avant vos sessions programmées", enabled: true },
    { id: 'lesson',   label: 'Nouvelles leçons', description: "Quand un nouveau contenu est disponible dans votre parcours", enabled: true },
    { id: 'streak',   label: 'Streak & gamification', description: "Alertes de streak, badges débloqués, progression", enabled: true },
    { id: 'journal',  label: 'Prompts journal', description: "Suggestions de réflexion quotidiennes", enabled: false },
    { id: 'veille',   label: 'Veille hebdomadaire', description: "La sélection éditoriale TLS chaque vendredi", enabled: true },
    { id: 'report',   label: 'Rapport mensuel', description: "Synthèse mensuelle de votre progression", enabled: false },
  ]);

  const toggle = (id: string) =>
    setPrefs((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  return (
    <div>
      <SectionCard title="Canaux de notification">
        <SettingRow icon={<Mail size={16} />} label="Notifications email" description="Reçues sur claire.fontaine@example.com">
          <Switch checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />
        </SettingRow>
        <SettingRow icon={<Smartphone size={16} />} label="Notifications push" description="Notifications sur votre navigateur ou application mobile">
          <Switch checked={pushNotif} onChange={(e) => setPushNotif(e.target.checked)} />
        </SettingRow>
      </SectionCard>

      <SectionCard title="Préférences par type">
        {prefs.map((pref) => (
          <SettingRow
            key={pref.id}
            icon={<BellRing size={16} />}
            label={pref.label}
            description={pref.description}
          >
            <Switch
              checked={pref.enabled}
              onChange={() => toggle(pref.id)}
              aria-label={pref.label}
            />
          </SettingRow>
        ))}
      </SectionCard>
    </div>
  );
};

const BillingTab: React.FC = () => (
  <div>
    <SectionCard title="Abonnement actuel">
      <div style={{ padding: 'var(--s-5) 0' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--s-4)',
          padding: 'var(--s-6)', borderRadius: 'var(--r-xl)',
          background: 'linear-gradient(135deg, var(--tls-primary-50), var(--tls-primary-25))',
          border: '1.5px solid var(--tls-primary-200)',
          marginBottom: 'var(--s-6)',
          boxShadow: 'var(--shadow-md), 0 8px 24px rgba(85,161,180,0.15)',
          transition: 'all var(--dur-2)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-2)' }}>
              <Sparkles size={16} style={{ color: 'var(--tls-primary-500)' }} />
              <h3 style={{ margin: 0, fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)' }}>
                Plan Pro
              </h3>
              <span style={{ fontSize: 'var(--t-caption)', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--r-pill)', background: 'var(--tls-primary-100)', color: 'var(--tls-primary-700)', border: '1px solid var(--tls-primary-200)' }}>
                Actif
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)' }}>
              Accès illimité aux parcours, coaching mensuel inclus · Renouvellement le 1er juin 2026
            </p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ margin: 0, fontSize: 'var(--t-h3)', fontWeight: 800, color: 'var(--tls-primary-700)' }}>
              89 €
            </p>
            <p style={{ margin: '2px 0 0', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>/ mois</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--s-3)' }}>
          <Button>Gérer l'abonnement</Button>
          <Button variant="secondary">Voir les plans</Button>
        </div>
      </div>
    </SectionCard>

    <SectionCard title="Moyen de paiement">
      <SettingRow
        icon={<CreditCard size={16} />}
        label="Visa •••• 6411"
        description="Expire le 04/2027 · Carte principale"
      >
        <Button variant="secondary" size="sm">Modifier</Button>
      </SettingRow>
    </SectionCard>

    <SectionCard title="Historique de facturation">
      {[
        { date: '1 mai 2026', desc: 'Plan Pro — mai', amount: '89,00 €', status: 'Payé' },
        { date: '1 avr. 2026', desc: 'Plan Pro — avril', amount: '89,00 €', status: 'Payé' },
        { date: '1 mars 2026', desc: 'Plan Pro — mars', amount: '89,00 €', status: 'Payé' },
      ].map((inv, i, arr) => (
        <div
          key={inv.date}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--s-4)',
            padding: 'var(--s-5) 0',
            borderBottom: i < arr.length - 1 ? '1px solid var(--border-light)' : 'none',
            transition: 'all var(--dur-2)'
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--text)' }}>{inv.desc}</p>
            <p style={{ margin: '2px 0 0', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>{inv.date}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
            <span style={{ fontSize: 'var(--t-body-sm)', fontWeight: 700, color: 'var(--text)' }}>{inv.amount}</span>
            <span style={{ fontSize: 'var(--t-caption)', fontWeight: 600, padding: '2px 8px', borderRadius: 'var(--r-pill)', background: 'var(--tls-success-bg)', color: 'var(--tls-success-fg)' }}>
              {inv.status}
            </span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tls-primary-600)', fontSize: 'var(--t-caption)', fontWeight: 600, fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 2 }}>
              <Download size={12} /> PDF
            </button>
          </div>
        </div>
      ))}
    </SectionCard>
  </div>
);

/* ─── Main component ─────────────────────────────────────────────────────────── */

const TAB_ITEMS = [
  { id: 'general',       label: <><UserRound size={14} /> Général</> },
  { id: 'security',      label: <><ShieldCheck size={14} /> Sécurité</> },
  { id: 'notifications', label: <><BellRing size={14} /> Notifications</> },
  { id: 'billing',       label: <><CreditCard size={14} /> Facturation</> },
];

export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('general');

  return (
    <div className="tls-page">
      {/* Hero */}
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Paramètres du compte</span>
        <h1>Mon compte</h1>
        <p className="tls-editorial-summary">
          Gérez vos informations personnelles, la sécurité, les notifications et votre abonnement.
        </p>
        <div className="tls-editorial-meta">
          <span><UserRound size={12} /> Claire Fontaine</span>
          <span>·</span>
          <span>Plan Pro · Actif</span>
        </div>
      </section>

      {/* Tabs */}
      <Tabs
        items={TAB_ITEMS}
        value={activeTab}
        onChange={(id) => setActiveTab(id as TabId)}
        variant="underline"
        style={{ marginBottom: 'var(--s-8)' }}
      />

      {/* Tab panels */}
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        {activeTab === 'general'       && <GeneralTab />}
        {activeTab === 'security'      && <SecurityTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'billing'       && <BillingTab />}
      </div>
    </div>
  );
};
