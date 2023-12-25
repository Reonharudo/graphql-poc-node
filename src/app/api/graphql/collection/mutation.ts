import {
    CreateCollectionDataInput,
    ResolversTypes,
    MutationCreateCollectionArgs,
} from "@/__generated__/resolvers-types";
import { CollectionCRUD } from "./crud";
import { Collection } from "@prisma/client";

export const CollectionMutation = {
    createCollection: async (
        _: any,
        args: MutationCreateCollectionArgs, // Adjust the type to match the expected type
    ): Promise<ResolversTypes["Collection"] | null> => {
        console.log("collectionCreate", args);
        const persistedCollection = await CollectionCRUD.create(args.data);
        return persistedCollection;
    },
};
