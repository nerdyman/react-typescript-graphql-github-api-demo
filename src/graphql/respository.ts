import gql from 'graphql-tag';

export const repositoryOwnerFragment = gql`
    fragment repositoryOwner on RepositoryOwner {
        id
        avatarUrl
        login
        url
    }
`;

export const repositoryPreviewFragment = gql`
    fragment repositoryPreview on Repository {
        id
        name
        url
        description
        primaryLanguage {
            name
        }
        owner {
            ...repositoryOwner
        }
        stargazers {
            totalCount
        }
        viewerHasStarred
        watchers {
            totalCount
        }
        viewerSubscription
    }

    ${repositoryOwnerFragment}
`;

export const repositoryDetailFragment = gql`
    fragment repositoryDetail on Repository {
        ...repositoryPreview
        createdAt
        diskUsage
        viewerCanAdminister
        forks {
            totalCount
        }
        collaborators {
            edges {
                node {
                    id
                    avatarUrl
                    login
                    url
                }
            }
        }
    }

    ${repositoryPreviewFragment}
`;

export const repositoryQueryOne = gql`
    query repositoryOne($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
            ...repositoryDetail
        }
    }
    ${repositoryDetailFragment}
`;
