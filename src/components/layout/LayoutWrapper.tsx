"use client";

import React, { useEffect } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { WhatsAppButton, AIChatbot } from '@/components/widgets';
import { AuthModal } from '@/components/auth/AuthModal';
import { GetStartedModal } from '@/components/home/GetStartedModal';
import { PerformanceStrategyModal } from '@/components/blog/PerformanceStrategyModal';
import { MarketStrategyModal } from '@/components/blog/MarketStrategyModal';
import { FraudInsightModal } from '@/components/blog/FraudInsightModal';
import { ModalProvider, useModals } from '@/context/ModalContext';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { 
    isAuthOpen, closeAuth, authMode, openAuth,
    isGetStartedOpen, closeGetStarted, openGetStarted,
    isStrategyOpen, closeStrategy,
    isMarketOpen, closeMarket,
    isFraudInsightOpen, closeFraudInsight
  } = useModals();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar onLogin={() => openAuth('login')} onSignup={openGetStarted} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <AIChatbot />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={closeAuth} 
        initialMode={authMode} 
      />
      <GetStartedModal 
        isOpen={isGetStartedOpen} 
        onClose={closeGetStarted} 
      />
      <PerformanceStrategyModal
        isOpen={isStrategyOpen}
        onClose={closeStrategy}
      />
      <MarketStrategyModal
        isOpen={isMarketOpen}
        onClose={closeMarket}
      />
      <FraudInsightModal
        isOpen={isFraudInsightOpen}
        onClose={closeFraudInsight}
      />
    </>
  );
}

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <LayoutContent>
        {children}
      </LayoutContent>
    </ModalProvider>
  );
}
