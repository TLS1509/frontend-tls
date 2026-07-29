/**
 * MenuLab — banc de comparaison des variantes de menu marketing.
 *
 * Route `/website/_menu-lab`, exclue de l'indexation (robots.txt) et absente du
 * sitemap. Prototype : il sert à trancher, pas à être publié.
 *
 * Quatre patrons, chacun rendu en **desktop et en mobile**, avec les vrais
 * libellés et les vraies routes du site. Les variantes sont volontairement
 * autonomes : elles ne consomment pas `MarketingHeader`, pour qu'on puisse les
 * comparer sans qu'une modification de l'une déteigne sur les autres.
 *
 * Sources : recherche Mobbin du 29/07 (Claude, Frontify, Garden, AngelList,
 * MindMarket).
 */

import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import { TlsLogo } from '../../../components/ui/TlsLogo';

const LINKS = [
  { label: 'Accueil', href: '/website' },
  { label: 'Learning App', href: '/website/learning-app' },
  { label: 'Accompagnement', href: '/website/accompagnement', hasMenu: true },
  { label: 'Ressources', href: '/website/resources', hasMenu: true },
];

const SUB_ACCOMPAGNEMENT = [
  { label: 'Studio IA & Pédagogie', href: '/website/studio' },
  { label: 'Upskilling sur-mesure', href: '/website/upskilling' },
  { label: 'Déploiement IA & SBO', href: '/website/accompagnement' },
];

/* ── Atomes partagés ─────────────────────────────────────────────────────── */

const Wordmark: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <span className="flex items-center gap-2 shrink-0">
    <TlsLogo size={compact ? 22 : 26} withBubble={false} />
    <span className="font-display text-body-sm font-extrabold text-primary-800 whitespace-nowrap">
      The Learning Society
    </span>
  </span>
);

const NavLink: React.FC<{ label: string; hasMenu?: boolean; active?: boolean }> = ({
  label,
  hasMenu,
  active,
}) => (
  <span
    className={`inline-flex items-center gap-1 whitespace-nowrap font-body text-body-sm transition-colors duration-fast ${
      active ? 'font-bold text-primary-800' : 'font-semibold text-ink-700 hover:text-ink-900'
    }`}
  >
    {label}
    {hasMenu && <ChevronDown size={14} className="opacity-60" />}
  </span>
);

