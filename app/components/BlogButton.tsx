'use client';

import { useRef, useState, type AnchorHTMLAttributes, type CSSProperties, type MouseEvent, type TouchEvent } from 'react';

interface BlogButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label?: string;
}

interface EyeCoords {
  x: number;
  y: number;
}

export default function BlogButton({ label = 'Blog', className = '', onMouseMove, onTouchMove, onTouchStart, onTouchEnd, onTouchCancel, ...rest }: BlogButtonProps) {
  const eyesRef = useRef<HTMLSpanElement>(null);
  const [eyeCoords, setEyeCoords] = useState<EyeCoords>({ x: 0, y: 0 });
  const [isTouchActive, setIsTouchActive] = useState(false);

  const handleEyeMovement = (event: MouseEvent<HTMLAnchorElement> | TouchEvent<HTMLAnchorElement>) => {
    const point = 'touches' in event ? event.touches[0] : event;
    const eyesRect = eyesRef.current?.getBoundingClientRect();

    if (!eyesRect) return;

    const center = {
      x: eyesRect.left + eyesRect.width / 2,
      y: eyesRect.top + eyesRect.height / 2,
    };

    const dx = point.clientX - center.x;
    const dy = point.clientY - center.y;
    const angle = Math.atan2(-dy, dx) + Math.PI / 2;
    const distance = Math.hypot(dx, dy);
    const visionRangeX = 180;
    const visionRangeY = 75;

    setEyeCoords({
      x: (Math.sin(angle) * distance) / visionRangeX,
      y: (Math.cos(angle) * distance) / visionRangeY,
    });
  };

  const pupilStyle: CSSProperties = {
    transform: `translate(${-50 + eyeCoords.x * 50}%, ${-50 + eyeCoords.y * 50}%)`,
  };

  return (
    <a
      {...rest}
      className={`blog-button inline-flex${isTouchActive ? ' blog-button--touch-active' : ''} ${className}`.trim()}
      onMouseMove={(event) => {
        handleEyeMovement(event);
        onMouseMove?.(event);
      }}
      onTouchMove={(event) => {
        handleEyeMovement(event);
        onTouchMove?.(event);
      }}
      onTouchStart={(event) => {
        setIsTouchActive(true);
        onTouchStart?.(event);
      }}
      onTouchEnd={(event) => {
        setIsTouchActive(false);
        onTouchEnd?.(event);
      }}
      onTouchCancel={(event) => {
        setIsTouchActive(false);
        onTouchCancel?.(event);
      }}
    >
      <span className="blog-button__eyes" ref={eyesRef}>
        <span className="blog-button__eye">
          <span className="blog-button__pupil" style={pupilStyle} />
        </span>
        <span className="blog-button__eye">
          <span className="blog-button__pupil" style={pupilStyle} />
        </span>
      </span>
      <span className="blog-button__cover">
        <span className="blog-button__label" style={{ fontFamily: 'var(--font-jetbrains)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
          {label}
        </span>
      </span>
    </a>
  );
}
