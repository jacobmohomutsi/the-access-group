import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json({ error: 'Missing PAYSTACK_SECRET_KEY environment variable' }, { status: 500 });
        }

        const body = await req.json();
        const { email, amount, metadata, reference } = body;

        if (!email || !amount) {
            return NextResponse.json({ error: 'Email and amount are required' }, { status: 400 });
        }

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theaccessgroup.co.za';
        const callbackUrl = `${baseUrl}/boxes/confirmation`;

        // Convert amount to smallest currency unit (kobo/cents) if passed in Rand
        const amountInSmallestUnit = Math.round(Number(amount) * 100);

        const payload = {
            email,
            amount: amountInSmallestUnit,
            currency: 'ZAR',
            reference: reference || `BOX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            callback_url: callbackUrl,
            metadata: {
                type: 'access_box',
                ...metadata
            }
        };

        console.log('[BOX_PAYSTACK_INIT]', { email, amount: amountInSmallestUnit, reference: payload.reference });

        const response = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${secretKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok || !data.status) {
            console.error('[BOX_PAYSTACK_INIT_ERROR]', data);
            return NextResponse.json({ error: data.message || 'Failed to initialize Paystack payment' }, { status: response.status });
        }

        return NextResponse.json({
            url: data.data.authorization_url,
            reference: data.data.reference
        });
    } catch (err: any) {
        console.error('[BOX_PAYSTACK_INIT_UNCAUGHT]', err);
        return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
    }
}
