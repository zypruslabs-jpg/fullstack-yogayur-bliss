'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const values = [
  { icon: '🌿', title: 'Natural Healing', desc: 'Harnessing nature\'s power for holistic wellness' },
  { icon: '🔬', title: 'Science-Backed', desc: 'Ancient wisdom validated by modern research' },
  { icon: '💛', title: 'Personalized Care', desc: 'Tailored solutions for your unique constitution' },
  { icon: '🌍', title: 'Global Community', desc: '40+ countries, one wellness family' },
];

const teamImages = [
  { emoji: '👩‍⚕️', name: 'Dr. Ananya Sharma', role: 'Lead Ayurvedic Physician', color: '#FF6B35' },
  { emoji: '🧘‍♀️', name: 'Priya Nair', role: 'Senior Yoga Therapist', color: '#00A86B' },
  { emoji: '👨‍⚕️', name: 'Dr. Rahul Verma', role: 'Wellness Director', color: '#FFD700' },
];

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-28 bg-white" id="about">
      <div className="wrap">
        <div className="col2">

          {/* LEFT — Image / Visual Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main image placeholder */}
            <div className="relative rounded-3xl overflow-hidden"
              style={{ height: '420px', background: 'linear-gradient(135deg, #FFF8F0 0%, #F0FFF4 100%)', border: '2px dashed #FF6B3540' }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="text-7xl">🌸</div>
                <div className="text-center px-8">
                  <div className="text-base font-bold mb-1" style={{ color: '#FF6B35', fontFamily: 'Playfair Display, serif' }}>About Us — Feature Image</div>
                  <div className="text-sm text-gray-400">900 × 700px recommended</div>
                </div>
              </div>

              {/* Experience badge */}
              <div className="absolute top-6 left-6 px-4 py-3 rounded-2xl bg-white"
                style={{ boxShadow: '0 4px 20px rgba(255,107,53,0.15)', border: '1px solid #FF6B3520' }}>
                <div className="text-2xl font-bold" style={{ color: '#FF6B35', fontFamily: 'Playfair Display, serif' }}>8+</div>
                <div className="text-xs text-gray-500 font-medium">Years Experience</div>
              </div>

              {/* Happy clients badge */}
              <div className="absolute top-6 right-6 px-4 py-3 rounded-2xl bg-white"
                style={{ boxShadow: '0 4px 20px rgba(0,168,107,0.15)', border: '1px solid #00A86B20' }}>
                <div className="text-2xl font-bold" style={{ color: '#00A86B', fontFamily: 'Playfair Display, serif' }}>2.5K+</div>
                <div className="text-xs text-gray-500 font-medium">Happy Clients</div>
              </div>
            </div>

            {/* Team mini cards below */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {teamImages.map((member) => (
                <div key={member.name} className="p-3 rounded-2xl bg-white text-center"
                  style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.06)', border: `1px solid ${member.color}20` }}>
                  <div className="text-3xl mb-1">{member.emoji}</div>
                  <div className="text-xs font-bold text-gray-800 leading-tight">{member.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{member.role}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 text-white"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}>
              About ZenYoga Bliss
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>
              Where Ancient Wisdom Meets{' '}
              <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Modern Science
              </span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              ZenYoga Bliss was born from a deep passion for holistic wellness and a vision to make ancient Ayurvedic and Yoga wisdom accessible to everyone worldwide. With over 8 years of dedicated practice and study, we have created a sanctuary where healing begins.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              Our approach combines the timeless principles of Ayurveda — understanding your unique body constitution (Prakriti) — with modern scientific insights, creating personalized wellness journeys that truly transform lives.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {values.map((v) => (
                <div key={v.title} className="p-4 rounded-xl transition-all hover:shadow-md"
                  style={{ background: '#FFF8F0', border: '1px solid #FF6B3520' }}>
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <div className="font-semibold text-sm text-gray-800 mb-1">{v.title}</div>
                  <div className="text-xs text-gray-500">{v.desc}</div>
                </div>
              ))}
            </div>

            <Link href="/about"
              className="inline-block px-7 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}>
              Our Full Story →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
