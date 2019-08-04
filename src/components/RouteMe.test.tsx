import React from 'react';
import ReactDOM from 'react-dom';

import { RouteMe } from './RouteMe';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RouteMe />, div);
    ReactDOM.unmountComponentAtNode(div);
});
