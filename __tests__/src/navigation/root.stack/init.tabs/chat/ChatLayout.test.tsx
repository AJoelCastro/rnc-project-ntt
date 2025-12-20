import React from 'react';
import { render } from '@testing-library/react-native';
import ChatLayout from '@/navigation/root.stack/init.tabs/chat/_layout';

// Mock child layouts
jest.mock('@/navigation/root.stack/init.tabs/chat/_layout', () => () => null);


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