import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ContactSection from '@/components/ContactSection';
import FAQSection from '@/components/FAQSection';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section
          className="py-24 text-center"
          style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #F0FFF4 100%)' }}
        >
          <div className="max-w-3xl mx-auto px-4">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 text-white" style={{ background: 'rgba(255,107,53,0.3)', border: '1px solid rgba(255,107,53,0.5)' }}>
              Contact Us
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>
              Start Your{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Wellness Journey
              </span>
            </h1>
            <p className="text-gray-500 text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Book your free 30-minute consultation. We respond within 2 hours.
            </p>
          </div>
        </section>
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
