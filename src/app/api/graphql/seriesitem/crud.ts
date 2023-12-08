import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export namespace SeriesItemCRUD {
    export async function findAllSeriesItemsByCollectionID(
        collectionID: string,
    ) {
        try {
            const seriesItems = await prisma.listItem.findMany({
                where: {
                    collectionId: collectionID,
                },
                include: {
                    seriesItem: true,
                },
            });

            return seriesItems.map((item) => item.seriesItem);
        } catch (error) {
            // Handle errors, log, or throw as needed
            console.error("Error fetching series items:", error);
            throw new Error("Unable to fetch series items");
        }
    }
}
