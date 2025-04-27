import { NextFunction, Request, Response } from "express";
import { CreateQuestionRequest, UpdateQuestionRequest } from "../model/question-model";
import { QuestionService } from "../service/question-service";
import { InvalidID, Status } from "../lib/constant";
import { MulterRequest } from "../types/multer-request";
import { validate as validateUUID } from 'uuid';
import { ResponseErorr } from "../error/reponse-error";
import { CreateAnswerRequest, UpdateAnswerRequest } from "../model/answer-model";
import { AnswerService } from "../service/answer-service";

export class AnswerController {
    static async create(req: MulterRequest, res: Response, next: NextFunction) {
        try {
            const question_id = req.params.question_id
            if (!validateUUID(question_id)) {
                throw new ResponseErorr(400, InvalidID);
            }

            const request: CreateAnswerRequest = {
                body: req.body.body,
                image: req.file,
                is_correct: req.body.is_correct === "true" ? true :
                        req.body.is_correct === "false" ? false :
                        undefined
            };

            const response = await AnswerService.create(question_id, request);
            res.status(201).json({
                status: Status.Success,
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const question_id = req.params.question_id
            if (!validateUUID(question_id)) {
                throw new ResponseErorr(400, InvalidID);
            }

            const response = await AnswerService.getAll(question_id);
            res.status(200).json({
                status: Status.Success,
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const answer_id = parseInt(req.params.answer_id, 10);
            const question_id = req.params.question_id
            if (!validateUUID(question_id) || isNaN(answer_id)) {
                throw new ResponseErorr(400, InvalidID);
            }

            const response = await AnswerService.get(question_id, answer_id);
            res.status(200).json({
                status: Status.Success,
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async update(req: MulterRequest, res: Response, next: NextFunction) {
        try {
            const answer_id = parseInt(req.params.answer_id, 10);
            const question_id = req.params.question_id
            if (!validateUUID(question_id) || isNaN(answer_id)) {
                throw new ResponseErorr(400, InvalidID);
            }

            const request: UpdateAnswerRequest = {
                body: req.body.body,
                image: req.file,
                is_correct: req.body.is_correct === "true" ? true :
                        req.body.is_correct === "false" ? false :
                        undefined
            };

            const response = await AnswerService.update(question_id, answer_id, request);
            res.status(200).json({
                status: Status.Success,
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const answer_id = parseInt(req.params.answer_id, 10);
            const question_id = req.params.question_id
            if (!validateUUID(question_id) || isNaN(answer_id)) {
                throw new ResponseErorr(400, InvalidID);
            }

            await AnswerService.delete(question_id, answer_id);
            res.status(200).json({
                status: Status.Success,
            });
        } catch (e) {
            next(e);
        }
    }

    static async getAllRandom(req: Request, res: Response, next: NextFunction) {
        try {
            const question_id = req.params.question_id
            if (!validateUUID(question_id)) {
                throw new ResponseErorr(400, InvalidID);
            }

            const response = await AnswerService.getAllRandom(question_id);
            res.status(200).json({
                status: Status.Success,
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }
}