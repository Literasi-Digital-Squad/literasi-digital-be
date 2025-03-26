import { Answer } from "@prisma/client"

export type AnswerResponse = {
    id: number
    question_id: string
    body: string
    image_url?: string
    is_correct: boolean
    created_at: string
    updated_at: string
}

export type CreateAnswerRequest = {
    body: string
    image?: Express.Multer.File
    is_correct?: boolean
}

export type UpdateAnswerRequest = {
    body: string
    image?: Express.Multer.File
    is_correct?: boolean
}

export function toAnswerResponse(answer: Answer): AnswerResponse {
    return {
        id: answer.id,
        question_id: answer.question_id,
        body: answer.body!,
        image_url: answer.image_url!,
        is_correct: answer.is_correct,
        created_at: answer.created_at.toISOString(),
        updated_at: answer.updated_at.toISOString()
    }
}

export function toAnswerResponseArray(answers: Answer[]): AnswerResponse[] {     
    return answers.map(toAnswerResponse);
}
