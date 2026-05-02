"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/admin/Header';
import { StatsCards } from '@/components/admin/StatsCards';
import { LeadTable } from '@/components/admin/LeadTable';
import { LeadDrawer } from '@/components/admin/LeadDrawer';
import { Lead } from '@/lib/db';
import { Filter } from 'lucide-react';
import { cn } from '@/components/ui';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data);
      setFilteredLeads(data);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    let result = leads;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(l => 
        l.name.toLowerCase().includes(query) || 
        l.email.toLowerCase().includes(query) || 
        l.company.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(l => l.status === statusFilter);
    }

    setFilteredLeads(result);
  }, [searchQuery, statusFilter, leads]);

  const handleStatusUpdate = async (id: string, status: Lead['status']) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        const updatedLead = await response.json();
        setLeads(leads.map(l => l.id === id ? updatedLead : l));
        if (selectedLead?.id === id) {
          setSelectedLead(updatedLead);
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setLeads(leads.filter(l => l.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Leads Intelligence" 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <main className="p-10 flex-1 overflow-y-auto">
        <StatsCards leads={leads} />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest italic">Management Console</h2>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
              <Filter size={14} className="text-white/20" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs font-bold uppercase tracking-wider text-white/60 focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <LeadTable 
          leads={filteredLeads} 
          onView={(lead) => setSelectedLead(lead)} 
          onDelete={handleDelete}
          onStatusUpdate={handleStatusUpdate}
          isLoading={isLoading}
        />
      </main>

      <LeadDrawer 
        lead={selectedLead} 
        onClose={() => setSelectedLead(null)} 
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
