import React from 'react';

import {
    Maybe,
    RepositoryOwnerFragment,
    StargazerConnection,
    Starrable,
    Subscribable,
    UserConnection,
    Scalars,
} from '../generated/graphql';

import { SharedBox } from './SharedBox';
import { SharedButton } from './SharedButton';

export interface SharedListingProps {
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

export const SharedListing: React.FC<SharedListingProps> = ({
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
        <SharedButton>Hello</SharedButton>
    </SharedBox>
);
