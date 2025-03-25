import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseErorr } from "../error/reponse-error";
import { Status } from "../lib/constant";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        res.status(400).json({
            status: Status.Error,
            error: `Validation error : ${JSON.stringify(error)}`
        })
    }
    else if (error instanceof ResponseErorr) {
        res.status(error.status).json({
            status: Status.Error,
            error: error.message
        })
    }
    else {
        res.status(500).json({
            status: Status.Error,
            error: error.message
        })
    }
}