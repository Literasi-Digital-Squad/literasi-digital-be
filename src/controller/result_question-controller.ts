import { NextFunction, Request, Response } from "express";
import { ResponseErorr } from "../error/reponse-error";
import { validate as validateUUID } from 'uuid';
import { InvalidID, Status } from "../lib/constant";
import { ResultQuestionService } from "../service/result_question-service";

export class ResultQuestionController {
    static async getResultQuestionsDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const result_id = req.params.result_id;
            if (!validateUUID(result_id)) {
                throw new ResponseErorr(400, InvalidID);
            }
            const response = await ResultQuestionService.getResultQuestionsDetail(result_id);
            res.status(200).json({
                status: Status.Success,
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}