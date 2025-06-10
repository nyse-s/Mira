import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 100,
    zIndex: 0,
    justifyContent: 'center',
  },
  title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#fff',
      fontFamily: 'Roboto-Regular',
  },
  mainSection: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -60,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 1,
    paddingTop: 20,
    marginBottom: 60,
  },
  fieldBlock: {
    marginBottom: 22,
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#007666',
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#b2dfdb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f6fefa',
    color: '#222',
    marginBottom: 12,
  },
  imagePickerButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#f3f3f3',
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  imagePickerText: {
    color: '#007666',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#f1f1f1',
    marginLeft: 56,
  },
});
