import { NextFunction, Request, Response } from "express";
import { ResultService } from "../service/result-service";
import { ResultCreateRequest } from "../model/result-model";
import { ResponseErorr } from "../error/reponse-error";
import { validate as validateUUID } from 'uuid';
import { InvalidID } from "../lib/constant";

export class ResultController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const page = req.query.page ? Number(req.query.page) : undefined;
            const limit = req.query.limit ? Number(req.query.limit) : undefined;
            const participant_id = req.query.participant_id 
                ? Number(req.query.participant_id) 
                : undefined;
            const response = await ResultService.getAll(page, limit, participant_id);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            if (!validateUUID(id)) {
                throw new ResponseErorr(400, InvalidID);
            }
            const response = await ResultService.get(id);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: ResultCreateRequest = {
                participant_id: Number(req.body.participant_id),
                level_result: Number(req.body.level_result),
                description: req.body.description,
                total_correct: req.body.total_correct
            };
            const response = await ResultService.create(request);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
}