import { ResultAnswer } from "@prisma/client";

export type ResultAnswerResponse = {
    id: number
    result_question_id: number
    body: string
    image_url?: string
    is_correct: boolean
    answered: boolean
    created_at: string
    updated_at: string
};

export function toResultAnswerResponse(resultAnswer: ResultAnswer): ResultAnswerResponse {
    return {
        id: resultAnswer.id,
        result_question_id: resultAnswer.result_question_id,
        body: resultAnswer.body!,
        image_url: resultAnswer.image_url!,
        is_correct: resultAnswer.is_correct,
        answered: resultAnswer.answered,
        created_at: resultAnswer.created_at.toISOString(),
        updated_at: resultAnswer.updated_at.toISOString()
    };
}

export function toResultAnswerListResponse(resultAnswers: ResultAnswer[]): ResultAnswerResponse[] {
    return resultAnswers.map(toResultAnswerResponse);
}