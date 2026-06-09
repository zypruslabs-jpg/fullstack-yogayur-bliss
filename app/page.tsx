"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown, Star, CheckCircle2, ArrowRight, Leaf,
  Heart, Brain, Zap, Shield, Users, Globe
} from "lucide-react";
import ContactForm from "./components/ContactForm";

const LotusCanvas = dynamic(() => import("./components/LotusCanvas"), { ssr: false });

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  { icon: "🧘", title: "Yoga Therapy", desc: "Personalized therapeutic yoga for healing chronic conditions, mobility, and mental clarity.", color: "from-emerald-50 to-emerald-100" },
  { icon: "🌿", title: "Ayurvedic Consultation", desc: "Discover your dosha and receive tailored Ayurvedic remedies for lasting wellness.", color: "from-gold-50 to-amber-50" },
  { icon: "🕉️", title: "Meditation Sessions", desc: "Ancient meditation techniques to calm the mind, reduce anxiety, and expand awareness.", color: "from-purple-50 to-indigo-50" },
  { icon: "🥗", title: "Diet & Nutrition", desc: "Ayurveda-based personalized nutrition plans aligned with your body constitution.", color: "from-saffron/10 to-orange-50" },
  { icon: "💆", title: "Stress Management", desc: "Evidence-based programs combining yoga, breathwork and Ayurveda for deep relief.", color: "from-blue-50 to-cyan-50" },
  { icon: "✨", title: "Lifestyle Coaching", desc: "Daily routine transformation through Dinacharya — the Ayurvedic art of living well.", color: "from-rose-50 to-pink-50" },
  { icon: "💻", title: "Online Wellness", desc: "Flexible one-on-one virtual sessions accessible from anywhere in the world.", color: "from-teal-50 to-emerald-50" },
  { icon: "🏢", title: "Corporate Wellness", desc: "Tailored workplace wellness programs to boost team health, focus, and productivity.", color: "from-slate-50 to-gray-50" },
];

const programs = [
  { icon: "🧘‍♀️", title: "Stress Relief", duration: "4 Weeks", sessions: "12 Sessions", color: "#0D5C3A" },
  { icon: "⚖️", title: "Weight Management", duration: "8 Weeks", sessions: "24 Sessions", color: "#C9A84C" },
  { icon: "🌱", title: "Gut Health", duration: "6 Weeks", sessions: "18 Sessions", color: "#E07B39" },
  { icon: "🌙", title: "Sleep Improvement", duration: "3 Weeks", sessions: "9 Sessions", color: "#6B7FD4" },
  { icon: "🌸", title: "Women's Wellness", duration: "6 Weeks", sessions: "18 Sessions", color: "#D4607B" },
  { icon: "🍃", title: "Detox Program", duration: "21 Days", sessions: "Guided Daily", color: "#3D9F72" },
  { icon: "🩺", title: "Diabetes Lifestyle", duration: "8 Weeks", sessions: "24 Sessions", color: "#5B8ECC" },
  { icon: "🌺", title: "PCOS Wellness", duration: "12 Weeks", sessions: "36 Sessions", color: "#B86EB5" },
];

const whyUs = [
  { icon: <Heart size={24} />, title: "Holistic Approach", desc: "We treat the root cause, not symptoms — body, mind, and spirit in harmony." },
  { icon: <CheckCircle2 size={24} />, title: "Certified Experts", desc: "Our practitioners hold international certifications in Yoga and Ayurveda." },
  { icon: <Users size={24} />, title: "Personalised Care", desc: "Every program is uniquely designed for your constitution and health goals." },
  { icon: <Globe size={24} />, title: "Online & Offline", desc: "Accessible worldwide via video calls — start your journey from anywhere." },
  { icon: <Brain size={24} />, title: "Evidence-Based", desc: "Ancient wisdom validated with modern research and scientific principles." },
  { icon: <Shield size={24} />, title: "Safe & Natural", desc: "100% natural methods with no harmful side effects — pure healing always." },
];

