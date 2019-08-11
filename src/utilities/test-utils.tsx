import React from 'react';
import { render } from '@testing-library/react';

import { ThemeProvider } from '../ThemeProvider';

const RootProviders: React.FC = ({ children }) => (
    <ThemeProvider>{children}</ThemeProvider>
);

const customRender = (ui: any, options: any) =>
    render(ui, { wrapper: RootProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
