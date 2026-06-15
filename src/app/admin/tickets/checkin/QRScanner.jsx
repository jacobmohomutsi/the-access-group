'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, X } from 'lucide-react';

export default function QRScanner({ onScanSuccess, onClose }) {
    const [error, setError] = useState(null);
    const scannerRef = useRef(null);

    useEffect(() => {
        let html5QrCode;
        try {
            html5QrCode = new Html5Qrcode("reader");
            scannerRef.current = html5QrCode;

            let scanHandled = false;

            html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }
                },
                (decodedText) => {
                    if (scanHandled) return;
                    scanHandled = true;
                    try {
                        const data = JSON.parse(decodedText);
                        if (data.ticket_number) {
                            onScanSuccess(data.ticket_number);
                            return;
                        }
                    } catch (e) {
                        onScanSuccess(decodedText);
                    }
                },
                (err) => {}
            ).catch(err => {
                console.error("Camera error:", err);
                setError("Could not start camera. Please ensure you have granted camera permissions.");
            });
        } catch (e) {
            console.error("Initialization error:", e);
            setError("Failed to initialize scanner: " + e.message);
        }

        return () => {
            if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode.stop().catch(console.error);
            }
        };
    }, [onScanSuccess]);

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2">
                        <Camera size={20} />
                        Scan Ticket QR Code
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-4 bg-black relative min-h-[300px]">
                    {error ? (
                        <div className="text-white text-center p-8">{error}</div>
                    ) : (
                        <div id="reader" className="w-full"></div>
                    )}
                </div>
                <div className="p-4 bg-gray-50 text-center text-sm text-gray-500">
                    Point your camera at the attendee's QR code.
                </div>
            </div>
        </div>
    );
}
