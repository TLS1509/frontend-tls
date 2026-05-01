import React from 'react';
import {
  Button,
  Card,
  Badge,
  Avatar,
  ProgressBar,
  StatCard,
  ActionCard,
  GlassCard,
  SurfaceCard,
  ParcoursCard,
  SectionTitle,
  MetaPill,
  MetaPillGroup,
  MetaItem,
  ActivityItem,
  IconFeatureCard,
  UserInfo,
  CardGrid,
  InlineProgress,
  ToneAwareCard,
} from '../components';
import {
  BookOpen, Clock3, Flame, Trophy, Users, TrendingUp,
  Sparkles, CheckCircle2, Award, Zap, Star,
} from 'lucide-react';

export const ComponentShowcase: React.FC = () => {
  return (
    <div style={{ padding: 'var(--s-8)', backgroundColor: 'var(--bg)' }}>
      {/* Header */}
      <SectionTitle
        title="Component Library"
        subtitle="The Learning Society Design System - 16 React Components"
      />

      {/* Button Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Button</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--s-4)', marginBottom: 'var(--s-6)' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" fullWidth>Full Width</Button>
        </div>
      </Card>

      {/* Card Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Card</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--s-4)' }}>
          <Card variant="standard">
            <p style={{ color: 'var(--text-muted)' }}>Standard Card</p>
          </Card>
          <Card variant="elevated">
            <p style={{ color: 'var(--text-muted)' }}>Elevated Card</p>
          </Card>
          <Card variant="glass">
            <p style={{ color: 'var(--text-muted)' }}>Glass Card</p>
          </Card>
        </div>
      </Card>

      {/* Badge Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Badge</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-3)', marginBottom: 'var(--s-4)' }}>
          <Badge text="Primary" variant="primary" />
          <Badge text="Secondary" variant="secondary" />
          <Badge text="Accent" variant="accent" />
          <Badge text="Success" variant="success" />
          <Badge text="Warning" variant="warning" />
          <Badge text="Danger" variant="danger" />
          <Badge text="Info" variant="info" />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-3)' }}>
          <Badge text="Small" variant="primary" size="sm" />
          <Badge text="Medium" variant="primary" size="md" />
          <Badge text="Large" variant="primary" size="lg" />
        </div>
      </Card>

      {/* Avatar Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Avatar</h2>
        <div style={{ display: 'flex', gap: 'var(--s-4)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Avatar name="John Doe" size="sm" />
          <Avatar name="Jane Smith" size="md" />
          <Avatar name="Bob Wilson" size="lg" />
          <Avatar name="Alice Johnson" size="xl" />
        </div>
      </Card>

      {/* ProgressBar Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Progress Bar</h2>
        <div style={{ display: 'grid', gap: 'var(--s-6)' }}>
          <ProgressBar percentage={25} variant="primary" />
          <ProgressBar percentage={50} variant="secondary" />
          <ProgressBar percentage={75} variant="success" />
          <ProgressBar percentage={100} variant="warning" />
        </div>
      </Card>

      {/* StatCard Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Stat Card</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--s-4)' }}>
          <StatCard title="Total Users" value="1,234" unit="users" trend={12} />
          <StatCard title="Revenue" value="$45,680" unit="USD" trend={-3} />
          <StatCard title="Completion Rate" value="87" unit="%" trend={5} />
        </div>
      </Card>

      {/* ActionCard Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Action Card</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--s-4)' }}>
          <ActionCard
            icon="📚"
            title="Learn Something New"
            description="Explore our extensive library of learning paths"
            action={<Button size="sm" variant="primary">Start Now</Button>}
          />
          <ActionCard
            icon="🎯"
            title="Track Progress"
            description="Monitor your learning journey and achievements"
            action={<Button size="sm" variant="secondary">View Progress</Button>}
          />
        </div>
      </Card>

      {/* GlassCard Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Glass Card</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--s-4)' }}>
          <GlassCard variant="light">
            <p style={{ color: 'var(--text)', margin: 0 }}>Light Glass</p>
          </GlassCard>
          <GlassCard variant="brand">
            <p style={{ color: 'var(--text)', margin: 0 }}>Brand Glass</p>
          </GlassCard>
        </div>
      </Card>

      {/* SurfaceCard Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Surface Card</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--s-4)' }}>
          <SurfaceCard variant="muted">
            <p style={{ color: 'var(--text)', margin: 0 }}>Muted Surface</p>
          </SurfaceCard>
          <SurfaceCard variant="sunken">
            <p style={{ color: 'var(--text)', margin: 0 }}>Sunken Surface</p>
          </SurfaceCard>
        </div>
      </Card>

      {/* ParcoursCard Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Parcours Card</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--s-4)' }}>
          <ParcoursCard
            title="React Fundamentals"
            description="Learn the basics of React"
            progress={0}
            lessonCount={12}
            status="not-started"
          />
          <ParcoursCard
            title="Advanced Patterns"
            description="Master advanced React patterns"
            progress={45}
            lessonCount={18}
            status="in-progress"
          />
          <ParcoursCard
            title="Performance Optimization"
            description="Optimize your React applications"
            progress={100}
            lessonCount={15}
            status="completed"
          />
        </div>
      </Card>

      {/* MetaPill Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Meta Pill</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-3)' }}>
          <MetaPill text="JavaScript" icon="⚡" />
          <MetaPill text="React 18" icon="⚛️" />
          <MetaPill text="TypeScript" icon="📘" />
          <MetaPill text="Design System" icon="🎨" />
        </div>
      </Card>

      {/* MetaItem Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Meta Item</h2>
        <div>
          <MetaItem label="Status" value="Active" />
          <MetaItem label="Created" value="Jan 15, 2024" />
          <MetaItem label="Modified" value="Apr 20, 2026" />
          <MetaItem label="Owner" value="Team Lead" />
        </div>
      </Card>

      {/* ActivityItem Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Activity Item</h2>
        <div>
          <ActivityItem
            icon="✓"
            title="Completed Module"
            description="React Fundamentals - 12 lessons"
            timestamp="2 hours ago"
          />
          <ActivityItem
            icon="📝"
            title="Started Learning Path"
            description="Advanced Patterns - New course"
            timestamp="1 day ago"
          />
          <ActivityItem
            icon="🏆"
            title="Earned Badge"
            description="React Master - 100% completion"
            timestamp="1 week ago"
          />
        </div>
      </Card>

      {/* IconFeatureCard Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Icon Feature Card</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--s-6)' }}>
          <IconFeatureCard
            icon="📚"
            title="Comprehensive Content"
            description="Access curated learning materials designed by experts"
          />
          <IconFeatureCard
            icon="🎯"
            title="Structured Learning"
            description="Follow guided learning paths tailored to your goals"
          />
          <IconFeatureCard
            icon="📊"
            title="Track Progress"
            description="Monitor your learning journey with detailed analytics"
          />
          <IconFeatureCard
            icon="🤝"
            title="Community Support"
            description="Collaborate with peers and get help from mentors"
          />
        </div>
      </Card>

      {/* UserInfo Component */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>User Info</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--s-4)' }}>
          <UserInfo
            name="Sarah Johnson"
            role="Learning Coordinator"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
          />
          <UserInfo
            name="Michael Chen"
            role="Content Creator"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
          />
          <UserInfo
            name="Emma Davis"
            role="Course Instructor"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
          />
        </div>
      </Card>

      {/* Design Tokens Reference */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Design Tokens</h2>
        
        <div style={{ marginBottom: 'var(--s-6)' }}>
          <h3 style={{ fontSize: 'var(--t-h4)', marginBottom: 'var(--s-3)' }}>Brand Colors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 'var(--s-4)' }}>
            <div style={{ backgroundColor: 'var(--tls-primary-500)', height: '60px', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'flex-end', padding: 'var(--s-2)', color: 'var(--tls-ink-0)', fontSize: 'var(--t-caption)', fontWeight: '600' }}>Primary</div>
            <div style={{ backgroundColor: 'var(--tls-orange-500)', height: '60px', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'flex-end', padding: 'var(--s-2)', color: 'var(--tls-ink-0)', fontSize: 'var(--t-caption)', fontWeight: '600' }}>Secondary</div>
            <div style={{ backgroundColor: 'var(--tls-yellow-400)', height: '60px', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'flex-end', padding: 'var(--s-2)', color: 'var(--tls-ink-900)', fontSize: 'var(--t-caption)', fontWeight: '600' }}>Accent</div>
          </div>
        </div>

        <div style={{ marginBottom: 'var(--s-6)' }}>
          <h3 style={{ fontSize: 'var(--t-h4)', marginBottom: 'var(--s-3)' }}>Spacing Scale</h3>
          <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {[1, 2, 3, 4, 5, 6, 8].map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--s-2)' }}>
                <div style={{ backgroundColor: 'var(--tls-primary-100)', width: `calc(${s} * 4px)`, height: `calc(${s} * 4px)`, borderRadius: 'var(--r-xs)' }} />
                <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>s-{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 'var(--t-h4)', marginBottom: 'var(--s-3)' }}>Typography</h3>
          <p style={{ fontSize: 'var(--t-display-lg)', fontFamily: 'var(--font-display)' }}>Display Large</p>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <p style={{ fontSize: 'var(--t-body-lg)' }}>Body Large</p>
          <p>Body Default</p>
          <p style={{ fontSize: 'var(--t-body-sm)' }}>Body Small</p>
          <p style={{ fontSize: 'var(--t-caption)' }}>Caption</p>
          <p style={{ fontSize: 'var(--t-micro)' }}>Micro</p>
        </div>
      </Card>

      {/* Design Tokens: Spacing */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Spacing Tokens</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--s-4)' }}>
          Base 4px system: --s-1 (4px) through --s-32 (128px). Intermediate values: --s-1-5, --s-2-5, --s-3-5, --s-4-5, --s-5-5, --s-7
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 'var(--s-4)' }}>
          {['1', '2', '3', '4', '5', '6', '8', '12'].map((size) => (
            <div key={size}>
              <div style={{ height: `var(--s-${size})`, background: 'var(--tls-primary-200)', borderRadius: 'var(--r-sm)', marginBottom: 'var(--s-2)' }} />
              <code style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)' }}>--s-{size}</code>
            </div>
          ))}
        </div>
      </Card>

      {/* Design Tokens: Colors */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Color Tokens</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--s-4)' }}>
          {[
            { name: 'Primary', color: 'var(--tls-primary-500)' },
            { name: 'Orange', color: 'var(--tls-orange-500)' },
            { name: 'Yellow', color: 'var(--tls-yellow-500)' },
            { name: 'Success', color: 'var(--tls-success-base)' },
            { name: 'Warning', color: 'var(--tls-warning-base)' },
            { name: 'Danger', color: 'var(--tls-danger-base)' },
          ].map((c) => (
            <div key={c.name}>
              <div style={{ height: '60px', background: c.color, borderRadius: 'var(--r-md)', marginBottom: 'var(--s-2)' }} />
              <code style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)' }}>{c.name}</code>
            </div>
          ))}
        </div>
      </Card>

      {/* Layout Patterns */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Layout Patterns</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--s-4)' }}>
          <div style={{ border: '1px dashed var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--s-4)' }}>
            <code style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>container-narrow</code>
            <p style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', margin: 'var(--s-2) 0 0' }}>600px</p>
          </div>
          <div style={{ border: '1px dashed var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--s-4)' }}>
            <code style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>container-default</code>
            <p style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', margin: 'var(--s-2) 0 0' }}>900px</p>
          </div>
          <div style={{ border: '1px dashed var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--s-4)' }}>
            <code style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>container-wide</code>
            <p style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', margin: 'var(--s-2) 0 0' }}>1200px</p>
          </div>
        </div>
      </Card>

      {/* Button Padding Tokens */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Button Padding Variants</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--s-4)' }}>
          <Button size="sm" variant="primary">--btn-padding-xs</Button>
          <Button size="sm" variant="primary">--btn-padding-sm</Button>
          <Button variant="primary">--btn-padding-md</Button>
          <Button size="lg" variant="primary">--btn-padding-lg</Button>
        </div>
      </Card>

      {/* Text & State Utilities */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Text & State Utilities</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--s-4)' }}>
          <div style={{ background: 'var(--surface-muted)', padding: 'var(--s-4)', borderRadius: 'var(--r-md)' }}>
            <p style={{ color: 'var(--text)' }} className="text-semibold">Font: Semibold</p>
            <p style={{ color: 'var(--text)' }} className="text-muted">Color: Muted</p>
            <p style={{ color: 'var(--text)' }} className="text-truncate">Truncate: Very long text that should be cut...</p>
          </div>
          <div style={{ background: 'var(--tls-success-light)', padding: 'var(--s-4)', borderRadius: 'var(--r-md)', borderLeft: '4px solid var(--tls-success-base)' }}>
            <p style={{ color: 'var(--tls-success-base)', fontWeight: 600 }}>Success State</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--t-body-sm)' }}>Positive feedback indicator</p>
          </div>
          <div style={{ background: 'var(--tls-danger-light)', padding: 'var(--s-4)', borderRadius: 'var(--r-md)', borderLeft: '4px solid var(--tls-danger-base)' }}>
            <p style={{ color: 'var(--tls-danger-base)', fontWeight: 600 }}>Error State</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--t-body-sm)' }}>Error feedback indicator</p>
          </div>
        </div>
      </Card>

      {/* Responsive Breakpoints */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-4)' }}>Responsive Breakpoints</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-3)' }}>
          {[
            { name: 'Mobile', bp: '375px' },
            { name: 'Tablet', bp: '768px' },
            { name: 'Laptop', bp: '1024px' },
            { name: 'Desktop', bp: '1280px' },
            { name: 'Wide', bp: '1920px' },
          ].map((b) => (
            <Badge key={b.name} text={`${b.name}: ${b.bp}`} variant="primary" size="md" />
          ))}
        </div>
      </Card>

      {/* ─────────────────────────────────────────────────────────────────────
          TLS DESIGN PATTERNS — new sections
      ───────────────────────────────────────────────────────────────────── */}

      {/* KPI Pattern */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-2)' }}>KPI Pattern <code style={{ fontSize: 'var(--t-caption)', background: 'var(--surface-muted)', padding: '2px 8px', borderRadius: 4 }}>tls-kpi + tls-kpi-icon</code></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--t-caption)', marginBottom: 'var(--s-5)' }}>
          Utilisé sur Dashboard, Journal, Coaching, Leaderboard, Collaboration, Settings. Icon container 44×44 + grand chiffre + label.
        </p>
        <section className="tls-kpi-row">
          <div className="tls-kpi">
            <div className="tls-kpi-icon" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)', marginBottom: 'var(--s-2)' }}>
              <BookOpen size={20} />
            </div>
            <strong style={{ color: 'var(--tls-primary-700)' }}>12</strong>
            <span>Cours terminés</span>
          </div>
          <div className="tls-kpi">
            <div className="tls-kpi-icon" style={{ background: 'rgba(237,132,58,0.10)', color: 'var(--tls-orange-600)', marginBottom: 'var(--s-2)' }}>
              <Flame size={20} />
            </div>
            <strong style={{ color: 'var(--tls-orange-600)' }}>7j</strong>
            <span>Série actuelle</span>
          </div>
          <div className="tls-kpi">
            <div className="tls-kpi-icon" style={{ background: 'rgba(234,192,74,0.12)', color: 'var(--tls-yellow-600)', marginBottom: 'var(--s-2)' }}>
              <Trophy size={20} />
            </div>
            <strong style={{ color: 'var(--tls-yellow-600)' }}>2 450</strong>
            <span>Points XP</span>
          </div>
        </section>
      </Card>

      {/* Filter Pills */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-2)' }}>Filter Pills <code style={{ fontSize: 'var(--t-caption)', background: 'var(--surface-muted)', padding: '2px 8px', borderRadius: 4 }}>.tls-filter-pill</code></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--t-caption)', marginBottom: 'var(--s-5)' }}>
          Pills de filtrage CSS-only avec focus ring. État actif via <code>aria-selected="true"</code> ou classe <code>--active</code>.
        </p>
        <div role="tablist" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2)' }}>
          <button type="button" role="tab" aria-selected={true}  className="tls-filter-pill tls-filter-pill--active"><Sparkles size={13} /> Tous</button>
          <button type="button" role="tab" aria-selected={false} className="tls-filter-pill"><BookOpen size={13} /> Formations</button>
          <button type="button" role="tab" aria-selected={false} className="tls-filter-pill"><Users size={13} /> Équipe</button>
          <button type="button" role="tab" aria-selected={false} className="tls-filter-pill"><Trophy size={13} /> Badges</button>
          <button type="button" role="tab" aria-selected={false} className="tls-filter-pill"><Flame size={13} /> En cours</button>
        </div>
      </Card>

      {/* MetaPill & MetaPillGroup */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-2)' }}>MetaPill &amp; MetaPillGroup</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--t-caption)', marginBottom: 'var(--s-5)' }}>
          Labels avec icône et système de tones. <code>MetaPillGroup</code> pour les collections.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-3)' }}>
            <MetaPill text="Default"  icon={<Star size={14} />} />
            <MetaPill text="Primary"  icon={<BookOpen size={14} />} tone="primary" />
            <MetaPill text="Warm"     icon={<Flame size={14} />}    tone="warm" />
            <MetaPill text="Sun"      icon={<Zap size={14} />}      tone="sun" />
            <MetaPill text="Brand"    icon={<Award size={14} />}    tone="brand" />
          </div>
          <MetaPillGroup
            items={[
              { icon: <Users size={14} />,    text: '24 apprenants', tone: 'primary' },
              { icon: <Clock3 size={14} />,   text: '4 semaines',    tone: 'warm' },
              { icon: <Trophy size={14} />,   text: 'Niveau expert', tone: 'sun' },
              { icon: <CheckCircle2 size={14} />, text: 'Certifié',  tone: 'brand' },
            ]}
            gap="sm"
          />
        </div>
      </Card>

      {/* CardGrid */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-2)' }}>CardGrid <code style={{ fontSize: 'var(--t-caption)', background: 'var(--surface-muted)', padding: '2px 8px', borderRadius: 4 }}>layout compact|default|feature|autoFit</code></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--t-caption)', marginBottom: 'var(--s-5)' }}>
          Grid responsive avec breakpoints automatiques. Remplace les grids ad-hoc répétés dans chaque page.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
          <div>
            <p style={{ fontSize: 'var(--t-micro)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 var(--s-2)' }}>layout="compact" (2 col)</p>
            <CardGrid layout="compact" gapSize="sm">
              {['Card A', 'Card B'].map((t) => (
                <div key={t} style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: 'var(--s-4)', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>{t}</div>
              ))}
            </CardGrid>
          </div>
          <div>
            <p style={{ fontSize: 'var(--t-micro)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 var(--s-2)' }}>layout="default" (3 col)</p>
            <CardGrid layout="default" gapSize="sm">
              {['Card 1', 'Card 2', 'Card 3'].map((t) => (
                <div key={t} style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: 'var(--s-4)', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>{t}</div>
              ))}
            </CardGrid>
          </div>
          <div>
            <p style={{ fontSize: 'var(--t-micro)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 var(--s-2)' }}>layout="feature" (4 col)</p>
            <CardGrid layout="feature" gapSize="sm">
              {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((t) => (
                <div key={t} style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: 'var(--s-4)', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>{t}</div>
              ))}
            </CardGrid>
          </div>
        </div>
      </Card>

      {/* InlineProgress */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-2)' }}>InlineProgress <code style={{ fontSize: 'var(--t-caption)', background: 'var(--surface-muted)', padding: '2px 8px', borderRadius: 4 }}>tone primary|warm|sun</code></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--t-caption)', marginBottom: 'var(--s-5)' }}>
          Barre de progression embarquée dans les cartes, étapes et listes. Companion de <code>ProgressBar</code> pour les contextes inline.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
          {[
            { value: 75, tone: 'primary' as const, label: 'Prompt Engineering' },
            { value: 55, tone: 'warm' as const,    label: 'Leadership' },
            { value: 88, tone: 'sun' as const,     label: 'IA Générative' },
          ].map(({ value, tone, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
              <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text)', fontWeight: 600, minWidth: 160 }}>{label}</span>
              <div style={{ flex: 1 }}>
                <InlineProgress value={value} tone={tone} showLabel={true} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ToneAwareCard */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-2)' }}>ToneAwareCard <code style={{ fontSize: 'var(--t-caption)', background: 'var(--surface-muted)', padding: '2px 8px', borderRadius: 4 }}>tone primary|warm|sun</code></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--t-caption)', marginBottom: 'var(--s-5)' }}>
          Wrapper qui injecte des CSS variables <code>--tone-bg/border/text/accent</code>. Les enfants utilisent ces variables pour une cohérence couleur sans répétition.
        </p>
        <CardGrid layout="default" gapSize="md">
          {([
            { tone: 'primary' as const, label: 'Primary', icon: <BookOpen size={18} />, text: 'Parcours IA Générative' },
            { tone: 'warm' as const,    label: 'Warm',    icon: <Flame size={18} />,    text: 'Série en cours : 7j' },
            { tone: 'sun' as const,     label: 'Sun',     icon: <Trophy size={18} />,   text: 'Badge débloqué' },
          ]).map(({ tone, label, icon, text }) => (
            <ToneAwareCard key={tone} tone={tone}>
              <div style={{
                padding: 'var(--s-5)', borderRadius: 'var(--r-xl)',
                background: 'var(--tone-bg)', border: '1px solid var(--tone-border)',
                display: 'flex', flexDirection: 'column', gap: 'var(--s-3)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', color: 'var(--tone-accent)' }}>
                  {icon}
                  <span style={{ fontSize: 'var(--t-micro)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                </div>
                <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--tone-text)' }}>{text}</p>
                <Badge variant={tone === 'primary' ? 'brand' : tone === 'warm' ? 'warm' : 'sun'}>
                  <TrendingUp size={11} /> Actif
                </Badge>
              </div>
            </ToneAwareCard>
          ))}
        </CardGrid>
      </Card>

      {/* Avatar Stack Pattern */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-2)' }}>Avatar Stack Pattern</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--t-caption)', marginBottom: 'var(--s-5)' }}>
          Cercles initiales superposés avec palette de 4 couleurs. Utilisé dans Collaboration (membres équipe) et Messages (avatars threads).
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
          {[
            ['Alice J.', 'Bob S.', 'Carol D.'],
            ['David L.', 'Emma W.', 'Frank M.', 'Grace B.'],
          ].map((members, groupIdx) => {
            const palette = [
              { bg: 'var(--tls-primary-100)', color: 'var(--tls-primary-700)' },
              { bg: 'rgba(237,132,58,0.15)',  color: 'var(--tls-orange-700)' },
              { bg: 'rgba(234,192,74,0.2)',   color: 'var(--tls-yellow-700)' },
              { bg: 'rgba(74,140,110,0.12)',  color: 'var(--tls-success-fg)' },
            ];
            return (
              <div key={groupIdx} style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
                <div style={{ display: 'flex' }}>
                  {members.map((name, i) => {
                    const pal = palette[i % palette.length];
                    const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase();
                    return (
                      <div key={name} title={name} style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: pal.bg, color: pal.color,
                        border: '2px solid var(--surface)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: 800,
                        marginLeft: i > 0 ? -10 : 0,
                        position: 'relative', zIndex: members.length - i,
                      }}>
                        {initials}
                      </div>
                    );
                  })}
                </div>
                <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                  {members.length} membres
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Glass Hero Pattern */}
      <Card variant="elevated" padding={true} style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ fontSize: 'var(--t-h3)', marginBottom: 'var(--s-2)' }}>Glass Hero Pattern <code style={{ fontSize: 'var(--t-caption)', background: 'var(--surface-muted)', padding: '2px 8px', borderRadius: 4 }}>.tls-editorial-hero</code></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--t-caption)', marginBottom: 'var(--s-5)' }}>
          Hero section glassmorphique cohérente sur toutes les pages. Avec eyebrow, h1 800w, subtitle et badge de comptage dynamique.
        </p>
        <section className="tls-editorial-hero" style={{ marginBottom: 0 }}>
          <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Design System</span>
          <h1>Glass Hero Example</h1>
          <p className="tls-editorial-summary">
            Ceci est un exemple de hero glassmorphique avec badge de comptage.
            <span style={{ marginLeft: 'var(--s-2)', display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)', padding: '2px 10px', borderRadius: 'var(--r-pill)', background: 'var(--tls-primary-600)', color: '#fff', fontSize: 'var(--t-micro)', fontWeight: 700 }}>
              3 actifs
            </span>
          </p>
        </section>
      </Card>
    </div>
  );
};
