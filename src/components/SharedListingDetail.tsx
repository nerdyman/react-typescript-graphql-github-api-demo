import React from 'react';

import styled from '../utilities/styled';
import { RepositoryDetailFragment } from '../generated/graphql';

import { SharedBox } from './SharedBox';

const SharedListingRoot = styled(SharedBox.withComponent('section'))``;

/**
 * Detailed listing
 */
export const SharedListingDetail: React.FC<RepositoryDetailFragment> = ({
    // id,
    // name,
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
    nameWithOwner,
    updatedAt,
    viewerCanAdminister,
    children,
    ...props
}) => {
    const primaryLanguageWithFallback = {
        name:
            primaryLanguage && primaryLanguage.name
                ? primaryLanguage.name
                : 'unknown',
        color:
            primaryLanguage && primaryLanguage.color
                ? primaryLanguage && primaryLanguage.color
                : '#333',
    };

    return (
        <SharedListingRoot {...props}>
            <header>
                <h1>{nameWithOwner}</h1>
                <a href={url} rel="noopener noreferrer">
                    Link
                </a>
                <a href={owner.url}>
                    {owner.login}
                    <img src={owner.avatarUrl} alt={owner.login} />
                </a>
            </header>
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
            <p>{description}</p>
            {children}
        </SharedListingRoot>
    );
};
