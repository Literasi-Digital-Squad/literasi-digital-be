import { Request, Response, NextFunction } from "express";
import { ParticipantService } from "../service/participant-service";
import { ParticipantCreateRequest, ParticipantUpdateRequest } from "../model/participant-model";
import { ResponseErorr } from "../error/reponse-error";
import {
    ParticipantDataRequired,
    InvalidParticipantID
} from "../lib/constant";

export class ParticipantController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const page = req.query.page ? Number(req.query.page) : undefined;
            const limit = req.query.limit ? Number(req.query.limit) : undefined;
            
            const response = await ParticipantService.getAll(page, limit);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async getAllWithResult(req: Request, res: Response, next: NextFunction) {
        try {
            const page = req.query.page ? Number(req.query.page) : undefined;
            const limit = req.query.limit ? Number(req.query.limit) : undefined;

            const response = await ParticipantService.getAllWithResult(page, limit);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const participantId = Number(req.params.id);
            if (!participantId) {
                throw new ResponseErorr(400, InvalidParticipantID);
            }

            const response = await ParticipantService.get(participantId);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async getResultsByParticipantId(req: Request, res: Response, next: NextFunction) {
        try {
            const participantId = Number(req.params.id);
            const results = await ParticipantService.getResultsByParticipantId(participantId);
            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: ParticipantCreateRequest = req.body as ParticipantCreateRequest;
            const response = await ParticipantService.create(request);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const participantId = Number(req.params.id);
            if (!participantId) {
                throw new ResponseErorr(400, InvalidParticipantID);
            }

            if (!Object.keys(req.body).length) {
                throw new ResponseErorr(400, ParticipantDataRequired);
            }

            const request: ParticipantUpdateRequest = req.body as ParticipantUpdateRequest;
            const response = await ParticipantService.update(participantId, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const participantId = Number(req.params.id);
            if (!participantId) {
                throw new ResponseErorr(400, InvalidParticipantID);
            }

            const response = await ParticipantService.delete(participantId);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}
