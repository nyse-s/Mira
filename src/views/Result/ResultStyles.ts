import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    topSection: {
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 80,
        zIndex: 0,
    },
    mainSection: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: -40,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        zIndex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Roboto-Regular',
    },
    bodyContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    modelContainer: {
        width: 220,
        height: 380,
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 20,
    },
    modelWebView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#eee',
    },
    measurementsBox: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 10,
    },
    measurementsTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#007666',
        marginBottom: 10,
    },
    measurement: {
        fontSize: 14,
        color: '#00C2A8',
        marginBottom: 5,
    },
    scanDate: {
        color: '#000',
        fontSize: 14,
        marginTop: 4,
    },
    scanDateContainer: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 15,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButton: {
        width: 115,
        height: 44,
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Regular',
    },
    historySection: {
        marginTop: 10,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        fontFamily: 'Roboto-Regular',
    },
    historyList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
    },
    historyItem: {
        backgroundColor: '#7fe0d3',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginRight: 10,
        color: '#007666',
        fontWeight: 'bold',
        fontFamily: 'Roboto-Regular',
    },
    historyDate: {
        color: '#fff',
        fontWeight: '500',
        fontFamily: 'Roboto-Regular',
    },
});
