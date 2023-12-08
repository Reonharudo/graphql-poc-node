import { gql } from "graphql-tag";
import { SeriesItemTypeDef } from "../seriesitem";

export const collectionTypeDef = gql`
    type Collection {
        id: ID
        name: String
        createdAt: String
        coverImageURL: String
        seriesItems: [SeriesItem]
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

export interface Collection {
    id: string;
    name: String;
    createdAt: String;
    coverImageURL: String;
}

export interface CollectionQueryArgs {
    id?: string;
    name?: string;
}

export interface CreateCollectionDto {
    name: string;
    coverImageURL: string;
}

export interface FindCollectionByIdDto {
    id: string;
}
