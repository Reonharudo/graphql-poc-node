import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import {
    CollectionMutation,
    CollectionQuery,
    collectionTypeDef,
    CollectionResolver,
} from "./collection";

const resolvers = {
    Query: {
        ...CollectionQuery,
    },
    Mutation: {
        ...CollectionMutation,
    },
    Collection: {
        ...CollectionResolver,
    },
};

const typeDefs = gql`
    type Query
    type Mutation

    ${collectionTypeDef}
`;

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
