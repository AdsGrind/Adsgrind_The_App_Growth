import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';
export { cn };

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'liquid';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-500 cubic-bezier(0.23, 1, 0.32, 1) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-start disabled:pointer-events-none disabled:opacity-50 active:scale-95 will-change-transform";
    
    const variants = {
      primary: "bg-brand-orange text-black hover:bg-brand-orange-light shadow-orange-glow transition-all",
      outline: "border border-white/10 bg-transparent text-white hover:bg-white/5",
      ghost: "bg-transparent text-white hover:bg-white/5",
      liquid: "bg-brand-orange/10 border border-brand-orange/20 text-brand-orange hover:bg-brand-orange/20 transition-all",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-10 text-lg rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const GlassCard = ({ className, hover = true, ...props }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card p-6 rounded-2xl backdrop-blur-xl bg-white/[0.02] border-white/5",
        hover && "glass-card-hover",
        className
      )} 
      {...props} 
    />
  );
};

export const Counter = ({ value, duration = 2, decimals = 0, prefix = "", suffix = "" }: { value: number; duration?: number; decimals?: number; prefix?: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            const formatted = latest.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals
            });
            ref.current.textContent = `${prefix}${formatted}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration, decimals, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};

export * from './GrowthIndex';
