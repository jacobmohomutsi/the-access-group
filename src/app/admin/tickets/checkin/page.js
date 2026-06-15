'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Camera } from 'lucide-react';
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
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Check-In Scanner</h1>
                <p className="text-gray-500">Manually enter a ticket number to verify and check in attendees.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <button
                    type="button"
                    onClick={() => setShowScanner(true)}
                    className="w-full mb-4 p-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-3 font-bold"
                >
                    <Camera size={24} />
                    <span>Open Camera to Scan QR Code</span>
                </button>
                
                <div className="flex items-center gap-4 mb-4">
                    <hr className="flex-1 border-gray-200" />
                    <span className="text-gray-400 text-sm font-medium">OR</span>
                    <hr className="flex-1 border-gray-200" />
                </div>

                <form onSubmit={handleSearch} className="flex gap-4">
                    <input
                        type="text"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                        placeholder="Scan or type Ticket Number (e.g., GAL000001)"
                        className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-[#304945] focus:ring-[#304945] text-lg py-3 px-4 border uppercase min-w-0"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-[#304945] text-white rounded-lg font-bold hover:bg-[#304945]/90 disabled:opacity-70 shrink-0"
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
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-6 mb-8 text-center">
                    <h3 className="text-lg font-bold mb-2">Verification Failed</h3>
                    <p>{error}</p>
                </div>
            )}

            {ticketData && (
                <div className="bg-white rounded-xl shadow-sm border border-green-200 overflow-hidden">
                    <div className="bg-green-50 px-6 py-4 border-b border-green-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-green-900">Valid Ticket</h2>
                                <p className="text-sm text-green-700">{ticketData.ticket_number}</p>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-white rounded-full text-sm font-bold text-gray-700 shadow-sm border border-green-200">
                            {ticketData.product}
                        </span>
                    </div>

                    <div className="p-6">
                        <div className="mb-8">
                            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Attendee</p>
                            <p className="text-2xl font-bold text-gray-900">{ticketData.attendee}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-4">Event Access</p>
                            <div className="space-y-4">
                                {ticketData.events.map(event => (
                                    <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{event.name}</h4>
                                            <p className="text-sm text-gray-500">{new Date(event.date).toLocaleString()} &bull; {event.venue}</p>
                                        </div>
                                        <div>
                                            {event.checked_in ? (
                                                <div className="text-right">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gray-200 text-gray-700">
                                                        Checked In
                                                    </span>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {new Date(event.checked_in_at).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleCheckIn(event.id)}
                                                    disabled={actionLoading}
                                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-sm disabled:opacity-70"
                                                >
                                                    Check In
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
