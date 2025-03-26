import { z, ZodType } from "zod";

export class AnswerValidation {
    static readonly CREATE: ZodType = z.object({
        body: z.string().min(1),
        image: z
        .custom<Express.Multer.File>((file) => file && typeof file === "object" && "buffer" in file)
        .optional(),
        is_correct: z.boolean()
    })
    static readonly UPDATE: ZodType = z.object({
        body: z.string().min(1),
        image: z
        .custom<Express.Multer.File>((file) => file && typeof file === "object" && "buffer" in file)
        .optional(),
        is_correct: z.boolean()
    })

    static readonly LIST_QUERY: ZodType = z.object({
        question_id: z.preprocess(
            (val) => (typeof val === "string" ? val : undefined),
            z.string().uuid()
        )
    });
}