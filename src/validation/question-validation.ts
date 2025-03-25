import { z, ZodType } from "zod";

export class QuestionValidation {
    static readonly CREATE: ZodType = z.object({
        level_id: z.number().min(1).max(10),
        body: z.string().min(1),
        image: z
        .custom<Express.Multer.File>((file) => file && typeof file === "object" && "buffer" in file)
        .optional(),
    })
    static readonly UPDATE: ZodType = z.object({
        level_id: z.number().min(1).max(10),
        body: z.string().min(1),
        image: z
        .custom<Express.Multer.File>((file) => file && typeof file === "object" && "buffer" in file)
        .optional(),
    })
}