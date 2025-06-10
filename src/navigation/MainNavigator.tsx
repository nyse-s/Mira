import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTabBarButton from '../components/CustomTabBarButton';

import HomeScreen from '../views/Home/HomeScreen';
import ScanNavigator from './ScanNavigator';
import ResultNavigator from './ResultNavigator';
import ProfileNavigator from './ProfileNavigator';
import { navigationRef } from './navigationRef';
import { MainTabParamList } from './MainTabParamList';


const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
        tabBarIcon: ({ focused }) => {
          let iconName = '';

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Scan':
              iconName = 'photo-camera';
              break;
            case 'Result':
              iconName = 'view-in-ar';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }

          return (
            <View style={styles.iconContainer}>
              <Icon
                name={iconName}
                size={focused ? 30 : 24}
                color={focused ? '#00C2A8' : '#99e6dc'}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scan" component={ScanNavigator}/>
      <Tab.Screen name="Result" component={ResultNavigator}/>
      <Tab.Screen name="Profile" component={ProfileNavigator} listeners={{
        tabPress: (e) => {
          e.preventDefault();
          navigationRef.navigate('Profile');
        },
      }}/>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 98,
    backgroundColor: '#f9f9f9',
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    elevation: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    marginTop: -5,
  },
});

export default MainNavigator;
