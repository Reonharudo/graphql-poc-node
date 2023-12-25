import { CollectionCRUD } from "./crud";
import { SeriesItemCRUD } from "../seriesitem/crud";
import {
    Collection,
    CollectionListItemsArgs,
    ListItemConnection,
    ListItemConnectionResolvers,
    ResolversTypes,
} from "@/__generated__/resolvers-types";
import { ListItemCrud } from "../listitem/crud";

/*
    in this file, we include any resolver needed for any field of our type. 
    if you don't provide any resolver, 
    the apollo server will consider a default resolver 
    for it which is fieldname: (parent) => parent.fieldname
*/
export const CollectionResolver = {
    listItems: async (
        parent: Collection,
        { first, after }: CollectionListItemsArgs,
        _context: any,
    ): Promise<ListItemConnection> => {
        console.log("Resolver listItems", parent);

        const result =
            await ListItemCrud.findListItemsByCollectionIdOrderByOrderNr(
                parent.id,
                first ?? 10,
                after,
            );
        console.log(result, "Items found");
        return result;
    },
};
