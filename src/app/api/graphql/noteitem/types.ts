import { gql } from "graphql-tag";

export const noteItemTypeDef = gql`
    type NoteItem implements ListItem {
        id: ID!
        listItemId: ID!
        name: String!
        createdAt: String!
        type: ListItemDiscriminatorType!
        coverImageURL: String!
        orderNr: Int!
    }
`;
