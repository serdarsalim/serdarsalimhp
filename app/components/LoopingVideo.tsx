'use client';

import { useState, useEffect } from 'react';

interface LoopingVideoProps {
  src: string;
  className?: string;
}

export default function LoopingVideo({ src, className = '' }: LoopingVideoProps) {
  const [showReverse, setShowReverse] = useState(false);

  useEffect(() => {
    // Get video duration first
    const video = document.createElement('video');
    video.src = src;

    video.addEventListener('loadedmetadata', () => {
      const duration = video.duration * 1000; // Convert to ms

      // Toggle between normal and reverse every video duration
      const interval = setInterval(() => {
        setShowReverse(prev => !prev);
      }, duration);

      return () => clearInterval(interval);
    });

    video.load();
  }, [src]);

  return (
    <div className={className}>
      <video
        key="forward"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${showReverse ? 'opacity-0' : 'opacity-100'}`}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <video
        key="reverse"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${showReverse ? 'opacity-100' : 'opacity-0'}`}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{ transform: 'scaleX(-1)' }}
      />
    </div>
  );
}
