import {
    ListItemDiscriminatorType,
    SeriesItem,
} from "@/__generated__/resolvers-types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export namespace ListItemCRUD {
    export async function findAllListItems(
        collectionId: string,
    ): Promise<SeriesItem[]> {
        const fetchedListItems = await prisma.listItem.findMany({
            where: {
                collectionId,
            },
            include: {
                seriesItem: true,
                comicItem: true,
                noteItem: true,
            },
        });

        const collectionItems: SeriesItem[] = [];

        for (const item of fetchedListItems) {
            if (item.seriesItem) {
                collectionItems.push({
                    id: item.seriesItem.id,
                    listItemId: item.id,
                    name: item.name,
                    createdAt: item.createdAt.toUTCString(),
                    coverImageURL: item.coverImageURL,
                    type: ListItemDiscriminatorType.Series,
                    currentEpisode: item.seriesItem.currentEpisode,
                    totalEpisodes: item.seriesItem.totalEpisodes,
                    status: item.seriesItem.status,
                });
            } else if (item.comicItem) {
            } else if (item.noteItem) {
            } else {
                console.log(
                    "Could not determine exact ListItem. ListItem should be disjunct and total",
                );
            }
        }
        console.log("erg", collectionItems);
        return collectionItems;
    }
}
