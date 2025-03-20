import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { AdminRequest } from "../types/admin-request";
import { AdminResponse } from "../model/admin-model";

export const authMiddleware = async (req: AdminRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).json({
            status: "error",
            error: "Token is required"
        }).end();
        return;
    }

    const token = authorization.split(' ')[1];
    const secretKey = process.env.ADMIN_SECRET_KEY ?? process.env.SECRET_KEY!;

    try {
        const jwtDecode = jwt.verify(token, secretKey);

        if (typeof jwtDecode !== 'string') {
            req.admin = jwtDecode as AdminResponse;
        }
    } catch (error) {
        res.status(401).json({
            status: "error",
            error: "Unauthorized"
        }).end();
        return;
    }
    next();
}