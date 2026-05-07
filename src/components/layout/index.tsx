"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Button, cn } from '@/components/ui';
import { usePathname } from 'next/navigation';
import { subscribeToNewsletter } from '@/app/actions/newsletter';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Case Studies', href: '/portfolio' },
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
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-8"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 flex-shrink-0">
            <Image 
              src="/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg" 
              alt="ADSGRIND" 
              fill
              priority
              sizes="40px"
              className="object-contain grayscale brightness-200 transition-transform group-hover:scale-110 rounded-full"
            />
            <div className="absolute inset-0 bg-brand-orange/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col items-start leading-none gap-0.5">
            <span className="font-sans font-black text-xl tracking-tighter text-white leading-none">
              ADSGRIND
            </span>
            <span className="text-[7px] font-bold tracking-[0.4em] text-white uppercase ml-0.5">
              THE APP GROWTH
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative py-2",
                  active ? "text-brand-orange" : "text-white/50 hover:text-white"
                )}
              >
                {link.name}
                {active && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-orange"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-6">
          <a 
            href="https://adsgrind10843948.offer18.com/m/signup" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
          >
            Login
          </a>
          <button 
            onClick={onSignup}
            className="px-6 py-3 bg-brand-orange text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-brand-orange-light transition-all shadow-orange-glow flex items-center gap-2"
          >
            Get Growth Audit <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button 
            className="text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Menu - Premium Redesign */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-black lg:hidden flex flex-col"
          >
            {/* Ambient Atmosphere */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-brand-orange/[0.03] to-transparent pointer-events-none" />
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none" />
            
            {/* Header / Close */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
               <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden grayscale brightness-200">
                    <Image src="/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg" alt="ADSGRIND" fill className="object-contain" />
                  </div>
                  <div className="flex flex-col items-start leading-none gap-0.5">
                    <span className="font-sans font-black text-base tracking-tighter text-white leading-none">ADSGRIND</span>
                    <span className="text-[6.5px] font-bold tracking-[0.3em] text-white uppercase ml-0.5">THE APP GROWTH</span>
                  </div>
               </Link>
               <button 
                 onClick={() => setIsOpen(false)}
                 className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white transition-all active:scale-90"
               >
                 <X size={20} />
               </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-8 pt-4 pb-10">
               <motion.div 
                 initial="closed"
                 animate="open"
                 variants={{
                   open: {
                     transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                   }
                 }}
                 className="flex flex-col gap-1"
               >
                 {NAV_LINKS.map((link) => {
                   const active = isActive(link.href);
                   return (
                     <motion.div
                       key={link.name}
                       variants={{
                         closed: { x: 20, opacity: 0 },
                         open: { x: 0, opacity: 1 }
                       }}
                     >
                       <Link 
                         href={link.href}
                         onClick={() => setIsOpen(false)}
                         className={cn(
                           "group flex items-center justify-between py-4 transition-all duration-300",
                           active ? "text-white" : "text-white/30 hover:text-white/60"
                         )}
                       >
                         <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold uppercase tracking-tight italic font-display">
                              {link.name}
                            </span>
                            {active && (
                              <motion.div 
                                layoutId="active-dot"
                                className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-orange-glow"
                              />
                            )}
                         </div>
                         <ChevronRight size={16} className={cn(
                            "transition-all duration-300",
                            active ? "text-brand-orange opacity-100" : "opacity-0 group-hover:opacity-40"
                         )} />
                       </Link>
                     </motion.div>
                   );
                 })}
               </motion.div>
            </div>

            {/* CTA Section */}
            <div className="p-8 border-t border-white/5 bg-white/[0.02] space-y-4">
               <button 
                 onClick={() => { setIsOpen(false); onSignup?.(); }}
                 className="w-full py-5 bg-brand-orange text-black text-[11px] font-bold uppercase tracking-[0.25em] rounded-2xl shadow-orange-glow active:scale-[0.98] transition-all flex items-center justify-center gap-2"
               >
                 Get Growth Audit <ArrowUpRight size={14} />
               </button>
               <a 
                 href="https://adsgrind10843948.offer18.com/m/signup" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="block w-full py-5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] text-center rounded-2xl hover:text-white hover:border-white/20 transition-all"
               >
                 Login Portal
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
      setMessage('Invalid email');
      return;
    }

    setStatus('loading');
    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setStatus('success');
        setMessage("Joined the loop.");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.error || 'Failed');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error');
    }
  };

  return (
    <footer className="bg-surface-1 border-t border-white/5 pt-32 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-[30%] h-full bg-brand-orange/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="relative w-8 h-8 rounded-full overflow-hidden grayscale brightness-200">
                <Image src="/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg" alt="ADSGRIND" fill className="object-contain" />
              </div>
              <div className="flex flex-col items-start leading-none gap-0.5">
                <span className="font-sans font-black text-2xl tracking-[-0.04em] text-white">ADSGRIND</span>
                <span className="text-[8px] font-bold tracking-[0.5em] text-white uppercase ml-0.5">THE APP GROWTH</span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
              Elite performance marketing partner for mobile apps. Engineered for scale, backed by data, driven by results.
            </p>
            <div className="flex gap-4">
               {[
                 { 
                   name: 'LinkedIn', 
                   icon: (
                     <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                     </svg>
                   ), 
                   href: 'https://www.linkedin.com/company/adsgrindpvt/',
                   color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40',
                   glow: 'group-hover:bg-[#0A66C2]/10'
                 },
                 { 
                   name: 'Telegram', 
                   icon: (
                     <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                       <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.53.26l.215-3.05 5.554-5.019c.24-.21-.054-.33-.376-.12l-6.865 4.318-2.955-.923c-.642-.201-.654-.642.134-.948l11.535-4.444c.535-.2.99.11.834.817z"/>
                     </svg>
                   ), 
                   href: 'https://t.me/Adsgrind_The_App_Growth',
                   color: 'hover:text-[#229ED9] hover:border-[#229ED9]/40',
                   glow: 'group-hover:bg-[#229ED9]/10'
                 },
                 { 
                   name: 'Instagram', 
                   icon: (
                     <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                     </svg>
                   ), 
                   href: 'https://www.instagram.com/adsgrind_the_app_growth?igsh=MWZqcjZuYWFxcGphNg==',
                   color: 'hover:text-[#E4405F] hover:border-[#E4405F]/40',
                   glow: 'group-hover:bg-[#E4405F]/10'
                 }
               ].map(social => (
                 <motion.a
                   key={social.name}
                   href={social.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   whileHover={{ scale: 1.1, y: -2 }}
                   whileTap={{ scale: 0.95 }}
                   className={cn(
                     "group relative w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 transition-all duration-300",
                     social.color
                   )}
                 >
                    <div className={cn("absolute inset-0 rounded-full blur-md transition-opacity opacity-0 group-hover:opacity-100", social.glow)} />
                    <div className="relative z-10">{social.icon}</div>
                 </motion.a>
               ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Services</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><Link href="/services" className="hover:text-brand-orange transition-colors">Performance UA</Link></li>
              <li><Link href="/services" className="hover:text-brand-orange transition-colors">Paid Growth Engine</Link></li>
              <li><Link href="/services" className="hover:text-brand-orange transition-colors">Affiliate Scaling</Link></li>
              <li><Link href="/services" className="hover:text-brand-orange transition-colors">Fraud Prevention</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Agency</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><Link href="/portfolio" className="hover:text-brand-orange transition-colors">Case Studies</Link></li>
              <li><Link href="/about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-brand-orange transition-colors">Intelligence Feed</Link></li>
              <li><Link href="/contact" className="hover:text-brand-orange transition-colors">Contact Hub</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Intelligence Feed</h4>
            <p className="text-sm text-white/40 mb-6">Deploy performance insights to your inbox.</p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Secure Email"
                  className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-brand-orange transition-all outline-none"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-2 bottom-2 px-4 bg-brand-orange text-black rounded-lg text-xs font-bold uppercase tracking-widest"
                >
                  {status === 'loading' ? '...' : 'Join'}
                </button>
              </div>
              {message && <p className="text-[10px] text-brand-orange font-bold uppercase tracking-widest">{message}</p>}
            </form>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">© 2026 ADSGRIND. HIGH-PERFORMANCE UA.</p>
          <div className="flex gap-8 text-[10px] font-bold text-white/20 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/cookie" className="hover:text-white transition-colors">Protocol</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

