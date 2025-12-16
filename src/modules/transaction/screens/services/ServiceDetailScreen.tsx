import { View, StyleSheet } from 'react-native'
import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { HomeStackParamList } from '@/navigation/root.stack/init.tabs/home/_layout'
import { Button, Header } from '@arturocastro/react-native-rnc-library-ntt'

type RouteProps = RouteProp<HomeStackParamList, 'ServiceDetailHome'>
type Props = {}

const ServiceDetailScreen = ({ }: Props) => {
    const route = useRoute<RouteProps>()
    const navigate = useNavigation()
    const { id } = route.params
    return (
        <View style={styles.container}>
            <Header title={`Servicio ${id}`} iconName='' onBack={() => navigate.goBack()} />
            <View style={styles.content}>
                <Button title='Pagar Servicio' backgroundColor='#34C759' />
                <Button title='Cancelar' backgroundColor='#FF383C' />
            </View>
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