"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button, cn, Counter } from '@/components/ui';
import { 
  Zap, Target, Globe2, ShieldCheck, BarChart3, TrendingUp, 
  CheckCircle2, ArrowRight, Activity, Shield, Database, 
  Layers, ArrowUpRight, Cpu
} from 'lucide-react';
import { useModals } from '@/context/ModalContext';

const PERFORMANCE_SOLUTIONS = [
  {
    title: "Performance-Driven UA",
    type: "CPI / CPA / CPR",
    icon: <Target className="text-brand-orange" size={24} />,
    problem: "Rising CAC and low-quality installs that don't convert to revenue.",
    solution: "Deep-funnel CPA & CPR campaigns targeting high-LTV users across direct publisher nodes.",
    outcome: "Verified user actions with an average 35% reduction in overall CAC.",
    why: "We only charge for verified performance. No vanity metrics.",
  },
  {
    title: "Paid Growth Engine",
    type: "Meta / Google / DSP",
    icon: <Zap className="text-brand-orange" size={24} />,
    problem: "Inability to scale budgets without diminishing returns.",
    solution: "Institutional-grade media buying using proprietary real-time optimization scripts.",
    outcome: "4x ROAS on average while maintaining stable spend across Tier-1 GEOs.",
    why: "Proprietary ML optimization that outpaces manual bidding.",
  },
  {
    title: "Affiliate Scaling",
    type: "Network Infrastructure",
    icon: <Globe2 className="text-brand-orange" size={24} />,
    problem: "Inconsistent traffic quality and non-transparent reporting from networks.",
    solution: "A curated ecosystem of verified performance partners under strict compliance.",
    outcome: "Sustainable 100K+ monthly installs with 99.8% human-verified traffic.",
    why: "Strict node-level compliance monitoring for absolute transparency.",
  },
  {
    title: "Conversion Optimization",
    type: "CRO & LTV Engineering",
    icon: <BarChart3 className="text-brand-orange" size={24} />,
    problem: "High drop-off rates and inefficient onboarding funnels.",
    solution: "Data-backed funnel auditing and UX engineering to maximize user retention.",
    outcome: "Average 15-20% uplift in day-1 to day-7 user retention rates.",
    why: "We optimize for the click-to-revenue journey, not just the install.",
  },
  {
    title: "Fraud Prevention",
    type: "Zero-Fraud Protocols",
    icon: <ShieldCheck className="text-brand-orange" size={24} />,
    problem: "Sophisticated ad fraud draining up to 40% of campaign budgets.",
    solution: "Military-grade detection engine blocking bot traffic and attribution hijacking.",
    outcome: "<0.2% fraud rate across all campaigns, saving thousands in wasted spend.",
    why: "Real-time pre-bid filtering that generic MMPs often miss.",
  }
];

