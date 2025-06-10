import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Scan } from '../models/Scan';
import { ScanResult } from '../models/ScanResult';
import { getScansByUserId } from '../services/ScanService';
import { getScanResultByScanId } from '../services/ScanResultService';

export const useHomeViewModel = (refreshKey = 0) => {
    const { supabaseUser } = useAuth();
    const [displayName, setDisplayName] = useState('');
    const [scans, setScans] = useState<Scan[]>([]);
    const [lastScanResult, setLastScanResult] = useState<ScanResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            setLoading(true);
            // Wait for supabaseUser to be defined (do not set loading to false until it is checked!)
            if (!supabaseUser) {
                // If there's no user, keep loading=true if this is the first render
                // but after login/logout, we want to eventually stop loading
                setDisplayName('');
                setScans([]);
                setLastScanResult(null);
                setLoading(false);
                return;
            }
            setDisplayName(supabaseUser.displayname || '');
            const userScans = await getScansByUserId(supabaseUser.id);
            if (cancelled) {return;}
            setScans(userScans || []);
            if (userScans && userScans.length > 0) {
                const result = await getScanResultByScanId(userScans[0].id);
                if (cancelled) {return;}
                setLastScanResult(result);
            } else {
                setLastScanResult(null);
            }
            setLoading(false);
        };

        fetchData();
        return () => { cancelled = true; };
    }, [supabaseUser, refreshKey]);

    const lastestScan = scans[0];
    const history = scans.slice(1);

    return {
        displayName,
        lastestScan,
        lastScanResult,
        history,
        loading,
    };
};
