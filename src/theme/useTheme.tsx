import * as React from 'react';
import { Text, TextProps, useColorScheme } from 'react-native';

const COLORS = {
  light: {
    background: '#f3f3f3',
    backgroundHighlight: '#cfe6ee',
    cardBackground: '#fff',
    cardOutline: '#dae1e7',
    textPrimary: '#000',
    textSecondary: '#404756',
  },
  dark: {
    background: '#000',
    backgroundHighlight: '#193c47',
    cardBackground: '#222',
    cardOutline: '#444',
    textPrimary: '#fff',
    textSecondary: '#c0c1c4',
  },
};

type Theme = {
  colors: {
    background: string;
    backgroundHighlight: string;
    cardBackground: string;
    cardOutline: string;
    textPrimary: string;
    textSecondary: string;
  };
};

export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  return {
    colors: COLORS[colorScheme === 'dark' ? 'dark' : 'light'],
  };
}

type ThemedTextProps = TextProps & {
  color?: 'primary' | 'secondary';
};

export function ThemedText({ color, style, ...props }: ThemedTextProps) {
  const { colors } = useTheme();

  return (
    <Text
      style={[
        {
          color:
            color === 'secondary'
              ? colors.textSecondary
              : colors.textPrimary,
        },
        style,
      ]}
      {...props}
    />
  );
}
