import { z, ZodType } from "zod";

export class ParticipantValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        age: z.number().int().min(1).max(150),
        email: z.string().min(1).max(255).email()
    });

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(100).optional(),
        age: z.number().int().min(1).max(150).optional(),
        email: z.string().min(1).max(255).email().optional()
    });

    static readonly LIST_QUERY: ZodType = z.object({
    page: z.preprocess(
        (val) => (typeof val === "string" || typeof val === "number" ? Number(val) : undefined),
        z.number().int().positive().optional()
    ),
    limit: z.preprocess(
        (val) => (typeof val === "string" || typeof val === "number" ? Number(val) : undefined),
        z.number().int().positive().optional()
    )
});

}
