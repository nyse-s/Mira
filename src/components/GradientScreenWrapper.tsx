import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  children: React.ReactNode;
};

const GradientScreenWrapper: React.FC<Props> = ({ children }) => {
  return (
    <LinearGradient
      colors={['#007666', '#4CD4C2']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientScreenWrapper;
