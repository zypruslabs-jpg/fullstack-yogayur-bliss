import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Wellness Programs | YogAyur Bliss",
  description: "Structured Ayurveda and Yoga wellness programs for stress relief, weight management, gut health, sleep, women's wellness, detox, diabetes, and PCOS.",
};

const programs = [
  { icon: "🧘‍♀️", title: "Stress Relief Program", duration: "4 Weeks", sessions: "12 Sessions", price: "Book for Price", color: "#0D5C3A", desc: "A comprehensive program combining yoga therapy, pranayama, Ayurvedic herbs, and mindfulness to permanently reduce stress, anxiety, and burnout.", includes: ["Daily yoga sequence", "Pranayama techniques", "Ayurvedic stress herbs", "Sleep optimization", "Mindfulness practices", "24/7 WhatsApp support"] },
  { icon: "⚖️", title: "Weight Management", duration: "8 Weeks", sessions: "24 Sessions", price: "Book for Price", color: "#C9A84C", desc: "Ayurveda-based holistic weight management that addresses the root cause — digestive fire, metabolism, and healthy lifestyle habits.", includes: ["Dosha-based meal plan", "Metabolic yoga sequence", "Agni-boosting herbs", "Weekly consultations", "Grocery guides", "Progress tracking"] },
  { icon: "🌱", title: "Gut Health Program", duration: "6 Weeks", sessions: "18 Sessions", price: "Book for Price", color: "#E07B39", desc: "Heal your digestive system naturally with Ayurvedic Agni therapy, specific yoga asanas, and targeted nutrition plans.", includes: ["Gut-healing diet plan", "Digestive yoga sequence", "Probiotic herbs", "Detox protocols", "Anti-inflammatory recipes", "Lifestyle modifications"] },
  { icon: "🌙", title: "Sleep Improvement", duration: "3 Weeks", sessions: "9 Sessions", price: "Book for Price", color: "#6B7FD4", desc: "Restore deep, restorative sleep naturally through Ayurvedic evening rituals, sleep yoga, and nervous system regulation.", includes: ["Sleep hygiene protocol", "Evening yoga nidra", "Ashwagandha routine", "Circadian realignment", "Relaxation techniques", "Vata-calming diet"] },
  { icon: "🌸", title: "Women's Wellness", duration: "6 Weeks", sessions: "18 Sessions", price: "Book for Price", color: "#D4607B", desc: "Holistic support for women's health including hormonal balance, menstrual wellness, reproductive health, and emotional wellbeing.", includes: ["Hormonal balance yoga", "Menstrual care herbs", "Fertility support", "Emotional healing", "Bone density care", "Nutrition for women"] },
  { icon: "🍃", title: "21-Day Detox", duration: "21 Days", sessions: "Guided Daily", price: "Book for Price", color: "#3D9F72", desc: "A complete Ayurvedic Panchakarma-inspired gentle detox to cleanse your body, reset digestion, and restore vitality.", includes: ["Kitchari cleanse guide", "Daily detox yoga", "Triphala protocol", "Oil pulling & abhyanga", "Detox journal", "Post-detox maintenance"] },
  { icon: "🩺", title: "Diabetes Lifestyle", duration: "8 Weeks", sessions: "24 Sessions", price: "Book for Price", color: "#5B8ECC", desc: "Evidence-based Ayurvedic lifestyle program to manage blood sugar naturally through diet, specific yoga, and herbal support.", includes: ["Blood sugar yoga", "Anti-diabetic herbs", "GI-friendly meal plans", "Walking & movement", "Stress management", "Weekly monitoring"] },
  { icon: "🌺", title: "PCOS Wellness", duration: "12 Weeks", sessions: "36 Sessions", price: "Book for Price", color: "#B86EB5", desc: "A comprehensive holistic program addressing PCOS through hormonal yoga, Ayurvedic treatment, anti-inflammatory diet, and emotional healing.", includes: ["Hormonal yoga therapy", "PCOS-specific herbs", "Anti-inflammatory diet", "Insulin resistance care", "Emotional support", "Fertility guidance"] },
];

export default function ProgramsPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block font-body text-xs font-medium text-gold-300 tracking-widest uppercase bg-white/10 px-3 py-1.5 rounded-full mb-4">Structured Programs</div>
          <h1 className="font-heading font-bold text-5xl sm:text-6xl text-white mb-6">Wellness Programs</h1>
          <p className="font-subheading text-xl text-white/80 italic">Outcome-focused programs designed for your specific health goals</p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((p) => (
              <div key={p.title} className="premium-card rounded-3xl overflow-hidden">
                <div className="p-1" style={{ background: p.color }} />
                <div className="p-7">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{p.icon}</div>
                      <div>
                        <h2 className="font-heading font-bold text-xl text-charcoal">{p.title}</h2>
                        <div className="flex gap-3 mt-1">
                          <span className="font-body text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{p.duration}</span>
                          <span className="font-body text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{p.sessions}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="font-body text-sm text-gray-600 leading-relaxed mb-5">{p.desc}</p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {p.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="font-body text-xs text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={`https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(p.title)}%20program`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-body font-semibold text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                    style={{ background: p.color }}
                  >
                    Enquire & Book <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
