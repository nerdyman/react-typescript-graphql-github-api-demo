import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import {
    cacheExchange,
    createClient,
    debugExchange,
    fetchExchange,
    Provider,
    subscriptionExchange,
} from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { globalCss } from './styles/global';
import { theme } from './styles/theme';
import { RouteMe } from './components/RouteMe';
import { Route404 } from './components/Route404';

const subscriptionClient = new SubscriptionClient(__ENV__.apiWsEndpoint, {});

const client = createClient({
    url: __ENV__.apiEndpoint,
    exchanges: [
        debugExchange,
        cacheExchange,
        fetchExchange,
        subscriptionExchange({
            forwardSubscription: operation =>
                subscriptionClient.request(operation),
        }),
    ],
    fetchOptions: () => ({
        headers: {
            authorization: `Bearer ${__ENV__.apiAuthToken}`,
        },
    }),
});

const routes = {
    me: {
        label: 'Me',
        link: '/',
    },
    starred: {
        label: 'Starred',
        link: '/starred',
    },
};

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <Global styles={globalCss(theme)} />
        <Provider value={client}>
            <Router>
                <header>
                    <nav>
                        <Link to={routes.me.link}>{routes.me.label}</Link>
                        <Link to={routes.starred.link}>
                            {routes.starred.label}
                        </Link>
                    </nav>
                </header>
                <Switch>
                    <Route exact path={routes.me.link} component={RouteMe} />
                    <Route component={Route404} />
                </Switch>
            </Router>
        </Provider>
    </ThemeProvider>
);

// eslint-disable-next-line import/no-default-export
export default __ENV__.envIsHot ? hot(App) : App;
