import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Switch, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../../components/GradientButton';
import BackHeader from '../../components/BackHeader';
import styles from './SettingsStyles';
import { Picker } from '@react-native-picker/picker';
import { useSettingsViewModel } from '../../viewmodels/SettingsViewModel';

const THEMES = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
];

const SettingsScreen = () => {
  const { settings, loading, error, saveSettings } = useSettingsViewModel();

  // Local state for form fields
  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('en');
  const [privacyMode, setPrivacyMode] = useState(false);

  // Load settings from ViewModel
  useEffect(() => {
    if (settings) {
      setTheme(settings.theme || 'system');
      setLanguage(settings.language || 'en');
      setPrivacyMode(!!settings.privacyMode);
    }
  }, [settings]);

  const handleSave = async () => {
    const ok = await saveSettings({ theme, language, privacyMode });
    if (ok) {
    Alert.alert('Settings updated!');
    } else if (error) {
    Alert.alert('Error', error);
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
            <BackHeader/>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={styles.title}>Settings</Text>
            </View>
      </LinearGradient>
      <View style={styles.mainSection}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Theme Picker */}
                <Text style={styles.label}>Theme</Text>
                <Picker
                    selectedValue={theme}
                    onValueChange={setTheme}
                    style={styles.picker}
                >
                {THEMES.map(opt => (
                    <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
                </Picker>
                {/* Language Picker */}
                <Text style={styles.label}>Language</Text>
                <Picker
                    selectedValue={language}
                    onValueChange={setLanguage}
                    style={styles.picker}
                >
                    {LANGUAGES.map(opt => (
                        <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                    ))}
                </Picker>
                {/* Privacy Mode Switch */}
                <View style={styles.switchRow}>
                    <Text style={styles.label}>Privacy Mode</Text>
                    <Switch
                        value={privacyMode}
                        onValueChange={setPrivacyMode}
                        trackColor={{ false: "#ccc", true: "#4CD4C2" }}
                        thumbColor={privacyMode ? "#007666" : "#f4f3f4"}
                    />
                </View>
                <GradientButton
                    title="Save"
                    onPress={handleSave}
                    style={{ marginTop: 32 }}
                    disabled={loading}
                />
                {!!error && (
                    <Text style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>{error}</Text>
                )}
            </ScrollView>
      </View>
    </View>
  );
};

export default SettingsScreen;
