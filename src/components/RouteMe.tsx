import React from 'react';
import { useQuery } from 'urql';

import { Repository } from '../generated/graphql';
import { viewerQuery } from '../graphql/viewer';
import { SharedListing } from '../components/SharedListing';

export const RouteMe: React.FC = props => {
    const [res /*, executeQuery*/] = useQuery({
        query: viewerQuery,
    });

    return (
        <section {...props}>
            {res.fetching && <div>Loading</div>}
            {res.error && <div>Failed to load</div>}
            {res.data &&
                res.data.viewer.repositories.edges.map(
                    ({ node }: { node: Repository }) => (
                        <SharedListing
                            key={node.id}
                            title={node.name}
                            description={node.description}
                            owner={node.owner}
                            stargazers={node.stargazers.totalCount}
                            watchCount={node.watchers.totalCount}
                            tags={[
                                node.primaryLanguage &&
                                    node.primaryLanguage.name,
                            ].filter(Boolean)}
                            viewerHasStarred={node.viewerHasStarred}
                            viewerSubscription={node.viewerSubscription}
                            url={node.url}
                        />
                    ),
                )}
        </section>
    );
};
