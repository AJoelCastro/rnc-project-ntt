import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ConfigurationScreen from '@/modules/configuration/screens/ConfigurationScreen';
import { Linking, Alert } from 'react-native';

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: mockNavigate,
        dispatch: mockDispatch,
    }),
    CommonActions: {
        reset: jest.fn(),
    },
}));

const mockClearUserData = jest.fn();
jest.mock('@/store/LoginStore', () => ({
    useLogin: () => ({
        clearUserData: mockClearUserData,
    }),
}));

jest.mock('@arturocastro/react-native-rnc-library-ntt', () => {
    const { View, Text, TouchableOpacity } = require('react-native');
    return {
        Header: (props: any) => (
            <View>
                <Text>{props.title}</Text>
                <TouchableOpacity onPress={props.onBack} testID="header-back">
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
        ),
        ConfigItem: (props: any) => (
            <View>
                <Text>{props.title}</Text>
                <Text>{props.subtitle}</Text>
            </View>
        ),
    };
});

describe('ConfigurationScreen', () => {
    it('renders correctly', () => {
        const { getByText } = render(<ConfigurationScreen />);
        expect(getByText('Configuración de la Aplicación')).toBeTruthy();
        expect(getByText('Logout')).toBeTruthy();
    });

    it('handles logout', () => {
        const { getByText } = render(<ConfigurationScreen />);
        fireEvent.press(getByText('Logout'));
        expect(mockClearUserData).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalled();
    });

    it('handles call press', async () => {
        const { getByText } = render(<ConfigurationScreen />);
        const phoneText = getByText('+51 925 187 731');

        // Mock Linking.openURL
        const openURLSpy = jest.spyOn(Linking, 'openURL').mockResolvedValue(true);

        fireEvent.press(phoneText);
        expect(openURLSpy).toHaveBeenCalledWith('tel:+51925187731');
    });

    it('handles call press error', async () => {
        const { getByText } = render(<ConfigurationScreen />);
        const phoneText = getByText('+51 925 187 731');

        jest.spyOn(Linking, 'openURL').mockRejectedValue(new Error('Failed'));
        jest.spyOn(Alert, 'alert');

        fireEvent.press(phoneText);

        // Since it's async, we might need to wait, but fireEvent usually works. 
        // Warning: implementation is async.
        // It should be awaited or wrapped.
        // But for testing-library, standard await likely enough if update happens.

        // Wait for next tick?
        await new Promise(process.nextTick);

        expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed');
    });
});
