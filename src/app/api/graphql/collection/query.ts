import { Collection } from "@/__generated__/resolvers-types";
import { CollectionCRUD } from "./crud";

export const CollectionQuery = {
    //GraphQL Standard is to mark _parent and _args with any if its not needed
    collections: async (
        _parent: any,
        _args: any,
        _context: any,
        info: any,
    ): Promise<Collection[]> => {
        const requestedFields = info.fieldNodes[0].selectionSet.selections.map(
            (field: any) => field.name.value,
        );
        console.log(requestedFields);
        return await CollectionCRUD.getAll();
    },
    collection: async (_parent: any, args: any): Promise<Collection | null> => {
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
        _args: any,
    ): Promise<Collection | null> => {
        const { id } = _args;

        return await CollectionCRUD.findByIdWithEmptyListItems(id);
    },
};
