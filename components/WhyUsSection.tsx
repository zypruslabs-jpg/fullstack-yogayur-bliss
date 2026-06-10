'use client';

import { motion } from 'framer-motion';

const reasons = [
  { icon: '🎓', title: 'Certified Experts', desc: 'All our practitioners are certified with 8+ years of practice in Ayurveda and Yoga.', color: '#FF6B35' },
  { icon: '🌍', title: 'Global Reach', desc: 'Successfully serving clients across 40+ countries with online and in-person sessions.', color: '#00A86B' },
  { icon: '🧬', title: 'Science-Based', desc: 'We blend ancient wisdom with modern science for evidence-backed wellness solutions.', color: '#FFD700' },
  { icon: '🎯', title: 'Personalized Plans', desc: 'Every program is custom-designed for your unique Prakriti and health goals.', color: '#00BCD4' },
  { icon: '📊', title: 'Measurable Results', desc: '98% satisfaction rate. We track progress and adjust protocols for real outcomes.', color: '#FF85A1' },
  { icon: '🤝', title: 'Ongoing Support', desc: '24/7 WhatsApp support and regular follow-ups throughout your wellness journey.', color: '#7B2D8B' },
];

const stats = [
  { value: '2500+', label: 'Lives Transformed', icon: '🌟', color: '#FF6B35' },
  { value: '98%', label: 'Satisfaction Rate', icon: '💯', color: '#00A86B' },
  { value: '40+', label: 'Countries Served', icon: '🌍', color: '#FFD700' },
  { value: '8+', label: 'Years of Excellence', icon: '🏅', color: '#00BCD4' },
];

const certifications = [
  { label: 'Ayurvedic Council Certified', icon: '📜' },
  { label: 'Yoga Alliance RYT-500', icon: '🧘' },
  { label: 'WHO Wellness Standards', icon: '🏥' },
  { label: 'ISO Certified Practice', icon: '✅' },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #F0FFF4 0%, #FFF8F0 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 text-white"
            style={{ background: 'linear-gradient(135deg, #00A86B, #00BCD4)' }}>
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>
            The Science & Soul of{' '}
            <span style={{ background: 'linear-gradient(135deg, #00A86B, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Healing
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We don&apos;t just treat symptoms. We uncover root causes and build lasting wellness foundations.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* 3-col layout */}
        <div className="grid-3col">

          {/* Left — 3 reason cards */}
          <div className="space-y-5">
            {reasons.slice(0, 3).map((reason, i) => (
              <motion.div key={reason.title}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: `1px solid ${reason.color}20` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${reason.color}15` }}>
                  {reason.icon}
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>{reason.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center — Stats + Certification Panel (no 3D) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }}
            className="rounded-3xl overflow-hidden"
            style={{ background: 'white', border: '1px solid #00A86B20', boxShadow: '0 8px 40px rgba(0,168,107,0.10)' }}>

            {/* Banner area */}
            <div className="relative h-44 flex flex-col items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #F0FFF4 100%)', borderBottom: '1px solid #00A86B15' }}>
              <div className="text-5xl">🌺</div>
              <div className="text-center px-4">
                <div className="font-bold text-sm" style={{ color: '#FF6B35', fontFamily: 'Playfair Display, serif' }}>Center Banner Image</div>
                <div className="text-xs text-gray-400">500 × 300px</div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-0">
              {stats.map((stat, i) => (
                <div key={stat.label}
                  className="flex flex-col items-center justify-center py-5 px-3 text-center"
                  style={{
                    borderRight: i % 2 === 0 ? '1px solid #f3f4f6' : 'none',
                    borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none',
                  }}>
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: stat.color }}>{stat.value}</div>
                  <div className="text-xs text-gray-400 leading-tight mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="p-5 border-t border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Certifications & Standards</div>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.label} className="flex items-center gap-2">
                    <span className="text-sm">{cert.icon}</span>
                    <span className="text-xs text-gray-600 font-medium">{cert.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — 3 reason cards */}
          <div className="space-y-5">
            {reasons.slice(3).map((reason, i) => (
              <motion.div key={reason.title}
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: `1px solid ${reason.color}20` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${reason.color}15` }}>
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
