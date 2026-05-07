import React from 'react';

export const BackgroundBlobs: React.FC<{ variant?: 'default' | 'subtle' }> = ({
  variant = 'default',
}) => {
  const blurClass = variant === 'subtle' ? 'blur-[60px] opacity-60' : 'blur-[80px] opacity-80';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className={`tls-blob tls-blob--1 ${blurClass}`} />
      <div className={`tls-blob tls-blob--2 ${blurClass}`} />
      <div className={`tls-blob tls-blob--3 ${blurClass}`} />
    </div>
  );
};

export default BackgroundBlobs;
