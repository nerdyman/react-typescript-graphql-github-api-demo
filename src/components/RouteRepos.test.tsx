import React from 'react';
import ReactDOM from 'react-dom';

import { RouteRepos } from './RouteRepos';

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RouteRepos />, div);
    ReactDOM.unmountComponentAtNode(div);
});
