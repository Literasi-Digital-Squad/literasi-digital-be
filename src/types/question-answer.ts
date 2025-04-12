import { Prisma } from '@prisma/client'

export type QuestionWithAnswers = Prisma.ResultQuestionGetPayload<{
  include: { result_answers: true }
}>