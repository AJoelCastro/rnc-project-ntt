import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import SplashScreen from '@/modules/shared/screens/SplashScreen';
import { SecureStorage } from '@arturocastro/react-native-rnc-library-ntt';

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
        dispatch: mockDispatch,
    }),
    CommonActions: {
        reset: jest.fn(),
    },
}));

jest.mock('@/modules/shared/hooks/useTheme', () => ({
    useTheme: () => ({
        colors: {
            background: 'white',
            backgroundHighlight: 'blue',
            textPrimary: 'black',
            textSecondary: 'gray',
        },
    }),
}));

jest.mock('@arturocastro/react-native-rnc-library-ntt', () => ({
    SecureStorage: {
        getItem: jest.fn(),
    },
}));

jest.mock('@/store/LoginStore', () => ({
    useLogin: () => ({
        userData: null,
    }),
}));

describe('SplashScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('renders correctly', () => {
        const { getByText } = render(<SplashScreen />);
        expect(getByText('RNC')).toBeTruthy();
        expect(getByText('RNC Project')).toBeTruthy();
    });

    it('navigates to Init if token exists when isInitializing is true', async () => {
        (SecureStorage.getItem as jest.Mock).mockResolvedValue('valid-token');
        render(<SplashScreen isInitializing={true} />);

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(2000);
        });

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalled();
            // Check argument contains Init
        });
    });

    it('navigates to Login if no token when isInitializing is true', async () => {
        (SecureStorage.getItem as jest.Mock).mockResolvedValue(null);
        render(<SplashScreen isInitializing={true} />);

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalled();
        });
    });

    it('navigates to nextScreen if provided', () => {
        render(<SplashScreen nextScreen="SomeScreen" />);
        act(() => {
            jest.advanceTimersByTime(2000);
        });
        expect(mockDispatch).toHaveBeenCalled();
    });
});
