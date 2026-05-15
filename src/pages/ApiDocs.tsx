import React, { useState } from 'react';
import { Copy, Key, Zap, Shield, BookOpen, Code } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';

const ENDPOINTS = [
  { method: 'GET', path: '/v1/users/:id', desc: 'Récupère le profil d\'un utilisateur', auth: 'Bearer' },
  { method: 'GET', path: '/v1/passeport/:userId', desc: 'Passeport compétences avec niveaux Dreyfus', auth: 'Bearer' },
  { method: 'POST', path: '/v1/objectifs', desc: 'Crée un objectif de progression', auth: 'Bearer' },
  { method: 'GET', path: '/v1/coaching/sessions', desc: 'Liste des sessions du coach connecté', auth: 'Bearer + Coach' },
  { method: 'POST', path: '/v1/corrections/:id/feedback', desc: 'Soumet le feedback d\'une correction', auth: 'Bearer + Coach' },
  { method: 'GET', path: '/v1/enterprise/kpis', desc: 'KPIs enterprise filtrés par company_id', auth: 'Bearer + Manager' },
];

const METHOD_COLOR: Record<string, 'success' | 'info' | 'warm' | 'danger'> = {
  GET: 'success',
  POST: 'info',
  PUT: 'warm',
  DELETE: 'danger',
};

const ApiDocs: React.FC = () => {
  const [tab, setTab] = useState<'endpoints' | 'auth' | 'rate-limits' | 'examples'>('endpoints');

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow="Developer · API Documentation"
        title="The Learning Society API v1"
        summary="Documentation Swagger/OpenAPI auto-générée — endpoints REST, authentification, rate limits"
        tone="default"
        trailing={<Button variant="primary" leadingIcon={<Code className="w-4 h-4" />}>Télécharger OpenAPI.json</Button>}
      />

      <div className="max-w-page mx-auto px-4 py-section flex flex-col gap-section">
        <div className="flex flex-wrap gap-stack-xs">
          <Badge variant="info">v1.4.2</Badge>
          <Badge variant="success">Stable</Badge>
          <Badge variant="warm">Beta: /v2</Badge>
        </div>

        <Tabs
          value={tab}
          onChange={(v) => setTab(v as typeof tab)}
          items={[
            { id: 'endpoints', label: 'Endpoints' },
            { id: 'auth', label: 'Authentification' },
            { id: 'rate-limits', label: 'Rate limits' },
            { id: 'examples', label: 'Exemples' },
          ]}
        />

        {tab === 'endpoints' && (
          <SectionCard title="Endpoints REST" description={`${ENDPOINTS.length} endpoints documentés sur ${ENDPOINTS.length}`}>
            <div className="flex flex-col gap-stack-xs">
              {ENDPOINTS.map((e, i) => (
                <Card key={i} className="p-4 flex items-center gap-4">
                  <Badge variant={METHOD_COLOR[e.method]}>{e.method}</Badge>
                  <code className="font-mono text-body-sm flex-1">{e.path}</code>
                  <span className="text-caption text-ink-500 hidden md:block flex-1">{e.desc}</span>
                  <Badge variant="neutral">{e.auth}</Badge>
                  <Button variant="ghost" size="sm" iconOnly leadingIcon={<Copy className="w-4 h-4" />} aria-label="Copier" />
                </Card>
              ))}
            </div>
          </SectionCard>
        )}

        {tab === 'auth' && (
          <SectionCard title="Authentification" description="OAuth 2.0 + JWT Bearer">
            <div className="flex flex-col gap-stack">
              <Card className="p-4 flex items-start gap-3">
                <Key className="w-5 h-5 text-primary-600 mt-1" />
                <div>
                  <div className="font-semibold mb-1">JWT Bearer Token</div>
                  <p className="text-body-sm text-ink-600">Inclure <code className="px-1 py-0.5 bg-ink-100 rounded">Authorization: Bearer &lt;token&gt;</code> dans chaque requête.</p>
                </div>
              </Card>
              <Card className="p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-success-fg mt-1" />
                <div>
                  <div className="font-semibold mb-1">Scopes par rôle</div>
                  <p className="text-body-sm text-ink-600">Apprenant · Coach · Manager · Admin. Les endpoints vérifient le scope au niveau du middleware.</p>
                </div>
              </Card>
            </div>
          </SectionCard>
        )}

        {tab === 'rate-limits' && (
          <SectionCard title="Rate limits" description="Limites par minute selon le plan">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-xs">
              <Card className="p-4 text-center">
                <Zap className="w-6 h-6 text-info-fg mx-auto mb-2" />
                <div className="text-h3 font-bold">60 / min</div>
                <div className="text-caption text-ink-500">Plan Découverte</div>
              </Card>
              <Card className="p-4 text-center">
                <Zap className="w-6 h-6 text-secondary-600 mx-auto mb-2" />
                <div className="text-h3 font-bold">600 / min</div>
                <div className="text-caption text-ink-500">Plan Premium</div>
              </Card>
              <Card className="p-4 text-center">
                <Zap className="w-6 h-6 text-success-fg mx-auto mb-2" />
                <div className="text-h3 font-bold">Illimité</div>
                <div className="text-caption text-ink-500">Plan Enterprise</div>
              </Card>
            </div>
          </SectionCard>
        )}

        {tab === 'examples' && (
          <SectionCard title="Exemples" description="Curl, JavaScript, Python">
            <Card className="p-4 bg-ink-900 text-ink-100 font-mono text-caption rounded-md overflow-x-auto">
              <pre>{`curl -X GET https://api.tls.io/v1/passeport/me \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`}</pre>
            </Card>
          </SectionCard>
        )}
      </div>
    </div>
  );
};

export default ApiDocs;
