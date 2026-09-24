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
import { MetaPill } from '../components/ui/MetaPill';
import { IconChip } from '../components/ui/IconChip';
import { Card } from '../components/core/Card';
import { SettingsRow } from '../components/patterns/SettingsRow';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { useToastContext } from '../contexts/ToastContext';
import { AccountFamilyNav } from '../components/patterns/AccountFamilyNav';
import { PageHero } from '../components/patterns/EditorialHero';
import { PageShell } from '../components/layout';
import {
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

/* Une section de réglages : son titre h2 posé sur la page, puis sa carte.
   C'était une carte faite main avec un bandeau-titre h3 à 16 px — plus petit
   que les libellés de rangée qu'il annonçait (16 / 600) : la hiérarchie se
   lisait à l'envers. */
const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="flex flex-col gap-stack">
    <SectionHeader title={title} />
    <Card>{children}</Card>
  </section>
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
    <div className="flex flex-col gap-page">
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Informations personnelles" />
        {/* Deux colonnes seulement quand la carte a la place (requête de
            conteneur) : à 375 px, l'email était tronqué et « Annuler »
            sortait de la carte. */}
        <Card className="@container flex flex-col gap-stack-lg">
          <div className="grid grid-cols-1 @lg:grid-cols-2 gap-stack">
            <Input label="Nom complet"     id="name"    value={name}  onChange={(e) => setName(e.target.value)} />
            <Input label="Adresse email"   id="email"   type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Poste"           id="poste"   defaultValue="Responsable Formation" />
            <Input label="Entreprise"      id="company" defaultValue="TLS Learning Society" />
          </div>
          {/* Arbitrage n°19 : l'enregistrement est l'action principale de
              l'onglet (solid) ; Annuler forme la paire (outline neutre). Les
              deux boutons n'étaient séparés que par leur couleur. */}
          <div className="flex flex-wrap gap-stack-xs">
            <Button emphasis="solid" tone="brand" onClick={handleSave} loading={isSaving}>Enregistrer les modifications</Button>
            <Button emphasis="outline" tone="neutral" disabled={isSaving}>Annuler</Button>
          </div>
        </Card>
      </section>

      <SettingsSection title="Préférences">
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
      </SettingsSection>

      {/* La carte « Interface » (animations fluides, contraste renforcé,
          navigation compacte) a été retirée le 2026-09-24 : ses trois
          interrupteurs étaient des `useState` locaux reliés à rien — ni
          persistés ni appliqués. « Navigation compacte » s'affichait ACTIVÉ
          sur une barre latérale pleine largeur. Un réglage qui ne fait rien
          ment ; à rétablir quand il sera branché sur un store persisté. */}
      <SettingsSection title="Zone de danger">
        <SettingsRow icon={<Download size={16} />} label="Exporter mes données" description="Demande d'accès RGPD (DSAR), délai légal de 30 jours">
          <Button emphasis="soft" tone="warm" size="sm" leadingIcon={<Download size={14} />} onClick={() => navigate('/profile/privacy/dsar')}>
            Exporter
          </Button>
        </SettingsRow>
        <SettingsRow icon={<Trash2 size={16} />} label="Supprimer mon compte" description="Cette action est irréversible. Toutes vos données seront perdues." danger>
          {/* Destructif sur une page : ghost danger (arbitrage n°19). Le
              solid danger est réservé au Confirmer du parcours de suppression. */}
          <Button
            emphasis="ghost" tone="danger"
            size="sm"
            leadingIcon={<Trash2 size={14} />}
            onClick={() => navigate('/profile/privacy/delete-account')}
          >
            Supprimer
          </Button>
        </SettingsRow>
      </SettingsSection>
    </div>
  );
};

