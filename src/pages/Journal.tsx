import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { HeroSection } from '../components/patterns/HeroSection';
import { CalendarDays, PenSquare, BookOpen, ArrowRight, Search, Sparkles, Clock3 } from 'lucide-react';


const entries = [
  { id: 'j1', title: 'Semaine 14 - leadership', excerpt: "J'ai identifié mes points de friction en délégation.", date: '14 avril 2026', type: 'Réflexion' },
  { id: 'j2', title: 'Feedback équipe', excerpt: 'Les retours ont mis en avant la clarté des attentes.', date: '12 avril 2026', type: 'Coaching' },
];

const KpiCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Card variant="feature" style={{ textAlign: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
      <p style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--tls-primary-500)', margin: 0 }}>
        {value}
      </p>
      <p style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', margin: 0 }}>
        {label}
      </p>
    </div>
  </Card>
);

interface EntryCardProps {
  entry: typeof entries[0];
  onNavigate: (id: string) => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onNavigate }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      variant="feature"
      style={{
        transition: 'all 0.15s',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? 'var(--shadow-lg)' : undefined,
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--s-4)' }}>
          <div>
            <h3 style={{ fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-2)' }}>
              {entry.title}
            </h3>
            <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: 'var(--s-1)' }}>
              <CalendarDays size={12} />
              {entry.date}
            </p>
          </div>
          <span
            style={{
              padding: 'var(--s-1) var(--s-3)',
              borderRadius: 'var(--r-pill)',
              background: entry.type === 'Coaching' ? 'var(--tls-orange-50)' : 'var(--tls-primary-50)',
              color: entry.type === 'Coaching' ? 'var(--tls-orange-600)' : 'var(--tls-primary-600)',
              fontSize: 'var(--t-caption)',
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {entry.type}
          </span>
        </div>

        {/* Content */}
        <p style={{ fontSize: 'var(--t-body)', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          {entry.excerpt}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--s-3)', paddingTop: 'var(--s-2)', borderTop: '1px solid var(--border)' }}>
          <Button variant="secondary" size="sm" leadingIcon={<BookOpen size={14} />} onClick={() => onNavigate(entry.id)}>
            Lire
          </Button>
          <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={14} />} onClick={() => onNavigate(entry.id)}>
            Continuer
          </Button>
        </div>
      </div>
    </Card>
  );
};

export const Journal: React.FC = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<string>('all');

  const filters = [
    { key: 'all', icon: Sparkles, label: 'Toutes' },
    { key: 'reflexion', icon: BookOpen, label: 'Réflexion' },
    { key: 'coaching', icon: Clock3, label: 'Coaching' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <HeroSection
        icon={Sparkles}
        title="Journal"
        description="Capitalisez vos apprentissages et suivez votre progression réflexive avec un espace de prise de notes structuré"
        gradient="primary"
      />

      {/* Content Section */}
      <div style={{ flex: 1, padding: 'var(--s-8)', maxWidth: 'var(--container-wide)', marginLeft: 'auto', marginRight: 'auto', width: '100%', boxSizing: 'border-box' }}>
        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--s-4)', marginBottom: 'var(--s-8)' }}>
          <KpiCard label="Entrées ce mois" value="12" />
          <KpiCard label="Thèmes actifs" value="4" />
          <KpiCard label="Régularité hebdo" value="78%" />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 'var(--s-3)', marginBottom: 'var(--s-8)', flexWrap: 'wrap' }}>
          <Button leadingIcon={<PenSquare size={16} />} onClick={() => navigate('/journal/new-entry')}>
            Écrire une nouvelle entrée
          </Button>
          <Button variant="secondary" onClick={() => navigate('/journal/free-entry')}>
            Entrée libre
          </Button>
        </div>

        {/* Toolbar */}
        <Card variant="feature" style={{ marginBottom: 'var(--s-6)' }}>
          <div style={{ display: 'flex', gap: 'var(--s-4)', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ flex: 1, minWidth: 'min(100%, 200px)', display: 'flex', alignItems: 'center', gap: 'var(--s-2)', padding: 'var(--s-3)', background: 'var(--surface-muted)', borderRadius: 'var(--r-md)', border: '1px solid transparent', transition: 'border-color 0.15s' }}>
              <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                type="search"
                placeholder="Rechercher une entrée…"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  fontSize: 'var(--t-body)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                }}
              />
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
              {filters.map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setFilterType(key)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--s-1)',
                    padding: 'var(--s-2) var(--s-3)',
                    borderRadius: 'var(--r-pill)',
                    border: filterType === key ? '2px solid var(--tls-primary-500)' : '1.5px solid var(--border)',
                    background: filterType === key ? 'var(--tls-primary-50)' : 'transparent',
                    color: filterType === key ? 'var(--tls-primary-600)' : 'var(--text-muted)',
                    fontSize: 'var(--t-caption)',
                    fontWeight: filterType === key ? 600 : 500,
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    if (filterType !== key) {
                      (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-muted)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filterType !== key) {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                    }
                  }}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Entries List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
          {entries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onNavigate={(id) => navigate(`/journal/detail/${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
