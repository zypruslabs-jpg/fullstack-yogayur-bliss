'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const DNAHelix = dynamic(() => import('./DNAHelix'), { ssr: false });

const reasons = [
  { icon: '🎓', title: 'Certified Experts', desc: 'All our practitioners are certified with 8+ years of practice in Ayurveda and Yoga.', color: '#FF6B35' },
  { icon: '🌍', title: 'Global Reach', desc: 'Successfully serving clients across 40+ countries with online and in-person sessions.', color: '#00A86B' },
  { icon: '🧬', title: 'Science-Based', desc: 'We blend ancient wisdom with modern science for evidence-backed wellness solutions.', color: '#FFD700' },
  { icon: '🎯', title: 'Personalized Plans', desc: 'Every program is custom-designed for your unique Prakriti and health goals.', color: '#00BCD4' },
  { icon: '📊', title: 'Measurable Results', desc: '98% satisfaction rate. We track progress and adjust protocols for real outcomes.', color: '#FF85A1' },
  { icon: '🤝', title: 'Ongoing Support', desc: '24/7 WhatsApp support and regular follow-ups throughout your wellness journey.', color: '#7B2D8B' },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #F0FFF4 0%, #FFF8F0 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 text-white" style={{ background: 'linear-gradient(135deg, #00A86B, #00BCD4)' }}>
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>
            The Science & Soul of{' '}
            <span style={{ background: 'linear-gradient(135deg, #00A86B, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Healing
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We don't just treat symptoms. We uncover root causes and build lasting wellness foundations.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left */}
          <div className="space-y-5">
            {reasons.slice(0, 3).map((reason, i) => (
              <motion.div key={reason.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: `1px solid ${reason.color}20` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${reason.color}15` }}>
                  {reason.icon}
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>{reason.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center DNA */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #F0FFF4, #FFF8F0)', border: '1px solid #00A86B20', boxShadow: '0 8px 40px rgba(0,168,107,0.1)' }}>
            <DNAHelix />
            <div className="text-center pb-6">
              <div className="font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>The Science of Wellness</div>
              <div className="text-gray-400 text-xs mt-1">Ancient wisdom, modern science</div>
            </div>
          </motion.div>

          {/* Right */}
          <div className="space-y-5">
            {reasons.slice(3).map((reason, i) => (
              <motion.div key={reason.title} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: `1px solid ${reason.color}20` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${reason.color}15` }}>
                  {reason.icon}
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>{reason.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
