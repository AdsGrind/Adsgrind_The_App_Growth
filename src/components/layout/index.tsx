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
              alt="ADSGRIND Logo" 
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start leading-none hidden sm:flex">
            <span className="font-display font-bold text-[18px] tracking-[0.5px] text-white">
              ADSGRIND
            </span>
            <span className="text-[12px] font-normal text-white/60 tracking-[0.3px] uppercase mt-[2px]">
              The App Growth
            </span>
          </div>
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
            className="absolute top-full left-0 right-0 bg-slate-900 border-b border-white/10 p-6 md:hidden flex flex-col gap-6 shadow-2xl overflow-hidden"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-xl font-display font-medium flex items-center justify-between group py-2 transition-all",
                    active ? "text-white border-l-4 border-brand-red pl-4" : "text-white/40"
                  )}
                >
                  {link.name}
                  <ChevronRight size={20} className={cn("transition-colors", active ? "text-brand-red" : "text-white/20 group-hover:text-white")} />
                </Link>
              );
            })}
            <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
              <Button variant="liquid" size="lg" className="w-full" onClick={() => { setIsOpen(false); onSignup?.(); }}>Get Started</Button>
              <a 
                href="https://adsgrind10843948.offer18.com/m/signup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="outline" size="lg" className="w-full border-white/10 hover:scale-105 hover:-translate-y-1 transition-all" onClick={() => setIsOpen(false)}>Log In</Button>
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
    <footer className="bg-[var(--footer-bg)] border-t border-white/5 pt-20 pb-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="relative w-8 h-8 overflow-hidden rounded-full border border-white/10">
              <Image 
                src="/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg" 
                alt="ADSGRIND Logo" 
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-display font-bold text-lg text-white">ADSGRIND</span>
              <span className="text-[10px] font-normal text-white/50 tracking-wider uppercase mt-[2px]">The App Growth</span>
            </div>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed">
            Scaling mobile apps with verified CPA, CPI, and CPE campaigns. Performance-first, fraud-free, globally scalable.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-white">Services</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link href="/services" className="hover:text-brand-orange transition-colors">CPA Campaigns</Link></li>
            <li><Link href="/services" className="hover:text-brand-orange transition-colors">App Install (CPI)</Link></li>
            <li><Link href="/services" className="hover:text-brand-orange transition-colors">Cost-Per-Engagement</Link></li>
            <li><Link href="/services" className="hover:text-brand-orange transition-colors">OEM &amp; Native Traffic</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-white">Company</h4>
          <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/about" className="hover:text-brand-accent-start transition-colors">About Us</Link></li>
            <li><Link href="/portfolio" className="hover:text-brand-accent-start transition-colors">Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-brand-accent-start transition-colors">Insights</Link></li>
            <li><Link href="/contact" className="hover:text-brand-accent-start transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-white">Newsletter</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Stay updated with the latest trends.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address"
              className="bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:border-brand-accent-start text-white"
            />
            <Button variant="liquid" size="sm" className="px-4">Join</Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <p>© 2026 ADSGRIND. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/cookie" className="hover:text-white transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};
