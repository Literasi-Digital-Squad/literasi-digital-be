import { NextFunction, Request, Response } from "express";
import { AdminLoginRequest, AdminRegisterRequest, AdminUpdateRequest } from "../model/admin-model";
import { AdminService } from "../service/admin-service";
import { AdminRequest } from "../types/admin-request";

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

    static async get(req: AdminRequest, res: Response, next: NextFunction) {
        try {
            const admin = await AdminService.checkAdminExist(req.admin!.id);
            const response = await AdminService.get(admin);
            
            res.status(200).json({
                status: "success",
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async update(req: AdminRequest, res: Response, next: NextFunction) {
        try {
            const admin = await AdminService.checkAdminExist(req.admin!.id);
            const request: AdminUpdateRequest = req.body as AdminUpdateRequest;
            const response = await AdminService.update(admin, request);
            
            res.status(200).json({
                status: "success",
                data: response
            });
        } catch (e) {
            next(e);
        }
    }
}