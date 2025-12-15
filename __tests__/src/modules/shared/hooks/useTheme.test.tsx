import React from 'react';
import { renderHook, render } from '@testing-library/react-native';
import { useTheme, ThemedText } from '@/modules/shared/hooks/useTheme';
import { useColorScheme, Text } from 'react-native';

// Use spyOn instead of mock to avoid TurboModule issues if possible
// But useColorScheme is exported directly.
// Let's try mocking the module but returning a simpler object for what we need and using requireActual for others IF it works, 
// else we might need to rely on the fact that react-native mocks itself in Jest.
// Jest preset for react-native mocks useColorScheme.
// We can just spy on it? 
// The error "DevMenu could not be found" with requireActual suggests environment issues.
// Let's try NOT mocking react-native manually and just assume the preset works, 
// and use `jest.spyOn(require('react-native'), 'useColorScheme')`.
// However, the preset might make it a getter.

// Alternative: verify if we can just mock the hook result without mocking RN.
// But we are testing the hook itself.

jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');
    // Mocking only what we need and trying to avoid what breaks
    return {
        ...RN,
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

    it('renders ThemedText correctly', () => {
        (useColorScheme as jest.Mock).mockReturnValue('light');
        const { getByText } = render(<ThemedText>Hello</ThemedText>);
        const text = getByText('Hello');
        expect(text.props.style).toEqual(expect.arrayContaining([
            { color: '#000' } // primary light
        ]));
    });

    it('renders ThemedText secondary', () => {
        (useColorScheme as jest.Mock).mockReturnValue('light');
        const { getByText } = render(<ThemedText color="secondary">Hello</ThemedText>);
        const text = getByText('Hello');
        expect(text.props.style).toEqual(expect.arrayContaining([
            { color: '#404756' } // secondary light
        ]));
    });
});
