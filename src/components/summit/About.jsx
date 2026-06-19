"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const About = () => {
    const galleryImages = [
        "/images/2025-summit/TAG_The_Access_Group_1-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_2-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_3-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_4-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_5-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_6-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_7-min.JPG",
        "/images/2025-summit/TAG_The_Access_Group_8-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_9-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_10-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_11-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_12-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_13-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_14-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_15-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_16-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_17-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_18-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_19-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_20-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_21-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_22-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_23-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_24-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_25-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_26-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_27-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_28-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_30-min.jpg",
        "/images/2025-summit/TAG_The_Access_Group_31-min.jpg",
    ];

    const [galleryIndex, setGalleryIndex] = useState(0);

    const handleNextGallery = () => {
        if (!galleryRef.current) return;

        setGalleryIndex((prev) => {
            const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
            const maxIndex = isDesktop ? galleryImages.length - 3 : galleryImages.length - 1;
            const next = prev >= maxIndex ? 0 : prev + 1;

            const slideWidth = isDesktop ? galleryRef.current.clientWidth / 3 : galleryRef.current.clientWidth;

            galleryRef.current.scrollTo({
                left: next * slideWidth,
                behavior: "smooth",
            });

            return next;
        });
    };

    const handlePrevGallery = () => {
        if (!galleryRef.current) return;

        setGalleryIndex((prev) => {
            const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
            const maxIndex = isDesktop ? galleryImages.length - 3 : galleryImages.length - 1;
            const next = prev <= 0 ? maxIndex : prev - 1;

            const slideWidth = isDesktop ? galleryRef.current.clientWidth / 3 : galleryRef.current.clientWidth;

            galleryRef.current.scrollTo({
                left: next * slideWidth,
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
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
        const slideWidth = isDesktop ? slider.clientWidth / 3 : slider.clientWidth;

        const currentIndex = Math.round(
            slider.scrollLeft / slideWidth
        );

        setGalleryIndex(currentIndex);
    };

    return (
        <>
            <section id="about" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24 bg-slate-50 h-auto md:h-screen">
                <div className="max-w-8xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sm font-semibold tracking-widest uppercase text-primary">
                            About the Summit
                        </span>
                        <h2 className="font-black tracking-tight text-2xl md:text-4xl text-primary mt-3 mb-6">
                            Where African Innovation
                            <br />
                            Meets <span className="text-primary">Global Markets</span>
                        </h2>
                        <p className="text-md text-primary/80 max-w-5xl mx-auto leading-relaxed">
                            The <strong>Import-Export Access Summit (IEAS) 2026</strong>, hosted by <strong>The Access Group</strong>,
                            is a high-level platform connecting export-ready SMMEs, youth enterprises, investors, and policymakers.
                            Building on the success of the 2025 summit held under the G20 South Africa Presidency,
                            this year we go bigger - with a focus on turning trade policy into real, actionable opportunities.
                        </p>
                    </div>

                    {/* YouTube embed */}
                    <div className="mb-20 max-w-2xl mx-auto">
                        <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video">
                            <iframe
                                src="https://www.youtube.com/embed/1gLvx_oQImk"
                                title="IEAS Summit 2025 Highlights"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex flex-col items-center bg-white h-auto md:h-screen justify-center">
                <h2 className="font-black tracking-tight text-2xl md:text-4xl text-primary mt-3 mb-6 md:mb-12">
                    Highlights From 2025
                </h2>
                <div className="relative w-full max-w-6xl mx-auto h-96 overflow-hidden">

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
                                className="relative min-w-full md:min-w-[33.333333%] h-full snap-center md:snap-start flex-shrink-0"
                            >
                                <Image
                                    src={image}
                                    alt={`Gallery Image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover object-center px-3 rounded-4xl"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
