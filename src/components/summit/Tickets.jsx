"use client";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import MailingListModal from "../common/MailingListModal";

const tickets = [
    {
        name: "Investment Gala Dinner",
        subtitle: "Day 1 · 15 October 2026",
        price: "R2,500",
        originalPrice: null,
        description: "An exclusive evening of networking, fine dining & deal-making",
        features: [
            "Gala dinner & drinks reception",
            "High-level investor networking",
            "Keynote address by guest speaker",
            "Live entertainment",
            "Access to deal-room matchmaking",
        ],
        highlighted: false,
        badge: "Day 1",
        badgeColor: "bg-secondary text-primary border border-secondary/20",
    },
    {
        name: "Main Summit",
        subtitle: "Day 2 · 16 October 2026",
        price: "R1,500",
        originalPrice: null,
        description: "Full-day summit with panels, breakaways & exhibitions",
        features: [
            "All panel & breakaway sessions",
            "Exhibition hall access",
            "Networking lunches & refreshments",
            "Digital delegate pack",
            "Certificate of attendance",
            "Post-summit resource portal",
        ],
        highlighted: true,
        badge: "Most Popular",
        badgeColor: "bg-secondary text-primary",
    },
    {
        name: "Full Access Pass",
        subtitle: "Both Days · 15-16 October",
        price: "R3,500",
        originalPrice: "R4,000",
        description: "Complete experience - Gala Dinner + Main Summit",
        features: [
            "Everything in Gala Dinner",
            "Everything in Main Summit",
            "Priority front-row seating",
            "VIP networking dinner",
            "1-on-1 matchmaking sessions",
            "Printed summit report",
        ],
        highlighted: false,
        badge: "Best Value",
        badgeColor: "bg-secondary text-primary",
    },
    {
        name: "Corperate/Group Ticket",
        subtitle: "Investment Gala Dinner Only R22 000 (10 people)",
        price: "R22,000",
        originalPrice: "R25,000",
        description: "An exclusive evening of networking, fine dining & deal-making",
        features: [
            "Gala dinner & drinks reception",
            "High-level investor networking",
            "Keynote address by guest speaker",
            "Live entertainment",
            "Access to deal-room matchmaking",
        ],
        highlighted: false,
        badge: "Save R700",
        badgeColor: "bg-secondary text-primary",
    },
];

const Tickets = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <section id="tickets" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24 bg-slate-50">
            <MailingListModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <span className="text-sm font-semibold tracking-widest uppercase text-primary">
                        Secure Your Spot
                    </span>
                    <h2 className="font-black tracking-tight text-3xl md:text-5xl text-primary mt-3 mb-4">
                        Get Your Tickets
                    </h2>
                    <p className="text-primary/70 text-md max-w-2xl mx-auto">
                        Choose the experience that suits you - from the Investment Gala Dinner on Day 1 to the full Main Summit on Day 2, or get the best value with a Full Access Pass.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {tickets.map((ticket, idx) => (
                        <div
                            key={idx}
                            className={`relative rounded-2xl p-7 flex flex-col ${ticket.highlighted
                                ? "bg-primary text-white shadow-2xl border-0 z-10"
                                : "bg-white border border-primary/10 shadow-lg"
                                }`}
                        >
                            {/* Badge */}
                            <span
                                className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${ticket.badgeColor}`}
                            >
                                {ticket.badge}
                            </span>

                            <h3
                                className={`font-black tracking-tight text-xl mt-4 mb-1 ${ticket.highlighted ? "text-white" : "text-primary"
                                    }`}
                            >
                                {ticket.name}
                            </h3>
                            <p
                                className={`text-xs font-semibold mb-3 ${ticket.highlighted ? "text-white" : "text-primary"
                                    }`}
                            >
                                {ticket.subtitle}
                            </p>

                            <div className="flex items-baseline gap-2 mb-2">
                                <span
                                    className={`font-black tracking-tight text-3xl ${ticket.highlighted ? "text-white" : "text-primary"
                                        }`}
                                >
                                    {ticket.price}
                                </span>
                                {ticket.originalPrice && (
                                    <span className="text-primary/70 line-through text-base">
                                        {ticket.originalPrice}
                                    </span>
                                )}
                            </div>

                            <p
                                className={`text-sm mb-5 ${ticket.highlighted ? "text-white/70" : "text-primary/70"
                                    }`}
                            >
                                {ticket.description}
                            </p>

                            <ul className="space-y-2.5 mb-6 flex-1">
                                {ticket.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-2.5">
                                        <Check
                                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${ticket.highlighted ? "text-white" : "text-primary"
                                                }`}
                                        />
                                        <span
                                            className={`text-sm ${ticket.highlighted ? "text-white/90" : "text-primary/80"
                                                }`}
                                        >
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-3.5 rounded-2xl font-extrabold text-base flex items-center justify-center gap-2 hover:scale-102 transition-all duration-300 ${ticket.highlighted
                                    ? "bg-secondary text-primary hover:bg-white"
                                    : "bg-primary text-white hover:bg-secondary hover:text-primary"
                                    }`}
                                onClick={() => setModalOpen(true)}
                                type="button"
                            >
                                Join waiting list <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                <p className="text-center text-primary/70 text-sm mt-8">
                    Secure payments powered by Yoco · All prices in South African Rand (ZAR)
                </p>
            </div>
        </section>
    );
};

export default Tickets;
