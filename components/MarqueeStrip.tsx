'use client';

const items = [
  '🌸 Yoga Therapy',
  '🌿 Ayurveda',
  '🧘 Meditation',
  '💫 Holistic Healing',
  '🌱 Natural Wellness',
  '✨ Stress Management',
  '🔮 Chakra Balancing',
  '💛 Diet & Nutrition',
  '🌺 Lifestyle Coaching',
  '💚 Corporate Wellness',
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];

  return (
    <div
      className="py-4 overflow-hidden"
      style={{ background: 'linear-gradient(90deg, #FF6B35, #FFD700, #FF85A1, #FF6B35)' }}
    >
      <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="text-white font-semibold text-sm tracking-wide flex-shrink-0">
            {item}
            <span className="mx-4 opacity-50">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
