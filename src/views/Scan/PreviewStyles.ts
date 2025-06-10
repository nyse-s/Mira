import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
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
        // borderRadius: 30,
        paddingHorizontal: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        zIndex: 1,
        flexGrow: 1,
      },
    previewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        zIndex: 3,
      },
    photoPreview: {
        width: 120,
        height: 120,
        marginVertical: 8,
        borderRadius: 16,
      },
    video: {
        width: '100%',
        height: 250,
        borderRadius: 16,
        backgroundColor: '#000',
      },
    button: {
        marginVertical: 6,
        backgroundColor: '#FF7D7D',
        padding: 10,
        borderRadius: 16,
        top: -200,
        zIndex: 3,
        alignItems: 'center',
      },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
});
