import * as RNFS from 'react-native-fs';

const API_KEY = '47d8aL3k9hiGGuyypDMDxygINGaJ22slddQQxxbuTFn';
const ORG_ID = 'org_2rDiyp4IIZ63scppKq8Zfk';

type DemographicData = {
  age: number;
  weight: number; // grams !
  height: number; // mm !
  gender: 'male' | 'female';
};

export const runBodygramScan = async (
  frontPhotoUri: string,
  rightPhotoUri: string,
  demo: DemographicData,
  customScanId: string = 'myFirstScan'
) => {

  const fixPath = (uri: string) => uri.startsWith('file://') ? uri.replace('file://', '') : uri;
  const frontPhotoBase64 = await RNFS.readFile(fixPath(frontPhotoUri), 'base64');
  const rightPhotoBase64 = await RNFS.readFile(fixPath(rightPhotoUri), 'base64');

  const url = `https://platform.bodygram.com/api/orgs/${ORG_ID}/scans`;
  const headers = {
    'Authorization': API_KEY,
    'Content-Type': 'application/json',
  };
  const data = {
    customScanId,
    photoScan: {
      ...demo, // age, weight, height, gender
      frontPhoto: frontPhotoBase64,
      rightPhoto: rightPhotoBase64,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(`Bodygram API error: ${response.status} ${errorMsg}`);
  }
  const result = await response.json();
  return result.entry;
};
