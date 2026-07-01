'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Ticket, QrCode, BarChart3, LogOut, ClipboardList, Menu, X, Tags, Mic, BookOpen, Info, HelpCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Skip sidebar for login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin/tickets', icon: LayoutDashboard, quickLink: true },
        { name: 'User Guide', href: '/admin/guide', icon: BookOpen, quickLink: true },
        { name: 'Scanner', href: '/admin/tickets/checkin', icon: QrCode, quickLink: true },
        { name: 'Tickets', href: '/admin/tickets/tickets', icon: Ticket, quickLink: true },
        { name: 'Ticket Types', href: '/admin/tickets/types', icon: Tags },
        { name: 'Orders', href: '/admin/tickets/orders', icon: ShoppingCart },
        { name: 'Speakers', href: '/admin/speakers', icon: Mic },
        { name: 'Check-Ins Log', href: '/admin/tickets/checkins', icon: ClipboardList },
        { name: 'Analytics', href: '/admin/tickets/analytics', icon: BarChart3 },
    ];

    const quickLinks = navigation.filter(item => item.quickLink);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.href = '/admin/login';
    };

    return (
        <div className="min-h-screen bg-gray-50/50 flex font-sans">
            {/* ----------------- DESKTOP SIDEBAR ----------------- */}
            <div className="w-64 bg-white border-r border-gray-100 shadow-sm flex-col hidden md:flex fixed h-full z-10">
                <div className="h-20 flex flex-col items-center justify-center border-b border-primary/10 bg-primary p-4">
                    <Link href={"/"}>
                        <Image
                            src="/images/logo-white.png"
                            alt="The Access Group"
                            width={140}
                            height={20}
                            className="object-contain mb-1"
                        />
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1.5 px-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${isActive
                                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                                    : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-primary/70'}`} strokeWidth={isActive ? 2.5 : 2} />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                        <LogOut className="w-5 h-5" strokeWidth={2.5} />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* ----------------- MOBILE TOP HEADER ----------------- */}
            <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-primary z-30 flex items-center justify-between px-4 shadow-md">
                <Image
                    src="/images/logo-white.png"
                    alt="The Access Group"
                    width={110}
                    height={15}
                    className="object-contain"
                />
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="text-white p-2 focus:outline-none hover:bg-white/10 rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* ----------------- MOBILE BOTTOM NAV ----------------- */}
            <div className="md:hidden w-full fixed bottom-0 left-0 w-full h-16 bg-white z-30 border-t border-gray-100 flex items-center justify-around pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
                {quickLinks.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={`text-[10px] font-bold ${isActive ? 'text-primary' : ''}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>

            {/* ----------------- MOBILE FULL SCREEN MENU ----------------- */}
            <div className={`md:hidden fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-4 bg-primary text-white">
                    <span className="font-bold tracking-wider text-sm">MENU</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-4rem)] p-4 flex flex-col gap-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-bold transition-all duration-200 ${isActive
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'text-gray-700 bg-gray-50'
                                    }`}
                            >
                                <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-primary'}`} strokeWidth={2.5} />
                                {item.name}
                            </Link>
                        );
                    })}

                    <div className="mt-auto pt-8 pb-4">
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                handleLogout();
                            }}
                            className="flex items-center justify-center gap-3 px-4 py-4 w-full rounded-2xl text-base font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                        >
                            <LogOut className="w-6 h-6" strokeWidth={2.5} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* ----------------- MAIN CONTENT ----------------- */}
            <div className="flex-1 md:ml-64 flex bg-white flex-col min-h-screen pt-16 md:pt-0 pb-16 md:pb-0 w-full overflow-hidden">
                <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full bg-white md:bg-transparent min-h-full overflow-hidden">
                    {pathname !== '/admin/guide' && (
                        <div className="mb-8 bg-[#304945] text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md border border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-[#C2A66B] text-[#304945] rounded-xl flex-shrink-0 font-extrabold">
                                    <Info size={20} strokeWidth={2.5} />
                                </div>
                                <div className="text-xs sm:text-sm">
                                    <span className="font-bold text-white block mb-0.5">Need help operating the admin dashboard?</span>
                                    Click the button to open the simplified, step-by-step User Guide manual.
                                </div>
                            </div>
                            <Link
                                href="/admin/guide"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C2A66B] text-[#304945] hover:bg-white transition-all flex-shrink-0 shadow-sm"
                            >
                                <BookOpen size={16} /> Open User Guide &rarr;
                            </Link>
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
