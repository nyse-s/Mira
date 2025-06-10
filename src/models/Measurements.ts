type Metric = { name: string; unit: string; value: number };
export type Measurements = {
    id: string;
    scanid: string;
    metrics: Metric[];
    Scan?: {
      date?: string;
      userid?: string;
    };
  };
