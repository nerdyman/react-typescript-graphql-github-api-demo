import React from 'react';
import ReactDOM from 'react-dom';

import { RepositoryItem, RepositoryItemProps } from './RepositoryItem';

const mockProps: RepositoryItemProps = {
    id: '1234567',
    name: 'Test title',
    description: 'Test description',
    owner: {
        id: '123456',
        avatarUrl: 'https://via.placeholder.com/240x240?text=Owner',
        login: 'Testaroo',
        url: 'https://github.com/nerdyman',
    },
    primaryLanguage: {
        color: 'red',
        id: '1234567',
        name: 'JavaScript',
    },
    stargazers: {
        totalCount: 20,
    },
    viewerHasStarred: true,
    url: 'https://github.com/dotfiles',
};

it('should render without crashing', (): void => {
    const div = document.createElement('div');
    ReactDOM.render(<RepositoryItem {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
