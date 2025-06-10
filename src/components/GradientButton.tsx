import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors?: string[];
  disabled?: boolean;
};


const GradientButton: React.FC<Props> = ({
  title,
  onPress,
  style,
  textStyle,
  gradientColors = ['#ff6b6b', '#ff8888'],
  disabled,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.buttonWrapper, style]}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
});

export default GradientButton;
