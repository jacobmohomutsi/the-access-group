"use client";
import { useState } from "react";
import { Check, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import PartnershipModal from "../common/PartnershipModal";

const partnerships = [
    {
        name: "Platinum Partner",
        subtitle: "Partnership Investment",
        price: "R1,500,000",
        description: "Investment (excl. VAT): R1,500,000",
        features: [
            "Naming rights: \"IEAS 2026 in partnership with [Your Brand]\" across all collateral",
            "Headline Speaker Slot on the main summit stage",
            "Exclusive hosting rights for the Investment Dinner (15 Oct) - VIP seating for 10",
            "Chair a main panel session of strategic choice",
            "Full-page advertisement in the official summit impact report",
            "Prime logo placement on all physical and digital collateral",
            "Dedicated project showcase in the curated Investment Book",
            "Founding Digital Sponsor status on the #1MillionJobs4NW digital Platform",
            "Direct access to the BRICS delegation matchmaking session",
            "Featured brand integration across all media and PR releases",
        ],
        highlighted: false,
        compactPrice: true,
        badge: "Exclusive - 1 Available",
        badgeColor: "bg-secondary text-primary",
    },
    {
        name: "Gold Partner",
        subtitle: "Premium Tier",
        price: "R750,000",
        description: "Investment (excl. VAT): R750,000",
        features: [
            "Keynote Speaker slot in a strategic breakout stream",
            "Host a Roundtable Session on a topic aligned to your mandate",
            "8 VIP tickets to the Investment Dinner (15 October)",
            "Prominent logo on main stage, website & all digital channels",
            "Exclusive access to the curated \"Investor Lounge\" networking session",
            "Priority listing in the official Investment Book",
            "Brand recognition on the #1MillionJobs4NW digital Platform (founding tier)",
            "Social media campaign featuring your brand pre-, during, and post-summit",
        ],
        highlighted: false,
        badge: "Premium Tier",
        badgeColor: "bg-[#A37B30] text-white border border-[#A37B30]/20",
    },
    {
        name: "Silver Partner",
        subtitle: "Standard Tier",
        price: "R350,000",
        description: "Investment (excl. VAT): R350,000",
        features: [
            "Panellist position on a main stage panel discussion",
            "5 tickets to the Investment Dinner (15 October)",
            "Branding on all session backgrounds and delegate materials",
            "Company profile featured in the pre-summit newsletter (5,000+ reach)",
            "Logo on official summit website and event app",
            "Inclusion in the post-summit impact report distributed to all partners",
        ],
        highlighted: false,
        badge: "Standard Tier",
        badgeColor: "bg-slate-500 text-white border border-slate-500/20",
    },
    {
        name: "Bronze Partner",
        subtitle: "Entry Tier",
        price: "R150,000",
        description: "Investment (excl. VAT): R150,000",
        features: [
            "2 tickets to the Investment Dinner + 3 full summit day passes",
            "Logo on the official Sponsor Wall and digital summit agenda",
            "Branded items included in all delegate welcome packs",
            "Acknowledgement in the official summit impact report",
        ],
        highlighted: false,
        badge: "Entry Tier",
        badgeColor: "bg-[#7A3E22] text-white border border-[#7A3E22]/20",
    },
    {
        name: "Technology / In-Kind Partner",
        subtitle: "Bespoke Package",
        price: "Service Value",
        description: "Tailored to contribution",
        features: [
            "Ideal for ICT, connectivity, streaming, production, FinTech & software providers",
            "Recognition as Official Technology / Service Partner of IEAS 2026",
            "Significant brand and experiential presence across summit touchpoints",
            "Opportunity to demo products/services to 300+ decision-makers",
            "Preferred partnership consideration for #1MillionJobs4NW Platform development",
            "Co-branded case study in post-summit impact report",
        ],
        highlighted: false,
        badge: "Bespoke Package",
        badgeColor: "bg-green-700 text-white border border-green-700/20",
    },
];

const Partnerships = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [expandedIdx, setExpandedIdx] = useState(null);
    return (
        <section id="partnerships" className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
            <PartnershipModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                partnershipTier={selectedPartner?.name}
            />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold tracking-widest uppercase text-[#A37B30]">
                        Partnership Investment
                    </span>
                    <h2 className="font-black tracking-tight text-3xl md:text-5xl text-primary mt-3 mb-4">
                        Partnership <span className="text-primary">Tiers & Benefits</span>
                    </h2>
                    <p className="text-primary/70 text-lg max-w-2xl mx-auto">
                        Elevate your brand and drive strategic impact by partnering with the IEAS Summit.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-6 items-start">
                    {[...partnerships].reverse().map((partner, idx) => {
                        const originalIdx = partnerships.length - 1 - idx;
                        const isExpanded = expandedIdx === originalIdx;
                        return (
                            <div
                                key={originalIdx}
                                className={`relative rounded-2xl p-7 flex flex-col cursor-pointer transition-all duration-300 ${partner.highlighted
                                    ? "bg-primary text-white shadow-2xl md:scale-105 border-0 z-10"
                                    : "bg-white border border-primary/10 shadow-lg"
                                    }`}
                                onClick={() => setExpandedIdx(isExpanded ? null : originalIdx)}
                            >
                                {/* Badge */}
                                <span
                                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap ${partner.badgeColor}`}
                                >
                                    {partner.badge}
                                </span>

                                <h3
                                    className={`font-black tracking-tight text-xl mt-4 mb-1 ${partner.highlighted ? "text-white" : "text-primary"
                                        }`}
                                >
                                    {partner.name}
                                </h3>
                                <p
                                    className={`text-xs font-semibold mb-3 uppercase tracking-wider ${partner.highlighted ? "text-secondary" : "text-[#A37B30]"
                                        }`}
                                >
                                    {partner.subtitle}
                                </p>

                                <div className="flex items-baseline gap-2 mb-2">
                                    <span
                                        className={`font-black tracking-tight ${partner.compactPrice ? "text-3xl" : "text-3xl md:text-4xl"} ${partner.highlighted ? "text-white" : "text-primary"
                                            }`}
                                    >
                                        {partner.price}
                                    </span>
                                </div>

                                <p
                                    className={`text-sm mb-5 font-medium ${partner.highlighted ? "text-white/70" : "text-primary/70"
                                        }`}
                                >
                                    {partner.description}
                                </p>

                                {/* Dropdown Toggle */}
                                <div
                                    className={`flex items-center justify-between py-3 border-t border-b border-primary/10 mb-4 transition-colors ${partner.highlighted ? 'hover:bg-white/5 text-secondary' : 'hover:bg-primary/5 text-[#A37B30]'
                                        }`}
                                >
                                    <span className="font-bold text-sm">
                                        Partnership Benefits
                                    </span>
                                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>

                                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[800px] opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'}`}>
                                    <ul className="space-y-3 flex-1">
                                        {partner.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-3">
                                                <Check
                                                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${partner.highlighted ? "text-secondary" : "text-[#A37B30]"
                                                        }`}
                                                />
                                                <span
                                                    className={`text-sm leading-snug ${partner.highlighted ? "text-white/90" : "text-primary/80"
                                                        }`}
                                                >
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    className={`w-full py-3.5 rounded-2xl font-extrabold text-base flex items-center justify-center gap-2 hover:scale-102 transition-all duration-300 mt-auto ${partner.highlighted
                                        ? "bg-secondary text-primary hover:bg-white"
                                        : "bg-primary text-white hover:bg-secondary hover:text-primary"
                                        }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPartner(partner);
                                        setModalOpen(true);
                                    }}
                                    type="button"
                                >
                                    Apply for Partnership <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Partnerships;
