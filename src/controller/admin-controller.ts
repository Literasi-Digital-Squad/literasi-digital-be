import { NextFunction, Request, Response } from "express";
import { AdminLoginRequest, AdminRegisterRequest, AdminUpdateRequest } from "../model/admin-model";
import { AdminService } from "../service/admin-service";
import { ResponseErorr } from "../error/reponse-error";
import { InvalidAdminID, UpdateCannotEmpty } from "../lib/constant";
import { AdminRequest } from "../types/admin-request";

export class AdminController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: AdminRegisterRequest = req.body as AdminRegisterRequest;
            const response = await AdminService.register(request);
            res.status(201).json(response);
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

    static async get(req: AdminRequest, res: Response, next: NextFunction) {
        try {
            const adminId = Number(req.admin?.id);
            if (!adminId) {
                throw new ResponseErorr(400, InvalidAdminID);
            }

            const response = await AdminService.get(adminId);

            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async update(req: AdminRequest, res: Response, next: NextFunction) {
        try {
            const adminId = Number(req.admin?.id);
            if (!adminId) {
                throw new ResponseErorr(400, InvalidAdminID);
            }
            
            // Cek jika request body kosong
            if (!Object.keys(req.body).length) {
                throw new ResponseErorr(400, UpdateCannotEmpty);
            }

            const request: AdminUpdateRequest = req.body as AdminUpdateRequest;
            const response = await AdminService.update(adminId, request);

            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}