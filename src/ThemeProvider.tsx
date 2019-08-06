import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';

import { theme as initialTheme, Theme } from './styles/theme';

export const ThemeProvider: React.FC<{ theme?: Theme }> = ({
    theme = initialTheme,
    ...props
}) => <EmotionThemeProvider theme={theme} {...props} />;
