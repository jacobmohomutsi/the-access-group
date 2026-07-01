'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Info } from 'lucide-react';
import { createCheckout } from './actions';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const itemsParam = searchParams.get('items');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gateway, setGateway] = useState('paystack'); // 'yoco' | 'paystack'

    useEffect(() => {
        if (itemsParam) {
            try {
                setItems(JSON.parse(itemsParam));
            } catch (e) {
                console.error("Failed to parse items", e);
            }
        }
    }, [itemsParam]);

    if (!items || items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No items selected</h2>
                    <a href="/tickets" className="text-primary font-semibold hover:underline">Go back to tickets</a>
                </div>
            </div>
        );
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleSubmit = async (formData) => {
        setLoading(true);
        formData.append('items', JSON.stringify(items));
        try {
            if (gateway === 'paystack') {
                const payload = {
                    buyerName: formData.get('buyerName'),
                    buyerSurname: formData.get('buyerSurname'),
                    buyerEmail: formData.get('buyerEmail'),
                    buyerPhone: formData.get('buyerPhone'),
                    buyerCompany: formData.get('buyerCompany'),
                    items
                };

                const res = await fetch('/api/payments/paystack/initialize', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await res.json();
                if (res.ok && result.authorization_url) {
                    window.location.href = result.authorization_url;
                } else {
                    throw new Error(result.message || result.error || "Failed to initialize Paystack checkout");
                }
            } else {
                // Existing Yoco implementation completely untouched
                const result = await createCheckout(formData);
                if (result && result.url) {
                    window.location.href = result.url;
                } else {
                    throw new Error("No redirect URL returned");
                }
            }
        } catch (error) {
            console.error("Checkout failed", error);
            setLoading(false);
            alert(`Failed to initiate checkout: ${error.message || 'Please try again.'}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-between pb-12">
            {/* Branded Header */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-[#304945] py-4 px-4 sm:px-6 lg:px-8 shadow-md">
                <div className="mx-auto max-w-6xl flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex w-16 items-center justify-center">
                            <Image src="/images/logo-white.png" alt="The Access Group" width={90} height={90} />
                        </div>
                        <div>
                            <p className="text-lg font-bold leading-none text-white">The Access <span className="text-[#C2A66B]">Group</span></p>
                            <p className="text-[10px] tracking-[0.22em] text-white/60 font-semibold uppercase">IEAS Summit Tickets</p>
                        </div>
                    </Link>
                    <Link href="/tickets" className="text-xs font-bold text-[#C2A66B] hover:text-white transition-colors">
                        &larr; Back to Tickets
                    </Link>
                </div>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mt-8 px-4 sm:px-6 lg:px-8 flex-1">

                {/* Form Section */}
                <div className="md:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 relative overflow-hidden h-fit">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#304945] via-[#C2A66B] to-[#304945]" />

                    <div className="flex items-center justify-between mb-6 mt-2">
                        <h2 className="text-3xl font-black tracking-tight text-[#304945]">Buyer Information</h2>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#304945]/10 text-[#304945]">
                            <ShieldCheck size={14} className="text-[#C2A66B]" /> Secure Checkout
                        </span>
                    </div>

                    <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-gray-600">
                        <Info size={18} className="text-[#304945] flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold text-gray-900 block mb-0.5">Ticket Assignment Note</span>
                            Enter the primary billing contact below. Once your payment completes, you will receive a management link where you can assign individual attendee names and emails to each ticket.
                        </div>
                    </div>

                    <form action={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="buyerName" className="block text-sm font-bold text-primary/80 mb-2">First Name <span className="text-red-500">*</span></label>
                                <input type="text" name="buyerName" id="buyerName" required
                                    className="block w-full rounded-xl text-gray-900 border-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-base py-3 px-4 bg-gray-50/50 focus:bg-white transition-colors border" />
                            </div>
                            <div>
                                <label htmlFor="buyerSurname" className="block text-sm font-bold text-primary/80 mb-2">Surname <span className="text-red-500">*</span></label>
                                <input type="text" name="buyerSurname" id="buyerSurname" required
                                    className="block w-full rounded-xl text-gray-900 border-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-base py-3 px-4 bg-gray-50/50 focus:bg-white transition-colors border" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="buyerEmail" className="block text-sm font-bold text-primary/80 mb-2">Email Address <span className="text-red-500">*</span></label>
                                <input type="email" name="buyerEmail" id="buyerEmail" required
                                    className="block w-full rounded-xl text-gray-900 border-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-base py-3 px-4 bg-gray-50/50 focus:bg-white transition-colors border" />
                            </div>
                            <div>
                                <label htmlFor="buyerPhone" className="block text-sm font-bold text-primary/80 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                <input type="tel" name="buyerPhone" id="buyerPhone" required
                                    className="block w-full rounded-xl text-gray-900 border-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-base py-3 px-4 bg-gray-50/50 focus:bg-white transition-colors border" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="buyerCompany" className="block text-sm font-bold text-primary/80 mb-2">Company Name (Optional)</label>
                            <input type="text" name="buyerCompany" id="buyerCompany"
                                className="block w-full rounded-xl text-gray-900 border-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-base py-3 px-4 bg-gray-50/50 focus:bg-white transition-colors border" />
                        </div>

                        {/* Payment Gateway Selector */}
                        <div className="pt-4">
                            <label className="hidden text-sm font-bold text-primary/80 mb-3">Select Payment Gateway <span className="text-red-500">*</span></label>
                            <div className="grid grid-cols-1 gap-4">
                                {/* <div 
                                    onClick={() => setGateway('yoco')}
                                    className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                                        gateway === 'yoco' 
                                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.02]' 
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50 opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    {gateway === 'yoco' && (
                                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">✓</div>
                                    )}
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="font-black text-lg text-primary">Checkout with Yoco</div>
                                    </div>
                                    <p className="text-xs text-gray-500 font-medium">Pay securely with Cards or Apple Pay via Yoco portal.</p>
                                </div> */}

                                <div
                                    onClick={() => setGateway('paystack')}
                                    className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${gateway === 'paystack'
                                        ? 'border-[#0BA4DB] bg-[#0BA4DB]/5 shadow-md shadow-[#0BA4DB]/10 scale-[1.02]'
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50 opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    {gateway === 'paystack' && (
                                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#0BA4DB] text-white flex items-center justify-center text-xs font-bold">✓</div>
                                    )}
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="font-black text-lg text-[#0BA4DB]">Checkout with Paystack</div>
                                    </div>
                                    <p className="text-xs text-gray-500 font-medium">Pay securely across Africa with Cards, EFT, or Mobile Money.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-l font-black text-white focus:outline-none focus:ring-4 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-1 ${gateway === 'yoco'
                                    ? 'bg-primary hover:bg-primary/90 shadow-primary/20 focus:ring-primary/50'
                                    : 'bg-[#0BA4DB] hover:bg-[#0BA4DB]/90 shadow-[#0BA4DB]/20 focus:ring-[#0BA4DB]/50'
                                    }`}
                            >
                                {loading ? 'Processing...' : (
                                    <span className="flex items-center justify-center gap-2">
                                        {gateway === 'yoco' ? (
                                            <>Pay with <Image src='/images/yoco_logo.png' alt="yoco" width={60} height={100} className="ml-1 h-7 w-auto object-contain brightness-0 invert" /></>
                                        ) : (
                                            <>Pay with <span className="font-black tracking-wider uppercase ml-1">Paystack</span></>
                                        )}
                                    </span>
                                )}
                            </button>
                            <p className="text-xs text-center text-primary/50 mt-4 font-medium flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                You will be redirected to {gateway === 'yoco' ? "Yoco's" : "Paystack's"} secure portal to complete your payment.
                            </p>
                        </div>
                    </form>
                </div>

                {/* Summary Section */}
                <div className="md:col-span-5">
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 sticky top-24">
                        <h3 className="text-2xl font-black tracking-tight text-primary mb-8">Order Summary</h3>

                        <div className="space-y-5 mb-8">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-start text-base">
                                    <div className="flex flex-col text-primary/80">
                                        <span className="font-bold text-primary">
                                            <span className="text-secondary mr-2">{item.quantity}x</span>
                                            {item.name}
                                        </span>
                                    </div>
                                    <span className="text-primary font-bold ml-4 whitespace-nowrap">R {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 border-dashed border-gray-100 pt-6">
                            <div className="flex justify-between items-center bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                                <span className="text-lg font-bold text-primary/70">Total</span>
                                <span className="text-3xl font-black text-primary">R {totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 py-6 text-center text-xs text-gray-400 border-t border-gray-200 bg-white">
                &copy; {new Date().getFullYear()} The Access Group. All rights reserved.
            </footer>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-primary font-bold animate-pulse text-xl">Loading checkout...</div></div>}>
            <CheckoutContent />
        </Suspense>
    );
}
