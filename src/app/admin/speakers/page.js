import { supabaseAdmin } from '@/lib/supabase-admin';
import SpeakersClient from './SpeakersClient';

export const revalidate = 0;

export default async function SpeakersAdminPage() {
    const { data: speakers, error } = await supabaseAdmin
        .from('speakers')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

    if (error && error.code !== '42P01') {
        console.error('Error fetching speakers:', error);
    }

    return (
        <div className="w-full">
            {error?.code === '42P01' && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 mb-6">
                    <p className="font-bold">Database Setup Required</p>
                    <p className="text-sm mt-1">Please run the SQL script in your Supabase dashboard to create the `speakers` table before using this page.</p>
                </div>
            )}
            <SpeakersClient initialSpeakers={speakers || []} />
        </div>
    );
}
