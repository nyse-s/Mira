import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { UserSettings } from '../models/UserSettings';
import { getUserSettings, updateUserSettings } from '../services/UserSettingsService';

// Fetch one row per user, as in your DB design
export const useSettingsViewModel = () => {
  const { supabaseUser } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch settings on mount or user change
  useEffect(() => {
    const fetchSettings = async () => {
      if (!supabaseUser) {
        setSettings(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await getUserSettings(supabaseUser.id);
        setSettings(data);
      } catch (err: any) {
        setError(err.message);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [supabaseUser]);

  // Update settings (callable from UI)
  const saveSettings = async (updates: Partial<UserSettings>) => {
    if (!supabaseUser) {return false;}
    setLoading(true);
    setError(null);
    try {
      const updated = await updateUserSettings(supabaseUser.id, updates);
      setSettings(updated);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
        }
  };

  return {
    settings,
    loading,
    error,
    saveSettings,
    setSettings,
  };
};

