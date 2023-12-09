import {
    MutationCreateSeriesItemArgs,
    ResolversTypes,
} from "@/__generated__/resolvers-types";
import { SeriesItemCRUD } from "./crud";

export const SeriesItemMutation = {
    createSeriesItem: async (
        _parent: any,
        args: MutationCreateSeriesItemArgs,
        _context: any,
    ): Promise<ResolversTypes["SeriesItem"] | null> => {
        const createdSeriesItem = await SeriesItemCRUD.create(args.data);

        return createdSeriesItem;
    },
};
