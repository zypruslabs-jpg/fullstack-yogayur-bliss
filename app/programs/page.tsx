import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProgramsSection from '@/components/ProgramsSection';
import ContactSection from '@/components/ContactSection';

export default function ProgramsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section
          className="py-24 text-center"
          style={{ background: 'linear-gradient(135deg, #0a0015 0%, #1a0a2e 100%)' }}
        >
          <div className="max-w-3xl mx-auto px-4">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 text-white" style={{ background: 'rgba(123,45,139,0.4)', border: '1px solid rgba(123,45,139,0.6)' }}>
              Wellness Programs
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Structured Programs for{' '}
              <span style={{ background: 'linear-gradient(135deg, #FF85A1, #7B2D8B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Real Results
              </span>
            </h1>
            <p className="text-gray-300 text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Choose from 8 comprehensive programs designed for specific health goals.
            </p>
          </div>
        </section>
        <ProgramsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
