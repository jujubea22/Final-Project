import { gql } from '@apollo/client';

export const QUERY_POST = gql`
    {
        getPosts{
            id
            content
            username
            createdAt
            likeCount
            likes {
                username
            }
            comments {
                id
                username
                content
                createdAt
            }
        }
    }

`;