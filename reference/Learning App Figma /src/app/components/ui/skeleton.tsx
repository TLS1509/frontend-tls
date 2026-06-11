import { motion } from 'motion/react';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  count?: number;
  className?: string;
}

export function Skeleton({
  width = '100%',
  height = '20px',
  borderRadius = 'var(--radius-md)',
  variant = 'rectangular',
  count = 1,
  className = '',
}: SkeletonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return { borderRadius: '50%', width: height };
      case 'text':
        return { height: '1em', borderRadius: 'var(--radius-sm)' };
      default:
        return { borderRadius };
    }
  };

  const skeletons = Array.from({ length: count }, (_, i) => (
    <motion.div
      key={i}
      animate={{
        background: [
          'var(--neutral-200)',
          'var(--neutral-100)',
          'var(--neutral-200)',
        ],
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
      style={{
        width,
        height,
        marginBottom: count > 1 && i < count - 1 ? '8px' : 0,
        ...getVariantStyles(),
      }}
    />
  ));

  return <>{skeletons}</>;
}

// Pre-built skeleton components for common layouts
export function CardSkeleton() {
  return (
    <div 
      className="p-6 rounded-2xl"
      style={{
        background: 'var(--glass-white)',
        border: '1px solid var(--glass-border)',
      }}
    >
      <Skeleton width="60px" height="60px" variant="circular" />
      <div className="mt-4">
        <Skeleton width="80%" height="24px" />
        <div className="mt-2">
          <Skeleton width="60%" height="16px" />
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }, (_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton width="48px" height="48px" variant="circular" />
          <div className="flex-1">
            <Skeleton width="70%" height="20px" />
            <div className="mt-2">
              <Skeleton width="40%" height="16px" />
            </div>
          </div>
          <Skeleton width="80px" height="32px" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }, (_, i) => (
          <Skeleton key={i} height="20px" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }, (_, j) => (
            <Skeleton key={j} height="40px" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton width="200px" height="40px" />
        <Skeleton width="120px" height="40px" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton width="100%" height="300px" borderRadius="var(--radius-2xl)" />
        <Skeleton width="100%" height="300px" borderRadius="var(--radius-2xl)" />
      </div>

      {/* Table */}
      <div 
        className="p-6 rounded-2xl"
        style={{
          background: 'var(--glass-white)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <TableSkeleton rows={5} columns={4} />
      </div>
    </div>
  );
}

export function CourseSkeleton() {
  return (
    <div className="p-8 space-y-8">
      {/* Course Header */}
      <div className="space-y-4">
        <Skeleton width="60%" height="48px" />
        <Skeleton width="80%" height="20px" count={2} />
      </div>

      {/* Video Player */}
      <Skeleton width="100%" height="400px" borderRadius="var(--radius-2xl)" />

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton height="24px" count={8} />
        </div>
        <div>
          <ListSkeleton items={6} />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="p-8 space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <Skeleton width="120px" height="120px" variant="circular" />
        <div className="flex-1 space-y-2">
          <Skeleton width="250px" height="32px" />
          <Skeleton width="180px" height="20px" />
          <Skeleton width="200px" height="20px" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <Skeleton width="200px" height="28px" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} height="120px" borderRadius="var(--radius-xl)" />
          ))}
        </div>
      </div>
    </div>
  );
}
