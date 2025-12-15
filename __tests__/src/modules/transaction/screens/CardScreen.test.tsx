import React from 'react';
import { render } from '@testing-library/react-native';
import CardScreen from '@/modules/transaction/screens/CardScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: mockNavigate,
    }),
}));

jest.mock('@arturocastro/react-native-rnc-library-ntt', () => {
    const { View, Text, TouchableOpacity } = require('react-native');
    return {
        Header: (props: any) => (
            <View>
                <Text>{props.title}</Text>
            </View>
        ),
        Card: (props: any) => <Text testID="credit-card">Card {props.type}</Text>,
    };
});

describe('CardScreen', () => {
    it('renders correctly', () => {
        const { getByText, getAllByTestId } = render(<CardScreen />);
        expect(getByText('Tarjetas')).toBeTruthy();
        expect(getAllByTestId('credit-card').length).toBeGreaterThan(0);
    });
});
