'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
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
                    <a href="/tickets" className="text-[#304945] font-semibold hover:underline">Go back to tickets</a>
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
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Form Section */}
                <div className="md:col-span-7 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Buyer Information</h2>
                    
                    <form action={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="buyerName" className="block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                                <input type="text" name="buyerName" id="buyerName" required 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#304945] focus:ring-[#304945] sm:text-sm py-3 px-4 bg-gray-50 border" />
                            </div>
                            <div>
                                <label htmlFor="buyerSurname" className="block text-sm font-medium text-gray-700">Surname <span className="text-red-500">*</span></label>
                                <input type="text" name="buyerSurname" id="buyerSurname" required 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#304945] focus:ring-[#304945] sm:text-sm py-3 px-4 bg-gray-50 border" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="buyerEmail" className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                                <input type="email" name="buyerEmail" id="buyerEmail" required 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#304945] focus:ring-[#304945] sm:text-sm py-3 px-4 bg-gray-50 border" />
                            </div>
                            <div>
                                <label htmlFor="buyerPhone" className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                                <input type="tel" name="buyerPhone" id="buyerPhone" required 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#304945] focus:ring-[#304945] sm:text-sm py-3 px-4 bg-gray-50 border" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="buyerCompany" className="block text-sm font-medium text-gray-700">Company Name (Optional)</label>
                            <input type="text" name="buyerCompany" id="buyerCompany" 
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#304945] focus:ring-[#304945] sm:text-sm py-3 px-4 bg-gray-50 border" />
                        </div>

                        <div className="pt-6">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-[#304945] hover:bg-[#304945]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#304945] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : 'Pay with Yoco'}
                            </button>
                            <p className="text-xs text-center text-gray-500 mt-4">
                                You will be redirected to Yoco's secure portal to complete your payment.
                            </p>
                        </div>
                    </form>
                </div>

                {/* Summary Section */}
                <div className="md:col-span-5">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                        
                        <div className="space-y-4 mb-6">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                    <div className="flex text-gray-700">
                                        <span className="font-semibold mr-2">{item.quantity}x</span>
                                        <span>{item.name}</span>
                                    </div>
                                    <span className="text-gray-900 font-medium">R {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-extrabold text-[#C2A66B]">R {totalAmount.toLocaleString()}</span>
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading checkout...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
