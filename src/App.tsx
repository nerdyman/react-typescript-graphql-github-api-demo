import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { createClient, Provider } from 'urql';

import { globalCss } from './styles/global';
import { theme } from './styles/theme';
import { RouteMe } from './components/RouteMe';
import { Route404 } from './components/Route404';
import { SharedErrorBoundary } from './components/SharedErrorBoundary';
import { SharedEmoji } from './components/SharedEmoji';

const client = createClient({
    url: __ENV__.apiEndpoint,
    fetchOptions: () => ({
        headers: {
            authorization: `Bearer ${__ENV__.apiAuthToken}`,
        },
    }),
});

const routes = {
    me: {
        label: (
            <>
                <SharedEmoji label="Box">📦</SharedEmoji> Repos
            </>
        ),
        link: '/',
    },
    starred: {
        label: (
            <>
                <SharedEmoji label="Star">🌟</SharedEmoji> Stars
            </>
        ),
        link: '/Stars',
    },
};

const App: React.FC = () => (
    <SharedErrorBoundary>
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
                        <Route
                            exact
                            path={routes.me.link}
                            component={RouteMe}
                        />
                        <Route component={Route404} />
                    </Switch>
                </Router>
            </Provider>
        </ThemeProvider>
    </SharedErrorBoundary>
);

// eslint-disable-next-line import/no-default-export
export default __ENV__.envIsHot ? hot(App) : App;
