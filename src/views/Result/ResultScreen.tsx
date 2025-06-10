import React, { useEffect  } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResultStackParamList } from '../../navigation/ResultStackParamList';
import { RouteProp } from '@react-navigation/native';
import styles from './ResultStyles';
import BackHeader from '../../components/BackHeader';
import GradientButton from '../../components/GradientButton';
import GradientScreenWrapper from '../../components/GradientScreenWrapper';
import { WebView } from 'react-native-webview';
import { useResultViewModel } from '../../viewmodels/ResultViewModel';

type ResultNavigationType = NativeStackNavigationProp<ResultStackParamList, 'Result'>;
type RouteType = RouteProp<ResultStackParamList, 'Result'>;

const METRICS_TO_DISPLAY = [
  { name: 'waistGirth', label: 'Waist' },
  { name: 'hipGirth', label: 'Hips' },
  { name: 'acrossBackShoulderWidth', label: 'Shoulders' },
  { name: 'chestGirth', label: 'Chest' },
  { name: 'upperArmGirthR', label: 'Upper Arm (R)' },
  { name: 'thighGirthR', label: 'Thigh (R)' },
];

const ResultScreen = () => {
  const navigation = useNavigation<ResultNavigationType>();
  const route = useRoute<RouteType>();
  const paramScanId = route.params?.scanId;

  const { scan, measurements, modelUrl, history, loading} = useResultViewModel(paramScanId);

  useEffect(() => {
    if (!loading && !paramScanId && history && history.length > 0) {
      navigation.replace('Result', { scanId: history[0].id });
    }
  }, [loading, paramScanId, history, navigation]);

  if (loading) {
    return (
      <GradientScreenWrapper>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </GradientScreenWrapper>
    );
  }

  if (!scan) {
    return (
      <GradientScreenWrapper>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: "#fff", fontSize: 18, marginBottom: 16 }}>
            Please perform your first scan to see results!
          </Text>
          <GradientButton title="Back to Home" onPress={() => navigation.getParent()?.navigate('Home')} />
        </View>
      </GradientScreenWrapper>
    );
  }


  if (!paramScanId && history && history.length > 0) {
    return null;
  }

  const formattedDate = scan?.date ? new Date(scan.date).toLocaleString() : 'Unknow date';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#007666', '#4CD4C2']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.topSection}
      >
        <BackHeader />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.title}>3D Model</Text>
        </View>
      </LinearGradient>

      {/* Contenu principal */}
      <View style={styles.mainSection}>
        <View style={styles.bodyContent}>
          <View style={styles.modelContainer}>
            <WebView
              source={{ uri: `https://mira-3d-viewer.vercel.app/model-viewer?model=${encodeURIComponent(modelUrl || '')}` }}
              style={styles.modelWebView}
              originWhitelist={['*']}
              javaScriptEnabled
              domStorageEnabled
              startInLoadingState
            />
          </View>
          <View style={styles.measurementsBox}>
            {measurements && (
              <>
                <Text style={styles.measurementsTitle}>Measurements:</Text>
                {METRICS_TO_DISPLAY.map(({ name, label }) => {
                  const metric = measurements.metrics?.find((m: any) => m.name === name);
                  if (!metric) {return null;}
                  
                  const value = metric.unit === 'mm'
                    ? (metric.value / 10).toFixed(1)
                    : metric.value;
                  const unit = metric.unit === 'mm' ? 'cm' : metric.unit;

                  return (
                    <Text style={styles.measurement} key={name}>
                      {label}: {value} {unit}
                    </Text>
                  );
                })}
              </>
            )}
          </View>
        </View>
        {/* Date du scan, centré */}
        <View style={styles.scanDateContainer}>
          <Text style={styles.scanDate}>Scan performed: {formattedDate}</Text>
        </View>
        {/* Boutons */}
        <View style={styles.buttonRow}>
          <GradientButton title="Export" textStyle={styles.buttonText} style={styles.actionButton}/>
          <GradientButton title="Compare" onPress={() => navigation.navigate('Compare')} textStyle={styles.buttonText} style={styles.actionButton}/>
          <GradientButton title="Details" onPress={() => navigation.navigate('Evolution')} textStyle={styles.buttonText} style={styles.actionButton}/>


        </View>

        {/* Historique */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>History</Text>
          <ScrollView horizontal contentContainerStyle={styles.historyList}>
            {history.map((item) =>
              <TouchableOpacity
                key={item.id}
                style={styles.historyItem}
                onPress={() => navigation.replace('Result', {scanId: item.id})}>
                  <Text style={styles.historyDate}>
                    | {item.date ? new Date(item.date).toLocaleDateString() : 'No date'} |
                  </Text>
                </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResultScreen;
