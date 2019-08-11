import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '../../ThemeProvider';
import { Route404 } from '../Route404';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ThemeProvider>
            <Route404 />
        </ThemeProvider>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
