import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '../ThemeProvider';

import { SharedAppFooter } from './SharedAppFooter';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ThemeProvider>
            <SharedAppFooter>Test</SharedAppFooter>
        </ThemeProvider>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
