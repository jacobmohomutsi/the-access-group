'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Lock } from 'lucide-react';

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

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex-1 py-20 px-4 mt-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Summit Registration</h1>
                        <p className="text-lg text-gray-600">Select your ticket packages below to attend.</p>
                    </div>

                    <div className="space-y-6">
                        {products.map(product => (
                            <div key={product.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                                    <p className="text-[#304945] font-semibold text-xl mt-1">
                                        R {product.price.toLocaleString()}
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-full border border-gray-200">
                                    <button 
                                        onClick={() => handleQuantityChange(product.id, -1)}
                                        className="w-10 h-10 rounded-full bg-white text-gray-600 shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#304945]"
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-semibold text-gray-900">
                                        {quantities[product.id]}
                                    </span>
                                    <button 
                                        onClick={() => handleQuantityChange(product.id, 1)}
                                        className="w-10 h-10 rounded-full bg-[#304945] text-white shadow-sm flex items-center justify-center hover:bg-[#304945]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#304945]"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
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
                                        <div className="flex items-center justify-center gap-1.5 text-sm text-gray-500 font-medium">
                                            <Lock className="w-4 h-4 text-green-600" />
                                            <span>Secure payments handled by <span className="font-bold text-gray-900">Yoco</span></span>
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
