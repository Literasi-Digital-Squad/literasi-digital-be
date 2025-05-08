import { NextFunction, Request, Response } from "express";
import { ResponseErorr } from "../error/reponse-error";
import { InvalidID, Status } from "../lib/constant";
import { DashboardService } from "../service/dashboard-service";

export class DashboardController {
    static async getLevelDistribution(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await DashboardService.getLevelDistribution()
            res.status(200).json({
                status: Status.Success,
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    static async getLevelStats(req: Request, res: Response, next: NextFunction) {
        try {
            const level_id = Number(req.params.level_id);
            if (!level_id) {
                throw new ResponseErorr(400, InvalidID);
            }
            const response = await DashboardService.getLevelStats(level_id);
            res.status(200).json({
                status: Status.Success,
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    static async getTotalResult(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await DashboardService.getTotalResult();
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    static async getTotalParticipant(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await DashboardService.getTotalParticipant();
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    static async getTotalParticipantToday(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await DashboardService.getTotalParticipantToday();
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}