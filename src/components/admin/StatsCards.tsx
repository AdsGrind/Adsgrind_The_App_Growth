"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Sparkles, 
  Target, 
  TrendingUp 
} from 'lucide-react';
import { Lead } from '@/lib/db';

export function StatsCards({ leads }: { leads: Lead[] }) {
  const stats = [
    {
      label: 'Total Leads',
      value: leads.length,
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    {
      label: 'New Leads',
      value: leads.filter(l => l.status === 'New').length,
      icon: Sparkles,
      color: 'text-brand-orange',
      bg: 'bg-brand-orange/10'
    },
    {
      label: 'Qualified',
      value: leads.filter(l => l.status === 'Qualified').length,
      icon: Target,
      color: 'text-green-400',
      bg: 'bg-green-400/10'
    },
    {
      label: 'Conversion Rate',
      value: leads.length > 0 ? `${((leads.filter(l => l.status === 'Closed').length / leads.length) * 100).toFixed(1)}%` : '0%',
      icon: TrendingUp,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-[#0B0B0B] border border-white/10 p-6 rounded-2xl shadow-xl relative overflow-hidden group"
        >
          <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-[60px] -z-10 group-hover:opacity-100 opacity-50 transition-opacity`} />
          
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Live</div>
          </div>
          
          <div className="text-3xl font-display font-bold text-white mb-1 uppercase italic tracking-tight">
            {stat.value}
          </div>
          <div className="text-xs font-bold text-white/30 uppercase tracking-widest">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
