"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginData = z.infer<typeof loginSchema>;
type SignupData = z.infer<typeof signupSchema>;

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: { isOpen: boolean, onClose: () => void, initialMode?: 'login' | 'signup' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Forms
  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const signupForm = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onLoginSubmit = (data: LoginData) => {
    console.log(`Login submitted:`, data);
  };

  const onSignupSubmit = (data: SignupData) => {
    console.log(`Signup submitted:`, data);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md max-h-[95vh] overflow-y-auto glass-card p-6 sm:p-10 rounded-3xl border-white/10 custom-scrollbar"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <h2 className="font-display font-bold text-3xl mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-white/50 text-sm">
                {mode === 'login' ? 'Enter your details to access your account' : 'Join ADSGRIND and elevate your business'}
              </p>
            </div>

            {mode === 'login' ? (
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div className="space-y-1">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input 
                      {...loginForm.register('email')}
                      type="email" 
                      placeholder="Email Address"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-brand-accent-start transition-colors"
                    />
                  </div>
                  {loginForm.formState.errors.email && <p className="text-red-400 text-xs pl-1">{loginForm.formState.errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input 
                      {...loginForm.register('password')}
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-brand-accent-start transition-colors"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && <p className="text-red-400 text-xs pl-1">{loginForm.formState.errors.password.message}</p>}
                </div>

                <Button type="submit" variant="liquid" className="w-full py-4 rounded-xl shadow-lg">
                  Sign In
                </Button>
              </form>
            ) : (
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <div className="space-y-1">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input 
                      {...signupForm.register('name')}
                      type="text" 
                      placeholder="Full Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-brand-accent-start transition-colors"
                    />
                  </div>
                  {signupForm.formState.errors.name && <p className="text-red-400 text-xs pl-1">{signupForm.formState.errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input 
                      {...signupForm.register('email')}
                      type="email" 
                      placeholder="Email Address"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-brand-accent-start transition-colors"
                    />
                  </div>
                  {signupForm.formState.errors.email && <p className="text-red-400 text-xs pl-1">{signupForm.formState.errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input 
                      {...signupForm.register('password')}
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-brand-accent-start transition-colors"
                    />
                  </div>
                  {signupForm.formState.errors.password && <p className="text-red-400 text-xs pl-1">{signupForm.formState.errors.password.message}</p>}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input 
                      {...signupForm.register('confirmPassword')}
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Confirm Password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-brand-accent-start transition-colors"
                    />
                  </div>
                  {signupForm.formState.errors.confirmPassword && <p className="text-red-400 text-xs pl-1">{signupForm.formState.errors.confirmPassword.message}</p>}
                </div>

                <Button type="submit" variant="liquid" className="w-full py-4 rounded-xl shadow-lg">
                  Create Account
                </Button>
              </form>
            )}

            <div className="mt-8 text-center text-sm">
              <span className="text-white/50">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-brand-accent-start font-semibold hover:underline"
              >
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
