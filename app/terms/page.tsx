import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | YogAyur Bliss",
  description: "YogAyur Bliss terms and conditions for using our wellness services and website.",
};

export default function TermsPage() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">Terms & Conditions</h1>
          <p className="font-body text-white/70">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-8">
            {[
              { title: "1. Acceptance of Terms", body: "By accessing or using YogAyur Bliss services, you agree to be bound by these Terms. If you do not agree, please do not use our services." },
              { title: "2. Services", body: "YogAyur Bliss provides Ayurvedic consultation, yoga therapy, meditation, and holistic wellness coaching. Our services are for general wellness purposes and do not replace professional medical advice, diagnosis, or treatment." },
              { title: "3. Medical Disclaimer", body: "Our wellness programs are complementary health services. Always consult a qualified medical doctor for medical conditions. Do not discontinue prescribed medication without medical guidance." },
              { title: "4. Booking & Cancellation", body: "Consultations can be booked via WhatsApp or our contact form. Cancellations must be made at least 24 hours in advance. Late cancellations may not be eligible for rescheduling." },
              { title: "5. Payment", body: "Program fees are communicated at the time of inquiry. Payments are accepted via UPI, bank transfer, or agreed payment methods. Fees are non-refundable once a session has been completed." },
              { title: "6. Intellectual Property", body: "All content on this website — including text, videos, guides, and programs — is the intellectual property of YogAyur Bliss and may not be reproduced without written permission." },
              { title: "7. Privacy", body: "Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms by reference." },
              { title: "8. Contact", body: "For questions about these terms, contact us at info@yogayurbliss.com or WhatsApp +91-XXXXXXXXXX." },
            ].map((s) => (
              <div key={s.title}>
                <h2 className="font-heading font-bold text-xl text-charcoal mb-3">{s.title}</h2>
                <p className="font-body text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
