import { CollectionCRUD } from "./crud";
import { CreateCollectionDto } from "./types";

export const CollectionMutation = {
    collectionCreate: async (_: any, args: { data: CreateCollectionDto }) => {
        console.log("yooo");
        return await CollectionCRUD.create(args.data);
    },
};
