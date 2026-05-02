import React from 'react';
import { Sidebar } from '@/components/admin/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#050505] min-h-screen text-white selection:bg-brand-orange/30">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
