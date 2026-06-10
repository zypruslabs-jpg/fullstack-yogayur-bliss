'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle, Loader2 } from 'lucide-react';
import InstagramIcon from '@/components/icons/InstagramIcon';

const services = [
  'Yoga Therapy',
  'Ayurvedic Consultation',
  'Meditation Sessions',
  'Diet & Nutrition',
  'Stress Management',
  'Lifestyle Coaching',
  'Online Wellness',
  'Corporate Wellness',
  'Stress Relief Program',
  'Weight Management',
  'Gut Health Restore',
  'Sleep Improvement',
  "Women's Wellness",
  'Total Detox Program',
  'Diabetes Lifestyle',
  'PCOS Wellness',
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch {
      setError('Something went wrong. Please try WhatsApp instead.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(135deg, #0a0015 0%, #1a0a2e 50%, #001a0a 100%)' }}
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 text-white" style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}>
            Start Your Journey
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Book Your Free{' '}
            <span style={{ background: 'linear-gradient(135deg, #FFD700, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Consultation
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Take the first step towards a healthier, more balanced life. Book your free 30-minute discovery call today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Reach Out Directly
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                We respond to all inquiries within 2 hours. For immediate assistance, WhatsApp us directly and we'll connect you with the right wellness expert.
              </p>
            </div>

            {/* Contact Cards */}
            {[
              {
                icon: <Phone size={22} />,
                label: 'WhatsApp & Phone',
                value: '+91 XXXXXXXXXX',
                link: 'https://wa.me/91XXXXXXXXXX',
                color: '#25D366',
                cta: 'Chat on WhatsApp →',
              },
              {
                icon: <Mail size={22} />,
                label: 'Email Us',
                value: 'info@yogayurbliss.com',
                link: 'mailto:info@yogayurbliss.com',
                color: '#FF6B35',
                cta: 'Send Email →',
              },
              {
                icon: <InstagramIcon size={22} />,
                label: 'Instagram',
                value: '@yogayurbliss',
                link: 'https://www.instagram.com/yogayurbliss',
                color: '#FF85A1',
                cta: 'Follow Us →',
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] group"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: `${c.color}30`, border: `1px solid ${c.color}50`, color: c.color }}
                >
                  {c.icon}
                </div>
                <div className="flex-1">
                  <div className="text-gray-400 text-xs mb-0.5">{c.label}</div>
                  <div className="text-white font-semibold">{c.value}</div>
                </div>
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: c.color }}>
                  {c.cta}
                </span>
              </a>
            ))}

            {/* Quick Stats */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.2)' }}
            >
              <div className="text-yellow-400 font-semibold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                🌟 What You Get — Free Consultation
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                {[
                  '30-minute personalized assessment',
                  'Prakriti (body type) identification',
                  'Customized wellness roadmap',
                  'Recommendations for your health goals',
                  'Zero commitment, 100% value',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-yellow-400">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div
              className="p-8 rounded-3xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
            >
              {success ? (
                <div className="text-center py-12">
                  <CheckCircle size={64} className="mx-auto mb-4" style={{ color: '#00A86B' }} />
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Booking Received! 🙏
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Thank you! We'll contact you within 2 hours to confirm your consultation.
                  </p>
                  <a
                    href="https://wa.me/91XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-7 py-3 rounded-full font-semibold text-white"
                    style={{ background: '#25D366' }}
                  >
                    WhatsApp Us Now
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Book Free Consultation
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-xs mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 XXXXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Interested In</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-orange-400 transition-colors text-sm"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" className="bg-gray-900">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-gray-900">{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">Tell Us About Your Health Goals</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="What are your main health concerns and goals? The more you share, the better we can help..."
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors text-sm resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> Submitting...</>
                    ) : (
                      <><Send size={18} /> Book Free Consultation</>
                    )}
                  </button>

                  <p className="text-center text-gray-500 text-xs">
                    Or instantly connect via{' '}
                    <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                      WhatsApp
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
