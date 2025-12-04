import { View } from 'react-native'
import React from 'react'
import { useTheme } from '@/hooks/useTheme'
import { EdgeInsets } from 'react-native-safe-area-context'
import { TransactionsList } from '@/components/organisms/transaction/TransactionList'

type TransactionPageProps = {
    safeAreaInsets?: EdgeInsets
}

const TransactionPage = ({safeAreaInsets}:TransactionPageProps) => {

    const {colors} = useTheme()

    return (
        <View
            style={{
                backgroundColor: colors.background,
                paddingTop: safeAreaInsets!.top,
                paddingLeft: safeAreaInsets!.left,
                paddingRight: safeAreaInsets!.right,
                paddingBottom: safeAreaInsets!.bottom
            }}
        >
            <TransactionsList/>
        </View>
    )
}

export default TransactionPage