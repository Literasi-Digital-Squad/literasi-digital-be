import { prismaClient } from "../../src/app/database";
import { admin } from "./admin-seeder";
import { answers } from "./answer-seeder";
import { levels } from "./level-seeder";
import { questions } from "./question-seeder";
import { participants } from "./paticipant-seeder";
import { results } from "./result-seeder";
import { result_questions } from "./result-question-seeder";
import { result_answers } from "./result-answer-seeder";

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
    await prismaClient.participant.createMany({
        data: participants
    })
    await prismaClient.result.createMany({
        data: results
    })
    await prismaClient.resultQuestion.createMany({
        data: result_questions
    })
    await prismaClient.resultAnswer.createMany({
        data: result_answers
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