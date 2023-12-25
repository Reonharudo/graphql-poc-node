import { gql } from "graphql-tag";

export const collectionTypeDef = gql`
    """
    A Collection contains multiple ListItems.
    """
    type Collection {
        "The id of the collection"
        id: ID!
        "The name of the collection"
        name: String
        "The creation date"
        createdAt: Date
        "URL to the cover image"
        coverImageURL: String
        "Array of list items"
        listItems(first: Int, after: String): ListItemConnection
    }

    type ListItemConnection {
        edges: [ListItemEdge]!
        pageInfo: PageInfo!
        totalCount: Int!
    }

    type ListItemEdge {
        node: ListItemUnion!
        cursor: String!
    }

    scalar Date

    union ListItemUnion = SeriesItem | NoteItem

    input FindCollectionByIdInput {
        id: String!
    }

    input CreateCollectionDataInput {
        name: String!
        coverImageURL: String!
    }

    extend type Query {
        collections: [Collection]
        collection(id: ID, name: String): Collection
        collectionById(data: FindCollectionByIdInput!): Collection
    }

    extend type Mutation {
        createCollection(data: CreateCollectionDataInput!): Collection
    }
`;
