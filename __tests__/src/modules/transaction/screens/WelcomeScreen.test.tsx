import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from '@/modules/transaction/screens/WelcomeScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}));

describe('WelcomeScreen', () => {
    it('renders correctly', () => {
        const { getByText } = render(<WelcomeScreen />);
        expect(getByText('Bienvenido César')).toBeTruthy();
        expect(getByText('Tarjetas')).toBeTruthy();
        expect(getByText('Movimientos')).toBeTruthy();
    });

    it('navigates on menu press', () => {
        const { getByText } = render(<WelcomeScreen />);
        fireEvent.press(getByText('Tarjetas'));
        expect(mockNavigate).toHaveBeenCalledWith('CardHome');

        fireEvent.press(getByText('Movimientos'));
        expect(mockNavigate).toHaveBeenCalledWith('TransactionHome');

        fireEvent.press(getByText('Préstamos'));
        expect(mockNavigate).toHaveBeenCalledWith('LeanHome');

        fireEvent.press(getByText('Servicios'));
        expect(mockNavigate).toHaveBeenCalledWith('ServicesHome');
    });
});
