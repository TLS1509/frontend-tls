/**
 * Account Page : Informations personnelles, sécurité et interface.
 *
 * Phase 24 rationalization : les tabs "Notifications" et "Facturation"
 * ont été retirés (doublons de NotificationPreferences.tsx et Billing.tsx —
 * chaque concept vit maintenant à un seul endroit, voir AccountFamilyNav).
 * Le contenu "Interface" de l'ex-Settings.tsx a été intégré à l'onglet
 * Général, et la "Zone de danger" pointe désormais vers les vrais flows
 * RGPD (export DSAR, suppression de compte) au lieu de dupliquer leur UI.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Switch, Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import type { SelectOption } from '../components/core/Select';
import { Tabs } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { SettingsRow } from '../components/patterns/SettingsRow';
import { useToastContext } from '../contexts/ToastContext';
import { AccountFamilyNav } from '../components/patterns/AccountFamilyNav';
import { PageHero } from '../components/patterns/EditorialHero';
import { PageShell } from '../components/layout';
import {
  UserRound,
  ShieldCheck,
  Globe,
  Clock,
  Lock,
  Fingerprint,
  LogOut,
  Download,
  Trash2,
  CheckCircle2,
  Smartphone,
  MapPin,
  ChevronRight,
} from 'lucide-react';

type TabId = 'general' | 'security';

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

const SettingCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="rounded-xl border border-ink-100 bg-white overflow-hidden">
    <div className="px-stack-lg py-stack border-b border-ink-100">
      <h3 className="font-display text-body font-bold text-ink-900 tracking-snug">
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
  const navigate = useNavigate();

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
        <div className="grid grid-cols-2 gap-stack pt-stack-md pb-stack-md">
          <Input label="Nom complet"     id="name"    value={name}  onChange={(e) => setName(e.target.value)} />
          <Input label="Adresse email"   id="email"   type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Poste"           id="poste"   defaultValue="Responsable Formation" />
          <Input label="Entreprise"      id="company" defaultValue="TLS Learning Society" />
        </div>
        <div className="pb-stack-md flex gap-stack-xs">
          <Button onClick={handleSave} loading={isSaving}>Enregistrer les modifications</Button>
          <Button emphasis="soft" tone="warm" disabled={isSaving}>Annuler</Button>
        </div>
      </SettingCard>

      <SettingCard title="Préférences">
        <SettingsRow icon={<Globe size={16} />} label="Langue de l'interface" description="Actuellement : Français">
          <div className="w-[180px]">
            <Select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              options={LANG_OPTIONS}
            />
          </div>
        </SettingsRow>
        <SettingsRow icon={<Clock size={16} />} label="Fuseau horaire" description="Europe/Paris (UTC+2)">
          <Button emphasis="link" size="sm" trailingIcon={<ChevronRight size={14} />}>Modifier</Button>
        </SettingsRow>
      </SettingCard>

      {/* La carte « Interface » (animations fluides, contraste renforcé,
          navigation compacte) a été retirée le 2026-09-24 : ses trois
          interrupteurs étaient des `useState` locaux reliés à rien — ni
          persistés ni appliqués. « Navigation compacte » s'affichait ACTIVÉ
          sur une barre latérale pleine largeur. Un réglage qui ne fait rien
          ment ; à rétablir quand il sera branché sur un store persisté. */}
      <SettingCard title="Zone de danger">
        <SettingsRow icon={<Download size={16} />} label="Exporter mes données" description="Demande d'accès RGPD (DSAR) — délai légal 30 jours">
          <Button emphasis="soft" tone="warm" size="sm" leadingIcon={<Download size={14} />} onClick={() => navigate('/profile/privacy/dsar')}>
            Exporter
          </Button>
        </SettingsRow>
        <SettingsRow icon={<Trash2 size={16} />} label="Supprimer mon compte" description="Cette action est irréversible. Toutes vos données seront perdues." danger>
          <Button
            emphasis="soft" tone="danger"
            size="sm"
            leadingIcon={<Trash2 size={14} />}
            onClick={() => navigate('/profile/privacy/delete-account')}
          >
            Supprimer
          </Button>
        </SettingsRow>
      </SettingCard>
    </div>
  );
};

