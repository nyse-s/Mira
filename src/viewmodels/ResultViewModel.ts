import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Scan } from '../models/Scan';
import { Measurements } from '../models/Measurements';
import { getScansByUserId, getScanById } from '../services/ScanService';
import { getScanResultByScanId } from '../services/ScanResultService';
import { getMeasurementsByScanId } from '../services/MeasurementsService';

export const useResultViewModel = (scanId?: string) => {
    const { supabaseUser } = useAuth();
    const [scan, setScan] = useState<Scan | null>(null);
    const [measurements, setMesurements] = useState<Measurements | null>(null);
    const [modelUrl, setModelUrl] = useState<string | null>(null);
    const [history, setHistory] = useState<Scan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!supabaseUser) {
                return;
            }

            setLoading(true);

            const userId = supabaseUser.id;

            const historyData = await getScansByUserId(userId);
            setHistory(historyData || []);

            const selectedScanId = scanId || historyData?.[0]?.id;
            if (!selectedScanId) {
                console.warn('No scanId found and no scans available.');
                setLoading(false);
                return;
            }

            const scanData = await getScanById(selectedScanId, userId);
            const measurementsData = await getMeasurementsByScanId(selectedScanId);
            const scanResultData = await getScanResultByScanId(selectedScanId);

            setScan(scanData);
            setMesurements(measurementsData);
            setModelUrl(scanResultData?.modelurl || null);
            setLoading(false);
        };

        fetchData();
    }, [scanId, supabaseUser]);

    return {
        scan,
        measurements,
        modelUrl,
        history,
        loading,
    };
};
