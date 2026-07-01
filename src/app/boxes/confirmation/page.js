'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, UserCheck, Sparkles, Mail } from 'lucide-react';

export default function BoxConfirmationPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(15);

    useEffect(() => {
        if (countdown <= 0) {
            router.push('/');
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown, router]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
            {/* Branded Header */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-[#304945] py-4 px-4 sm:px-6 lg:px-8 shadow-md">
                <div className="mx-auto max-w-5xl flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex w-14 h-14 bg-white/10 rounded-2xl items-center justify-center p-1.5 border border-white/15">
                            <Image src="/images/logo-white.png" alt="The Access Group" width={70} height={70} className="w-full h-auto object-contain" />
                        </div>
                        <div>
                            <p className="text-lg font-black leading-none text-white">The Access <span className="text-[#C2A66B]">Group</span></p>
                            <p className="text-[10px] tracking-[0.2em] text-white/60 font-bold uppercase mt-0.5">Access Box Enrolment Portal</p>
                        </div>
                    </Link>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white border border-white/15">
                        <ShieldCheck size={14} className="text-[#C2A66B]" /> Secure Enrolment
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 p-8 sm:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#304945] via-[#C2A66B] to-[#304945]" />

                    {/* Celebratory Icon */}
                    <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-200/60 shadow-inner">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" strokeWidth={2.5} />
                    </div>

                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/80 text-emerald-800 uppercase tracking-widest mb-3">
                        Payment Successful
                    </span>

                    <h1 className="text-3xl sm:text-4xl font-black text-[#304945] tracking-tight mb-4">
                        Your Access Box Order is Confirmed!
                    </h1>

                    <p className="text-base text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
                        Thank you for investing in your business journey with <span className="font-bold text-[#304945]">The Access Group</span>. We have verified your payment and initiated your onboarding workflow.
                    </p>

                    {/* Roadmap / What Happens Next */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 text-left mb-10 space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-3 flex items-center gap-2">
                            <Sparkles size={14} className="text-[#C2A66B]" /> What Happens Next?
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <div className="w-9 h-9 rounded-2xl bg-[#304945] text-[#C2A66B] flex items-center justify-center font-bold text-sm shadow-sm">
                                    <Clock size={18} />
                                </div>
                                <h4 className="font-bold text-gray-900 text-sm">1. Instant Verification</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Your transaction receipt has been generated and logged into our corporate directory.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="w-9 h-9 rounded-2xl bg-[#304945] text-[#C2A66B] flex items-center justify-center font-bold text-sm shadow-sm">
                                    <UserCheck size={18} />
                                </div>
                                <h4 className="font-bold text-gray-900 text-sm">2. Consultant Assignment</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Within 24 business hours, a dedicated corporate account manager will be assigned to your box.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="w-9 h-9 rounded-2xl bg-[#304945] text-[#C2A66B] flex items-center justify-center font-bold text-sm shadow-sm">
                                    <Mail size={18} />
                                </div>
                                <h4 className="font-bold text-gray-900 text-sm">3. Onboarding Kickoff</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    You will receive a welcome email with onboarding intake forms and exact deliverable timelines.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Countdown and Action */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                        <p className="text-xs font-semibold text-gray-400">
                            Redirecting to home page in <span className="font-black text-[#304945]">{countdown}s</span>...
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm bg-[#304945] text-white hover:bg-[#C2A66B] hover:text-[#304945] transition-all shadow-md"
                        >
                            Return to Home Now <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-200 bg-white">
                &copy; {new Date().getFullYear()} The Access Group. All rights reserved.
            </footer>
        </div>
    );
}
