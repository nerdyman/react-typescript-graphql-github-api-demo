import React from 'react';
import ReactDOM from 'react-dom';

import { SharedBox } from '../SharedBox';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SharedBox>Test</SharedBox>, div);
    ReactDOM.unmountComponentAtNode(div);
});
