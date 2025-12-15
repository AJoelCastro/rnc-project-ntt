import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from '@/modules/authentication/screens/RegisterScreen';
import { Alert } from 'react-native';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({ // RegisterScreen gets navigation via props actually, but let's mock just in case
    }),
}));

jest.spyOn(Alert, 'alert');

describe('RegisterScreen', () => {
    it('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(<RegisterScreen />);
        expect(getByText('Crear cuenta')).toBeTruthy();
        expect(getByPlaceholderText('Email')).toBeTruthy();
    });

    it('validates empty fields', () => {
        const { getByText } = render(<RegisterScreen />);
        fireEvent.press(getByText('Registrarse'));
        expect(Alert.alert).toHaveBeenCalledWith('Error', 'Completa todos los campos');
    });

    it('validates password mismatch', () => {
        const { getByText, getByPlaceholderText } = render(<RegisterScreen />);
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@test.com');
        fireEvent.changeText(getByPlaceholderText('Contraseña'), '123');
        fireEvent.changeText(getByPlaceholderText('Confirmar contraseña'), '124');
        fireEvent.press(getByText('Registrarse'));
        expect(Alert.alert).toHaveBeenCalledWith('Error', 'Las contraseñas no coinciden');
    });

    it('registers successfully', () => {
        const { getByText, getByPlaceholderText } = render(<RegisterScreen />);
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@test.com');
        fireEvent.changeText(getByPlaceholderText('Contraseña'), '123');
        fireEvent.changeText(getByPlaceholderText('Confirmar contraseña'), '123');
        fireEvent.press(getByText('Registrarse'));
        expect(Alert.alert).toHaveBeenCalledWith('Registro', 'Cuenta creada para test@test.com');
    });

    it('navigates to login', () => {
        const navigationMock = { navigate: jest.fn() };
        const { getByText } = render(<RegisterScreen navigation={navigationMock} />);
        fireEvent.press(getByText('Inicia sesión'));
        expect(navigationMock.navigate).toHaveBeenCalledWith('Login');
    });
});
