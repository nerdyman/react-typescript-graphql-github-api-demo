import React from 'react';
import ReactDOM from 'react-dom';

import { SharedButton } from './SharedButton';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SharedButton>Test</SharedButton>, div);
    ReactDOM.unmountComponentAtNode(div);
});
