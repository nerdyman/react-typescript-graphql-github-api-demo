import React from 'react';
import { useQuery } from 'urql';

import { viewerQuery } from '../graphql/viewer';

export const RouteMe: React.FC = props => {
    const [res /*, executeQuery*/] = useQuery({
        query: viewerQuery,
    });

    return (
        <section {...props}>
            {res.fetching && <div>Loading</div>}
            {res.error && <div>Failed to load</div>}
        </section>
    );
};
