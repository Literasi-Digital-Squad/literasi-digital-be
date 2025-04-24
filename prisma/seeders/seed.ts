import { prismaClient } from "../../src/app/database";
import { admin } from "./admin-seeder";
import { answers } from "./answer-seeder";
import { levels } from "./level-seeder";
import { questions } from "./question-seeder";

async function main() {
    await prismaClient.admin.createMany({
        data: admin
    })
    await prismaClient.level.createMany({
        data: levels
    })
    await prismaClient.question.createMany({
        data: questions
    })
    await prismaClient.answer.createMany({
        data: answers
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prismaClient.$disconnect()
    })