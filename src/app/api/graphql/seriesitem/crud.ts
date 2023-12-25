import {
    CreateSeriesItemDataInput,
    ListItemDiscriminatorType,
    SeriesItem,
} from "@/__generated__/resolvers-types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export namespace SeriesItemCRUD {
    export async function create(
        data: CreateSeriesItemDataInput,
    ): Promise<SeriesItem> {
        console.log("createSeriesItem", data);
        try {
            const {
                collectionId,
                name,
                currentEpisode,
                coverImageURL,
                status,
                totalEpisodes,
                orderNr,
            } = data;

            const result = await prisma.listItem.create({
                data: {
                    id: crypto.randomUUID(),
                    collectionId,
                    name,
                    coverImageURL,
                    createdAt: new Date(),
                    seriesItem: {
                        create: {
                            id: crypto.randomUUID(),
                            currentEpisode,
                            totalEpisodes,
                            status,
                        },
                    },
                    orderNr,
                },
                include: {
                    seriesItem: true,
                },
            });

            if (result.seriesItem) {
                return {
                    id: result.id,
                    listItemId: result.seriesItem.id,
                    name: result.name,
                    createdAt: result.createdAt.toUTCString(),
                    currentEpisode: result.seriesItem.currentEpisode,
                    totalEpisodes: result.seriesItem.totalEpisodes,
                    coverImageURL: result.coverImageURL,
                    status: result.seriesItem.status,
                    type: ListItemDiscriminatorType.Series,
                    orderNr: result.orderNr,
                };
            }
            throw "SeriesItem was null";
        } catch (error) {
            // Handle errors, log, or throw as needed
            console.error("Error fetching series items:", error);
            throw new Error("Unable to fetch series items");
        }
    }
}
