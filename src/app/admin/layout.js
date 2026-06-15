'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Ticket, QrCode, BarChart3, LogOut, ClipboardList } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    // Skip sidebar for login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin/tickets', icon: LayoutDashboard },
        { name: 'Orders', href: '/admin/tickets/orders', icon: ShoppingCart },
        { name: 'Tickets', href: '/admin/tickets/tickets', icon: Ticket },
        { name: 'Check-In Scanner', href: '/admin/tickets/checkin', icon: QrCode },
        { name: 'Check-Ins Log', href: '/admin/tickets/checkins', icon: ClipboardList },
        { name: 'Analytics', href: '/admin/tickets/analytics', icon: BarChart3 },
    ];

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.href = '/admin/login';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex fixed h-full z-10">
                <div className="h-16 flex items-center px-6 border-b border-gray-200 bg-[#304945]">
                    <span className="text-white font-bold text-lg uppercase tracking-wider">Ticketing Admin</span>
                </div>
                <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    isActive 
                                    ? 'bg-[#304945] text-white' 
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
                <div className="p-4 border-t border-gray-200">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
