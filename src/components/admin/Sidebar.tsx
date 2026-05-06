"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/components/ui';

const NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', active: false },
  { name: 'Leads', icon: Users, href: '/dashboard/leads', active: true },
  { name: 'Analytics', icon: BarChart3, href: '#', active: false },
  { name: 'Settings', icon: Settings, href: '#', active: false },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#000000] border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-6 mb-12">
          <div className="relative w-11 h-11 flex-shrink-0 rounded-full overflow-hidden">
            <img 
              src="/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg" 
              alt="ADSGRIND" 
              className="w-full h-full object-contain grayscale brightness-[2] contrast-[1.5] mix-blend-screen rounded-full"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.25))' }}
            />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="font-display font-bold text-[18px] tracking-[0.2em] text-white">ADSGRIND</span>
            <span className="text-[9px] font-bold tracking-[0.4em] text-white/70 uppercase">The App Growth</span>
          </div>
        </div>

        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.name === 'Leads' && pathname.startsWith('/dashboard/leads'));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3 transition-all group",
                  isActive 
                    ? "bg-white/[0.05] text-white border-l-2 border-white" 
                    : "text-white/30 hover:text-white/60 hover:bg-white/[0.02]"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={cn("transition-colors", isActive ? "text-white" : "group-hover:text-white/50")} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">{item.name}</span>
                </div>
                {isActive && <div className="w-1 h-1 rounded-full bg-white animate-pulse" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all group">
          <LogOut size={20} className="group-hover:text-red-400 transition-colors" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
