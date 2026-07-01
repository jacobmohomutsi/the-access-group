"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function About({ aboutData }) {

  const galleryImages = [
    "/images/home-about/1 TAG_The_Access_Group_.JPG",
    "/images/home-about/2 TAG_The_Access_GroupJPG.JPG",
    "/images/home-about/3 TAG_The_Access_Group.jpg",
    "/images/home-about/4 TAG_The_Access_Group_4.JPG",
    "/images/home-about/5 TAG_The_Access_Group.JPG",
    "/images/home-about/6 TAG_The_Access_Group_4.JPG",
    "/images/home-about/7 TAG_The_Access_Group_4.JPG",
    "/images/home-about/8 TAG_The_Access_Group.JPG",
    "/images/home-about/9 TAG_The_Access_Group_.JPG",
    "/images/home-about/10 TAG_The_Access_Group.jpg"
  ];

  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleNextGallery = () => {
    if (!galleryRef.current) return;

    setGalleryIndex((prev) => {
      const next =
        prev >= galleryImages.length - 1 ? 0 : prev + 1;

      galleryRef.current.scrollTo({
        left: next * galleryRef.current.clientWidth,
        behavior: "smooth",
      });

      return next;
    });
  };

  const handlePrevGallery = () => {
    if (!galleryRef.current) return;

    setGalleryIndex((prev) => {
      const next =
        prev <= 0 ? galleryImages.length - 1 : prev - 1;

      galleryRef.current.scrollTo({
        left: next * galleryRef.current.clientWidth,
        behavior: "smooth",
      });

      return next;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextGallery();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const galleryRef = useRef(null);

  const handleGalleryScroll = () => {
    if (!galleryRef.current) return;

    const slider = galleryRef.current;

    const currentIndex = Math.round(
      slider.scrollLeft / slider.clientWidth
    );

    setGalleryIndex(currentIndex);
  };

  return (
    <section id="about" className="bg-[#F5F5F2] text-primary">
      <div className="mx-auto max-w-8xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2  lg:items-center h-auto md:h-screen">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">ABOUT THE ACCESS GROUP</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-primary sm:text-5xl">
              Building pathways between African potential and global opportunity.
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary/80">
              The Access Group is a youth-led strategic consultancy focused on business activation, digital transformation, and market access across Africa.

              We help entrepreneurs, creatives, organisations, and community-led enterprises transition from informal activity into structured, scalable, and globally connected operations.

              Built around accessibility, compliance, and innovation, our work combines local understanding with internationally aligned business systems designed for long-term impact.
            </p>
          </div>

          <div className="text-primary flex flex-col items-center order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10">

              {/* Left Arrow */}
              <button
                onClick={handlePrevGallery}
                className="absolute left-2 md:left-4 top-1/2 z-20 -translate-y-1/2 w-6 h-6 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Right Arrow */}
              <button
                onClick={handleNextGallery}
                className="absolute right-2 md:right-4 top-1/2 z-20 -translate-y-1/2 w-6 h-6 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              {/* Slider */}
              <div
                ref={galleryRef}
                onScroll={handleGalleryScroll}
                className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative min-w-full h-full snap-center flex-shrink-0"
                  >
                    <Image
                      src={image}
                      alt={`Gallery Image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center top-10"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>


            </div>
          </div>
        </div>

        {/* SDG Goals Section */}
        <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:items-start  h-auto md:h-screen">
          <div className="order-1 md:order-2">
            <Image
              src="/images/RUEDA-ODS-ENG-768x777.png"
              alt="SDG Goals"
              width={768}
              height={777}
              className="w-full h-auto rounded-2xl object-contain bg-white"
            />
          </div>

          <div className="order-2 md:order-q">
            <h2 className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
              Sustainable Development Goals:
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary/80">
              The Access Group is a purpose-driven enterprise systematically aligned with the following UN Sustainable Development Goals:
            </p>

            {/* SDG Individual Icons Below the Section */}
            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 max-w-[550px]">
              {[
                "/images/1_E_SDG_goals_icons-individual-rgb-08.png",
                "/images/2_E_SDG_goals_icons-individual-rgb-09.png",
                "/images/3_E_SDG_goals_icons-individual-rgb-10.png",
                "/images/3_E_SDG_goals_icons-individual-rgb-10.png",
                "/images/5_E_SDG_goals_icons-individual-rgb-12.png",
                "/images/6_E_SDG_Icons-17.jpg",

              ].map((src, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform duration-300">
                  <Image
                    src={src}
                    alt={`SDG Goal ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
