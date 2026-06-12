"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero({ heroData }) {
  const data = heroData;
  const partners = [
    {
      name: data.partner1name,
      logo: data.partner1logo,
    },
    {
      name: data.partner2name,
      logo: data.partner2logo,
    },
    {
      name: data.partner3name,
      logo: data.partner3logo,
    },
    {
      name: data.partner4name,
      logo: data.partner4logo,
    },
    {
      name: data.partner5name,
      logo: data.partner5logo,
    },
    {
      name: data.partner6name,
      logo: data.partner6logo,
    },
    {
      name: data.partner7name,
      logo: data.partner7logo,
    },
    {
      name: data.partner8name,
      logo: data.partner8logo,
    },
    {
      name: data.partner9name,
      logo: data.partner9logo,
    },
  ];

  const [partnerIndex, setPartnerIndex] = useState(0);

  const extendedPartners = [...partners, ...partners];

  const handlePrevPartner = () => {
    setPartnerIndex((prev) => (prev - 1 + partners.length) % partners.length);
  };

  const handleNextPartner = () => {
    setPartnerIndex((prev) => (prev + 1) % partners.length);
  };

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-primary">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute right-[-6rem] top-36 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white">
            <span className="h-2 w-2 rounded-full bg-white" />
            {data.badgeText}
          </div>

          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            {data.heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            {data.heroDescription}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-base font-semibold text-primary shadow-lg shadow-white/20 hover:opacity-95"
            >
              {data.primaryButtonText}
              <span className="ml-3">→</span>
            </a>

            <a
              href="#summit"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#263B38] px-7 py-4 text-base font-semibold text-white hover:bg-white/10"
            >
              IEAS Summit 2026
            </a>
          </div>

        </div>

        {/* Partners slider */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-4">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
            Trusted by partners and ecosystems
          </p>

          <div className="relative px-2 sm:px-6">

            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  width: `${(extendedPartners.length / 5) * 100}%`,
                  transform: `translateX(-${(partnerIndex * 100) / extendedPartners.length}%)` 
                }}
              >
                {extendedPartners.map((item, idx) => (
                  <div key={`${item.name}-${idx}`} className="w-full flex-shrink-0 px-2" style={{ width: `${100 / extendedPartners.length}%` }}>
                    <div className="flex h-full items-center justify-center rounded-2xl border border-white/10 bg-white px-3 py-3 sm:px-5 sm:py-4 text-sm font-medium text-white/80 shadow-sm">
                      {item.logo?.node?.sourceUrl ? (
                        <Image
                          width={100}
                          height={100}
                          src={item.logo.node.sourceUrl}
                          alt={item.logo.node.altText || item.name}
                          className="h-12 sm:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      ) : (
                        <span className="text-center text-[#304945] font-bold text-xs sm:text-sm">{item.name}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Scroller Indicator with Arrows */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Left Arrow */}
            <button
              onClick={handlePrevPartner}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Previous partners"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-2.5">
              {partners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPartnerIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    partnerIndex === idx 
                      ? 'w-6 bg-[#C2A66B]' 
                      : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to partner ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNextPartner}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Next partners"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
