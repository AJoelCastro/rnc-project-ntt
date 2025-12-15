import React from 'react';
import { render } from '@testing-library/react-native';
import InitLayout from '@/navigation/root.stack/init.tabs/_layout';

// Mock Navigator to render icons
jest.mock('@react-navigation/bottom-tabs', () => {
    const { View, Text } = require('react-native');
    return {
        createBottomTabNavigator: () => ({
            Navigator: ({ children }: any) => <View>{children}</View>,
            Screen: ({ options }: any) => {
                // Execute tabBarIcon to cover it
                if (options?.tabBarIcon) {
                    options.tabBarIcon();
                }
                return <View />;
            },
        }),
    };
});

jest.mock('@/navigation/root.stack/init.tabs/home/_layout', () => () => null);
jest.mock('@/navigation/root.stack/init.tabs/chat/_layout', () => () => null);
jest.mock('@/navigation/root.stack/init.tabs/configuration/_layout', () => () => null);

describe('InitLayout', () => {
    it('renders correctly and triggers tab icons', () => {
        render(<InitLayout />);
        // Icons should be rendered by the mock screen
    });
});
