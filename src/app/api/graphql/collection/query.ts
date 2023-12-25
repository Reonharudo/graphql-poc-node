import {
    Collection,
    QueryCollectionArgs,
    QueryCollectionByIdArgs,
} from "@/__generated__/resolvers-types";
import { CollectionCRUD } from "./crud";
import { GraphQLResolveInfo } from "graphql";
import { getRequestedFields } from "../utils/utils";

export const CollectionQuery = {
    //GraphQL Standard is to mark _parent and _args with any if its not needed
    collections: async (
        _parent: any,
        _args: any,
        _context: any,
        _info: any,
    ): Promise<Collection[]> => {
        return await CollectionCRUD.getAll();
    },
    collection: async (
        _parent: any,
        args: QueryCollectionArgs,
    ): Promise<Collection | null> => {
        const { id, name } = args;

        if (id) {
            return await CollectionCRUD.findByIdWithEmptyListItems(id);
        } else if (id && name) {
            return await CollectionCRUD.findByIdWithEmptyListItems(id);
        } else if (name) {
            return await CollectionCRUD.findByNameWithEmptyListItems(name);
        }
        return null;
    },
    collectionById: async (
        _parent: any,
        args: QueryCollectionByIdArgs,
    ): Promise<Collection | null> => {
        const { id } = args.data;

        return await CollectionCRUD.findByIdWithEmptyListItems(id);
    },
};
