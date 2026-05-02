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
    <aside className="w-64 bg-[#0B0B0B] border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center font-bold text-white italic">A</div>
          <span className="font-display font-bold text-lg text-white uppercase italic tracking-tight">ADSGRIND</span>
        </div>

        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.name === 'Leads' && pathname.startsWith('/dashboard/leads'));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                  isActive 
                    ? "bg-brand-orange/10 text-brand-orange border border-brand-orange/20" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={cn("transition-colors", isActive ? "text-brand-orange" : "group-hover:text-white")} />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />}
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
