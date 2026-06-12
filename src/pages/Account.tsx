/**
 * Account Page : Paramètres du compte
 */

import React, { useState } from 'react';
import { Button } from '../components/core/Button';
import { Switch, Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import type { SelectOption } from '../components/core/Select';
import { Tabs } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { useToastContext } from '../contexts/ToastContext';
import { AccountFamilyNav } from '../components/patterns/AccountFamilyNav';
import { PageShell } from '../components/layout';
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

const SESSIONS: Session[] = [
  { id: 's1', device: 'Chrome · macOS',        location: 'Paris, France',    lastSeen: 'En cours',       current: true },
  { id: 's2', device: 'Safari · iPhone 15',    location: 'Lyon, France',     lastSeen: 'Il y a 2 heures', current: false },
  { id: 's3', device: 'Firefox · Windows 11',  location: 'Bordeaux, France', lastSeen: 'Il y a 3 jours', current: false },
];

/* ─── Sub-components ──────────────────────────────────────────────────────── */

const SettingRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  description?: string;
  children?: React.ReactNode;
  danger?: boolean;
}> = ({ icon, label, description, children, danger }) => (
  <div className="flex items-center justify-between gap-stack py-5 border-b border-ink-100 last:border-0">
    <div className="flex items-start gap-stack-xs flex-1 min-w-0">
      <div className={`w-9 h-9 rounded-md shrink-0 flex items-center justify-center ${danger ? 'bg-danger-bg text-danger-fg' : 'bg-ink-100 text-ink-500'}`}>
        {icon}
      </div>
      <div>
        <p className={`m-0 font-body text-body-sm font-semibold ${danger ? 'text-danger-fg' : 'text-ink-900'}`}>
          {label}
        </p>
        {description && (
          <p className="m-0 mt-0.5 font-body text-caption text-ink-500 leading-snug">
            {description}
          </p>
        )}
      </div>
    </div>
    {children}
  </div>
);

const SettingCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="rounded-2xl border border-ink-100 bg-white overflow-hidden">
    <div className="px-stack-lg py-stack border-b border-ink-100">
      <h3 className="m-0 font-display text-body font-bold text-ink-900 tracking-tight">
        {title}
      </h3>
    </div>
    <div className="px-stack-lg">
      {children}
    </div>
  </div>
);

const LANG_OPTIONS: SelectOption[] = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
];

/* ─── Tab panels ──────────────────────────────────────────────────────────── */

const GeneralTab: React.FC = () => {
  const [name,  setName]  = useState('Claire Fontaine');
  const [email, setEmail] = useState('claire.fontaine@example.com');
  const [lang,  setLang]  = useState('fr');
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToastContext();

  const handleSave = async () => {
    setIsSaving(true);
    // eslint-disable-next-line no-console
    console.log('Saving account info', { name, email, lang });
    await new Promise((res) => setTimeout(res, 700));
    setIsSaving(false);
    toast.success('Informations enregistrées', 'Compte mis à jour');
  };

  return (
    <div className="flex flex-col gap-stack-lg">
      <SettingCard title="Informations personnelles">
        <div className="grid grid-cols-2 gap-stack pt-5 pb-5">
          <Input label="Nom complet"     id="name"    value={name}  onChange={(e) => setName(e.target.value)} />
          <Input label="Adresse email"   id="email"   type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Poste"           id="poste"   defaultValue="Responsable Formation" />
          <Input label="Entreprise"      id="company" defaultValue="TLS Learning Society" />
        </div>
        <div className="pb-5 flex gap-stack-xs">
          <Button onClick={handleSave} loading={isSaving}>Enregistrer les modifications</Button>
          <Button variant="secondary" disabled={isSaving}>Annuler</Button>
        </div>
      </SettingCard>

      <SettingCard title="Préférences">
        <SettingRow icon={<Globe size={16} />} label="Langue de l'interface" description="Actuellement : Français">
          <div className="w-[180px]">
            <Select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              options={LANG_OPTIONS}
            />
          </div>
        </SettingRow>
        <SettingRow icon={<Clock size={16} />} label="Fuseau horaire" description="Europe/Paris (UTC+2)">
          <Button variant="link" size="sm" trailingIcon={<ChevronRight size={14} />}>Modifier</Button>
        </SettingRow>
      </SettingCard>

      <SettingCard title="Zone de danger">
        <SettingRow icon={<Download size={16} />} label="Exporter mes données" description="Télécharger toutes vos données de progression et journaux">
          <Button variant="secondary" size="sm" leadingIcon={<Download size={13} />}>Exporter</Button>
        </SettingRow>
        <SettingRow icon={<Trash2 size={16} />} label="Supprimer mon compte" description="Cette action est irréversible. Toutes vos données seront perdues." danger>
          <Button variant="secondary" size="sm" className="border-danger-base text-danger-fg hover:bg-danger-bg" leadingIcon={<Trash2 size={13} />}>
            Supprimer
          </Button>
        </SettingRow>
      </SettingCard>
    </div>
  );
};

