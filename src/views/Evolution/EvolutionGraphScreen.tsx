import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './EvolutionGraphStyles';
import BackHeader from '../../components/BackHeader';
import { useEvolutionModelView } from '../../viewmodels/EvolutionViewModel';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryScatter } from 'victory-native';

const metricLabelMap: { [key: string]: string } = {
  Shoulders: 'acrossBackShoulderWidth',
  Waist: 'waistGirth',
  'Hip circumference': 'hipGirth',
  Chest: 'bustGirth',
  Arms: 'upperArmGirthR',
};
const metrics = Object.keys(metricLabelMap);
const { width } = Dimensions.get('window');


const EvolutionScreen = () => {
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { measurements } = useEvolutionModelView();

  // Main data for graph
  const dataForGraph = useMemo(() => {
    if (!measurements) return [];
    const metricName = metricLabelMap[selectedMetric];
    return measurements
      .filter(item => !!item.Scan?.date && Array.isArray(item.metrics))
      .map(item => {
        const metricObj = item.metrics.find((m: any) => m && m.name === metricName);
        return metricObj
          ? {
              x: new Date(item.Scan!.date!),
              y: metricObj.unit === 'mm' ? metricObj.value / 10 : metricObj.value, // mm → cm
            }
          : null;
      })
      .filter((point): point is { x: Date; y: number } => !!point)
      .sort((a, b) => a.x.getTime() - b.x.getTime());
  }, [measurements, selectedMetric]);

  // Find current measurement for selected date
  const currentMeasurement = useMemo(() => {
    if (!selectedDate || !measurements) return null;
    const metricName = metricLabelMap[selectedMetric];
    return measurements.find(item => {
      const d = item.Scan?.date ? new Date(item.Scan.date) : undefined;
      return (
        d &&
        d.toDateString() === selectedDate.toDateString() &&
        Array.isArray(item.metrics) &&
        item.metrics.some((m: any) => m && m.name === metricName)
      );
    });
  }, [measurements, selectedDate, selectedMetric]);

  // Show value for selected date
  let valueLabel = '';
  if (currentMeasurement) {
    const metricName = metricLabelMap[selectedMetric];
    const metricObj = currentMeasurement.metrics?.find((m: any) => m && m.name === metricName);
    if (metricObj) {
      const value = metricObj.unit === 'mm'
        ? (metricObj.value / 10).toFixed(1)
        : metricObj.value;
      const unit = metricObj.unit === 'mm' ? 'cm' : metricObj.unit;
      valueLabel = `${selectedMetric}: ${value} ${unit}`;
    }
  } else if (selectedDate) {
    valueLabel = 'No value for this date';
  }

  // Picker controls
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#007666', '#4CD4C2']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.topSection}
      >
        <BackHeader />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.title}>Statistics</Text>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.mainSection}>
        {/* Metric selector */}
        <View style={styles.filterRow}>
          {/* Date Button */}
          <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
            <Icon name="calendar" size={18} color="#00C2A8" />
            <Text style={styles.dateText}>
              {selectedDate ? selectedDate.toLocaleDateString() : 'Date'}
            </Text>
          </TouchableOpacity>
          {/* Picker Metric */}
          <View style={styles.metricPickerWrapper}>
            <Picker
              selectedValue={selectedMetric}
              onValueChange={setSelectedMetric}
              style={styles.metricPicker}
              dropdownIconColor="#00C2A8"
            >
              {metrics.map(metric => (
                <Picker.Item label={metric} value={metric} key={metric} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Selected day measurement */}
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          {!!selectedDate && (
            <Text style={{ fontWeight: 'bold', color: '#00C2A8' }}>
              {valueLabel}
            </Text>
          )}
        </View>

        {/* Graph */}
        <View style={styles.graphPlaceholder}>
          {dataForGraph.length > 0 ? (
            <VictoryChart
              height={400}
              width={width - 50}
              theme={VictoryTheme.material}
              padding={{ top: 20, bottom: 50, left: 50, right: 20 }}
              domainPadding={15}
            >
              <VictoryAxis
                tickFormat={(d: any) => {
                  const date = new Date(d);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
                style={{
                  axisLabel: { fontSize: 12 },
                  tickLabels: { angle: -45, fontSize: 10, padding: 20 },
                }}
                fixLabelOverlap
              />
              <VictoryAxis
                dependentAxis
                tickFormat={y => `${y} cm`}
                style={{
                  axisLabel: { fontSize: 12 },
                  tickLabels: { fontSize: 10 },
                }}
                // Uncomment below to force sensible Y-range if needed (e.g., for Shoulders in cm)
                domain={[30, 70]}
              />
              <VictoryLine
                data={dataForGraph}
                x="x"
                y="y"
                style={{ data: { stroke: '#00C2A8', strokeWidth: 2 } }}
              />
              {/* Highlight point for selected date */}
              {selectedDate && currentMeasurement && (() => {
                const metricName = metricLabelMap[selectedMetric];
                const metricObj = currentMeasurement.metrics?.find((m: any) => m && m.name === metricName);
                return metricObj ? (
                  <VictoryScatter
                    data={[
                      {
                        x: new Date(currentMeasurement.Scan!.date!),
                        y: metricObj.unit === 'mm' ? metricObj.value / 10 : metricObj.value,
                      },
                    ]}
                    size={5}
                    style={{ data: { fill: 'tomato' } }}
                  />
                ) : null;
              })()}
            </VictoryChart>
          ) : (
            <Text>No data to display for this metric</Text>
          )}
        </View>

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
};

export default EvolutionScreen;
