'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense, useRef } from 'react';
import { Loader2, CheckCircle2, XCircle, ShieldCheck, ArrowRight } from 'lucide-react';

function VerifyingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const reference = searchParams.get('reference');

    const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'failed'
    const [message, setMessage] = useState('Verifying your payment secure transaction...');
    const [attempt, setAttempt] = useState(1);
    const pollingRef = useRef(null);

    useEffect(() => {
        if (!reference) {
            setStatus('failed');
            setMessage('Missing transaction reference. Unable to verify payment.');
            return;
        }

        let isMounted = true;
        let currentAttempt = 1;

        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/payments/paystack/verify/${encodeURIComponent(reference)}?attempt=${currentAttempt}`);
                const data = await res.json();

                if (!isMounted) return;

                if (data.status === 'success' && data.fulfilled) {
                    setStatus('success');
                    setMessage('Payment verified successfully! Generating your tickets...');
                    if (pollingRef.current) clearInterval(pollingRef.current);
                    
                    setTimeout(() => {
                        router.push('/tickets/success');
                    }, 1500);
                    return;
                }

                if (data.status === 'failed' || data.status === 'abandoned') {
                    setStatus('failed');
                    setMessage(data.error || 'Payment was not completed or failed verification.');
                    if (pollingRef.current) clearInterval(pollingRef.current);
                    return;
                }

                // Still pending
                currentAttempt += 1;
                setAttempt(currentAttempt);
                if (currentAttempt > 8) {
                    setMessage('Webhook processing is taking longer than usual. Still confirming...');
                }
            } catch (err) {
                console.error('Polling error:', err);
            }
        };

        // Initial check immediately
        checkStatus();

        // Poll every 3 seconds
        pollingRef.current = setInterval(checkStatus, 3000);

        return () => {
            isMounted = false;
            if (pollingRef.current) clearInterval(pollingRef.current);
        };
    }, [reference, router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-primary/90 to-black flex items-center justify-center p-6 text-white selection:bg-secondary selection:text-white relative overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none animate-pulse delay-700" />

            <div className="max-w-md w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl text-center relative z-10 transition-all duration-500">
                <div className="flex justify-center mb-6">
                    {status === 'verifying' && (
                        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 shadow-inner">
                            <Loader2 className="w-12 h-12 text-secondary animate-spin" />
                            <ShieldCheck className="w-6 h-6 text-white/80 absolute" />
                        </div>
                    )}
                    {status === 'success' && (
                        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 animate-bounce">
                            <CheckCircle2 className="w-14 h-14" />
                        </div>
                    )}
                    {status === 'failed' && (
                        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-red-500/20 border border-red-500/40 text-red-400">
                            <XCircle className="w-14 h-14" />
                        </div>
                    )}
                </div>

                <h2 className="text-2xl font-black tracking-tight mb-3">
                    {status === 'verifying' && 'Confirming Payment'}
                    {status === 'success' && 'Payment Confirmed!'}
                    {status === 'failed' && 'Verification Failed'}
                </h2>

                <p className="text-white/70 text-sm mb-8 leading-relaxed">
                    {message}
                </p>

                {status === 'verifying' && (
                    <div className="space-y-3">
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                            <div 
                                className="bg-gradient-to-r from-secondary to-primary h-full rounded-full transition-all duration-500 animate-pulse"
                                style={{ width: `${Math.min(100, attempt * 12)}%` }}
                            />
                        </div>
                        <p className="text-xs text-white/40 font-mono">
                            Reference: {reference || 'N/A'} • Check #{attempt}
                        </p>
                    </div>
                )}

                {status === 'failed' && (
                    <div className="mt-6">
                        <a 
                            href="/tickets"
                            className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Return to Tickets <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function VerifyingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white font-bold animate-pulse">
                Loading secure verification...
            </div>
        }>
            <VerifyingContent />
        </Suspense>
    );
}
