import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ServicesScreen from '@/modules/transaction/screens/ServicesScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
        goBack: mockGoBack,
    }),
}));

jest.mock('@arturocastro/react-native-rnc-library-ntt', () => {
    const { View, Text, TextInput } = require('react-native');
    return {
        Header: (props: any) => <Text>{props.title}</Text>,
        InputWithDelete: (props: any) => (
            <TextInput value={props.value} onChangeText={props.onChangeText} placeholder={props.placeholder} testID="search-input" />
        ),
        ServiceItem: (props: any) => <Text testID="service-item" onPress={props.onPress}>{props.title}</Text>,
    };
});

// Mock data
jest.mock('@/modules/shared/data/MockServices', () => ({
    MOCK_SERVICES: [
        { id: 1, title: 'Netflix' },
        { id: 2, title: 'Spotify' },
        { id: 3, title: 'Amazon' },
    ],
}));

describe('ServicesScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByText, getAllByTestId } = render(<ServicesScreen />);
        expect(getByText('Servicios')).toBeTruthy();
        expect(getAllByTestId('service-item').length).toBe(3);
    });

    it('filters services', () => {
        const { getByTestId, queryByText, getByText } = render(<ServicesScreen />);
        const input = getByTestId('search-input');
        fireEvent.changeText(input, 'Net');

        expect(getByText('Netflix')).toBeTruthy();
        expect(queryByText('Spotify')).toBeNull();
    });

    it('navigates to detail screen on press', () => {
        const { getByText } = render(<ServicesScreen />);
        fireEvent.press(getByText('Netflix'));
        expect(mockNavigate).toHaveBeenCalledWith('ServiceDetailHome', { id: 1 });
    });
});
