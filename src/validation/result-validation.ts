import { z, ZodType } from "zod";

export class ResultValidation {
    static readonly CREATE: ZodType = z.object({
        participant_id: z.number().int().positive(),
        level_result: z.number().int().min(0).max(100),
        description: z.string().max(1000).optional()
    });

    static readonly LIST_QUERY: ZodType = z.object({
        page: z.preprocess(
            (val) => (typeof val === "string" || typeof val === "number" ? Number(val) : undefined),
            z.number().int().positive().optional()
        ),
        limit: z.preprocess(
            (val) => (typeof val === "string" || typeof val === "number" ? Number(val) : undefined),
            z.number().int().positive().optional()
        ),
        participant_id: z.preprocess(
            (val) => (typeof val === "string" || typeof val === "number" ? Number(val) : undefined),
            z.number().int().positive().optional()
        )
    });
}