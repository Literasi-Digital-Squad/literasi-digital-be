import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { CloudStorageLib } from "../lib/cloud-storage";
import { AnswerNotFound } from "../lib/constant";
import { AnswerResponse, CreateAnswerRequest, toAnswerResponse, toAnswerResponseArray, UpdateAnswerRequest } from "../model/answer-model";
import { AnswerValidation } from "../validation/answer-validation";
import { Validation } from "../validation/validation";
import { QuestionService } from "./question-service";

export class AnswerService {
    static async create(question_id: string, req: CreateAnswerRequest): Promise<AnswerResponse> {
        const createReq = Validation.validate(AnswerValidation.CREATE, req)
        
        // check question exists
        await QuestionService.get(question_id)

        let image_url
        if (createReq.image) {
            image_url = await CloudStorageLib.uploadS3(createReq.image)
        }

        const answer = await prismaClient.answer.create({
            data: {
                question_id: question_id,
                body: createReq.body,
                image_url: image_url,
                is_correct: createReq.is_correct!
            }
        })

        return toAnswerResponse(answer)
    }

    static async getAll(question_id: string): Promise<AnswerResponse[]> {
        // check question exists
        await QuestionService.get(question_id)

        const answers = await prismaClient.answer.findMany({
            where: {
                question_id: question_id
            }
        })
        
        return toAnswerResponseArray(answers)
    }

    static async get(question_id: string, answer_id: number): Promise<AnswerResponse> {
        const answer = await prismaClient.answer.findUnique({
            where: {
                id: answer_id,
                question_id: question_id
            }
        })

        if (!answer) {
            throw new ResponseErorr(404, AnswerNotFound)
        }

        return toAnswerResponse(answer)
    }

    static async update(question_id: string, answer_id: number, req: UpdateAnswerRequest): Promise<AnswerResponse> {
        const updateReq = Validation.validate(AnswerValidation.UPDATE, req)

        const baseAnswer = await this.get(question_id, answer_id)

        let image_url
        if (updateReq.image) {
            if (baseAnswer.image_url){
                const imageName = baseAnswer.image_url.split('/').pop()
                await CloudStorageLib.deleteS3(imageName!)
            }
            image_url = await CloudStorageLib.uploadS3(updateReq.image)
        }

        const answer = await prismaClient.answer.update({
            where: {
                id: answer_id
            },
            data: {
                question_id: baseAnswer.question_id,
                body: updateReq.body,
                image_url: image_url,
                is_correct: updateReq.is_correct
            } 
        })

        return toAnswerResponse(answer)
    }

    static async delete(question_id: string, answer_id: number): Promise<AnswerResponse> {
        await this.get(question_id, answer_id)

        const answer = await prismaClient.answer.delete({
            where: {
                id: answer_id
            }
        })

        return toAnswerResponse(answer)
    }
}