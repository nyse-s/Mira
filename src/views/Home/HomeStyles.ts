import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  hello: {
    color: '#fff',
    fontSize: 18,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',
  },
  mainSection: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 1,
    flexGrow: 1,
  },
  lastScanContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 32,
    marginBottom: 20,
    gap: 24,
  },
  scanBox: {
    width: 220,
    height: 220,
    overflow: 'hidden',
    borderRadius: 8,
  },
  modelWebView: {
    width: '100%',
    height: '100%',
  },
  scanRight: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 24,
  },
  dateText: {
    color: '#00c2a8',
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto-Regular',
  },
  detailsButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 10,
    paddingVertical: 18,
    borderRadius: 22,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  detailsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  lastScanText: {
    color: '#00c2a8',
    fontWeight: 'bold',
    fontSize: 28,
    alignSelf: 'center',
  },
  historyLabel: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 18,
    marginTop: 50,
    marginBottom: 10,
    paddingHorizontal:20,
  },
  historyItem: {
    backgroundColor: '#00c2a8',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Roboto-Regular',
  },
  historyText: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
  },
  fixedScanButton: {
    position: 'absolute',
    bottom: 120,
    left: '50%',
    transform: [{ translateX: -112 }],
    width: 224,
    height: 44,
    zIndex: 2,
  },
  scanButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;

