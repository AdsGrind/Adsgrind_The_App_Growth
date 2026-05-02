"use client";

import React from 'react';
import { Search, Bell, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ title, searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="h-20 border-b border-white/10 flex items-center justify-between px-10 bg-[#050505]/50 backdrop-blur-md sticky top-0 z-40">
      <h1 className="text-xl font-bold text-white uppercase italic tracking-wider">{title}</h1>

      <div className="flex items-center gap-8">
        <div className="relative w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-orange transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search leads, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-4 border-l border-white/10 pl-8">
          <button className="relative p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-orange rounded-full border-2 border-[#050505]" />
          </button>
          
          <button className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-brand-purple flex items-center justify-center text-white font-bold text-xs uppercase">
              AD
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-white leading-none">Admin</div>
              <div className="text-[10px] text-white/30 leading-none mt-1">Superuser</div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
