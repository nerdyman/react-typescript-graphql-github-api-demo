import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import { routes } from '../../config';
import { ThemeProvider } from '../../ThemeProvider';
import { SharedAppHeader } from '../SharedAppHeader';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ThemeProvider>
            <MemoryRouter>
                <SharedAppHeader routes={routes} />
            </MemoryRouter>
        </ThemeProvider>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
