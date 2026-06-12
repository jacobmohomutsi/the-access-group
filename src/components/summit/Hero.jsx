"use client";
import { useState } from "react";
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
    const partners = [
        { name: partnersData?.partner1name, logo: partnersData?.partner1logo },
        { name: partnersData?.partner2name, logo: partnersData?.partner2logo },
        { name: partnersData?.partner3name, logo: partnersData?.partner3logo },
        { name: partnersData?.partner4name, logo: partnersData?.partner4logo },
        { name: partnersData?.partner5name, logo: partnersData?.partner5logo },
        { name: partnersData?.partner6name, logo: partnersData?.partner6logo },
        { name: partnersData?.partner7name, logo: partnersData?.partner7logo },
        { name: partnersData?.partner8name, logo: partnersData?.partner8logo },
        { name: partnersData?.partner9name, logo: partnersData?.partner9logo },
    ].filter((item) => item.name || item.logo?.node?.sourceUrl);
    const extendedPartners = [...partners, ...partners];

    const handlePrevPartner = () => {
        setPartnerIndex((prev) => (prev - 1 + partners.length) % partners.length);
    };

    const handleNextPartner = () => {
        setPartnerIndex((prev) => (prev + 1) % partners.length);
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/logo-white.png"
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
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase bg-secondary text-primary mb-8">
                        {normalizeDash(data.badgeText)}
                    </span>
                </div>

                <h1 className="opacity-0 animate-fade-up animation-delay-200 font-black tracking-tight text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
                    {normalizeDash(data.heroTitle)}
                </h1>

                <p className="opacity-0 animate-fade-up animation-delay-400 text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                    {normalizeDash(data.heroDescription)}
                </p>

                <div className="opacity-0 animate-fade-up animation-delay-600 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <div className="flex items-center gap-2 text-white/90">
                        <Calendar className="w-5 h-5 text-white" />
                        <span className="text-lg font-medium">{normalizeDash(data.date)}</span>
                    </div>
                    <span className="hidden sm:block text-white/40">|</span>
                    <div className="flex items-center gap-2 text-white/90">
                        <MapPin className="w-5 h-5 text-white" />
                        <span className="text-lg font-medium">{normalizeDash(data.location)}</span>
                    </div>
                </div>

                <div className="opacity-0 animate-fade-up animation-delay-600 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
                    <a
                        href="#partnerships"
                        className="px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:border-secondary hover:text-secondary hover:bg-white/5 transition-all duration-300 min-w-[180px] text-center"
                    >
                        Sponsor
                    </a>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setDrawerOpen(true);
                        }}
                        className="px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:border-secondary hover:text-secondary hover:bg-white/5 transition-all duration-300 min-w-[180px] text-center"
                    >
                        Exhibitor
                    </button>
                    <a
                        href="#tickets"
                        className="px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:border-secondary hover:text-secondary hover:bg-white/5 transition-all duration-300 min-w-[180px] text-center"
                    >
                        Delegate
                    </a>
                </div>
            </div>

            {/* Countdown */}
            <div className="relative z-10 mt-12">
                <CountdownTimer />
            </div>

            {partners.length > 0 && (
                <div className="relative z-10 mt-10 w-full max-w-7xl px-4">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
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
                                                    <span className="text-center text-primary font-bold text-xs sm:text-sm">{item.name}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-6 mt-8">
                            <button
                                onClick={handlePrevPartner}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300"
                                aria-label="Previous partners"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex items-center justify-center gap-2.5">
                                {partners.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setPartnerIndex(idx)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${partnerIndex === idx
                                            ? 'w-6 bg-secondary'
                                            : 'w-2.5 bg-white/20 hover:bg-white/40'
                                            }`}
                                        aria-label={`Go to partner ${idx + 1}`}
                                    />
                                ))}
                            </div>

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
            )}

            <PackageDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                selectedProduct={exhibitorBox}
            />
        </section>
    );
};

export default Hero;
