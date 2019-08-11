/* eslint react/no-unescaped-entities: 0 */

import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '../../ThemeProvider';
import { SharedItemGrid } from '../SharedItemGrid';

it('Should render without crashing', (): void => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ThemeProvider>
            <SharedItemGrid>
                <div>Test 1</div>}>
                <div>Test 2</div>}>
                <div>Test 3</div>}>
            </SharedItemGrid>
        </ThemeProvider>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
