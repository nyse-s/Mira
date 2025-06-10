import { supabaseClient } from './supabase';
import { ScanResult } from '../models/ScanResult';

export const getScanResultByScanId = async (scanId: string): Promise<ScanResult | null> => {
    const { data, error } = await supabaseClient
        .from('ScanResult')
        .select('*')
        .eq('scanid', scanId)
        .maybeSingle();

    if (error) {
        console.error('Error fetching ScanResult:', error.message);
        return null;
    }

    return data as ScanResult;
};

export const createScanResult = async (scanResult: ScanResult): Promise<ScanResult> => {
  const { data, error } = await supabaseClient
    .from('ScanResult')
    .insert([scanResult])
    .select()
    .single();
  if (error) {throw error;}
  return data;
};
