import React from 'react';
import ReactDOM from 'react-dom';

import { SharedListing, SharedListingProps } from './SharedListing';

const mockProps: SharedListingProps = {
    title: 'Test title',
    owner: {
        id: '123456',
        avatarUrl: 'https://via.placeholder.com/240x240?text=Owner',
        login: 'Testaroo',
        url: 'https://github.com/nerdyman',
    },
    stargazers: 20,
    url: 'https://github.com/dotfiles',
    description: 'Test description',
    viewerSubscription: null,
    watchCount: 30,
    tags: ['one', 'two', 'three'],
    viewerHasStarred: true,
};

it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SharedListing {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
