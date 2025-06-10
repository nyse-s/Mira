import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 100,
    zIndex: 0,
  },
  mainSection: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 1,
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Roboto-Regular',

  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Roboto-Regular',

  },
  scrollContent: {
    paddingBottom: 20,
  },
  dateOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4CD4C2',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  dateOptionSelected: {
    backgroundColor: '#00C2A8',
  },
  dateText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  compareButton: {
    backgroundColor: '#FF7D7D',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    bottom:200,
  },
  compareText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
