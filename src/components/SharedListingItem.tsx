import React from 'react';
import { useMutation } from 'urql';

import {
    Maybe,
    RepositoryOwnerFragment,
    StargazerConnection,
    Starrable,
    Subscribable,
    UserConnection,
    Scalars,
} from '../generated/graphql';
import {
    repositoryMutationStar,
    repositoryMutationUnstar,
} from '../graphql/respository';
import styled from '../utilities/styled';

import { SharedBox } from './SharedBox';
import { SharedButton } from './SharedButton';
import { SharedEmoji } from './SharedEmoji';

export interface SharedListingStarButtonProps {
    id: Starrable['id'];
    viewerHasStarred: Maybe<Starrable['viewerHasStarred']>;
}

/**
 * Toggle star/unstar
 */
export const SharedListingStarButton: React.FC<
    SharedListingStarButtonProps
> = ({ id, viewerHasStarred, ...props }) => {
    const [resStar, execStarMutation] = useMutation(repositoryMutationStar);
    const [resUnstar, execUnstarMutation] = useMutation(
        repositoryMutationUnstar,
    );

    const isFetching = resStar.fetching || resUnstar.fetching;
    const label = viewerHasStarred ? 'Unstar' : 'Star';

    const handleClick = () => {
        if (viewerHasStarred) {
            execUnstarMutation({ id });
        } else {
            execStarMutation({ id });
        }
    };

    return (
        <SharedButton {...props} disabled={isFetching} onClick={handleClick}>
            {label}
        </SharedButton>
    );
};

export interface SharedListingItemProps {
    children?: React.ReactNode;
    id: Starrable['id'];
    title: string;
    onClick?: (ev: React.SyntheticEvent) => void;
    description?: Maybe<Scalars['String']>;
    owner: RepositoryOwnerFragment;
    stargazers: Maybe<StargazerConnection['totalCount']>;
    watchCount: Maybe<UserConnection['totalCount']>;
    tags?: (string | null | undefined)[];
    viewerHasStarred: Maybe<Starrable['viewerHasStarred']>;
    viewerSubscription: Maybe<Subscribable['viewerSubscription']>;
    url: Scalars['URI'];
}

const SharedListingRoot = styled(SharedBox)<{ isClickable?: boolean }>`
    cursor: ${props => (props.isClickable ? 'pointer' : 'default')};
`;

export const SharedListingItem: React.FC<SharedListingItemProps> = ({
    children,
    id,
    title,
    description,
    owner,
    stargazers,
    watchCount,
    tags,
    viewerHasStarred,
    viewerSubscription,
    url,
    ...props
}) => (
    <SharedListingRoot
        isClickable={!!props.onClick}
        position="relative"
        mb="whole"
        p="half"
        {...props}
    >
        {children}
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{owner ? owner.login : 'unknown'}</p>
        <p>{stargazers}</p>
        <p>{watchCount}</p>
        <ul>
            {tags && tags.map(tag => (tag ? <li key={tag}>{tag}</li> : null))}
        </ul>
        <p>{viewerHasStarred}</p>
        <p>{viewerSubscription}</p>
        <SharedBox position="relative">
            <SharedListingStarButton
                id={id}
                viewerHasStarred={viewerHasStarred}
            />
            <a href={url} target="_blank" rel="noopener noreferrer">
                <SharedEmoji label="Link">🔗</SharedEmoji> Open on GitHub
            </a>
        </SharedBox>
    </SharedListingRoot>
);
