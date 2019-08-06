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
        nameWithOwner
        url
        description
        primaryLanguage {
            color
            id
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
        isArchived
        isDisabled
        nameWithOwner
        updatedAt
        viewerCanAdminister
        forks {
            totalCount
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

export const repositoryMutationStar = gql`
    mutation repositoryStar($id: ID!) {
        addStar(input: { starrableId: $id }) {
            starrable {
                id
                viewerHasStarred
            }
        }
    }
`;

export const repositoryMutationUnstar = gql`
    mutation repositoryUnstar($id: ID!) {
        removeStar(input: { starrableId: $id }) {
            starrable {
                id
                viewerHasStarred
            }
        }
    }
`;
