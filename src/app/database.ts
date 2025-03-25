import { Prisma, PrismaClient } from "@prisma/client";
import { logger } from "./logging";
import { Database, Emit } from "../lib/constant";

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: Emit.EVENT,
            level: Database.LevelQuery,
        },
        {
            emit: Emit.EVENT,
            level: Database.LevelError
        },
        {
            emit: Emit.EVENT,
            level: Database.LevelInfo
        },
        {
            emit: "event",
            level: Database.LevelWarn
        },
    ]
})

prismaClient.$on(Database.LevelQuery, (e) => {
    logger.info(e)
})

prismaClient.$on(Database.LevelError, (e) => {
    logger.error(e)
})

prismaClient.$on(Database.LevelInfo, (e) => {
    logger.info(e)
})

prismaClient.$on(Database.LevelWarn, (e) => {
    logger.warn(e)
})