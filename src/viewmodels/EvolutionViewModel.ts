import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Measurements } from '../models/Measurements';
import { getAllMeasurementsByUserId } from '../services/MeasurementsService';


export function useEvolutionModelView(){
    const { supabaseUser } = useAuth();
    const [measurements, setMeasurements] = useState<Measurements[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!supabaseUser?.id) {return;}

            setLoading(true);
            const measurementsData = await getAllMeasurementsByUserId(supabaseUser.id);
            setMeasurements(measurementsData || []);
            setLoading(false);
        };
        fetchData();
    }, [supabaseUser]);

    return {
        measurements,
        loading,
    };
}
