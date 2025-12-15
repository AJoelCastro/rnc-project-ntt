import React from 'react'
import { Header, TransactionsList } from '@arturocastro/react-native-rnc-library-ntt'
import { useNavigation } from '@react-navigation/native'

const TransactionScreen = () => {

    const navigate = useNavigation();

    return (
        <>
            <Header title='Movimientos' iconName='' onBack={()=>navigate.goBack()}/>
            <TransactionsList/>
        </>
    )
}

export default TransactionScreen