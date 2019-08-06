import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createClient, Provider } from 'urql';

import { globalCss } from './styles/global';
import { theme } from './styles/theme';
import { RouteRepos } from './components/RouteRepos';
import { Route404 } from './components/Route404';
import { SharedBannerHeader } from './components/SharedBannerHeader';
import { SharedEmoji } from './components/SharedEmoji';
import { SharedErrorBoundary } from './components/SharedErrorBoundary';

const client = createClient({
    url: __ENV__.apiEndpoint,
    fetchOptions: () => ({
        headers: {
            authorization: `Bearer ${__ENV__.apiAuthToken}`,
        },
    }),
});

export const routes = {
    me: {
        label: (
            <>
                <SharedEmoji label="Box">📦</SharedEmoji> Repos
            </>
        ),
        link: '/',
    },
    // starred: {
    //     label: (
    //         <>
    //             <SharedEmoji label="Star">🌟</SharedEmoji> Stars
    //         </>
    //     ),
    //     link: '/Stars',
    // },
};

export type Routes = typeof routes;

const App: React.FC = () => (
    <SharedErrorBoundary>
        <ThemeProvider theme={theme}>
            <Global styles={globalCss(theme)} />
            <Provider value={client}>
                <Router>
                    <SharedBannerHeader routes={routes} />
                    <Switch>
                        <Route
                            exact
                            path={routes.me.link}
                            component={RouteRepos}
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
