import React, { useState } from 'react';
import { useQuery } from 'urql';

import { RepositoryPreviewFragment } from '../generated/graphql';
import { repositoryQueryOne } from '../graphql/respository';
import { viewerRepositoryStarredQueryAll } from '../graphql/viewer';
import { RepositoryDetail } from '../components/RepositoryDetail';
import { RepositoryItem } from '../components/RepositoryItem';
import { SharedItemGrid } from '../components/SharedItemGrid';
import { SharedLayoutTitle } from '../components/SharedLayout';
import {
    SharedModal,
    SharedModalFiller,
    useSharedModal,
} from '../components/SharedModal';
import { SharedWrapper } from '../components/SharedWrapper';

const RouteReposModal: React.FC<any> = ({
    modalProps,
    listingConfig,
}): React.ReactElement => {
    const [listing] = useQuery({
        query: repositoryQueryOne,
        ...listingConfig,
    });

    return (
        <SharedModal {...modalProps}>
            {listing.fetching && (
                <SharedModalFiller>Loading&hellip;</SharedModalFiller>
            )}
            {listing.error && (
                <SharedModalFiller>Unable to load content</SharedModalFiller>
            )}
            {!listing.fetching && listing.data && (
                <RepositoryDetail {...listing.data.repository} />
            )}
        </SharedModal>
    );
};

const RouteReposTitleAfter: React.FC<{
    error?: any;
    fetching?: boolean;
}> = ({ error, fetching }): React.ReactElement => (
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

    const [listingsVariables, setListingsVariables] = useState({
        cursor: null,
        first: 6,
    });

    const modalProps = useSharedModal();

    const [listings] = useQuery({
        query: viewerRepositoryStarredQueryAll,
        variables: listingsVariables,
    });

    const handleFetchMore = (): void => {
        if (!listings.fetching && listings.data) {
            setListingsVariables(prevState => ({
                ...prevState,
                cursor:
                    listings.data.viewer.starredRepositories.pageInfo.endCursor,
            }));
        }
    };

    const handleItemClick = ({
        name,
        owner,
    }: {
        name: string;
        owner: string;
    }): void => {
        setListingConfig({ pause: false, variables: { name, owner } });
    };

    const canFetchMore =
        !listings.fetching &&
        !!listings.data &&
        listings.data.viewer.starredRepositories.pageInfo.hasNextPage;

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
                My Starred Repositories
            </SharedLayoutTitle>
            <SharedItemGrid>
                {listings.data &&
                    listings.data.viewer.starredRepositories.edges.map(
                        ({
                            node,
                        }: {
                            node: RepositoryPreviewFragment;
                        }): React.ReactElement => (
                            <RepositoryItem
                                key={node.id}
                                onClick={(): void => {
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
            <button disabled={!canFetchMore} onClick={handleFetchMore}>
                Load more
            </button>
        </SharedWrapper>
    );
};
