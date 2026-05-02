"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Mail, 
  Building2, 
  Clock, 
  DollarSign, 
  Copy, 
  Check,
  MessageSquare
} from 'lucide-react';
import { Lead } from '@/lib/db';
import { cn } from '@/components/ui';

interface LeadDrawerProps {
  lead: Lead | null;
  onClose: () => void;
  onStatusUpdate: (id: string, status: Lead['status']) => void;
}

export function LeadDrawer({ lead, onClose, onStatusUpdate }: LeadDrawerProps) {
  const [copied, setCopied] = React.useState(false);

  const copyEmail = () => {
    if (lead) {
      navigator.clipboard.writeText(lead.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {lead && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0B0B0B] border-l border-white/10 z-[70] shadow-2xl overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-10">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange border border-brand-orange/20">
                  <Building2 size={24} />
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-10">
                <div className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] mb-2">Lead Intelligence</div>
                <h2 className="text-3xl font-display font-bold text-white uppercase italic tracking-tight">{lead.name}</h2>
                <div className="text-white/40 text-sm mt-1">{lead.company}</div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3 text-white/60">
                      <Mail size={16} className="text-white/20" />
                      <span className="text-sm font-medium">{lead.email}</span>
                    </div>
                    <button 
                      onClick={copyEmail}
                      className="p-2 rounded-lg hover:bg-white/5 text-white/20 hover:text-white transition-all"
                    >
                      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <Clock size={16} className="text-white/20" />
                    <span className="text-sm font-medium">{new Date(lead.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <DollarSign size={16} className="text-white/20" />
                    <span className="text-sm font-medium">Budget: {lead.budget}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest pl-1">Message from Lead</div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <MessageSquare size={16} className="text-brand-orange mb-3" />
                    <p className="text-white/60 text-sm leading-relaxed whitespace-pre-wrap">
                      {lead.message}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-6">
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest pl-1">Lifecycle Status</div>
                  <div className="grid grid-cols-2 gap-2">
                    {(['New', 'Contacted', 'Qualified', 'Closed'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => onStatusUpdate(lead.id, status)}
                        className={cn(
                          "px-4 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all",
                          lead.status === status 
                            ? "bg-brand-orange/10 border-brand-orange/40 text-brand-orange" 
                            : "bg-white/5 border-white/5 text-white/20 hover:text-white hover:bg-white/10"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto p-8 border-t border-white/10 bg-white/[0.01]">
              <div className="flex flex-col gap-3">
                <a 
                  href={`mailto:${lead.email}`}
                  className="w-full h-12 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-orange/20"
                >
                  <Mail size={18} />
                  EMAIL LEAD
                </a>
                <button 
                   onClick={onClose}
                   className="w-full h-12 bg-white/5 hover:bg-white/10 text-white/60 font-bold rounded-xl transition-all"
                >
                  DISMISS
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
