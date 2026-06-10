'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    icon: '🧘',
    title: 'Yoga Therapy',
    desc: 'Therapeutic yoga tailored to heal specific health conditions and restore balance to mind and body.',
    color: '#00A86B',
    bg: 'linear-gradient(135deg, #00A86B22, #00A86B11)',
    border: '#00A86B',
  },
  {
    icon: '🌿',
    title: 'Ayurvedic Consultation',
    desc: 'Discover your unique Prakriti (body type) and receive personalized Ayurvedic health guidance.',
    color: '#FFD700',
    bg: 'linear-gradient(135deg, #FFD70022, #FFD70011)',
    border: '#FFD700',
  },
  {
    icon: '🔮',
    title: 'Meditation Sessions',
    desc: 'Guided meditation practices from traditional Vedic techniques to modern mindfulness methods.',
    color: '#7B2D8B',
    bg: 'linear-gradient(135deg, #7B2D8B22, #7B2D8B11)',
    border: '#7B2D8B',
  },
  {
    icon: '🥗',
    title: 'Diet & Nutrition',
    desc: 'Ayurvedic diet plans that align with your constitution for optimal health and energy.',
    color: '#FF6B35',
    bg: 'linear-gradient(135deg, #FF6B3522, #FF6B3511)',
    border: '#FF6B35',
  },
  {
    icon: '💆',
    title: 'Stress Management',
    desc: 'Evidence-based techniques combining yoga, pranayama, and Ayurveda to conquer modern stress.',
    color: '#00BCD4',
    bg: 'linear-gradient(135deg, #00BCD422, #00BCD411)',
    border: '#00BCD4',
  },
  {
    icon: '✨',
    title: 'Lifestyle Coaching',
    desc: 'Comprehensive lifestyle transformation programs based on Dinacharya (daily routine) principles.',
    color: '#FF85A1',
    bg: 'linear-gradient(135deg, #FF85A122, #FF85A111)',
    border: '#FF85A1',
  },
  {
    icon: '💻',
    title: 'Online Wellness',
    desc: 'Convenient online sessions and programs for global clients, anytime anywhere.',
    color: '#00BCD4',
    bg: 'linear-gradient(135deg, #00BCD422, #00BCD411)',
    border: '#00BCD4',
  },
  {
    icon: '🏢',
    title: 'Corporate Wellness',
    desc: 'Workplace wellness programs boosting employee health, productivity, and team morale.',
    color: '#4B0082',
    bg: 'linear-gradient(135deg, #4B008222, #4B008211)',
    border: '#4B0082',
  },
];

export default function ServicesSection() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFF0E0 100%)' }}
      id="services"
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
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 text-white" style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}>
            Our Services
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}
          >
            Holistic Wellness Services
            <br />
            <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Tailored For You
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            From Ayurvedic consultations to yoga therapy — every service is personalized to your unique constitution and wellness goals.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Grid */}
        <div className="grid-4col">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group rounded-2xl bg-white cursor-pointer relative overflow-hidden"
              style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: `1px solid ${service.border}30`,
              }}
            >
              {/* ── SERVICE IMAGE PLACEHOLDER ── */}
              <div className="h-40 flex flex-col items-center justify-center gap-1 relative"
                style={{ background: service.bg, borderBottom: `1px solid ${service.border}20` }}>
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <div className="text-xs text-gray-400 opacity-60">Service Image — 400×200px</div>
              </div>

              <div className="relative z-10 p-5">
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.desc}</p>
                <Link
                  href="/contact"
                  className="text-xs font-semibold transition-colors"
                  style={{ color: service.color }}
                >
                  Book Now →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
