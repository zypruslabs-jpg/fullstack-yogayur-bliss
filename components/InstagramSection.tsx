'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import InstagramIcon from '@/components/icons/InstagramIcon';

const placeholderPosts = [
  { id: 1, emoji: '🧘', caption: 'Morning yoga flow for inner peace', likes: 342, color: 'from-orange-400 to-pink-400' },
  { id: 2, emoji: '🌿', caption: 'Ayurvedic morning rituals', likes: 528, color: 'from-green-400 to-teal-400' },
  { id: 3, emoji: '🌸', caption: 'Lotus meditation session', likes: 415, color: 'from-pink-400 to-purple-400' },
  { id: 4, emoji: '💛', caption: 'Golden hour pranayama', likes: 289, color: 'from-yellow-400 to-orange-400' },
  { id: 5, emoji: '🔮', caption: 'Chakra healing journey', likes: 673, color: 'from-purple-400 to-indigo-400' },
  { id: 6, emoji: '🌊', caption: 'Stress-free with Ayurveda', likes: 391, color: 'from-cyan-400 to-blue-400' },
];

export default function InstagramSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="wrap">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 text-white"
            style={{ background: 'linear-gradient(135deg, #FF6B35, #FF85A1, #7B2D8B)' }}
          >
            <InstagramIcon size={16} />
            Follow Our Journey
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}
          >
            Daily Wellness{' '}
            <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FF85A1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Inspiration
            </span>
          </h2>
          <p className="text-gray-500 mb-2">
            Follow{' '}
            <a
              href="https://www.instagram.com/yogayurbliss"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
              style={{ color: '#FF6B35' }}
            >
              @yogayurbliss
            </a>{' '}
            for daily wellness tips, yoga flows, and Ayurvedic wisdom.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Grid */}
        <div className="col6" style={{marginBottom:"32px"}}>
          {placeholderPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/yogayurbliss"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className={`aspect-square rounded-2xl bg-gradient-to-br ${post.color} flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer`}
            >
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 p-3">
                <ExternalLink size={20} className="text-white" />
                <span className="text-white text-xs font-medium text-center leading-tight">{post.caption}</span>
                <span className="text-white/80 text-xs">♥ {post.likes}</span>
              </div>
              <span className="text-4xl">{post.emoji}</span>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="https://www.instagram.com/yogayurbliss"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #FF6B35, #FF85A1, #7B2D8B)' }}
          >
            <InstagramIcon size={20} />
            Follow @yogayurbliss on Instagram
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