const SecurityTab: React.FC = () => {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="flex flex-col gap-stack-lg">
      <SettingCard title="Authentification">
        <SettingRow icon={<Lock size={16} />} label="Mot de passe" description="Dernière modification il y a 3 mois">
          <Button variant="secondary" size="sm">Changer</Button>
        </SettingRow>
        <SettingRow
          icon={<Fingerprint size={16} />}
          label="Double authentification (2FA)"
          description={twoFA ? "Activée : votre compte est protégé" : "Désactivée : recommandé pour plus de sécurité"}
        >
          <div className="flex items-center gap-stack-xs">
            {twoFA && (
              <span className="flex items-center gap-tight font-body text-caption text-success-fg font-semibold">
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
      </SettingCard>

      <SettingCard title="Sessions actives">
        {SESSIONS.map((session, i) => (
          <div
            key={session.id}
            className={[
              'flex items-center justify-between gap-stack py-5 px-stack-lg -mx-6 transition-colors',
              i < SESSIONS.length - 1 ? 'border-b border-ink-100' : '',
              session.current ? 'bg-primary-50' : '',
            ].join(' ')}
          >
            <div className="flex items-start gap-stack-xs">
              <div className={`w-9 h-9 rounded-md shrink-0 flex items-center justify-center ${session.current ? 'bg-primary-100 text-primary-600' : 'bg-ink-100 text-ink-500'}`}>
                <Smartphone size={16} />
              </div>
              <div>
                <div className="flex items-center gap-stack-xs">
                  <p className="m-0 font-body text-body-sm font-semibold text-ink-900">
                    {session.device}
                  </p>
                  {session.current && <Badge variant="success">session actuelle</Badge>}
                </div>
                <p className="m-0 mt-0.5 font-body text-caption text-ink-500 flex items-center gap-stack-xs">
                  <MapPin size={11} /> {session.location} · {session.lastSeen}
                </p>
              </div>
            </div>
            {!session.current && (
              <Button variant="secondary" size="sm" className="shrink-0" leadingIcon={<LogOut size={13} />}>
                Révoquer
              </Button>
            )}
          </div>
        ))}
        <div className="pb-5 pt-3">
          <Button variant="ghost" size="sm" className="text-danger-fg hover:bg-danger-bg" leadingIcon={<LogOut size={13} />}>
            Déconnecter toutes les autres sessions
          </Button>
        </div>
      </SettingCard>
    </div>
  );
};

const NotificationsTab: React.FC = () => {
  const [prefs, setPrefs] = useState<NotifPref[]>([
    { id: 'coaching', label: 'Rappels de coaching',    description: "Rappels 24h avant vos sessions programmées",                    enabled: true },
    { id: 'lesson',   label: 'Nouvelles leçons',       description: "Quand un nouveau contenu est disponible dans votre parcours",    enabled: true },
    { id: 'streak',   label: 'Streak & gamification',  description: "Alertes de streak, badges débloqués, progression",               enabled: true },
    { id: 'journal',  label: 'Prompts journal',         description: "Suggestions de réflexion quotidiennes",                          enabled: false },
    { id: 'veille',   label: 'Veille hebdomadaire',     description: "La sélection éditoriale TLS chaque vendredi",                    enabled: true },
    { id: 'report',   label: 'Rapport mensuel',         description: "Synthèse mensuelle de votre progression",                        enabled: false },
  ]);
  const toggle = (id: string) =>
    setPrefs((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif,  setPushNotif]  = useState(false);

  return (
    <div className="flex flex-col gap-stack-lg">
      <SettingCard title="Canaux de notification">
        <SettingRow icon={<Mail size={16} />} label="Notifications email" description="Reçues sur claire.fontaine@example.com">
          <Switch checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />
        </SettingRow>
        <SettingRow icon={<Smartphone size={16} />} label="Notifications push" description="Notifications sur votre navigateur ou application mobile">
          <Switch checked={pushNotif} onChange={(e) => setPushNotif(e.target.checked)} />
        </SettingRow>
      </SettingCard>

      <SettingCard title="Préférences par type">
        {prefs.map((pref) => (
          <SettingRow
            key={pref.id}
            icon={<BellRing size={16} />}
            label={pref.label}
            description={pref.description}
          >
            <Switch checked={pref.enabled} onChange={() => toggle(pref.id)} aria-label={pref.label} />
          </SettingRow>
        ))}
      </SettingCard>
    </div>
  );
};

const BillingTab: React.FC = () => (
  <div className="flex flex-col gap-stack-lg">
    <SettingCard title="Abonnement actuel">
      <div className="pt-5 pb-5">
        <div className="flex items-start justify-between gap-stack p-stack-lg rounded-xl bg-gradient-to-br from-primary-50 to-white border border-primary-200 mb-stack-lg shadow-md">
          <div>
            <div className="flex items-center gap-stack-xs mb-stack-xs">
              <Sparkles size={16} className="text-primary-500" />
              <h3 className="m-0 font-display text-h4 font-bold text-ink-900">Plan Pro</h3>
              <Badge variant="brand">Actif</Badge>
            </div>
            <p className="m-0 font-body text-body-sm text-ink-500">
              Accès illimité aux parcours, coaching mensuel inclus · Renouvellement le 1er juin 2026
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="m-0 font-display text-h3 font-extrabold text-primary-700">89 €</p>
            <p className="m-0 mt-0.5 font-body text-caption text-ink-400">/ mois</p>
          </div>
        </div>
        <div className="flex gap-stack-xs">
          <Button>Gérer l'abonnement</Button>
          <Button variant="secondary">Voir les plans</Button>
        </div>
      </div>
    </SettingCard>

    <SettingCard title="Moyen de paiement">
      <SettingRow icon={<CreditCard size={16} />} label="Visa •••• 6411" description="Expire le 04/2027 · Carte principale">
        <Button variant="secondary" size="sm">Modifier</Button>
      </SettingRow>
    </SettingCard>

    <SettingCard title="Historique de facturation">
      {[
        { date: '1 mai 2026',   desc: 'Plan Pro : mai',    amount: '89,00 €', status: 'Payé' },
        { date: '1 avr. 2026',  desc: 'Plan Pro : avril',  amount: '89,00 €', status: 'Payé' },
        { date: '1 mars 2026',  desc: 'Plan Pro : mars',   amount: '89,00 €', status: 'Payé' },
      ].map((inv, i, arr) => (
        <div
          key={inv.date}
          className={`flex items-center justify-between gap-stack py-5 transition-colors ${i < arr.length - 1 ? 'border-b border-ink-100' : ''}`}
        >
          <div>
            <p className="m-0 font-body text-body-sm font-semibold text-ink-900">{inv.desc}</p>
            <p className="m-0 mt-0.5 font-body text-caption text-ink-400">{inv.date}</p>
          </div>
          <div className="flex items-center gap-stack-xs">
            <span className="font-body text-body-sm font-bold text-ink-900">{inv.amount}</span>
            <Badge variant="success">{inv.status}</Badge>
            <Button variant="link" size="sm" leadingIcon={<Download size={12} />}>PDF</Button>
          </div>
        </div>
      ))}
    </SettingCard>
  </div>
);

/* ─── Main component ──────────────────────────────────────────────────────── */

const TAB_ITEMS = [
  { id: 'general',       label: <><UserRound size={14} /> Général</> },
  { id: 'security',      label: <><ShieldCheck size={14} /> Sécurité</> },
  { id: 'notifications', label: <><BellRing size={14} /> Notifications</> },
  { id: 'billing',       label: <><CreditCard size={14} /> Facturation</> },
];

export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('general');

  return (
    <div className="min-h-[100dvh] bg-surface">
      <PageShell width="medium" paddingX="comfortable">

        {/* ── Account family sub-nav ───────────────────────────── */}
        <AccountFamilyNav active="account" />

        {/* ── Page header ──────────────────────────────────────── */}
        <header className="flex items-start justify-between gap-stack">
          <div className="flex flex-col gap-tight">
            <h1 className="m-0 font-display text-h2 font-bold text-ink-900 leading-tight tracking-tight">
              Mon compte
            </h1>
            <p className="m-0 font-body text-body-sm text-ink-500 max-w-prose">
              Informations personnelles, sécurité, notifications et abonnement.
            </p>
          </div>
          <Badge variant="brand" className="shrink-0 mt-1">Plan Pro · Actif</Badge>
        </header>

        {/* ── Tabs ─────────────────────────────────────────────── */}
        <Tabs
          items={TAB_ITEMS}
          value={activeTab}
          onChange={(id) => setActiveTab(id as TabId)}
          variant="underline"
          fullWidth
        />

        {/* ── Tab panels ────────────────────────────────────────── */}
        <div>
          {activeTab === 'general'       && <GeneralTab />}
          {activeTab === 'security'      && <SecurityTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'billing'       && <BillingTab />}
        </div>
      </PageShell>
    </div>
  );
};
