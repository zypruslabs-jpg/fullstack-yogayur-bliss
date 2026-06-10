import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen" style={{ background: '#FFF8F0' }}>
        <div className="max-w-3xl mx-auto px-4 py-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:text-orange-500 transition-colors" style={{ color: '#FF6B35' }}>
            ← Back to Blog
          </Link>
          <div className="bg-white rounded-3xl p-10 shadow-lg">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 text-white" style={{ background: '#FF6B35' }}>
              Ayurveda
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>
              Article: {params.slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
            </h1>
            <p className="text-gray-500 mb-8">This article is being loaded from our database. Please ensure your Supabase connection is configured.</p>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌿</div>
              <p className="text-gray-500 mb-6">Full article content will appear here once connected to Supabase.</p>
              <Link href="/blog" className="inline-block px-6 py-3 rounded-full font-semibold text-white" style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}>
                Browse All Articles
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
