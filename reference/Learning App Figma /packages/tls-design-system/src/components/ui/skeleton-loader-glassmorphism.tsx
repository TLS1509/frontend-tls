import { motion } from 'motion/react';

interface SkeletonLoaderProps {
  variant: 'card-grid' | 'card-timeline' | 'stats' | 'text';
  count?: number;
}

export function SkeletonLoaderGlassmorphism({ variant, count = 1 }: SkeletonLoaderProps) {
  const shimmerAnimation = {
    background: [
      'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
      'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
    ],
  };

  // Card Grid Skeleton (pour vue catégories)
  if (variant === 'card-grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
            }}
          >
            {/* Thumbnail skeleton */}
            <motion.div
              className="w-full h-48"
              animate={{
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
              }}
            />

            {/* Content skeleton */}
            <div className="p-6 space-y-3">
              {/* Badge skeleton */}
              <motion.div
                className="h-6 w-24 rounded-full"
                animate={{ opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
                }}
              />

              {/* Title skeleton */}
              <motion.div
                className="h-6 w-3/4 rounded-lg"
                animate={{ opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                style={{
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
                }}
              />

              {/* Description skeleton */}
              <div className="space-y-2">
                <motion.div
                  className="h-4 w-full rounded-lg"
                  animate={{ opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
                  }}
                />
                <motion.div
                  className="h-4 w-2/3 rounded-lg"
                  animate={{ opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
                  }}
                />
              </div>

              {/* Footer skeleton */}
              <div className="flex items-center justify-between pt-4">
                <motion.div
                  className="h-4 w-20 rounded-lg"
                  animate={{ opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
                  }}
                />
                <motion.div
                  className="h-8 w-8 rounded-lg"
                  animate={{ opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Timeline Skeleton (pour "Fil d'actualités")
  if (variant === 'card-timeline') {
    return (
      <div className="space-y-6">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
            }}
          >
            <div className="p-6 flex gap-6">
              {/* Thumbnail skeleton */}
              <motion.div
                className="w-48 h-32 rounded-2xl flex-shrink-0"
                animate={{ opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
                }}
              />

              {/* Content skeleton */}
              <div className="flex-1 space-y-3">
                {/* Meta skeleton */}
                <div className="flex items-center gap-3">
                  <motion.div
                    className="h-6 w-24 rounded-full"
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
                    }}
                  />
                  <motion.div
                    className="h-4 w-16 rounded-lg"
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                    style={{
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
                    }}
                  />
                </div>

                {/* Title skeleton */}
                <motion.div
                  className="h-6 w-3/4 rounded-lg"
                  animate={{ opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
                  }}
                />

                {/* Description skeleton */}
                <div className="space-y-2">
                  <motion.div
                    className="h-4 w-full rounded-lg"
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    style={{
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
                    }}
                  />
                  <motion.div
                    className="h-4 w-5/6 rounded-lg"
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    style={{
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
}
