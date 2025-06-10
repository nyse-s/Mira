import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../navigation/MainTabParamList';
import { ResultStackParamList } from '../../navigation/ResultStackParamList';
import { ProfileStackParamList } from '../../navigation/ProfileStackParamList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './ProfileStyles';
import { handleLogout } from '../../viewmodels/AuthViewModel';
import { useProfileViewModel } from '../../viewmodels/ProfileViewModel';



type NavigationType = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  CompositeNavigationProp<
    NativeStackNavigationProp<ResultStackParamList>,
    NativeStackNavigationProp<ProfileStackParamList, 'Profile'>
  >
>;

const ProfileScreen = () => {
    const navigation = useNavigation<NavigationType>();
    const { getProfileInfo } = useProfileViewModel();
    const profile = getProfileInfo();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#007666', '#4CD4C2']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.topSection}
            >
                <View style={styles.profileHeader}>
                    {profile?.avatarurl ? (
                        <Image source={{ uri: profile.avatarurl }} style={styles.avatarImage} />
                    ) : (
                        <Icon name="account-circle" size={64} color="#000" />
                    )}
                <Text style={styles.username}>{profile?.displayname}</Text>
                </View>
            </LinearGradient>

            <View style={styles.mainSection}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                {[
                    { icon: 'cog', label: 'Settings', onPress: () => navigation.navigate('Settings') },
                    { icon: 'account-multiple', label: 'User management', onPress: () => navigation.navigate('UserManagement')},
                    { icon: 'bell-outline', label: 'Notifications' },
                    { icon: 'chart-line', label: 'Statistics', onPress: () => navigation.navigate('Result', { screen: 'Evolution'})},
                    { icon: 'information-outline', label: 'Information' },
                    { icon: 'logout', label: 'Log out', onPress: async () => {
                        await handleLogout();
                    }},
                ].map((item, index) => (
                    <TouchableOpacity style={styles.item} key={index} onPress={item.onPress}>
                        <View style={styles.itemLeft}>
                            <Icon name={item.icon} size={22} color="#FF7D7D" />
                            <Text style={styles.itemText}>{item.label}</Text>
                        </View>
                        <Icon name="chevron-right" size={24} color="#FF7D7D" />
                    </TouchableOpacity>
                ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default ProfileScreen;
