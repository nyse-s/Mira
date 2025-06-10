export type ScanStackParamList = {
    ScanChoice: undefined;
    UploadFile: undefined;
    CameraSetup: undefined;
    LiveCapture: {step: 'front' | 'profile' | 'back' };
    Preview: { mode: 'photo' | 'video'; uri?: string };
    Processing: undefined;
  };
