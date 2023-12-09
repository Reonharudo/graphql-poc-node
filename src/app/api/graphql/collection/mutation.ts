import { CreateCollectionDataInput } from "@/__generated__/resolvers-types";
import { CollectionCRUD } from "./crud";

export const CollectionMutation = {
    createCollection: async (
        _: any,
        args: { data: CreateCollectionDataInput },
    ) => {
        console.log("collectionCreate");
        const createdCollection = await CollectionCRUD.create(args.data);
        return createdCollection;
    },
};
