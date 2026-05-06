"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button, cn } from '@/components/ui';
import { usePathname } from 'next/navigation';
import { subscribeToNewsletter } from '@/app/actions/newsletter';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

interface NavbarProps {
  onLogin?: () => void;
  onSignup?: () => void;
}

export const Navbar = ({ onLogin, onSignup }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-6",
        scrolled ? "bg-black border-b border-white/10 py-4 shadow-2xl" : "bg-[#000000] py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-6 group">
          <div className="relative w-11 h-11 flex-shrink-0 rounded-full overflow-hidden">
            <Image 
              src="/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg" 
              alt="ADSGRIND" 
              fill
              priority
              sizes="44px"
              className="object-contain grayscale brightness-[2] contrast-[1.5] mix-blend-screen transition-transform group-hover:scale-105 rounded-full"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.25))' }}
            />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="font-mono font-bold text-lg tracking-[0.2em] text-white uppercase">
              ADSGRIND
            </span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/60 uppercase">
              THE APP GROWTH
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 relative py-2",
                  active ? "text-white" : "text-white/30 hover:text-white"
                )}
              >
                {link.name}
                {active && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute bottom-0 left-0 right-0 h-px bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="https://adsgrind10843948.offer18.com/m/signup" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors"
          >
            Login
          </a>
          <button 
            onClick={onSignup}
            className="px-8 py-3 border border-white text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all"
          >
            Inquiry
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            className="text-white p-2 hover:bg-white/10 transition-colors flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#000000] border-b border-white/10 p-12 md:hidden flex flex-col gap-10 shadow-2xl overflow-hidden min-h-screen"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-4xl font-mono font-bold uppercase tracking-tighter transition-all",
                    active ? "text-white" : "text-white/20"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="flex flex-col gap-4 pt-12 border-t border-white/10 mt-auto">
                <button 
                    onClick={() => { setIsOpen(false); onSignup?.(); }}
                    className="w-full py-6 bg-white text-black text-[12px] font-bold uppercase tracking-[0.4em]"
                >
                    Get Started
                </button>
              <a 
                href="https://adsgrind10843948.offer18.com/m/signup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                <button className="w-full py-6 border border-white/20 text-white text-[12px] font-bold uppercase tracking-[0.4em]">Login Portal</button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Invalid address');
      return;
    }

    setStatus('loading');
    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        setStatus('success');
        setMessage(result.message || "Subscription Active");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.error || 'Retry submission');
      }
    } catch (err) {
      console.error('Newsletter error:', err);
      setStatus('error');
      setMessage('Network error. Try again.');
    }
  };

  return (
    <footer className="bg-[#000000] border-t border-white/10 pt-32 pb-16 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
        <div className="col-span-1">
          <Link href="/" className="flex items-center gap-6 mb-12 group">
            <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                <Image 
                    src="/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg" 
                    alt="Logo" 
                    fill
                    sizes="40px"
                    className="object-contain grayscale brightness-[2] contrast-[1.5] mix-blend-screen transition-transform group-hover:scale-105 rounded-full"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.2))' }}
                />
            </div>
            <div className="flex flex-col items-start leading-tight">
                <span className="font-mono font-bold text-lg tracking-[0.2em] text-white">ADSGRIND</span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/60 uppercase">THE APP GROWTH</span>
            </div>
          </Link>
          <p className="text-white/30 text-[11px] leading-relaxed uppercase tracking-widest">
            Institutional performance marketing. Engineered scale. Verified human traffic.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-white">Capabilities</h4>
          <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <li><Link href="/services" className="hover:text-white transition-colors">Performance UA</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Scale Audit</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Direct Inventory</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Network Data</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-white">Infrastructure</h4>
          <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <li><Link href="/about" className="hover:text-white transition-colors">Institutional Profile</Link></li>
            <li><Link href="/portfolio" className="hover:text-white transition-colors">Audit History</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Intelligence</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Hub Connect</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-white">Intelligence Feed</h4>
          <p className="text-[10px] text-white/30 mb-8 uppercase tracking-widest">Deploy performance insights to your inbox.</p>
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="flex border-b border-white/20 group focus-within:border-white transition-colors">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Secure Email"
                disabled={status === 'loading'}
                className="bg-transparent py-3 text-[10px] flex-1 focus:outline-none text-white disabled:opacity-50 uppercase tracking-widest"
              />
              <button 
                type="submit" 
                className="px-4 py-3 text-white text-[10px] font-bold uppercase tracking-[0.2em] disabled:opacity-50"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? '...' : 'Join'}
              </button>
            </div>
            {message && (
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-12 text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
        <p>© 2026 ADSGRIND. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-12">
          <Link href="/privacy" className="px-2 py-1 border border-white/5 rounded-sm hover:border-white/20 hover:text-white transition-all">Privacy</Link>
          <Link href="/terms" className="px-2 py-1 border border-white/5 rounded-sm hover:border-white/20 hover:text-white transition-all">Terms</Link>
          <Link href="/cookie" className="px-2 py-1 border border-white/5 rounded-sm hover:border-white/20 hover:text-white transition-all">Protocol</Link>
        </div>
      </div>
    </footer>
  );
};
