'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'Playfair Display, serif', color: '#FF6B35', fontSize: '1.4rem', fontWeight: 700 }}>
        {count}{suffix}
      </div>
      <div style={{ color: '#6b7280', fontSize: '0.7rem', marginTop: '2px' }}>{label}</div>
    </div>
  );
}

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
    visualBg: 'linear-gradient(135deg, #FF6B3518, #FFD70018)',
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
    visualBg: 'linear-gradient(135deg, #00A86B18, #00BCD418)',
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
    visualBg: 'linear-gradient(135deg, #FFD70018, #FF85A118)',
    accent: '#FFD700',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), []);

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
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: slide.bg,
      transition: 'background 0.8s ease',
    }}>
      {/* BG blobs */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '500px', height: '500px', borderRadius: '50%',
        opacity: 0.2, transform: 'translate(33%, -33%)',
        background: `radial-gradient(circle, ${slide.accent}, transparent)`,
        pointerEvents: 'none', transition: 'background 0.8s ease',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '350px', height: '350px', borderRadius: '50%',
        opacity: 0.15, transform: 'translate(-33%, 33%)',
        background: 'radial-gradient(circle, #00A86B, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Main wrapper */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '1280px',
        margin: '0 auto',
        padding: '112px 24px 48px',
        boxSizing: 'border-box',
      }}>
        {/* TWO COLUMN LAYOUT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '64px',
          alignItems: 'center',
        }}>

          {/* ── LEFT: TEXT ── */}
          <AnimatePresence mode="wait">
            <motion.div key={`text-${slide.id}`}
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.6 }}>

              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', borderRadius: '999px', marginBottom: '24px',
                fontSize: '0.875rem', fontWeight: 600,
                background: `${slide.accent}14`, border: `1px solid ${slide.accent}40`, color: slide.accent,
              }}>
                {slide.badge}
              </div>

              {/* Headline */}
              <h1 style={{
                fontFamily: 'Playfair Display, serif', color: '#1A1A2E',
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800,
                lineHeight: 1.2, marginBottom: '20px',
              }}>
                {slide.title}{' '}
                <span style={{
                  background: `linear-gradient(135deg, ${slide.accent}, #FFD700)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  {slide.highlight}
                </span>
                <br />{slide.titleEnd}
              </h1>

              {/* Subtext */}
              <p style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem',
                color: '#6b7280', lineHeight: 1.7, marginBottom: '32px',
              }}>
                {slide.sub}
              </p>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
                <Link href="/contact" style={{
                  padding: '14px 28px', borderRadius: '999px', fontWeight: 600,
                  color: 'white', textDecoration: 'none', display: 'inline-block',
                  background: 'linear-gradient(135deg, #FF6B35, #FFD700)',
                  boxShadow: '0 8px 25px rgba(255,107,53,0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}>
                  Book Free Consultation
                </Link>
                <Link href="/programs" style={{
                  padding: '14px 28px', borderRadius: '999px', fontWeight: 600,
                  color: '#FF6B35', textDecoration: 'none', display: 'inline-block',
                  background: 'white', border: '2px solid #FF6B35',
                  boxShadow: '0 4px 15px rgba(255,107,53,0.15)',
                  transition: 'transform 0.2s',
                }}>
                  View Programs
                </Link>
              </div>

              {/* Stats bar */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px',
                padding: '16px', borderRadius: '16px',
                background: 'white', boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
                border: '1px solid #f3f4f6', marginBottom: '16px',
              }}>
                <CounterStat end={2500} suffix="+" label="Clients" />
                <CounterStat end={98} suffix="%" label="Satisfied" />
                <CounterStat end={8} suffix="+" label="Yrs Exp" />
                <CounterStat end={40} suffix="+" label="Countries" />
              </div>

              {/* WhatsApp */}
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '999px', fontWeight: 600,
                color: 'white', textDecoration: 'none',
                background: '#25D366', boxShadow: '0 4px 15px rgba(37,211,102,0.3)',
              }}>
                💬 Chat on WhatsApp — Instant Response
              </a>
            </motion.div>
          </AnimatePresence>

          {/* ── RIGHT: BANNER SLIDER ── */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={`img-${slide.id}`}
                initial={{ opacity: 0, scale: 0.95, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -30 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: 'relative', width: '100%', height: '460px',
                  borderRadius: '24px', overflow: 'hidden',
                  background: slide.visualBg,
                  border: `2px dashed ${slide.accent}55`,
                }}
              >
                {/* Placeholder */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '12px',
                }}>
                  <div style={{ fontSize: '6rem', userSelect: 'none' }}>{slide.visual}</div>
                  <div style={{ textAlign: 'center', padding: '0 32px' }}>
                    <p style={{ fontFamily: 'Playfair Display, serif', color: slide.accent, fontWeight: 700, fontSize: '1rem' }}>
                      Slide {slide.id + 1} — Banner Image
                    </p>
                    <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '4px' }}>600 × 460 px — Upload via Admin Panel</p>
                  </div>
                </div>

                {/* Floating cards */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute', top: '24px', right: '24px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '12px 16px', borderRadius: '16px', background: 'white',
                    boxShadow: '0 8px 25px rgba(0,168,107,0.15)', border: '1px solid #00A86B20',
                  }}>
                  <span style={{ fontSize: '1.5rem' }}>🌿</span>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#111827' }}>100% Natural</div>
                    <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>Ayurvedic Methods</div>
                  </div>
                </motion.div>

                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  style={{
                    position: 'absolute', bottom: '24px', left: '24px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '12px 16px', borderRadius: '16px', background: 'white',
                    boxShadow: '0 8px 25px rgba(255,107,53,0.15)', border: '1px solid #FF6B3520',
                  }}>
                  <span style={{ fontSize: '1.5rem' }}>⭐</span>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#111827' }}>4.9 / 5.0 Rating</div>
                    <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>500+ Reviews</div>
                  </div>
                </motion.div>

                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  style={{
                    position: 'absolute', bottom: '24px', right: '24px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '12px 16px', borderRadius: '16px', background: 'white',
                    boxShadow: '0 8px 25px rgba(255,213,0,0.15)', border: '1px solid #FFD70020',
                  }}>
                  <span style={{ fontSize: '1.5rem' }}>🏅</span>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#111827' }}>Certified Experts</div>
                    <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>8+ Years Practice</div>
                  </div>
                </motion.div>

                {/* Slide counter */}
                <div style={{
                  position: 'absolute', top: '24px', left: '24px',
                  padding: '6px 12px', borderRadius: '999px',
                  fontSize: '0.75rem', fontWeight: 700, color: 'white',
                  background: `${slide.accent}CC`,
                }}>
                  {slide.id + 1} / {slides.length}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginTop: '16px',
            }}>
              {/* Prev / Next */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => { prev(); resetTimer(); }} style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'white', border: '1px solid #e5e7eb', color: '#FF6B35',
                  cursor: 'pointer', transition: 'transform 0.2s',
                }}>
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => { next(); resetTimer(); }} style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #FF6B35, #FFD700)', color: 'white',
                  border: 'none', cursor: 'pointer', transition: 'transform 0.2s',
                }}>
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {slides.map((s, i) => (
                  <button key={s.id} onClick={() => { setCurrent(i); resetTimer(); }} style={{
                    height: '8px', borderRadius: '999px', border: 'none', cursor: 'pointer',
                    width: i === current ? '28px' : '8px',
                    background: i === current ? 'linear-gradient(135deg, #FF6B35, #FFD700)' : '#e5e7eb',
                    transition: 'all 0.3s',
                  }} />
                ))}
              </div>

              {/* Promo */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: '12px',
                background: '#00A86B10', border: '1px solid #00A86B30',
              }}>
                <span style={{ fontSize: '0.9rem' }}>🌺</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#00A86B' }}>Free Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
