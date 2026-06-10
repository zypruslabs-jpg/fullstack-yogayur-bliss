'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── Counter stat ── */
function CounterStat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let s = 0;
        const step = (end / 2000) * 16;
        const t = setInterval(() => {
          s += step;
          if (s >= end) { setCount(end); clearInterval(t); }
          else setCount(Math.floor(s));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
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

/* ── Slides data ── */
const slides = [
  {
    id: 0,
    badge: '🌟 Ancient Ayurvedic Wisdom',
    title: 'Transform Your',
    highlight: 'Mind, Body',
    titleEnd: '& Soul',
    sub: 'Authentic Ayurveda & Yoga Therapy tailored to your unique constitution.',
    bg: 'linear-gradient(135deg, #FFF8F0 0%, #FFF3E0 60%, #F0FFF4 100%)',
    visual: '🧘‍♀️',
    visualBg: 'linear-gradient(135deg, #FF6B3515, #FFD70015)',
    accent: '#FF6B35',
  },
  {
    id: 1,
    badge: '🌿 Holistic Healing Programs',
    title: 'Heal From',
    highlight: 'Within',
    titleEnd: 'Naturally',
    sub: '8 structured wellness programs for stress, PCOS, gut health, weight & more.',
    bg: 'linear-gradient(135deg, #F0FFF4 0%, #E8F5E9 60%, #FFF8F0 100%)',
    visual: '🌿',
    visualBg: 'linear-gradient(135deg, #00A86B15, #00BCD415)',
    accent: '#00A86B',
  },
  {
    id: 2,
    badge: '🌺 2500+ Lives Transformed',
    title: 'Your Journey',
    highlight: 'Starts',
    titleEnd: 'Today',
    sub: '98% satisfaction rate. Serving clients in 40+ countries since 2016.',
    bg: 'linear-gradient(135deg, #FFFDE7 0%, #FFF8F0 60%, #F3E5F5 100%)',
    visual: '🌺',
    visualBg: 'linear-gradient(135deg, #FFD70015, #FF85A115)',
    accent: '#FFD700',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), []);

  /* auto-play */
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  const slide = slides[current];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: slide.bg, transition: 'background 0.8s ease' }}
    >
      {/* BG blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 -translate-y-1/3 translate-x-1/3 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${slide.accent}, transparent)`, transition: 'background 0.8s ease' }} />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full opacity-15 translate-y-1/3 -translate-x-1/3 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00A86B, transparent)' }} />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT: Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ background: `${slide.accent}12`, border: `1px solid ${slide.accent}40`, color: slide.accent }}>
                {slide.badge}
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5"
                style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>
                {slide.title}{' '}
                <span style={{
                  background: `linear-gradient(135deg, ${slide.accent}, #FFD700)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>
                  {slide.highlight}
                </span>
                <br />{slide.titleEnd}
              </h1>

              {/* Sub */}
              <p className="text-gray-500 mb-8 leading-relaxed"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem' }}>
                {slide.sub}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/contact"
                  className="px-7 py-4 rounded-full font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ background: `linear-gradient(135deg, #FF6B35, #FFD700)` }}>
                  Book Free Consultation
                </Link>
                <Link href="/programs"
                  className="px-7 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{ background: 'white', color: '#FF6B35', border: '2px solid #FF6B35' }}>
                  View Programs
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 p-4 rounded-2xl"
                style={{ background: 'white', boxShadow: '0 4px 30px rgba(0,0,0,0.08)', border: '1px solid #f3f4f6' }}>
                <CounterStat end={2500} suffix="+" label="Clients" />
                <CounterStat end={98} suffix="%" label="Satisfied" />
                <CounterStat end={8} suffix="+" label="Yrs Exp" />
                <CounterStat end={40} suffix="+" label="Countries" />
              </div>

              {/* WhatsApp */}
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: '#25D366', boxShadow: '0 4px 15px rgba(37,211,102,0.3)' }}>
                💬 Chat on WhatsApp — Instant Response
              </a>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT: Slider Image Panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.95, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -30 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl overflow-hidden w-full"
                style={{
                  height: '480px',
                  background: slide.visualBg,
                  border: `2px dashed ${slide.accent}50`,
                }}
              >
                {/* Placeholder visual */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="text-9xl select-none">{slide.visual}</div>
                  <div className="text-center px-8">
                    <p className="text-sm font-bold" style={{ color: slide.accent, fontFamily: 'Playfair Display, serif' }}>
                      Slide {slide.id + 1} Banner Image
                    </p>
                    <p className="text-xs text-gray-400 mt-1">600 × 480 px — Upload via Admin Panel</p>
                  </div>
                </div>

                {/* Floating badges */}
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
                    <div className="text-xs text-gray-400">500+ Google Reviews</div>
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

                {/* Slide number pill */}
                <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                  style={{ background: `${slide.accent}CC` }}>
                  {slide.id + 1} / {slides.length}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── SLIDER CONTROLS ── */}
            <div className="flex items-center justify-between mt-4">
              {/* Prev / Next */}
              <div className="flex gap-2">
                <button
                  onClick={() => { prev(); resetTimer(); }}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white transition-all hover:scale-110 hover:shadow-md"
                  style={{ border: '1px solid #e5e7eb', color: '#FF6B35' }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => { next(); resetTimer(); }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 hover:shadow-md"
                  style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Dots */}
              <div className="flex gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => { setCurrent(i); resetTimer(); }}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? '28px' : '8px',
                      height: '8px',
                      background: i === current ? 'linear-gradient(135deg, #FF6B35, #FFD700)' : '#e5e7eb',
                    }}
                  />
                ))}
              </div>

              {/* Promo strip */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: '#00A86B10', border: '1px solid #00A86B30' }}>
                <span className="text-sm">🌺</span>
                <span className="text-xs font-semibold" style={{ color: '#00A86B' }}>Free Consultation</span>
              </div>
            </div>
          </div>
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
