import React from 'react';
import ReactDOM from 'react-dom';

import { SubscriptionState } from '../../generated/graphql';
import { ThemeProvider } from '../../ThemeProvider';
import { RepositoryItem, RepositoryItemProps } from '../RepositoryItem';

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
    watchers: {
        totalCount: 200,
    },
    viewerCanSubscribe: true,
    viewerSubscription: SubscriptionState.Subscribed,
    viewerHasStarred: true,
    url: 'https://github.com/dotfiles',
};

it('should render without crashing', (): void => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ThemeProvider>
            <RepositoryItem {...mockProps} />
        </ThemeProvider>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
