import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChatScreen from '@/modules/chat/screens/ChatScreen';

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
                <TouchableOpacity onPress={props.onBack} testID="header-back">
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
        ),
        ChatSession: () => <View testID="chat-session" />,
    };
});

describe('ChatScreen', () => {
    it('renders correctly', () => {
        const { getByText, getByTestId } = render(<ChatScreen />);
        expect(getByText('Chatea con Robotin')).toBeTruthy();
        expect(getByTestId('chat-session')).toBeTruthy();
    });

    it('navigates back', () => {
        const { getByTestId } = render(<ChatScreen />);
        fireEvent.press(getByTestId('header-back'));
        expect(mockNavigate).toHaveBeenCalled();
    });
});
