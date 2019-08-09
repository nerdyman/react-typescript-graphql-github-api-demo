import React from 'react';

import styled from '../utilities/styled';
import {
    getPrettyDate,
    getPrimaryLanguageWithFallback,
} from '../utilities/data';
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
    margin-bottom: ${props => props.theme.space.whole};
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

const RepositoryDetailDefinitionListRoot = styled('dl')`
    display: flex;
    flex-flow: row wrap;
    margin-right: auto;
    margin-left: auto;
    max-width: 26rem;
`;

const RepositoryDetailDefinitionListDt = styled.dt`
    flex-basis: 40%;
    flex-shrink: 0;
    margin-right: ${props => props.theme.space.half};
    margin-bottom: ${props => props.theme.space.quarter};
    color: ${props => props.theme.colors.uiBodyContrast};
    text-align: right;
`;

const RepositoryDetailDefinitionListDd = styled.dd`
    flex-grow: 1;
    flex-basis: 50%;
    text-align: left;
`;

interface RepositoryDefinitionListNode {
    key: string;
    value: React.ReactElement | string | number;
}

const RepositoryDefinitionList: React.FC<{
    items: RepositoryDefinitionListNode[];
}> = ({ items, ...props }) => (
    <RepositoryDetailDefinitionListRoot {...props}>
        {items.map(({ key, value }) => (
            <React.Fragment key={key}>
                <RepositoryDetailDefinitionListDt>
                    {key}
                </RepositoryDetailDefinitionListDt>
                <RepositoryDetailDefinitionListDd>
                    {value}
                </RepositoryDetailDefinitionListDd>
            </React.Fragment>
        ))}
    </RepositoryDetailDefinitionListRoot>
);

const getRespositoryDetailDefinitionListData = (
    props: Omit<RepositoryDetailFragment, 'name' | 'url' | 'owner'>,
): RepositoryDefinitionListNode[] => {
    const primaryLanguageWithFallback = getPrimaryLanguageWithFallback(
        props.primaryLanguage,
    );

    return [
        {
            key: 'Stars',
            value: props.stargazers.totalCount,
        },
        {
            key: 'Watchers',
            value: props.watchers.totalCount,
        },
        {
            key: 'Disk usage',
            value: props.diskUsage || 0,
        },
        {
            key: 'Created',
            value: getPrettyDate(props.createdAt),
        },
        {
            key: 'Updated',
            value: getPrettyDate(props.updatedAt),
        },
        {
            key: 'Archived',
            value: String(props.isArchived),
        },
        {
            key: 'Can administer',
            value: String(props.viewerCanAdminister),
        },
        {
            key: 'Primary Language',
            value: (
                <span
                    style={{
                        borderBottom: `2px solid ${primaryLanguageWithFallback.color}`,
                    }}
                >
                    {primaryLanguageWithFallback.name}
                </span>
            ),
        },
    ];
};

/**
 * Detailed listing
 */
export const RepositoryDetail: React.FC<RepositoryDetailFragment> = ({
    name,
    url,
    description,
    // primaryLanguage,
    owner,
    // stargazers,
    // viewerHasStarred,
    // watchers,
    // viewerSubscription,
    // createdAt,
    // diskUsage,
    // isArchived,
    // isDisabled,
    // nameWithOwner,
    // updatedAt,
    // viewerCanAdminister,
    children,
    ...props
}): React.ReactElement => {
    const items = getRespositoryDetailDefinitionListData(props);

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
            <RepositoryDefinitionList items={items} />
            {children}
        </RepositoryDetailRoot>
    );
};
