import { z, ZodType } from "zod";

export class AdminValidation {
    static readonly REGISTER: ZodType = z.object({
        name: z.string().min(1).max(50),
        password: z.string().min(1).max(15),
        email: z.string().min(1).max(255).email()
    })

    static readonly LOGIN: ZodType = z.object({
        email: z.string().min(1).max(255).email(),
        password: z.string().min(1).max(15)
    })

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(50).optional(),
        password: z.string().min(1).max(15).optional(),
        email: z.string().min(1).max(255).email().optional()
    })
}