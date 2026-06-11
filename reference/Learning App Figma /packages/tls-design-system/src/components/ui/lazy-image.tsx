import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export function LazyImage({ src, alt, className = '', style = {} }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer pour détecter quand l'image entre dans le viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Stop observing une fois visible
        }
      },
      { 
        rootMargin: '200px', // Commence à charger 200px avant d'être visible
        threshold: 0.01 
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {/* Placeholder shimmer pendant le chargement */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0"
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
      )}

      {/* Image réelle chargée uniquement quand visible */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={className}
          style={{
            ...style,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
