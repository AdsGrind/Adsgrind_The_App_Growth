"use client";

import React, { useState } from 'react';
import { 
  MoreHorizontal, 
  Eye, 
  Trash2, 
  Mail, 
  Building2,
  ChevronDown,
  Users
} from 'lucide-react';
import { cn } from '@/components/ui';
import { Lead } from '@/lib/db';

const STATUS_COLORS = {
  New: "bg-white/10 text-white/60 border-white/5",
  Contacted: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Qualified: "bg-green-500/10 text-green-400 border-green-500/20",
  Closed: "bg-red-500/10 text-red-400 border-red-500/20",
};

interface LeadRowProps {
  lead: Lead;
  onView: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string, status: Lead['status']) => void;
}

export function LeadRow({ lead, onView, onDelete, onStatusUpdate }: LeadRowProps) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  return (
    <tr className="group border-b border-white/5 hover:bg-white/[0.02] transition-colors">
      <td className="py-4 pl-6 pr-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 font-bold text-xs uppercase border border-white/10">
            {lead.name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-none">{lead.name}</div>
            <div className="text-xs text-white/30 mt-1 flex items-center gap-1">
              <Mail size={10} /> {lead.email}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Building2 size={14} className="text-white/20" />
          {lead.company}
        </div>
      </td>
      <td className="py-4 px-4">
        <p className="text-xs text-white/30 line-clamp-1 max-w-[200px]">
          {lead.message}
        </p>
      </td>
      <td className="py-4 px-4">
        <div className="relative">
          <button 
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-2 transition-all",
              STATUS_COLORS[lead.status]
            )}
          >
            {lead.status}
            <ChevronDown size={10} />
          </button>
          
          {showStatusMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowStatusMenu(false)} />
              <div className="absolute top-full mt-2 left-0 w-32 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl z-20 py-1 overflow-hidden">
                {(['New', 'Contacted', 'Qualified', 'Closed'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      onStatusUpdate(lead.id, status);
                      setShowStatusMenu(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-white/5 transition-colors",
                      lead.status === status ? "text-brand-orange" : "text-white/40"
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </td>
      <td className="py-4 px-4 text-xs text-white/20">
        {new Date(lead.createdAt).toLocaleDateString()}
      </td>
      <td className="py-4 pl-4 pr-6 text-right">
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={() => onView(lead)}
            className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-brand-orange transition-all"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to delete this lead?')) {
                onDelete(lead.id);
              }
            }}
            className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-red-500 transition-all"
            title="Delete Lead"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function LeadTable({ 
  leads, 
  onView, 
  onDelete, 
  onStatusUpdate,
  isLoading 
}: { 
  leads: Lead[], 
  onView: (lead: Lead) => void,
  onDelete: (id: string) => void,
  onStatusUpdate: (id: string, status: Lead['status']) => void,
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 w-full bg-white/5 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
          <Users size={32} className="text-white/10" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2 uppercase italic">No leads found</h3>
        <p className="text-white/30 text-sm">When you receive inquiries, they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0B] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.03] border-b border-white/10">
              <th className="py-4 pl-6 pr-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Lead</th>
              <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Company</th>
              <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Message Preview</th>
              <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Status</th>
              <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Date</th>
              <th className="py-4 pl-4 pr-6 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <LeadRow 
                key={lead.id} 
                lead={lead} 
                onView={onView} 
                onDelete={onDelete}
                onStatusUpdate={onStatusUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
