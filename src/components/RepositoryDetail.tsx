import React from 'react';

import styled from '../utilities/styled';
import { getPrimaryLanguageWithFallback } from '../utilities/data';
import { RepositoryDetailFragment } from '../generated/graphql';

import { SharedAvatar } from './SharedAvatar';
import { SharedBox } from './SharedBox';
import { SharedEmojiLink } from './SharedEmoji';

const RepositoryDetailRoot = styled(SharedBox.withComponent('section'))`
    min-width: 100%;
    max-width: 30rem;
`;

const RepositoryDetailHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RepositoryDetailTitle = styled.h1`
    margin-bottom: ${props => props.theme.space.third};
    font-size: ${props => props.theme.fontSizes.large};
    word-wrap: break-word;
`;

const RepositoryDetailDescription = styled.p`
    margin-bottom: ${props => props.theme.space.third};
    color: ${props => props.theme.colors.uiContentBodyContrast};
    word-wrap: break-word;
`;

/**
 * Detailed listing
 */
export const RepositoryDetail: React.FC<RepositoryDetailFragment> = ({
    name,
    url,
    description,
    primaryLanguage,
    owner,
    stargazers,
    viewerHasStarred,
    watchers,
    // viewerSubscription,
    createdAt,
    // diskUsage,
    isArchived,
    isDisabled,
    // nameWithOwner,
    updatedAt,
    viewerCanAdminister,
    children,
    ...props
}): React.ReactElement => {
    const primaryLanguageWithFallback = getPrimaryLanguageWithFallback(
        primaryLanguage,
    );

    return (
        <RepositoryDetailRoot {...props}>
            <RepositoryDetailHeader>
                <SharedAvatar
                    avatarUrl={owner.avatarUrl}
                    login={owner.login}
                    url={owner.url}
                    mb="whole"
                />
                <RepositoryDetailTitle>{name}</RepositoryDetailTitle>
                <RepositoryDetailDescription>
                    {description}
                </RepositoryDetailDescription>
                <a href={url} rel="noopener noreferrer">
                    <SharedEmojiLink /> View on GitHub
                </a>
            </RepositoryDetailHeader>
            <ul>
                <li>
                    {stargazers.totalCount}
                    {viewerHasStarred}
                </li>
                <li>{watchers.totalCount}</li>
                <li>{createdAt}</li>
                <li>{updatedAt}</li>
                <li>{String(isArchived)}</li>
                {viewerCanAdminister && <li>Administator</li>}
                <li>
                    <span
                        style={{
                            border: `2px solid ${primaryLanguageWithFallback.color}`,
                        }}
                    >
                        {primaryLanguageWithFallback.name}
                    </span>
                </li>
                <li>{String(isDisabled)}</li>
            </ul>
            {children}
        </RepositoryDetailRoot>
    );
};
