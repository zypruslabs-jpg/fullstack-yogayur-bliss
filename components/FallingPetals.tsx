'use client';

import { useEffect, useState } from 'react';

type Petal = {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
};

const EMOJIS = ['🌸', '🌺', '🍃', '🌼', '✿', '🌿', '💮', '🏵️'];

export default function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 8 + Math.random() * 8,
      size: 14 + Math.random() * 14,
      drift: (Math.random() - 0.5) * 120,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.left}%`,
            top: '-60px',
            fontSize: `${p.size}px`,
            opacity: 0.55,
            animation: `petalFall ${p.duration}s ${p.delay}s linear infinite`,
            '--drift': `${p.drift}px`,
          } as React.CSSProperties}
        >
          {p.emoji}
        </span>
      ))}

      <style>{`
        @keyframes petalFall {
          0%   { transform: translateY(0) translateX(0) rotate(0deg);   opacity: 0; }
          5%   { opacity: 0.55; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(105vh) translateX(var(--drift)) rotate(540deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
