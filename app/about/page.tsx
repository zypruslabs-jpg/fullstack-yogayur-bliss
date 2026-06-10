'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const team = [
  { name: 'Dr. Ananya Sharma', role: 'Chief Ayurvedic Physician', exp: '12 Years', emoji: '🌿', color: '#00A86B' },
  { name: 'Priya Nair', role: 'Senior Yoga Therapist', exp: '10 Years', emoji: '🧘', color: '#FF6B35' },
  { name: 'Dr. Rahul Verma', role: 'Wellness & Nutrition Coach', exp: '8 Years', emoji: '💛', color: '#FFD700' },
  { name: 'Meena Krishnan', role: 'Meditation & Mindfulness Expert', exp: '9 Years', emoji: '🔮', color: '#7B2D8B' },
];

const milestones = [
  { year: '2016', title: 'Founded ZenYoga Bliss', desc: 'Started with a vision to make Ayurveda accessible worldwide.' },
  { year: '2018', title: '500+ Clients Milestone', desc: 'Expanded to online consultations reaching global clients.' },
  { year: '2020', title: 'Global Expansion', desc: 'Serving clients in 20+ countries through online programs.' },
  { year: '2022', title: '2000+ Clients', desc: 'Launched corporate wellness programs for major companies.' },
  { year: '2024', title: '40+ Countries', desc: '2500+ clients transformed. 98% satisfaction rate achieved.' },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section
          className="py-24 lg:py-32 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF3E0 50%, #F0FFF4 100%)' }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #FF6B35, transparent)' }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-15 translate-y-1/2 -translate-x-1/2 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #00A86B, transparent)' }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 text-white" style={{ background: 'rgba(255,107,53,0.3)', border: '1px solid rgba(255,107,53,0.5)' }}>
                Our Story
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>
                Where Ancient Wisdom{' '}
                <span style={{ background: 'linear-gradient(135deg, #FFD700, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Meets Modern Life
                </span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem' }}>
                Born from a deep passion for holistic healing, ZenYoga Bliss has been transforming lives since 2016 through the timeless science of Ayurveda and Yoga.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission / Vision / Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '🎯', title: 'Our Mission', color: '#FF6B35', text: 'To make authentic Ayurvedic wisdom and therapeutic yoga accessible to every person on the planet, enabling natural, lasting health transformations.' },
                { icon: '🌟', title: 'Our Vision', color: '#FFD700', text: 'A world where every individual thrives in mind, body, and spirit — living in harmony with nature through the principles of Ayurveda and Yoga.' },
                { icon: '💛', title: 'Our Values', color: '#00A86B', text: 'Authenticity, personalization, compassion, and results. We honor ancient wisdom while embracing modern science to deliver evidence-based holistic wellness.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl text-center"
                  style={{ background: `${item.color}08`, border: `1px solid ${item.color}30` }}
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: item.color }}>{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20" style={{ background: 'linear-gradient(180deg, #FFF8F0, white)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>
                  The Story Behind{' '}
                  <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    ZenYoga Bliss
                  </span>
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>It began with a personal health crisis. After years of conventional medicine failing to address chronic stress, digestive issues, and fatigue, our founder turned to Ayurveda — and everything changed.</p>
                  <p>Within three months of following a personalized Ayurvedic protocol with daily yoga practice, the transformation was undeniable. Not just physical — but mental clarity, emotional balance, and a profound sense of inner peace emerged.</p>
                  <p>This experience sparked a mission: to create a wellness platform that combines the depth of traditional Ayurvedic knowledge with the accessibility of modern technology, making this life-changing wisdom available to anyone, anywhere in the world.</p>
                  <p>Today, with a team of certified Ayurvedic physicians, experienced yoga therapists, and holistic wellness coaches, ZenYoga Bliss has helped over 2,500 clients from 40+ countries reclaim their health naturally.</p>
                </div>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>Our Journey</h3>
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
                      >
                        {m.year.slice(2)}
                      </div>
                      {i < milestones.length - 1 && <div className="w-0.5 h-full bg-orange-200 mt-1" />}
                    </div>
                    <div className="pb-6">
                      <div className="text-xs text-orange-500 font-semibold mb-0.5">{m.year}</div>
                      <div className="font-bold text-gray-800 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{m.title}</div>
                      <div className="text-gray-500 text-sm">{m.desc}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>
                Meet Our{' '}
                <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Wellness Experts
                </span>
              </h2>
              <p className="text-gray-500">Certified practitioners with decades of combined experience in Ayurveda and Yoga.</p>
              <div className="section-divider mt-6" />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="rounded-3xl bg-white overflow-hidden"
                  style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.08)', border: `1px solid ${member.color}30` }}
                >
                  {/* Photo placeholder */}
                  <div className="h-48 flex flex-col items-center justify-center gap-2 relative"
                    style={{ background: `linear-gradient(135deg, ${member.color}10, ${member.color}20)`, borderBottom: `1px solid ${member.color}20` }}>
                    <div className="text-5xl">{member.emoji}</div>
                    <div className="text-xs text-gray-400">Photo Placeholder</div>
                    <div className="text-xs text-gray-300">300 × 300px</div>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-base mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>{member.name}</h3>
                    <p className="text-gray-500 text-sm mb-3">{member.role}</p>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: member.color }}>
                      {member.exp} Experience
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Begin Your Wellness Journey Today
            </h2>
            <p className="text-white/80 mb-8">Join 2500+ people who have transformed their lives with ZenYoga Bliss.</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ color: '#FF6B35' }}
            >
              Book Your Free Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
