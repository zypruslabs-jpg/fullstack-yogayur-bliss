'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const AboutOrb = dynamic(() => import('./AboutOrb'), { ssr: false });

const values = [
  { icon: '🌿', title: 'Natural Healing', desc: 'Harnessing nature\'s power for holistic wellness' },
  { icon: '🔬', title: 'Science-Backed', desc: 'Ancient wisdom validated by modern research' },
  { icon: '💛', title: 'Personalized Care', desc: 'Tailored solutions for your unique constitution' },
  { icon: '🌍', title: 'Global Community', desc: '40+ countries, one wellness family' },
];

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-28 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D Orb */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0a0015, #1a0a2e)' }}
          >
            <AboutOrb />
            {/* Overlay text */}
            <div className="absolute bottom-6 left-6 right-6">
              <div
                className="text-center py-3 px-6 rounded-2xl text-white text-sm font-medium"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
              >
                🌸 8+ Years of Transforming Lives Through Ancient Wisdom
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 text-white" style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}>
              About YogAyur Bliss
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}
            >
              Where Ancient Wisdom Meets{' '}
              <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Modern Science
              </span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              YogAyur Bliss was born from a deep passion for holistic wellness and a vision to make ancient Ayurvedic and Yoga wisdom accessible to everyone worldwide. With over 8 years of dedicated practice and study, we've created a sanctuary where healing begins.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              Our approach combines the timeless principles of Ayurveda — understanding your unique body constitution (Prakriti) — with modern scientific insights, creating personalized wellness journeys that truly transform lives.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {values.map((v) => (
                <div key={v.title} className="p-4 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors">
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <div className="font-semibold text-sm text-gray-800 mb-1">{v.title}</div>
                  <div className="text-xs text-gray-500">{v.desc}</div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-block px-7 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
            >
              Our Full Story →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
