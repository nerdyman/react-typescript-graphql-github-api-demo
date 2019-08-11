import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '../../ThemeProvider';
import { SharedButton } from '../SharedButton';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ThemeProvider>
            <SharedButton>Test</SharedButton>
        </ThemeProvider>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
