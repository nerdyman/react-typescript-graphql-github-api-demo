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

import { SharedBox } from './SharedBox';
import { SharedButton } from './SharedButton';

export interface SharedListingProps {
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

interface SharedListingStarButtonProps {
    id: Starrable['id'];
    viewerHasStarred: Maybe<Starrable['viewerHasStarred']>;
}

const SharedListingStarButton: React.FC<SharedListingStarButtonProps> = ({
    id,
    viewerHasStarred,
    ...props
}) => {
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

export const SharedListing: React.FC<SharedListingProps> = ({
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
    <SharedBox mb="whole" p="half" {...props}>
        <h2>
            <a href={url} target="_blank" rel="noopener noreferrer">
                {title}
            </a>
        </h2>
        <p>{description}</p>
        <p>{owner ? owner.login : 'unknown'}</p>
        <p>{stargazers}</p>
        <p>{watchCount}</p>
        <ul>
            {tags && tags.map(tag => (tag ? <li key={tag}>{tag}</li> : null))}
        </ul>
        <p>{viewerHasStarred}</p>
        <p>{viewerSubscription}</p>
        <SharedListingStarButton id={id} viewerHasStarred={viewerHasStarred} />
    </SharedBox>
);
