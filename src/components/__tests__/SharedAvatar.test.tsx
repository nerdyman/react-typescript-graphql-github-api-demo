/* eslint react/no-unescaped-entities: 0 */

import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '../../ThemeProvider';
import { SharedAvatar } from '../SharedAvatar';

it('Should render without crashing', (): void => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ThemeProvider>
            <SharedAvatar
                login="TestUser"
                url="https://www.example.com"
                avatarUrl="https://via.placeholder.com/400x400?text=Test!"
            />
        </ThemeProvider>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
