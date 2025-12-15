import { View, Text } from 'react-native'
import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { HomeStackParamList } from '@/navigation/root.stack/init.tabs/home/_layout'
import { Header } from '@arturocastro/react-native-rnc-library-ntt'

type RouteProps = RouteProp<HomeStackParamList, 'ServiceDetailHome'>
type Props = {}

const ServiceDetailScreen = ({ }: Props) => {
    const route = useRoute<RouteProps>()
    const navigate = useNavigation()
    const { id } = route.params
    return (
        <View>
            <Header title={`Servicio ${id}`} iconName='' onBack={() => navigate.goBack()} />
        </View>
    )
}

export default ServiceDetailScreen