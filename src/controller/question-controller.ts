import { NextFunction, Request, Response } from "express";
import { CreateQuestionRequest, GetNextQuestionRequest, UpdateQuestionRequest } from "../model/question-model";
import { QuestionService } from "../service/question-service";
import { InvalidID, Status } from "../lib/constant";
import { MulterRequest } from "../types/multer-request";
import { validate as validateUUID } from 'uuid';
import { ResponseErorr } from "../error/reponse-error";

export class QuestionController {
    static async create(req: MulterRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateQuestionRequest = {
                level_id: Number(req.body.level_id),
                body: req.body.body,
                image: req.file,
            };

            const response = await QuestionService.create(request);
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
            const level = parseInt(req.query.level as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const search = (req.query.search as string) || '';
    
            const response = await QuestionService.getAll(level, limit, page, search);
    
            const totalItems = await QuestionService.countQuestions(level, search);
            const totalPages = Math.ceil(totalItems / limit);
    
            res.status(200).json({
                status: "success",
                data: response,
                pagination: {
                    total_items: totalItems,
                    total_pages: totalPages,
                    current_page: page,
                    items_per_page: limit
                }
            });
        } catch (e) {
            next(e);
        }
    }    

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.question_id
            if (!validateUUID(id)) {
                throw new ResponseErorr(400, InvalidID);
            }

            const response = await QuestionService.get(id);
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
            const id = req.params.question_id
            if (!validateUUID(id)) {
                throw new ResponseErorr(400, InvalidID);
            }

            const request: UpdateQuestionRequest = {
                level_id: Number(req.body.level_id),
                body: req.body.body,
                image: req.file,
            };

            const response = await QuestionService.update(id, request);
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
            const id = req.params.question_id
            if (!validateUUID(id)) {
                throw new ResponseErorr(400, InvalidID);
            }

            await QuestionService.delete(id);
            res.status(200).json({
                status: Status.Success,
            });
        } catch (e) {
            next(e);
        }
    }

    static async getInitialQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await QuestionService.getInitialQuestion();
            res.status(200).json({
                status: Status.Success,
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async getNextQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            const request: GetNextQuestionRequest = req.body as GetNextQuestionRequest;

            const response = await QuestionService.getNextQuestion(request);
            res.status(200).json({
                status: Status.Success,
                data: response
            });
        } catch (e) {
            next(e);
        }
    }
}