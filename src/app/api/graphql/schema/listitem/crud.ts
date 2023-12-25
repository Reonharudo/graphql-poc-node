import {
    ListItemConnection,
    ListItemDiscriminatorType,
    ListItemEdge,
    ListItemUnion,
    SeriesItem,
} from "@/__generated__/resolvers-types";
import { Collection, Prisma, PrismaClient } from "@prisma/client";
import { after } from "node:test";

const prisma = new PrismaClient();

type CollectionWithListItems = Prisma.CollectionGetPayload<{
    include: {
        listItems: {
            include: {
                seriesItem: true;
                comicItem: true;
                noteItem: true;
            };
        };
    };
}>;

export namespace ListItemCrud {
    /**
     * Uses cursor-paged-pagination.
     *
     * @param collectionId
     * @param first
     * @param after ID of a listItem. Acts as the begin for the cursor.
     * @param sortBy
     * @returns
     */
    export async function findListItemsByCollectionIdOrderByOrderNr(
        collectionId: string,
        first: number = 10,
        after: string | null = null,
    ): Promise<ListItemConnection> {
        try {
        } catch (err) {}
        const [
            fetchedListItemsCount,
            fetchedListItemsTotalCount,
            fetchedListItems,
        ] = await prisma.$transaction([
            prisma.listItem.count({
                where: {
                    collectionId,
                },
                skip: after ? 1 : 0, //skip the cursor : 0
                cursor: after ? { id: after } : undefined,
            }),
            prisma.listItem.count({
                where: {
                    collectionId,
                },
            }),
            prisma.listItem.findMany({
                where: {
                    collectionId,
                },
                take: first,
                skip: after ? 1 : 0, //skip the cursor : 0
                cursor: after ? { id: after } : undefined,
                include: {
                    seriesItem: true,
                    comicItem: true,
                    noteItem: true,
                },
                orderBy: {
                    orderNr: "asc",
                },
            }),
        ]);

        const parsedListItems = parseListItems(fetchedListItems);

        const lastListItem = parsedListItems[parsedListItems.length - 1];

        return {
            edges: parsedListItems,
            pageInfo: {
                hasNextPage: fetchedListItemsCount > first,
                endCursor: lastListItem
                    ? parsedListItems[parsedListItems.length - 1].node.id
                    : null,
            },
            totalCount: fetchedListItemsTotalCount,
        };
    }

    function parseListItems(
        listItems: CollectionWithListItems["listItems"],
    ): ListItemEdge[] {
        console.log("parseListItems");
        const parsedListItems: ListItemEdge[] = []; //add types here e.g ComicItem etc.

        for (const item of listItems) {
            if (item.seriesItem) {
                const listItem: ListItemUnion = {
                    id: item.seriesItem.id,
                    listItemId: item.id,
                    name: item.name,
                    createdAt: item.createdAt.toUTCString(),
                    coverImageURL: item.coverImageURL,
                    type: ListItemDiscriminatorType.Series,
                    currentEpisode: item.seriesItem.currentEpisode,
                    totalEpisodes: item.seriesItem.totalEpisodes,
                    status: item.seriesItem.status,
                    orderNr: item.orderNr,
                };

                parsedListItems.push({
                    cursor: listItem.id,
                    node: listItem,
                });
            } else if (item.comicItem) {
            } else if (item.noteItem) {
            } else {
                console.log(
                    "Could not determine exact ListItem. ListItem should be disjunct and total",
                );
            }
        }
        console.log(parsedListItems);
        return parsedListItems;
    }
}
