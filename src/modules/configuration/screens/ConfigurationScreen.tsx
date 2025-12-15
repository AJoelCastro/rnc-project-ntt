import { View, StyleSheet, Text, TouchableOpacity, Linking, Alert } from 'react-native'
import React from 'react'
import { ConfigItem, Header } from '@arturocastro/react-native-rnc-library-ntt'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { useLogin } from '@/store/LoginStore'

type Props = {}

const ConfigurationScreen = ({ }: Props) => {

    const navigate = useNavigation()
    const { clearUserData } = useLogin()

    const handleCallPress = async () => {
        const phoneNumber = 'tel:+51925187731'
        try {
            await Linking.openURL(phoneNumber)

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error al iniciar sesión'
            Alert.alert('Error', errorMessage)
        }
    }

    const handleLogout = async () => {
        clearUserData()
        navigate.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Authentication' as never }],
            })
        )
    }


    return (
        <View style={styles.container}>
            <Header title='Configuración de la Aplicación' iconName='' onBack={() => navigate.goBack()} />
            <View style={styles.listConfig}>
                <ConfigItem title='Seguridad' subtitle='Bloquea tu tarjeta y administra tu APP' />
                <ConfigItem subtitle='Compra por internet, efectivo, extranjero' />
                <ConfigItem title='Apple Pay' subtitle='Administra tus tarjetas afiliadas' />
                <ConfigItem title='Personaliza tu APP' subtitle='Yapea por celular' />
            </View>
            <View style={styles.contactContainer}>
                <Text style={styles.contactText}>
                    Si tienes alguna duda contactar al
                </Text>
                <TouchableOpacity onPress={handleCallPress} activeOpacity={0.7}>
                    <Text style={styles.phoneNumber}>
                        +51 925 187 731
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleLogout} >
                <Text style={styles.logoutText}>
                    Logout
                </Text>
                {/* <Text>
                    {JSON.stringify(userData)}
                </Text> */}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    listConfig: {
        marginTop: 80,
        marginBottom: 10,
    },
    contactContainer: {
        padding: 16,
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        gap: 8
    },
    contactText: {
        fontSize: 15,
        color: '#666',
        marginBottom: 8,
        textAlign: 'center',
    },
    phoneNumber: {
        fontSize: 14,
        color: '#7D2EFF',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    logoutText: {
        fontSize: 16,
        marginLeft: 16,
        fontWeight: '600',
        color: '#212020ff',
    },
})

export default ConfigurationScreen