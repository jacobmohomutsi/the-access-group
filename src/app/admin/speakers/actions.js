'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export async function upsertSpeaker(data) {
    try {
        if (!data.name || !data.role || !data.bio) {
            return { success: false, error: 'Name, Role, and Bio are required.' };
        }

        const payload = {
            name: data.name,
            role: data.role,
            organisation: data.organisation || null,
            bio: data.bio,
            image: data.image || null,
            display_order: data.display_order || 0,
            active: data.active !== undefined ? data.active : true
        };

        let result;
        if (data.id) {
            result = await supabaseAdmin
                .from('speakers')
                .update(payload)
                .eq('id', data.id);
        } else {
            result = await supabaseAdmin
                .from('speakers')
                .insert([payload]);
        }

        if (result.error) {
            console.error('Error upserting speaker:', result.error);
            return { success: false, error: result.error.message };
        }

        revalidatePath('/admin/speakers');
        revalidatePath('/summit');

        return { success: true };
    } catch (err) {
        console.error('Unexpected error upserting speaker:', err);
        return { success: false, error: 'Internal server error' };
    }
}

export async function deleteSpeaker(id) {
    try {
        const { error } = await supabaseAdmin
            .from('speakers')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting speaker:', error);
            return { success: false, error: error.message };
        }

        revalidatePath('/admin/speakers');
        revalidatePath('/summit');

        return { success: true };
    } catch (err) {
        console.error('Unexpected error deleting speaker:', err);
        return { success: false, error: 'Internal server error' };
    }
}

export async function uploadSpeakerImage(formData) {
    try {
        const file = formData.get('file');
        if (!file) {
            return { success: false, error: 'No file provided' };
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabaseAdmin.storage
            .from('speakers-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Error uploading image:', error);
            return { success: false, error: error.message };
        }

        // Get public URL
        const { data: { publicUrl } } = supabaseAdmin.storage
            .from('speakers-images')
            .getPublicUrl(filePath);

        return { success: true, url: publicUrl };
    } catch (err) {
        console.error('Unexpected error uploading image:', err);
        return { success: false, error: 'Internal server error' };
    }
}
