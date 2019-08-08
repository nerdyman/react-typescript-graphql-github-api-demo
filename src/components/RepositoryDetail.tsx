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
    color: ${props => props.theme.colors.uiContentBodyContrast};
    text-align: center;
`;

const RepositoryDetailHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RepositoryDetailText = styled.p`
    max-width: 24rem;
    margin-bottom: ${props => props.theme.space.third};
    word-wrap: break-word;
`;

const RepositoryDetailTitle = styled(RepositoryDetailText.withComponent('h1'))`
    font-size: ${props => props.theme.fontSizes.large};
    color: ${props => props.theme.colors.uiBodyContrast};
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
    diskUsage,
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
                <RepositoryDetailText>{description}</RepositoryDetailText>
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
                <li>{diskUsage}</li>
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
