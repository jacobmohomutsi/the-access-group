"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
  const rawPartners = [
    { name: "Partner 1", logo: { node: { sourceUrl: "/images/partners/6-raht5uu5xj491hsxc5gikyvvbz2af1t4rr4rqsvw34.webp" } } },
    { name: "Partner 2", logo: { node: { sourceUrl: "/images/partners/8-raht648jtvh49lf9t9is9wih9tryk0ug51nmjkhycw (1).webp" } } },
    { name: "Partner 3", logo: { node: { sourceUrl: "/images/partners/9-raht68xqs1njvn8g1tjx4dbs8r4smid3tox1xyazhs.webp" } } },
    { name: "Partner 4", logo: { node: { sourceUrl: "/images/partners/10-raht6cp3jdsp632zfv6fecdmmam9has167izv25esw (1).webp" } } },
    { name: "Partner 5", logo: { node: { sourceUrl: "/images/partners/11-raht6gggapxugixitwsxobfgzu3qc36yiq4xs5zu40.webp" } } },
    { name: "Partner 6", logo: { node: { sourceUrl: "/images/partners/15-raht6ybdwkmal47kxmiuhox8a5npec5ux6j5wf9cts.webp" } } },
    { name: "Partner 7", logo: { node: { sourceUrl: "/images/partners/19-raht7f8hbl9ge3j06tu4qkniz3cb8w10zi9wjek9ps.webp" } } },
    { name: "Partner 8", logo: { node: { sourceUrl: "/images/partners/20-raht7kviglh6brat9w9w5j8ajekij2nf0a6tf2bwog.webp" } } },
    { name: "Partner 9", logo: { node: { sourceUrl: "/images/partners/22-raht7tc263sr88yiwhxj9z3fvvetgcl01g26qjzd4g.webp" } } },
  ];

  const basePartners = rawPartners.filter(p => p.name || p.logo?.node?.sourceUrl);
  let safePartners = [...(basePartners.length > 0 ? basePartners : rawPartners)];

  while (safePartners.length < 5) {
    safePartners = [...safePartners, ...safePartners];
  }

  const extendedPartners = [
    ...safePartners,
    ...safePartners,
    ...safePartners,
    ...safePartners,
    ...safePartners,
  ];

  const [desktopIndex, setDesktopIndex] = useState(safePartners.length * 2);
  const [isDesktopTransitioning, setIsDesktopTransitioning] = useState(false);

  const mobilePartnerSliderRef = useRef(null);
  const mobileScrollTimeoutRef = useRef(null);

  const desktopNext = () => {
    setIsDesktopTransitioning(true);
    setDesktopIndex((prev) => prev + 1);
  };

  const desktopPrev = () => {
    setIsDesktopTransitioning(true);
    setDesktopIndex((prev) => prev - 1);
  };

  const handlePrevPartner = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      if (mobilePartnerSliderRef.current) {
        mobilePartnerSliderRef.current.scrollBy({ left: -mobilePartnerSliderRef.current.clientWidth, behavior: 'smooth' });
      }
    } else {
      desktopPrev();
    }
  };

  const handleNextPartner = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      if (mobilePartnerSliderRef.current) {
        mobilePartnerSliderRef.current.scrollBy({ left: mobilePartnerSliderRef.current.clientWidth, behavior: 'smooth' });
      }
    } else {
      desktopNext();
    }
  };

  useEffect(() => {
    let timeout;
    if (desktopIndex >= safePartners.length * 3) {
      timeout = setTimeout(() => {
        setIsDesktopTransitioning(false);
        setDesktopIndex((prev) => prev - safePartners.length);
      }, 500);
    } else if (desktopIndex <= safePartners.length) {
      timeout = setTimeout(() => {
        setIsDesktopTransitioning(false);
        setDesktopIndex((prev) => prev + safePartners.length);
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [desktopIndex, safePartners.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.innerWidth < 640) {
        if (mobilePartnerSliderRef.current) {
          mobilePartnerSliderRef.current.scrollBy({ left: mobilePartnerSliderRef.current.clientWidth, behavior: 'smooth' });
        }
      } else {
        desktopNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [desktopIndex]);

  useEffect(() => {
    if (mobilePartnerSliderRef.current && typeof window !== 'undefined' && window.innerWidth < 640) {
      const slider = mobilePartnerSliderRef.current;
      slider.scrollLeft = slider.clientWidth * safePartners.length * 2;
    }
  }, [safePartners.length]);

  const handleMobilePartnerScroll = (event) => {
    const slider = event.currentTarget;
    if (mobileScrollTimeoutRef.current) {
      clearTimeout(mobileScrollTimeoutRef.current);
    }
    mobileScrollTimeoutRef.current = setTimeout(() => {
      if (!slider) return;
      const slideWidth = slider.clientWidth;
      const scrollLeft = slider.scrollLeft;
      const setWidth = slideWidth * safePartners.length;

      if (scrollLeft < setWidth) {
        slider.scrollTo({ left: scrollLeft + setWidth * 2, behavior: 'auto' });
      } else if (scrollLeft >= setWidth * 4) {
        slider.scrollTo({ left: scrollLeft - setWidth * 2, behavior: 'auto' });
      }
    }, 150);
  };

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-primary">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute right-[-6rem] top-36 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto md:h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-20 flex flex-col justify-center">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white">
            <span className="h-2 w-2 rounded-full bg-white" />
            Productised services for growth
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-3xl lg:text-7xl">
            Your Strategic Gateway to Market Access
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-base">
            The Access Group combines business formalisation, digital transformation, branding, compliance, and international market activation into scalable service pathways designed for African entrepreneurs, creatives, and growth-stage enterprises.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-base font-semibold text-primary shadow-lg shadow-white/20 hover:opacity-95 transition-opacity"
            >
              Explore Access Boxes
            </a>

            <a
              href="#summit"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#263B38] px-7 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Access Summit Ticket
            </a>
          </div>

        </div>

        {/* Partners slider */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-4 relative z-10 w-full max-w-6xl mx-auto">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
            Trusted by partners and ecosystems
          </p>

          <div className="relative px-8 sm:px-12">
            {/* Left */}
            <button
              onClick={handlePrevPartner}
              className="absolute left-0 top-1/2 z-20 -translate-y-1/2 w-6 h-6 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
              aria-label="Previous Partner"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Right */}
            <button
              onClick={handleNextPartner}
              className="absolute right-0 top-1/2 z-20 -translate-y-1/2 w-6 h-6 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
              aria-label="Next Partner"
            >
              <ChevronRight size={22} />
            </button>

            {/* Mobile Native Snap Carousel */}
            <div
              ref={mobilePartnerSliderRef}
              onScroll={handleMobilePartnerScroll}
              className="sm:hidden flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full"
            >
              {extendedPartners.map((item, idx) => (
                <div key={`mobile-${idx}`} className="min-w-full w-full snap-center px-1">
                  <div className="flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-medium text-white/80 shadow-sm">
                    {item.logo?.node?.sourceUrl ? (
                      <Image
                        width={120}
                        height={60}
                        src={item.logo.node.sourceUrl}
                        alt={item.logo.node.altText || item.name}
                        className="h-24 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <span className="text-center text-[#304945] font-bold text-xs">{item.name}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop CSS Transform Carousel */}
            <div className="relative hidden overflow-hidden sm:block w-full">
              <div
                className="flex"
                style={{
                  width: `${(extendedPartners.length / 5) * 100}%`,
                  transform: `translateX(-${(desktopIndex * 100) / extendedPartners.length}%)`,
                  transition: isDesktopTransitioning ? 'transform 500ms ease-in-out' : 'none'
                }}
              >
                {extendedPartners.map((item, idx) => (
                  <div key={`desktop-${idx}`} className="w-full flex-shrink-0 px-2" style={{ width: `${100 / extendedPartners.length}%` }}>
                    <div className="flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-white px-5 py-4 text-sm font-medium text-white/80 shadow-sm">
                      {item.logo?.node?.sourceUrl ? (
                        <Image
                          width={150}
                          height={80}
                          src={item.logo.node.sourceUrl}
                          alt={item.logo.node.altText || item.name}
                          className="h-24 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      ) : (
                        <span className="text-center text-[#304945] font-bold text-sm">{item.name}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
