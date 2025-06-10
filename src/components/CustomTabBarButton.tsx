import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable } from 'react-native';

const CustomTabBarButton = ({ children, onPress }: BottomTabBarButtonProps) => (
  <Pressable
    android_ripple={{ color: 'transparent' }}
    onPress={onPress}
    style={({ pressed }) => ({
      opacity: pressed ? 0.8 : 1,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    })}
  >
    {children}
  </Pressable>
);

export default CustomTabBarButton;
