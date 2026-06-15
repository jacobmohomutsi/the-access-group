"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function About({ aboutData }) {
  const data = aboutData;
  const cards = [
    {
      title: data.card1Title,
      body: data.card1Body,
    },
    {
      title: data.card2Title,
      body: data.card2Body,
    },
    {
      title: data.card3Title,
      body: data.card3Body,
    },
    {
      title: data.card4Title,
      body: data.card4Body,
    },
  ];

  const galleryImages = [
    "/images/9_IMG_8696.JPG",
    "/images/10_IMG_9098.JPG",
    "/images/11_IMG_9137.JPG",
    "/images/12_IMG_9373.jpg",
    "/images/1_4c0c6d82-27b8-4392-b45c-90ac7ceaff5a.JPG",
    "/images/2_CV100841.JPEG",
    "/images/3_IMG_1946.JPG",
    "/images/4_IMG_2240.JPG",
    "/images/5_IMG_4673.jpg",
    "/images/6_IMG_5736.JPG",
    "/images/7_IMG_5869.JPG",
    "/images/8_IMG_6573.JPG"
  ];

  const [galleryIndex, setGalleryIndex] = useState(0);

  const handlePrevGallery = () => {
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextGallery = () => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <section id="about" className="bg-[#F5F5F2] text-primary">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">ABOUT THE ACCESS GROUP</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-primary sm:text-5xl">
              Building pathways between African potential and global opportunity.
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary/80">
              The Access Group is a youth-led strategic consultancy focused on business activation, digital transformation, and market access across Africa.

              We help entrepreneurs, creatives, organisations, and community-led enterprises transition from informal activity into structured, scalable, and globally connected operations.

              Built around accessibility, compliance, and innovation, our work combines local understanding with internationally aligned business systems designed for long-term impact.
            </p>
          </div>

          <div className="text-primary flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10">
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
              >
                {galleryImages.map((src, idx) => (
                  <div key={idx} className="w-full h-full flex-shrink-0 relative">
                    <Image
                      src={src}
                      alt={`Gallery Image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Scroller Indicator with Arrows */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6">
              {/* Left Arrow */}
              <button
                onClick={handlePrevGallery}
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/10 transition-all duration-300 flex-shrink-0"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots Indicator */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGalleryIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${galleryIndex === idx
                      ? 'w-6 bg-[#C2A66B]'
                      : 'w-2.5 bg-primary/50 hover:bg-primary/70'
                      }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNextGallery}
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/10 transition-all duration-300 flex-shrink-0"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/*<div className="grid gap-5 sm:grid-cols-2">
            {cards.map((card) => (
              <div key={card.title} className="rounded-3xl border border-primary/10 bg-primary/5 p-6">
                <p className="text-lg font-bold text-primary">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-primary/70">{card.body}</p>
              </div>
            ))}
          </div>*/}
        </div>

        {/* SDG Goals Section */}
        <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="order-2 lg:order-1">
            <Image
              src="/images/RUEDA-ODS-ENG-768x777.png"
              alt="SDG Goals"
              width={768}
              height={777}
              className="w-full h-auto rounded-2xl object-contain bg-white"
            />
          </div>

          <div className="order-1 lg:order-2">
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
                "/images/4_E_SDG-goals_icons-individual-rgb-11-1024x1024.png",
                "/images/5_E_SDG_goals_icons-individual-rgb-12.png",
                "/images/6_E_SDG_Icons-17.jpg"
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
