import React from 'react';
import { render } from '@testing-library/react-native';
import TransactionScreen from '@/modules/transaction/screens/TransactionScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: mockNavigate,
    }),
}));

jest.mock('@arturocastro/react-native-rnc-library-ntt', () => {
    const { View, Text } = require('react-native');
    return {
        Header: (props: any) => <Text>{props.title}</Text>,
        TransactionsList: () => <View testID="transactions-list" />,
    };
});

describe('TransactionScreen', () => {
    it('renders correctly', () => {
        const { getByText, getByTestId } = render(<TransactionScreen />);
        expect(getByText('Movimientos')).toBeTruthy();
        expect(getByTestId('transactions-list')).toBeTruthy();
    });
});
