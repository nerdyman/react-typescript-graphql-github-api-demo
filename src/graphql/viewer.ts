/**
 * GraphQL definitions for current user (based on `__ENV__` token)
 */

import gql from 'graphql-tag';

import {
    repositoryDetailFragment,
    repositoryPreviewFragment,
} from './respository';

export const viewerRepositoryQueryAll = gql`
    query viewerRepositoryAll($cursor: String, $first: Int = 5) {
        viewer {
            repositories(
                first: $first
                orderBy: { direction: DESC, field: UPDATED_AT }
                after: $cursor
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
