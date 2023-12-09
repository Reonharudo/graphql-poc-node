import { gql } from "graphql-tag";

export const SeriesItemTypeDef = gql`
    type SeriesItem implements ListItem {
        id: ID!
        listItemId: ID!
        name: String!
        createdAt: String!
        type: ListItemDiscriminatorType!
        coverImageURL: String!

        currentEpisode: Int!
        totalEpisodes: Int!
        status: SeriesStatus!
    }

    enum SeriesStatus {
        COMPLETED
        WATCHING
        PLAN_TO_WATCH
        ON_HOLD
        DROPPED
    }

    input CreateSeriesItemDataInput {
        collectionId: ID!
        name: String!
        currentEpisode: Int!
        totalEpisodes: Int!
        coverImageURL: String!
        status: SeriesStatus!
    }

    extend type Query {
        seriesItems: [SeriesItem]!
    }

    extend type Mutation {
        createSeriesItem(data: CreateSeriesItemDataInput!): SeriesItem
    }
`;
