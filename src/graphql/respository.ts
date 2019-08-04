import gql from 'graphql-tag';

export const repositoryOwnerFragment = gql`
    fragment repositoryOwner on RepositoryOwner {
        id
        avatarUrl
        login
        url
    }
`;

export const repositoryFragment = gql`
    fragment repository on Repository {
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
