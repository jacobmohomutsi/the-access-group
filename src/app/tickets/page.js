'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Lock, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

// Use standard client for public read
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function TicketsPage() {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data, error: supaError } = await supabase
                    .from('products')
                    .select('*')
                    .eq('active', true)
                    .order('price', { ascending: false });

                console.log("Products:", data);
                console.log("Supabase Error:", supaError);
                if (supaError) {
                    console.error("Supabase Error:", supaError);
                    setError(supaError.message);
                }

                if (data) {
                    setProducts(data);
                    const initial = {};
                    data.forEach(p => initial[p.id] = 0);
                    setQuantities(initial);
                }
            } catch (err) {
                console.error("Fetch exception:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const handleQuantityChange = (id, delta) => {
        setQuantities(prev => {
            const current = prev[id] || 0;
            const next = current + delta;
            if (next < 0) return prev;
            return { ...prev, [id]: next };
        });
    };

    const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
    const totalAmount = products.reduce((sum, p) => sum + (p.price * (quantities[p.id] || 0)), 0);

    const handleProceed = () => {
        const selectedItems = products
            .filter(p => quantities[p.id] > 0)
            .map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
                quantity: quantities[p.id]
            }));

        // Encode items and redirect
        const params = new URLSearchParams();
        params.set('items', JSON.stringify(selectedItems));
        window.location.href = `/tickets/checkout?${params.toString()}`;
    };


    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-red-100">
                    <div className="text-red-500 text-4xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to load tickets</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#304945] text-white rounded-lg font-medium hover:bg-[#304945]/90">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading tickets...</div>;
    }

    const productDescription = {
        "Gala Dinner": "Day 1 · 15 October 2026 | An exclusive evening of networking, fine dining & deal-making",
        "Corporate Gala Package": "Investment Gala Dinner Only R22 000 (10 people) | An exclusive evening of networking, fine dining & deal-making",
        "Summit Ticket": "Day 2 · 16 October 2026 | Full-day summit with panels, breakaways & exhibitions",
        "2 Day Pass": "Both Days · 15-16 October | Complete experience - Gala Dinner + Main Summit"
    }

    switch (products[0].name) {
        case "Gala Dinner":
            productDescription["Gala Dinner"];
            break;
        case "Corporate Gala Package":
            productDescription["Corporate Gala Package"];
            break;
        case "Summit Ticket":
            productDescription["Summit Ticket"];
            break;
        case "2 Day Pass":
            return <div>{productDescription["2 Day Pass"]}</div>;
        default:
            return <div>Default products</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex-1 py-20 px-4 mt-16">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-sm font-semibold tracking-widest uppercase text-primary">
                            Secure Your Spot
                        </span>
                        <h1 className="font-black tracking-tight text-4xl md:text-5xl text-primary mt-3 mb-4">
                            Summit Registration
                        </h1>
                        <p className="text-primary/70 text-lg max-w-2xl mx-auto">
                            Select your ticket packages below to attend.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <div key={product.id} className="relative bg-white shadow-lg rounded-xl flex flex-col justify-between min-h-[240px] overflow-hidden border border-primary/10">
                                {/* Ticket Edge Cutouts */}
                                <div className="absolute top-[60%] -translate-y-1/2 -left-4 w-8 h-8 bg-gray-50 rounded-full border border-primary/10 border-r-0 z-10" />
                                <div className="absolute top-[60%] -translate-y-1/2 -right-4 w-8 h-8 bg-gray-50 rounded-full border border-primary/10 border-l-0 z-10" />

                                <div className="p-6 pb-5 flex-1 relative">
                                    <span className="inline-block px-2 py-1 bg-secondary text-secondary-dark text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                                        Admission
                                    </span>
                                    <h3 className="font-black tracking-tight text-xl text-primary leading-tight mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-primary/70 leading-relaxed mb-2">
                                        {productDescription[product.name]}
                                    </p>
                                </div>

                                <div className="relative bg-primary/10">
                                    {/* Dashed divider line */}
                                    <div className="absolute top-0 left-4 right-4 border-t-2 border-dashed border-gray-200" />

                                    <div className="p-6 pt-5 bg-white/50">
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="font-black tracking-tight text-2xl text-primary">
                                                R {product.price.toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-2 bg-white p-1.5 rounded-lg border border-gray-100">
                                            <button
                                                onClick={() => handleQuantityChange(product.id, -1)}
                                                className="w-8 h-8 rounded-md bg-white text-gray-600 shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 focus:outline-none transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <span className="w-8 text-center font-bold text-lg text-primary">
                                                {quantities[product.id] || 0}
                                            </span>
                                            <button
                                                onClick={() => handleQuantityChange(product.id, 1)}
                                                className="w-8 h-8 rounded-md bg-primary text-white shadow-sm flex items-center justify-center hover:bg-primary/90 focus:outline-none transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalItems > 0 && (
                        <div className="mt-12 sticky bottom-8">
                            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-[#C2A66B]/30 relative overflow-hidden">
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
                                    <div>
                                        <p className="text-gray-500 font-medium mb-1">Order Total ({totalItems} items)</p>
                                        <p className="text-4xl font-black text-[#304945]">R {totalAmount.toLocaleString()}</p>
                                    </div>
                                    <div className="w-full sm:w-auto flex flex-col gap-3">
                                        <button
                                            onClick={handleProceed}
                                            className="w-full px-8 py-4 bg-[#C2A66B] text-white rounded-xl font-bold text-lg hover:bg-[#C2A66B]/90 transition-all duration-300 shadow-lg shadow-[#C2A66B]/20 focus:outline-none focus:ring-4 focus:ring-[#C2A66B]/50 hover:scale-105"
                                        >
                                            Proceed to Checkout
                                        </button>
                                        <div className="flex items-center justify-start gap-1.5 text-sm text-gray-500 font-medium">
                                            <span className="flex items-center justify-start">Secure payments handled by <Image src='/images/yoco_logo.png' alt="yoco" width={60} height={100} className="ml-2" /></span>
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative background element */}
                                <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#C2A66B]/5 rounded-full blur-2xl z-0 pointer-events-none"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
