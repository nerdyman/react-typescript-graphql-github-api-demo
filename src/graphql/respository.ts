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
        viewerCanSubscribe
        viewerHasStarred
        viewerSubscription
        owner {
            ...repositoryOwner
        }
        primaryLanguage {
            color
            id
            name
        }
        stargazers {
            totalCount
        }
        watchers {
            totalCount
        }
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

export const repositoryMutationUpdateSubscription = gql`
    mutation repositoryUpdateSubscription(
        $id: ID!
        $viewerSubscription: SubscriptionState!
    ) {
        updateSubscription(
            input: { state: $viewerSubscription, subscribableId: $id }
        ) {
            clientMutationId
            subscribable {
                viewerSubscription
            }
        }
    }
`;
