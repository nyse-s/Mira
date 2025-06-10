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
    },
    mainSection: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: -40,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      zIndex: 1,
      padding: 16,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: 'Roboto-Regular',
    },
    comparisonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 500,
    },
    modelWebView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#eee',
    },
    separator: {
      width: 2,
      height: 500,
      backgroundColor: 'red',
      marginHorizontal: 8,
    },
    dates: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    dateText: {
      fontSize: 14,
      color: '#007666',
      fontWeight: 'bold',
    },
});
