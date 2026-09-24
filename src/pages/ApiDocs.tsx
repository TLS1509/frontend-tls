import React, { useState } from 'react';
import { Copy, Key, Shield, Code } from 'lucide-react';
import PageHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MetaPill } from '../components/ui/MetaPill';
import { Tabs } from '../components/ui/Tabs';
import { PageShell } from '../components/layout';

const ENDPOINTS = [
  { method: 'GET', path: '/v1/users/:id', desc: 'Récupère le profil d\'un utilisateur', auth: 'Bearer' },
  { method: 'GET', path: '/v1/passeport/:userId', desc: 'Passeport compétences avec niveaux Dreyfus', auth: 'Bearer' },
  { method: 'POST', path: '/v1/objectifs', desc: 'Crée un objectif de progression', auth: 'Bearer' },
  { method: 'GET', path: '/v1/coaching/sessions', desc: 'Liste des sessions du coach connecté', auth: 'Bearer + Coach' },
  { method: 'POST', path: '/v1/corrections/:id/feedback', desc: 'Soumet le feedback d\'une correction', auth: 'Bearer + Coach' },
  { method: 'GET', path: '/v1/enterprise/kpis', desc: 'Indicateurs entreprise filtrés par company_id', auth: 'Bearer + Manager' },
];

/* La méthode HTTP est une donnée : `MetaPill`, dont le ton garde la
   convention des documentations d'API (lecture, écriture, suppression). */
const METHOD_TONE: Record<string, 'success' | 'info' | 'warm' | 'danger'> = {
  GET: 'success',
  POST: 'info',
  PUT: 'warm',
  DELETE: 'danger',
};

const RATE_LIMITS = [
  { plan: 'Plan Découverte', value: '60 / min' },
  { plan: 'Plan Premium', value: '600 / min' },
  { plan: 'Plan Enterprise', value: 'Illimité' },
];

/* Passe typographique du 2026-09-24 : plus d'aplat `bg-surface` qui
   s'arrêtait net ; une seule coque ; la version et le statut sont des
   données de l'en-tête (méta), plus une rangée de trois `Badge` ; chaque
   onglet ouvre sur un h2 hors de la carte ; les endpoints sont des rangées
   dans UNE carte (arbitrage n°5), et leur description reste visible sous
   768 px ; les limites de débit se lisent comme une table à trois colonnes,
   sans les trois éclairs de trois couleurs. */
const ApiDocs: React.FC = () => {
  const [tab, setTab] = useState<'endpoints' | 'auth' | 'rate-limits' | 'examples'>('endpoints');

  return (
    <PageShell width="page">
      <PageHero
        eyebrow="Développeurs · Documentation de l'API"
        title="The Learning Society API v1"
        summary="Documentation générée depuis la spécification OpenAPI : endpoints REST, authentification, limites de débit."
        tone="flat"
        meta={[
          { label: 'Version 1.4.2' },
          { label: 'Stable' },
          { label: '/v2 en bêta' },
        ]}
        trailing={<Button emphasis="soft" leadingIcon={<Code className="w-4 h-4" />}>Télécharger OpenAPI.json</Button>}
      />

      <div className="flex flex-col gap-stack-lg">
        <Tabs
          value={tab}
          onChange={(v) => setTab(v as typeof tab)}
          label="Sections de la documentation"
          items={[
            { id: 'endpoints', label: 'Endpoints' },
            { id: 'auth', label: 'Authentification' },
            { id: 'rate-limits', label: 'Limites de débit' },
            { id: 'examples', label: 'Exemples' },
          ]}
        />

        {tab === 'endpoints' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Endpoints REST" meta={`${ENDPOINTS.length} endpoints documentés`} />
            <Card className="p-0">
              <ul className="flex flex-col divide-y divide-ink-100" aria-label="Endpoints REST">
                {ENDPOINTS.map((e, i) => (
                  <li key={i} className="flex items-center gap-stack px-stack-md sm:px-stack-lg py-stack">
                    <MetaPill text={e.method} tone={METHOD_TONE[e.method]} className="shrink-0 w-14 justify-center" />
                    {/* Chemin et description : un titre et sa méta. */}
                    <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                      <code className="font-mono text-body text-ink-900 wrap-anywhere">{e.path}</code>
                      <span className="text-caption text-ink-600">{e.desc}</span>
                    </div>
                    <MetaPill text={e.auth} tone="neutral" className="max-sm:hidden shrink-0" />
                    {/* Un outil de rangée : `ghost` (arbitrage n°19). */}
                    <Button emphasis="ghost" tone="neutral" size="sm" iconOnly leadingIcon={<Copy className="w-4 h-4" />} aria-label={`Copier ${e.path}`} />
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        )}

        {tab === 'auth' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Authentification" meta="OAuth 2.0 + JWT Bearer" />
            <Card className="p-0">
              <ul className="flex flex-col divide-y divide-ink-100">
                <li className="flex items-start gap-stack-sm px-stack-md sm:px-stack-lg py-stack-lg">
                  <span className="shrink-0 inline-flex items-center text-h3 h-lh text-primary-700" aria-hidden="true"><Key className="w-5 h-5" /></span>
                  <div className="flex flex-col gap-stack-xs min-w-0">
                    <h3 className="font-display text-h3 text-ink-900">JWT Bearer Token</h3>
                    <p className="text-body text-ink-700 max-w-prose">Inclure <code className="px-1 py-0.5 bg-ink-100 rounded-sm font-mono text-caption text-ink-800">Authorization: Bearer &lt;token&gt;</code> dans chaque requête.</p>
                  </div>
                </li>
                <li className="flex items-start gap-stack-sm px-stack-md sm:px-stack-lg py-stack-lg">
                  <span className="shrink-0 inline-flex items-center text-h3 h-lh text-primary-700" aria-hidden="true"><Shield className="w-5 h-5" /></span>
                  <div className="flex flex-col gap-stack-xs min-w-0">
                    <h3 className="font-display text-h3 text-ink-900">Scopes par rôle</h3>
                    <p className="text-body text-ink-700 max-w-prose">Apprenant · Coach · Manager · Admin. Les endpoints vérifient le scope au niveau du middleware.</p>
                  </div>
                </li>
              </ul>
            </Card>
          </section>
        )}

        {tab === 'rate-limits' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Limites de débit" meta="Requêtes par minute, selon le plan" />
            <Card>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
                {RATE_LIMITS.map((r) => (
                  <div key={r.plan} className="flex flex-col gap-stack-3xs">
                    <dt className="text-caption font-semibold text-ink-600">{r.plan}</dt>
                    <dd className="font-display text-h3 text-ink-900 tabular-nums">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </section>
        )}

        {tab === 'examples' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Exemples" meta="cURL" />
            <Card variant="ink" size="sm" className="text-ink-100 font-mono text-caption overflow-x-auto">
              <pre>{`curl -X GET https://api.tls.io/v1/passeport/me \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`}</pre>
            </Card>
          </section>
        )}
      </div>
    </PageShell>
  );
};

export default ApiDocs;
