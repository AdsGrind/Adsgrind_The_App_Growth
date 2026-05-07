
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
import { Loader } from '@/components/ui/Loader';
import { GlobalParticles } from '@/components/ui/GlobalParticles';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const {
    isAuthOpen, closeAuth, authMode, openAuth,
    isGetStartedOpen, closeGetStarted, openGetStarted,
    isStrategyOpen, closeStrategy,
    isMarketOpen, closeMarket,
    isFraudInsightOpen, closeFraudInsight
  } = useModals();

  const pathname = usePathname();

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500); // 4.5s for that premium "system initialization" feel

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(20px)",
              scale: 1.1,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[10000]"
          >
            <Loader />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col min-h-screen relative"
          >
            <GlobalParticles />
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
          </motion.div>
        )}
      </AnimatePresence>
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
