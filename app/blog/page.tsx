import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Wellness Blog | Ayurveda, Yoga & Holistic Health — YogAyur Bliss",
  description: "Explore our wellness knowledge hub — articles on Ayurveda, yoga, meditation, nutrition, and holistic lifestyle for a healthier, more balanced life.",
};

const posts = [
  { category: "Ayurveda", title: "Understanding Your Dosha: The Foundation of Ayurvedic Health", excerpt: "Discover how knowing your unique mind-body constitution can transform your health and wellness journey.", time: "8 min read", tag: "🌿" },
  { category: "Yoga", title: "5 Morning Yoga Poses That Transform Your Entire Day", excerpt: "Start your mornings with these powerful asanas that energise the body, calm the mind, and set a positive tone.", time: "6 min read", tag: "🧘" },
  { category: "Nutrition", title: "Eating According to Ayurveda: A Practical Beginner's Guide", excerpt: "Learn how to use food as medicine with simple, delicious Ayurvedic eating principles for your constitution.", time: "10 min read", tag: "🥗" },
  { category: "Meditation", title: "How 10 Minutes of Daily Meditation Rewires Your Brain", excerpt: "Scientific evidence and ancient wisdom align — here is what consistent meditation does to your mental health.", time: "7 min read", tag: "🕉️" },
  { category: "Lifestyle", title: "Dinacharya: The Ayurvedic Daily Routine for Optimal Health", excerpt: "Ancient Ayurvedic daily routine practices that modern science now confirms for health, energy, and longevity.", time: "9 min read", tag: "✨" },
  { category: "Women's Health", title: "Ayurveda & PCOS: A Natural Path to Hormonal Balance", excerpt: "How Ayurvedic herbs, yoga therapy, and lifestyle changes can support hormonal health and PCOS management.", time: "12 min read", tag: "🌸" },
];

const categories = ["All", "Ayurveda", "Yoga", "Meditation", "Nutrition", "Lifestyle", "Women's Health"];

export default function BlogPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block font-body text-xs font-medium text-gold-300 tracking-widest uppercase bg-white/10 px-3 py-1.5 rounded-full mb-4">Knowledge Hub</div>
          <h1 className="font-heading font-bold text-5xl sm:text-6xl text-white mb-6">Wellness Blog</h1>
          <p className="font-subheading text-xl text-white/80 italic">Ancient wisdom, modern insights — your guide to holistic living</p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((cat) => (
              <button key={cat} className="font-body text-sm px-4 py-2 rounded-full border border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all text-emerald-700">
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.title} className="premium-card rounded-2xl overflow-hidden cursor-pointer group">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 h-48 flex items-center justify-center text-6xl">
                  {post.tag}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-body text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">{post.category}</span>
                    <span className="font-body text-xs text-gray-400">{post.time}</span>
                  </div>
                  <h2 className="font-heading font-semibold text-lg text-charcoal mb-2 group-hover:text-emerald-600 transition-colors leading-snug">{post.title}</h2>
                  <p className="font-body text-sm text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-emerald-600 font-body text-sm font-medium group-hover:gap-2 transition-all">
                    Read Article <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
