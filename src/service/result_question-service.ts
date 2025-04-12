import { prismaClient } from "../app/database";
import { ResultQuestionResponse, toResultQuestionListResponse } from "../model/result_question-model";
import { ResultService } from "./result-service";

export class ResultQuestionService {
    static async getResultQuestionsDetail(result_id: string): Promise<ResultQuestionResponse[]> {
        await ResultService.get(result_id)

        const resultQuestions = await prismaClient.resultQuestion.findMany({
            where: {
                result_id: result_id
            }, 
            orderBy: {
                id: 'asc'
            },
            include: {
                result_answers: {
                    orderBy: {
                        id: 'asc'
                    }
                }
            }
        })

        return toResultQuestionListResponse(resultQuestions)
    }
}