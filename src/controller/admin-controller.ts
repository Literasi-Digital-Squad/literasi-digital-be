import { NextFunction, Request, Response } from "express";
import { AdminLoginRequest, AdminRegisterRequest, AdminUpdateRequest } from "../model/admin-model";
import { AdminService } from "../service/admin-service";
import { ResponseErorr } from "../error/reponse-error";

export class AdminController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: AdminRegisterRequest = req.body as AdminRegisterRequest;
            const response = await AdminService.register(request);
            res.status(200).json({
                status: "success",
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: AdminLoginRequest = req.body as AdminLoginRequest;
            const response = await AdminService.login(request);

            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const adminId = Number(req.params.id);
            if (!adminId) {
                throw new ResponseErorr(400, "Invalid admin ID");
            }

            const response = await AdminService.get(adminId);

            res.status(200).json({
                status: "success",
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const adminId = Number(req.params.id);
            if (!adminId) {
                throw new ResponseErorr(400, "Invalid admin ID");
            }

            // Cek jika request body kosong
            if (!Object.keys(req.body).length) {
                throw new ResponseErorr(400, "Update request cannot be empty");
            }

            const request: AdminUpdateRequest = req.body as AdminUpdateRequest;
            const response = await AdminService.update(adminId, request);

            res.status(200).json({
                status: "success",
                data: response
            });
        } catch (e) {
            next(e);
        }
    }
}