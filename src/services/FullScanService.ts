import uuid from 'react-native-uuid';
import { createScan } from './ScanService';
import { createMeasurements } from './MeasurementsService';
import { createScanMedia } from './ScanMediaService';
import { createScanResult } from './ScanResultService';
import { Scan } from '../models/Scan';

export async function saveFullScanWorkflow({
  userId,
  scanType,
  scanOrigin,
  date,
  modelUrl,
  processedAt,
  status,
  age,
  weight,
  height,
  gender,
  frontPhotoUrl,
  rightPhotoUrl,
  measurements,
}: {
  userId: string;
  scanType: string;
  scanOrigin: string;
  date?: string;
  modelUrl: string;
  processedAt?: string;
  status: string;
  age: number;
  weight: number;
  height: number;
  gender: string;
  frontPhotoUrl: string;
  rightPhotoUrl: string;
  measurements: {
    [key: string]: number;
  } & { metrics?: any }; // Le JSON complet des métriques
}) {

  const scanId = uuid.v4() as string;

  const scan: Omit<Scan, 'id'> = {
    userid: userId,
    date: date ?? new Date().toISOString(),
    type: scanType,
    origin: scanOrigin,
    age,
    height,
    weight,
    gender,
  };
  await createScan({ ...scan, id: scanId });


  await createScanMedia({
    id: uuid.v4() as string,
    scanid: scanId,
    view: 'front',
    mediaurl: frontPhotoUrl,
    mediatype: 'image',
  });
  await createScanMedia({
    id: uuid.v4() as string,
    scanid: scanId,
    view: 'right',
    mediaurl: rightPhotoUrl,
    mediatype: 'image',
  });


  await createScanResult({
    id: uuid.v4() as string,
    scanid: scanId,
    modelurl: modelUrl,
    processedat: processedAt ?? new Date().toISOString(),
    status,
  });

  await createMeasurements({
    id: uuid.v4() as string,
    scanid: scanId,
    metrics: measurements.metrics ?? measurements,
  });

  return scanId;
}
