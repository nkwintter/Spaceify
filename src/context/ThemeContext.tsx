import React, { createContext, useContext, useEffect, useState } from 'react';
import { lightColors, darkColors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { lightGradients, darkGradients } from '../theme/gradients';

// FORMA DO CONTEXTO, TOGGLETHEME MUDA O TEMA
interface ThemeContextType {
  theme: any;
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

const theme = {
  colors: isDarkTheme ? darkColors : lightColors,
  fonts,
  gradients: isDarkTheme ? darkGradients : lightGradients,
};


  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
