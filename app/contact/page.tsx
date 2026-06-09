import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Book Consultation — YogAyur Bliss",
  description: "Book your Ayurveda and Yoga consultation with YogAyur Bliss. Contact us via WhatsApp, email, or fill in our online booking form.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block font-body text-xs font-medium text-gold-300 tracking-widest uppercase bg-white/10 px-3 py-1.5 rounded-full mb-4">Get In Touch</div>
          <h1 className="font-heading font-bold text-5xl sm:text-6xl text-white mb-6">Contact Us</h1>
          <p className="font-subheading text-xl text-white/80 italic">Begin your wellness journey — we are here to guide you</p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading font-bold text-3xl text-charcoal mb-6">Let us Connect</h2>
              <div className="section-divider mb-6" />
              <p className="font-body text-gray-600 leading-relaxed mb-8">
                Have questions about our programs? Ready to book a consultation? We would love to hear from you. Reach out through any of the channels below.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: "📞", title: "Phone & WhatsApp", val: "+91-XXXXXXXXXX", href: "tel:+91XXXXXXXXXX" },
                  { icon: "📧", title: "Email", val: "info@yogayurbliss.com", href: "mailto:info@yogayurbliss.com" },
                  { icon: "📍", title: "Location", val: "India | Online Sessions Worldwide", href: "#" },
                  { icon: "📱", title: "Instagram", val: "@yogayurbliss", href: "https://www.instagram.com/yogayurbliss" },
                  { icon: "⏰", title: "Working Hours", val: "Mon – Sat: 7 AM – 8 PM IST", href: "#" },
                ].map((item) => (
                  <a key={item.title} href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="font-body text-xs text-gray-400 mb-0.5">{item.title}</p>
                      <p className="font-body text-sm font-semibold text-charcoal group-hover:text-emerald-600 transition-colors">{item.val}</p>
                    </div>
                  </a>
                ))}
              </div>

              <a href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20book%20a%20consultation%20with%20YogAyur%20Bliss"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-body font-semibold px-7 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp — Instant Reply
              </a>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="font-heading font-semibold text-2xl text-charcoal mb-2">Book a Consultation</h3>
              <p className="font-body text-sm text-gray-500 mb-6">Free 15-minute discovery call. No commitment required.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
