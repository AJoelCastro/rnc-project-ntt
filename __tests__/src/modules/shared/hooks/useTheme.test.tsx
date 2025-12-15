import { renderHook } from '@testing-library/react-native';
import { useTheme } from '@/modules/shared/hooks/useTheme';
import { useColorScheme } from 'react-native';

jest.mock('react-native', () => {
    const actual = jest.requireActual('react-native');
    return {
        ...actual,
        useColorScheme: jest.fn(),
    };
});

describe('useTheme', () => {
    it('returns light theme by default', () => {
        (useColorScheme as jest.Mock).mockReturnValue('light');
        const { result } = renderHook(() => useTheme());
        expect(result.current.colors.background).toBe('#f3f3f3');
    });

    it('returns dark theme', () => {
        (useColorScheme as jest.Mock).mockReturnValue('dark');
        const { result } = renderHook(() => useTheme());
        expect(result.current.colors.background).toBe('#000');
    });
});
