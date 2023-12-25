import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";

import {
    ListItemDiscriminatorType,
    ListItemUnion,
    Resolvers,
} from "@/__generated__/resolvers-types";
import {
    CollectionQuery,
    CollectionMutation,
    CollectionResolver,
    collectionTypeDef,
} from "./schema/collection";
import { ListItemTypeDef } from "./schema/listitem";
import { noteItemTypeDef } from "./schema/noteitem";
import {
    SeriesItemQuery,
    SeriesItemMutation,
    SeriesItemTypeDef,
} from "./schema/seriesitem";
import { dateScalar } from "./schema/shared/dateScalar";
import { paginationType } from "./schema/shared/pagination";

const resolvers: Resolvers = {
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
    Date: dateScalar,
};

const typeDefs = gql`
    type Query
    type Mutation

    ${collectionTypeDef}
    ${ListItemTypeDef}
    ${SeriesItemTypeDef}
    ${noteItemTypeDef}
    ${paginationType}
`;

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
