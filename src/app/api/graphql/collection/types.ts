import { gql } from "graphql-tag";

export const collectionTypeDef = gql`
    type Collection {
        id: ID
        name: String
        createdAt: String
        coverImageURL: String
    }

    input FindCollectionByIdInput {
        id: String
    }

    input CollectionCreateDataInput {
        name: String
        coverImageURL: String
    }

    extend type Query {
        collections: [Collection]
        collection(id: ID, name: String): Collection
        collectionById(data: FindCollectionByIdInput): Collection
    }

    extend type Mutation {
        collectionCreate(data: CollectionCreateDataInput): Collection
    }
`;

export interface CreateCollectionDto {
    name: string;
    coverImageURL: string;
}

export interface FindCollectionByIdDto {
    id: string;
}
