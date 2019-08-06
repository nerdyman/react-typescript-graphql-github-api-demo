import React from 'react';
import ReactDOM from 'react-dom';

import { routes } from '../config';
import { ThemeProvider } from '../ThemeProvider';

import { SharedAppHeader } from './SharedAppHeader';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ThemeProvider>
            <SharedAppHeader routes={routes} />
        </ThemeProvider>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
