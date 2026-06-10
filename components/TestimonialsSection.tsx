'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    avatar: '🌸',
    stars: 5,
    text: 'YogAyur Bliss completely transformed my life! After 3 months of the PCOS wellness program, my hormones are balanced, my energy is back, and I feel like a new person. The personalized approach is truly extraordinary.',
    program: 'PCOS Wellness Program',
  },
  {
    name: 'David Chen',
    location: 'Singapore',
    avatar: '🧘',
    stars: 5,
    text: 'As a busy executive, stress had taken over my life. The Stress Relief Program was a game-changer. The combination of Ayurvedic herbs, yoga nidra, and personalized coaching gave me tools I use every single day.',
    program: 'Stress Relief Program',
  },
  {
    name: 'Sarah Mitchell',
    location: 'London, UK',
    avatar: '✨',
    stars: 5,
    text: 'I\'ve tried countless wellness programs but nothing compares to YogAyur Bliss. The Ayurvedic consultation revealed my body type and the customized diet + yoga plan helped me lose 12kg naturally in 8 weeks!',
    program: 'Weight Management Program',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={16} fill="#FFD700" className="text-yellow-400" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFF0E0 100%)' }}
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
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 text-white" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF85A1)' }}>
            Success Stories
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}
          >
            Lives Transformed,{' '}
            <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FF85A1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Stories Shared
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Real stories from real people who found their path to wellness with YogAyur Bliss.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-white p-8 rounded-3xl relative"
              style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}
            >
              {/* Quote mark */}
              <div
                className="absolute top-6 right-6 text-6xl font-serif leading-none opacity-10"
                style={{ color: '#FF6B35', fontFamily: 'Georgia, serif' }}
              >
                "
              </div>

              <StarRating count={t.stars} />

              <p className="text-gray-600 mt-4 mb-6 leading-relaxed text-sm italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: 'linear-gradient(135deg, #FF6B3520, #FFD70020)', border: '2px solid #FF6B3540' }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-400">{t.location}</div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: '#FF6B35' }}>
                    {t.program}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {[
            { val: '2500+', label: 'Happy Clients' },
            { val: '98%', label: 'Satisfaction Rate' },
            { val: '4.9/5', label: 'Average Rating' },
            { val: '40+', label: 'Countries' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
            >
              <div
                className="text-2xl sm:text-3xl font-bold mb-1"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  background: 'linear-gradient(135deg, #FF6B35, #FFD700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.val}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
