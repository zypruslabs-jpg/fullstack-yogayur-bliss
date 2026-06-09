import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wellness Services | YogAyur Bliss",
  description: "Explore YogAyur Bliss services: Yoga therapy, Ayurvedic consultation, meditation, diet & nutrition, stress management, lifestyle coaching, and corporate wellness programs.",
};

const services = [
  { icon: "🧘", title: "Yoga Therapy", desc: "Personalised therapeutic yoga sessions designed to heal chronic conditions, improve mobility, relieve pain, and restore mental clarity. Tailored for your unique constitution and health needs.", benefits: ["Chronic pain relief", "Improved flexibility", "Mental clarity", "Injury rehabilitation"] },
  { icon: "🌿", title: "Ayurvedic Consultation", desc: "In-depth Ayurvedic assessment to determine your dosha, imbalances, and a complete plan including herbs, diet, daily routines, and lifestyle changes for lasting wellness.", benefits: ["Dosha assessment", "Personalised herbal plan", "Diet guidance", "Lifestyle roadmap"] },
  { icon: "🕉️", title: "Meditation Sessions", desc: "Ancient meditation techniques including Vipassana, Mantra, Trataka, and Yoga Nidra to calm the mind, reduce anxiety, and expand consciousness.", benefits: ["Reduced anxiety", "Better focus", "Emotional balance", "Deep relaxation"] },
  { icon: "🥗", title: "Diet & Nutrition Guidance", desc: "Ayurveda-based personalised nutrition plans aligned with your body type, season, and health goals. Learn to eat as medicine.", benefits: ["Personalised meal plans", "Seasonal eating", "Digestive health", "Natural detox"] },
  { icon: "💆", title: "Stress Management", desc: "Comprehensive evidence-based programs combining yoga, pranayama, Ayurveda, and mindfulness for lasting stress relief and mental resilience.", benefits: ["Cortisol reduction", "Sleep improvement", "Resilience building", "Burnout recovery"] },
  { icon: "✨", title: "Lifestyle Coaching", desc: "Transform your daily routine through Dinacharya — the Ayurvedic art of living. Sleep, wake, eat, and move in harmony with nature's rhythms.", benefits: ["Morning routines", "Evening rituals", "Energy optimization", "Healthy habits"] },
  { icon: "💻", title: "Online Wellness Sessions", desc: "All our services are available online via video call. Flexible scheduling, same expert care, accessible from anywhere in the world.", benefits: ["Flexible timing", "Global access", "One-on-one attention", "Recorded sessions"] },
  { icon: "🏢", title: "Corporate Wellness Programs", desc: "Tailored workplace wellness initiatives to boost employee health, focus, productivity, and reduce absenteeism through yoga and Ayurveda.", benefits: ["Team wellness workshops", "Stress reduction", "Productivity boost", "Employee retention"] },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block font-body text-xs font-medium text-gold-300 tracking-widest uppercase bg-white/10 px-3 py-1.5 rounded-full mb-4">What We Offer</div>
          <h1 className="font-heading font-bold text-5xl sm:text-6xl text-white mb-6">Our Wellness Services</h1>
          <p className="font-subheading text-xl text-white/80 italic">Comprehensive holistic services for your complete wellbeing</p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s) => (
              <div key={s.title} className="premium-card rounded-3xl p-8">
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-3xl flex-shrink-0">{s.icon}</div>
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-charcoal mb-2">{s.title}</h2>
                    <p className="font-body text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {s.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 bg-emerald-50 rounded-lg px-3 py-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                      <span className="font-body text-xs text-emerald-800">{b}</span>
                    </div>
                  ))}
                </div>
                <a href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20the%20service"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-body font-semibold text-sm group"
                >
                  Book This Service <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-dark text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl mb-4">Not Sure Where to Start?</h2>
          <p className="font-body text-white/70 mb-8">Book a free discovery call and we will recommend the perfect service for your needs.</p>
          <a href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20need%20help%20choosing%20the%20right%20wellness%20service"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-DEFAULT hover:bg-gold-light text-emerald-dark font-body font-semibold px-8 py-4 rounded-full shadow-xl transition-all hover:-translate-y-0.5"
          >
            Get Free Guidance <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
