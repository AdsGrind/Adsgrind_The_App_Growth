import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'liquid';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-start disabled:pointer-events-none disabled:opacity-50 active:scale-95";
    
    const variants = {
      primary: "bg-brand-accent-start text-white hover:bg-brand-accent-end bg-gradient-brand shadow-lg hover:shadow-brand-accent-start/20",
      outline: "border border-brand-accent-start/20 bg-transparent text-slate-100 hover:bg-brand-accent-start/5",
      ghost: "bg-transparent text-slate-100 hover:bg-brand-accent-start/5",
      liquid: "liquid-glass-btn text-white",
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
        "glass-card p-6 rounded-2xl",
        hover && "glass-card-hover",
        className
      )} 
      {...props} 
    />
  );
};
