import {
    Collection,
    CreateCollectionDataInput,
} from "@/__generated__/resolvers-types";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export namespace CollectionCRUD {
    export async function create(
        createCollectionDto: CreateCollectionDataInput,
    ) {
        const collection = await prisma.collection.create({
            data: {
                id: crypto.randomUUID(),
                createdAt: new Date(),
                ...createCollectionDto,
            },
            include: {
                listItems: true,
            },
        });

        const collectionWithEmptyListItems = {
            ...collection,
            listItems: null,
        };

        return collectionWithEmptyListItems;
    }

    export async function getAll(): Promise<Collection[]> {
        console.log("getAll()");
        const collections = await prisma.collection.findMany();
        const collectionsWithEmptyListItems = collections.map((collection) => ({
            ...collection,
            listItems: null,
        }));
        return collectionsWithEmptyListItems;
    }

    export async function findByIdWithEmptyListItems(
        id: string,
    ): Promise<Collection> {
        console.log("findById()", id);
        const collection = await prisma.collection.findFirstOrThrow({
            where: {
                id,
            },
        });

        const collectionWithEmptyListItems = {
            ...collection,
            listItems: null,
        };

        return collectionWithEmptyListItems;
    }

    export async function findByNameWithEmptyListItems(
        name: string,
    ): Promise<Collection> {
        console.log("findById()", name);
        const collection = await prisma.collection.findFirstOrThrow({
            where: {
                name,
            },
        });

        const collectionWithEmptyListItems = {
            ...collection,
            listItems: null,
        };

        return collectionWithEmptyListItems;
    }
}
