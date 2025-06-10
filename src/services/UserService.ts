import { supabaseClient } from './supabase';
import { User } from '../models/User';

export const getUserById = async (uid : string): Promise<User | null> => {
    const { data, error } = await supabaseClient
        .from('User')
        .select('*')
        .eq('id', uid)
        .maybeSingle();
    if (error) {
        console.error('Error in getUserById:', error.message);
        return null;
    }
    return data as User;
};

export const createUser = async (userData: User): Promise<User | null> => {
    const { data, error } = await supabaseClient
        .from('User')
        .insert([userData])
        .select()
        .single();

    if (error) {
        console.error('Error in createUser:', error.message);
        return null;
        }
    return data as User;
};


export const updateUser = async (id: string, updates: Partial<User>): Promise<User | null> => {
    const { data, error } = await supabaseClient
        .from('User')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error in updateUser:', error.message);
        return null;
        }
    return data as User;
};

export const deleteUser = async (id: string): Promise<boolean> => {
    const { error } = await supabaseClient
    .from('User')
    .delete()
    .eq('id', id);

    if (error) {
        console.error('Error in deleteUser:', error.message);
        return false;
      }
    return true;
};
