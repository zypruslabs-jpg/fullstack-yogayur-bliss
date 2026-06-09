import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | YogAyur Bliss",
  description: "YogAyur Bliss privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">Privacy Policy</h1>
          <p className="font-body text-white/70">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="prose prose-emerald max-w-none">
            {[
              { title: "Information We Collect", body: "We collect information you provide directly — such as name, email, phone number, and wellness goals when you book a consultation, fill our contact form, or communicate with us via WhatsApp or email." },
              { title: "How We Use Your Information", body: "Your information is used to: respond to your inquiries, schedule consultations, personalise your wellness program, send relevant health tips (with your consent), and improve our services." },
              { title: "Data Protection", body: "We take the security of your personal information seriously. Your data is stored securely and is never sold or shared with third parties for marketing purposes. We use industry-standard encryption." },
              { title: "Third-Party Services", body: "We may use trusted third-party services such as Google Analytics, WhatsApp Business, and Formspree for analytics and communication. These services have their own privacy policies." },
              { title: "Your Rights", body: "You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at info@yogayurbliss.com." },
              { title: "Cookies", body: "Our website uses essential cookies for functionality and analytics cookies (with your consent) to improve user experience. You can control cookie preferences through your browser settings." },
              { title: "Contact Us", body: "For privacy-related questions, email us at info@yogayurbliss.com or WhatsApp us at +91-XXXXXXXXXX." },
            ].map((section) => (
              <div key={section.title} className="mb-8">
                <h2 className="font-heading font-bold text-xl text-charcoal mb-3">{section.title}</h2>
                <p className="font-body text-gray-600 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
