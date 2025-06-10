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
    color: '#fff',
    fontFamily: 'Roboto-Regular',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#00C2A8',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    color: '#00C2A8',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  metricPickerWrapper: {
    borderColor: '#00C2A8',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  metricPicker: {
    height: 38,
    width: 150,
    color: '#00C2A8',
  },
  graphPlaceholder: {
    height: 400,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
