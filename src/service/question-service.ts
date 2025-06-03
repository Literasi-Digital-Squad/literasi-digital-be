import { Question } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { CloudStorageLib } from "../lib/cloud-storage";
import { InitialQuestionLevel, QuestionNotFound } from "../lib/constant";
import { IRT } from "../lib/irt";
import { CreateQuestionRequest, GetNextQuestionRequest, NextQuestionResponse, QuestionResponse, toQuestionResponse, toQuestionResponseArray, UpdateQuestionRequest } from "../model/question-model";
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

    static async getAll(level: number, limit: number, page: number, search?: string): Promise<QuestionResponse[]> {
        await LevelService.get(level);

        const whereClause: any = {
            level_id: level
        };

        if (search && search.trim() !== '') {
            whereClause.body = {
                contains: search,
                mode: 'insensitive',
                not: null
            };
        }

        const questions = await prismaClient.question.findMany({
            take: limit,
            skip: (page - 1) * limit,
            orderBy: { created_at: 'desc' },
            where: whereClause
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

    static async getInitialQuestion(): Promise<QuestionResponse> {
        const question: Question[] = await prismaClient.$queryRaw<Question[]>`
            SELECT * FROM \`questions\`
            WHERE \`level_id\` = ${InitialQuestionLevel}
            ORDER BY RAND()
            LIMIT 1
            `;
        if (question.length == 0) {
            throw new ResponseErorr(404, QuestionNotFound);
        }

        return toQuestionResponse(question[0])
    }

    static async getNextQuestion(req: GetNextQuestionRequest): Promise<NextQuestionResponse> {
        const nextQuestionReq = Validation.validate(QuestionValidation.GETNEXTQUESTION, req)
        if (!nextQuestionReq.theta || nextQuestionReq.theta <= 0) {
            nextQuestionReq.theta = 3
        }

        const rightAnswer = await AnswerService.getRightAnswer(nextQuestionReq.question_id)
        let is_correct = rightAnswer.id == nextQuestionReq.answer_id
        if (rightAnswer.id == nextQuestionReq.answer_id) {
            is_correct = true
            nextQuestionReq.correct_streak += 1
            nextQuestionReq.wrong_streak = 0

            nextQuestionReq.total_correct += 1
        } else {
            nextQuestionReq.correct_streak = 0
            nextQuestionReq.wrong_streak += 1
        }

        const newTheta = IRT.updateTheta(nextQuestionReq.theta, is_correct, nextQuestionReq.wrong_streak, nextQuestionReq.correct_streak)
        const nextLevel = await IRT.calculate(newTheta)

        const question: Question[] = await prismaClient.$queryRaw<Question[]>`
            SELECT * FROM \`questions\`
            WHERE \`level_id\` = ${nextLevel}
            ORDER BY RAND()
            LIMIT 1
            `;
        if (question.length == 0) {
            throw new ResponseErorr(404, QuestionNotFound);
        }

        return {
            theta: newTheta,
            wrong_streak: nextQuestionReq.wrong_streak,
            correct_streak: nextQuestionReq.correct_streak,
            total_correct: nextQuestionReq.total_correct,
            question: toQuestionResponse(question[0])
        }
    }

    

    // Helper function
    static async countQuestions(level: number, search?: string): Promise<number> {
        const whereClause: any = { level_id: level };
    
        if (search && search.trim() !== '') {
            whereClause.body = {
                contains: search,
                mode: 'insensitive'
            };
        }
    
        return await prismaClient.question.count({ where: whereClause });
    }    
}