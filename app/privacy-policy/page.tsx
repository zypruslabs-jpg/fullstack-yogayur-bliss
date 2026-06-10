import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen" style={{ background: '#FFF8F0' }}>
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-3xl p-10 shadow-lg">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}>Privacy Policy</h1>
            <p className="text-gray-400 text-sm mb-8">Last updated: November 2024</p>

            {[
              { title: '1. Information We Collect', content: 'We collect information you provide directly, including your name, email address, phone number, and health information you share during consultations or when booking appointments. We also collect usage data about how you interact with our website.' },
              { title: '2. How We Use Your Information', content: 'We use your information to provide and improve our wellness services, communicate with you about appointments and programs, send wellness tips and content (with your consent), and process bookings and payments.' },
              { title: '3. Health Information', content: 'Health information you share is treated with the utmost confidentiality. We never share your personal health data with third parties without your explicit consent, except as required by law.' },
              { title: '4. Data Security', content: 'We implement industry-standard security measures including SSL encryption, secure database storage via Supabase, and access controls to protect your personal information from unauthorized access.' },
              { title: '5. Cookies', content: 'We use essential cookies to ensure the website functions properly. Analytics cookies help us understand how visitors use our site. You can disable cookies through your browser settings.' },
              { title: '6. Third-Party Services', content: 'We use Supabase for data storage and WhatsApp for communication. These services have their own privacy policies. We recommend reviewing them.' },
              { title: '7. Your Rights', content: 'You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at info@yogayurbliss.com. We will respond within 30 days.' },
              { title: '8. Contact Us', content: 'For privacy-related questions, contact: info@yogayurbliss.com | +91 XXXXXXXXXX | yogayurbliss.com' },
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
