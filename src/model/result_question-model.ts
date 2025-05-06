import { ResultAnswerResponse, toResultAnswerListResponse } from "./result_answer-model"
import { QuestionWithAnswers } from "../types/question-answer"

export type ResultQuestionResponse = {
    id: number
    result_id: string 
    level_id: number
    body: string
    image_url?: string
    created_at: string
    updated_at: string
    answers: ResultAnswerResponse[]
}

export type ResultQuestion = {
    question_id: string
    answer_id: number
}

export type ResultQuestionRequest = {
    result_id: string
    result_questions: ResultQuestion[]
}

export function toResultQuestionResponse(resultQuestion: QuestionWithAnswers): ResultQuestionResponse {
    return {
        id: resultQuestion.id,
        result_id: resultQuestion.result_id,
        level_id: resultQuestion.level_id,
        body: resultQuestion.body!,
        image_url: resultQuestion.image_url!,
        created_at: resultQuestion.created_at.toISOString(),
        updated_at: resultQuestion.updated_at.toISOString(),
        answers: toResultAnswerListResponse(resultQuestion.result_answers)
    };
}

export function toResultQuestionListResponse(resultQuestions: QuestionWithAnswers[]): ResultQuestionResponse[] {
    return resultQuestions.map(toResultQuestionResponse)
}