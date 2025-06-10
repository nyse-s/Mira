import { supabaseClient } from './supabase';
import { UserSettings } from '../models/UserSettings';

export const getUserSettings = async (id: string): Promise<UserSettings | null> => {
  const { data, error } = await supabaseClient
    .from('UserSettings')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) { return null; }
  return data as UserSettings;
};

export const updateUserSettings = async (id: string, updates: Partial<UserSettings>) => {
  const { data, error } = await supabaseClient
    .from('UserSettings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) { throw error; }
  return data as UserSettings;
};
