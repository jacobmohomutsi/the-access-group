'use client';

import React from 'react';
import { HelpCircle, QrCode, Ticket, ShoppingCart, Users, BarChart3, CheckCircle2, AlertCircle, Info, Sparkles, BookOpen } from 'lucide-react';

export default function AdminUserGuidePage() {
    return (
        <div className="max-w-5xl mx-auto pb-12">
            {/* Header Banner */}
            <div className="bg-[#304945] text-white rounded-3xl p-8 mb-8 shadow-xl relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#C2A66B]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#C2A66B] text-[#304945] uppercase tracking-wider">
                        <BookOpen size={14} /> Simplified Manual
                    </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                    Admin System User Guide
                </h1>
                <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed">
                    Welcome to the Management Portal! This guide explains everything in simple, non-technical words so anyone can operate the system without needing IT support.
                </p>
            </div>

            {/* Quick Summary Card */}
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 mb-10 flex items-start gap-4">
                <div className="p-3 bg-amber-500 text-white rounded-2xl flex-shrink-0 mt-0.5 shadow-sm">
                    <Sparkles size={24} />
                </div>
                <div>
                    <h2 className="text-lg font-black text-amber-950 mb-1">How The Whole System Works (In 3 Simple Steps)</h2>
                    <ol className="text-xs sm:text-sm text-amber-900 space-y-2 list-decimal list-inside font-medium mt-2 leading-relaxed">
                        <li><strong className="text-amber-950 font-bold">Client Buys Online:</strong> When someone buys tickets or boxes on the website, they pay securely via Paystack.</li>
                        <li><strong className="text-amber-950 font-bold">Tickets Are Created:</strong> As soon as payment succeeds, the system automatically creates an Order and generates unique QR code summit tickets.</li>
                        <li><strong className="text-amber-950 font-bold">Check-in at the Summit:</strong> On event day, your team uses the <span className="underline font-bold">Scanner</span> tab on their phone or tablet to scan people&apos;s tickets at the door.</li>
                    </ol>
                </div>
            </div>

            <h2 className="text-xl font-black text-[#304945] mb-6 flex items-center gap-2">
                <Info className="text-[#C2A66B]" /> Step-by-Step Guide for Every Tab
            </h2>

            {/* Grid of Section Guides */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dashboard */}
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl font-bold">
                            📊
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">1. Dashboard</h3>
                            <p className="text-xs text-gray-400 font-semibold uppercase">Your Home Screen</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                        This is your main overview screen. Look here when you want a quick answer to: <span className="italic font-medium">&quot;How many tickets have we sold so far, and how full is the summit venue?&quot;</span>
                    </p>
                    <div className="bg-gray-50 rounded-2xl p-3 text-xs text-gray-500">
                        <strong>💡 Tip:</strong> Look at the progress bars to see the percentage of total venue capacity currently filled.
                    </div>
                </div>

                {/* Scanner */}
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-100 text-blue-800 rounded-2xl font-bold">
                            📷
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">2. Scanner (QR Code Reader)</h3>
                            <p className="text-xs text-gray-400 font-semibold uppercase">For Event Door Entry</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                        Turn any phone, tablet, or computer into a door check-in scanner! Open this tab on event day, click <strong className="text-gray-800">&quot;Allow Camera&quot;</strong>, and point the camera at an attendee&apos;s paper or phone ticket.
                    </p>
                    <div className="bg-gray-50 rounded-2xl p-3 text-xs text-gray-500">
                        <strong>💡 Tip:</strong> If someone&apos;s phone screen is cracked or won&apos;t scan, you can type their ticket number or name into the manual search box right on the scanner screen.
                    </div>
                </div>

                {/* Tickets */}
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-purple-100 text-purple-800 rounded-2xl font-bold">
                            🎟️
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">3. Tickets List</h3>
                            <p className="text-xs text-gray-400 font-semibold uppercase">Manage Attendee Passes</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                        Shows every single summit ticket that exists. If an attendee calls saying <span className="italic font-medium">&quot;I lost my ticket email!&quot;</span>, come to this tab, search for their name, and click <strong className="text-gray-800">&quot;Resend Email&quot;</strong> or download their PDF.
                    </p>
                    <div className="bg-gray-50 rounded-2xl p-3 text-xs text-gray-500">
                        <strong>💡 Tip:</strong> You can see who has already checked into the venue by checking the &quot;Checked In&quot; status badge.
                    </div>
                </div>

                {/* Orders */}
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl font-bold">
                            🛒
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">4. Orders</h3>
                            <p className="text-xs text-gray-400 font-semibold uppercase">Payment Transactions</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                        Whenever someone pays on the website, an Order is created here. An Order can contain multiple tickets (for example, a corporate buyer purchasing 5 passes at once).
                    </p>
                    <div className="bg-gray-50 rounded-2xl p-3 text-xs text-gray-500">
                        <strong>💡 Tip:</strong> Green status means paid and verified. If a payment failed or was cancelled, it will show up as pending or failed.
                    </div>
                </div>

                {/* Speakers */}
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-rose-100 text-rose-800 rounded-2xl font-bold">
                            🎤
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">5. Speakers</h3>
                            <p className="text-xs text-gray-400 font-semibold uppercase">Website Speaker Roster</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                        Control the speakers displayed on the public website! You can add new speakers, upload headshot pictures, write their biography, or hide them from the website without writing any code.
                    </p>
                    <div className="bg-gray-50 rounded-2xl p-3 text-xs text-gray-500">
                        <strong>💡 Tip:</strong> Toggle the &quot;Active&quot; switch to immediately show or hide a speaker on the live homepage.
                    </div>
                </div>

                {/* Check-Ins Log */}
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-teal-100 text-teal-800 rounded-2xl font-bold">
                            📋
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">6. Check-Ins Log</h3>
                            <p className="text-xs text-gray-400 font-semibold uppercase">Live Door Activity History</p>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                        A live chronological record showing exactly what time each attendee walked through the doors and which staff member scanned their ticket.
                    </p>
                    <div className="bg-gray-50 rounded-2xl p-3 text-xs text-gray-500">
                        <strong>💡 Tip:</strong> Great for reporting peak arrival hours after the summit ends.
                    </div>
                </div>
            </div>
        </div>
    );
}
