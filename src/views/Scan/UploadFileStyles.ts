import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 14,
    paddingTop: 2,
    paddingBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    gap: 12,
  },
  actionButton: {
    width: 180,
    height: 70,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 23,
    fontWeight: 'bold',
    fontSize: 4,
  },
  imagesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    marginVertical: 8,
  },
  image: {
    width: 95,
    height: 130,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 8,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 2,
    marginLeft: 4,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    borderRadius: 8,
    width: '100%',
    padding: 7,
    fontSize: 15,
    marginBottom: 1,
  },
  pickerWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
  },
  picker: {
    width: '100%',
    color: '#fff',
  },
  uploadButton: {
    marginTop: 16,
    width: '90%',
    maxWidth: 250,
    alignSelf: 'center',
    borderRadius: 23,
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
  success: {
    marginTop: 8,
    color: '#00C2A8',
    fontWeight: 'bold',
  },
});
