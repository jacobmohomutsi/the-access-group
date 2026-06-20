'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Camera, CheckCircle2, Ticket } from 'lucide-react';
import dynamic from 'next/dynamic';

const QRScanner = dynamic(() => import('./QRScanner'), { ssr: false });

export default function CheckInPage() {
    const [ticketNumber, setTicketNumber] = useState('');
    const [ticketData, setTicketData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [showScanner, setShowScanner] = useState(false);

    const supabase = createClient();

    const executeSearch = async (numberToSearch) => {
        setLoading(true);
        setError('');
        setTicketData(null);
        setTicketNumber(numberToSearch);

        try {
            const res = await fetch(`/api/verify/${numberToSearch}`);
            const data = await res.json();

            if (!res.ok || !data.valid) {
                setError(data.message || data.error || 'Invalid ticket');
            } else {
                setTicketData(data.ticket);
            }
        } catch (err) {
            setError('Failed to verify ticket');
        } finally {
            setLoading(false);
            setShowScanner(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        executeSearch(ticketNumber);
    };

    const handleCheckIn = async (eventId) => {
        setActionLoading(true);
        try {
            const { error: checkinError } = await supabase
                .from('checkins')
                .insert({
                    ticket_id: ticketData.id,
                    event_id: eventId
                });

            if (checkinError) {
                // If unique constraint violation
                if (checkinError.code === '23505') {
                    alert('Already checked in!');
                } else {
                    throw checkinError;
                }
            } else {
                // Log activity
                await supabase.from('ticket_activity').insert({
                    ticket_id: ticketData.id,
                    action: 'checked_in',
                    metadata: { event_id: eventId }
                });

                // Update local state
                setTicketData(prev => ({
                    ...prev,
                    events: prev.events.map(ev =>
                        ev.id === eventId
                            ? { ...ev, checked_in: true, checked_in_at: new Date().toISOString() }
                            : ev
                    )
                }));
            }
        } catch (err) {
            console.error(err);
            alert('Failed to check in');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto w-full">
            <div className="mb-10 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-black text-primary tracking-tight mb-2">Check-In Scanner</h1>
                <p className="text-primary/60 font-medium">Manually enter a ticket number or scan a QR code to verify attendees.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 p-6 sm:p-10 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />

                <button
                    type="button"
                    onClick={() => setShowScanner(true)}
                    className="w-full mb-8 p-5 bg-secondary text-primary rounded-2xl hover:bg-secondary/90 flex items-center justify-center gap-3 font-black text-lg transition-all duration-300 shadow-lg shadow-secondary/20 hover:-translate-y-1"
                >
                    <Camera size={26} strokeWidth={2.5} />
                    <span>Open Camera to Scan QR</span>
                </button>

                <div className="flex items-center gap-4 mb-8">
                    <hr className="flex-1 border-gray-100 border-2 rounded-full" />
                    <span className="text-gray-400 text-xs font-black tracking-widest uppercase">OR MANUAL ENTRY</span>
                    <hr className="flex-1 border-gray-100 border-2 rounded-full" />
                </div>

                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Ticket className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={ticketNumber}
                            onChange={(e) => setTicketNumber(e.target.value)}
                            placeholder="e.g., GAL000001"
                            className="block w-full pl-12 pr-4 py-4 rounded-2xl border-gray-200 shadow-sm focus:border-primary text-gray-600 focus:ring-primary sm:text-lg bg-gray-50/50 focus:bg-white transition-colors border uppercase font-bold tracking-wider"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-4 bg-primary text-white rounded-2xl font-black hover:bg-primary/90 disabled:opacity-70 transition-all duration-300 shadow-lg shadow-primary/20 hover:-translate-y-1 text-lg shrink-0"
                    >
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>
                </form>
            </div>

            {showScanner && (
                <QRScanner
                    onScanSuccess={executeSearch}
                    onClose={() => setShowScanner(false)}
                />
            )}

            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-6 mb-8 text-center shadow-lg shadow-red-500/5">
                    <h3 className="text-xl font-black mb-1">Verification Failed</h3>
                    <p className="font-medium">{error}</p>
                </div>
            )}

            {ticketData && (
                <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-primary/5 px-6 sm:px-8 py-6 border-b border-primary/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-secondary shadow-lg shadow-primary/20">
                                <CheckCircle2 className="w-7 h-7" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-primary">Valid Ticket</h2>
                                <p className="text-sm font-bold text-primary/60 tracking-wider uppercase">{ticketData.ticket_number}</p>
                            </div>
                        </div>
                        <span className="px-4 py-2 bg-white rounded-xl text-sm font-bold text-primary shadow-sm border border-gray-100">
                            {ticketData.product}
                        </span>
                    </div>

                    <div className="p-6 sm:p-8">
                        <div className="mb-10">
                            <p className="text-xs text-primary/50 uppercase tracking-widest font-bold mb-2">Attendee Information</p>
                            <p className="text-3xl font-black text-primary leading-tight">{ticketData.attendee}</p>
                        </div>

                        <div>
                            <p className="text-xs text-primary/50 uppercase tracking-widest font-bold mb-4">Event Access Status</p>
                            <div className="space-y-4">
                                {ticketData.events.map(event => (
                                    <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-gray-50/80 rounded-2xl border border-gray-100 gap-4 transition-all hover:bg-white hover:shadow-md">
                                        <div>
                                            <h4 className="font-bold text-primary text-lg mb-1">{event.name}</h4>
                                            <p className="text-sm font-medium text-gray-500">{new Date(event.date).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} &bull; {event.venue}</p>
                                        </div>
                                        <div>
                                            {event.checked_in ? (
                                                <div className="text-left sm:text-right flex flex-col items-start sm:items-end bg-gray-100/50 p-3 rounded-xl border border-gray-200">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold bg-green-100 text-green-800">
                                                        <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                                                        Checked In
                                                    </span>
                                                    <p className="text-xs font-bold text-gray-400 mt-2 tracking-wide uppercase">
                                                        {new Date(event.checked_in_at).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleCheckIn(event.id)}
                                                    disabled={actionLoading}
                                                    className="w-full sm:w-auto px-8 py-3 bg-primary text-secondary rounded-xl font-black hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300 shadow-md disabled:opacity-70 disabled:hover:scale-100 text-center"
                                                >
                                                    Check In Now
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
