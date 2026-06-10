'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Programs', href: '/programs' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
            >
              🌸
            </div>
            <div>
              <div
                className="font-bold text-xl leading-tight"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  background: 'linear-gradient(135deg, #FF6B35, #FFD700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ZenYoga Bliss
              </div>
              <div className="text-xs text-gray-500 leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                Ancient Wisdom. Modern Wellness.
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-orange-500 ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-gray-700' : 'text-white'}`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white rounded-2xl shadow-xl mb-4 overflow-hidden">
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-6 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-6 pt-3 pb-1">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center px-5 py-2 rounded-full text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
                >
                  Book Consultation
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
