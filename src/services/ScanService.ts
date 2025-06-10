import { supabaseClient } from './supabase';
import { Scan } from '../models/Scan';

export const getScansByUserId = async (userId: string): Promise<Scan[] | null> => {
  const { data, error } = await supabaseClient
    .from('Scan')
    .select('*')
    .eq('userid', userId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error in getScansByUserId:', error.message);
    return null;
  }

  return data as Scan[];
};

export const getScanById = async (scanId: string, userId: string): Promise<Scan | null> => {
  const { data, error } = await supabaseClient
    .from('Scan')
    .select('*')
    .eq('id', scanId)
    .eq('userid', userId)
    .single();

  if (error) {
    console.error('Error in getScanById:', error.message);
    return null;
  }

  return data as Scan;
};

export const createScan = async (scan: Scan): Promise<Scan> => {
   const { data, error } = await supabaseClient
    .from('Scan')
    .insert([scan])
    .select()
    .single();
  if (error) {throw error;}
  return data;
};
