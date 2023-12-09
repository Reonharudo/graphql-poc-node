import { gql } from "graphql-tag";
import { SeriesItemTypeDef } from "../seriesitem";

export const collectionTypeDef = gql`
    type Collection {
        id: ID!
        name: String
        createdAt: String
        coverImageURL: String
        listItems: [ListItemUnion]!
    }

    union ListItemUnion = SeriesItem

    input FindCollectionByIdInput {
        id: String
    }

    input CreateCollectionDataInput {
        name: String!
        coverImageURL: String!
    }

    extend type Query {
        collections: [Collection]
        collection(id: ID, name: String): Collection
        collectionById(data: FindCollectionByIdInput): Collection
    }

    extend type Mutation {
        createCollection(data: CreateCollectionDataInput): Collection!
    }
`;
