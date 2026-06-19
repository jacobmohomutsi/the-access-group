"use client";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { useState } from "react";
import PackageDrawer from "../common/PackageDrawer";
import { boxes } from "@/lib/data/boxes";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const CTA = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const exhibitorBox = boxes.find(b => b.id === "box-7");
    return (
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20 bg-primary relative overflow-hidden h-auto md:h-screen flex flex-col justify-center items-center">
            {/* Decorative */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h2 className="font-black tracking-tight text-3xl md:text-5xl text-white mb-6">
                    Register. Partner. Invest.
                    <br />
                    <span className="text-white">Shape the Future.</span>
                </h2>
                <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                    Be part of history. Whether as a partner, delegate, or supporter, your participation
                    ensures the North West is placed at the forefront of global trade conversations.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                    <a
                        href="/tickets"
                        className="inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300"
                    >
                        Get Tickets Now <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
                <div className="opacity-0 w-full px-4 mt-4 animate-fade-up animation-delay-600 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
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

                <div className="opacity-0 w-full px-4 mt-4 animate-fade-up animation-delay-600 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
                    <a
                        href="#partnerships"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white px-7 py-4 text-base font-semibold text-primary hover:bg-white/10"
                    >
                        <FaLinkedinIn className="w-5 h-5 text-primary hover:text-[#C2A66B]" />  <span className="ml-2">LinkedIn</span>
                    </a>
                    <a
                        href="#tickets"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white px-7 py-4 text-base font-semibold text-primary hover:bg-white/10"
                    >
                        <FaInstagram className="w-5 h-5 text-primary hover:text-[#C2A66B]" />  <span className="ml-2">Instagram</span>
                    </a>
                    <a
                        href="#tickets"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white px-7 py-4 text-base font-semibold text-primary hover:bg-white/10"
                    >
                        <FaFacebookF className="w-5 h-5 text-primary hover:text-[#C2A66B]" />  <span className="ml-2">Facebook</span>
                    </a>
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

export default CTA;
