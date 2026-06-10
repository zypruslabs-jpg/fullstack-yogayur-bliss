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
      <div className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#FF6B35' }}>
        {count}{suffix}
      </div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF3E0 50%, #F0FFF4 100%)' }}
    >
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-25 -translate-y-1/3 translate-x-1/3 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF6B35, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 translate-y-1/3 -translate-x-1/3 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00A86B, transparent)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Text + CTA ── */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ background: '#FF6B3512', border: '1px solid #FF6B3540', color: '#FF6B35' }}>
              🌟 Trusted by 2500+ Wellness Seekers Worldwide
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5"
              style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>
              Transform Your<br />
              <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Mind, Body
              </span>{' '}
              & Soul
            </h1>

            <p className="text-gray-500 mb-8 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>
              Ancient Ayurvedic Wisdom &amp; Modern Yoga Therapy.<br />
              Your journey to lasting health starts here.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/contact"
                className="px-7 py-4 rounded-full font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}>
                Book Free Consultation
              </Link>
              <Link href="/programs"
                className="px-7 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                style={{ background: 'white', color: '#FF6B35', border: '2px solid #FF6B35' }}>
                View Programs
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-4 gap-3 p-4 rounded-2xl"
              style={{ background: 'white', boxShadow: '0 4px 30px rgba(0,0,0,0.08)', border: '1px solid #f3f4f6' }}>
              <CounterStat end={2500} suffix="+" label="Clients" />
              <CounterStat end={98} suffix="%" label="Satisfied" />
              <CounterStat end={8} suffix="+" label="Yrs Exp" />
              <CounterStat end={40} suffix="+" label="Countries" />
            </motion.div>

            {/* WhatsApp */}
            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: '#25D366', boxShadow: '0 4px 15px rgba(37,211,102,0.3)' }}>
              💬 Chat on WhatsApp
            </a>
          </motion.div>

          {/* ── RIGHT: HERO BANNER IMAGE ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            {/* ─────────────────────────────────────────────────
                MAIN HERO BANNER — 600 × 700 px recommended
                Replace the div below with <Image> when ready
            ───────────────────────────────────────────────── */}
            <div className="relative rounded-3xl overflow-hidden w-full"
              style={{
                height: '500px',
                background: 'linear-gradient(135deg, #FFF0E0 0%, #E8F5F0 100%)',
                border: '2px dashed #FF6B3560',
              }}>

              {/* Placeholder graphic */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 select-none">
                <div className="text-7xl">🧘‍♀️</div>
                <div className="text-center px-8">
                  <p className="text-base font-bold" style={{ color: '#FF6B35', fontFamily: 'Playfair Display, serif' }}>
                    Hero Banner Image
                  </p>
                  <p className="text-sm text-gray-400 mt-1">Recommended: 600 × 700 px</p>
                  <p className="text-xs text-gray-300 mt-0.5">Upload via Admin Panel → Photos</p>
                </div>
              </div>

              {/* Floating info cards */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 right-6 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white"
                style={{ boxShadow: '0 8px 25px rgba(0,168,107,0.15)', border: '1px solid #00A86B20' }}>
                <span className="text-2xl">🌿</span>
                <div>
                  <div className="text-xs font-bold text-gray-800">100% Natural</div>
                  <div className="text-xs text-gray-400">Ayurvedic Methods</div>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-6 left-6 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white"
                style={{ boxShadow: '0 8px 25px rgba(255,107,53,0.15)', border: '1px solid #FF6B3520' }}>
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="text-xs font-bold text-gray-800">4.9 / 5.0 Rating</div>
                  <div className="text-xs text-gray-400">500+ Reviews</div>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white"
                style={{ boxShadow: '0 8px 25px rgba(255,213,0,0.15)', border: '1px solid #FFD70020' }}>
                <span className="text-2xl">🏅</span>
                <div>
                  <div className="text-xs font-bold text-gray-800">Certified Experts</div>
                  <div className="text-xs text-gray-400">8+ Years Practice</div>
                </div>
              </motion.div>
            </div>

            {/* ── SECOND BANNER — wide promo strip ── */}
            <div className="mt-4 rounded-2xl overflow-hidden flex items-center gap-4 px-6 py-4"
              style={{
                background: 'linear-gradient(135deg, #FFF8F0, #F0FFF4)',
                border: '2px dashed #00A86B40',
                minHeight: '80px',
              }}>
              <span className="text-3xl flex-shrink-0">🌺</span>
              <div>
                <div className="text-sm font-bold" style={{ color: '#00A86B', fontFamily: 'Playfair Display, serif' }}>
                  Promo / Offer Banner — 800 × 150 px
                </div>
                <div className="text-xs text-gray-400">Replace with seasonal offer or announcement image</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
