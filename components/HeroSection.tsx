'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function CounterStat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = (end / 2000) * 16;
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#FF6B35' }}>
        {count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF3E0 40%, #F0FFF4 100%)' }}>

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2" style={{ background: 'radial-gradient(circle, #FF6B35, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15 translate-y-1/2 -translate-x-1/2" style={{ background: 'radial-gradient(circle, #00A86B, transparent)' }} />
      <div className="absolute top-1/2 left-10 w-40 h-40 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FFD700, transparent)' }} />

      {/* Floating yoga emojis */}
      {['🌸', '🌿', '✨', '🧘', '🌺', '💛'].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl sm:text-3xl select-none pointer-events-none"
          style={{
            top: `${[15, 25, 70, 80, 10, 60][i]}%`,
            left: `${[5, 90, 3, 88, 50, 95][i]}%`,
          }}
          animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: '#FF6B3515', border: '1px solid #FF6B3540', color: '#FF6B35' }}>
            🌟 Trusted by 2500+ Wellness Seekers Worldwide
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>
            Transform Your{' '}
            <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Mind, Body
            </span>
            <br />& Soul Naturally
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem' }}>
            Ancient Ayurvedic Wisdom & Modern Wellness Solutions For A Balanced Life
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Link href="/contact"
              className="px-8 py-4 rounded-full font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
            >
              Book Free Consultation
            </Link>
            <Link href="/programs"
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: 'white', color: '#FF6B35', border: '2px solid #FF6B35', boxShadow: '0 4px 15px rgba(255,107,53,0.2)' }}
            >
              Explore Programs
            </Link>
            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: '#25D366', boxShadow: '0 4px 15px rgba(37,211,102,0.3)' }}
            >
              💬 WhatsApp Now
            </a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto p-6 rounded-3xl"
            style={{ background: 'white', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}
          >
            <CounterStat end={2500} suffix="+" label="Happy Clients" />
            <CounterStat end={98} suffix="%" label="Satisfaction" />
            <CounterStat end={8} suffix="+" label="Years Exp." />
            <CounterStat end={40} suffix="+" label="Countries" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
