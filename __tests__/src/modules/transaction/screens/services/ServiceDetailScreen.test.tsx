import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import ServiceDetailScreen from '@/modules/transaction/screens/services/ServiceDetailScreen'

const mockGoBack = jest.fn()

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: mockGoBack,
    }),
    useRoute: () => ({
        params: {
            id: 3,
        },
    }),
}))

jest.mock('@arturocastro/react-native-rnc-library-ntt', () => {
    const { Text } = require('react-native')
    return {
        Header: (props: any) => (
            <Text testID="header" onPress={props.onBack}>
                {props.title}
            </Text>
        ),
    }
})

describe('ServiceDetailScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders header with service id', () => {
        const { getByText } = render(<ServiceDetailScreen />)

        expect(getByText('Servicio 3')).toBeTruthy()
    })

    it('calls goBack when back is pressed', () => {
        const { getByTestId } = render(<ServiceDetailScreen />)

        fireEvent.press(getByTestId('header'))

        expect(mockGoBack).toHaveBeenCalled()
    })
})
