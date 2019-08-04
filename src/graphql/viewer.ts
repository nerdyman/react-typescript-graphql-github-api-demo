/**
 * GraphQL definitions for current user (based on `__ENV__` token)
 */

import gql from 'graphql-tag';

import { repositoryFragment } from './respository';

export const viewerQuery = gql`
    query($cursor: String) {
        viewer {
            repositories(
                first: 5
                orderBy: { direction: DESC, field: UPDATED_AT }
                after: $cursor
            ) {
                edges {
                    node {
                        ...repository
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }

    ${repositoryFragment}
`;
