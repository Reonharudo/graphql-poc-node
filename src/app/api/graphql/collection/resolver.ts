import { CollectionCRUD } from "./crud";
import { SeriesItemCRUD } from "../seriesitem/crud";
import { Collection, ResolversTypes } from "@/__generated__/resolvers-types";
import { ListItemCRUD } from "../listitem/crud";
/*
    in this file, we include any resolver needed for any field of our type. 
    if you don't provide any resolver, 
    the apollo server will consider a default resolver 
    for it which is fieldname: (parent) => parent.fieldname
*/
export const CollectionResolver = {
    listItems: async (parent: Collection, _args: any, _context: any) => {
        console.log("Resolver listItems", parent);
        if (parent) {
            return await ListItemCRUD.findAllListItems(parent.id);
        }
        return [];
    },
};
