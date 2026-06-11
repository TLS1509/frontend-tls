import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23e5e7eb"/%3E%3C/svg%3E'
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <img
          src={placeholder}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover blur-sm ${className}`}
          aria-hidden="true"
        />
      )}

      {/* Actual Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </div>
  );
}

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export function LazyLoadWrapper({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '50px'
}: LazyLoadWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : <div className="min-h-[200px]" />}
    </div>
  );
}
