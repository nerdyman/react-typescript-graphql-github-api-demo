import gql from 'graphql-tag';

export const repositoryFragment = gql`
    fragment repository on Repository {
        id
        name
        url
        descriptionHTML
        primaryLanguage {
            name
        }
        owner {
            login
            url
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
`;
