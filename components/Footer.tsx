'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import InstagramIcon from '@/components/icons/InstagramIcon';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Programs', href: '/programs' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const services = [
  'Yoga Therapy',
  'Ayurvedic Consultation',
  'Meditation Sessions',
  'Diet & Nutrition',
  'Stress Management',
  'Lifestyle Coaching',
];

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #0d2a1f, #1a3a28, #0d2a1f)' }} className="text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
              >
                🌸
              </div>
              <div>
                <div className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#FFD700' }}>
                  ZenYoga Bliss
                </div>
                <div className="text-xs text-green-300 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Ancient Wisdom. Modern Wellness.
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Transforming lives through the ancient science of Ayurveda and Yoga. Join 2500+ clients from 40+ countries on their wellness journey.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/zenyogabliss"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #FF85A1)' }}
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-110"
                style={{ background: '#25D366' }}
              >
                WA
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5" style={{ color: '#FFD700', fontFamily: 'Playfair Display, serif' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-orange-400">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5" style={{ color: '#FFD700', fontFamily: 'Playfair Display, serif' }}>
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-orange-400">›</span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-5" style={{ color: '#FFD700', fontFamily: 'Playfair Display, serif' }}>
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">WhatsApp / Call</p>
                  <a href="tel:+91XXXXXXXXXX" className="text-white text-sm hover:text-yellow-400 transition-colors">
                    +91 XXXXXXXXXX
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Email Us</p>
                  <a href="mailto:info@zenyogabliss.com" className="text-white text-sm hover:text-yellow-400 transition-colors">
                    info@zenyogabliss.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Available</p>
                  <p className="text-white text-sm">Online & In-Person</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <InstagramIcon size={16} className="text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Instagram</p>
                  <a
                    href="https://www.instagram.com/zenyogabliss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm hover:text-yellow-400 transition-colors"
                  >
                    @zenyogabliss
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-1">
            © 2024 ZenYoga Bliss. Made with <Heart size={14} className="text-red-400" /> for your wellness.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/privacy-policy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</Link>
            <Link href="/admin" className="hover:text-yellow-400 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
