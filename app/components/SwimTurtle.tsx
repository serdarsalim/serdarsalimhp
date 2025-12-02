interface SwimTurtleProps {
  className?: string;
}

export default function SwimTurtle({ className = '' }: SwimTurtleProps) {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Back left flipper */}
      <ellipse cx="75" cy="55" rx="12" ry="6" fill="#4a7c2c" transform="rotate(35 75 55)" />

      {/* Back right flipper */}
      <ellipse cx="75" cy="35" rx="12" ry="6" fill="#4a7c2c" transform="rotate(-35 75 35)" />

      {/* Shell - darker border */}
      <ellipse cx="60" cy="45" rx="30" ry="24" fill="#2d5016" />

      {/* Shell - lighter center */}
      <ellipse cx="60" cy="45" rx="24" ry="19" fill="#5a8a3a" />

      {/* Shell hexagon pattern */}
      <circle cx="60" cy="38" r="6" fill="#3d6625" />
      <circle cx="52" cy="45" r="5" fill="#3d6625" />
      <circle cx="68" cy="45" r="5" fill="#3d6625" />
      <circle cx="56" cy="52" r="4" fill="#3d6625" />
      <circle cx="64" cy="52" r="4" fill="#3d6625" />

      {/* Front left flipper */}
      <ellipse cx="38" cy="55" rx="14" ry="7" fill="#4a7c2c" transform="rotate(-20 38 55)" />

      {/* Front right flipper */}
      <ellipse cx="38" cy="35" rx="14" ry="7" fill="#4a7c2c" transform="rotate(20 38 35)" />

      {/* Head */}
      <ellipse cx="25" cy="45" rx="12" ry="10" fill="#5a8a3a" />
      <circle cx="25" cy="45" r="11" fill="#5a8a3a" />

      {/* Eye */}
      <circle cx="22" cy="43" r="2.5" fill="#1a1a1a" />
      <circle cx="22.8" cy="42.5" r="1" fill="white" />

      {/* Tail - small triangle */}
      <path d="M 88 45 L 95 42 L 95 48 Z" fill="#5a8a3a" />
    </svg>
  );
}
