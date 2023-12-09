import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import {
    CollectionMutation,
    CollectionQuery,
    CollectionResolver,
} from "./collection";

import fs from "fs";
import path from "path";

async function readTypeDefs() {
    const promises: Promise<string>[] = [];

    return fs.readFileSync(
        "C:/Users/Leonhard/Documents/Projects/graphql-poc-node/src/app/api/graphql/collection/types.graphql",
        { encoding: "utf-8" },
    );

    promises.push(
        new Promise((done, reject) => {
            fs.readFile(
                path.join(
                    __dirname,
                    "/src/app/api/graphql/collection.types.graphql",
                ),
                "utf-8",
                (err, data) => {
                    if (data) {
                        done(data);
                    } else {
                        reject(err);
                    }
                },
            );
        }),
        new Promise((done, reject) => {
            fs.readFile(
                path.join(
                    __dirname,
                    "/src/app/api/graphql/seriesitem.types.graphql",
                ),
                "utf-8",
                (err, data) => {
                    if (data) {
                        done(data);
                    } else {
                        reject(err);
                    }
                },
            );
        }),
    );

    return (await Promise.all(promises)).map((val) => val);
}

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

const typeDefs = await readTypeDefs();
console.log("Type defs are", typeDefs);
const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
