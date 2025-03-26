import { Response, NextFunction, Request } from "express";
import { LevelService } from "../service/level-service";
import { ResponseErorr } from "../error/reponse-error";
import { UpdateLevelRequest } from "../model/level-model";
import { InvalidID, Status } from "../lib/constant";


export class LevelController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await LevelService.getAll()
            res.status(200).json({
                status: Status.Success,
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                throw new ResponseErorr(400, InvalidID)
            }
            
            const response = await LevelService.get(id)
            res.status(200).json({
                status: Status.Success,
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                throw new ResponseErorr(400, InvalidID)
            }

            const request: UpdateLevelRequest = req.body as UpdateLevelRequest
            const response = await LevelService.update(id, request)
            res.status(200).json({
                status: Status.Success,
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}