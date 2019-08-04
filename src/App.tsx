import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Provider, createClient } from 'urql';

import { RouteMe } from './components/RouteMe';
import { Route404 } from './components/Route404';

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
        label: 'Me',
        link: '/',
    },
};

const App: React.FC = () => (
    <Provider value={client}>
        <Router>
            <header>
                <nav>
                    <Link to={routes.me.link}>{routes.me.label}</Link>
                </nav>
            </header>
            <Switch>
                <Route exact path={routes.me.link} component={RouteMe} />
                <Route component={Route404} />
            </Switch>
        </Router>
    </Provider>
);

// eslint-disable-next-line import/no-default-export
export default __ENV__.envIsHot ? hot(App) : App;
