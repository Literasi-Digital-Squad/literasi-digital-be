import { Request } from "express";
import { AdminResponse } from "../model/admin-model";

export interface AdminRequest extends Request {
    admin?: AdminResponse
}