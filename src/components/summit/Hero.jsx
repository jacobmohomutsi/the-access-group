"use client";
import { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import Image from "next/image";
import PackageDrawer from "../common/PackageDrawer";
import { boxes } from "@/lib/data/boxes";

const Hero = ({ heroData, partnersData }) => {
    const data = heroData;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [partnerIndex, setPartnerIndex] = useState(0);
    const exhibitorBox = boxes.find(b => b.id === "box-7");
    const normalizeDash = (value) => typeof value === "string" ? value.replace(/[\u2013\u2014]/g, "-") : value;
    const rawPartners = [
        {
            name: "DSBD",
            logo: "/images/summit-partners/1TAG-TheAccess Group_DSBD.jpg",
        },
        {
            name: "SEDFA",
            logo: "/images/summit-partners/2TAG-TheAccessGroup_SEDFA.jpg",
        },
        {
            name: "NDP",
            logo: "/images/summit-partners/3TAG-TheAccessGroup_NDP.jpg",
        },
        {
            name: "30 Years Constitution",
            logo: "/images/summit-partners/4TAG-TheAccessGroup_30Years_Constitution.jpg",
        },
        {
            name: "BBDW",
            logo: "/images/summit-partners/5TAG-TheAccessGroup_BBDW.jpg",
        },
        {
            name: "BAKWENA",
            logo: "/images/summit-partners/6TAG-TheAccessGroup_BAKWENA.jpg",
        },
        {
            name: "POMF",
            logo: "/images/summit-partners/7TAG-TheAccessGroup_Pomf .jpg",
        },
        {
            name: "Kgotla Ya Rakhudu",
            logo: "/images/summit-partners/8TAG-TheAccessGroup_Kgotla_ya_rakhudu.jpg",
        },
        {
            name: "Plus94",
            logo: "/images/summit-partners/9TAG-TheAccessGroup_Plus94.jpg",
        },
        {
            name: "Diplomacy SA",
            logo: "/images/summit-partners/10TAG-TheAccessGroup_Dimploacy_SA.jpg",
        },
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
        <section className="relative py-10 min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/The_Access_Group_BackGround.jpg"
                    alt="Import Export Access Summit aerial view"
                    className="w-full h-full object-cover"
                    width={1920}
                    height={1080}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <div className="opacity-0 animate-fade-up">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-secondary text-primary mb-8">
                        {normalizeDash(data.badgeText)}
                    </span>
                </div>
                <div className="flex justify-center items-center h-40">
                    <Image
                        src="/images/Import Export Access Summit 1.png"
                        alt="Summit Title"
                        width={100}
                        height={80}
                        className="w-60"
                    />
                </div>
                <h1 className="opacity-0 animate-fade-up animation-delay-200 font-black tracking-tight text-3xl lg:text-4xl text-white leading-tight mb-6">
                    2026
                </h1>

                <p className="opacity-0 animate-fade-up animation-delay-400 text-sm md:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                    {normalizeDash(data.heroDescription)}
                </p>

                <div className="opacity-0 animate-fade-up animation-delay-600 flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-white/90">
                        <Calendar className="w-5 h-5 text-white" />
                        <span className="text-sm font-medium">{normalizeDash(data.date)}</span>
                    </div>
                    <span className="hidden sm:block text-white/40">|</span>
                    <div className="flex items-center gap-2 text-white/90">
                        <MapPin className="w-5 h-5 text-white" />
                        <span className="text-sm font-medium">{normalizeDash(data.location)}</span>
                    </div>
                </div>

                <div className="opacity-0 animate-fade-up animation-delay-600 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
                    <a
                        href="#partnerships"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#263B38] px-7 py-4 text-base font-semibold text-white hover:bg-white/10"
                    >
                        Sponsor
                    </a>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setDrawerOpen(true);
                        }}
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#263B38] px-7 py-4 text-base font-semibold text-white hover:bg-white/10"
                    >
                        Exhibitor
                    </button>
                    <a
                        href="#tickets"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#263B38] px-7 py-4 text-base font-semibold text-white hover:bg-white/10"
                    >
                        Delegate
                    </a>
                </div>
            </div>

            {/* Countdown */}
            <div className="relative z-10 mt-4">
                <CountdownTimer />
            </div>
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
                                    {item.logo ? (
                                        <Image
                                            width={120}
                                            height={60}
                                            src={item.logo}
                                            alt={item.name}
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
                                        {item.logo ? (
                                            <Image
                                                width={150}
                                                height={80}
                                                src={item.logo}
                                                alt={item.name}
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

            <PackageDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                selectedProduct={exhibitorBox}
            />
        </section>
    );
};

export default Hero;
