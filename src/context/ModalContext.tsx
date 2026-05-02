"use client";

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isGetStartedOpen: boolean;
  openGetStarted: () => void;
  closeGetStarted: () => void;
  isAuthOpen: boolean;
  openAuth: (mode?: 'login' | 'signup') => void;
  closeAuth: () => void;
  authMode: 'login' | 'signup';
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openGetStarted = () => setIsGetStartedOpen(true);
  const closeGetStarted = () => setIsGetStartedOpen(false);
  
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