const SecurityTab: React.FC = () => {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="flex flex-col gap-stack-lg">
      <SettingCard title="Authentification">
        <SettingsRow icon={<Lock size={16} />} label="Mot de passe" description="Dernière modification il y a 3 mois">
          <Button emphasis="soft" tone="warm" size="sm">Changer</Button>
        </SettingsRow>
        <SettingsRow
          icon={<Fingerprint size={16} />}
          label="Double authentification (2FA)"
          description={twoFA ? "Activée : votre compte est protégé" : "Désactivée : recommandé pour plus de sécurité"}
        >
          <div className="flex items-center gap-stack-xs">
            {twoFA && (
              <span className="flex items-center gap-tight font-body text-caption text-success-fg font-semibold">
                <CheckCircle2 size={14} /> Activée
              </span>
            )}
            <Switch
              checked={twoFA}
              onChange={(e) => setTwoFA(e.target.checked)}
              aria-label="Activer la double authentification"
            />
          </div>
        </SettingsRow>
      </SettingCard>

      <SettingCard title="Sessions actives">
        {SESSIONS.map((session, i) => (
          <div
            key={session.id}
            className={[
              'flex items-center justify-between gap-stack py-stack-md px-stack-lg -mx-6 transition-colors',
              i < SESSIONS.length - 1 ? 'border-b border-ink-100' : '',
              session.current ? 'bg-primary-50' : '',
            ].join(' ')}
          >
            <div className="flex items-start gap-stack-xs">
              <div className={`w-9 h-9 rounded-md shrink-0 flex items-center justify-center ${session.current ? 'bg-primary-100 text-primary-600' : 'bg-ink-100 text-ink-700'}`}>
                <Smartphone size={16} />
              </div>
              <div>
                <div className="flex items-center gap-stack-xs">
                  <p className="m-0 font-body text-body-sm font-semibold text-ink-900">
                    {session.device}
                  </p>
                  {session.current && <Badge variant="success">session actuelle</Badge>}
                </div>
                <p className="m-0 mt-0.5 font-body text-caption text-ink-700 flex items-center gap-stack-xs">
                  <MapPin size={14} /> {session.location} · {session.lastSeen}
                </p>
              </div>
            </div>
            {!session.current && (
              <Button emphasis="soft" tone="warm" size="sm" className="shrink-0" leadingIcon={<LogOut size={14} />}>
                Révoquer
              </Button>
            )}
          </div>
        ))}
        <div className="pb-stack-md pt-3">
          <Button emphasis="outline" size="sm" className="text-danger-fg hover:bg-danger-bg" leadingIcon={<LogOut size={14} />}>
            Déconnecter toutes les autres sessions
          </Button>
        </div>
      </SettingCard>
    </div>
  );
};

/* ─── Main component ──────────────────────────────────────────────────────── */

const TAB_ITEMS = [
  { id: 'general',  label: <><UserRound size={14} /> Général</> },
  { id: 'security', label: <><ShieldCheck size={14} /> Sécurité</> },
];

export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('general');

  return (
    <PageShell width="content" noPadTop>
      {/* ── Account family sub-nav ───────────────────────────── */}
      <AccountFamilyNav active="account" />

      {/* ── Page header ──────────────────────────────────────── */}
      <PageHero
        eyebrow="Profil · Mon compte"
        title="Mon compte"
        summary="Informations personnelles, sécurité et préférences d'interface."
        tone="flat"
        trailing={<Badge variant="brand">Plan Pro · Actif</Badge>}
      />

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
        {activeTab === 'general'  && <GeneralTab />}
        {activeTab === 'security' && <SecurityTab />}
      </div>
    </PageShell>
  );
};

export default Account;
