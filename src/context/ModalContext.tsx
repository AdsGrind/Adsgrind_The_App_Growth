"use client";

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isGetStartedOpen: boolean;
  openGetStarted: () => void;
  closeGetStarted: () => void;
  isStrategyOpen: boolean;
  openStrategy: () => void;
  closeStrategy: () => void;
  isMarketOpen: boolean;
  openMarket: () => void;
  closeMarket: () => void;
  isFraudInsightOpen: boolean;
  openFraudInsight: () => void;
  closeFraudInsight: () => void;
  isAuthOpen: boolean;
  openAuth: (mode?: 'login' | 'signup') => void;
  closeAuth: () => void;
  authMode: 'login' | 'signup';
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isStrategyOpen, setIsStrategyOpen] = useState(false);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [isFraudInsightOpen, setIsFraudInsightOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openGetStarted = () => setIsGetStartedOpen(true);
  const closeGetStarted = () => setIsGetStartedOpen(false);

  const openStrategy = () => setIsStrategyOpen(true);
  const closeStrategy = () => setIsStrategyOpen(false);

  const openMarket = () => setIsMarketOpen(true);
  const closeMarket = () => setIsMarketOpen(false);

  const openFraudInsight = () => setIsFraudInsightOpen(true);
  const closeFraudInsight = () => setIsFraudInsightOpen(false);
  
  const openAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };
  const closeAuth = () => setIsAuthOpen(false);

  return (
    <ModalContext.Provider 
      value={{ 
        isGetStartedOpen, 
        openGetStarted, 
        closeGetStarted,
        isStrategyOpen,
        openStrategy,
        closeStrategy,
        isMarketOpen,
        openMarket,
        closeMarket,
        isFraudInsightOpen,
        openFraudInsight,
        closeFraudInsight,
        isAuthOpen,
        openAuth,
        closeAuth,
        authMode
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
}
