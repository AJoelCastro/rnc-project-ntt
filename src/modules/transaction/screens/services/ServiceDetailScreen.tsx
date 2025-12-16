import { View, StyleSheet, Alert, Text } from 'react-native'
import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { HomeStackParamList } from '@/navigation/root.stack/init.tabs/home/_layout'
import { Button, Header, useNetworkMonitor } from '@arturocastro/react-native-rnc-library-ntt'

type RouteProps = RouteProp<HomeStackParamList, 'ServiceDetailHome'>
type Props = {}

const ServiceDetailScreen = ({ }: Props) => {
    const route = useRoute<RouteProps>()
    const navigate = useNavigation()
    const { id } = route.params
    const { connectionInfo, isLoading } = useNetworkMonitor();
    const handlePayService = async () => {
        try {
            if (connectionInfo?.type == "none" || connectionInfo?.type == "unknown") {
                Alert.alert('Error', "Usted no tiene acceso a internet. Trate de establecer una conexión")
                return
            }
            Alert.alert('Éxito', "Se pago el servicio correctamente")
        } catch (error) {
            Alert.alert('Error', 'Hubo un error al pagar el servicio')
        }
    }

    return (
        <View style={styles.container}>
            <Header title={`Servicio ${id}`} iconName='' onBack={() => navigate.goBack()} />
            <View style={styles.content}>
                <Button title='Pagar Servicio' backgroundColor='#34C759' onPress={handlePayService} />
                <Button title='Cancelar' backgroundColor='#FF383C' onPress={() => navigate.goBack()} />
            </View>
            <Text>
                {JSON.stringify(connectionInfo)}{connectionInfo?.isConnected ? 'Conectado' : 'Desconectado '}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        gap: 12,
        marginHorizontal: 16,
        marginTop: '20%'
    },
})

export default ServiceDetailScreen