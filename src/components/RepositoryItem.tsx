import React from 'react';

import { RepositoryPreviewFragment } from '../generated/graphql';
import styled from '../utilities/styled';
import { getPrimaryLanguageWithFallback } from '../utilities/data';

import { RepositoryButtonStar } from './RepositoryButtonStar';
import { SharedAvatar } from './SharedAvatar';
import { SharedBox, SharedBoxProps } from './SharedBox';
import { SharedEmoji } from './SharedEmoji';

const RepositoryItemRoot = styled.section`
    ${props => props.theme.transition.call('box-shadow, transform')}
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${props => props.theme.space.wholeQuarter};
    border-top: ${props =>
        `${props.theme.borders.borderWidths[2]} solid var(--item-color)`};
    background-color: ${props => props.theme.colors.uiContentBodyBase};
    color: ${props => props.theme.colors.uiContentBodyContrast};
    text-align: center;
    border-radius: ${props => props.theme.radii[1]};
    box-shadow: ${props => props.theme.shadows.base};

    &:hover,
    &:focus {
        transform: scale(1.02);
        box-shadow: ${props => props.theme.shadows.active};

        .__title {
            color: ${props => props.theme.colors.brandPrimaryBase};
        }
    }
`;

const RepositoryItemBackdrop = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

const RepositoryItemAvatar = styled(SharedAvatar)`
    margin-bottom: ${props => props.theme.space.whole};
`;

const RepositoryItemTitle = styled.h2`
    ${props => props.theme.transition.call('color')}
    max-width: 16rem;
    font-size: ${props => props.theme.fontSizes.medium};
    margin-bottom: ${props => props.theme.space.threeQuarter};
    color: var(--title-color);
`;

const RepositoryItemDescription = styled.p`
    max-width: 16rem;
    font-size: ${props => props.theme.fontSizes.small};
    margin-bottom: ${props => props.theme.space.whole};
`;

const RepositoryItemInteractive: React.FC<SharedBoxProps> = props => (
    <SharedBox position="relative" display="inline-flex" {...props} />
);

export interface RepositoryItemProps extends RepositoryPreviewFragment {
    onClick?: () => void;
}

export const RepositoryItem: React.FC<RepositoryItemProps> = ({
    children,
    id,
    name,
    description,
    owner,
    stargazers,
    viewerHasStarred,
    primaryLanguage,
    // viewerSubscription,
    url,
    onClick,
    ...props
}): React.ReactElement => {
    const safePrimaryLanguage = getPrimaryLanguageWithFallback(primaryLanguage);

    return (
        <RepositoryItemRoot
            style={
                {
                    // Using CSS variable to reduce unique class name generation
                    '--item-color': safePrimaryLanguage.color,
                } as React.CSSProperties
            }
            {...props}
        >
            {onClick && <RepositoryItemBackdrop onClick={onClick} />}
            <SharedBox
                position="relative"
                display="flex"
                justifyContent="flex-end"
                width="100%"
            >
                <RepositoryButtonStar
                    id={id}
                    viewerHasStarred={viewerHasStarred}
                >
                    {stargazers.totalCount}
                </RepositoryButtonStar>
            </SharedBox>
            <RepositoryItemAvatar {...owner} />
            {/*
                @HACK can't use component selects with typescript until fix is merged
                @see https://github.com/emotion-js/emotion/pull/1220
            */}
            <RepositoryItemTitle className="__title">
                {name}
            </RepositoryItemTitle>
            {description && (
                <RepositoryItemDescription>
                    {description}
                </RepositoryItemDescription>
            )}
            <RepositoryItemInteractive flexGrow={1} alignItems="flex-end">
                {children}
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <SharedEmoji label="Link">🔗</SharedEmoji> View on GitHub
                </a>
            </RepositoryItemInteractive>
        </RepositoryItemRoot>
    );
};
