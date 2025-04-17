import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { CloudStorageLib } from "../lib/cloud-storage";
import { QuestionNotFound } from "../lib/constant";
import { CreateQuestionRequest, QuestionResponse, toQuestionResponse, toQuestionResponseArray, UpdateQuestionRequest } from "../model/question-model";
import { QuestionValidation } from "../validation/question-validation";
import { Validation } from "../validation/validation";
import { AnswerService } from "./answer-service";
import { LevelService } from "./level-service";

export class QuestionService {
    static async create(req: CreateQuestionRequest): Promise<QuestionResponse> {
        const createReq = Validation.validate(QuestionValidation.CREATE, req)
        
        // check level exists
        await LevelService.get(createReq.level_id)

        let image_url
        if (createReq.image) {
            image_url = await CloudStorageLib.uploadS3(createReq.image)
        }

        const question = await prismaClient.question.create({
            data: {
                level_id: createReq.level_id,
                body: createReq.body,
                image_url: image_url
            }
        })

        return toQuestionResponse(question)
    }

    static async getAll(level: number, limit: number, page: number): Promise<QuestionResponse[]> {
        // check level exists
        await LevelService.get(level)

        const questions = await prismaClient.question.findMany({
            take: limit,
            skip: (page - 1) * limit,
            orderBy: { created_at: 'desc' },
            where: {
                level_id: level
            }
        });
    
        return toQuestionResponseArray(questions);
    }

    static async get(question_id: string): Promise<QuestionResponse> {
        const question = await prismaClient.question.findUnique({
            where: {
                id: question_id
            }
        })

        if (!question) {
            throw new ResponseErorr(404, QuestionNotFound)
        }
    
        return toQuestionResponse(question);
    }
    
    static async update(question_id: string, req: UpdateQuestionRequest): Promise<QuestionResponse> {
        const updateReq = Validation.validate(QuestionValidation.UPDATE, req)
        
        // check level exists
        await LevelService.get(updateReq.level_id)

        const baseQuestion = await this.get(question_id)

        let image_url
        if (updateReq.image) {
            if (baseQuestion.image_url){
                const imageName = baseQuestion.image_url.split('/').pop()
                await CloudStorageLib.deleteS3(imageName!)
            }
            image_url = await CloudStorageLib.uploadS3(updateReq.image)
        }

        const question = await prismaClient.question.update({
            where: {
                id: question_id
            },
            data: {
                level_id: updateReq.level_id,
                body: updateReq.body,
                image_url: image_url
            } 
        })

        return toQuestionResponse(question)
    }

    static async delete(question_id: string): Promise<QuestionResponse> {
        await this.get(question_id)

        const question = await prismaClient.question.delete({
            where: {
                id: question_id
            },
            include: {
                answers: true
            }
        })

        if (question.answers.length > 0) {
            question.answers.forEach(answer => {
                if (answer.image_url) {
                    const imageName = answer.image_url.split('/').pop()
                    CloudStorageLib.deleteS3(imageName!)
                }
            });
        }

        if (question.image_url) {
            const imageName = question.image_url.split('/').pop()
            CloudStorageLib.deleteS3(imageName!)
        }
    
        return toQuestionResponse(question);
    }

    // Helper function
    static async countQuestions(level: number): Promise<number> {
        return await prismaClient.question.count({
            where: { level_id: level }
        });
    }
}