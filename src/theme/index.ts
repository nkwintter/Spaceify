// src/theme/index.ts
import { lightColors, darkColors } from './colors';
import { lightGradients, darkGradients } from './gradients';
import { fonts } from './fonts';

export type ThemeType = 'light' | 'dark';

export interface Theme {
  colors: typeof lightColors;
  gradients: typeof lightGradients;
  fonts: typeof fonts;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  shadows: {
    sm: object;
    md: object;
    lg: object;
  };
}

const baseTheme = {
  fonts,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

export const lightTheme: Theme = {
  ...baseTheme,
  colors: lightColors,
  gradients: lightGradients,
};

export const darkTheme: Theme = {
  ...baseTheme,
  colors: darkColors,
  gradients: darkGradients,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
