import { hot } from 'react-hot-loader/root';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { Global } from '@emotion/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createClient, Provider } from 'urql';

import { globalCss } from './styles/global';
import { theme } from './styles/theme';
import { NetworkStatusProvider } from './store/network-status';
import { RouteRepos } from './components/RouteRepos';
import { Route404 } from './components/Route404';
import { SharedAppFooter } from './components/SharedAppFooter';
import { SharedAppHeader } from './components/SharedAppHeader';
import { SharedBox } from './components/SharedBox';
import { SharedErrorBoundary } from './components/SharedErrorBoundary';
import { SharedLayout } from './components/SharedLayout';
import { ThemeProvider } from './ThemeProvider';
import { config, routes } from './config';

if (__ENV__.envIsProduction) {
    OfflinePluginRuntime.install();
}

const client = createClient({
    url: __ENV__.apiEndpoint,
   fetchOptions: () => ({
       headers: {
           authorization: `Bearer ${__ENV__.apiAuthToken}`,
       },
   }),
});

const App: React.FC = () => (
    <SharedErrorBoundary>
        <ThemeProvider theme={theme}>
            <Global styles={globalCss(theme)} />
            <NetworkStatusProvider>
                <Provider value={client}>
                    <Router>
                        <SharedLayout
                            header={<SharedAppHeader routes={routes} />}
                            footer={
                                <SharedAppFooter>
                                    {config.repo.name}
                                </SharedAppFooter>
                            }
                        >
                            <SharedBox py="whole">
                                <Switch>
                                    <Route
                                        exact
                                        path={routes.repos.link}
                                        component={RouteRepos}
                                    />
                                    <Route component={Route404} />
                                </Switch>
                            </SharedBox>
                        </SharedLayout>
                    </Router>
                </Provider>
            </NetworkStatusProvider>
        </ThemeProvider>
    </SharedErrorBoundary>
);

// eslint-disable-next-line import/no-default-export
export default __ENV__.envIsHot ? hot(App) : App;
