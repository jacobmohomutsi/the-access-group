"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ProgrammeDay = ({ date, title, subtitle, items, isOpen, onToggle }) => {
    return (
        <div className="shadow-lg border border-primary/10 rounded-2xl overflow-hidden bg-white flex flex-col">
            {/* Header */}
            <div className="bg-primary p-6">
                <span className="text-secondary font-bold text-sm tracking-widest uppercase block mb-1">
                    {date}
                </span>
                <h3 className="font-black tracking-tight text-2xl text-white mb-1">
                    {title}
                </h3>
                <p className="text-white/70 text-sm mb-4">
                    {subtitle}
                </p>

                <button 
                    onClick={onToggle}
                    className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
                >
                    <span>Quick Glance for the day</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>

            {/* Items Dropdown */}
            <div 
                className={`flex flex-col transition-all duration-500 overflow-hidden bg-white ${
                    isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className={`p-5 border-l-4 border-secondary bg-white ${
                            index !== items.length - 1 ? 'border-b border-primary/10' : ''
                        }`}
                    >
                        <h4 className="font-bold text-primary text-lg">{item.title}</h4>
                        <p className="text-primary/70 text-sm mt-1">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Programme = () => {
    const [openDay, setOpenDay] = useState(null);

    const thursdayItems = [
        {
            title: "Keynote Address",
            description: "Senior government minister or BRICS nation Finance representative"
        },
        {
            title: "Curated Project Pitches",
            description: "Pre-screened industrial and agro-processing projects presented to investor panel"
        },
        {
            title: "MoU Signing Ceremony",
            description: "Formalising commitments arising from IEAS 2025 between industry and government"
        },
        {
            title: "Structured Networking",
            description: "Facilitated 1:1 matchmaking for investors, traditional councils, and corporates"
        }
    ];

    const fridayItems = [
        {
            title: "Panel 1: The Infrastructure Nexus",
            description: "Energy, Water & Digital Rails for the SEZ - closing the gap to unlock manufacturing and local beneficiation."
        },
        {
            title: "Panel 2: Financing the Pipeline",
            description: "Blended finance models for SMME export growth with DFIs, banks & the Jobs Fund. Global start-ups for Africa."
        },
        {
            title: "Panel 3: Beyond Raw Materials",
            description: "Building continental tech & advanced manufacturing hubs - vehicle assembly, battery production, and mining tech manufacturing in the NW."
        },
        {
            title: "Panel 4: Climate-Smart and AI Trade",
            description: "Carbon credits, green hydrogen & sustainable agri-exports - NW as green economy leader in AI-integrated systems."
        },
        {
            title: "SEZ Innovation Challenge & Closing",
            description: "Unveiling the digital platform & announcement of IEAS 2027"
        }
    ];

    return (
        <section id="programme" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24 bg-primary">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-sm font-semibold tracking-widest uppercase text-white/80">
                        Summit Programme
                    </span>
                    <h2 className="font-black tracking-tight text-3xl md:text-5xl text-white mt-3 mb-4">
                        High-Impact Engagement
                    </h2>
                    <p className="text-white/70 text-lg">
                        Two days of panels, breakaway sessions, and networking
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <ProgrammeDay 
                        date="THURSDAY, 15 OCTOBER 2026"
                        title="Investment & Partnership Dinner"
                        subtitle="By-invitation-only | Closing Deals, Building Trust"
                        items={thursdayItems}
                        isOpen={openDay === 'thursday'}
                        onToggle={() => setOpenDay(openDay === 'thursday' ? null : 'thursday')}
                    />
                    
                    <ProgrammeDay 
                        date="FRIDAY, 16 OCTOBER 2026"
                        title="Main Summit"
                        subtitle="300+ Delegates · Full programme day"
                        items={fridayItems}
                        isOpen={openDay === 'friday'}
                        onToggle={() => setOpenDay(openDay === 'friday' ? null : 'friday')}
                    />
                </div>

            </div>
        </section>
    );
};

export default Programme;
