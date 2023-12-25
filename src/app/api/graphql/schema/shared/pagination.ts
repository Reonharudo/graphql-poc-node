import { gql } from "graphql-tag";

export const paginationType = gql`
    type PageInfo {
        hasNextPage: Boolean!
        endCursor: String
    }
`;
