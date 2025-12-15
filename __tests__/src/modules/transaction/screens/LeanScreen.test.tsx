import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LeanScreen from '@/modules/transaction/screens/LeanScreen';
import { Alert } from 'react-native';
import { SecureStorage } from '@arturocastro/react-native-rnc-library-ntt';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: mockNavigate,
    }),
}));

jest.mock('@arturocastro/react-native-rnc-library-ntt', () => {
    const { View, Text, TextInput, TouchableOpacity } = require('react-native');
    return {
        Header: (props: any) => <Text>{props.title}</Text>,
        InputEmail: (props: any) => (
            <TextInput
                value={props.value}
                onChangeText={(t: string) => {
                    props.onChangeText(t);
                    if (props.onValidation) props.onValidation(t.includes('@'));
                }}
                placeholder={props.placeholder}
                testID="input-email"
            />
        ),
        InputWithDelete: (props: any) => (
            <TextInput value={props.value} onChangeText={props.onChangeText} placeholder={props.placeholder} testID={`input-${props.placeholder}`} />
        ),
        Selector: (props: any) => (
            <View>
                {props.items.map((item: any) => (
                    <TouchableOpacity key={item.id} onPress={() => props.onSelect(item)} testID={`selector-item-${item.id}`}>
                        <Text>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        ),
        Button: (props: any) => (
            <TouchableOpacity onPress={props.onPress} disabled={props.disabled} testID="submit-button">
                <Text>{props.title}</Text>
            </TouchableOpacity>
        ),
        SecureStorage: {
            getItem: jest.fn(),
        },
    };
});

jest.spyOn(Alert, 'alert');

describe('LeanScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (SecureStorage.getItem as jest.Mock).mockResolvedValue('');
    });

    it('renders and loads native data', async () => {
        (SecureStorage.getItem as jest.Mock).mockImplementation((key) => {
            if (key === 'email') return Promise.resolve('test@native.com');
            return Promise.resolve('');
        });

        const { getByTestId } = render(<LeanScreen />);
        await waitFor(() => {
            expect(getByTestId('input-email').props.value).toBe('test@native.com');
        });
    });

    it('validates submission', () => {
        const { getByTestId, getByText } = render(<LeanScreen />);
        const submitBtn = getByTestId('submit-button');
        // It's disabled if invalid email. Let's make email valid.
        fireEvent.changeText(getByTestId('input-email'), 'valid@email.com');

        // Try submit without doc number
        fireEvent.press(submitBtn);
        expect(Alert.alert).toHaveBeenCalledWith('Validación', 'Ingrese número de documento');
    });

    it('submits successfully', () => {
        const { getByTestId, getByPlaceholderText } = render(<LeanScreen />);

        fireEvent.changeText(getByTestId('input-email'), 'valid@email.com');
        fireEvent.changeText(getByPlaceholderText('75012345'), '12345678');
        fireEvent.changeText(getByTestId('input-Teléfono'), '999999999');

        fireEvent.press(getByTestId('submit-button'));
        expect(Alert.alert).toHaveBeenCalledWith('Enviado', 'Tus datos han sido enviados.');
    });
});
