"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button, cn } from '@/components/ui';
import { usePathname } from 'next/navigation';

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-[var(--navbar-bg)] border-b border-white/10 py-3 shadow-2xl" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border border-white/20">
            <Image 
              src="/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg" 
              alt="AdsGrind Logo" 
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block text-white uppercase italic">
            ADSGRIND
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 relative py-2",
                  active ? "text-white" : "text-slate-400 hover:text-white"
                )}
              >
                {link.name}
                {active && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="https://adsgrind10843948.offer18.com/m/signup" 
            target="_blank" 
            rel="noopener noreferrer"
          >
              <Button variant="ghost" size="sm" className="hover:scale-105 hover:-translate-y-0.5 transition-all">Log In</Button>
          </a>
          <Button variant="liquid" size="sm" onClick={onSignup}>Get Started</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={32} className="text-white" /> : <Menu size={32} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 p-8 md:hidden flex flex-col gap-6 shadow-2xl overflow-hidden z-50"
          >
            <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                    <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                        "text-2xl font-display font-bold flex items-center justify-between group py-3 transition-all uppercase italic",
                        active ? "text-brand-red" : "text-white/60"
                    )}
                    >
                    {link.name}
                    <motion.div
                        animate={active ? { x: 5 } : { x: 0 }}
                    >
                        <ChevronRight size={24} className={cn("transition-colors", active ? "text-brand-red" : "text-white/20 group-hover:text-white")} />
                    </motion.div>
                    </Link>
                );
                })}
            </div>
            
            <div className="flex flex-col gap-4 pt-8 border-t border-white/10">
              <Button variant="liquid" size="lg" className="w-full h-14 text-lg font-bold uppercase italic" onClick={() => { setIsOpen(false); onSignup?.(); }}>Get Started</Button>
              <a 
                href="https://adsgrind.offer18.com/m/signup_self_aff?r=&am=" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="outline" size="lg" className="w-full h-14 text-lg font-bold border-white/10 uppercase italic" onClick={() => setIsOpen(false)}>Publisher Signup</Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-[var(--footer-bg)] border-t border-white/5 pt-20 pb-10 px-4 mt-auto">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="relative w-8 h-8 overflow-hidden rounded-full border border-white/10">
              <Image 
                src="/logo/2ccbcd51-e176-41fc-b3cb-70c3f0620511.jpg" 
                alt="AdsGrind Logo" 
                fill
                className="object-cover"
              />
            </div>
            <span className="font-display font-bold text-lg text-white uppercase italic">ADSGRIND</span>
          </Link>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Elevating brands through high-performance digital marketing, strategic SEO, and technical excellence.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-white uppercase tracking-widest text-xs">Services</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link href="/services" className="hover:text-brand-red transition-colors">Search Engine Optimization</Link></li>
            <li><Link href="/services" className="hover:text-brand-red transition-colors">Pay-Per-Click Advertising</Link></li>
            <li><Link href="/services" className="hover:text-brand-red transition-colors">Social Media Marketing</Link></li>
            <li><Link href="/services" className="hover:text-brand-red transition-colors">Content Strategy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-white uppercase tracking-widest text-xs">Company</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link href="/about" className="hover:text-brand-red transition-colors">About Us</Link></li>
            <li><Link href="/portfolio" className="hover:text-brand-red transition-colors">Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-brand-red transition-colors">Insights</Link></li>
            <li><Link href="/contact" className="hover:text-brand-red transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-white uppercase tracking-widest text-xs">Newsletter</h4>
          <p className="text-sm text-slate-500 mb-6">Stay updated with the latest trends.</p>
          <div className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Email address"
              className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red text-white w-full"
            />
            <Button variant="liquid" size="lg" className="w-full h-12 uppercase italic font-bold">Join Now</Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <p>© 2026 ADSGRIND. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};
