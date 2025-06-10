import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResultStackParamList } from '../../navigation/ResultStackParamList';
import BackHeader from '../../components/BackHeader';
import styles from './CompareStyles';
import { useCompareViewModel } from '../../viewmodels/CompareViewModel';

type ResultNavigationType = NativeStackNavigationProp<ResultStackParamList, 'Result'>;


const CompareScreen = () => {
    const navigation = useNavigation<ResultNavigationType>();
    const [selected, setSelected] = useState<string[]>([]);
    const { scans, loading } = useCompareViewModel();

    const toggleDate = (scanId: string) => {
        if (selected.includes(scanId)) {
            setSelected(selected.filter(id => id !== scanId));
        } else if (selected.length < 2) {
            setSelected([...selected, scanId]);
        }
    };

    const isSelected = (scanId: string) => selected.includes(scanId);

    const handleCompare = () => {
        if (selected.length === 2) {
            navigation.navigate('BeforeAfter', {
                scanId1: selected[0],
                scanId2: selected[1],
            });
        }
    };

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#007666', '#4CD4C2']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.topSection}
        >
          <BackHeader />
          <Text style={styles.title}>Compare With...</Text>
          <Text style={styles.subtitle}>Select Past Scan</Text>
        </LinearGradient>

        <View style={styles.mainSection}>
            {loading ? (
                <ActivityIndicator size="large" color="#00C2A8" style={{ marginTop: 30 }} />
            ) : (
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {scans.length === 0 && (
                  <Text style={{ color: '#333', textAlign: 'center', marginTop: 30 }}>
                    No scan history yet.
                  </Text>
                )}
                {scans.map((scan) => {
                  const formattedDate = scan.date
                    ? new Date(scan.date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: '2-digit',
                      })
                    : 'Unknown date';
                  return (
                    <TouchableOpacity
                        key={scan.id}
                        style={[
                            styles.dateOption,
                            isSelected(scan.id) && styles.dateOptionSelected,
                        ]}
                        onPress={() => toggleDate(scan.id)}
                    >
                        <Text style={styles.dateText}>{formattedDate}</Text>
                        <Icon
                            name={isSelected(scan.id) ? 'radiobox-marked' : 'radiobox-blank'}
                            size={22}
                            color="#fff"
                        />
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
            )}
            <TouchableOpacity
                style={[
                    styles.compareButton,
                    selected.length === 2 ? {} : { opacity: 0.5 },
                ]}
                disabled={selected.length !== 2}
                onPress={handleCompare}
            >
                <Text style={styles.compareText}>Compare</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
};

export default CompareScreen;
