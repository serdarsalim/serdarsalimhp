'use client';

import { useEffect, useRef, useState } from 'react';

interface TransparentVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number; // How dark a pixel needs to be to become transparent (0-255)
}

export default function TransparentVideo({
  src,
  className = '',
  style = {},
  threshold = 50
}: TransparentVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;

    const handleLoadedMetadata = () => {
      // Set dimensions for display
      setDimensions({
        width: video.videoWidth,
        height: video.videoHeight
      });

      // Set canvas internal size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

    const processFrame = () => {
      if (video.videoWidth && video.videoHeight && !video.paused && !video.ended) {
        // Draw the video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Process each pixel
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // If the pixel is dark (close to black), make it transparent
          if (r < threshold && g < threshold && b < threshold) {
            data[i + 3] = 0; // Set alpha to 0 (fully transparent)
          }
        }

        // Put the processed image data back
        ctx.putImageData(imageData, 0, 0);
      }

      animationFrameId = requestAnimationFrame(processFrame);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', processFrame);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', processFrame);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [threshold]);

  return (
    <div ref={containerRef} className={className} style={style}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="absolute invisible"
        style={{ pointerEvents: 'none' }}
      />
      <canvas
        ref={canvasRef}
        className="block"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      />
    </div>
  );
}
