'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Calendar, User, ArrowRight } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  category: string;
  author: string;
  published: boolean;
  created_at: string;
};

const placeholderPosts: BlogPost[] = [
  { id: '1', title: '7 Ayurvedic Morning Rituals That Will Transform Your Day', slug: 'ayurvedic-morning-rituals', excerpt: 'Discover the ancient Dinacharya practices that Ayurveda recommends for starting your day with clarity, energy, and optimal health.', cover_image: '', category: 'Ayurveda', author: 'Dr. Ananya Sharma', published: true, created_at: '2024-11-15' },
  { id: '2', title: 'Understanding Your Prakriti: The Foundation of Ayurvedic Health', slug: 'understanding-prakriti', excerpt: 'Your Prakriti — or body constitution — is the key to understanding why you thrive on certain foods, activities, and environments.', cover_image: '', category: 'Ayurveda', author: 'Dr. Ananya Sharma', published: true, created_at: '2024-11-08' },
  { id: '3', title: 'Yoga for Stress Relief: 5 Poses That Actually Work', slug: 'yoga-stress-relief-poses', excerpt: 'Modern stress has ancient solutions. These five therapeutic yoga poses activate the parasympathetic nervous system for instant calm.', cover_image: '', category: 'Yoga', author: 'Priya Nair', published: true, created_at: '2024-11-01' },
  { id: '4', title: 'The Gut-Brain Connection: How Ayurveda Heals Both', slug: 'gut-brain-ayurveda', excerpt: 'Ayurveda recognized the gut-brain connection 5,000 years ago. Modern science is just catching up to what ancient healers always knew.', cover_image: '', category: 'Wellness', author: 'Dr. Rahul Verma', published: true, created_at: '2024-10-25' },
  { id: '5', title: 'Pranayama for Beginners: Breathe Your Way to Better Health', slug: 'pranayama-beginners', excerpt: 'The breath is your most powerful tool for transformation. Learn the five foundational pranayama techniques to change your health.', cover_image: '', category: 'Yoga', author: 'Priya Nair', published: true, created_at: '2024-10-18' },
  { id: '6', title: 'PCOS & Ayurveda: A Natural Path to Hormonal Balance', slug: 'pcos-ayurveda-hormonal-balance', excerpt: 'Thousands of women have found relief from PCOS through Ayurvedic protocols. Here is what the research and ancient texts both recommend.', cover_image: '', category: 'Women\'s Health', author: 'Meena Krishnan', published: true, created_at: '2024-10-10' },
];

const categoryColors: Record<string, string> = {
  Ayurveda: '#00A86B',
  Yoga: '#FF6B35',
  Wellness: '#FFD700',
  "Women's Health": '#FF85A1',
  Meditation: '#7B2D8B',
  Nutrition: '#00BCD4',
};

const categoryEmojis: Record<string, string> = {
  Ayurveda: '🌿',
  Yoga: '🧘',
  Wellness: '✨',
  "Women's Health": '🌸',
  Meditation: '🔮',
  Nutrition: '🥗',
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(placeholderPosts);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(({ data }) => { if (data?.length) setPosts(data); })
      .catch(() => {});
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];
  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 text-center" style={{ background: 'linear-gradient(135deg, #0a0015 0%, #1a0a2e 100%)' }}>
          <div className="max-w-3xl mx-auto px-4">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 text-white" style={{ background: 'rgba(0,168,107,0.3)', border: '1px solid rgba(0,168,107,0.5)' }}>
              Wellness Blog
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Ancient Wisdom,{' '}
              <span style={{ background: 'linear-gradient(135deg, #00A86B, #00BCD4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Modern Insights
              </span>
            </h1>
            <p className="text-gray-300 text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Ayurveda, Yoga, and holistic wellness — expert articles for your journey.
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16 lg:py-20" style={{ background: 'linear-gradient(180deg, #FFF8F0, white)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: activeCategory === cat ? 'linear-gradient(135deg, #FF6B35, #FFD700)' : 'white',
                    color: activeCategory === cat ? 'white' : '#1A1A2E',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                    border: activeCategory === cat ? 'none' : '1px solid #e5e7eb',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => {
                const color = categoryColors[post.category] || '#FF6B35';
                const emoji = categoryEmojis[post.category] || '✨';
                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-3xl overflow-hidden group"
                    style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.08)' }}
                  >
                    {/* Cover */}
                    <div
                      className="h-48 flex items-center justify-center text-7xl relative"
                      style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }}
                    >
                      <span>{emoji}</span>
                      <div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ background: color }}
                      >
                        {post.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {post.author}
                        </span>
                      </div>
                      <h2 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {post.title}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:gap-3"
                        style={{ color }}
                      >
                        Read Article <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
