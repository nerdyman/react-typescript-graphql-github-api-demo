import React from 'react';
import { useMutation } from 'urql';

import {
    Maybe,
    RepositoryOwnerFragment,
    Language,
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
import { getPrimaryLanguageWithFallback } from '../utilities/data';

import { SharedBar } from './SharedBar';
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
    const emoji = viewerHasStarred ? '💫' : '⭐';

    const handleClick = () => {
        if (viewerHasStarred) {
            execUnstarMutation({ id });
        } else {
            execStarMutation({ id });
        }
    };

    return (
        <SharedButton
            {...props}
            icon={<SharedEmoji label={label}>{emoji}</SharedEmoji>}
            disabled={isFetching}
            onClick={handleClick}
        >
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
    primaryLanguage?: Language;
    tags?: (string | null | undefined)[];
    viewerHasStarred: Maybe<Starrable['viewerHasStarred']>;
    viewerSubscription: Maybe<Subscribable['viewerSubscription']>;
    url: Scalars['URI'];
}

const SharedListingItemRoot = styled.section<{
    isClickable?: boolean;
    itemColor: string;
}>`
    position: relative;
    margin-bottom: ${props => props.theme.space.whole};
    padding: ${props => props.theme.space.whole};
    border-top: ${props =>
        `${props.theme.borders.borderWidths[2]} solid ${props.itemColor}`};
    background-color: ${props => props.theme.colors.uiContentBodyBase};
    color: ${props => props.theme.colors.uiContentBodyContrast};
    cursor: ${props => (props.isClickable ? 'pointer' : 'default')};
    box-shadow: ${props => props.theme.shadows.base};
`;

const SharedListingItemBackDrop = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

const SharedListingItemInteractive: React.FC = props => (
    <SharedBox position="relative" display="inline-flex" {...props} />
);

export const SharedListingItem: React.FC<SharedListingItemProps> = ({
    children,
    id,
    title,
    description,
    stargazers,
    watchCount,
    viewerHasStarred,
    primaryLanguage,
    // viewerSubscription,
    url,
    onClick,
    ...props
}) => {
    const safePrimaryLanguage = getPrimaryLanguageWithFallback(primaryLanguage);

    return (
        <SharedListingItemRoot itemColor={safePrimaryLanguage.color} {...props}>
            {onClick && <SharedListingItemBackDrop onClick={onClick} />}
            {children}
            <h2>{title}</h2>
            <p>{description}</p>
            <SharedBar
                fontSize="small"
                items={[`Stars: ${stargazers}`, `Watchers: ${watchCount}`]}
            />
            <SharedListingItemInteractive>
                <SharedListingStarButton
                    id={id}
                    viewerHasStarred={viewerHasStarred}
                />
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <SharedEmoji label="Link">🔗</SharedEmoji> View on GitHub
                </a>
            </SharedListingItemInteractive>
        </SharedListingItemRoot>
    );
};
