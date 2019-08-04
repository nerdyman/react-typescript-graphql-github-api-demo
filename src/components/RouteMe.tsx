import React, { useState } from 'react';
import { useQuery } from 'urql';

import { Repository } from '../generated/graphql';
import { repositoryQueryOne } from '../graphql/respository';
import { viewerRepositoryQueryAll } from '../graphql/viewer';
import { SharedListing } from '../components/SharedListing';

export const RouteMe: React.FC = props => {
    // Set initial listing variables (initially paused)
    // @TODO Investigate possiblity of changing variables through
    //       `executeListingQuery` at runtime
    const [listingConfig, setListingConfig] = useState({
        pause: true,
        variables: { name: '', owner: '' },
    });

    const [listings /*, executeQuery*/] = useQuery({
        query: viewerRepositoryQueryAll,
    });

    const [listing /*, executeListingQuery*/] = useQuery({
        query: repositoryQueryOne,
        ...listingConfig,
    });

    const handleItemClick = ({
        name,
        owner,
    }: {
        name: string;
        owner: string;
    }) => {
        setListingConfig({ pause: false, variables: { name, owner } });
    };

    return (
        <section {...props}>
            {listing.fetching}
            {listings.fetching && <div>Loading</div>}
            {listings.error && <div>Failed to load</div>}
            {listings.data &&
                listings.data.viewer.repositories.edges.map(
                    ({ node }: { node: Repository }) => (
                        <SharedListing
                            onClick={() => {
                                handleItemClick({
                                    owner: node.owner.login,
                                    name: node.name,
                                });
                            }}
                            key={node.id}
                            title={node.name}
                            description={node.description}
                            owner={node.owner}
                            stargazers={node.stargazers.totalCount}
                            watchCount={node.watchers.totalCount}
                            tags={[
                                node.primaryLanguage &&
                                    node.primaryLanguage.name,
                            ]}
                            viewerHasStarred={node.viewerHasStarred}
                            viewerSubscription={node.viewerSubscription}
                            url={node.url}
                        />
                    ),
                )}
        </section>
    );
};
