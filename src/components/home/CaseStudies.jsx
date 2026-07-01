"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { SiInstagram, SiSpotify, SiWechat } from '@icons-pack/react-simple-icons';

export default function CaseStudies() {
  const caseStudies = [
    {
      client: "PERFECT PETALS FLORALS",
      subTitle: "BOX 1: ACCESS TO BUSINESS",
      items: [
        "Business Registration",
        "Bank Account",
        "Catalogue Design",
        "Clients Matched",
        "Market Research"
      ],
      platformLabel: "Instagram",
      icon: SiInstagram,
      link: "https://instagram.com/perfect_petals_florals"
    },
    {
      client: "CHEESE DEEP",
      subTitle: "BOX 2: ACCESS FOR CREATIVES",
      items: [
        "China tour management",
        "Brand Ambassador",
        "Album Launch",
        "Streaming Management",
        "Electronic Press Kit"
      ],
      platformLabel: "Spotify",
      icon: SiSpotify,
      link: "https://l1nk.dev/kti3hfs"
    },
    {
      client: "ECO-BREAK",
      subTitle: "BOX 4: ACCESS TO COMMUNICATION",
      items: [
        "Email Hosting",
        "Domain Registration",
        "IT Support"
      ],
      platformLabel: "Website",
      icon: Globe,
      link: "https://www.ecobreak.co.za"
    },
    {
      client: "LIVING SOUND FAITH TABERNACLE",
      subTitle: "BOX 6 - ACCESS TO BRANDING",
      items: [
        "Full Digital Brand",
        "Website Development",
        "Merchandise Production",
        "Ticketing",
        "Event Management (8K+ pax)",
        "Social Media Management",
        "Photography Training"
      ],
      platformLabel: "Website",
      icon: Globe,
      link: "https://www.livingsound.org.za"
    },
    {
      client: "SHANGHAI PUFEN CATERING",
      subTitle: "BOX 8: INTERNATIONAL ACCESS",
      items: [
        "Stakeholder Management",
        "Client Base Match",
        "Export Roadmapping",
        "Export Licence",
        "Event Planning",
        "Trade Desk Registration"
      ],
      platformLabel: "WeChat",
      icon: SiWechat,
      link: "https://wechat.com"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = caseStudies.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Indices for desktop slider
  const leftIdx = (currentIndex - 1 + total) % total;
  const centerIdx = currentIndex;
  const rightIdx = (currentIndex + 1) % total;

  return (
    <section id="cases" className="bg-primary text-white py-8 lg:py-10 overflow-hidden h-auto md:h-screen">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-xs mb-4 font-semibold uppercase tracking-[0.28em] text-[#C2A66B]">CASE STUDIES</p>
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between border-b border-white/10 pb-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Real businesses. Structured growth. Market-ready outcomes.
            </h2>
          </div>
          <p className="max-w-md text-white/65 text-sm sm:text-base leading-relaxed">
            From business formalisation to international trade facilitation, our work focuses on helping African businesses and creatives become visible, bankable, scalable, and globally connected.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP SLIDER (3 Slides Visible)                                         */}
        {/* ========================================================================= */}
        <div className="relative mt-0">
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-2 top-1/2 z-20 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-2 top-1/2 z-20 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
          <div className="hidden md:flex justify-center items-stretch gap-6 lg:gap-8 mt-8 px-4">


            {[leftIdx, centerIdx, rightIdx].map((idx, pos) => {
              const item = caseStudies[idx];
              const isCenter = pos === 1;
              const IconComponent = item.icon;

              return (
                <div
                  key={item.client}
                  onClick={() => {
                    if (!isCenter) setCurrentIndex(idx);
                  }}
                  className={`w-full md:w-1/3 flex flex-col rounded-3xl overflow-hidden transition-all duration-500 border bg-white ${isCenter
                    ? 'scale-105 z-10 border-[#C2A66B]/50 ring-1 ring-[#C2A66B]/20 shadow-2xl opacity-100'
                    : 'scale-95 border-gray-100 opacity-40 blur-[0.5px] hover:opacity-75 cursor-pointer shadow-sm'
                    }`}
                >
                  {/* Gold Header Banner */}
                  <div className="bg-[#C2A66B] text-white font-extrabold text-xs tracking-wider py-4 px-6 text-center uppercase select-none">
                    {item.client}
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow text-gray-900 bg-white">
                    <div>
                      <h4 className="text-xs font-black italic text-[#304945] tracking-wide mb-5 uppercase border-b border-gray-100 pb-3">
                        {item.subTitle}
                      </h4>
                      <ul className="space-y-3 text-xs sm:text-sm text-gray-600 font-medium">
                        {item.items.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#304945]/40 flex-shrink-0 mt-2" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Respective Card Footer Icon Link (following Box Card style) */}
                    <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Platform</span>
                        <span className="text-xs font-extrabold text-[#304945]">{item.platformLabel}</span>
                      </div>

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#304945] hover:bg-[#304945] hover:text-white hover:border-[#304945] transition-all duration-300"
                        aria-label={`Visit ${item.client} on ${item.platformLabel}`}
                      >
                        <IconComponent size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE SLIDER (1 Slide Visible)                                           */}
        {/* ========================================================================= */}
        <div className="relative mt-0">
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 w-6 h-6 rounded-full bg-primary/20 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 w-6 h-6 rounded-full bg-primary/20 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
          <div className="flex md:hidden justify-center items-stretch mt-12">

            <div className="w-full flex flex-col rounded-3xl overflow-hidden border border-gray-100 shadow-xl bg-white text-gray-900">
              {/* Gold Header Banner */}
              <div className="bg-[#C2A66B] text-white font-extrabold text-xs tracking-wider py-4 px-6 text-center uppercase">
                {caseStudies[currentIndex].client}
              </div>

              {/* Card Content Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-white">
                <div>
                  <h4 className="text-xs font-black italic text-[#304945] tracking-wide mb-4 uppercase border-b border-gray-100 pb-3">
                    {caseStudies[currentIndex].subTitle}
                  </h4>
                  <ul className="space-y-3 text-xs sm:text-sm text-gray-600 font-medium">
                    {caseStudies[currentIndex].items.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#304945]/40 flex-shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Platform</span>
                    <span className="text-xs font-extrabold text-[#304945]">{caseStudies[currentIndex].platformLabel}</span>
                  </div>

                  <a
                    href={caseStudies[currentIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#304945] hover:bg-[#304945] hover:text-white hover:border-[#304945] transition-all duration-300"
                    aria-label={`Visit ${caseStudies[currentIndex].client} on ${caseStudies[currentIndex].platformLabel}`}
                  >
                    {React.createElement(caseStudies[currentIndex].icon, { size: 16 })}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
