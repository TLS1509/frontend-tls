/**
 * _TestLogo — Page de référence logo TLS (consolidée)
 *
 * Sections :
 *   00. NEW 2026 proposals — A Node · B Trident · C Cross+ · D Orbit · E Journey · F Signal
 *   01. Heritage+ mark — galerie tailles (256 → 16px)
 *   02. Heritage+ mark — fond sombre / fond clair
 *   03. Heritage+ — 5 layouts (mark · stacked · h1 · h2 · h3)
 *   04. Proposals archive — P1 Heritage+ · P2 Bloom · P3 Nexus · P4 Arc · P5 Orb
 */

import { TlsLogoHeritage } from '../components/ui/TlsLogoHeritage';
import { LogoP1Heritage, LogoP2Bloom, LogoP3Nexus, LogoP4Arc, LogoP5Orb } from '../components/ui/TlsLogoProposals';
import { newProposals } from '../components/ui/TlsLogoNew';
import { variantProposals } from '../components/ui/TlsLogoVariants';
import type { LogoLayout } from '../components/ui/TlsLogoHeritage';

// ── Helpers ──────────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono text-white/40 tracking-widest uppercase mb-6">
      {children}
    </p>
  );
}

function DividerLine() {
  return <div className="w-full h-px bg-white/10 my-12" />;
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function TestLogo() {
  const sizes   = [256, 160, 120, 80, 56, 40, 32, 20, 16] as const;
  const layouts = ['mark', 'stacked', 'h1', 'h2', 'h3'] as LogoLayout[];

  const proposals = [
    { id: 'p1', label: 'Heritage+', Sub: LogoP1Heritage, desc: 'Topologie originale · glass / frost / 3D' },
    { id: 'p2', label: 'Bloom',     Sub: LogoP2Bloom,   desc: '4 pétales bezier · tips amber & gold' },
    { id: 'p3', label: 'Nexus',     Sub: LogoP3Nexus,   desc: 'Graphe 5 nœuds · géométrique précis' },
    { id: 'p4', label: 'Arc',       Sub: LogoP4Arc,     desc: '3 arcs propeller 240° · abstract minimal' },
    { id: 'p5', label: 'Orb',       Sub: LogoP5Orb,     desc: 'Grande sphère + 2 satellites · 3D organique' },
  ];

  return (
    <div className="min-h-screen bg-[#0e1a1f] text-white font-body px-10 py-16">
      <div className="max-w-[1200px] mx-auto">

        {/* ── Header ── */}
        <div className="mb-16">
          <p className="text-xs font-mono text-white/30 tracking-widest uppercase mb-3">The Learning Society</p>
          <h1 className="text-4xl font-display font-bold text-white tracking-tight mb-2">Logo Reference</h1>
          <p className="text-white/50 text-sm">2026 proposals · Heritage+ glass mark · 5 layouts · archive</p>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTION 00 — NEW 2026 Proposals (A→F)
        ══════════════════════════════════════════════════════════ */}
        <SectionLabel>00 — New 2026 Proposals · DS-aligned · favicon-ready</SectionLabel>

        {/* Grille principale 200px */}
        <div className="grid grid-cols-6 gap-5 mb-10">
          {newProposals.map(({ id, label, Sub, inspo, concept, favicon }) => (
            <div key={id} className="flex flex-col gap-3">
              <div className="rounded-2xl bg-white/5 border border-white/8 p-5 flex items-center justify-center aspect-square hover:bg-white/8 transition-colors">
                <Sub size={150} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-white">{label}</p>
                  <span className="text-[9px] text-white/30 font-mono">{favicon}</span>
                </div>
                <p className="text-[10px] text-primary-400 font-mono leading-tight mb-1">{inspo}</p>
                <p className="text-[11px] text-white/40 leading-snug">{concept}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Favicon strip — toutes à 32px et 16px */}
        <div className="mb-8">
          <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest mb-4">Favicon test — 32px</p>
          <div className="flex items-center gap-6 bg-white/4 rounded-xl px-6 py-4 border border-white/6">
            {newProposals.map(({ id, Sub }) => (
              <div key={id} className="flex flex-col items-center gap-2">
                <Sub size={32} />
                <span className="text-[9px] font-mono text-white/25">{id}</span>
              </div>
            ))}
            <div className="w-px h-8 bg-white/10 mx-2" />
            <p className="text-[10px] text-white/25 font-mono">↑ 32px</p>
          </div>
        </div>
        <div className="mb-10">
          <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest mb-4">Favicon test — 16px</p>
          <div className="flex items-center gap-6 bg-white/4 rounded-xl px-6 py-5 border border-white/6">
            {newProposals.map(({ id, Sub }) => (
              <div key={id} className="flex flex-col items-center gap-3">
                <Sub size={16} />
                <span className="text-[9px] font-mono text-white/25">{id}</span>
              </div>
            ))}
            <div className="w-px h-8 bg-white/10 mx-2" />
            <p className="text-[10px] text-white/25 font-mono">↑ 16px</p>
          </div>
        </div>

        {/* Sur fond clair */}
        <div className="mb-4">
          <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest mb-4">Sur fond clair (white)</p>
          <div className="flex items-center gap-5 bg-white rounded-2xl px-8 py-6 border border-black/5">
            {newProposals.map(({ id, Sub }) => (
              <div key={id} className="flex flex-col items-center gap-3">
                <Sub size={100} />
                <span className="text-[10px] font-mono text-black/30">{id}</span>
              </div>
            ))}
          </div>
        </div>

        <DividerLine />

        {/* ══════════════════════════════════════════════════════════
            SECTION 00-B — Variants Heritage+ (effets alternatifs)
        ══════════════════════════════════════════════════════════ */}
        <SectionLabel>00-B — Heritage+ · Variants matière &amp; effets</SectionLabel>

        {/* Grille 200px sur fond sombre */}
        <div className="grid grid-cols-6 gap-5 mb-10">
          {variantProposals.map(({ id, label, Sub, matiere, concept, surface }) => (
            <div key={id} className="flex flex-col gap-3">
              <div className="rounded-2xl bg-white/5 border border-white/8 p-5 flex items-center justify-center aspect-square hover:bg-white/8 transition-colors">
                <Sub size={150} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-white">{label}</p>
                  <span className="text-[9px] text-white/30 font-mono">{id}</span>
                </div>
                <p className="text-[10px] text-primary-400 font-mono leading-tight mb-1">{matiere}</p>
                <p className="text-[11px] text-white/40 leading-snug mb-1">{concept}</p>
                <p className="text-[9px] text-white/20 font-mono">{surface}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sur fond clair */}
        <div className="mb-4">
          <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest mb-4">Sur fond clair (white)</p>
          <div className="flex items-center gap-5 bg-white rounded-2xl px-8 py-6 border border-black/5">
            {variantProposals.map(({ id, Sub }) => (
              <div key={id} className="flex flex-col items-center gap-3">
                <Sub size={100} />
                <span className="text-[10px] font-mono text-black/30">{id}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tailles de référence — variant le plus prometteur (Obsidian v4) */}
        <div className="mb-4">
          <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest mb-4">Size range — tous les variants à 40px (favicon)</p>
          <div className="flex items-center gap-6 bg-white/4 rounded-xl px-6 py-4 border border-white/6">
            {variantProposals.map(({ id, Sub }) => (
              <div key={id} className="flex flex-col items-center gap-2">
                <Sub size={40} />
                <span className="text-[9px] font-mono text-white/25">{id}</span>
              </div>
            ))}
          </div>
        </div>

        <DividerLine />

        {/* ══════════════════════════════════════════════════════════
            SECTION 1 — Taille range
        ══════════════════════════════════════════════════════════ */}
        <SectionLabel>01 — Heritage+ · Size range</SectionLabel>
        <div className="flex flex-wrap items-end gap-8">
          {sizes.map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <TlsLogoHeritage layout="mark" size={s} />
              <span className="text-[10px] font-mono text-white/30">{s}px</span>
            </div>
          ))}
        </div>

        <DividerLine />

        {/* ══════════════════════════════════════════════════════════
            SECTION 2 — Fond clair vs fond sombre
        ══════════════════════════════════════════════════════════ */}
        <SectionLabel>02 — Heritage+ · Light vs Dark surface</SectionLabel>
        <div className="grid grid-cols-2 gap-6">
          {/* Fond foncé */}
          <div className="rounded-2xl bg-[#1F3E45] p-10 flex items-center justify-center min-h-[200px]">
            <TlsLogoHeritage layout="mark" size={140} />
          </div>
          {/* Fond clair */}
          <div className="rounded-2xl bg-white p-10 flex items-center justify-center min-h-[200px]">
            <TlsLogoHeritage layout="mark" size={140} />
          </div>
          {/* Fond primary-100 */}
          <div className="rounded-2xl bg-primary-100 p-10 flex items-center justify-center min-h-[200px]">
            <TlsLogoHeritage layout="mark" size={140} />
          </div>
          {/* Fond ink-900 */}
          <div className="rounded-2xl bg-ink-900 p-10 flex items-center justify-center min-h-[200px]">
            <TlsLogoHeritage layout="mark" size={140} />
          </div>
        </div>

        <DividerLine />

        {/* ══════════════════════════════════════════════════════════
            SECTION 3 — 5 Layouts × fond clair + fond sombre
        ══════════════════════════════════════════════════════════ */}
        <SectionLabel>03 — Heritage+ · 5 layouts</SectionLabel>
        <div className="flex flex-col gap-8">
          {layouts.map((layout) => (
            <div key={layout} className="flex flex-col gap-3">
              <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest">{layout}</span>
              <div className="grid grid-cols-2 gap-4">
                {/* Fond sombre */}
                <div className="rounded-xl bg-[#1F3E45]/60 border border-white/8 p-8 flex items-center justify-center">
                  <TlsLogoHeritage layout={layout} />
                </div>
                {/* Fond clair */}
                <div className="rounded-xl bg-white border border-black/6 p-8 flex items-center justify-center">
                  <TlsLogoHeritage layout={layout} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <DividerLine />

        {/* ══════════════════════════════════════════════════════════
            SECTION 4 — Proposals archive (P1–P5)
        ══════════════════════════════════════════════════════════ */}
        <SectionLabel>04 — Proposals archive · P1 → P5</SectionLabel>
        <div className="grid grid-cols-5 gap-5">
          {proposals.map(({ id, label, Sub, desc }) => (
            <div key={id} className="flex flex-col gap-3">
              <div className="rounded-xl bg-white/5 border border-white/8 p-6 flex items-center justify-center aspect-square">
                <Sub size={140} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-[11px] text-white/40 leading-tight mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <DividerLine />

        {/* ══════════════════════════════════════════════════════════
            SECTION 5 — Heritage+ proposals, size comparison
        ══════════════════════════════════════════════════════════ */}
        <SectionLabel>05 — Heritage+ P1 · 3 tailles de référence</SectionLabel>
        <div className="flex items-end gap-12">
          {[300, 200, 140, 80].map((s) => (
            <div key={s} className="flex flex-col items-center gap-4">
              <LogoP1Heritage size={s} />
              <span className="text-[10px] font-mono text-white/30">{s}px</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/8">
          <p className="text-[11px] font-mono text-white/20">The Learning Society · Logo Reference · Phase 19 / 2026</p>
        </div>

      </div>
    </div>
  );
}