const CtaPair: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <span className="flex items-center gap-2 shrink-0">
    <span
      className={`inline-flex items-center rounded-pill font-body font-semibold text-ink-800 transition-colors duration-fast hover:text-primary-800 ${
        compact ? 'px-3 py-1.5 text-caption' : 'px-4 py-2 text-body-sm'
      }`}
    >
      Contact
    </span>
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill bg-primary-700 font-body font-semibold text-white transition-colors duration-fast hover:bg-primary-800 ${
        compact ? 'px-3.5 py-1.5 text-caption' : 'px-5 py-2.5 text-body-sm'
      }`}
    >
      Connexion
      <ArrowRight size={14} />
    </span>
  </span>
);

/* ── A · Barre plate, pleine largeur (patron Claude) ─────────────────────── */

const VariantA: React.FC = () => (
  <div className="w-full border-b border-ink-200/80 bg-white/80 backdrop-blur-glass-light">
    <div className="max-w-wide mx-auto px-gutter h-16 flex items-center justify-between gap-flow">
      <Wordmark />
      <nav className="hidden lg:flex items-center gap-7">
        {LINKS.map((l) => (
          <NavLink key={l.label} label={l.label} hasMenu={l.hasMenu} active={l.label === 'Accueil'} />
        ))}
      </nav>
      <CtaPair />
    </div>
  </div>
);

/* ── B · Deux pilules ancrées aux bords (patron Frontify / Garden) ───────── */

const VariantB: React.FC = () => (
  <div className="w-full py-4">
    <div className="max-w-wide mx-auto px-gutter flex items-center justify-between gap-flow">
      <div className="flex items-center gap-6 rounded-pill bg-white/85 ring-1 ring-ink-200/70 backdrop-blur-glass-light pl-5 pr-6 h-14 shadow-xs">
        <Wordmark compact />
        <nav className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <NavLink key={l.label} label={l.label} hasMenu={l.hasMenu} active={l.label === 'Accueil'} />
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-1.5 rounded-pill bg-white/85 ring-1 ring-ink-200/70 backdrop-blur-glass-light px-1.5 h-14 shadow-xs">
        <CtaPair />
      </div>
    </div>
  </div>
);

/* ── C · Pilule unique large (état actuel du site) ───────────────────────── */

const VariantC: React.FC = () => (
  <div className="w-full py-4">
    <div className="max-w-wide mx-auto px-gutter">
      <div className="flex items-center justify-between gap-flow rounded-pill bg-white/85 ring-1 ring-ink-200/70 backdrop-blur-glass-light pl-5 pr-1.5 h-16 shadow-xs">
        <Wordmark />
        <nav className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <NavLink key={l.label} label={l.label} hasMenu={l.hasMenu} active={l.label === 'Accueil'} />
          ))}
        </nav>
        <CtaPair />
      </div>
    </div>
  </div>
);

/* ── D · Barre alignée, liens groupés dans une pilule (patron AngelList) ─── */

const VariantD: React.FC = () => (
  <div className="w-full py-4">
    <div className="max-w-wide mx-auto px-gutter flex items-center justify-between gap-flow">
      <Wordmark />
      <nav className="hidden lg:flex items-center gap-6 rounded-pill bg-ink-100/70 ring-1 ring-ink-200/60 px-6 h-11">
        {LINKS.map((l) => (
          <NavLink key={l.label} label={l.label} hasMenu={l.hasMenu} active={l.label === 'Accueil'} />
        ))}
      </nav>
      <CtaPair />
    </div>
  </div>
);

/* ── Variantes mobiles ───────────────────────────────────────────────────── */

const MobileBar: React.FC<{ variant: 'flat' | 'pill'; onOpen: () => void }> = ({ variant, onOpen }) => (
  <div className={variant === 'flat' ? 'w-full border-b border-ink-200/80 bg-white/90' : 'w-full p-3'}>
    <div
      className={
        variant === 'flat'
          ? 'flex items-center justify-between px-4 h-14'
          : 'flex items-center justify-between rounded-pill bg-white/90 ring-1 ring-ink-200/70 pl-4 pr-2 h-14 shadow-xs'
      }
    >
      <Wordmark compact />
      <button
        type="button"
        onClick={onOpen}
        aria-label="Ouvrir le menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-ink-800 hover:bg-ink-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        <Menu size={20} />
      </button>
    </div>
  </div>
);

/** Tiroir mobile — plein écran, liens en grande typo, CTA en pied. */
const MobileSheet: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="absolute inset-0 flex flex-col bg-white">
    <div className="flex items-center justify-between px-4 h-14 border-b border-ink-200/80">
      <Wordmark compact />
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer le menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-ink-800 hover:bg-ink-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        <X size={20} />
      </button>
    </div>
    <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col">
      {LINKS.map((l) => (
        <div key={l.label} className="border-b border-ink-200/70 py-4 first:pt-0">
          <span className="flex items-center justify-between font-display text-feature text-ink-900">
            {l.label}
            {l.hasMenu && <ChevronDown size={18} className="text-ink-400" />}
          </span>
          {l.label === 'Accompagnement' && (
            <ul className="mt-3 flex flex-col gap-2 m-0 p-0 list-none">
              {SUB_ACCOMPAGNEMENT.map((s) => (
                <li key={s.label} className="font-body text-body text-ink-600">
                  {s.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
    <div className="px-4 py-5 border-t border-ink-200/80 flex flex-col gap-2">
      <span className="inline-flex h-12 items-center justify-center rounded-pill bg-primary-700 font-body text-body-sm font-semibold text-white">
        Connexion
      </span>
      <span className="inline-flex h-12 items-center justify-center rounded-pill ring-1 ring-ink-200 font-body text-body-sm font-semibold text-ink-800">
        Contact
      </span>
    </div>
  </div>
);

const MobileFrame: React.FC<{ variant: 'flat' | 'pill'; label: string }> = ({ variant, label }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-group">
      <span className="font-body text-caption font-bold text-ink-500">{label}</span>
      <div className="relative w-[320px] h-[560px] overflow-hidden rounded-2xl ring-1 ring-ink-200 bg-gradient-page-ambient">
        <MobileBar variant={variant} onOpen={() => setOpen(true)} />
        <div className="px-4 pt-8">
          <p className="font-display text-title text-ink-900 m-0">Ne formez plus pour former.</p>
        </div>
        {open && <MobileSheet onClose={() => setOpen(false)} />}
      </div>
    </div>
  );
};

/* ── Page ────────────────────────────────────────────────────────────────── */

type Variant = {
  key: string;
  titre: string;
  source: string;
  pour: string;
  contre: string;
  mobile: 'flat' | 'pill';
  render: React.FC;
};

const VARIANTS: Variant[] = [
  {
    key: 'A',
    titre: 'Barre plate, pleine largeur',
    source: 'patron Claude',
    pour: "Le plus éditorial. Elle s'ancre au haut de page au lieu de flotter, et le contenu passe dessous sans qu'on ait à réserver de l'espace pour elle.",
    contre: "Perd l'effet flottant. Plus proche d'un site de presse que d'un produit.",
    mobile: 'flat',
    render: VariantA,
  },
  {
    key: 'B',
    titre: 'Deux pilules ancrées aux bords',
    source: 'patron Frontify / Garden',
    pour: "Garde le flottant et règle l'alignement : chaque pilule tombe sur un bord du contenu. Sépare clairement la navigation de l'action.",
    contre: 'Deux objets au lieu d\'un. Sur écran étroit, les deux pilules se rapprochent et le centre se vide.',
    mobile: 'pill',
    render: VariantB,
  },
  {
    key: 'C',
    titre: 'Pilule unique large',
    source: 'état actuel du site, corrigé ce matin',
    pour: 'Un seul objet, alignement réglé (1280px, comme le contenu). Rien à réapprendre.',
    contre: "Le registre 'pilule flottante' est très saturé sur les sites SaaS. C'est le patron le plus attendu des quatre.",
    mobile: 'pill',
    render: VariantC,
  },
  {
    key: 'D',
    titre: 'Barre alignée, liens groupés',
    source: 'patron AngelList',
    pour: "Compromis : la structure est ancrée aux bords comme une barre, mais les liens forment un objet distinct au centre. Le logo et les CTA respirent.",
    contre: 'La pilule centrale peut se lire comme un composant flottant sans raison.',
    mobile: 'flat',
    render: VariantD,
  },
];

export const MenuLab: React.FC = () => (
  <div className="min-h-[100dvh] bg-ink-50/40">
    <div className="max-w-wide mx-auto px-gutter py-band flex flex-col gap-chapter">
      <header className="flex flex-col gap-group max-w-3xl">
        <h1 className="font-display text-section text-ink-900 m-0">
          Menu marketing : quatre patrons à comparer
        </h1>
        <p className="font-body text-lede text-ink-700 m-0 [text-wrap:pretty]">
          Vrais libellés, vraies routes, desktop et mobile. Le tiroir mobile
          s'ouvre au clic sur chaque maquette. Aucune de ces variantes n'est en
          production : le site tourne toujours sur la C.
        </p>
      </header>

      {VARIANTS.map((v) => {
        const Render = v.render;
        return (
          <section key={v.key} className="flex flex-col gap-flow">
            <div className="flex flex-col gap-rule border-t border-ink-300 pt-flow">
              <span className="font-body text-caption font-bold text-secondary-600">
                Variante {v.key} · {v.source}
              </span>
              <h2 className="font-display text-title text-ink-900 m-0">{v.titre}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-group max-w-4xl pt-group">
                <p className="font-body text-body text-ink-700 m-0">
                  <span className="font-bold text-primary-800">Pour. </span>
                  {v.pour}
                </p>
                <p className="font-body text-body text-ink-600 m-0">
                  <span className="font-bold text-ink-800">Contre. </span>
                  {v.contre}
                </p>
              </div>
            </div>

            {/* Desktop */}
            <div className="flex flex-col gap-group">
              <span className="font-body text-caption font-bold text-ink-500">Desktop</span>
              <div className="overflow-hidden rounded-2xl ring-1 ring-ink-200 bg-gradient-page-ambient">
                <Render />
                <div className="px-gutter pt-band pb-flow">
                  <p className="font-display text-hero text-ink-900 m-0 max-w-3xl [text-wrap:balance]">
                    Ne formez plus pour former.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex flex-wrap gap-flow">
              <MobileFrame variant={v.mobile} label="Mobile · fermé (cliquer pour ouvrir)" />
            </div>
          </section>
        );
      })}
    </div>
  </div>
);

export default MenuLab;
