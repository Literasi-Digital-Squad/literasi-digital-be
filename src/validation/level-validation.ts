import { z, ZodType } from "zod";

export class LevelValidation {
    static readonly UPDATE: ZodType = z.object({
        description: z.string().min(1),
    })
}