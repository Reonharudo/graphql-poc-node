import { CreateCollectionDataInput } from "@/__generated__/resolvers-types";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export namespace CollectionCRUD {
    export async function create(
        createCollectionDto: CreateCollectionDataInput,
    ) {
        return await prisma.collection.create({
            data: {
                id: crypto.randomUUID(),
                createdAt: new Date(),
                ...createCollectionDto,
            },
        });
    }

    export async function getAll() {
        console.log("getAll()");
        return await prisma.collection.findMany();
    }

    export async function findById(id: string) {
        console.log("findById()", id);
        return await prisma.collection.findFirst({
            where: {
                id,
            },
        });
    }

    export async function findByName(name: string) {
        console.log("findById()", name);
        return await prisma.collection.findFirst({
            where: {
                name,
            },
        });
    }
}
