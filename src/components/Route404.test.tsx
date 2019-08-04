import React from 'react';
import ReactDOM from 'react-dom';

import { Route404 } from './Route404';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Route404 />, div);
    ReactDOM.unmountComponentAtNode(div);
});
