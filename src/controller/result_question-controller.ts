import { NextFunction, Request, Response } from "express";
import { ResponseErorr } from "../error/reponse-error";
import { validate as validateUUID } from 'uuid';
import { InvalidID, Status } from "../lib/constant";
import { ResultQuestionService } from "../service/result_question-service";
import { ResultQuestionRequest } from "../model/result_question-model";

export class ResultQuestionController {
    static async getResultQuestionsDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const result_id = req.params.result_id;
    
            if (!validateUUID(result_id)) {
                throw new ResponseErorr(400, InvalidID);
            }
    
            const limit = parseInt(req.query.limit as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const search = req.query.search as string | undefined;
    
            const response = await ResultQuestionService.getResultQuestionsDetail(result_id, limit, page, search);
            const totalItems = await ResultQuestionService.countResultQuestions(result_id, search);
            const totalPages = Math.ceil(totalItems / limit);
    
            res.status(200).json({
                status: Status.Success,
                data: response,
                pagination: {
                    total_items: totalItems,
                    total_pages: totalPages,
                    current_page: page,
                    items_per_page: limit
                }
            });
        } catch (error) {
            next(error);
        }
    }    

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result_id = req.params.result_id;
            if (!validateUUID(result_id)) {
                throw new ResponseErorr(400, InvalidID);
            }

            const request: ResultQuestionRequest = req.body as ResultQuestionRequest
            request.result_id = result_id
            
            const response = await ResultQuestionService.create(request)
            res.status(200).json({
                status: Status.Success,
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}