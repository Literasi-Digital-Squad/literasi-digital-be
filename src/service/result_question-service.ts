import { prismaClient } from "../app/database";
import { ResultQuestionRequest, ResultQuestionResponse, toResultQuestionListResponse } from "../model/result_question-model";
import { ResultQuestionValidation } from "../validation/result_question-validation";
import { Validation } from "../validation/validation";
import { AnswerService } from "./answer-service";
import { QuestionService } from "./question-service";
import { ResultService } from "./result-service";

export class ResultQuestionService {
    static async getResultQuestionsDetail(
        result_id: string,
        limit: number = 10,
        page: number = 1,
        search?: string
    ): Promise<ResultQuestionResponse[]> {
        await ResultService.get(result_id);
    
        const whereClause: any = {
            result_id: result_id
        };
    
        if (search && search.trim() !== '') {
            whereClause.body = {
                contains: search,
                mode: 'insensitive',
                not: null
            };
        }
    
        const resultQuestions = await prismaClient.resultQuestion.findMany({
            where: whereClause,
            orderBy: { id: 'asc' },
            include: {
                result_answers: {
                    orderBy: { id: 'asc' }
                }
            },
            take: limit,
            skip: (page - 1) * limit
        });
    
        return toResultQuestionListResponse(resultQuestions);
    }    

    static async create(req: ResultQuestionRequest): Promise<boolean> {
        const createReq = Validation.validate(ResultQuestionValidation.CREATE, req)
        
        await ResultService.get(createReq.result_id)

        createReq.result_questions.forEach(async (resultQuestion) => {
            const question = await QuestionService.get(resultQuestion.question_id)
            const createResQuestion = await prismaClient.resultQuestion.create({
                data: {
                    result_id: req.result_id,
                    level_id: question.level_id,
                    body: question.body,
                    image_url: question.image_url
                }
            })

            const answers = await AnswerService.getAll(resultQuestion.question_id)
            answers.forEach(async(answer) => {
                await prismaClient.resultAnswer.create({
                    data: {
                        result_question_id: createResQuestion.id,
                        body: answer.body,
                        image_url: answer.image_url,
                        answered: answer.id == resultQuestion.answer_id,
                        is_correct: answer.is_correct
                    }
                })
            });
        });

        return true
    }

    // Helper Function

    static async countResultQuestions(result_id: string, search?: string): Promise<number> {
        const whereClause: any = { result_id };
    
        if (search && search.trim() !== '') {
            whereClause.body = {
                contains: search,
                mode: 'insensitive'
            };
        }
    
        return prismaClient.resultQuestion.count({ where: whereClause });
    }
    
}