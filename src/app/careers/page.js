import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MapPin, Clock, Mail } from 'lucide-react';

export default function CareersPage() {
  const jobs = [
    {
      title: "Strategic Business Consultant",
      location: "Rustenburg / Hybrid",
      type: "Full-Time",
      description: "Looking for an advisory professional to manage corporate registrations, tender analysis, database compliance, and market growth roadmap delivery."
    },
    {
      title: "Digital Solutions Specialist",
      location: "Remote (South Africa)",
      type: "Full-Time",
      description: "Responsible for building web infrastructures, setting up digital communication platforms, integrations, and operational toolsets for clients."
    },
    {
      title: "Client Support Coordinator",
      location: "Remote",
      type: "Contract",
      description: "Manage client onboarding, document vetting, CRM logging, and operational logistics support for modular service delivery."
    }
  ];

  return (
    <div className="min-h-screen bg-primary text-white flex flex-col justify-between">
      <Header />
      
      <main className="flex-grow py-20 lg:py-28 relative">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Header section */}
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C2A66B]">
              WORK WITH US
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Careers at The Access Group
            </h1>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-white/80 max-w-2xl mx-auto">
              We help African businesses scale and expand. Join our modular team of strategic advisors, digital systems experts, and growth matchmakers.
            </p>
          </div>

          {/* Job listings */}
          <div className="space-y-6">
            {jobs.map((job, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/[0.08] hover:border-[#C2A66B]/30 transition-all duration-300 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                    {job.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C2A66B]/15 text-[#C2A66B] border border-[#C2A66B]/25">
                      <Clock size={12} />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/5">
                      <MapPin size={12} />
                      {job.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-white/70 mt-2">
                  {job.description}
                </p>

                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between gap-4 flex-wrap">
                  <span className="text-xs text-white/40 font-semibold">Requirement: Relevant degree / 3+ years experience</span>
                  <a 
                    href={`mailto:careers@theaccessgroup.co.za?subject=Application for ${job.title}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#C2A66B] px-5 py-2.5 text-xs font-extrabold text-[#304945] hover:bg-white hover:text-[#304945] transition-all duration-300"
                  >
                    Apply Now →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* General inquiry block */}
          <div className="mt-16 bg-white/[0.02] border border-white/5 rounded-3xl p-8 text-center max-w-2xl mx-auto">
            <h4 className="text-lg font-bold text-white">Don't see a fit?</h4>
            <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed">
              We are always building a network of freelance builders, facilitators, and designers. Send your portfolio or credentials to us for future consideration.
            </p>
            <div className="mt-6 flex justify-center">
              <a 
                href="mailto:careers@theaccessgroup.co.za?subject=General Career Inquiry" 
                className="inline-flex items-center gap-2 text-xs font-bold text-[#C2A66B] hover:text-white transition-colors"
              >
                <Mail size={14} /> careers@theaccessgroup.co.za
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
