import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 210,
    height: 184,
    marginTop: -100,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 46,
    marginBottom: -20,
    textAlign: 'center',
    fontFamily: 'Marhey-Regular',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 60,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },

  linkText: {
    color: '#fff',
    marginTop: 8,
    textDecorationLine: 'underline',
    fontFamily: 'Roboto-Regular',
  },
});
