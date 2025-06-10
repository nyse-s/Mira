import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ResultStackParamList } from '../../navigation/ResultStackParamList';
import BackHeader from '../../components/BackHeader';
import styles from './BeforeAfterStyles';
import { WebView } from 'react-native-webview';
import { getScanResultByScanId } from '../../services/ScanResultService';
import { getScanById } from '../../services/ScanService';
import { useAuth } from '../../contexts/AuthContext';
import { Scan } from '../../models/Scan';

type RouteType = RouteProp<ResultStackParamList, 'BeforeAfter'>;

const BeforeAfterScreen = () => {
  const route = useRoute<RouteType>();
  const { scanId1, scanId2 } = route.params;

  const { supabaseUser } = useAuth();
  const userId = supabaseUser?.id;

  const [modelUrl1, setModelUrl1] = useState<string | null>(null);
  const [modelUrl2, setModelUrl2] = useState<string | null>(null);
  const [scan1, setScan1] = useState<Scan | null>(null);
  const [scan2, setScan2] = useState<Scan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const loadData = async () => {
      setLoading(true);
      try {
        const result1 = await getScanResultByScanId(scanId1);
        const result2 = await getScanResultByScanId(scanId2);
        setModelUrl1(result1?.modelurl || null);
        setModelUrl2(result2?.modelurl || null);

        const s1 = await getScanById(scanId1, userId);
        const s2 = await getScanById(scanId2, userId);
        setScan1(s1);
        setScan2(s2);
      } catch (err) {
        setModelUrl1(null);
        setModelUrl2(null);
        setScan1(null);
        setScan2(null);
      }
      setLoading(false);
    };
    loadData();
  }, [scanId1, scanId2, userId]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#007666', '#4CD4C2']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.topSection}
      >
        <BackHeader />
        <Text style={styles.title}>Before / After</Text>
      </LinearGradient>

      <View style={styles.mainSection}>
        <View style={styles.comparisonContainer}>
          {/* Show loading or 3D models side by side */}
          {loading ? (
            <Text style={{ color: '#007666', fontSize: 20 }}>Loading models…</Text>
          ) : (
            <>
              {modelUrl1 ? (
                <WebView
                  source={{
                    uri: `https://mira-3d-viewer.vercel.app/model-viewer?model=${encodeURIComponent(modelUrl1)}`
                  }}
                  style={styles.modelWebView}
                  originWhitelist={['*']}
                  javaScriptEnabled
                  domStorageEnabled
                  startInLoadingState
                />
              ) : (
                <Text style={{ color: 'red', flex: 1 }}>No Model 1</Text>
              )}
              <View style={styles.separator} />
              {modelUrl2 ? (
                <WebView
                  source={{
                    uri: `https://mira-3d-viewer.vercel.app/model-viewer?model=${encodeURIComponent(modelUrl2)}`
                  }}
                  style={styles.modelWebView}
                  originWhitelist={['*']}
                  javaScriptEnabled
                  domStorageEnabled
                  startInLoadingState
                />
              ) : (
                <Text style={{ color: 'red', flex: 1 }}>No Model 2</Text>
              )}
            </>
          )}
        </View>
        <View style={styles.dates}>
            <Text style={styles.dateText}>{scan1?.date ? new Date(scan1.date).toLocaleDateString() : '...'}</Text>
            <Text style={styles.dateText}>{scan2?.date ? new Date(scan2.date).toLocaleDateString() : '...'}</Text>
        </View>
      </View>
    </View>
  );
};

export default BeforeAfterScreen;
