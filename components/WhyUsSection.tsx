'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const DNAHelix = dynamic(() => import('./DNAHelix'), { ssr: false });

const reasons = [
  {
    icon: '🎓',
    title: 'Certified Experts',
    desc: 'All our practitioners are certified with 8+ years of practice in Ayurveda and Yoga.',
    color: '#FFD700',
  },
  {
    icon: '🌍',
    title: 'Global Reach',
    desc: 'Successfully serving clients across 40+ countries with online and in-person sessions.',
    color: '#FF6B35',
  },
  {
    icon: '🧬',
    title: 'Science-Based Approach',
    desc: 'We blend ancient wisdom with modern science for evidence-backed wellness solutions.',
    color: '#00A86B',
  },
  {
    icon: '🎯',
    title: 'Personalized Plans',
    desc: 'Every program is custom-designed for your unique Prakriti and health goals.',
    color: '#00BCD4',
  },
  {
    icon: '📊',
    title: 'Measurable Results',
    desc: '98% satisfaction rate. We track progress and adjust protocols for real outcomes.',
    color: '#FF85A1',
  },
  {
    icon: '🤝',
    title: 'Ongoing Support',
    desc: '24/7 WhatsApp support and regular follow-ups throughout your wellness journey.',
    color: '#7B2D8B',
  },
];

export default function WhyUsSection() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(135deg, #0a0015 0%, #1a0a2e 50%, #001a0a 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 text-white" style={{ background: 'linear-gradient(135deg, #00A86B, #00BCD4)' }}>
            Why Choose Us
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            The Science & Soul of{' '}
            <span style={{ background: 'linear-gradient(135deg, #FFD700, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Healing
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We don't just treat symptoms. We uncover root causes and build lasting wellness foundations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left column */}
          <div className="space-y-6">
            {reasons.slice(0, 3).map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${reason.color}20`, border: `1px solid ${reason.color}40` }}
                >
                  {reason.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {reason.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <DNAHelix />
            <div className="text-center pb-6">
              <div className="text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                The Science of Wellness
              </div>
              <div className="text-gray-400 text-xs mt-1">Ancient wisdom, modern science</div>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="space-y-6">
            {reasons.slice(3).map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${reason.color}20`, border: `1px solid ${reason.color}40` }}
                >
                  {reason.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {reason.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
