import React, { useState } from 'react';
import { useQuery } from 'urql';

import { RepositoryPreviewFragment } from '../generated/graphql';
import { repositoryQueryOne } from '../graphql/respository';
import { viewerRepositoryQueryAll } from '../graphql/viewer';
import { RepositoryDetail } from '../components/RepositoryDetail';
import { RepositoryItem } from '../components/RepositoryItem';
import { SharedItemGrid } from '../components/SharedItemGrid';
import { SharedLayoutTitle } from '../components/SharedLayout';
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
                <RepositoryDetail {...listing.data.repository} />
            )}
        </SharedModal>
    );
};

const RouteReposTitleAfter: React.FC<{
    error?: boolean;
    fetching?: boolean;
}> = ({ error, fetching }) => (
    <>{fetching ? 'Fetching' : error ? 'Error!' : 'OK'}</>
);

export const RouteRepos: React.FC = (props): React.ReactElement => {
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
        variables: { first: 15 },
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
            <SharedLayoutTitle
                after={
                    <RouteReposTitleAfter
                        fetching={listings.fetching}
                        error={listings.error}
                    />
                }
            >
                My Repositories
            </SharedLayoutTitle>
            <SharedItemGrid>
                {listings.data &&
                    listings.data.viewer.repositories.edges.map(
                        ({ node }: { node: RepositoryPreviewFragment }) => (
                            <RepositoryItem
                                key={node.id}
                                onClick={() => {
                                    handleItemClick({
                                        name: node.name,
                                        owner: node.owner.login,
                                    });
                                    modalProps.toggle();
                                }}
                                {...node}
                            />
                        ),
                    )}
                <RouteReposModal
                    modalProps={modalProps}
                    listingConfig={listingConfig}
                />
            </SharedItemGrid>
        </SharedWrapper>
    );
};
