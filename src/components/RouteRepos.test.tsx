import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '../ThemeProvider';

import { RouteRepos } from './RouteRepos';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ThemeProvider>
            <RouteRepos />
        </ThemeProvider>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
