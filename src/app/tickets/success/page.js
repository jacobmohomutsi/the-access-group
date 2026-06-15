import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CheckCircle2, Ticket } from 'lucide-react';

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8 mt-16">
                <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-gray-100 relative overflow-hidden">
                    {/* Background glow effect */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-50 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#C2A66B]/10 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-50 mb-8 border-4 border-green-100 shadow-sm">
                            <CheckCircle2 className="h-10 w-10 text-green-500" />
                        </div>
                        
                        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Payment Successful!</h2>
                        
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed px-4">
                            Your transaction has been securely processed. We are preparing your summit tickets and will send them to your email inbox momentarily.
                        </p>

                        <div className="bg-[#304945]/5 border border-[#304945]/10 rounded-2xl p-6 mb-10 flex flex-col items-center gap-3">
                            <Ticket className="w-6 h-6 text-[#C2A66B]" />
                            <p className="text-sm text-[#304945] font-medium leading-relaxed">
                                Please allow up to <strong>2 minutes</strong> for the email to arrive. Make sure to check your spam or promotions folder just in case!
                            </p>
                        </div>
                        
                        <Link 
                            href="/"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-[#304945] hover:bg-[#304945]/90 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#304945]/30"
                        >
                            Return to Homepage
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
