import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 232,
    height: 204,
    marginBottom: 20,
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
  loginButton: {
    backgroundColor: 'white',
    // paddingVertical: 12,
    // paddingHorizontal: 48,
    overflow: 'hidden',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 175,
    height: 46,
  },
  loginText: {
    color: '#ff6b6b',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  help: {
    color: '#fff',
    marginTop: 20,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
});
