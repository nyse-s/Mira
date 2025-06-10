import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Alert, Image, TouchableOpacity, KeyboardTypeOptions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from './UserManagementStyles';
import BackHeader from '../../components/BackHeader';
import GradientButton from '../../components/GradientButton';
import { useUserManagementViewModel } from '../../viewmodels/UserManagementViewModel';

const UserManagementScreen = () => {
    const [inputs, setInputs] = useState({ username: '', email: '', resetEmail: '', avatarurl: ''});

    const { loading, updateProfile, handleChangeEmail, handlePasswordReset } = useUserManagementViewModel();

    const pickImage = async () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setInputs((prev) => ({
                    ...prev,
                    avatarurl: response.assets?.[0]?.uri || '',
                }));
            }
        });
    };

    const handleSaveProfile = async () => {
        try {
            await updateProfile({
                username: inputs.username || undefined,
                avatarLocalUri: inputs.avatarurl || undefined,
            });
            Alert.alert('Profile updated', 'Your username and/or avatar have been updated.');
        } catch (e: any) {
            Alert.alert('Error', e.message || 'Failed to update profile.');
        }
    };

    const handleAction = async (action: string) => {
        switch (action) {
            case 'updateEmail':
                if (!inputs.email) {return Alert.alert('Please enter your new email.');}
                const emailResult = await handleChangeEmail(inputs.email);
                Alert.alert(emailResult.success ? 'Email change' : 'Error', emailResult.success
                  ? 'A verification link has been sent to your new email.'
                  : emailResult.message || 'Failed to change email.'
                );
                break;
            case 'updatePassword':
                if (!inputs.resetEmail) {return Alert.alert('Please enter your email (needed for reset).');}
                const pwResult = await handlePasswordReset(inputs.resetEmail);
                Alert.alert(pwResult.success ? 'Reset Password' : 'Error', pwResult.success
                  ? 'A password reset link has been sent to your email.'
                  : pwResult.message || 'Failed to send reset email.'
                );
                break;
            case 'deleteAccount':
                Alert.alert('Account deleted! (not implemented)');
                break;
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
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={styles.title}>User Management</Text>
                </View>
            </LinearGradient>

            <View style={styles.mainSection}>
                <ScrollView contentContainerStyle={{ padding: 24 }}>
                    <View style={styles.fieldBlock}>
                        <View style={styles.labelRow}>
                            <Icon name="person" size={22} color="#FF7D7D" />
                            <Text style={styles.fieldLabel}>Change Username</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new username"
                            value={inputs.username}
                            onChangeText={text => setInputs({ ...inputs, username: text })}
                            placeholderTextColor="#bdbdbd"
                        />
                        <View style={[styles.labelRow, { marginTop: 16 }]}>
                            <Icon name="image" size={22} color="#FF7D7D" />
                            <Text style={styles.fieldLabel}>Change Avatar</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.imagePickerButton}
                            onPress={pickImage}
                        >
                            <Text style={styles.imagePickerText}>
                                {inputs.avatarurl ? 'Change Image' : 'Choose Image'}
                            </Text>
                        </TouchableOpacity>
                        {inputs.avatarurl ? (
                            <View style={{ alignItems: 'center', marginBottom: 12 }}>
                                <Image
                                    source={{ uri: inputs.avatarurl }}
                                    style={{
                                        width: 80, height: 80, borderRadius: 40,
                                        marginTop: 8, borderWidth: 1, borderColor: '#eee'
                                    }}
                                    resizeMode="cover"
                                />
                            </View>
                        ) : null}
                        <GradientButton
                            title="Save"
                            onPress={handleSaveProfile}
                            style={{ marginTop: 4, width: '100%', paddingVertical: 4 }}
                            textStyle={{ fontSize: 14 }}
                            disabled={loading}
                        />
                    </View>

                    {[
                        { icon: 'email', label: 'Change Email', key: 'email', placeholder: 'Enter new email', action: 'updateEmail', keyboardType: 'email-address' as KeyboardTypeOptions },
                        { icon: 'lock', label: 'Change Password', key: 'resetEmail', placeholder: 'Enter your email for reset', action: 'updatePassword' },
                        { icon: 'delete', label: 'Delete Account', key: 'delete', action: 'deleteAccount' },
                    ].map((item, index) => (
                        <View style={styles.fieldBlock} key={index}>
                            <View style={styles.labelRow}>
                                <Icon name={item.icon} size={22} color="#FF7D7D" />
                                <Text style={styles.fieldLabel}>{item.label}</Text>
                            </View>
                            {item.key !== 'delete' && (
                                <TextInput
                                    style={styles.input}
                                    placeholder={item.placeholder}
                                    value={inputs[item.key as keyof typeof inputs]}
                                    onChangeText={text => setInputs({ ...inputs, [item.key]: text })}
                                    placeholderTextColor="#bdbdbd"
                                    keyboardType={item.keyboardType || 'default'}
                                />
                            )}
                            <GradientButton
                                title={item.key === 'delete' ? 'Delete' : 'Update'}
                                onPress={() => handleAction(item.action)}
                                style={{ marginTop: 4, width: '100%', paddingVertical: 4 }}
                                textStyle={{ fontSize: 14 }}
                                gradientColors={item.key === 'delete'
                                    ? ['#e57373', '#ff8a65']
                                    : undefined
                                }
                                disabled={loading}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default UserManagementScreen;
