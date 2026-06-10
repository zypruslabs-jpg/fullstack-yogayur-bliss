'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });

function CounterStat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (end / duration) * 16;
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
        {count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-gray-300 mt-1">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0015 0%, #1a0a2e 30%, #0d1a1a 70%, #001a0a 100%)' }}
    >
      {/* 3D Canvas */}
      <Hero3D />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 text-white/90"
            style={{ background: 'rgba(255, 107, 53, 0.3)', border: '1px solid rgba(255, 107, 53, 0.5)' }}
          >
            ✨ Trusted by 2500+ Wellness Seekers Worldwide
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Transform Your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF6B35, #FFD700, #FF85A1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Mind, Body
            </span>
            {' '}& Soul Naturally
          </h1>

          <p
            className="text-lg sm:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}
          >
            Ancient Ayurvedic Wisdom & Modern Wellness Solutions For A Balanced Life.
            Begin your transformative journey today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-orange-500/40"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
            >
              Book Consultation
            </Link>
            <Link
              href="/programs"
              className="px-7 py-3.5 rounded-full font-semibold text-white border border-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-105"
            >
              Explore Programs
            </Link>
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: '#25D366' }}
            >
              WhatsApp Now
            </a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-2xl mx-auto"
          >
            <CounterStat end={2500} suffix="+" label="Happy Clients" />
            <CounterStat end={98} suffix="%" label="Satisfaction Rate" />
            <CounterStat end={8} suffix="+" label="Years Experience" />
            <CounterStat end={40} suffix="+" label="Countries Served" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <div className="w-1 h-3 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
