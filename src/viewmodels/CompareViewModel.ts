import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Scan } from '../models/Scan';
import { getScansByUserId } from '../services/ScanService';

export const useCompareViewModel = () => {
  const { supabaseUser } = useAuth();
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (supabaseUser) {
        const userScans = await getScansByUserId(supabaseUser.id);
        setScans(userScans || []);
      } else {
        setScans([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [supabaseUser]);

  return { scans, loading };
};

