import { Collection } from "@prisma/client";
import { CollectionCRUD } from "./crud";
import { SeriesItemCRUD } from "../seriesitem/crud";
/*
    in this file, we include any resolver needed for any field of our type. 
    if you don't provide any resolver, 
    the apollo server will consider a default resolver 
    for it which is fieldname: (parent) => parent.fieldname
*/
export const CollectionResolver = {
    // here we only write a resolver for reviews and apollo server will create a default
    // resolver for other fields.
};