const stats = [
  { number: "2500+", label: "Clients Transformed" },
  { number: "98%", label: "Satisfaction Rate" },
  { number: "8+", label: "Years Experience" },
  { number: "40+", label: "Countries Reached" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    text: "YogAyur Bliss transformed my health. My PCOS symptoms have reduced dramatically in just 3 months. The combination of Ayurveda and yoga worked wonders for my body.",
    program: "PCOS Wellness",
  },
  {
    name: "Sarah Mitchell",
    location: "London, UK",
    rating: 5,
    text: "I started with stress management program and it has been life-changing. I sleep better, feel calmer, and my energy levels are incredible. Highly recommend!",
    program: "Stress Relief",
  },
  {
    name: "Raj Patel",
    location: "Toronto, Canada",
    rating: 5,
    text: "The online sessions are seamless. My Ayurvedic consultation was so detailed and personalised. I've lost 12 kg and feel more vibrant than in my 20s!",
    program: "Weight Management",
  },
];

const faqs = [
  {
    q: "Are the sessions available online?",
    a: "Yes! All our consultations and wellness sessions are available online via video call. We serve clients across India, USA, UK, Canada, Australia, and worldwide.",
  },
  {
    q: "How is Ayurvedic consultation different from regular healthcare?",
    a: "Ayurveda focuses on your unique body constitution (Prakriti) and treats the root cause of imbalance rather than symptoms. It uses natural herbs, dietary changes, yoga, and lifestyle modifications for lasting wellness.",
  },
  {
    q: "How long before I see results?",
    a: "Most clients notice positive changes within 2–4 weeks. Deeper transformations take 6–12 weeks depending on your health condition, commitment, and individual constitution.",
  },
  {
    q: "Is it safe for children and elderly?",
    a: "Absolutely. Ayurveda and therapeutic yoga are safe for all ages. We customise programs specifically for children, elderly, and those with specific health conditions.",
  },
  {
    q: "What is the cost of consultation?",
    a: "We offer flexible pricing to suit different budgets. WhatsApp us or fill the contact form for a free 15-minute discovery call to understand your needs first.",
  },
  {
    q: "Do I need prior yoga experience?",
    a: "Not at all. Our yoga therapy programs are designed for complete beginners through advanced practitioners. We meet you exactly where you are.",
  },
];

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-emerald-300 shadow-md" : "border-gray-200"}`}>
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-subheading font-semibold text-lg text-charcoal">{q}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-emerald-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="font-body text-sm text-gray-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-gradient-radial from-emerald-600/30 via-transparent to-transparent" />

        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gold-DEFAULT/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl" />

        {/* 3D Lotus — right side */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <LotusCanvas />
        </div>

        {/* Mobile 3D (smaller) */}
        <div className="absolute right-0 top-1/4 w-full h-72 lg:hidden opacity-50">
          <LotusCanvas />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
              <Leaf size={14} className="text-gold-DEFAULT" />
              <span className="font-body text-xs text-gold-300 tracking-widest uppercase">
                Ancient Wisdom · Modern Healing
              </span>
            </div>

            <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Transform Your{" "}
              <span className="gold-shimmer">Mind, Body</span>
              <br />& Soul Naturally
            </h1>

            <p className="font-subheading text-xl sm:text-2xl text-white/80 leading-relaxed mb-10 font-light italic">
              Ancient Ayurvedic Wisdom & Modern Wellness Solutions<br className="hidden sm:block" />
              For A Balanced Life.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20book%20a%20free%20consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-DEFAULT hover:bg-gold-light text-emerald-dark font-body font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 text-base"
              >
                📅 Book Consultation
                <ArrowRight size={18} />
              </a>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 glass border border-white/30 hover:bg-white/20 text-white font-body font-medium px-8 py-4 rounded-full transition-all hover:-translate-y-1 text-base"
              >
                Explore Programs
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-heading font-bold text-2xl text-gold-DEFAULT">{s.number}</div>
                  <div className="font-body text-xs text-white/60 tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* ── About Strip ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block font-body text-xs font-medium text-emerald-600 tracking-widest uppercase bg-emerald-50 px-3 py-1.5 rounded-full mb-4">
                Our Story
              </div>
              <h2 className="font-heading font-bold text-4xl sm:text-5xl text-charcoal leading-tight mb-6">
                Rooted in Ancient Wisdom,<br />
                <span className="text-emerald-600">Built for Modern Life</span>
              </h2>
              <div className="section-divider mb-6" />
              <p className="font-body text-gray-600 leading-relaxed mb-5">
                YogAyur Bliss was born from a simple belief: true health is not the absence of disease, but a state of complete harmony between body, mind, and spirit.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-8">
                Combining 5,000 years of Ayurvedic wisdom with evidence-based modern practices, we have helped thousands of individuals across the world reclaim their health, vitality, and inner peace.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                {[
                  "Certified Ayurvedic Practitioners",
                  "RYT-500 Yoga Teachers",
                  "Evidence-Based Methods",
                  "Personalised Programs",
                ].map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span className="font-body text-sm text-gray-700">{badge}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-body font-semibold group"
              >
                Our Full Story
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative">
              {/* Decorative cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: "🌿", title: "Ayurveda", desc: "5000 year old science of life" },
                  { emoji: "🧘", title: "Yoga", desc: "Union of body, mind & breath" },
                  { emoji: "🕉️", title: "Meditation", desc: "Gateway to inner stillness" },
                  { emoji: "🌱", title: "Natural Healing", desc: "Pure plant-based remedies" },
                ].map((card) => (
                  <div key={card.title} className="premium-card rounded-2xl p-5">
                    <div className="text-3xl mb-3">{card.emoji}</div>
                    <h4 className="font-heading font-semibold text-charcoal mb-1">{card.title}</h4>
                    <p className="font-body text-xs text-gray-500">{card.desc}</p>
                  </div>
                ))}
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -right-4 bg-emerald-600 text-white rounded-2xl px-5 py-4 shadow-xl">
                <div className="font-heading font-bold text-2xl">2500+</div>
                <div className="font-body text-xs text-emerald-200">Lives Transformed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block font-body text-xs font-medium text-emerald-600 tracking-widest uppercase bg-emerald-50 px-3 py-1.5 rounded-full mb-4">
              What We Offer
            </div>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-charcoal mb-4">
              Our Wellness Services
            </h2>
            <div className="section-divider mx-auto mb-5" />
            <p className="font-body text-gray-600">
              Comprehensive holistic services designed to heal, restore, and elevate your wellbeing naturally.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="premium-card rounded-2xl p-6 cursor-pointer group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <h3 className="font-heading font-semibold text-lg text-charcoal mb-2 group-hover:text-emerald-600 transition-colors">
                  {s.title}
                </h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-body font-semibold px-8 py-3.5 rounded-full transition-all"
            >
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Programs ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block font-body text-xs font-medium text-saffron tracking-widest uppercase bg-orange-50 px-3 py-1.5 rounded-full mb-4">
              Structured Programs
            </div>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-charcoal mb-4">
              Wellness Programs
            </h2>
            <div className="section-divider mx-auto mb-5" />
            <p className="font-body text-gray-600">
              Structured, outcome-focused programs designed for specific health goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((p) => (
              <div
                key={p.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                style={{ borderTopColor: p.color, borderTopWidth: 3 }}
              >
                <div className="p-6">
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <h3 className="font-heading font-semibold text-lg text-charcoal mb-3 group-hover:text-emerald-600 transition-colors">
                    {p.title}
                  </h3>
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-body text-xs text-gray-400">Duration:</span>
                      <span className="font-body text-xs font-medium text-charcoal">{p.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-body text-xs text-gray-400">Sessions:</span>
                      <span className="font-body text-xs font-medium text-charcoal">{p.sessions}</span>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20the%20wellness%20program"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium font-body text-emerald-600 hover:text-emerald-700"
                  >
                    Enquire Now <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-body font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Explore All Programs <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-emerald-dark to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gold-DEFAULT blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-emerald-300 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block font-body text-xs font-medium text-gold-300 tracking-widest uppercase bg-white/10 px-3 py-1.5 rounded-full mb-4">
              Why YogAyur Bliss
            </div>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-4">
              The Difference You'll Feel
            </h2>
            <div className="w-12 h-0.5 bg-gold-DEFAULT mx-auto mb-5" />
            <p className="font-body text-white/70">
              We don't just treat symptoms. We guide you toward lasting transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="glass rounded-2xl p-7 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gold-DEFAULT/20 flex items-center justify-center text-gold-DEFAULT mb-5">
                  {item.icon}
                </div>
                <h3 className="font-heading font-semibold text-xl text-white mb-2">{item.title}</h3>
                <p className="font-body text-sm text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block font-body text-xs font-medium text-emerald-600 tracking-widest uppercase bg-emerald-50 px-3 py-1.5 rounded-full mb-4">
              Client Stories
            </div>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-charcoal mb-4">
              Real Transformations
            </h2>
            <div className="section-divider mx-auto mb-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="premium-card rounded-2xl p-7">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-gold-DEFAULT fill-gold-DEFAULT" />
                  ))}
                </div>
                <p className="font-subheading text-lg text-gray-700 italic leading-relaxed mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-heading font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-charcoal">{t.name}</p>
                    <p className="font-body text-xs text-gray-400">{t.location} · {t.program}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div className="mt-10 text-center">
            <a
              href="https://www.instagram.com/yogayurbliss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-body font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow Us on Instagram @yogayurbliss
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block font-body text-xs font-medium text-emerald-600 tracking-widest uppercase bg-emerald-50 px-3 py-1.5 rounded-full mb-4">
              FAQ
            </div>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-charcoal mb-4">
              Frequently Asked Questions
            </h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact / Book CTA ────────────────────────────────────────────── */}
      <section className="py-20 bg-cream" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left info */}
            <div>
              <div className="inline-block font-body text-xs font-medium text-emerald-600 tracking-widest uppercase bg-emerald-50 px-3 py-1.5 rounded-full mb-4">
                Get In Touch
              </div>
              <h2 className="font-heading font-bold text-4xl sm:text-5xl text-charcoal leading-tight mb-6">
                Begin Your Wellness Journey Today
              </h2>
              <div className="section-divider mb-6" />
              <p className="font-body text-gray-600 leading-relaxed mb-8">
                Take the first step toward a healthier, more harmonious life. Book a free 15-minute discovery call and let us understand your unique wellness goals.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: "📞", label: "Phone / WhatsApp", value: "+91-XXXXXXXXXX", href: "tel:+91XXXXXXXXXX" },
                  { icon: "📧", label: "Email", value: "info@yogayurbliss.com", href: "mailto:info@yogayurbliss.com" },
                  { icon: "📍", label: "Location", value: "India | Online Worldwide", href: "#" },
                  { icon: "📱", label: "Instagram", value: "@yogayurbliss", href: "https://www.instagram.com/yogayurbliss" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-body text-xs text-gray-400 mb-0.5">{item.label}</p>
                      <p className="font-body text-sm font-semibold text-charcoal group-hover:text-emerald-600 transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <a
                href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20book%20a%20free%20consultation%20with%20YogAyur%20Bliss"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-body font-semibold px-7 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-base"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Now — Instant Reply
              </a>
            </div>

            {/* Right — form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="font-heading font-semibold text-2xl text-charcoal mb-2">Book a Consultation</h3>
              <p className="font-body text-sm text-gray-500 mb-6">Free 15-minute discovery call — no commitment required.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA Banner ──────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-gold-600 via-gold-DEFAULT to-gold-400">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-emerald-dark mb-4">
            Your Journey to Bliss Starts Now
          </h2>
          <p className="font-subheading text-lg text-emerald-dark/80 italic mb-8">
            "The greatest wealth is health." — Begin your transformation today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27m%20ready%20to%20start%20my%20wellness%20journey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-dark hover:bg-emerald-800 text-white font-body font-semibold px-8 py-4 rounded-full shadow-xl transition-all hover:-translate-y-0.5"
            >
              Start Your Wellness Journey
              <Zap size={18} />
            </a>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-emerald-dark font-body font-medium px-8 py-4 rounded-full border border-emerald-dark/20 transition-all hover:-translate-y-0.5"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
