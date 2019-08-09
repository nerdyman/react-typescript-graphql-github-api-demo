import React, { useState } from 'react';
import { useQuery } from 'urql';

import { RepositoryPreviewFragment } from '../generated/graphql';
import { repositoryQueryOne } from '../graphql/respository';
import { viewerRepositoryStarredQueryAll } from '../graphql/viewer';

import { SharedBox } from './SharedBox';
// import { SharedButton } from './SharedButton';
import { RepositoryDetail } from './RepositoryDetail';
import { RepositoryItem } from './RepositoryItem';
import { SharedItemGrid } from './SharedItemGrid';
import { SharedLayoutTitle } from './SharedLayout';
import { SharedModal, SharedModalFiller, useSharedModal } from './SharedModal';
import { SharedWrapper } from './SharedWrapper';

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
                <SharedModalFiller>
                    Errors ocurred when loading content
                </SharedModalFiller>
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
}> = ({ error, fetching, ...props }): React.ReactElement => (
    <span role="status" {...props}>
        {fetching ? 'Fetching' : error ? 'Error!' : 'OK'}
    </span>
);

export const RouteRepos: React.FC = (): React.ReactElement => {
    // Set initial listing variables (initially paused)
    // @TODO Investigate possiblity of changing variables through
    //       `executeListingQuery` at runtime
    const [listingConfig, setListingConfig] = useState({
        pause: true,
        variables: { name: '', owner: '' },
    });

    const [listingsVariables /*, setListingsVariables*/] = useState({
        cursor: null,
        first: 6,
    });

    const modalProps = useSharedModal();

    const [listings] = useQuery({
        query: viewerRepositoryStarredQueryAll,
        variables: listingsVariables,
    });

    // const handleFetchMore = (): void => {
    //     if (!listings.fetching && listings.data) {
    //         setListingsVariables(prevState => ({
    //             ...prevState,
    //             cursor:
    //                 listings.data.viewer.starredRepositories.pageInfo.endCursor,
    //         }));
    //     }
    // };

    const handleItemClick = ({
        name,
        owner,
    }: {
        name: string;
        owner: string;
    }): void => {
        setListingConfig({ pause: false, variables: { name, owner } });
        modalProps.toggle();
    };

    // const canFetchMore =
    //     !listings.fetching &&
    //     !!listings.data &&
    //     listings.data.viewer.starredRepositories.pageInfo.hasNextPage;

    const hasListings =
        !listings.fetching &&
        listings.data &&
        listings.data.viewer.starredRepositories.edges.length > 0;

    return (
        <SharedWrapper>
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
            {!hasListings && (
                <SharedBox display="flex" justifyContent="center" py="double">
                    No repositories found.
                </SharedBox>
            )}
            <SharedItemGrid>
                {hasListings &&
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
            {/* <SharedBox display="flex" justifyContent="center" mt="double">
                <SharedButton
                    disabled={!canFetchMore}
                    onClick={handleFetchMore}
                >
                    Load more
                </SharedButton>
            </SharedBox> */}
        </SharedWrapper>
    );
};
