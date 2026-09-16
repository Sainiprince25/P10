import { supabase, isSupabaseConfigured } from './supabase';

const BUCKET_NAME = 'cms-images';

export async function uploadImage(file: File, folder: string = 'general'): Promise<{ url: string | null; error?: string }> {
  if (!isSupabaseConfigured) {
    return { url: null, error: 'Storage not configured' };
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return { url: null, error: uploadError.message };
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

    return { url: data.publicUrl };
  } catch (err) {
    console.error('Upload exception:', err);
    return { url: null, error: 'Upload failed' };
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  try {
    // Extract path from URL
    const urlParts = url.split('/storage/v1/object/public/');
    if (urlParts.length < 2) return false;

    const path = urlParts[1];
    const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

    return !error;
  } catch (err) {
    console.error('Delete error:', err);
    return false;
  }
}

export function isStorageConfigured(): boolean {
  return isSupabaseConfigured;
}
