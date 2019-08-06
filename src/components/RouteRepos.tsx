import React, { useState } from 'react';
import { useQuery } from 'urql';

import { Repository } from '../generated/graphql';
import { repositoryQueryOne } from '../graphql/respository';
import { viewerRepositoryQueryAll } from '../graphql/viewer';
// import { SharedButton } from '../components/SharedButton';
import { SharedListingDetail } from '../components/SharedListingDetail';
import { SharedListingItem } from '../components/SharedListingItem';
import { SharedModal, useSharedModal } from '../components/SharedModal';

export const RouteRepos: React.FC = props => {
    // Set initial listing variables (initially paused)
    // @TODO Investigate possiblity of changing variables through
    //       `executeListingQuery` at runtime
    const [listingConfig, setListingConfig] = useState({
        pause: true,
        variables: { name: '', owner: '' },
    });

    const modalProps = useSharedModal();

    const [listings] = useQuery({
        query: viewerRepositoryQueryAll,
    });

    const [listing] = useQuery({
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
            {listings.fetching && <div>Loading</div>}
            {listings.error && <div>Failed to load</div>}
            {listings.data &&
                listings.data.viewer.repositories.edges.map(
                    ({ node }: { node: Repository }) => (
                        <SharedListingItem
                            onClick={() => {
                                handleItemClick({
                                    name: node.name,
                                    owner: node.owner.login,
                                });
                                modalProps.toggle();
                            }}
                            id={node.id}
                            key={node.id}
                            title={node.nameWithOwner}
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
            <SharedModal {...modalProps}>
                {listing.fetching && 'Fetching'}
                {listing.error && 'Error'}
                {!listing.fetching && listing.data && (
                    <SharedListingDetail {...listing.data.repository} />
                )}
            </SharedModal>
        </section>
    );
};
