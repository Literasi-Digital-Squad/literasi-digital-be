import { z, ZodType } from "zod";

const ResultQuestionSchema = z.object({
    question_id: z.string().min(1),
    answer_id: z.number().min(1),
});

export class ResultQuestionValidation {
    static readonly CREATE: ZodType = z.object({
      result_id: z.string().min(1),
      result_questions: z.array(ResultQuestionSchema),
    });
  }