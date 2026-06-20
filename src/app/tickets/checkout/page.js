'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { createCheckout } from './actions';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const itemsParam = searchParams.get('items');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

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
            const result = await createCheckout(formData);
            if (result && result.url) {
                window.location.href = result.url;
            } else {
                throw new Error("No redirect URL returned");
            }
        } catch (error) {
            console.error("Checkout failed", error);
            setLoading(false);
            alert("Failed to initiate checkout. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mt-16">

                {/* Form Section */}
                <div className="md:col-span-7 bg-white p-10 rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary" />

                    <h2 className="text-3xl font-black tracking-tight text-primary mb-8 mt-2">Buyer Information</h2>

                    <form action={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="buyerName" className="block text-sm font-bold text-primary/80 mb-2">First Name <span className="text-red-500">*</span></label>
                                <input type="text" name="buyerName" id="buyerName" required
                                    className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-base py-3 px-4 bg-gray-50/50 focus:bg-white transition-colors border" />
                            </div>
                            <div>
                                <label htmlFor="buyerSurname" className="block text-sm font-bold text-primary/80 mb-2">Surname <span className="text-red-500">*</span></label>
                                <input type="text" name="buyerSurname" id="buyerSurname" required
                                    className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-base py-3 px-4 bg-gray-50/50 focus:bg-white transition-colors border" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="buyerEmail" className="block text-sm font-bold text-primary/80 mb-2">Email Address <span className="text-red-500">*</span></label>
                                <input type="email" name="buyerEmail" id="buyerEmail" required
                                    className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-base py-3 px-4 bg-gray-50/50 focus:bg-white transition-colors border" />
                            </div>
                            <div>
                                <label htmlFor="buyerPhone" className="block text-sm font-bold text-primary/80 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                <input type="tel" name="buyerPhone" id="buyerPhone" required
                                    className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-base py-3 px-4 bg-gray-50/50 focus:bg-white transition-colors border" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="buyerCompany" className="block text-sm font-bold text-primary/80 mb-2">Company Name (Optional)</label>
                            <input type="text" name="buyerCompany" id="buyerCompany"
                                className="block w-full rounded-xl border-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-base py-3 px-4 bg-gray-50/50 focus:bg-white transition-colors border" />
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-l font-black text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-1"
                            >
                                {loading ? 'Processing...' : (
                                    <span className="flex items-center justify-center">
                                        Pay with <Image src='/images/yoco_logo.png' alt="yoco" width={60} height={100} className="ml-2 h-7 w-auto object-contain" />
                                    </span>
                                )}
                            </button>
                            <p className="text-xs text-center text-primary/50 mt-4 font-medium flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                You will be redirected to Yoco's secure portal to complete your payment.
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

