/* eslint react/no-unescaped-entities: 0 */

import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '../ThemeProvider';

import { SharedLayout } from './SharedLayout';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ThemeProvider>
            <SharedLayout
                header={<header>Header</header>}
                footer={<footer></footer>}
            >
                <div>Test child</div>}>
            </SharedLayout>
        </ThemeProvider>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
