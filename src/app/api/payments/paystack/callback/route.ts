import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const reference = url.searchParams.get('reference') || url.searchParams.get('trxref');

    console.log('[PAYSTACK_CALLBACK]', { stage: 'received', reference });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theaccessgroup.co.za';

    if (!reference) {
        console.error('[PAYSTACK_CALLBACK]', { stage: 'missing_reference' });
        return NextResponse.redirect(`${baseUrl}/tickets?error=missing_payment_reference`);
    }

    // Redirect customer to the temporary "Verifying Payment..." polling page
    // Fulfillment is strictly deferred to the webhook or the verify endpoint recovery fallback.
    return NextResponse.redirect(`${baseUrl}/tickets/verifying?reference=${encodeURIComponent(reference)}`);
}
