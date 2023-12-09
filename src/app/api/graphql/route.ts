import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import {
    CollectionMutation,
    CollectionQuery,
    collectionTypeDef,
    CollectionResolver,
} from "./collection";
import {
    SeriesItemTypeDef,
    SeriesItemMutation,
    SeriesItemQuery,
} from "./seriesitem";
import { ListItemTypeDef } from "./listitem";
import {
    ListItemDiscriminatorType,
    ListItemUnion,
} from "@/__generated__/resolvers-types";

const resolvers = {
    // here we only write a resolver for reviews and apollo server will create a default
    // resolver for other fields.
    ListItemUnion: {
        __resolveType(obj: ListItemUnion, _contextValue: any, _info: any) {
            if (obj.type === ListItemDiscriminatorType.Series) {
                return "SeriesItem";
            }

            return null; // GraphQLError is thrown if no type matches
        },
    },
    Query: {
        ...CollectionQuery,
        ...SeriesItemQuery,
    },
    Mutation: {
        ...CollectionMutation,
        ...SeriesItemMutation,
    },
    Collection: {
        ...CollectionResolver,
    },
};

const typeDefs = gql`
    type Query
    type Mutation

    ${collectionTypeDef}
    ${ListItemTypeDef}
    ${SeriesItemTypeDef}
`;

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
