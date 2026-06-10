import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section
          className="py-24 text-center"
          style={{ background: 'linear-gradient(135deg, #0a0015 0%, #1a0a2e 100%)' }}
        >
          <div className="max-w-3xl mx-auto px-4">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 text-white" style={{ background: 'rgba(255,107,53,0.3)', border: '1px solid rgba(255,107,53,0.5)' }}>
              Our Services
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Holistic Wellness{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFD700, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Services
              </span>
            </h1>
            <p className="text-gray-300 text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Every service is personalized to your unique Prakriti and wellness goals.
            </p>
          </div>
        </section>
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
