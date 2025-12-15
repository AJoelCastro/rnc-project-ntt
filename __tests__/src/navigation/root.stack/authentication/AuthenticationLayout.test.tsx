import React from 'react';
import { render } from '@testing-library/react-native';
import AuthenticationLayout from '@/navigation/root.stack/authentication/_layout';

jest.mock('@react-navigation/native-stack', () => {
    const { View } = require('react-native');
    return {
        createNativeStackNavigator: () => ({
            Navigator: ({ children }: any) => <View>{children}</View>,
            Screen: ({ children, component }: any) => {
                if (children && typeof children === 'function') return <View>{children({})}</View>;
                return <View />;
            },
        }),
    };
});

// Mock screens
jest.mock('@/modules/shared/screens/SplashScreen', () => () => null);
jest.mock('../../../../../../src/modules/authentication/screens/LoginScreen', () => () => null);
jest.mock('../../../../../../src/modules/authentication/screens/RegisterScreen', () => () => null);

describe('AuthenticationLayout', () => {
    it('renders correctly', () => {
        render(<AuthenticationLayout />);
    });
});
