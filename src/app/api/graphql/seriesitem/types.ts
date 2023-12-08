import { gql } from "graphql-tag";

export const SeriesItemTypeDef = gql`
    type SeriesItem {
        id: ID
        listItemID: ID
        currentEpisode: Int
        coverImageURL: String
    }

    input CreateSeriesItemInput {
        listItemID: ID!
        currentEpisode: Int!
        coverImageURL: String!
    }

    extend type Query {
        seriesItems: [SeriesItem]!
    }

    extend type Mutation {
        createSeriesItem(
            createSeriesItemInput: CreateSeriesItemInput
        ): SeriesItem
    }
`;

export interface CreateSeriesInput {
    listItemID: String;
    currentEpisode: Number;
    coverImageURL: String;
}
