import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '../ThemeProvider';

import { SharedWrapper } from './SharedWrapper';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ThemeProvider>
            <SharedWrapper>Wrapped!</SharedWrapper>
        </ThemeProvider>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
