'use client'

import { useState } from 'react';
import { deleteOrder, resendPaymentLink, resendOrderNotification } from './actions';
import { Trash2, Send, RefreshCw, Mail } from 'lucide-react';

export default function OrderActions({ order }) {
    const [loading, setLoading] = useState(false);
    
    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this order?')) return;
        setLoading(true);
        try {
            const res = await deleteOrder(order.id);
            if (res?.error) alert("Error: " + res.error);
        } finally {
            setLoading(false);
        }
    };

    const handleResendPayment = async () => {
        setLoading(true);
        try {
            const res = await resendPaymentLink(order.id);
            if (res?.error) alert("Error: " + res.error);
            else alert("Payment link resent successfully!");
        } finally {
            setLoading(false);
        }
    };

    const handleResendNotification = async () => {
        setLoading(true);
        try {
            const res = await resendOrderNotification(order.id);
            if (res?.error) alert("Error: " + res.error);
            else alert("Order notification resent successfully!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-2 items-center">
            {order.payment_status === 'pending' && (
                <>
                    <button 
                        onClick={handleResendPayment} 
                        disabled={loading}
                        title="Resend Payment Link"
                        className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md disabled:opacity-50"
                    >
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    </button>
                    <button 
                        onClick={handleDelete} 
                        disabled={loading}
                        title="Delete Pending Order"
                        className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md disabled:opacity-50"
                    >
                        <Trash2 size={16} />
                    </button>
                </>
            )}
            {order.payment_status === 'paid' && (
                <button 
                    onClick={handleResendNotification} 
                    disabled={loading}
                    title="Resend Order Confirmation"
                    className="p-1.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-md disabled:opacity-50"
                >
                    <Mail size={16} />
                </button>
            )}
        </div>
    );
}
