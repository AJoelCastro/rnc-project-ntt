import React, { useEffect } from 'react'
import { Header, TransactionsList } from '@arturocastro/react-native-rnc-library-ntt'
import { useNavigation } from '@react-navigation/native'
import { useLoadingStore } from '@/store/LoadingStore';

const TransactionScreen = () => {

    const navigate = useNavigation();
    const { setIsLoading } = useLoadingStore();
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, [])

    return (
        <>
            <Header title='Movimientos' iconName='' onBack={() => navigate.goBack()} />
            <TransactionsList />
        </>
    )
}

export default TransactionScreen