/**
 * GraphQL definitions for current user (based on `__ENV__` token)
 */

import gql from 'graphql-tag';

import {
    repositoryDetailFragment,
    repositoryPreviewFragment,
} from './respository';

export const viewerRepositoryQueryAll = gql`
    query viewerRepositoryAll(
        $cursor: String
        $first: Int = 5
        $orderByDirection: OrderDirection = ASC
        $orderByField: RepositoryOrderField = NAME
    ) {
        viewer {
            repositories(
                after: $cursor
                first: $first
                orderBy: { direction: $orderByDirection, field: $orderByField }
            ) {
                edges {
                    node {
                        ...repositoryPreview
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }

    ${repositoryPreviewFragment}
`;

export const viewerRepositoryStarredQueryAll = gql`
    query viewerRepositoryStarredAll(
        $cursor: String
        $first: Int = 5
        $orderByDirection: OrderDirection = ASC
        $orderByField: StarOrderField = STARRED_AT
    ) {
        viewer {
            starredRepositories(
                after: $cursor
                first: $first
                orderBy: { direction: $orderByDirection, field: $orderByField }
            ) {
                edges {
                    node {
                        ...repositoryPreview
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }

    ${repositoryPreviewFragment}
`;

export const viewerRepositoryQueryOne = gql`
    query viewerRepositoryOne($name: String!) {
        viewer {
            repository(name: $name) {
                ...repositoryDetail
            }
        }
    }

    ${repositoryDetailFragment}
`;
