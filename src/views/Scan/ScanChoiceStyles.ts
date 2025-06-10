import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 178,
    fontFamily: 'Roboto-Regular',
  },
  buttonGroup: {
    gap: 40,
  },
  button: {
    backgroundColor: '#fff',
    width: 143,
    height: 143,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  icon: {
    width: 36,
    height: 36,
    marginBottom: 10,
  },
  buttonText: {
    color: '#00c2a8',
    fontWeight: '600',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
});
