import React from 'react';
import { render } from '@testing-library/react-native';
import RootLayout from '@/navigation/root.stack/_layout';

// Mock child layouts
jest.mock('@/navigation/root.stack/authentication/_layout', () => () => null);
jest.mock('@/navigation/root.stack/init.tabs/_layout', () => () => null);

// Mock Navigator
jest.mock('@react-navigation/native-stack', () => {
    const { View } = require('react-native');
    return {
        createNativeStackNavigator: () => ({
            Navigator: ({ children }: any) => <View>{children}</View>,
            Screen: () => <View />,
        }),
    };
});

describe('RootLayout', () => {
    it('renders correctly', () => {
        render(<RootLayout />);
        // If it renders without crashing, we are good for now given mocks
    });
});