const SecurityTab: React.FC = () => {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="flex flex-col gap-page">
      <SettingsSection title="Authentification">
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
              <span className="flex items-center gap-stack-3xs font-body text-caption text-success-fg font-semibold">
                <CheckCircle2 size={14} aria-hidden="true" /> Activée
              </span>
            )}
            <Switch
              checked={twoFA}
              onChange={(e) => setTwoFA(e.target.checked)}
              aria-label="Activer la double authentification"
            />
          </div>
        </SettingsRow>
      </SettingsSection>

      <section className="flex flex-col gap-stack">
        <SectionHeader title="Sessions actives" meta={`${SESSIONS.length} appareils`} />
        {/* Des rangées dans une carte ; la session en cours garde son fond. */}
        <Card className="p-0 overflow-hidden">
          <ul className="flex flex-col divide-y divide-ink-100" aria-label="Sessions actives">
            {SESSIONS.map((session) => (
              <li
                key={session.id}
                className={[
                  'flex items-center justify-between gap-stack px-stack-md sm:px-stack-lg py-stack',
                  session.current ? 'bg-primary-50' : '',
                ].join(' ')}
              >
                <div className="flex items-start gap-stack-sm min-w-0">
                  <IconChip
                    size="md"
                    tone={session.current ? 'brand' : 'neutral'}
                    surface={session.current ? 'tinted' : 'default'}
                  >
                    <Smartphone />
                  </IconChip>
                  {/* Le texte descend de 6 px : sa première ligne tombe sur le
                      centre de la pastille de 40 (le motif de SettingsRow). */}
                  <div className="flex flex-col gap-stack-3xs min-w-0 pt-stack-2xs">
                    <div className="flex flex-wrap items-center gap-x-stack-xs gap-y-stack-3xs">
                      <p className="font-body text-body font-semibold text-ink-900">
                        {session.device}
                      </p>
                      {session.current && <Badge variant="success">Session actuelle</Badge>}
                    </div>
                    <p className="font-body text-caption text-ink-600 flex items-center gap-stack-3xs">
                      <MapPin size={14} aria-hidden="true" /> {session.location} · {session.lastSeen}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <Button emphasis="soft" tone="warm" size="sm" className="shrink-0" leadingIcon={<LogOut size={14} />}>
                    Révoquer
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </Card>
        {/* Contenu → action : 24 px. Le ton `danger` passe par l'API du
            bouton : une couleur posée en `className` à côté de celle de la
            variante se jouait à l'ordre d'émission (piège n°6). */}
        <div className="mt-stack-xs">
          <Button emphasis="ghost" tone="danger" size="sm" leadingIcon={<LogOut size={14} />}>
            Déconnecter toutes les autres sessions
          </Button>
        </div>
      </section>
    </div>
  );
};

/* ─── Main component ──────────────────────────────────────────────────────── */

const TAB_ITEMS = [
  { id: 'general',  label: 'Général' },
  { id: 'security', label: 'Sécurité' },
];

/* Passe typographique du 2026-09-24 : le haut de page reprend le padding de
   `PageShell` (la nav de la famille touchait le haut de la fenêtre) ; le
   surtitre « Profil · Mon compte » redisait le titre et un faux parent ;
   l'offre est une donnée (`MetaPill`) ; les onglets sont les onglets texte
   de l'app (l'icône empilée au-dessus du libellé en faisait un troisième
   style) ; chaque carte de réglages a son titre h2 posé au-dessus. */
export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('general');

  return (
    <PageShell width="content">
      {/* ── Account family sub-nav ───────────────────────────── */}
      <AccountFamilyNav active="account" />

      {/* ── Page header ──────────────────────────────────────── */}
      <PageHero
        title="Mon compte"
        summary="Informations personnelles, sécurité et préférences d'interface."
        tone="flat"
        trailing={<MetaPill text="Plan Pro · actif" tone="neutral" />}
      />

      {/* ── Onglets et panneau : un bloc (24 px) ─────────────── */}
      <div className="flex flex-col gap-stack-lg">
        <Tabs
          items={TAB_ITEMS}
          value={activeTab}
          onChange={(id) => setActiveTab(id as TabId)}
          variant="underline"
          label="Sections du compte"
        />
        {activeTab === 'general'  && <GeneralTab />}
        {activeTab === 'security' && <SecurityTab />}
      </div>
    </PageShell>
  );
};

export default Account;
