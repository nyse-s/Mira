import { supabaseClient } from './supabase';
import { ScanMedia } from '../models/ScanMedia';

export const createScanMedia = async (scanMedia: ScanMedia): Promise<ScanMedia> => {
  const { data, error } = await supabaseClient
    .from('ScanMedia')
    .insert([scanMedia])
    .select()
    .single();
  if (error) {throw error;}
  return data;
};
