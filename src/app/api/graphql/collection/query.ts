import { CollectionCRUD } from "./crud";
import { CollectionQueryArgs, FindCollectionByIdDto } from "./types";

export const CollectionQuery = {
    //GraphQL Standard is to mark _parent and _args with any if its not needed
    collections: async (_parent: any) => {
        return await CollectionCRUD.getAll();
    },
    collection: async (_parent: any, args: CollectionQueryArgs) => {
        const { id, name } = args;
        if (id) {
            return await CollectionCRUD.findById(id);
        } else if (id && name) {
            return await CollectionCRUD.findById(id);
        } else if (name) {
            return await CollectionCRUD.findByName(name);
        }
        return null;
    },
    collectionById: async (_parent: any, _args: FindCollectionByIdDto) => {
        const { id } = _args;

        return await CollectionCRUD.findById(id);
    },
};
