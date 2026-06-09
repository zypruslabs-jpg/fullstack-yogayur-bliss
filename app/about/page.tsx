import type { Metadata } from "next";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About YogAyur Bliss | Our Story, Mission & Vision",
  description: "Learn about YogAyur Bliss — our mission to transform lives through ancient Ayurvedic wisdom and modern yoga therapy.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-hero-gradient relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block font-body text-xs font-medium text-gold-300 tracking-widest uppercase bg-white/10 px-3 py-1.5 rounded-full mb-4">Our Story</div>
          <h1 className="font-heading font-bold text-5xl sm:text-6xl text-white mb-6">About YogAyur Bliss</h1>
          <p className="font-subheading text-xl text-white/80 italic leading-relaxed">
            A sanctuary where ancient Ayurvedic wisdom meets modern wellness science
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading font-bold text-4xl text-charcoal mb-6">Our Mission</h2>
              <div className="section-divider mb-6" />
              <p className="font-body text-gray-600 leading-relaxed mb-5">
                YogAyur Bliss was founded with a profound purpose: to make authentic Ayurvedic healing and transformative yoga therapy accessible to everyone, everywhere.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-5">
                We believe that optimal health is every person's birthright. Through the timeless sciences of Ayurveda and Yoga, we guide individuals back to their natural state of vitality, clarity, and balance.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-8">
                Our holistic approach treats each person as a unique individual — understanding your constitution, lifestyle, and specific health challenges to create a personalised wellness journey that delivers lasting results.
              </p>
              <div className="space-y-3">
                {[
                  "Personalised Ayurvedic wellness programs",
                  "Certified yoga and meditation practitioners",
                  "Evidence-based holistic health coaching",
                  "Online sessions available worldwide",
                  "Supportive wellness community",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                    <span className="font-body text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              {[
                { title: "Our Vision", icon: "🌟", desc: "To create a world where every individual has access to the transformative power of Ayurveda and Yoga — achieving vibrant health, inner peace, and purposeful living." },
                { title: "Our Values", icon: "🌿", desc: "Authenticity, compassion, personalisation, and excellence. We honour ancient wisdom while embracing modern science to deliver the most effective wellness outcomes." },
                { title: "Our Approach", icon: "🧘", desc: "We do not offer one-size-fits-all solutions. Every program is designed around your unique constitution, health history, lifestyle, and wellness goals." },
              ].map((card) => (
                <div key={card.title} className="premium-card rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{card.icon}</span>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-charcoal mb-2">{card.title}</h3>
                      <p className="font-body text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl text-charcoal mb-4">Ready to Begin Your Journey?</h2>
          <p className="font-body text-gray-600 mb-8">Book a free 15-minute discovery call and let us understand your wellness goals.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20book%20a%20consultation"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-body font-semibold px-8 py-4 rounded-full shadow-lg transition-all hover:-translate-y-0.5"
            >
              Book Free Consultation <ArrowRight size={18} />
            </a>
            <Link href="/services"
              className="inline-flex items-center gap-2 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-body font-semibold px-8 py-4 rounded-full transition-all"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
