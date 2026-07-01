'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, RefreshCw, ShieldAlert, HelpCircle } from 'lucide-react';

export default function BoxPaymentFailedPage() {
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
                        <ShieldAlert size={14} className="text-rose-400" /> Payment Notice
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 p-8 sm:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500" />

                    {/* Alert Icon */}
                    <div className="mx-auto w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 border border-rose-200/60 shadow-inner">
                        <AlertCircle className="w-10 h-10 text-rose-600" strokeWidth={2.5} />
                    </div>

                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-rose-100/80 text-rose-800 uppercase tracking-widest mb-3">
                        Payment Not Completed
                    </span>

                    <h1 className="text-2xl sm:text-3xl font-black text-[#304945] tracking-tight mb-4">
                        We Couldn&apos;t Process Your Payment
                    </h1>

                    <p className="text-sm text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
                        Your transaction was either cancelled or declined by your banking provider. Don&apos;t worry—no funds were captured and your order details are saved.
                    </p>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-left mb-8 space-y-3">
                        <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5 uppercase tracking-wider">
                            <HelpCircle size={14} className="text-[#304945]" /> Common Reasons for Failure:
                        </h4>
                        <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
                            <li>3D-Secure / OTP verification timed out or was cancelled.</li>
                            <li>Daily online banking card transaction limit exceeded.</li>
                            <li>Network interruption during gateway redirection.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/#boxes"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-extrabold text-sm bg-[#304945] text-white hover:bg-[#C2A66B] hover:text-[#304945] transition-all shadow-md"
                        >
                            <RefreshCw size={16} /> Try Enrolment Again
                        </Link>
                        <Link
                            href="/"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                        >
                            <ArrowLeft size={16} /> Back to Home
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
