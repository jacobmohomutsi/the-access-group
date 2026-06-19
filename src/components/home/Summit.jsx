import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Summit({ featureData }) {
  const data = featureData;


  return (
    <section
      id="summit"
      className="bg-[#304945] text-white py-20 lg:py-28 relative overflow-hidden border-t border-b border-white/5 h-auto md:h-screen"
      style={{
        backgroundImage: "url('/images/The_Access_Group_BackGround.jpg')",
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Blur & Dark Color Tint Overlay */}
      <div className="absolute inset-0 bg-[#304945]/70 backdrop-blur-[4px] pointer-events-none" />

      {/* Decorative background grid/lines */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-center z-10">

        {/* Subtitle */}
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C2A66B]">
          Connecting African innovation to global opportunity.
        </p>
        <div className="flex justify-center items-center">
          <Image
            src="/images/Import Export Access Summit 1.png"
            alt="Summit Title"
            width={100}
            height={100}
            className="w-80"
          />
        </div>



        {/* Dates and Venue badges */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs sm:text-sm font-bold text-[#C2A66B]">
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl shadow-sm">
            <Calendar size={16} />
            <span>15-16 October 2026</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl shadow-sm">
            <MapPin size={16} />
            <span>ANEW Resort Hunters Rest, Rustenburg</span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-8 text-base sm:text-lg leading-relaxed text-white/80 max-w-3xl mx-auto font-medium">
          The Import Export Access Summit is a strategic platform connecting entrepreneurs, investors, government, procurement networks, and industry leaders across Africa and international markets.<br className="hidden sm:inline" />
        </p>


        {/* Single Call to Action Button */}
        <div className="mt-12">
          <a
            href="/summit"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#C2A66B] px-10 py-4.5 text-sm font-extrabold text-[#304945] hover:bg-white hover:text-[#304945] hover:scale-102 transition-all duration-300 shadow-lg shadow-black/20"
          >
            Learn More & Access Summit
          </a>
        </div>

      </div>
    </section>
  );
}