export default function ServicesPage() {
  // Use generic modal trigger or defined one if available
  const { openGetStarted } = useModals() || { openGetStarted: () => console.log('Audit requested') };

  return (
    <main className="pt-32 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-5xl mb-32 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/5 text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] inline-block mb-8">
              Capabilities
            </span>
            <h1 className="font-display font-bold text-5xl md:text-8xl mb-10 uppercase text-white leading-none tracking-tight">
              Performance<br /><span className="text-white/40 font-light italic">Solutions.</span>
            </h1>
            <p className="text-white/50 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
              We don't just sell traffic. We engineer scalable growth systems backed by military-grade fraud protection and data authority.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PERFORMANCE_SOLUTIONS.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 bg-surface-2 border border-white/5 rounded-[2.5rem] hover:bg-surface-3 transition-all duration-500 flex flex-col h-full"
            >
                <div className="flex items-center justify-between mb-10">
                   <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                     {service.icon}
                   </div>
                   <div className="text-[10px] font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/5 px-3 py-1 rounded-full border border-brand-orange/10">
                     {service.type}
                   </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-8 text-white uppercase tracking-tight leading-none">{service.title}</h2>
                
                <div className="space-y-6 flex-1">
                   <div>
                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Problem</div>
                      <p className="text-white/50 text-sm">{service.problem}</p>
                   </div>
                   <div>
                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">The Solution</div>
                      <p className="text-white/80 text-sm leading-relaxed">{service.solution}</p>
                   </div>
                   <div className="p-4 bg-brand-orange/5 border border-brand-orange/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                         <TrendingUp size={12} className="text-brand-orange" />
                         <div className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">Expected Outcome</div>
                      </div>
                      <p className="text-white text-sm font-medium">{service.outcome}</p>
                   </div>
                </div>
                
                <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between group/why">
                   <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">The Edge</div>
                   <div className="text-white text-[10px] font-bold uppercase tracking-widest group-hover/why:text-brand-orange transition-colors cursor-default">
                     {service.why}
                   </div>
                </div>
            </motion.div>
          ))}

          {/* Custom Strategic Audit Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-brand-orange border border-brand-orange rounded-[2.5rem] flex flex-col justify-center items-center text-center group cursor-pointer shadow-orange-glow"
            onClick={openGetStarted}
          >
              <h3 className="text-3xl font-bold text-black uppercase tracking-tight leading-none mb-6">Need a custom roadmap?</h3>
              <p className="text-black/70 text-sm mb-10 font-medium">Get a full structural audit of your UA infrastructure by our senior leads.</p>
              <button className="w-full py-4 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-black/90 transition-all flex items-center justify-center gap-2">
                 Request Growth Audit <ArrowRight size={14} />
              </button>
          </motion.div>
        </div>

        {/* Global Scale Section */}
        <div className="mt-48 py-32 border-y border-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 blur-[120px] rounded-full translate-x-1/2 opacity-20 pointer-events-none" />
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
              <div>
                 <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Institutional Proof</span>
                 <h2 className="text-4xl md:text-7xl font-bold text-white mb-10 uppercase tracking-tight leading-[0.9]">Global Network<br /><span className="text-white/30 font-light italic text-4xl md:text-6xl block mt-2">Institutional Scale.</span></h2>
                 <p className="text-white/50 text-xl mb-12 leading-relaxed max-w-xl">
                    Our infrastructure connects you to 500M+ high-quality active nodes across the globe. We manage the complexity of multi-channel scaling through real-time operational intelligence.
                 </p>
                 <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                    {[
                      { label: 'Market Entry', icon: <Globe2 size={18} /> },
                      { label: 'Growth Scaling', icon: <TrendingUp size={18} /> },
                      { label: 'Retention Logic', icon: <Database size={18} /> },
                      { label: 'LTV Audit', icon: <BarChart3 size={18} /> }
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-4 text-white font-bold uppercase text-[11px] tracking-widest group">
                        <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-black transition-all">
                           {item.icon}
                        </div>
                        {item.label}
                      </div>
                    ))}
                 </div>
                 
                 <div className="mt-16 p-8 bg-surface-2 border border-white/5 rounded-3xl flex items-center justify-between">
                    <div>
                       <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Network Capacity</div>
                       <div className="text-2xl font-bold text-white">4.2M <span className="text-xs text-brand-orange">Ops / Sec</span></div>
                    </div>
                    <div className="w-12 h-1 bg-brand-orange/20 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: '85%' }}
                         className="h-full bg-brand-orange"
                       />
                    </div>
                 </div>
              </div>

              {/* Live Intelligence Dashboard */}
              <div className="relative group">
                 <div className="absolute inset-0 bg-brand-orange/5 blur-[120px] rounded-full opacity-50" />
                 
                 <div className="relative bg-surface-2 border border-white/10 rounded-[3rem] shadow-orange-glow-lg p-1 min-h-[600px] lg:min-h-0 lg:aspect-[4/3] flex flex-col overflow-visible sm:overflow-hidden">
                    <div className="bg-black/40 p-4 sm:p-6 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                       <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="flex gap-1.5 flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-red-500/40" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                            <div className="w-2 h-2 rounded-full bg-green-500/40" />
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-white/30 font-bold uppercase tracking-widest ml-2 sm:ml-4 truncate">
                            <span className="sm:hidden">DEPLOY v5.0</span>
                            <span className="hidden sm:inline">ADSGRIND_DEPLOY_v5.0</span>
                          </span>
                       </div>
                       <div className="flex items-center gap-2.5 bg-brand-orange/10 border border-brand-orange/20 px-2.5 py-1 rounded-full flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                          <span className="text-brand-orange text-[8px] sm:text-[9px] font-bold uppercase tracking-widest">Operational Intelligence</span>
                       </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col gap-8">
                       {/* KPI Metrics */}
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 sm:p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group/kpi hover:border-brand-orange/30 transition-all">
                             <div>
                                <div className="text-[8px] sm:text-[9px] text-white/30 font-bold uppercase tracking-widest mb-1">Global ROAS</div>
                                <div className="text-xl sm:text-2xl font-bold text-white">4.82x</div>
                             </div>
                             <ArrowUpRight size={18} className="text-brand-orange opacity-40 sm:opacity-0 sm:group-hover/kpi:opacity-100 transition-opacity" />
                          </div>
                          <div className="p-4 sm:p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group/kpi hover:border-brand-orange/30 transition-all">
                             <div>
                                <div className="text-[8px] sm:text-[9px] text-white/30 font-bold uppercase tracking-widest mb-1">Fraud Shield</div>
                                <div className="text-xl sm:text-2xl font-bold text-white">99.8%</div>
                             </div>
                             <Shield size={18} className="text-brand-orange opacity-40 sm:opacity-0 sm:group-hover/kpi:opacity-100 transition-opacity" />
                          </div>
                       </div>

                       {/* Animated Data Visualization */}
                       <div className="flex-1 min-h-[180px] bg-black/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col">
                          <div className="flex items-center justify-between mb-6">
                             <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex items-center gap-2">
                                <Activity size={12} className="text-brand-orange" />
                                Deployment Velocity
                             </div>
                             <div className="flex gap-2">
                                {[1, 2, 3].map(i => <div key={i} className="w-8 h-1 bg-white/10 rounded-full" />)}
                             </div>
                          </div>
                          
                          <div className="flex-1 flex items-end gap-1.5 px-2 pb-2">
                             {[50, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 92, 82, 100].map((h, i) => (
                                <motion.div 
                                  key={i}
                                  initial={{ height: 0 }}
                                  whileInView={{ height: `${h}%` }}
                                  transition={{ delay: i * 0.05, duration: 1 }}
                                  className="flex-1 bg-brand-orange/20 rounded-t-sm relative group/bar hover:bg-brand-orange/40 transition-colors"
                                >
                                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover/bar:opacity-100 transition-opacity mb-2">
                                      <div className="bg-brand-orange text-black text-[8px] font-bold px-1.5 py-0.5 rounded-sm">{h}%</div>
                                   </div>
                                </motion.div>
                             ))}
                          </div>
                          
                          {/* Floating Indicators */}
                          <motion.div 
                            animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/4 p-3 bg-brand-orange/10 backdrop-blur-xl border border-brand-orange/20 rounded-2xl shadow-orange-glow flex items-center gap-3"
                          >
                             <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-black">
                                <Cpu size={16} />
                             </div>
                             <div>
                                <div className="text-[8px] text-white/40 uppercase font-bold tracking-widest">Auto-Scale</div>
                                <div className="text-[10px] text-white font-bold tracking-tight">Node_0x42f Ready</div>
                             </div>
                          </motion.div>
                       </div>
                       
                       {/* Mini GEO List */}
                       <div className="space-y-3 px-2">
                          <div className="flex justify-between text-[9px] font-bold text-white/20 uppercase tracking-widest">
                             <span>Operational Hub</span>
                             <span>Throughput</span>
                          </div>
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-brand-orange" />
                                <span className="text-xs text-white/60 font-bold uppercase tracking-tight">North America</span>
                             </div>
                             <span className="text-xs text-white font-mono">12.4K ops</span>
                          </div>
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                <span className="text-xs text-white/60 font-bold uppercase tracking-tight">Europe (EU-Central)</span>
                             </div>
                             <span className="text-xs text-white font-mono">8.2K ops</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
