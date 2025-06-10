import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './ProfileStackParamList';

import ProfileScreen from '../views/Profile/ProfileScreen';
import SettingsScreen from '../views/Profile/SettingsScreen';
import UserManagementScreen from '../views/Profile/UserManagementScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="UserManagement" component={UserManagementScreen} />
      </Stack.Navigator>
    );
};

export default ProfileNavigator;
