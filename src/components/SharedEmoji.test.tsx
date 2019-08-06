import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '../ThemeProvider';

import * as SharedEmoji from './SharedEmoji';

it('should render default without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ThemeProvider>
            <SharedEmoji.SharedEmoji label="Star">⭐</SharedEmoji.SharedEmoji>
        </ThemeProvider>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
