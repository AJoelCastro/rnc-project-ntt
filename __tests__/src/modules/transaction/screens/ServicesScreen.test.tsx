import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import ServicesScreen from '@/modules/transaction/screens/ServicesScreen'

const mockNavigate = jest.fn()
const mockGoBack = jest.fn()

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
        goBack: mockGoBack,
    }),
}))

jest.mock('@arturocastro/react-native-rnc-library-ntt', () => {
    const { Text, TextInput } = require('react-native')
    return {
        Header: (props: any) => <Text>{props.title}</Text>,
        InputWithDelete: (props: any) => (
            <TextInput
                testID="search-input"
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
            />
        ),
        ServiceItem: (props: any) => (
            <Text testID="service-item" onPress={props.onPress}>
                {props.title}
            </Text>
        ),
    }
})

jest.mock('@/modules/shared/data/MockServices', () => ({
    MOCK_SERVICES: [
        { id: 1, title: 'Servicio 1' },
        { id: 2, title: 'Servicio 2' },
        { id: 3, title: 'Servicio 3' },
    ],
}))

describe('ServicesScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders correctly', () => {
        const { getByText, getAllByTestId } = render(<ServicesScreen />)

        expect(getByText('Servicios')).toBeTruthy()
        expect(getAllByTestId('service-item')).toHaveLength(3)
    })

    it('filters services by text', () => {
        const { getByTestId, queryByText, getByText } =
            render(<ServicesScreen />)

        const input = getByTestId('search-input')
        fireEvent.changeText(input, '1')

        expect(getByText('Servicio 1')).toBeTruthy()
        expect(queryByText('Servicio 2')).toBeNull()
        expect(queryByText('Servicio 3')).toBeNull()
    })

    it('navigates to detail screen on service press', () => {
        const { getByText } = render(<ServicesScreen />)

        fireEvent.press(getByText('Servicio 1'))

        expect(mockNavigate).toHaveBeenCalledWith(
            'ServiceDetailHome',
            { id: 1 }
        )
    })
})
