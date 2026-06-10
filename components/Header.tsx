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
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,248,240,0.85)',
      backdropFilter: 'blur(12px)',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      transition: 'all 0.4s ease',
      borderBottom: scrolled ? '1px solid #f3f4f6' : 'none',
    }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #FF6B35, #FFD700)',
            fontSize: '1.2rem', flexShrink: 0,
          }}>🌸</div>
          <div>
            <div style={{
              fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #FF6B35, #FFD700)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              lineHeight: 1.2,
            }}>ZenYoga Bliss</div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.65rem', color: '#9ca3af', fontStyle: 'italic', lineHeight: 1 }}>
              Ancient Wisdom. Modern Wellness.
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{
              fontSize: '0.875rem', fontWeight: 500, color: '#374151',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FF6B35')}
              onMouseLeave={e => (e.currentTarget.style.color = '#374151')}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" style={{
            padding: '10px 22px', borderRadius: '999px', fontSize: '0.875rem',
            fontWeight: 600, color: 'white', textDecoration: 'none',
            background: 'linear-gradient(135deg, #FF6B35, #FFD700)',
            boxShadow: '0 4px 15px rgba(255,107,53,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            Book Free Consult
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden"
          style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'white', margin: '0 16px 16px',
          borderRadius: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          overflow: 'hidden',
        }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '14px 24px',
              color: '#374151', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500,
              borderBottom: '1px solid #f9fafb',
            }}>
              {link.label}
            </Link>
          ))}
          <div style={{ padding: '16px 24px' }}>
            <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
              display: 'block', textAlign: 'center', padding: '12px',
              borderRadius: '999px', color: 'white', textDecoration: 'none',
              fontWeight: 600, background: 'linear-gradient(135deg, #FF6B35, #FFD700)',
            }}>
              Book Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
