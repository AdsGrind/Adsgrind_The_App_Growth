"use client";

import React, { useState } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { WhatsAppButton, AIChatbot } from '@/components/widgets';
import { AuthModal } from '@/components/auth/AuthModal';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // We need to pass the openAuth function to the Navbar.
  // One way is using a Context, another is through a cloned element if it was a direct child, 
  // but here it's easier to just move the Navbar inside this wrapper.

  return (
    <>
      <Navbar onLogin={() => openAuth('login')} onSignup={() => openAuth('signup')} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <AIChatbot />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
      />
    </>
  );
}
