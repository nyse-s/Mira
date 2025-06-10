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
        marginTop: -40,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        zIndex: 1,
        paddingTop: 20,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    label: {
        fontSize: 18,
        marginTop: 24,
        marginBottom: 6,
        color: '#007666',
        fontWeight: 'bold',
    },
    picker: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 32,
    },
});
