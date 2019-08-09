import { keyframes } from '@emotion/core';
import React from 'react';

import { RepositoryPreviewFragment } from '../generated/graphql';
import styled from '../utilities/styled';
import { getPrimaryLanguageWithFallback } from '../utilities/data';

import {
    RepositoryButtonToggleStar,
    RepositoryButtonToggleSubscibe,
} from './RepositoryButtonToggle';
import { SharedAvatar } from './SharedAvatar';
import { SharedBox, SharedBoxProps } from './SharedBox';

const repositoryItemRootKeyIn = keyframes`
    from {
        transform: translateY(-.25rem);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

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
    animation: ${repositoryItemRootKeyIn} 1s ease 1;

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
    margin-bottom: ${props => props.theme.space.half};
    color: ${props => props.theme.colors.uiBodyContrast};
`;

const RepositoryItemDescription = styled.p`
    max-width: 16rem;
    font-size: ${props => props.theme.fontSizes.small};
    margin-bottom: ${props => props.theme.space.half};
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
    viewerCanSubscribe,
    viewerSubscription,
    watchers,
    // url,
    onClick,
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
        >
            {onClick && <RepositoryItemBackdrop onClick={onClick} />}
            <SharedBox
                position="relative"
                display="flex"
                justifyContent="flex-end"
                marginLeft="auto"
                marginBottom="quarter"
            >
                <RepositoryButtonToggleStar
                    disabled={true}
                    title="Disabled to prevent you from losing your stars"
                    id={id}
                    viewerHasStarred={viewerHasStarred}
                >
                    {stargazers.totalCount}
                </RepositoryButtonToggleStar>
                <RepositoryButtonToggleSubscibe
                    id={id}
                    viewerCanSubscribe={viewerCanSubscribe}
                    viewerSubscription={viewerSubscription}
                >
                    {watchers.totalCount}
                </RepositoryButtonToggleSubscibe>
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
            {children && (
                <RepositoryItemInteractive
                    marginTop="auto"
                    paddingTop="whole"
                    alignItems="flex-end"
                >
                    {children}
                </RepositoryItemInteractive>
            )}
        </RepositoryItemRoot>
    );
};
