import QRCode from 'qrcode';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function generateAndUploadQR(ticket_id, ticket_number) {
    try {
        const payload = JSON.stringify({ ticket_id, ticket_number });
        
        // Generate QR code as a buffer
        const qrBuffer = await QRCode.toBuffer(payload, {
            type: 'png',
            margin: 1,
            width: 300,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });

        const fileName = `${ticket_number}.png`;

        // Check if bucket exists, if not create it
        const { data: buckets } = await supabaseAdmin.storage.listBuckets();
        if (!buckets?.find(b => b.name === 'ticket-qrs')) {
            await supabaseAdmin.storage.createBucket('ticket-qrs', { public: true });
        }

        // Upload to Supabase Storage
        const { data, error } = await supabaseAdmin.storage
            .from('ticket-qrs')
            .upload(fileName, qrBuffer, {
                contentType: 'image/png',
                upsert: true
            });

        if (error) {
            console.error('Error uploading QR code:', error);
            throw error;
        }

        // Get Public URL
        const { data: { publicUrl } } = supabaseAdmin.storage
            .from('ticket-qrs')
            .getPublicUrl(fileName);

        return publicUrl;
    } catch (error) {
        console.error('QR Generation failed:', error);
        return null;
    }
}
