'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const programs = [
  {
    title: 'Stress Relief Program',
    duration: '4 Weeks',
    sessions: '12 Sessions',
    desc: 'Comprehensive stress management using yoga nidra, pranayama, and Ayurvedic herbs.',
    color: '#00BCD4',
    icon: '🌊',
    features: ['Daily Pranayama', 'Yoga Nidra', 'Herbal Support', '1:1 Coaching'],
  },
  {
    title: 'Weight Management',
    duration: '8 Weeks',
    sessions: '24 Sessions',
    desc: 'Sustainable weight management through Ayurvedic diet, detox, and therapeutic yoga.',
    color: '#00A86B',
    icon: '⚖️',
    features: ['Diet Planning', 'Detox Protocol', 'Yoga Therapy', 'Progress Tracking'],
  },
  {
    title: 'Gut Health Restore',
    duration: '6 Weeks',
    sessions: '18 Sessions',
    desc: 'Heal your digestive system with Ayurvedic Panchakarma principles and gut yoga.',
    color: '#FF6B35',
    icon: '🌱',
    features: ['Gut Healing Diet', 'Panchakarma', 'Yoga for Digestion', 'Herbal Remedies'],
  },
  {
    title: 'Sleep Improvement',
    duration: '3 Weeks',
    sessions: '9 Sessions',
    desc: 'Restore natural sleep cycles with Ayurvedic evening rituals and restorative yoga.',
    color: '#7B2D8B',
    icon: '🌙',
    features: ['Sleep Rituals', 'Yoga Nidra', 'Herbal Teas', 'Breathing Techniques'],
  },
  {
    title: "Women's Wellness",
    duration: '6 Weeks',
    sessions: '18 Sessions',
    desc: 'Holistic wellness for women through all life stages — hormonal balance and vitality.',
    color: '#FF85A1',
    icon: '🌸',
    features: ['Hormonal Balance', 'Menstrual Health', 'Yoga Therapy', 'Nutrition'],
  },
  {
    title: 'Total Detox Program',
    duration: '21 Days',
    sessions: '21 Days',
    desc: 'Deep cellular cleansing with Ayurvedic Panchakarma and detoxifying yoga practices.',
    color: '#FFD700',
    icon: '✨',
    features: ['Panchakarma', 'Detox Yoga', 'Clean Eating', 'Lymph Drainage'],
  },
  {
    title: 'Diabetes Lifestyle',
    duration: '12 Weeks',
    sessions: '36 Sessions',
    desc: 'Manage and reverse pre-diabetes with Ayurvedic lifestyle and therapeutic yoga.',
    color: '#00A86B',
    icon: '🩺',
    features: ['Sugar Balance', 'Therapeutic Yoga', 'Diet Protocol', 'Monitoring'],
  },
  {
    title: 'PCOS Wellness',
    duration: '8 Weeks',
    sessions: '24 Sessions',
    desc: 'Natural PCOS management through Ayurveda, hormone-balancing yoga, and nutrition.',
    color: '#FF6B35',
    icon: '🌺',
    features: ['Hormone Balance', 'PCOS Yoga', 'Anti-inflammatory Diet', 'Lifestyle'],
  },
];

export default function ProgramsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white" id="programs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 text-white" style={{ background: 'linear-gradient(135deg, #7B2D8B, #FF85A1)' }}>
            Wellness Programs
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}
          >
            Structured Programs For
            <br />
            <span style={{ background: 'linear-gradient(135deg, #7B2D8B, #FF85A1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Lasting Transformation
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our structured wellness programs combine Ayurveda, Yoga, and lifestyle coaching for measurable, lasting results.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden cursor-pointer"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              {/* ── PROGRAM IMAGE PLACEHOLDER ── */}
              <div className="h-36 flex flex-col items-center justify-center gap-1"
                style={{ background: `linear-gradient(135deg, ${program.color}12, ${program.color}25)`, borderBottom: `1px solid ${program.color}20` }}>
                <div className="text-4xl">{program.icon}</div>
                <div className="text-xs text-gray-400 opacity-60">Program Image — 400×180px</div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-gray-400">{program.duration}</div>
                  <div className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: program.color }}>{program.sessions}</div>
                </div>

                <h3
                  className="font-bold text-base mb-2"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}
                >
                  {program.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{program.desc}</p>

                {/* Features */}
                <div className="space-y-1.5 mb-5">
                  {program.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: program.color }} />
                      {f}
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="block text-center py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 group-hover:opacity-90"
                  style={{ background: program.color }}
                >
                  Enroll Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
