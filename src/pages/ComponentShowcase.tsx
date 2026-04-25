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
  MetaItem,
  ActivityItem,
  IconFeatureCard,
  UserInfo,
} from '../components';

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
    </div>
  );
};
