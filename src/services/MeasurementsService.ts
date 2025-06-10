import { supabaseClient } from './supabase';
import { Measurements } from '../models/Measurements';

export const getAllMeasurementsByUserId = async (userId: string) : Promise<Measurements[] | null> => {
    const { data, error } = await supabaseClient
        .from('Measurements')
        .select('*, Scan(date, userid)')
        .eq('Scan.userid', userId);

    if (error) {
        console.error('Error fetching Measurements history:', error.message);
        return [];
    }

    const sorted = (data as Measurements[]).sort((a, b) => {
        const da = a.Scan?.date ? new Date(a.Scan.date).getTime() : 0;
        const db = b.Scan?.date ? new Date(b.Scan.date).getTime() : 0;
        return da - db;
    });

    return sorted;
};

export const getMeasurementsByScanId = async (scanId: string): Promise<Measurements | null> => {
    const { data, error } = await supabaseClient
        .from('Measurements')
        .select('*')
        .eq('scanid', scanId)
        .maybeSingle();

    if (error) {
        console.error('Error fetching Measurements:', error.message);
        return null;
    }

    return data as Measurements;
};

export const createMeasurements = async (measurements: Measurements): Promise<Measurements> => {
  const { data, error } = await supabaseClient
    .from('Measurements')
    .insert([measurements])
    .select()
    .single();
  if (error) {throw error;}
  return data;
};
