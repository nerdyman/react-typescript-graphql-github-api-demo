import React from 'react';
import ReactDOM from 'react-dom';

import { SharedListingItem, SharedListingItemProps } from './SharedListingItem';

const mockProps: SharedListingItemProps = {
    id: '1234567',
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
    ReactDOM.render(<SharedListingItem {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
