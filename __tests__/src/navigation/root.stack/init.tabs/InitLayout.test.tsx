import React from 'react';
import { render } from '@testing-library/react-native';
import InitLayout from '@/navigation/root.stack/init.tabs/_layout';

jest.mock('@react-navigation/bottom-tabs', () => {
    const { View } = require('react-native');
    return {
        createBottomTabNavigator: () => ({
            Navigator: ({ children }: any) => <View>{children}</View>,
            Screen: () => <View />,
        }),
    };
});

jest.mock('@/navigation/root.stack/init.tabs/home/_layout', () => () => null);
jest.mock('@/navigation/root.stack/init.tabs/chat/_layout', () => () => null);
jest.mock('@/navigation/root.stack/init.tabs/configuration/_layout', () => () => null);

describe('InitLayout', () => {
    it('renders correctly', () => {
        render(<InitLayout />);
    });
});
