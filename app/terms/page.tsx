import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen" style={{ background: '#FFF8F0' }}>
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-3xl p-10 shadow-lg">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>Terms of Service</h1>
            <p className="text-gray-400 text-sm mb-8">Last updated: November 2024</p>

            {[
              { title: '1. Acceptance of Terms', content: 'By accessing YogAyur Bliss services, you agree to these terms. Our services are for general wellness purposes and do not constitute medical advice.' },
              { title: '2. Wellness Services Disclaimer', content: 'YogAyur Bliss provides Ayurvedic wellness guidance and yoga therapy. These services complement but do not replace professional medical care. Always consult a physician for medical conditions.' },
              { title: '3. Booking & Cancellations', content: 'Sessions must be cancelled at least 24 hours in advance for a full refund. Late cancellations may incur a fee. We reserve the right to reschedule sessions with 24-hour notice.' },
              { title: '4. Program Participation', content: 'You are responsible for providing accurate health information. Follow all safety instructions during yoga sessions. Stop any practice that causes pain or discomfort and consult us immediately.' },
              { title: '5. Intellectual Property', content: 'All content, programs, and materials on this website are proprietary to YogAyur Bliss. Reproduction without permission is prohibited.' },
              { title: '6. Payment Terms', content: 'Payment is due before program commencement. We accept major payment methods. Prices are subject to change with reasonable notice.' },
              { title: '7. Limitation of Liability', content: 'YogAyur Bliss is not liable for any indirect damages arising from use of our services. Our liability is limited to the amount paid for services.' },
              { title: '8. Contact', content: 'Questions about these terms? Contact: info@yogayurbliss.com | +91 XXXXXXXXXX' },
            ].map(section => (
              <div key={section.title} className="mb-8">
                <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#FF6B35' }}>
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
