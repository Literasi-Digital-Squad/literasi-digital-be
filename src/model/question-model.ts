import { Question } from "@prisma/client"

export type QuestionResponse = {
    id: string
    level_id: number
    body: string
    image_url?: string
    created_at: string
    updated_at: string
}

export type CreateQuestionRequest = {
    level_id: number
    body: string
    image?: Express.Multer.File
}

export type UpdateQuestionRequest = {
    level_id: number
    body: string
    image?: Express.Multer.File
}

export function toQuestionResponse(question: Question): QuestionResponse {
    return {
        id: question.id,
        level_id: question.level_id,
        body: question.body!,
        image_url: question.image_url!,
        created_at: question.created_at.toISOString(),
        updated_at: question.updated_at.toISOString()
    }
}

export function toQuestionResponseArray(questions: Question[]): QuestionResponse[] {     
    return questions.map(toQuestionResponse);
}
