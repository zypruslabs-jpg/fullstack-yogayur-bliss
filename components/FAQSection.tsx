'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What is Ayurveda and how does it differ from conventional medicine?',
    a: 'Ayurveda is a 5,000-year-old holistic healing system from India that focuses on balancing the mind, body, and spirit. Unlike conventional medicine which primarily treats symptoms, Ayurveda identifies your unique body constitution (Prakriti) and addresses root causes. It uses natural herbs, diet, lifestyle practices, and yoga to restore harmony and prevent disease, rather than just managing it.',
  },
  {
    q: 'Do I need prior yoga experience to join your programs?',
    a: 'Absolutely not! Our programs are designed for all levels — complete beginners to advanced practitioners. During your initial consultation, we assess your current level, health status, and goals to create a customized program that\'s perfectly suited to where you are right now. We meet you where you are and guide you forward at your own pace.',
  },
  {
    q: 'How are your online sessions conducted?',
    a: 'Our online sessions are conducted via Zoom or Google Meet with HD video quality. You receive a detailed program guide, video recordings of your personalized routine, WhatsApp support between sessions, and regular progress check-ins. Clients from 40+ countries successfully follow our online programs with the same results as in-person sessions.',
  },
  {
    q: 'How long before I see results from the wellness programs?',
    a: 'Most clients begin noticing changes in energy, mood, and sleep quality within the first 2 weeks. More significant health transformations — like hormonal balance, weight management, or stress reduction — typically become measurable by weeks 4-6. Results vary based on consistency, program type, and individual constitution, but our 98% satisfaction rate speaks to the effectiveness of our approach.',
  },
  {
    q: 'What does a typical Ayurvedic consultation involve?',
    a: 'A consultation begins with a comprehensive Prakriti (body constitution) analysis through pulse diagnosis, physical assessment, and an in-depth lifestyle questionnaire. We then discuss your health history, goals, and concerns. You receive a personalized wellness plan covering diet, daily routines (Dinacharya), herbal recommendations, yoga and pranayama practices, and lifestyle modifications tailored specifically to your constitution.',
  },
  {
    q: 'Are the herbal recommendations safe? Do you use certified products?',
    a: 'Yes, all our herbal and Ayurvedic product recommendations are from certified, GMP-compliant manufacturers. We only recommend herbs after thorough assessment to ensure they are appropriate for your constitution and health status. We always advise clients to consult with their primary care physician if they are on medications, as some herbs may interact with pharmaceutical drugs. Your safety is our highest priority.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, white 100%)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 text-white" style={{ background: 'linear-gradient(135deg, #00BCD4, #7B2D8B)' }}>
            Got Questions?
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}
          >
            Frequently Asked{' '}
            <span style={{ background: 'linear-gradient(135deg, #00BCD4, #7B2D8B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Questions
            </span>
          </h2>
          <p className="text-gray-500">
            Everything you need to know about our wellness approach and programs.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
              style={{
                border: openIndex === i ? '1px solid #FF6B3550' : '1px solid #e5e7eb',
                boxShadow: openIndex === i ? '0 4px 20px rgba(255,107,53,0.1)' : 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-orange-50/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span
                  className="font-semibold text-base pr-4"
                  style={{
                    color: openIndex === i ? '#FF6B35' : '#1A1A2E',
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  {faq.q}
                </span>
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: openIndex === i ? 'linear-gradient(135deg, #FF6B35, #FFD700)' : '#f3f4f6',
                  }}
                >
                  {openIndex === i
                    ? <Minus size={16} className="text-white" />
                    : <Plus size={16} className="text-gray-500" />
                  }
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden bg-white"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed text-sm border-t border-orange-100">
                      <div className="pt-4">{faq.a}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 p-8 rounded-3xl"
          style={{ background: 'linear-gradient(135deg, #FF6B3510, #FFD70010)', border: '1px solid #FF6B3530' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 font-medium mb-4">
            Still have questions? We&apos;re here to help!
          </p>
          <a
            href="https://wa.me/91XXXXXXXXXX?text=Hi%20YogAyur%20Bliss!%20I%20have%20a%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-7 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{ background: '#25D366' }}
          >
            💬 Chat with us on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
