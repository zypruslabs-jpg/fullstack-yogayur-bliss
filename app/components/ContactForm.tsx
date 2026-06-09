"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  const inputStyle = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:border-emerald-600 transition-all placeholder:text-gray-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Your Name *</label>
          <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Enter your name" className={inputStyle} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Email Address *</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputStyle} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Phone Number</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={inputStyle} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Service Interested In</label>
          <select name="service" value={form.service} onChange={handleChange} className={inputStyle}>
            <option value="">Select a service</option>
            <option>Yoga Therapy</option>
            <option>Ayurvedic Consultation</option>
            <option>Meditation Sessions</option>
            <option>Diet & Nutrition Guidance</option>
            <option>Stress Management</option>
            <option>Lifestyle Coaching</option>
            <option>Online Wellness Sessions</option>
            <option>Corporate Wellness Programs</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-2">Your Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us about your wellness goals..." className={inputStyle + " resize-none"} />
      </div>

      {status === "success" && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <p className="text-sm text-emerald-700 font-medium">✓ Thank you! We will contact you within 24 hours.</p>
        </div>
      )}
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-sm text-red-600">Something went wrong. Please WhatsApp us directly.</p>
        </div>
      )}

      <button type="submit" disabled={status === "sending"} className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold py-4 rounded-xl shadow-lg transition-all text-base">
        {status === "sending" ? "Sending..." : "Send Message & Book Consultation"}
      </button>
      <p className="text-xs text-gray-400 text-center">
        Prefer instant reply?{" "}
        <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-medium">WhatsApp us →</a>
      </p>
    </form>
  );
}
