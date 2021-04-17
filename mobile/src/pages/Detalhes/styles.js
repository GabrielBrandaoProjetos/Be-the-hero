import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,       
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    caso:{
        marginTop: 48,
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
    },

    casoProperty:{
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
    },

    casoValor:{
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380',
    },

    contactBox:{
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 50,
    },

    contactBoxText:{
        fontSize: 20,
        lineHeight: 30, 
        color: '#13131a',
        fontWeight: 'bold'
    },

    contactBoxDescription:{
        marginTop: 16,
        fontSize: 15,
        color: '#737380',
    },

    contactActions:{
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contactAction:{
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    contactActionText:{
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    }
})