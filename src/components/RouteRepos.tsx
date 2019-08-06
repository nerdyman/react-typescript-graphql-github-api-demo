import React, { useState } from 'react';
import { useQuery } from 'urql';

import { Repository } from '../generated/graphql';
import { repositoryQueryOne } from '../graphql/respository';
import { viewerRepositoryQueryAll } from '../graphql/viewer';
// import { SharedButton } from '../components/SharedButton';
import { SharedListingDetail } from '../components/SharedListingDetail';
import { SharedListingItem } from '../components/SharedListingItem';
import { SharedModal, useSharedModal } from '../components/SharedModal';
import { SharedWrapper } from '../components/SharedWrapper';

const RouteReposModal: React.FC<any> = ({ modalProps, listingConfig }) => {
    const [listing] = useQuery({
        query: repositoryQueryOne,
        ...listingConfig,
    });

    return (
        <SharedModal {...modalProps}>
            {listing.fetching && 'Fetching'}
            {listing.error && 'Error'}
            {!listing.fetching && listing.data && (
                <SharedListingDetail {...listing.data.repository} />
            )}
        </SharedModal>
    );
};

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
        <SharedWrapper {...props}>
            <h1>My Repositories</h1>
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
                            primaryLanguage={node.primaryLanguage || undefined}
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
            <RouteReposModal
                modalProps={modalProps}
                listingConfig={listingConfig}
            />
        </SharedWrapper>
    );
};
