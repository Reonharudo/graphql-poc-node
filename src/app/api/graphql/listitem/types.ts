import { gql } from "graphql-tag";

export const ListItemTypeDef = gql`
    interface ListItem {
        id: ID!
        type: ListItemDiscriminatorType! # discrimator type
        name: String!
        coverImageURL: String!
        createdAt: String!
        orderNr: Int!
    }

    enum ListItemDiscriminatorType {
        SERIES
        NOTE
        COMIC
    }
`;
