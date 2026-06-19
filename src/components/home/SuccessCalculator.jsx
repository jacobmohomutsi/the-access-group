"use client";

import React, { useState } from 'react';
import { Calculator, TrendingUp, Briefcase, Users, Building, Globe, Check, Lock, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export default function SuccessCalculator() {
  const [tenderAmount, setTenderAmount] = useState(100000); // Default to R100,000
  const [hours, setHours] = useState(10); // Default 10 hours for Project/Stakeholder
  const [activeTrack, setActiveTrack] = useState('project'); // default active track
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Calculations
  const baseFee = 15000;
  const successFee = tenderAmount * 0.10; // 10%
  const netProfit = tenderAmount - baseFee - successFee;
  const roi = Math.round((netProfit / baseFee) * 100);

  // Helper to format currency with space separated thousands (e.g., R100 000)
  const formatCurrency = (val) => {
    const formatted = val.toLocaleString('en-US').replace(/,/g, ' ');
    return `R${formatted}`;
  };

  const tracks = [
    { id: 'project', label: 'Project Management', icon: Briefcase },
    { id: 'stakeholder', label: 'Stakeholder Engagement', icon: Users },
    { id: 'culture', label: 'Culture & Heritage Advocacy', icon: Building },
    { id: 'agm', label: 'Annual General Meetings', icon: Calendar },
    { id: 'branding', label: 'Branding & Events', icon: Globe },
  ];

  const trackSubtitles = {
    project: "End-to-end strategic oversight ensuring on-time, on-budget delivery.",
    stakeholder: "Building consensus and driving adoption across complex organizational structures.",
    culture: "Preserving and promoting cultural heritage through strategic initiatives.",
    agm: "Comprehensive planning and execution of Annual General Meetings.",
    branding: "Crafting compelling brand narratives and world-class event experiences.",
  };

  const projectSteps = [
    { id: 1, title: 'Strategic Intake', description: 'We define the scope, identify key constraints, and align on success metrics.', locked: false, button: 'Book Consultation' },
    { id: 2, title: 'Framework Design', description: 'Architecting the strategic blueprint tailored to your organization.', locked: true },
    { id: 3, title: 'Active Execution', description: 'Hands-on implementation with "Digital Nervous System" oversight and real-time tracking.', locked: true },
    { id: 4, title: 'Stakeholder Synthesis', description: 'Synthesizing insights and aligning all stakeholders on progress and pivots.', locked: true },
    { id: 5, title: 'Impact Reporting', description: 'Board-ready outcome data, impact analysis, and strategic recommendations.', locked: true }
  ];

  return (
    <section id="calculator" className="bg-primary h-auto md:h-screen text-white py-20 lg:py-24 border-t border-b border-white/5 relative overflow-hidden">
      {/* Subtle decorative background grid */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            The Access Lifecycle
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/65">
            Interactive service tracks designed for institutional impact and measurable ROI.
          </p>
        </div>

        {/* Interactive Track Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
          {tracks.map((track) => {
            const isActive = activeTrack === track.id;
            const Icon = track.icon;
            return (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                className={`flex items-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 shadow-sm border ${isActive
                  ? 'bg-secondary text-primary border-secondary'
                  : 'bg-white text-gray-700 border-gray-100 hover:bg-gray-50'
                  }`}
              >
                <Icon size={18} className={isActive ? 'text-[#C2A66B]' : 'text-gray-400'} />
                {track.label}
              </button>
            );
          })}
        </div>

        {/* Split Layout Container */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 items-start">

          {/* Left Column: Dynamic Calculator */}
          <div className="bg-white/[0.03] border border-secondary/20 rounded-[2rem] p-4 sm:p-2 shadow-2xl transition-all duration-300 h-full flex flex-col justify-center">

            {(activeTrack === 'project' || activeTrack === 'stakeholder') && (
              <div className="animate-fade-in">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/15 border border-secondary/20 flex items-center justify-center text-secondary flex-shrink-0">
                    {activeTrack === 'project' ? <Briefcase size={28} /> : <Users size={28} />}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                      {activeTrack === 'project' ? 'Project Management' : 'Stakeholder Engagement'}
                    </h3>
                    <p className="text-sm text-white/60 mt-2">
                      Estimate costs based on a standard hourly rate
                    </p>
                  </div>
                </div>

                {/* Slider Input Block */}
                <div className="mt-10">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/50">
                      Estimated Budget
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-secondary tracking-tight">
                      {formatCurrency(hours * 1500)}
                    </span>
                  </div>

                  {/* Range Slider */}
                  <div className="relative mt-2">
                    <input
                      type="range"
                      min={1}
                      max={100}
                      step={1}
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-secondary focus:outline-none"
                      style={{
                        background: `linear-gradient(to right, #C2A66B 0%, #C2A66B ${((hours - 1) / (100 - 1)) * 100}%, rgba(255, 255, 255, 0.1) ${((hours - 1) / (100 - 1)) * 100}%, rgba(255, 255, 255, 0.1) 100%)`
                      }}
                    />
                  </div>
                </div>

                {/* Fee Output Metrics Grid */}
                <div className="mt-10 grid gap-4 md:grid-cols-2">
                  {/* Card 1: Per Hour */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2 block">
                      Per Hour
                    </span>
                    <span className="text-2xl font-black text-white tracking-tight">
                      R1 500
                    </span>
                  </div>

                  {/* Card 2: Total Hours */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2 block">
                      Total Hours
                    </span>
                    <span className="text-2xl font-black text-white tracking-tight">
                      {hours}
                    </span>
                  </div>
                </div>

              </div>
            )}

            {activeTrack === 'agm' && (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/15 border border-secondary/20 flex items-center justify-center text-secondary mb-6">
                  <Calendar size={32} />
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-4">Annual General Meetings</h3>
                <p className="text-white/60 mb-10 max-w-md mx-auto leading-relaxed">
                  Comprehensive planning and execution of Annual General Meetings. Discuss your requirements with our expert team to get started.
                </p>
                <a href="https://forms.zohopublic.com/TheAccessGroup/form/ServiceDiagnosticForm/formperma/rtl77z1DPenppTtJmwuIPW56znH95-4K633GSWfqRMU" target="_blank" rel="noopener noreferrer" className="bg-secondary text-primary hover:bg-white px-10 py-4 rounded-full font-bold text-lg transition-colors shadow-lg shadow-secondary/20 hover:shadow-white/20">
                  Book Session
                </a>
              </div>
            )}

            {activeTrack === 'branding' && (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/15 border border-secondary/20 flex items-center justify-center text-secondary mb-6">
                  <Globe size={32} />
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-4">Branding & Events</h3>
                <p className="text-white/60 mb-10 max-w-md mx-auto leading-relaxed">
                  Comprehensive full branding and event management. Discuss your vision with our expert team to get started.
                </p>
                <a href="https://forms.zohopublic.com/TheAccessGroup/form/ServiceDiagnosticForm/formperma/rtl77z1DPenppTtJmwuIPW56znH95-4K633GSWfqRMU" target="_blank" rel="noopener noreferrer" className="bg-secondary text-primary hover:bg-white px-10 py-4 rounded-full font-bold text-lg transition-colors shadow-lg shadow-secondary/20 hover:shadow-white/20">
                  Book Session
                </a>
              </div>
            )}

            {activeTrack === 'culture' && (
              <>
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/15 border border-secondary/20 flex items-center justify-center text-secondary flex-shrink-0">
                    <Calculator size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                      Culture & Heritage Advocacy
                    </h3>
                    <p className="text-sm text-white/60 mt-2">
                      Estimate costs based on a standard hourly rate
                    </p>
                  </div>
                </div>

                {/* Slider Input Block */}
                <div className="mt-10">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/50">
                      Estimated Budget
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-secondary tracking-tight">
                      {formatCurrency(5000 + (hours * 1500))}
                    </span>
                  </div>

                  {/* Range Slider */}
                  <div className="relative mt-2">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-secondary focus:outline-none"
                      style={{
                        background: `linear-gradient(to right, #C2A66B 0%, #C2A66B ${(hours / 100) * 100}%, rgba(255, 255, 255, 0.1) ${(hours / 100) * 100}%, rgba(255, 255, 255, 0.1) 100%)`
                      }}
                    />
                  </div>
                </div>

                {/* Fee Output Metrics Grid */}
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {/* Card 1: Per Hour */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2 block">
                      Per Hour
                    </span>
                    <span className="text-2xl font-black text-white tracking-tight">
                      R1 500
                    </span>
                  </div>

                  {/* Card 2: Total Hours */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2 block">
                      Total Hours
                    </span>
                    <span className="text-2xl font-black text-white tracking-tight">
                      {hours}
                    </span>
                  </div>

                  {/* Card 3: Base Fee */}
                  <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-6 text-center shadow-lg shadow-secondary/5">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 block">
                      Base Fee
                    </span>
                    <span className="text-2xl font-black text-secondary tracking-tight">
                      R5 000
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Steps Timeline Slider */}
          <div className="bg-white/[0.03] border border-secondary/20 rounded-[2rem] p-4 sm:p-4 shadow-2xl flex flex-col h-full justify-between">
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-sm text-white/60 text-center mb-10 font-medium px-4 animate-fade-in">
                {trackSubtitles[activeTrack]}
              </p>

              <div className="flex flex-col items-center animate-fade-in relative z-10 w-full max-w-md mx-auto">
                <button
                  onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
                  disabled={currentStepIndex === 0}
                  className={`absolute left-2 top-1/2 z-20 -translate-y-1/2 w-6 h-6 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition ${currentStepIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 text-white'}`}
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={() => setCurrentStepIndex(Math.min(projectSteps.length - 1, currentStepIndex + 1))}
                  disabled={currentStepIndex === projectSteps.length - 1}
                  className={`absolute right-2 top-1/2 z-20 -translate-y-1/2 w-6 h-6 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition ${currentStepIndex === projectSteps.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 text-white'}`}
                >
                  <ChevronRight size={20} />
                </button>
                {/* Content Box */}
                <div className={`w-full border rounded-3xl p-8 text-center transition-all duration-300 ${!projectSteps[currentStepIndex].locked
                  ? 'border-secondary/40 bg-secondary/5 shadow-xl shadow-secondary/5'
                  : 'border-white/10 bg-white/5'
                  }`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className={`text-sm font-bold uppercase tracking-widest ${!projectSteps[currentStepIndex].locked ? 'text-secondary' : 'text-white/40'
                      }`}>
                      Stage {projectSteps[currentStepIndex].id}
                    </span>
                    {projectSteps[currentStepIndex].locked && (
                      <span className="text-[10px] bg-white/10 text-white/60 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                        Unlocked
                      </span>
                    )}
                  </div>

                  <h4 className={`text-2xl font-black tracking-tight mb-4 ${!projectSteps[currentStepIndex].locked ? 'text-white' : 'text-white/80'
                    }`}>
                    {projectSteps[currentStepIndex].title}
                  </h4>

                  <p className={`text-base leading-relaxed ${!projectSteps[currentStepIndex].locked ? 'text-white/80 mb-4' : 'text-white/50 mb-4'
                    }`}>
                    {projectSteps[currentStepIndex].description}
                  </p>

                  {!projectSteps[currentStepIndex].locked && projectSteps[currentStepIndex].button && (
                    <a href="https://forms.zohopublic.com/TheAccessGroup/form/ServiceDiagnosticForm/formperma/rtl77z1DPenppTtJmwuIPW56znH95-4K633GSWfqRMU" target="_blank" rel="noopener noreferrer" className="mt-8 bg-secondary text-primary hover:bg-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg">
                      {projectSteps[currentStepIndex].button}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
