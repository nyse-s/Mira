import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = TextInputProps & {
  icon?: string;
};

const UnderlineInput: React.FC<Props> = ({ icon, ...props }) => {
  return (
    <View style={styles.container}>
      {icon && <Icon name={icon} size={20} color="#ffffff" style={styles.icon} />}
      <TextInput
        placeholderTextColor="#ffffffcc"
        style={styles.input}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    marginBottom: 40,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 8,
    fontFamily: 'Roboto-Regular',
  },
});

export default UnderlineInput;
