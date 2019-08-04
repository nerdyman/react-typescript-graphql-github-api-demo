import React from 'react';
import ReactDOM from 'react-dom';

import { SharedDialog } from './SharedDialog';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SharedDialog>Test</SharedDialog>, div);
    ReactDOM.unmountComponentAtNode(div);
});
