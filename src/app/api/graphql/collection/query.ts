import { CollectionCRUD } from "./crud";

export const CollectionQuery = {
    //GraphQL Standard is to mark _parent and _args with any if its not needed
    collections: async (_parent: any) => {
        return await CollectionCRUD.getAll();
    },
    collection: async (_parent: any, args: any) => {
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
    collectionById: async (_parent: any, _args: any) => {
        const { id } = _args;

        return await CollectionCRUD.findById(id);
    },
};
