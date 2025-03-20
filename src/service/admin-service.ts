import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import {
    AdminLoginRequest,
    AdminRegisterRequest,
    AdminUpdateRequest,
    AdminLoginResponse,
    AdminResponse,
    toAdminLoginResponse,
    toAdminResponse
} from "../model/admin-model";
import { AdminValidation } from "../validation/admin-validation";
import { Validation } from "../validation/validation";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Admin } from "@prisma/client";

export class AdminService {
    static async checkAdminExist(id: number) {
        const admin = await prismaClient.admin.findUnique({
            where: {
                id: id
            }
        });

        if (!admin) {
            throw new ResponseErorr(404, "Admin not found");
        }

        return admin;
    }

    static async register(req: AdminRegisterRequest): Promise<AdminResponse> {
        const registerRequest = Validation.validate(AdminValidation.REGISTER, req);

        const duplicateEmail = await prismaClient.admin.findMany({
            where: {
                email: registerRequest.email
            }
        });

        if (duplicateEmail.length > 0) {
            throw new ResponseErorr(400, "Email has already been taken");
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const admin = await prismaClient.admin.create({
            data: registerRequest
        });

        return toAdminResponse(admin);
    }

    static async login(req: AdminLoginRequest): Promise<AdminLoginResponse> {
        const loginRequest = Validation.validate(AdminValidation.LOGIN, req);

        const admin = await prismaClient.admin.findUnique({
            where: {
                email: loginRequest.email,
            }
        });

        if (!admin) {
            throw new ResponseErorr(404, "Admin not found");
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, admin.password);

        if (!isPasswordValid) {
            throw new ResponseErorr(401, "Email or password is invalid");
        }

        const payload = {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            created_at: admin.created_at,
            updated_at: admin.updated_at
        };
        
        const secretKey = process.env.ADMIN_SECRET_KEY ?? process.env.SECRET_KEY!;
        const expiresIn = parseInt(process.env.TOKEN_DURATION ?? '10800');
        const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });

        return toAdminLoginResponse(admin, token);
    }

    static async get(admin: Admin): Promise<AdminResponse> {
        return toAdminResponse(admin);
    }

    static async update(admin: Admin, req: AdminUpdateRequest): Promise<AdminResponse> {
        const updateRequest = Validation.validate(AdminValidation.UPDATE, req);

        if (updateRequest.name) {
            admin.name = updateRequest.name;
        }

        if (updateRequest.password) {
            admin.password = await bcrypt.hash(updateRequest.password, 10);
        }
        
        if (updateRequest.email) {
            const duplicateEmail = await prismaClient.admin.findMany({
                where: {
                    email: updateRequest.email,
                    id: {
                        not: admin.id
                    }
                }
            });

            if (duplicateEmail.length > 0) {
                throw new ResponseErorr(400, "Email has already been taken");
            }
            
            admin.email = updateRequest.email;
        }

        const adminUpdate = await prismaClient.admin.update({
            where: {
                id: admin.id
            },
            data: {
                name: admin.name,
                password: admin.password,
                email: admin.email
            }
        });

        return toAdminResponse(adminUpdate);
    }
}