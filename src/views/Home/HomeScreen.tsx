import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CompositeNavigationProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList } from '../../navigation/MainTabParamList';
import { ScanStackParamList } from '../../navigation/ScanStackParamList';
import { ResultStackParamList } from '../../navigation/ResultStackParamList';
import { useHomeViewModel } from '../../viewmodels/HomeViewModel';
import Icon from 'react-native-vector-icons/Feather';
import styles from './HomeStyles';
import GradientButton from '../../components/GradientButton';
import GradientScreenWrapper from '../../components/GradientScreenWrapper';
import { WebView } from 'react-native-webview';

type NavigationType = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  CompositeNavigationProp<
    NativeStackNavigationProp<ResultStackParamList>,
    NativeStackNavigationProp<ScanStackParamList>
  >
>;


const HomeScreen = () => {
  const navigation = useNavigation<NavigationType>();
  const [refreshKey, setRefreshKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setRefreshKey(key => key + 1);
    }, [])
  );

  const { displayName, lastestScan, lastScanResult, history, loading } = useHomeViewModel(refreshKey);

  const viewerUrl = lastScanResult?.modelurl
    ? `https://mira-3d-viewer.vercel.app/model-viewer?model=${encodeURIComponent(lastScanResult.modelurl)}`
    : null;

  if (loading) {
    return (
      <GradientScreenWrapper>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </GradientScreenWrapper>
    );
  }

  if (!lastestScan) {
    return (
      <GradientScreenWrapper>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 }}>
          <Text style={{ color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 16 }}>Welcome!</Text>
          <Text style={{ color: "#fff", fontSize: 18, marginBottom: 32, textAlign: 'center' }}>
            To use MIRA, please perform your first scan.
          </Text>
          <GradientButton title="START FIRST SCAN" onPress={() => navigation.navigate('Scan', { screen: 'ScanChoice'} as never )} style={{ width: 210, height: 50 }}/>
        </View>
      </GradientScreenWrapper>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={['#007666', '#4CD4C2']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.topSection}
        >
          <Text style={styles.hello}>Hello</Text>
          <Text style={styles.name}>{displayName}</Text>
        </LinearGradient>

        {/* Zone blanche dessous */}
        <View style={styles.mainSection}>
          {/* Last Scan Section */}
          <View style={styles.lastScanContainer}>
            <View style={styles.scanBox}>
              {viewerUrl ? (
                <WebView
                  originWhitelist={['*']}
                  source={{ uri: viewerUrl }}
                  style={styles.modelWebView}
                  javaScriptEnabled
                  domStorageEnabled
                />
              ) : (
                <Text style={styles.lastScanText}>Last Scan</Text>
              )}
            </View>
            <View style={styles.scanRight}>
              <Text style={styles.dateText}>
                {lastestScan?.date ? new Date(lastestScan.date).toLocaleDateString() : 'mm/dd/yyyy'}
              </Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => {
                  if (lastestScan?.id) {
                    navigation.navigate('Result', { screen: 'Result', params: { scanId: lastestScan.id  } } as never);
                  }
                }}>
                <Text style={styles.detailsText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* History */}
          <Text style={styles.historyLabel}>History</Text>
          {history.slice(0, 4).map((scan) => (
            <View key={scan.id} style={styles.historyItem}>
              <Text style={styles.historyText}>
                {scan.date ? new Date(scan.date).toLocaleDateString() : 'No date'}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Result', { screen: 'Result', params: { scanId: scan.id } } as never)}>
                <Icon name="eye" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {/* Start Scan Button */}
        <GradientButton title="START SCAN" onPress={() => navigation.navigate('Scan', { screen: 'ScanChoice'} as never)} style={styles.fixedScanButton}/>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
